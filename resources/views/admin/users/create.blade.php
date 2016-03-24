@extends('layout._admin')

@section('title') 网站后台-{{ $title }} @stop

@section('extra_css')
    @parent
    <link href="{{ asset('assets/css/admin-post.css') }}" rel="stylesheet">
@stop

@section('head_js')
    @parent
@stop

{{-- 内容主体区域 --}}
@section('content')
    <div class="wrapper wrapper-content">
        <div class="row">
            <div class="col-sm-12">

                        @include('partials.admin.errors')

                        {!! Form::box_start('创建'.$pageName) !!}
                        @if (Input::old())
                            {!! Form::model(Input::old(),['url'=>route($uri . '.store'), 'class'=>'form-horizontal']) !!}
                        @else
                            {!! Form::model($data ,['url'=>route($uri . '.store'), 'class'=>'form-horizontal']) !!}
                        @endif
                        @include($uri.'.form')
                        {!! Form::box_end('保存') !!}
                        {!! Form::close() !!}

            </div>
        </div>
    </div>
@stop

@section('common_js')
    @parent
    <script src="{{ asset('assets/js/admin-post.js') }}"></script>
@stop

@section('extra_js')
    @parent
@stop
