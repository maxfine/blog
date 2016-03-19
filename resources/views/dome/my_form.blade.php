<!DOCTYPE html>
<html>
    <head>
        <title>Laravel</title>

        <link href="https://fonts.googleapis.com/css?family=Lato:100" rel="stylesheet" type="text/css">

        <style>
            html, body {
                height: 100%;
            }

            body {
                margin: 0;
                padding: 0;
                width: 100%;
                display: table;
                font-weight: 100;
                font-family: 'Lato';
            }

            .container {
                text-align: center;
                display: table-cell;
                vertical-align: middle;
            }

            .content {
                text-align: center;
                display: inline-block;
            }

            .title {
                font-size: 96px;
            }
        </style>

        <script src="{{ asset('http://cdn.bootcss.com/jquery/1.11.2/jquery.min.js') }}"></script>
        <script src="{{ asset('http://cdn.bootcss.com/bootstrap/3.3.4/js/bootstrap.min.js') }}"></script>
    </head>
    <body>
        <div class="container">
            <div class="content">
                <div class="title">测试页面my form</div>

                <div class="myForm">
                    {!! Form::model($user, ['url' => 'test/add']) !!}
                    {!! Form::label('username', '用户名') !!} : {!! Form::text('username') !!}
                    <br>
                    {!! Form::label('password', '密码') !!} : {!! Form::password('password', ['class' => 'awesome']) !!}
                    <br>
                    {!! Form::label('sex', '性别') !!} : {!! Form::radio('sex', 'man', ['checked' => '']) !!}{!! Form::radio('sex', 'woman', ['checked' => true]) !!}
                    <br>
                    {!! Form::label('hobby', '爱好') !!} : {!! Form::checkbox('hobby', 'surf the Internet') !!} {!! Form::label('上网') !!} {!! Form::checkbox('hobby', 'watch film') !!}{!! Form::label('看电影') !!}
                    <br>
                    {!! Form::label('time', '时间') !!} : {!! Form::date('time', Carbon\Carbon::now()) !!}
                    <br>
                    {!! Form::select('size', array('L' => 'Large', 'S' => 'Small'), null, ['placeholder' => 'Pick a size...']) !!}
                    <br>
                    {!!
                    Form::select('animal', array(
                    'Cats' => array('leopard' => 'Leopard', 'other' => 'other'),
                    'Dogs' => array('spaniel' => 'Spaniel', 'other' => 'other'),
                    ), 'other')
                    !!}
                    <br>
                    {!! Form::selectRange('number', 10, 20, 11) !!}
                    <br>
                    {!! Form::file('image') !!}
                    <br>
                    {!! Form::submit('Click Me!', ['id' => 'my_submit', 'name' => 'dosubmit']) !!}
                    {!! Form::close() !!}
                </div>
            </div>
        </div>
    </body>
</html>
