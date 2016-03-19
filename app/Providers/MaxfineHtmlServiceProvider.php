<?php
namespace App\Providers;

use Form;
use Html;
use Illuminate\Support\Facades\Input;
use Illuminate\Support\ServiceProvider;
use Illuminate\Http\Request;

class MaxfineHtmlServiceProvider extends ServiceProvider
{
    public function register()
    {

    }

    public function boot()
    {
        $this->groupLabel();
        $this->boxStart();
        $this->boxEnd();
        $this->panelStart();
        $this->panelEnd();
        $this->modalStart();
        $this->modalEnd();
        $this->modalButton();
        $this->json();
        $this->datagridHeader();
        $this->dataGrid();
        $this->datagridFooter();
        $this->datagridPages();
        $this->menu();
    }

    public static function parseValue($model, $name)
    {
        $arr = explode('.', $name);
        if (sizeof($arr) == 2) {
            return $model && (!is_array($model) || array_key_exists($arr[0], $model)) ? $model[$arr[0]][$arr[1]] : '';
        } else {
            return $model && (!is_array($model) || array_key_exists($name, $model)) ? $model[$name] : '';
        }
    }

    private function dataGridFooter()
    {
        Html::macro('list_footer', function($data) {
            $js = '';
            $html = '<table class="table">';
            $html .= '<tfoot>';
            $html .= '<tr>';

            if(array_key_exists('checkAll', $data)){
                $html .= '<td style="width:50px">';
                $html .= Form::checkbox('', '', false, ['id'=>'checkAll', 'class'=>'changeSelectionAll']);
                $html .= '</td>';

                $js .= '<script>
                    init.push(
                        function() {
                            $("#checkAll").on("click", function(){
                                if ($(this).prop("checked") === true) {
                                    $(":checkbox[name=\'id[]\']").prop("checked", $(this).prop("checked"));
                                } else {
                                    $(":checkbox[name=\'id[]\']").prop("checked", false);
                                }
                              }
                            );
                       }
                   );
                </script>';
            }
            $html .= '<td colspan="10">';
            $html .= '<div class="pull-left">';
            if(array_key_exists('order', $data)) {
                $order = is_bool($data['order']) ? '排序' : $data['order'];
                $html .= '<button type="submit" class="btn waves-effect btn-default btn-order" style="margin-right: 5px;">'. $order .'</button>';

                $js .= '<script>
                    init.push(
                        function() {
                            $(".btn-order").on("click", function(){
                                var data = new Object();
                                data["_token"] = "'. csrf_token() .'";
                                $(".listorder").each(function(){
                                    data[this.name] = this.value;
                                })

                                jQuery.ajax({
                                    url: "'. $this->url->current().'/list_order' .'",
                                    type: "post",
                                    dataType: "json",
                                    data: data,
                                    success: function(info){
                                        if(info["status"]){
                                            alert(info["message"]);
                                        }else{
                                            alert(info["message"]);
                                        }
                                        self.location.reload();
                                    }
                                });

                            });
                       }
                   );
                </script>';
            }
            if(array_key_exists('delete', $data)) {
                $delete = is_bool($data['delete']) ? '删除' : $data['delete'];
                $html .= '<button class="btn btn-danger waves-effect btn-delete" style="margin-right: 5px;">'. $delete .'</button>';

                $js .= '<script>
                    init.push(
                        function() {
                            $(".btn-delete").on("click", function(){
                                var data = new Object();
                                data["id"] = {};
                                var i=0;
                                data["_token"] = "'. csrf_token() .'";
                                $(":checkbox[name=\'id[]\']").each(function(){
                                    if ($(this).is(":checked")) {
                                        data["id"][i++] = this.value;
                                    }
                                })

                                if(!confirm("确认吗？")){
                                    return false;
                                }

                                jQuery.ajax({
                                    url: "'. $this->url->current().'/mulit_destroy' .'",
                                    type: "post",
                                    dataType: "json",
                                    data: data,
                                    success: function(info){
                                        if(info["status"]){
                                            alert(info["message"]);
                                        }else{
                                            alert(info["message"]);
                                        }
                                        self.location.reload();
                                    }
                                });

                            });
                       }
                   );
                </script>';
            }
            $html .= '</div>';
            $html .= '</td>';
            $html .= '</tr>';
            $html .= '</tfoot>';
            $html .= '</table>';

            $html = $html.$js;

            return $html;
        });
    }

