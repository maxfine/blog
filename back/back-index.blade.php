@extends('resources.views.layout._base')

<html>
<head>
    <title>{{ config('blog.title') . $pageName }}</title>
    <link href="{{ asset('/assets/css/common.css') }}" rel="stylesheet">
</head>
<body>
<div class="container">
    <h1>{{ config('blog.title') }}</h1>
    <h5>Page {{ $posts->currentPage() }} of {{ $posts->lastPage() }}</h5>
    <hr>
    <ul>
        @foreach ($posts as $post)
            <li>
                <a href="/blog/{{ $post->slug }}">{{ $post->title }}</a>
                <em>({{ $post->published_at }})</em>
                <p>
                    {{-- 一个汉字占两个字节 --}}
                    {{ str_limit($post->content, 200) }}
                </p>
            </li>
        @endforeach
    </ul>
    <hr>
    {!! $posts->render() !!}
</div>
<script>
    function Foo() {this.name = 'hello'; this.fun = function(){}}
    Foo.prototype = {'sex' : 'man', 'name' : 'maxfine'};
    var foo = new Foo();
    console.log(foo.name);
    console.log(foo.sex);
    obj = new Object;
    console.log(obj);

    console.log(foo.constructor);
    console.log(foo);
    console.log(foo.prototype);// undefined
    console.log(foo.__proto__ === Foo.prototype);// true
    console.log(Foo.prototype);// [object Object]
    console.log(Foo.prototype.prototype);// undefined
</script>
</body>
</html>
