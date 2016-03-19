/**
 * 2016年1月31日00:22:07
 * MHR, 代码热替换
 */

'use strict';

var path = require('path');
var fs = require('fs');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
//var UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
var CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;

var bower_dir = __dirname + '/vendor/bower_dl';
var node_dir = __dirname + '/node_modules';
var srcDir = __dirname + '/resources/assets';
var assetsDir = __dirname + '/public/assets';
var deps = [
    'jquery/dist/jquery.js',
    'datatables/media/js/jquery.dataTables.js',
    'jquery-mousewheel/jquery.mousewheel.js',
];

function makeConf(options) {
    options = options || {};
    var debug = options.debug !== undefined ? options.debug : true;
    var entries = {};
    entries = genEntries();
    var chunks = Object.keys(entries);

    var config= {
        addVendor: function (name, path) {
            this.resolve.alias[name] = path;
            this.module.noParse.push(new RegExp(path));
        },

        // 入口文件, 多页面
        // key为资源名
        entry: entries,

        // 输出路径
        output: {
            // 在debug模式下，__build目录是虚拟的，webpack的dev server存储在内存里
            path: path.resolve(debug ? '__build' : assetsDir),
            filename: debug ? '[name].js' : 'js/[name].js',
            chunkFilename: debug ? '[chunkhash:8].chunk.js' : 'js/[chunkhash:8].chunk.min.js',
            hotUpdateChunkFilename: debug ?'[id].[chunkhash:8].js' : 'js/[id].[chunkhash:8].min.js',
            publicPath: debug ? '/__build/' : '/assets/'
        },

        // require/entry  路径
        resolve: {
            //var depPath = path.resolve(bower_dir, dep);
            //config.resolve.alias[dep.split(path.sep)[0]] = depPath; // depPath;
            //config.module.noParse.push(depPath);
            alias: {
                'jquery' : path.resolve(bower_dir, deps[0]),
                'datatables.net' : path.resolve(bower_dir, deps[1]),
                'jquery-mousewheel' : path.resolve(bower_dir, deps[2])
            },
            root: [srcDir, node_dir, bower_dir]
        },
        // 加载器的解析
        /**
         resolveLoader: {
            root: node_dir
        },
         **/

        // require/entry 解析器 or 加载器
        module: {
            noParse: [],
            loaders: [
                {
                    test: /\.(jpe?g|png|gif|svg)(\?[^/\s]*)?$/i,
                    loaders: [
                        'image?{bypassOnDebug: true, progressive:true, \
                            optimizationLevel: 3, pngquant:{quality: "65-80", speed: 4}}',
                        // url-loader更好用，小于10KB的图片会自动转成dataUrl，
                        // 否则则调用file-loader，参数直接传入
                        'url?limit=10000&name=img/[hash:8].[name].[ext]',
                    ]
                },
                {
                    test: /\.(woff|eot|ttf|woff2)(\?[^/\s]*)?$/i, //可能会有.woff2?v=2.2.0
                    loader: 'url?limit=10000&name=fonts/[hash:8].[name].[ext]'
                },
                {test: /\.(tpl|ejs)$/, loader: 'ejs'},
                {test: /\.js$/, exclude: /node_modules/, loader: 'jsx'},
                /**
                解析并暴露给windows对象jQuery, (function() { return this; }())
                (function(global) {module.exports = global["jQuery2"] = __webpack_require__(106);
                }.call(exports, (function() { return this; }())))
                 **/
                {test: path.resolve(bower_dir, deps[0]), loader: 'expose?jQuery'},
                {test: path.resolve(bower_dir, deps[0]), loader: 'expose?$'}
                //{test: path.resolve(bower_dir, deps[1]), loader: 'expose?datatables'}
            ]
        },
        plugins: [
            /**
            new webpack.ResolverPlugin(
                // 搜索对应入口文件的插件, 会找到.bower.json中的main对应的文件
                new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin(".bower.json", ["main"])
            ),
             **/
            // 当发现$, jquery, windows.jQuery时, 注入jQuery = require('jquery')
            new webpack.ProvidePlugin({
                $: "jquery",
                jquery: "jquery",
                "window.jQuery": "jquery"
                //layer: 'layer',
                //"window.layer": "layer"
            }),
            //new CommonsChunkPlugin('common',"js/commons.js", Infinity)

            //利用缓存, 提高效率
            new CommonsChunkPlugin({
                name: "admin-commons", //生成的chunk name
                chunks: ["back", "admin-index", "admin-user", "admin-post", "admin-category", "admin-role"] //所依据的chunk name, 如果没有指定minChunk2, 必须全包含才能加入admin-commons
            }),

            new CommonsChunkPlugin({
                name: "commons",
                chunks: ["index", "login", "admin-commons"]
                //minChunks: 2
            })
        ]
    };

    /**
     * css - 内嵌与外链样式
     */
    // 开发阶段，css直接内嵌
    if(debug){
        var cssLoader = {
            test: /\.css$/,
            loader: 'style!css'
        };
        var sassLoader = {
            test: /\.scss$/,
            loader: 'style!css!sass'
        };
        var lessLoader = {
            test: /\.less$/,
            loader: 'style!css!less'
        };

        config.module.loaders.push(cssLoader);
        config.module.loaders.push(sassLoader);
        config.module.loaders.push(lessLoader);
    }else{
        // 编译阶段，css分离出来单独引入
        var cssLoader = {
            test: /\.css$/,
            loader: ExtractTextPlugin.extract('style-loader', 'css') // enable minimize
        };
        var sassLoader = {
            test: /\.scss$/,
            loader: ExtractTextPlugin.extract('style-loader', 'css', 'sass')
        };
        var lessLoader = {
            test: /\.less$/,
            loader: ExtractTextPlugin.extract('style-loader', 'css!less')
            // loader: ExtractTextPlugin.extract('style', 'css?minimize', 'less')
        };
        config.module.loaders.push(cssLoader);
        config.module.loaders.push(sassLoader);
        config.module.loaders.push(lessLoader);
        config.plugins.push(
            new ExtractTextPlugin('css/[name].css', {
                // 当allChunks指定为false时，css loader必须指定怎么处理
                // additional chunk所依赖的css，即指定`ExtractTextPlugin.extract()`
                // 第一个参数`notExtractLoader`，一般是使用style-loader
                // @see https://github.com/webpack/extract-text-webpack-plugin
                allChunks: false
            })
        );

        // 自动生成入口文件，入口js名必须和入口文件名相同
        // 例如，a页的入口文件是a.html，那么在js目录下必须有一个a.js作为入口文件
        var pages = fs.readdirSync(srcDir);
        // = [ 'a.html', 'b.html', 'c.html', 'css', 'img', 'js', 'scss', 'sourcemap.json', 'tmpl' ];

        pages.forEach(function(filename) {
            var m = filename.match(/(.+)\.html$/);

            if(m) {
                // @see https://github.com/kangax/html-minifier
                var conf = {
                    template: path.resolve(srcDir, filename),
                    // @see https://github.com/kangax/html-minifier
                    // minify: {
                    //     collapseWhitespace: true,
                    //     removeComments: true
                    // },
                    filename: filename
                };

                if(m[1] in config.entry) {
                    conf.inject = 'body';
                    conf.chunks = ['vendors', m[1]];
                }

                config.plugins.push(new HtmlWebpackPlugin(conf));
            }
        });
    }
    //end css

    // alias
    //deps.forEach(function (dep) {
        //var depPath = path.resolve(bower_dir, dep);
        //config.resolve.alias[dep.split(path.sep)[0]] = depPath; // depPath;
        //config.module.noParse.push(depPath);
    //});

    return config;
}

function genEntries() {
    var jsDir = path.resolve(srcDir, 'js');
    var names = fs.readdirSync(jsDir);
    var map = {};

    names.forEach(function(name) {
        var m = name.match(/(.+)\.js$/);
        var entry = m ? m[1] : '';
        var entryPath = entry ? path.resolve(jsDir, name) : '';

        if(entry) map[entry] = entryPath;
    });

    return map;
}

module.exports = makeConf({debug: false});