    private function dataGrid()
    {
        Html::macro('datagrid', function ($data) {

            $html = '<div class="table-responsive">';
            $html .=
            $html .= '<table id="editable" class="table table-striped table-hover">';
            $columns = $data['columns'];
            $items = $data['items'];
            $params = !empty($data['params'])?$data['params'] : []; //url参数
            $heads = [];
            $widths = [];
            $fields = [];
            $functions = [];

            // build table head
            $html .= '<thead><tr>';
            foreach ($columns as $column) {
                array_push($heads, $column[0]); // title
                array_push($fields, $column[1]); // fields
                $size = sizeof($column);
                switch ($size) {
                    case 2:
                        array_push($widths, 0); // width
                        break;
                    case 3:
                        if (is_int($column[2])) {
                            array_push($widths, $column[2]);
                        } else {
                            array_push($widths, 0);
                            $functions[$column[1]] = $column[2];
                        }
                        break;
                    case 4:
                        array_push($widths, $column[2]);
                        $functions[$column[1]] = $column[3];
                        break;
                }
            }

            foreach ($heads as $head) {
                $index = array_search($head, $heads);
                $class = '';
                $dataToggle = '';

                /**
                 * ---------------------------------------------------------
                 * 区分第一, 末尾列
                 * ---------------------------------------------------------
                 */
                if ($index == 0) {
                    $class .= 'first-column ';
                }
                if ($index == sizeof($heads)) {
                    $class .= 'last-column ';
                }

                /**
                 * ---------------------------------------------------------
                 * 手机与平板隐藏超出列
                 * ---------------------------------------------------------
                 */
                if ($index < 4 && $index >1) {
                    $class .= 'hidden-xs ';
                } elseif($index > 4) {
                    $class .= 'hidden-xs hidden-sm ';
                }

                /**
                 * ---------------------------------------------------------
                 * 设定列宽度
                 * ---------------------------------------------------------
                 */
                if ($widths[$index]) {
                    $dataToggle .= ' style="width:' . $widths[$index] . 'px"';
                }

                $item = '<th ' . $dataToggle . ' class="' . $class . '" >' . $head . '</th>';
                $html .= $item;
            }
            $html .= '</tr></thead>';

            $html .= '<tbody>';
            if ($items) {
                foreach ($items as $item) {
                    $html .= '<tr>';
                    foreach ($fields as $field) {
                        $index = array_search($field, $fields);
                        $class = '';
                        /**
                         * ---------------------------------------------------------
                         * 手机与平板隐藏超出列
                         * ---------------------------------------------------------
                         */
                        if ($index < 4 && $index >1) {
                            $class .= 'hidden-xs ';
                        } elseif($index > 4) {
                            $class .= 'hidden-xs hidden-sm ';
                        }

                        /**
                         * ---------------------------------------------------------
                         * 设定列宽度
                         * ---------------------------------------------------------
                         */
                        $html .= $widths[$index] ? '<td class="' . $class . '" style="width: ' . $widths[$index] . 'px">' : '<td class="' . $class . '">';
                        if ($field == '_buttons') {
                            /**
                             * ---------------------------------------------------------
                             * 匿名函数获取buttons数组
                             * ---------------------------------------------------------
                             * EG: [['编辑' ..], ['角色分配', ..]]
                             */
                            $buttons = $functions[$field]($item);

                            foreach ($buttons as $button) {
                                /**
                                 * ---------------------------------------------------------
                                 * 1. 一个元素, 常用于:查看, 编辑, 关闭, 启用
                                 * 2. 多个元素
                                 * 2.1. 两个元素, 并且是索引键, EG: ['分配角色', '#modal'], 点击button会出现弹出层
                                 * 2.2. 多个元素(包括两个), 包含key为name的元素
                                 * 2.2.1. 包含'method' => 'GET', EG: ['method' => 'GET', 'uri' => '/admin/user', 'params' => 'id,name']
                                 * 2.2.2. 其他,
                                 * ---------------------------------------------------------
                                 */

                                $size = sizeof($button);
                                if ($size == 1) {
                                    $value = $button[0];
                                    if ($value == '禁用') {
                                        $html .= Form::form_button([
                                            'name'  => $value,
                                            'id'    => $item->id,
                                            'class' => 'btn-danger'
                                        ], ['enabled' => false]);
                                    } else if ($value == '启用') {
                                        $html .= Form::form_button([
                                            'name'  => $value,
                                            'id'    => $item->id,
                                            'class' => 'btn-success'
                                        ], ['enabled' => true]);
                                    } else if ($value == '查看') {
                                        $html .= '<a href="' . $this->url->current() . '/' . $item->id . '">
                                                    <button class="btn btn-default waves-effect">查看</button></a>';
                                    } else if ($value == '编辑') {
                                        $html .= '<a href="' . $this->url->current() . '/' . $item->id . '/edit">
                                                    <button class="btn btn-default waves-effect">编辑</button></a>';
                                    }
                                } elseif($size == 2 && !array_key_exists('name', $button)){
                                    if(empty($button[0]) || empty($button[1]) || !is_string($button[0]) || strripos($button[1], '#') !== 0)continue;

                                    $label = $button[0];
                                    $modal = $button[1];

                                    $html .= Form::modal_button($label, $modal, $item);
                                } else{
                                    if(!array_key_exists('name', $button))continue;

                                    $config = $button;
                                    $data = [];

                                    if (array_key_exists('method', $config) && $config['method'] == 'GET') {
                                        $uri = array_key_exists('uri', $config) ? $config['uri'] : '';
                                        $params = array_key_exists('params', $config) ? $config['params'] : '';
                                        if ($params) {
                                            $params = explode(',', $params);
                                            $query = [];
                                            foreach ($params as $key) {
                                                if(!empty($item[$key])) $query[$key] = $item[$key];
                                            }
                                            /**
                                             * ---------------------------------------------------------
                                             * http_build_query, 转成url格式
                                             *
                                             * ---------------------------------------------------------
                                             */
                                            $uri .= '?' . http_build_query($query);
                                            $config['uri'] = $uri;
                                        }
                                    } else {
                                        $config['id'] = $item->id;
                                    }
                                    $html .= Form::form_button($config, $data);
                                }
                            }
                        } else {
                            if (array_key_exists($field, $functions)) {
                                $value = $functions[$field](!empty($item[$field])?$item[$field]:null, $item);
                            } else {
                                $arr = explode('.', $field);
                                if (sizeof($arr) == 2) {
                                    $value = $item[$arr[0]][$arr[1]];
                                } else {
                                    $value = $item[$field];
                                }
                            }
                            $html .= $value . '</td>';
                        }
                    }
                    $html .= '</tr>';
                }
            }
            $html .= '</tbody>';
            $html .= '</table>';

//            $html .= Html::list_footer($data);

            $html .= (is_object($items) && !empty($items->total())) ? $items->appends($params)->render() : '';
            $html .= '</div>';
            return $html;
        });
    }

