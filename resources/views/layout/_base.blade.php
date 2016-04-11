<!DOCTYPE html>
<html>
<head>
    <meta charset="@yield('charset', 'UTF-8')">
    <title>@yield('title', 'your title, 豪迈人生, 极致体验'){{-- 页面标题 --}}</title>
    <meta name="keywords" content="@yield('keywords', 'your keywords, 豪迈人生, 极致体验')"/>
    <meta name="description" content="@yield('description', 'your description, 豪迈人生, 极致体验')"/>
    <meta name="author" content="@yield('author', 'maxfine <max_fine@qq.com>')"/>
    <meta name="_token" content="@yield('_token', csrf_token())"/>

    @section('meta')
    @show{{-- 添加一些额外的META申明 --}}

    <link rel="shortcut icon" href="@yield('ico', asset('favicon.ico'))" type="image/x-icon">{{-- favicon --}}

    @section('head_css')
    @show{{-- head区域css样式表 --}}

    @section('head_js')
    @show{{-- head区域javscript脚本 --}}

    @section('before_head_style')
    @show{{-- 在内联样式之前填充一些东西 --}}

    @section('head_style')
    @show{{-- head区域内联css样式表 --}}

    @section('after_head_style')
    @show{{-- 在内联样式之后填充一些东西 --}}

</head>
<body @section('body_attr')class=""@show{{-- 追加类属性 --}}>

    @section('before_main')
    @show{{--在正文之后填充一些东西 --}}

    @section('main')
    @show{{-- 正文部分 --}}

    @section('after_main')
    @show{{-- 在正文之后填充一些东西，比如统计代码之类的东东 --}}

</body>
</html>
