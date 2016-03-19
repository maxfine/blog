@extends('layout._back')

@section('title') 网站后台 @stop

{{-- 内容主体区域 --}}
@section('content')
    <div class="row J_mainContent" id="content-main">
        <iframe class="J_iframe" name="iframe0" width="100%" height="100%" src="{{ URL('admin/index') }}" frameborder="0" data-id="{{ URL('admin/index') }}" seamless></iframe>
    </div>
@stop

@section('common_js')
    @parent
    <script src="{{ asset('assets/js/back.js') }}"></script>
@stop

@section('extra_js')
    @parent
@stop