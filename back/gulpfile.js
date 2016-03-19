/*
 |--------------------------------------------------------------------------
 | Elixir Asset Management
 |--------------------------------------------------------------------------
 |
 | Elixir provides a clean, fluent API for defining some basic Gulp tasks
 | for your Laravel application. By default, we are compiling the Sass
 | file for our application, as well as publishing vendor resources.
 |
 */

process.env.DISABLE_NOTIFIER = true;

var gulp = require('gulp');
var rename = require('gulp-rename');
var elixir = require('laravel-elixir');

/**
 * 拷贝所有需要的文件
 *
 * Do a 'gulp copyfiles' after bower updates
 */
gulp.task("copyfiles", function() {

    // 拷贝 jQuery, Bootstrap, 和 FontAwesome
    gulp.src("vendor/bower_dl/jquery/dist/jquery.js")
        .pipe(gulp.dest("resources/assets/js/common/"));

    gulp.src("vendor/bower_dl/bootstrap/less/**")
        .pipe(gulp.dest("resources/assets/less/bootstrap"));

    gulp.src("vendor/bower_dl/bootstrap/dist/js/bootstrap.js")
        .pipe(gulp.dest("resources/assets/js/common/"));

    gulp.src("vendor/bower_dl/bootstrap/dist/fonts/**")
        .pipe(gulp.dest("public/assets/fonts"));

    gulp.src("vendor/bower_dl/font-awesome/less/**")
        .pipe(gulp.dest("resources/assets/less/fontawesome"));

    gulp.src("vendor/bower_dl/font-awesome/fonts/**")
        .pipe(gulp.dest("public/assets/fonts"));

    // 拷贝 datatables
    var dtDir = 'vendor/bower_dl/datatables-plugins/integration/';

    gulp.src("vendor/bower_dl/datatables/media/js/jquery.dataTables.js")
        .pipe(gulp.dest('resources/assets/js/datatables/'));

    gulp.src(dtDir + 'bootstrap/3/dataTables.bootstrap.css')
        .pipe(rename('dataTables.bootstrap.less'))
        .pipe(gulp.dest('resources/assets/less/dataTables/'));

    gulp.src(dtDir + 'bootstrap/3/dataTables.bootstrap.js')
        .pipe(gulp.dest('resources/assets/js/dataTables.bootbootstrap/'));

    // 拷贝 layer弹出层
    var layerDir = 'vendor/bower_dl/layer/';

    gulp.src(layerDir + '**')
        .pipe(gulp.dest('public/plugin/layer'));
});

/**
 * Default gulp is to run this elixir stuff
 */
elixir(function(mix) {
    var mixtor = {
        cssRelolverDir : 'less/',
        jsRelolverDir : 'js/',
        mixedAssetsDir : 'public/assets/',
        jsDir : 'js/',
        cssDir : 'css/',
        cssMapping : {'blog' : ['common', 'main'], 'front' : ['common', 'main']},
        jsMapping : {'blog' : ['common', 'main'], 'front' : ['common', 'main']},
        mixGlobal : function(){
            // 编译公共资源
            var cssMixs = {};
            var jsMixs = {};
            cssMixs['common/**'] = 'public/assets/css/common.css';
            cssMixs['main/**'] = 'public/assets/css/main.css';
            jsMixs['js/common/**'] = 'public/assets/js/common.js';
            jsMixs['js/main/**'] = 'public/assets/js/main.js';
            for(var from in cssMixs){
                mix.less(from, cssMixs[from]);
            }
            for(var from in jsMixs){
                mix.scripts(
                    from,
                    jsMixs[from],
                    'resources/assets'
                );
            }
        },
        mixSubApp : function(){
            // 编译子系统, 以appName/(css|js)/filename/filename.(less|sass|js) 格式存放需要被编译的文件
            // 编译后的路径为: appName/(css|js)/filename.(css|js)
            var cssMixs = {};
            var jsMixs = {};
            var cssMapping = this.cssMapping;
            var jsMapping = this.jsMapping;
            for(var subAppName in cssMapping){
                for(var i in cssMapping[subAppName]){
                    var resCssDir = '../' + subAppName + '/' + this.cssRelolverDir + cssMapping[subAppName][i] + '/**';
                    cssMixs[resCssDir] = this.mixedAssetsDir + subAppName + '/' + this.cssDir + cssMapping[subAppName][i] + '.css';
                }
            }
            for(var subAppName in jsMapping){
                for(var i in jsMapping[subAppName]){
                    var resJsDir = subAppName + '/' + this.jsRelolverDir + jsMapping[subAppName][i] + '/**';
                    jsMixs[resJsDir] = this.mixedAssetsDir + subAppName + '/' + this.jsDir + jsMapping[subAppName][i] + '.js';
                }
            }
            for(var from in cssMixs){
                mix.less(from, cssMixs[from]);
            }
            for(var from in jsMixs){
                mix.scripts(
                    from,
                    jsMixs[from],
                    'resources/assets'
                );
            }

        },
        jsMixs : function(_jsMixs){
            for(var from in _jsMixs){
                mix.scripts(
                    from,
                    _jsMixs[from],
                    'resources/assets'
                );
            }
        },
        cssMixs : function(_cssMixs){
            for(var from in _cssMixs){
                mix.less(from, _cssMixs[from]);
            }
        },
        init : function(){
            this.mixGlobal();
            this.mixSubApp();
        }
    };

    mixtor.init();
});

/**
 * //TDD
 elixir(function(mix) {
    mix.phpUnit();
});
 **/
