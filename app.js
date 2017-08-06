var Crawler = require("crawler");
//var url = require('url');
var md5 = require('js-md5');

var proxy = 'http://127.0.0.1:1080';

var sequences = new Crawler({
	maxConnections: 10,
	callback: function(error, res, done) {
		if (error) {
			console.log(error);
		} else {
			var $ = res.$;
			if (res.options.start) {
				var baseUrl = res.request.uri;
				var pages = $('.models-page-box>nav>.pagination>li>a');
				var count = pages.last().attr('href').split('/').slice(-1)[0];
				console.log(count);
				for (var i = 2; i <= count; i++) {
					sequences.queue({
						uri: baseUrl.href + '/page/' + i,
						proxy: proxy,
						start: false
					});
				}
			}
			var videos = {};
			$('#ajax-fax>*>.video-item>.featured-content-image>a')
				.each(function() {
					var url = $(this).attr('href');
					videos[url] = undefined;
				});
			$('#ajax-fax>*>.entry-title').each(function() {
				var elem = $(this);
				var date = null;
				elem.contents().each(function() {
					if (this.nodeType === 3) {
						date = $(this).text().replace(/\s/g, '');
					}
				});
				var url = elem.find('h4>a').attr('href');
				videos[url] = date;
			});
			// console.log(JSON.stringify(videos));
			for(var v in videos){
				video.queue({uri:v,proxy,date:videos[v]});
			}
		}
		done();
	}
});

var video = new Crawler({
	maxConnections: 10,
	callback: function(error, res, done) {
		if (error) {
			console.error(error);
		} else {
			var $ = res.$;
			var url = getOpenioUrl(res, $);
			var titleGroup = $('title').text().split(' ');
			var id = titleGroup[0].startsWith('[中文字幕]') ? titleGroup[0].substr(6) : titleGroup[0];
			var name = titleGroup[1];
			var style = $('#JKDiv_0').attr('style')
			var re = /url\(([a-zA-Z0-9:/._-]*?)\)/;
			if (re.test(style)) {
				var imageUrl = re.exec(style)[1];
			} else {
			}
			var context = $('body>.video-box-ather>.container>.video-countext');
			var models = {};
			context.children('.video-countext-Models').children('.models-content')
				.children('a').each(function() {
					var elem = $(this);
					var name = elem.text();
					var url = elem.attr('href');
					var imgUrl = elem.children('img').attr('src');
					models[name] = {'url':url, 'img':imgUrl}
				});
			var categories = {};
			context.children('.video-countext-categories')
				.children('a').each(function() {
					var elem = $(this);
					var category = elem.text();
					var url = elem.attr('href');
					categories[category] = url
				});
			var tags = {};
			context.children('.video-countext-tags')
				.children('a').each(function() {
					var elem = $(this);
					var tag = elem.text();
					var url = elem.attr('href');
					tags[tag] = url;
				});
			var countText = $('body>.video-box>.video-box-all>.video-box-video>.video-server-btn>view').text();
			var reCount = /[\d]+/;
			var count = reCount.exec(countText)[0];
			var video = {}
			video['url'] = url;
			video['title'] = name;
			video['id'] = id;
			video['img'] = imageUrl;
			video['categories'] = categories;
			video['tags'] = tags;
			video['models'] = models;
			video['count'] = count;
			video['date'] = res.options.date;
		}
		done();
	}
});

var model = new Crawler({
	maxConnections: 10,
	callback: function(err, res, data) {
		if (err) {
			console.log(err);
		} else {
			var $ = res.$;
		}
		done();
	}
});

function getOpenioUrl(res, $) {
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
/*
video.queue({
	uri: 'http://hpjav.com/tw/25299/ongp-008c_watch-online',
	proxy: 'http://127.0.0.1:1080'
});
*/
var sequencesUrl = ['http://hpjav.com/tw/category/censored-marker/chinese-subtitles'];


sequences.queue({
	//uri: 'http://hpjav.com/tw/17174/ftn-040c_watch-online',
	uri: 'http://hpjav.com/tw/category/censored-marker/chinese-subtitles',
	proxy: 'http://127.0.0.1:1080',
	start: true
});
