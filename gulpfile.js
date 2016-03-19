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
var gutil = require('gulp-util');
var webpack = require('webpack');
var webpackConf = require('./webpack.config');
var elixir = require('laravel-elixir');
// require("laravel-elixir-webpack");
var assets = './public/assets';

/**
 * 拷贝所有需要的文件
 *
 * Do a 'gulp copyfiles' after bower updates
 */
gulp.task("copyfiles", function() {
    // 拷贝 layer弹出层
    var layerDir = 'vendor/bower_dl/layer/';

    gulp.src(layerDir + '**')
        .pipe(gulp.dest('public/plugin/layer'));
});

gulp.task('clean', function (){
    var clean = require('gulp-clean');

    return gulp.src(assets, {read: true}).pipe(clean());
});
// run webpack
gulp.task('pack', function (done){
    webpack(webpackConf, function (err, stats){
        if(err) throw new gutil.PluginError('webpack', err);
        gutil.log('[webpack]', stats.toString({colors: true}));
        done();
    });
});

elixir(function(mix) {
    // mix.task('pack');
    //mix.version(['assets/css/**/*.css', 'assets/js/**/*.js']);
    // mix.less('bootstrap/bootstrap.less', 'public/assets/css/')
    //    .version("assets/css/bootstrap.css");
    /** 无卵用
    mix.webpack("index.js", {
        outputDir: "public/assets/js",
        entry: {
            app: "./resources/assets/js/index.js"
        },
        output: {
            filename: "bundle.js"
        }
    });
     **/
    mix.phpUnit();
});

/**
 * //TDD
 elixir(function(mix) {
    mix.phpUnit();
});
 **/