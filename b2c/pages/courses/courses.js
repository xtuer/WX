var Urls = require('../../utils/urls.js').Urls;
var Moc  = require('../../utils/moc.js').Moc;
var Util = require('../../utils/util.js');

Page({
    data: {
        courses: Moc.coursesOfCategory
    },
    onLoad: function(options) {
        var x = Moc.moc ? '' : this.init(options);
        wx.setNavigationBarTitle({title: '课程列表 - ' + options.categoryName});
    },
    init: function(options) {
        var self = this;
        var url = Util.formatString(Urls.REST_COURSES_OF_CATEGORY, {categoryId: options.categoryId});

        // 请求目录 categoryId 下的所有课程
        wx.request({
            url: url,
            success: function(response) {
                var result = response.data;
                if (result.success) {
                    self.setData({courses: result.data});
                }
            }
        });
    }
});
