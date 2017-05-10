var Crawler = require("crawler");
var url = require('url');
var md5 = require('js-md5');

var c = new Crawler({
	maxConnections: 10,
	// This will be called for each crawled page
	callback: function(error, res, done) {
		if (error) {
			console.log(error);
		} else {
			var $ = res.$;
			// $ is Cheerio by default
			//a lean implementation of core jQuery designed specifically for the server
			var pattern = /\"(.*)\"/;
			var gu = $('.video-server>script').text().match(pattern)[1]
			var salt = 'sAfgz8HcR5';
			var hash = md5.create();
			hash.update(gu+salt);
			var key = hash.hex().split('').reverse().join('');
			var str = Buffer.from($('#JKDiv_0').attr('data-type'), 'base64').toString();

			var code = '';
			for(var i = 0; i < str.length;i++){
				var k = i%key.length;
				code += String.fromCharCode(str.charCodeAt(i)^key.charCodeAt(k));
			}
			var url = Buffer.from(code, 'base64').toString();
		}
		done();
	}
});

// Queue just one URL, with default callback
c.queue({
	uri: 'http://hpjav.com/tw/17174/ftn-040c_watch-online',
	proxy: 'http://127.0.0.1:1080'
});
