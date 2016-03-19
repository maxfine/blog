@extends('layout._admin')

@section('title') 网站后台-首页 @stop

@section('extra_css')
    @parent
    <link href="{{ asset('assets/css/admin-index.css') }}" rel="stylesheet">
@stop

{{-- 内容主体区域 --}}
@section('content')
    <div class="row  border-bottom white-bg dashboard-header">
        <div class="col-sm-12">
            <blockquote class="text-warning" style="font-size:14px">
                博客后台
            </blockquote>
        </div>
    </div>

    <div class="wrapper wrapper-content">
        <div class="row">
            <div class="col-sm-12">
                <div class="ibox float-e-margins">
                    <div class="ibox-title">
                        <h5>联系信息</h5>

                    </div>
                    <div class="ibox-content">
                        <p><i class="fa fa-qq"></i> QQ：<a href="http://wpa.qq.com/msgrd?v=3&uin=1526469221&site=qq&menu=yes" target="_blank">1526469221</a>
                        </p>
                        <p><i class="fa fa-weixin"></i> 微信：<a href="javascript:;">maxfine2</a>
                        </p>
                        <p><i class="fa fa-credit-card"></i> 支付宝：<a href="javascript:;" class="支付宝信息">1526469221@qq.com / *汉胜</a>
                        </p>
                    </div>
                </div>

            </div>

        </div>
    </div>
@stop

@section('common_js')
    @parent
    <script src="{{ asset('assets/js/admin-index.js') }}"></script>
@stop

@section('extra_js')
    @parent
@stop{{-- 用户后期扩展时需要补充的一些代码片段 --}}
