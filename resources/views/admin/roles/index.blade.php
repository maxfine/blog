@extends('layout._admin')

@section('title') 网站后台-{{ $title }} @stop

@section('extra_css')
    @parent
    <link href="{{ asset('assets/css/admin-role.css') }}" rel="stylesheet">
@stop

@section('head_js')
    @parent
@stop

@section('head_style')
<style type="text/css">
    .m-b-md {
        padding: 16px;
        margin-bottom: 24px;
    }
    .b-t-2x {
        border-top-width: 2px !important;
    }
    .b-t {
        border-top: 1px solid #dddee0;
    }
    .md-whiteframe-z0 {
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.15);
    }

    .indigo {
        background-color: #3f51b5;
    }

    .md-switch {
        min-height: 20px;
        padding-left: 36px;
        margin: 0;
        cursor: pointer;
    }

    .md-switch input {
        position: absolute;
        z-index: 1;
        width: 36px;
        height: 20px;
        margin-left: -36px;
        cursor: pointer;
        opacity: 0;
        filter: alpha(opacity=0);
    }

    .md-switch input:checked + i:before {
        background: inherit;
        opacity: 0.5;
    }

    .md-switch input:checked + i:after {
        left: 16px;
        background: inherit;
    }

    .md-switch input[disabled] + i:before,
    fieldset[disabled] .md-switch input + i:before {
        background-color: rgba(0, 0, 0, 0.12);
    }

    .md-switch input[disabled] + i:after,
    fieldset[disabled] .md-switch input + i:after {
        background-color: #bdbdbd;
    }

    .md-switch i {
        position: relative;
        display: inline-block;
        width: 0;
        height: 18px;
        margin-top: -2px;
        margin-right: 44px;
        margin-left: -36px;
        line-height: 1;
        vertical-align: middle;
    }

    .md-switch i:before {
        position: absolute;
        top: 3px;
        left: 1px;
        width: 34px;
        height: 14px;
        background-color: #9e9e9e;
        border-radius: 8px;
        content: "";
        -webkit-transition: all 0.2s;
        transition: all 0.2s;
    }

    .md-switch i:after {
        position: absolute;
        top: 0;
        left: 0;
        width: 20px;
        height: 20px;
        margin: 0;
        background-color: #fff;
        border-radius: 50%;
        content: "";
        outline: none;
        box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.26);
        -webkit-transition: all 0.2s;
        transition: all 0.2s;
    }
</style>
@stop


{{-- 内容主体区域 --}}
@section('content')
    <div class="wrapper wrapper-content">
        <div class="row">
            <div class="col-sm-12">

                {!! Form::box_start($pageName) !!}

                    {!! Html::list_header($results['heads']) !!}

                    @include('partials.admin.errors')

                    {!! Html::datagrid($results) !!}

                    @if(!empty($results['foots']))
                    {!! Html::list_footer($results['foots']) !!}
                    @endif

                {!! Form::box_end('') !!}

                {!! Html::modal_start('modal', '分配权限') !!}
                <div class="md-whiteframe-z0 bg-white">
                    {!! Form::open(['method'=>'POST','url'=>'admin/roles/assign-permission','id'=>'form_id']) !!}
                    {!! Form::hidden_input('id') !!}
                    <div class="tab-content p m-b-md b-t b-t-2x">
                        @foreach($perms as $perm)
                            <label class="md-switch"><input type="checkbox" name="{{ $perm->name }}"><i class="indigo"></i>{{ $perm->description ? $perm->display_name .'「'.$perm->description.'」' : $perm->display_name }}</label>
                        @endforeach
                    </div>
                    {!! Form::close() !!}
                </div>
                {!! Html::modal_end() !!}

            </div>
        </div>
    </div>
@stop

@section('common_js')
    @parent
    <script src="{{ asset('assets/js/admin-role.js') }}"></script>
@stop

@section('extra_js')
    @parent
    <script type="text/javascript">
        Array.prototype.contains = function(obj) {
            var i = this.length;
            while (i--) {
                if (this[i] === obj) {
                    return true;
                }
            }
            return false;
        };

        var datas = [];
        var data = '';

        function fillModal(id) {
            data = datas[id];
            data = JSON.parse(data);
            var permissions = [];
            var index=0;
            data['permissions'].forEach(function(perm) {
                permissions[index++] = perm['name'];
            });

            $('#form_id :input').each(function () {
                var name = $(this).attr('name');
                if (permissions.contains(name)) {
                    $(this).prop( "checked", true );
                } else {
                    $(this).prop( "checked", false );
                }
                if (data[name]) {
                    $(this).val(data[name]);
                }
            });
        }

        $(document).on('confirmation', '#modal', function () {
            $('#form_id').submit();
        });
    </script>

    <script>
        $(function(){
            $(document).on('blur', 'input, textarea', function (e) {
                $(this).val() ? $(this).addClass('has-value') : $(this).removeClass('has-value');
            });

        });
    </script>

@stop
