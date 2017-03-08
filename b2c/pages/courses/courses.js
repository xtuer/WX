var URLs = require('../../utils/urls.js').URLs;
var MOC = require('../../utils/moc.js').MOC;
var Util = require('../../utils/util.js');

Page({
    data: {
        courses: MOC.coursesOfCategory
    },
    onLoad: function(options) {
        var x = MOC.dev ? '' : this.init(options);
        wx.setNavigationBarTitle({title: '课程列表 - ' + options.categoryName});
    },
    init: function(options) {
        var self = this;
        var url = Util.formatString(URLs.REST_COURSES_OF_CATEGORY, {categoryId: options.categoryId});

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
