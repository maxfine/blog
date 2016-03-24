<aside class="col-md-4 sidebar">

    <!-- start tag cloud widget -->
    <div class="widget">
        <h4 class="title">标签云</h4>
        <div class="content tag-cloud">
            @foreach($tagClloud as $data)
                <a href="{{ $data->url }}">{{ $data->tag }}</a>
            @endforeach
            <a href="{{ URL('tags/index') }}">...</a>
        </div>
    </div>
    <!-- end tag cloud widget -->

</aside>
