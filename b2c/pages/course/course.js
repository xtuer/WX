// require 不能使用绝对路径，但是图片，跳转的页面可以
var Util = require('../../utils/util.js');
var Urls = require('../../utils/urls.js').Urls;
var Mock = require('../../utils/mock.js').Mock;
var app  = getApp();

Page({
    data: {
        course:     Mock.course,   // 课程的信息
        comments:   Mock.comments, // 课程的评论
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
            var self = this;

            // 提交评论到服务器
            var comment = {
                courseId:  this.data.courseId,
                userName:  app.globalData.userInfo.nickName,
                userImage: app.globalData.userInfo.avatarUrl,
                commentContent: this.data.newComment
            };

            // 提交评论到服务器
            wx.request({
                url: Util.formatString(Urls.REST_COMMENTS_OF_COURSE, {courseId: self.data.courseId}),
                method: 'POST',
                data: comment,
                success: function(response) {
                    if (response.data.success) {
                        self.data.comments.splice(0, 0, comment);
                        self.setData({
                            comments:   self.data.comments,
                            newComment: ''
                        });
                    } else {
                        wx.showToast({title: response.data.message});
                    }
                }
            });
        }
    },
    onLoad: function(options) {
        this.setData({courseId: options.courseId});
        var x = Mock.yes ? '' : this.init(options);
    },
    init: function(options) {
        var self = this;

        // 请求课程 options.courseId 的内容
        wx.request({
            url: Util.formatString(Urls.REST_COURSES, {courseId: self.data.courseId}),
            success: function(response) {
                var result = response.data;

                if (result.success) {
                    self.setData({course: result.data});
                    wx.setNavigationBarTitle({title: self.data.course.title});
                }
            }
        });

        // 请求课程的评论
        wx.request({
            url: Util.formatString(Urls.REST_COMMENTS_OF_COURSE, {courseId: self.data.courseId}),
            method: 'GET',
            success: function(response) {
                var result = response.data;

                if (result.success) {
                    self.setData({comments: result.data});
                }
            }
        });
    }
});
