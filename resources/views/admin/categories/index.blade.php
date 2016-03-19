@extends('layout._admin')

@section('title') 网站后台-{{ $title }} @stop

@section('extra_css')
    @parent
    <link href="{{ asset('assets/css/admin-category.css') }}" rel="stylesheet">
@stop

@section('head_js')
    @parent
@stop

{{-- 内容主体区域 --}}
@section('content')
    <div class="wrapper wrapper-content">
        <div class="row">
            <div class="col-sm-12">

                {!! Form::box_start($pageName) !!}

                    {!! Html::list_header($results['heads']) !!}

                    @include('partials.admin.errors')


                    {!! Html::datagrid($results) !!}

                    {!! Html::list_footer($results['foots']) !!}

                {!! Form::box_end('') !!}

            </div>
        </div>
    </div>
@stop

@section('common_js')
    @parent
    <script src="{{ asset('assets/js/admin-category.js') }}"></script>
@stop

@section('extra_js')
    @parent
@stop
