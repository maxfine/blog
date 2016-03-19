<!DOCTYPE html>
<html>
    <head>
        <title>test markdown</title>
        <script src="{{ asset('http://cdn.bootcss.com/jquery/1.11.2/jquery.min.js') }}"></script>
        @include('editor::head')
    </head>
    <body>
        <div class="editor">
            {{-- 创建一个 textarea 而已，具体的看手册，主要在于它的 id 为 myEditor --}}
            {!! Form::textarea('content', '', ['class' => 'form-control','id'=>'myEditor']) !!}
        </div>
    </body>
</html>
