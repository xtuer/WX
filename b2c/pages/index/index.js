var URLs = require('../../utils/urls.js').URLs;
var moc = require('../../utils/moc.js').moc;

Page({
    data: {
        banners: moc.banners,
        categories: moc.categories
    },
    onLoad: function(options) {
        var self = this;

        // 向服务器请求 Banner
        // wx.request({
        //     url: URLs.REST_HOME,
        //     success: function(response) {
        //         var res = response.data;
        //
        //         // 如果成功则显示轮播图和课程，否则提示失败原因
        //         if (res.success) {
        //             self.setData({
        //                 banners: response.data.data.banners,
        //                 categories: response.data.data.categories
        //             });
        //         } else {
        //             wx.showToast({title: res.message});
        //         }
        //     }
        // });
    }
});
