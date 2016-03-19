{!! Form::group_text('name','名称', ['label_col'=>3, 'placeholder'=>'请输入栏目名称', 'percent'=>1], 1) !!}

{!! Form::form_select('parent_id', '上级栏目', $data['allCategories'], 1, false) !!}

{!! Form::group_text('keywords','关键词', ['label_col'=>3, 'placeholder'=>'请输入栏目关键词', 'percent'=>1], 1) !!}

{!! Form::single_file_upload('image', '封面图片', 1) !!}

{!! Form::group_area('description','摘要', ['label_col'=>3, 'placeholder'=>'请输入摘要', 'percent'=>1], 1) !!}

{!! Form::group_checkbox('show_in_nav', '显示在导航栏', [ [1, ''] ], 1) !!}

{!! Form::group_text('list_order','排序', ['label_col'=>3, 'placeholder'=>'请输入栏目排序', 'percent'=>1], 1) !!}

{!! Form::group_checkbox('is_show', '是否显示', [ [1, ''] ], 1) !!}
