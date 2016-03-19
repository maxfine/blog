@extends('layout._base')

@section('title') 后台登录 @stop

@section('meta')
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
    <!--[if lt IE 9]>
    <meta http-equiv="refresh" content="0;ie.html" />
    <![endif]-->
@stop

@section('head_css')
    <link href="{{ asset('assets/css/commons.css') }}" rel="stylesheet">
    <link href="{{ asset('assets/css/login.css') }}" rel="stylesheet">
@stop

@section('head_js')
    <script>
        if (window.top !== window.self) {
            window.top.location = window.location;
        }
    </script>
@stop

@section('body_attr') class="signin" @stop

@section('main')
    @section('content')
        <div class="signinpanel">
            <div class="row">
                <div class="col-sm-12">
                    {!! Form::open(['url'=>'auth/admin/login', 'method' => 'POST', 'role' => 'form', 'id' => 'loginForm']) !!}
                    <h4>后台登录：</h4>

                    <!--- Email Field --->
                    <div class="form-group">
                        {!! Form::label('email', 'Email:') !!}
                        {!! Form::email('email', null, ['class' => 'form-control input-lg uname', 'placeholder' => '你的邮箱', 'required' => '', 'aria-required' => true]) !!}
                    </div>

                    <!--- Password Field --->
                    <div class="form-group">
                        {!! Form::label('password', '密码:') !!}
                        {!! Form::password('password', ['class' => 'form-control input-lg pword', 'required' => '', 'aria-required' => true]) !!}
                    </div>

                    <div class="form-group text-left i-checks">
                        <label>
                            {!! Form::checkbox('remember', '') !!} 记住用户名
                        </label>
                    </div>

                    <div class="form-group">
                        {!! Form::submit('登录', ['class' => 'btn btn-success btn-lg btn-block']); !!}
                    </div>

                    {!! Form::close() !!}
                </div>
            </div>

            <div class="signup-footer">
                <div class="pull-left">
                    &copy; 2015 All Rights Reserved.
                </div>
            </div>
        </div>
    @show
@stop{{-- 正文部分 --}}

@section('after_main')
    @section('extra_js')
        <script src="{{ asset('assets/js/commons.js') }}"></script>
        <script src="{{ asset('assets/js/login.js') }}"></script>
    @show
@stop
