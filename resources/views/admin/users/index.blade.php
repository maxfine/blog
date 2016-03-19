@extends('layout._admin')

@section('title') 网站后台-用户管理 @stop

@section('extra_css')
    @parent
    <link href="{{ asset('assets/css/admin-user.css') }}" rel="stylesheet">
@stop

{{-- 内容主体区域 --}}
@section('content')
    <div class="wrapper wrapper-content">
        <div class="row">
            <div class="col-sm-12">
                <div class="ibox float-e-margins">
                    <div class="ibox-title">
                        <h5>{{ $pageName }}</h5>
                        <div class="ibox-tools">
                            <a class="collapse-link">
                                <i class="fa fa-chevron-up"></i>
                            </a>
                            <a class="dropdown-toggle" data-toggle="dropdown" href="#">
                                <i class="fa fa-wrench"></i>
                            </a>
                            <ul class="dropdown-menu dropdown-user">
                                <li><a href="{{ route($uri . '.create') }}">新&nbsp&nbsp增</a></li>
                            </ul>
                            <a class="close-link">
                                <i class="fa fa-times"></i>
                            </a>
                        </div>
                    </div>

                    <div class="panel panel-default ibox-content">
                        {!! Html::list_header([
                        'new'=>false,
                        'priceStart' => 'name',
                        'priceEnd' => 'name2',
                        'search' => true,
                        'filters' => ['name' => ['name', 'aaa'], 'name2' => ['bbb', 'ccc']],
                        ]) !!}

                        @include('partials.admin.errors')

                        {!! Html::datagrid($results) !!}

                    </div>
                </div>

            </div>
        </div>
    </div>
@stop

@section('common_js')
    @parent
    <script src="{{ asset('assets/js/admin-user.js') }}"></script>
@stop

@section('extra_js')
    @parent
@stop

