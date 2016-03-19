{!! Form::group_text('title','标题', ['label_col'=>3, 'placeholder'=>'请输入文章标题', 'percent'=>1], 1) !!}

{!! Form::form_select('category_id', '栏目', $data['allCategories'], 1, false) !!}

{!! Form::group_text('keywords','关键词', ['label_col'=>3, 'placeholder'=>' 多关键词之间用空格或者“,”隔开', 'percent'=>1], 1) !!}

<div class="form-group col-sm-12">
    <label class="col-sm-3 control-label">网址缩略名</label>
    <div class="col-sm-9">
        <b class="text-info">{{ URL('/blog/slug') . '/' }}</b>
        {!! Form::text('slug', null, ['class'=>'form-control visible-*-inline-block', 'style'=>'width: auto; display: inline-block;']) !!}
    </div>
</div>

{!! Form::single_file_upload('image', '封面图片', 1) !!}

{!! Form::group_area('description','摘要', ['label_col'=>3, 'placeholder'=>'请输入摘要', 'percent'=>1], 1) !!}

<div class="form-group col-sm-12">
    <label class="col-sm-3 control-label">内容</label>
    <div class="col-sm-9 dropzone" style="padding: 0 15px; border: none;">
        {!! Form::textarea('content', null, ['class'=>'form-control markdown-edit', 'placeholder'=>'支持拖放文件上传与图片预览', 'rows'=>'20', 'data-language'=>'zh']) !!}

        <div class="alert alert-warning">
            支持多个文件拖拽上传
        </div>
    </div>
</div>
<script src="{{ asset('plugins/markdown/marked.js') }}"></script>
<style type="text/css">
    .dropzone .dz-preview{display: none;}
</style>

<script type="text/javascript">
    init.push(function(){
        $(".markdown-edit").markdown({
            dropZoneOptions: {
                url: "{{ url('markdown/image/upload') }}",
                paramName:"file",
                maxFilesize: 2, // MB
                acceptedFiles: 'image/*',
                headers: {
                    'X-CSRF-Token': $('meta[name="_token"]').attr('content')
                }
            }
        });
    })
</script>

{!! Form::form_multi_select('tags', '标签', $data['allTags'], 1, false) !!}

{!! Form::group_text('list_order','排序', ['label_col'=>3, 'placeholder'=>'请输入栏目排序', 'percent'=>1], 1) !!}

{!! Form::group_checkbox('is_draft', '是草稿', [ [1, ''] ], 1) !!}

{!! Form::group_text('layout', '模板', ['label_col'=>3, 'placeholder'=>'请输入文章模板', 'percent'=>1], 1) !!}

{!! Form::form_date('published_at', '发布日期', ['label_col'=>3, 'placeholder'=>'请选择发布日期', 'percent'=>1], 1) !!}
