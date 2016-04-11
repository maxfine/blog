@extends('layout._base')

@section('title'){{ !empty($title) ? $title : App\Cache\SystemOptionCache::get('website_title','your website_title') }}@stop
@section('keywords'){{ !empty($keywords) ? $keywords : App\Cache\SystemOptionCache::get('website_keywords','your website_keywords') }}@stop
@section('description'){{ !empty($description) ? $description : App\Cache\SystemOptionCache::get('website_description','your website_description') }}@stop

@section('meta')
    <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">
@stop

@section('head_css')
    {{--
    <link href="{{ asset('assets/css/common.css') }}" rel="stylesheet">
    <link href="{{ asset('assets/front/css/common.css') }}" rel="stylesheet">
    <link href="{{ asset('asset/front/css/main.css') }}" rel="stylesheet">
    //使用cdn加速, 无需使用本地样式文件
    <link href="{{ asset('http://cdn.bootcss.com/bootstrap/3.3.4/css/bootstrap.min.css') }}" rel="stylesheet">
    <link href="{{ asset('http://cdn.bootcss.com/font-awesome/4.3.0/css/font-awesome.min.css') }}" rel="stylesheet">
    <link href="{{ asset('http://cdn.bootcss.com/highlight.js/9.0.0/styles/vs.min.css') }}" rel="stylesheet">
    --}}
    @section('common_css')
        <link href="{{ asset('assets/css/commons.css') }}" rel="stylesheet">
    @show

    @section('extra_css')
    @show
@stop

@section('head_js')
    @parent
	<!-- HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries -->
	<!--[if lt IE 9]>
    <script src="//cdn.bootcss.com/html5shiv/r29/html5.min.js"></script>
    <script src="//cdn.bootcss.com/respond.js/1.4.2/respond.min.js"></script>
	<![endif]-->
    <script type="text/javascript">
        var BASE_URL = "{{ \Config::get('app')['url'] }}";
        var BLOG_HOME = BASE_URL;

        var init = [];
        window.onload = function () {
            window.$ = jQuery;
            init.forEach(function (f) {
                f();
            });
        };
    </script>
@stop

@section('main')
	@include('partials.front.header'){{-- 前台头部 --}}

	@section('content')
	@show{{-- 前台页面主体内容 --}}

	@include('partials.front.footer'){{-- 前台页脚 --}}
@stop

@section('after_main')
	@section('common_js')
        {{--
        <script src="{{ asset('http://cdn.bootcss.com/jquery/1.11.2/jquery.min.js') }}"></script>
        <script src="{{ asset('http://cdn.bootcss.com/bootstrap/3.3.4/js/bootstrap.min.js') }}"></script>
        --}}
        <script src="{{ asset('assets/js/commons.js') }}"></script>
	@show{{-- 添加一些公共JS --}}

	@section('extra_js')
	@show{{-- 用户后期扩展时需要补充的一些代码片段 --}}
@stop
