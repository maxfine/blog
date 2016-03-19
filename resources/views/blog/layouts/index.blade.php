@extends('layout._blog')

{{--不要有换行--}}
@section('body_attr')class="home-template"@endsection

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

                @foreach($posts as $data)
                {{--begin todo--}}
                <article id={{ $data->id }} class="post">
                    <div class="post-head">
                        <h1 class="post-title"><a href="{{ $data->url }}">{{ str_limit($data->title, 40) }}</a></h1>
                        <div class="post-meta">
                            <span class="author">作者：{{ $data->author }}</span> &bull;
                            <time class="post-date" datetime="{{ $data->published_at }}" title="{{ $data->published_at }}">
                                {{ $data->published_at_zh_format }}
                            </time>
                        </div>
                    </div>
                    <div class="featured-media">
                        <a href="{{ $data->url }}">
                            <img src="{{ $data->full_image}}" alt="{{ $data->title }}">
                        </a>
                    </div>
                    <div class="post-content">
                        <p>
                            {!! str_limit($data->description, 200) !!}
                        </p>
                    </div>
                    <div class="post-permalink">
                        <a href="{{ $data->url }}" class="btn btn-default">阅读全文</a>
                    </div>

                    <footer class="post-footer clearfix">
                        <div class="pull-left tag-list">
                            <i class="fa fa-folder-open-o"></i>
                            @foreach($data->tags as $tag)
                                <a href="{{ $tag->url }}">{{ $tag->tag }}</a>
                            @endforeach
                        </div>
                        <div class="pull-right share">
                        </div>
                    </footer>
                </article>
                {{--end--}}
                @endforeach

                <nav class="pagination" role="navigation">
                    @if($posts->previousPageUrl())
                    <a class="newer-posts" href="{{ $posts->previousPageUrl() }}"><i class="fa fa-angle-left"></i></a>
                    @endif
                    <span class="page-number">第 {{ $posts->currentPage() }} 页 &frasl; 共 {{ $posts->lastPage() }} 页</span>
                    @if($posts->nextPageUrl())
                    <a class="older-posts" href="{{ $posts->nextPageUrl() }}"><i class="fa fa-angle-right"></i></a>
                    @endif
                </nav>


            </main>

            @include('partials.front.right')
        </div>
    </div>
</section>
@stop



@section('extra_js')
    @parent
    <script src="{{ asset('assets/js/index.js') }}"></script>
    <script>
        $(document).ready(function(){
            var qqgroup = 'QQ群：462694081';
            $('.qq-group').text(qqgroup);
        });
    </script>
@stop

