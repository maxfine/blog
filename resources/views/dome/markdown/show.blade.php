<!doctype html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">

    <title>test markdown parsedown</title>

    <link rel="stylesheet" href="{{ asset('http://cdn.bootcss.com/bootstrap/3.3.0/css/bootstrap.min.css') }}">
    <link rel="stylesheet" href="{{ asset('http://cdn.bootcss.com/font-awesome/4.3.0/css/font-awesome.min.css') }}">
    <!--[if lt IE 9]>
    <script src="//html5shiv.googlecode.com/svn/trunk/html5.js"></script>
    <![endif]-->
</head>
<body>
<section id="markdown">
    <div class="container">
            {!! $content !!}
    </div>
</section>

<script src="{{ asset('/assets/js/admin.js') }}"></script>
<script src="{{ asset('/plugin/layer/layer.js') }}"></script>
<script type="text/javascript">
    $(function() {
        //加载扩展模块
        layer.config({
            extend: 'extend/layer.ext.js'
        });
        //页面一打开就执行，放入ready是为了layer所需配件（css、扩展模块）加载完毕
        layer.ready(function(){
            //使用相册
            layer.photos({
                shift: '0',
                photos: '#markdown'
            });
        });

    });
</script>

</body>
</html>
