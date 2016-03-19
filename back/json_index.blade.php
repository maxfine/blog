@extends('layout._admin')

@section('head_css')
@parent
<link href="{{ asset('css/plugins/dataTables/dataTables.bootstrap.css') }}" rel="stylesheet">
@endsection


@section('content-header')
    <div class="row wrapper border-bottom white-bg page-heading">
        <div class="col-lg-9">
            <h2>{{ $pageName }}</h2>
            <ol class="breadcrumb">
                <li>
                    <a href="{{ URL('admin/index') }}">后台首页</a>
                </li>
                <li>
                    <strong>{{ $pageName }}</strong>
                </li>
            </ol>
        </div>
    </div>

<div class="row  border-bottom white-bg dashboard-header">
    <div class="col-sm-12">
        <div class="pull-left"><a href="{{ URL('member/poster/themes/create/') }}" class="btn btn-primary"><i class="fa fa-plus"></i> 添加网站</a></div>
    </div>
</div>
@endsection

@section('content')
<div class="wrapper wrapper-content">
  <div class="row">
      <div class="col-sm-12">
          @if (count($errors) > 0)
              <div class="alert alert-danger">
                  <strong>出错了!</strong><br><br>
                  <ul>
                      @foreach ($errors->all() as $error)
                          <li>{{ $error }}</li>
                      @endforeach
                  </ul>
              </div>
          @endif
            <div class="ibox float-e-margins">
                <div class="ibox-title">
                    <h5>{{ $pageName }}</h5>
                    <div class="ibox-tools">
                        <a class="collapse-link">
                            <i class="fa fa-chevron-up"></i>
                        </a>
                        <a class="dropdown-toggle" data-toggle="dropdown" href="table_data_tables.html#">
                            <i class="fa fa-wrench"></i>
                        </a>
                        <ul class="dropdown-menu dropdown-user">
                            <li><a href="{{ URL('member/poster/themes/create/') }}">新&nbsp&nbsp增</a></li>
                            <li><a href="table_data_tables.html#">选项1</a>
                            </li>
                            <li><a href="table_data_tables.html#">选项2</a>
                            </li>
                        </ul>
                        <a class="close-link">
                            <i class="fa fa-times"></i>
                        </a>
                    </div>
                </div>
                <div class="ibox-content">
                    <!--<table class="table table-striped table-bordered table-hover " id="editable">-->
                    <table class="table table-striped table-hover " id="editable">
                        <thead>
                        <tr class="info">
                            <th><input type="checkbox" name="ckSelectAll" id="checkAll"></th>
                            <th>ID</th>
                            <th>网址</th>
                            <th>添加时间</th>
                            <th>过期时间</th>
                            <th>操作</th>
                        </tr>
                        </thead>
                    </table>

                    {!! $render !!}
                </div>
            </div>

      </div>
  </div>
</div>

@endsection

