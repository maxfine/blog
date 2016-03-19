@extends('layout._base')

@section('title') 网站后台 @stop

@section('meta')
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
@stop

@section('head_css')
    @section('common_css')
        <link href="{{ asset('assets/css/commons.css') }}" rel="stylesheet">
        <link href="{{ asset('assets/css/admin-commons.css') }}" rel="stylesheet">
    @show

    @section('extra_css')
    @show
@stop


@section('head_js')
    @parent
    <script type="text/javascript">
        var BASE_URL = "{{ \Config::get('app')['url'] }}";
        var ADMIN_HOME = BASE_URL + '/' + 'admin';

        var init = [];
        window.onload = function () {
            window.$ = jQuery;
            init.forEach(function (f) {
                f();
            });
        };
    </script>
@stop

@section('body_attr') class="gray-bg"@stop

@section('main')
    {{-- 内容头部 --}}
    @section('before-content')
    @show

    {{-- 内容主体区域 --}}
    @section('main-content')

        @section('content-header')
        @show

        {{-- 内容主体区域正文 --}}
        @section('content')
        @show

        @section('content-footer')
        @show

    @show

    {{-- 内容尾部 --}}
    @section('after-content')
    @show

@stop{{-- 正文部分 --}}

@section('after_main')
    @section('common_js')
        <script src="{{ asset('assets/js/commons.js') }}"></script>
        <script src="{{ asset('assets/js/admin-commons.js') }}"></script>
    @show{{-- 添加一些公共JS --}}

    @section('extra_js')
    @show{{-- 用户后期扩展时需要补充的一些代码片段 --}}
@stop{{-- 在正文之后填充一些东西，比如统计代码之类的东东 --}}


