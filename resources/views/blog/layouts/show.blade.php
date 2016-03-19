@extends('layout._blog')

{{--不要有换行--}}
@section('body_attr')class="post-template"@endsection

@section('extra_css')
    @parent
    <link href="{{ asset('assets/css/index.css') }}" rel="stylesheet">
@stop

@section('content')
<!-- start site's main content area -->
<section class="content-wrap">
    <div class="container">
        <div class="row">
            <main class="col-md-8 main-content">
                <article id="43" class="post tag-laravel tag-ming-ming-kong-jian">
                    <header class="post-head">
                        <h1 class="post-title">{{ $post->title }}</h1>
                        <section class="post-meta">
                            <span class="author">作者：{{ $post->author }}</span> &bull;
                            <time class="post-date" datetime="{{ $post->published_at }}" title="{{ $post->published_at }}">{{ $post->published_at_zh_format }}</time>
                        </section>
                    </header>


                    <section class="post-content">
                        {!! $post->content_html !!}
                    </section>

                    <footer class="post-footer clearfix">
                        <div class="pull-left tag-list">
                            <i class="fa fa-folder-open-o"></i>
                            @foreach($tags as $tag)
                                <a href="{{ $tag->url }}">{{ $tag->tag }}</a>,
                            @endforeach
                        </div>

                    </footer>

                </article>

                <div class="about-author clearfix">
                    <a href="javascript:;"><img src="{{ URL('assets/images/logo.png') }}" alt="maxfine" class="avatar pull-left"></a>

                    <div class="details">
                        <div class="author">
                            关于作者 <a href="javascript:;">maxfine</a>
                        </div>
                        <div class="bio">
                            主站点：http://www.edc80.com/ 个人简介：http://me.edc80.com<br>
                            由于学艺不精，内容可能有误。如有错误欢迎联系邮箱max_fine@qq.com指出。谢谢！
                        </div>
                    </div>
                </div>

                <div class="prev-next-wrap clearfix">

                    <a class="btn btn-default" href="/"><i class="fa fa-angle-left fa-fw"></i> 上一篇</a>
                    &nbsp;

                    <a class="btn btn-default" href="/">下一篇 <i class="fa fa-angle-right fa-fw"></i></a>
                </div>

                <!-- 多说评论框 start -->
                <div class="ds-thread" data-thread-key="{{ $post->id }}" data-title="{{ $post->title }}" data-url="{{ $post->url }}"></div>
                <!-- 多说评论框 end -->
                <!-- 多说公共JS代码 start (一个网页只需插入一次) -->
                <script type="text/javascript">
                    var duoshuoQuery = {short_name:"zhengyan2"};
                    (function() {
                        var ds = document.createElement('script');
                        ds.type = 'text/javascript';ds.async = true;
                        ds.src = (document.location.protocol == 'https:' ? 'https:' : 'http:') + '//static.duoshuo.com/embed.js';
                        ds.charset = 'UTF-8';
                        (document.getElementsByTagName('head')[0]
                        || document.getElementsByTagName('body')[0]).appendChild(ds);
                    })();
                </script>
                <a name="comments"></a>
                <!-- 多说公共JS代码 end -->


            </main>

            @include('partials.front.right')
        </div>
    </div>
</section>
@stop

@section('extra_js')
    @parent
    <script src="{{ asset('assets/js/index.js') }}"></script>
@stop
