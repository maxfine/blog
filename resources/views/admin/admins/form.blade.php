{!! Form::group_text('name','用户名', ['label_col'=>3, 'placeholder'=>'请输入用户名', 'percent'=>1], 1) !!}

{!! Form::group_text('email', '邮箱', ['label_col'=>3, 'placeholder'=>'请输入邮箱', 'percent'=>1], 1) !!}

@if (str_is('admin.admins.create', Route::current()->getName()))
    {!! Form::group_password('password','密码', ['label_col'=>3, 'placeholder'=>'请输入密码', 'percent'=>1], 1) !!}
@endif