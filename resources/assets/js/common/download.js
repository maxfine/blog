jQuery(document).ready(function($) {
    var source = '<table class="table table-bordered">' +
      '<caption>Laravel 一键安装包。更新时间：{{time}}</caption>' +
      '<thead>' +
        '<tr>' +
          '<th>版本</th>' +
          '<th>大小</th>' + 
          '<th>下载地址</th>' +
        '</tr>' +
      '</thead>' +
      '<tbody>' +
        '{{#laravels}}' +
            '<tr>' +
              '<th scope="row">{{version}}</th>' +
              '<td>{{size}} bytes</td>' +
              '<td><a href="{{download_url}}">{{download_url}}</a></td>' +
            '</tr>' +
        '{{/laravels}}' +
      '</tbody>' +
    '</table>' +
    '{{#if lumens}}' +
    '<table class="table table-bordered">' +
      '<caption>Lumen 一键安装包。更新时间：{{time}}</caption>' +
      '<thead>' +
        '<tr>' +
          '<th>版本</th>' +
          '<th>大小</th>' + 
          '<th>下载地址</th>' +
        '</tr>' +
      '</thead>' +
      '<tbody>' +
        '{{#lumens}}' +
            '<tr>' +
              '<th scope="row">{{version}}</th>' +
              '<td>{{size}} bytes</td>' +
              '<td><a href="{{download_url}}">{{download_url}}</a></td>' +
            '</tr>' +
        '{{/lumens}}' +
      '</tbody>' +
    '</table>' +
    '{{/if}}';

    var template = Handlebars.compile(source);

    $.ajax({
    	type: 'GET',
    	url: 'http://down.golaravel.com/laravel/laravel-versions.json',
    	jsonpCallback: 'listLaravelVersions',
    	contentType: 'application/json',
    	dataType: 'jsonp',
    	success: function(json){
            var data = json;
            var result = $(template(data));

            $('.post-content').prepend(result);

    	},
    	error: function(e){
    		console.log(e.message);
    	}
    });
});