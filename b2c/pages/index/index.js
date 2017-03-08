var URLs = require('../../utils/urls.js').URLs;
var MOC = require('../../utils/moc.js').MOC;

Page({
    data: {
        banners: MOC.banners,
        categories: MOC.categories
    },
    onLoad: function(options) {
        var x = MOC.dev ? '' : this.init(options);
    },
    init: function(options) {
        var self = this;

        // 向服务器请求主页显示的信息，包括轮播图 Banner，目录 Category 及其下面的课程信息
        wx.request({
            url: URLs.REST_HOME,
            success: function(response) {
                var result = response.data;

                // 如果成功则显示轮播图和课程，否则提示失败原因
                if (result.success) {
                    self.setData({
                        banners: result.data.banners,
                        categories: result.data.categories
                    });
                } else {
                    wx.showToast({title: result.message});
                }
            }
        });
    }
});