@section('extra_js')
    @parent
    <!-- Data Tables -->
    <script src="{{ asset('js/plugins/jeditable/jquery.jeditable.js') }}"></script>
    <script src="{{ asset('js/plugins/dataTables/jquery.dataTables.js') }}"></script>
    <script src="{{ asset('js/plugins/dataTables/dataTables.bootstrap.js') }}"></script>


    <!-- Page-Level Scripts -->
    <script>

        $(document).ready(function () {
            /* Init DataTables */
            var _data = {!! $posterThemes !!};
            var _uri = "{{ URL('member/poster/themes/') }}";
            var _uri2 = "{{ URL('poster/themes/') }}";
            var _csrf_token = "{{ csrf_token() }}";

            var oTable = $('#editable').dataTable(
                {
                    //"ajax": '/member/poster/themes',
                    "data": _data.data,
                    "columns":[
                        {data: function(row, type, set)
                        {
                            var _html = '<input name="checkList" type="checkbox" value=' + row.id +'>';
                            return _html;
                        }},
                        {"data":'id'},
                        {"data":'site_url'},
                        {"data":'created_at'},
                        {"data":'end_at'},
                        {data: function(row, type, set) {
                            var _html = '';
                            var _url = _uri2 + '/get_js/' + row.id;
                            var _url2 = _uri + '/renew/' + row.id;
                            var _url3 = _uri + '/' + row.id + '/edit';
                            var _url4 = _uri + '/' + row.id;
                            var _price = row.price;

                            _html += '<form action="' + _url2 + '" method="POST" data-amount="' + _price + '" style="display: inline;" class="renew-form">';
                            _html += '<input type="hidden" name="_token" value="' + _csrf_token + '">';
                            _html += '<button type="submit" class="btn btn-danger">续费</button> </form>';

                            _html += '<a href="javascript:;" data-url="' + _url + '" class="btn btn-success get-js">获取JS</a> ';

                            _html += '<a href="' + _url3 + '" class="btn btn-success">编辑</a> ';

                            _html += '<form action="' + _url4 + '" method="POST" style="display: inline;" class="del-form">';
                            _html += '<input name="_method" type="hidden" value="DELETE">';
                            _html += '<input type="hidden" name="_token" value="' + _csrf_token + '">';
                            _html += '<button type="submit" class="btn btn-danger">删除</button> </form>';
                            return _html;
                        }}
                    ],
                    //"serverSide": true,
                    "paging":   false,
                    "info": false,
                    "order": [[ 1, 'asc' ], [2, 'desc']],
                    "columnDefs": [
                        {
                            targets: [0,5],
                            searchable: false,
                            orderData: false
                        },
                        {
                            targets: [1,2],
                            searchable: true,
                            orderable: true
                        },
                        {
                            targets: [3,4],
                            searchable: false,
                            orderable: true
                        },
                    ]
                    //列宽度
                }
            );

            /* Apply the jEditable handlers to the table */
            oTable.$('td.editbale').editable('../example_ajax.php', {
                "callback": function (sValue, y) {
                    var aPos = oTable.fnGetPosition(this);
                    oTable.fnUpdate(sValue, aPos[0], aPos[1]);
                },
                "submitdata": function (value, settings) {
                    return {
                        "row_id": this.parentNode.getAttribute('id'),
                        "column": oTable.fnGetPosition(this)[2]
                    };
                },

                "width": "90%",
                "height": "100%"
            });


        });

        function fnClickAddRow() {
            $('#editable').dataTable().fnAddData([
                "Custom row",
                "New row",
                "New row",
                "New row"
            ]);

        };

        //自定义搜索
        $('.dsearch').on('keyup click', function () {
            var tsval = $(".dsearch").val()
            table.search(tsval, false, false).draw();
        });

        //checkbox全选
        $("#checkAll").on("click", function () {
            if ($(this).prop("checked") === true) {
                $("input[name='checkList']").prop("checked", $(this).prop("checked"));
            } else {
                $("input[name='checkList']").prop("checked", false);
            }
        });

        $(document).ready(function () {
            $('a.get-js').click(function () {
                html = '<div class="border-bottom white-bg page-heading clearfix">';
                html += '<h2>把下面的代码放入页面&lt;/body&gt;前</h2>';
                html += '<div class="alert alert-info">&lt;script type="text/javascript" src="'+$(this).data('url')+'"&gt;&lt;/script&gt;</div>';
                html +='</div>';
                layer.open({
                    title: '获取JS',
                    type: 1,
                    area: ['600px', 'auto'],
                    shadeClose: false, //点击遮罩关闭
                    content: html,
                    btn: ['确定', '取消'],
                    skin: 'layui-layer-rim' //加上边框
                });
                return false;
            });

            $('.renew').click(
                    function(){
                        layer.confirm('is not?', {icon: 3, title:'提示'}, function(index){
                            //do something
                            //return false;
                            layer.close(index);
                        });
                    }
            );

            $('.del-form').click(function(){
                //方法一
                //var checkDel = confirm('确定要执行此操作吗?');
                //return checkDel;

                //方法二
                $this = $(this);
                layer.confirm('确认删除?', {icon: 3, title:'提示'},
                        function(index){
                            //do something
                            $this.submit();
                            layer.close(index);
                        }
                );
                return false;
            });

            $('.renew-form').click(function(){
                //方法一
                //var checkDel = confirm('确定要执行此操作吗?');
                //return checkDel;

                //方法二
                $this = $(this);
                amount = $this.data('amount');
                layer.confirm('确认支付'+amount+'元?', {icon: 3, title:'提示'},
                        function(index){
                            //do something
                            $this.submit();
                            layer.close(index);
                        }
                );
                return false;
            });
        });

    </script>
@endsection