    private function groupLabel()
    {
        Form::macro('group_label', function ($name, $label) {
            $value = MaxfineHtmlServiceProvider::parseValue($this->model, $name);
            return '<div class="control-group">
                        <label for="title" class="control-label">' . $label . '</label>
                        <div class="controls">
                            <label for="title" class="control-label">' . $value . '</label>
                        </div>
                    </div>';
        });
    }

    public function boxStart()
    {
        Form::macro('box_start', function ($title = '') {
            return '<div class="ibox float-e-margins">
                        <div class="ibox-title">
                            <h5>' . $title . '</h5>
                            <div class="ibox-tools">
                                <a class="collapse-link">
                                    <i class="fa fa-chevron-up"></i>
                                </a>
                                <a class="dropdown-toggle" data-toggle="dropdown" href="#">
                                    <i class="fa fa-wrench"></i>
                                </a>
                                <ul class="dropdown-menu dropdown-user">
                                    <li><a href="javascript:self.location.reload();">刷&nbsp&nbsp新</a></li>
                                    <li><a href="javascript:history.go(-1);">返&nbsp&nbsp回</a></li>
                                </ul>
                                <a class="close-link">
                                    <i class="fa fa-times"></i>
                                </a>
                            </div>
                        </div>
                    <div class="ibox-content clearfix">';
        });
    }

    public function boxEnd()
    {
        Form::macro('box_end', function ($submit_label = '') {
            if (!$submit_label) {
                return '</div></div>';
            }
            $result = '</div><footer class="ibox-footer">
                            <button type="submit" class="btn btn-info">' . $submit_label . '</button>
                        </footer></div>';
            return $result;
        });
    }

    public function panelStart()
    {
        Form::macro('panel_start', function ($title = '') {
            return '<div class="panel panel-default">
                        <div class="panel-heading bg-white">
                            <span class="font-bold">' . $title . '</span>
                        </div>
                    <div class="panel-body">';
        });
    }

