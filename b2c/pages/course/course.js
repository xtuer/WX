// require 不能使用绝对路径，但是图片，跳转的页面可以
var Util = require('../../utils/util.js');
var Urls = require('../../utils/urls.js').Urls;
var Moc  = require('../../utils/moc.js').Moc;
var app  = getApp();

Page({
    data: {
        course:     Moc.course,   // 课程的信息
        comments:   Moc.comments, // 课程的评论
        courseId:   0,
        newComment: ''
    },

    // 把用户输入的评论保存到变量里
    bindNewComment: function(e) {
        this.data.newComment = e.detail.value; // 不更新 input，提高效率
    },
    // 提交评论到服务器
    submitComment: function() {
        if (!this.data.newComment) {
            // 如果评论输入为空，则提示用户输入，不进行提交
            wx.showToast({title: '请输入评论'});
        } else {
            // 提交评论到服务器
            var comment = {
                courseId:  this.data.courseId,
                userName:  app.globalData.userInfo.nickName,
                userImage: app.globalData.userInfo.avatarUrl,
                content:   this.data.newComment
            };
            this.data.comments.splice(0, 0, comment);

            // 提交到服务器
            this.setData({
                comments:   this.data.comments,
                newComment: ''
            });
        }
    },
    onLoad: function(options) {
        var x = Moc.moc ? '' : this.init(options);
        this.setData({courseId: options.courseId});
    },
    init: function(options) {
        var self = this;

        // 请求课程 options.courseId 的内容
        wx.request({
            url: Util.formatString(Urls.REST_COURSES, {courseId: options.courseId}),
            success: function(response) {
                var result = response.data;

                if (result.success) {
                    self.setData({course: result.data});
                    wx.setNavigationBarTitle({title: self.data.course.title});
                }
            }
        });
    }
});
