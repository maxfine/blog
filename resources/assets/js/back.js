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
var pace = require('PACE/pace.js');
pace.start({
    document: false
});
require('layer/src/layer.js');
layer.config({
    path: '/plugins/layer/' //layer.js所在的目录，可以是绝对目录，也可以是相对目录
});
require('./back/hplus.js');
require('./back/contabs.js');
var logoUrl = require('../images/logo.png');
$(function(){
   $('img.logo').attr('src', logoUrl);
});

