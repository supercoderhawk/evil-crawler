var Crawler = require("crawler");
var openload = new Crawler({
	maxConnections: 10,
	callback: function(error, res, done) {
		if (error) {
			console.log(error);
		} else {
			var $ = res.$;
			console.log($('#streamurl').html());

		}
		done();
	}
});

openload.queue({
	//uri: 'http://hpjav.com/tw/17174/ftn-040c_watch-online',
	//uri: 'http://hpjav.com/tw/category/censored-marker/chinese-subtitles'
	uri:'https://openload.co/embed/rUR192aPBk8'
	//proxy: 'http://127.0.0.1:1080',
	//start: true
});