    public function panelEnd()
    {
        Form::macro('panel_end', function ($submit_label = '') {
            if (!$submit_label) {
                return '';
            }
            $result = '</div><footer class="panel-footer">
                            <button type="submit" class="btn btn-info">' . $submit_label . '</button>
                        </footer></div>';
            return $result;
        });
    }


    public function modalButton()
    {
        Form::macro('modal_button', function ($label, $modal, $data, $class = 'btn-default waves-effect') {
            $jsonData = json_encode($data);
            $html = '<a href="' . $modal . '" style="margin-left:5px;"><button onclick="fillModal(\'' . $data->id . '\')" class="btn ' . $class . '" >' . $label . '</button></a>';
            $js = "<script>init.push(function(){datas['" . $data->id . "']='" . $jsonData . "';})</script>";
            return $html . $js;
        });
    }

    private function modalStart()
    {
        Html::macro('modal_start', function ($id, $title) {
            $html = '<div id="' . $id . '" class="remodal" data-remodal-id="' . $id . '">
                    <input type="hidden">
                    <div>
                        <span style="font-size: 20px">' . $title . '</span>
                    </div>
                    <div class="panel-body" style="margin: 35px 0px;padding: 0;">';
            return $html;
        });
    }

    private function json()
    {
        Html::macro('json', function ($data) {
            return '<pre><code>' . json_encode($data, JSON_PRETTY_PRINT) . '</code></pre>';
        });
    }

    private function modalEnd()
    {
        Html::macro('modal_end', function () {
            return '</div><div><button data-remodal-action="cancel" class="remodal-cancel" style="margin-right: 20px;">取消</button>
        <button data-remodal-action="confirm" class="remodal-confirm">确认</button></div>';
        });
    }

    private function datagridHeader()
    {
        $handler = function ($data) {
            $html = '';
            $title = isset($data['title']) ? $data['title'] : '';
//            $html .= '<div class="panel-body">';
            $html .= '<div class="clearfix">';

            if (array_key_exists('new', $data)) {
                $html .= '<a href="' . $this->url->current() . '/create" class="btn btn-default pull-left" style="margin-right:15px;">&#43; 新增</a>';
            }

            if (array_key_exists('filters', $data)) {
                $result = '';
                foreach ($data['filters'] as $key => $value) {
                    $result .= '<div class="col-sm-2 visible-lg-block" style="padding-left: 0px;width: 10%">
                        <select class="form-control filter" name="' . $key . '">';
                    foreach ($value as $item) {
                        $value = is_array($item) ? $item['value'] : $item;
                        $label = is_array($item) ? $item['label'] : $item;
                        $selected = '';
                        $urlValue = Input::get($key);
                        if ($urlValue != null) {
                            $selected = $urlValue == $item['value'] ? 'selected="selected"' : '';
                        }
                        $result .= '<option ' . $selected . ' value="' . $value . '">' . $label . '</option>';
                    }
                    $result .= '</select></div>';
                }

                $js = "<script>
                        init.push(function(){
                        $('select.filter').change(function(){
                            var params = window.location.search.substring(1);
                            var paramObject = {};
                            var paramArray = params.split('&');
                            paramArray.forEach(function(param){
                                if(param){
                                    var arr = param.split('=');
                                    paramObject[arr[0]] = arr[1];
                                }
                            });
                            var baseUrl = window.location.origin+window.location.pathname;
                            if($(this).val()){
                                paramObject[$(this).attr('name')] = $(this).val();
                            }else{
                                delete paramObject[$(this).attr('name')];
                            }
                            window.location.href = $.param(paramObject) ? baseUrl+'?'+$.param(paramObject) : baseUrl;
                        });
                    })</script>";
                $html .= $result . $js;
            }

            if (array_key_exists('priceStart',$data)) {

                $priceStart = is_bool($data['priceStart']) ? '价格' : $data['priceStart'];
                $html .= '<div class="col-md-3 visible-lg-block" style="padding-left:0px;width: 10%">
                                <input id="priceStartInput" type="text" class="form-control input" name="priceStart" value="'.Input::get('priceStart').'" placeholder="'.$priceStart.'"  />
                            </div>';
                $js = "<script>init.push(function(){
                    $('#priceStartInput').keyup(function(event){
                        if(event.keyCode == 13){
                            console.log('do search');
                            var params = window.location.search.substring(1);
                            var paramObject = {};
                            var paramArray = params.split('&');
                            paramArray.forEach(function(param){
                                if(param){
                                    var arr = param.split('=');
                                    paramObject[arr[0]] = arr[1];
                                }
                            });
                            var baseUrl = window.location.origin+window.location.pathname;
                            if($(this).val()){
                                 if($('#priceEndInput').val())
                                    {
                                        if(parseFloat($('#priceEndInput').val()) >= parseFloat($(this).val())){
                                             paramObject[$('#priceEndInput').attr('name')] = $('#priceEndInput').val();
                                        }else{
                                            alert('范围有错');
                                            return;
                                        }
                                    }
                                 paramObject[$(this).attr('name')] = $(this).val();
                            }else{
                                delete paramObject[$(this).attr('name')];
                            }
                            window.location.href = $.param(paramObject) ? baseUrl+'?'+$.param(paramObject) : baseUrl;
                        }
                    });
                });</script>";
                $html .= $js;
            }

