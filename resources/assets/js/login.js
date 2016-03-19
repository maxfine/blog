'use strict';

require('bootstrap/less/bootstrap.less');
require('font-awesome/less/font-awesome.less');
require('animate.css/animate.css');
require('../css/common/style.css');
require('../css/auth/login.css');

require('jquery');
require('iCheck/skins/square/green.css');
require('iCheck/icheck.js');
require('jquery-validation/dist/jquery.validate.js');
require('jquery-validation/src/localization/messages_zh.js');
$(document).ready(function(){
    $(".i-checks").iCheck({
        checkboxClass:"icheckbox_square-green",
        radioClass: 'icheckbox_square-green'
    })
});
// 以下为修改jQuery Validation插件兼容Bootstrap的方法，没有直接写在插件中是为了便于插件升级
$.validator.setDefaults({
    highlight: function (element) {
        $(element).closest('.form-group').removeClass('has-success').addClass('has-error');
    },
    success: function (element) {
        element.closest('.form-group').removeClass('has-error').addClass('has-success');
    },
    errorElement: "span",
    errorPlacement: function (error, element) {
        if (element.is(":radio") || element.is(":checkbox")) {
            error.appendTo(element.parent().parent().parent());
        } else {
            error.appendTo(element.parent());
        }
    },
    errorClass: "help-block m-b-none",
    validClass: "help-block m-b-none"
});

// 以下为官方示例
$().ready(function () {
    // validate the comment form when it is submitted
    $("#loginForm").validate();
});
