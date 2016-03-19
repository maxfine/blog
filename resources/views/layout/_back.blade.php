@extends('layout._base')

@section('title') 网站后台 @stop

@section('meta')
    @parent
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="renderer" content="webkit">
    <!--[if lt IE 8]>
    <meta http-equiv="refresh" content="0;ie.html" />
    <![endif]-->
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
    <script type="text/javascript">
        var BASE_URL = "{{ \Config::get('app')['url'] }}";
    </script>
@stop

@section('body_attr') class="fixed-sidebar full-height-layout gray-bg" style="overflow:hidden" @stop

@section('main')
    <div @section('main-wrapper_attr')id="wrapper"@show>

        {{-- 后台侧边导航 --}}
        @include('partials.admin.main-left-sidebar')

        <div @section('content-wrapper_attr')id="page-wrapper" class="gray-bg dashbard-1"@show>

            @include('partials.admin.main-header')

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

            @include('partials.admin.main-footer'){{-- 后台页脚 --}}

            {{-- 后台侧边导航 --}}
            @include('partials.admin.main-right-sidebar')

            {{-- mini聊天窗口 --}}
            {{--
            @include('partials.admin.small-chat')
            --}}

        </div>
    </div>
@stop

@section('after_main')
    @section('common_js')
        <script src="{{ asset('assets/js/commons.js') }}"></script>
        <script src="{{ asset('assets/js/admin-commons.js') }}"></script>
    @show

    @section('extra_js')
    @show
@stop

