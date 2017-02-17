var WxParse = require('../../wxParse/wxParse.js'); // [1]

Page({
    data: {},
    onLoad: function(options) {
        // [2]
        var article = '<div>这里是 HTML 代码<img src="http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg"><img src="http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg"></div>';
        WxParse.wxParse('article', 'html', article, this, 0);
    }
});
