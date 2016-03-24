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

                <article class="post page">

                    <b class="post-head">
                        <h1 class="post-title">标签云</h1>
                    </b>

                    <section class="post-content widget">

                        <div class="tag-cloud">
                            @foreach($tags as $data)
                                <a href="{{ $data->url }}">{{ $data->tag }}</a>
                            @endforeach
                        </div>
                    </section>

                </article>
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

