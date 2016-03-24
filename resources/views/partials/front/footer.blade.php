<footer class="main-footer">
    <div class="container">
        <div class="row">
            <div class="col-sm-4">
                <div class="widget">
                    <h4 class="title">最新文章</h4>
                    <div class="content recent-post">
                        @foreach($lastPosts as $data)
                            <div class="recent-single-post">
                                <a href="{{ $data->url }}" class="post-title">{{ $data->title }}</a>
                                <div class="date">{{ $data->published_at }}</div>
                            </div>
                        @endforeach
                    </div>
                </div>
            </div>

            <div class="col-sm-4">
                <div class="widget">
                    <h4 class="title">标签云</h4>
                    <div class="content tag-cloud">
                        @foreach($tagClloud as $data)
                            <a href="{{ $data->url }}">{{ $data->tag }}</a>
                        @endforeach
                        <a href="{{ URL('tags/index') }}">...</a>
                    </div>
                </div>
            </div>

            <div class="col-sm-4">
                <div class="widget">
                    <h4 class="title">友情链接</h4>
                    <div class="content tag-cloud friend-links">
                        <a href="http://www.znyes.com" title="正言网络科技"  target="_blank">正言网络科技</a>
                    </div>
                </div></div>
        </div>
    </div>
</footer>

<div class="copyright">
    <div class="container">
        <div class="row">
            <div class="col-sm-12">
                <span>Copyright &copy; <a href="/">my website</a></span> |
                <span>备案号:</span>
            </div>
        </div>
    </div>
</div>

<a href="#" id="back-to-top"><i class="fa fa-angle-up"></i></a>
