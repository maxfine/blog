<script src="{{ asset('http://cdn.bootcss.com/jquery/1.11.2/jquery.min.js') }}"></script>
<link rel="stylesheet" href="http://cdn.bootcss.com/codemirror/4.10.0/codemirror.min.css">
<link rel="stylesheet" href="http://cdn.bootcss.com/highlight.js/8.4/styles/default.min.css">

<script src="http://cdn.bootcss.com/highlight.js/8.4/highlight.min.js"></script>
<script src="http://cdn.bootcss.com/marked/0.3.2/marked.min.js"></script>
<script type="text/javascript" src="http://cdn.bootcss.com/codemirror/4.10.0/codemirror.min.js"></script>
<script type="text/javascript" src="http://cdn.bootcss.com/zeroclipboard/2.2.0/ZeroClipboard.min.js"></script>

<link rel="stylesheet" href="{{ asset('plugins/editor/css/pygment_trac.css') }}">
<link rel="stylesheet" href="{{ asset('plugins/editor/css/editor.css') }}">
<script type="text/javascript" src="{{ asset('plugins/editor/js/highlight.js') }}"></script>
<script type="text/javascript" src="{{ asset('plugins/editor/js/modal.js') }}"></script>
<script type="text/javascript" src="{{ asset('plugins/editor/js/MIDI.js') }}"></script>
<script type="text/javascript" src="{{ asset('plugins/editor/js/fileupload.js') }}"></script>
<script type="text/javascript" src="{{ asset('plugins/editor/js/bacheditor.js') }}"></script>
<meta name="csrf-token" content="{{ csrf_token() }}" />

<script>
    init.push(function(){
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });

        $(function() {
            url = "{{ url(config('editor.uploadUrl')) }}";
            var myEditor = new Editor(url);
            myEditor.render('#myEditor');
        });
    });
</script>

<style>
    .editor{
        width:{{ config('editor.width') }};
    }
</style>
