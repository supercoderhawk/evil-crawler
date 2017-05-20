var Crawler = require("crawler");
//var url = require('url');
var md5 = require('js-md5');

var proxy = 'http://127.0.0.1:1080';

var category = new Crawler({
	maxConnections: 10,
	callback: function(error, res, done) {
		if (error) {
			console.log(error);
		} else {
			var $ = res.$;
			if(res.options.start){
				var baseUrl = res.request.uri;
				var pages = $('.models-page-box>nav>.pagination>li>a');
				var count = pages.last().attr('href').split('/').slice(-1)[0];
				console.log(count);
				for(var i = 2; i <= count;i++){
					category.queue({uri:baseUrl+'/page/'+i,proxy:proxy});
				}
			}

			$('#ajax-fax>*>.video-item>.featured-content-image>a')
				.each(function() {
					var url = $(this).attr('href');
					console.log(url);
					//video.queue({uri:url,proxy:proxy});
				});
		}
		done();
	}
});

var video = new Crawler({
	maxConnections: 1,
	callback: function(error, res, done) {
		if (error) {
			console.error(error);
		} else {
			var url = getOpenioUrl(res);
			console.log(url);
		}
		done();
	}
});

function getOpenioUrl(res) {
	var $ = res.$;
	var pattern = /\"(.*)\"/;
	var gu = $('.video-server>script').text().match(pattern)[1]
	var salt = 'sAfgz8HcR5';
	var hash = md5.create();
	hash.update(gu + salt);
	var key = hash.hex().split('').reverse().join('');
	var str = Buffer.from($('#JKDiv_0').attr('data-type'), 'base64').toString();
	var code = '';
	for (var i = 0; i < str.length; i++) {
		var k = i % key.length;
		code += String.fromCharCode(str.charCodeAt(i) ^ key.charCodeAt(k));
	}
	return url = Buffer.from(code, 'base64').toString();
}

category.queue({
	//uri: 'http://hpjav.com/tw/17174/ftn-040c_watch-online',
	uri: 'http://hpjav.com/tw/category/censored-marker/chinese-subtitles',
	proxy: 'http://127.0.0.1:1080',
	start:true
});