            if (array_key_exists('priceEnd',$data)) {

                $priceEnd = is_bool($data['priceEnd']) ? '价格' : $data['priceEnd'];
                $html .= '<div class="col-md-3 visible-lg-block" style="padding-left:0px;width: 10%">
                                <input id="priceEndInput" type="text" class="form-control input" name="priceEnd" value="'.Input::get('priceEnd').'" placeholder="'.$priceEnd.'"  />
                            </div>';
                $js = "<script>init.push(function(){
                    $('#priceEndInput').keyup(function(event){
                        if(event.keyCode == 13){
                            console.log('do search');
                            var params = window.location.search.substring(1);
                            var paramObject = {};
                            var paramArray = params.split('&');
                            paramArray.forEach(function(param){
                                if(param){
                                    var arr = param.split('=');
                                    paramObject[arr[0]] = arr[1];
                                }
                            });
                            var baseUrl = window.location.origin+window.location.pathname;
                            if($(this).val()){
                                if($('#priceStartInput').val())
                                {
                                    if(parseFloat($('#priceStartInput').val()) <= parseFloat($(this).val())){
                                         paramObject[$('#priceStartInput').attr('name')] = $('#priceStartInput').val();
                                    }else{
                                        alert('范围有错');
                                        return;
                                    }
                                }
                                paramObject[$(this).attr('name')] = $(this).val();
                            }else{
                                delete paramObject[$(this).attr('name')];
                            }
                            window.location.href = $.param(paramObject) ? baseUrl+'?'+$.param(paramObject) : baseUrl;
                        }
                    });
                });</script>";
                $html .= $js;
            }

            if (array_key_exists('search', $data)) {
                $search = is_bool($data['search']) ? '请输入您想检索的信息' : $data['search'];
                $html .= '<div class="col-md-3 visible-lg-block" style="padding-left:0px; padding-right: 0px; float: right;width: 17%">
                                <input id="keywordsInput" type="text" class="form-control input" name="keywords" value="' . Input::get('keywords') . '" placeholder="' . $search . '"  />
                            </div>';
                $js = "<script>init.push(function(){
                    $('#keywordsInput').keyup(function(event){
                        if(event.keyCode == 13){
                            console.log('do search');
                            var params = window.location.search.substring(1);
                            var paramObject = {};
                            var paramArray = params.split('&');
                            paramArray.forEach(function(param){
                                if(param){
                                    var arr = param.split('=');
                                    paramObject[arr[0]] = arr[1];
                                }
                            });
                            var baseUrl = window.location.origin+window.location.pathname;
                            if($(this).val()){
                                paramObject[$(this).attr('name')] = $(this).val();
                            }else{
                                delete paramObject[$(this).attr('name')];
                            }
                            window.location.href = $.param(paramObject) ? baseUrl+'?'+$.param(paramObject) : baseUrl;
                        }
                    });
                });</script>";
                $html .= $js;
            }

            $html .= '</div>';
//            $html . = '</div>';
            return $html;
        };
        Html::macro('list_header', $handler);
        Html::macro('datagrid_header', $handler);
    }

    private function datagridPages()
    {
        Html::macro('footer', function ($data) {
            return $data ? $data->render() : '';
        });
    }

    /**
     * 高亮当前菜单
     */
    private function menu()
    {
        HTML::macro('menu_active', function ($route, $name, $attributes = ['class'=>'active'])
        {
            if (request()->is($route . '/*') || request()->is($route)) {
                $active ='<li '. Html::attributes($attributes) .'><a href="'. \URL::to($route).'">'.$name.'</a></li>';
            } else {
                $active ='<li><a href="'. \URL::to($route). '">'.$name.'</a></li>';
            }

            return $active;
        });
    }

}