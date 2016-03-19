/**
 * 2016年1月29日17:16:13
 */

'use strict';

require('bootstrap/less/bootstrap.less');
require('font-awesome/less/font-awesome.less');
require('animate.css/animate.css');
require('../css/common/style.css');

require('jquery');
require('bootstrap/dist/js/bootstrap.js');
require('metisMenu/dist/metisMenu.js');
require('slimScroll/jquery.slimscroll.js');

require('layer/src/layer.js');
layer.config({
    path: '/plugins/layer/' //layer.js所在的目录，可以是绝对目录，也可以是相对目录
});

require('Waves/dist/waves.css');
//require('../css/admin/waves.css');
var Waves = require('Waves/dist/waves.js');
$(function(){
    Waves.attach('.flat-buttons', ['waves-button']);
    Waves.init();
});

require('datetimepicker/jquery.datetimepicker.css');
require('jquery-mousewheel');
require('datetimepicker/build/jquery.datetimepicker.full.js');
jQuery.datetimepicker.setLocale('zh');

require('./admin/markdown.js');
//require('marked');

require('selectize/dist/css/selectize.css');
require('selectize/dist/css/selectize.bootstrap3.css');
require('selectize/dist/js/standalone/selectize.js');

require('iCheck/skins/square/green.css');
require('iCheck/icheck.js');

require('dropzone/dist/basic.css');
require('dropzone/dist/dropzone.css');
require('dropzone/dist/dropzone-amd-module.js');

$(function(){
    $("select[name='tags[]']").selectize({
        create: true,
        maxItems: 10
    });

    $("select[name='parent_id']").selectize({
        create: true
    });

    $(":checkbox[name='is_draft']").iCheck({
        checkboxClass:"icheckbox_square-green",
        radioClass: 'icheckbox_square-green'
    });
});

require('./admin/content.js');
