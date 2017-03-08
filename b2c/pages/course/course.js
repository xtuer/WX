// require 不能使用绝对路径，但是图片，跳转的页面可以
var URLs = require('../../utils/urls.js').URLs;
var MOC = require('../../utils/moc.js').MOC;
var app = getApp();

Page({
    data: {
        course: MOC.course, // 课程信息
        comments: MOC.comments, // 课程的评论
        inputComment: ''
    },

    // 把用户输入的评论保存到变量里
    bindInputComment: function(e) {
        this.setData({
            inputComment: e.detail.value
        });
    },
    // 提交评论到服务器
    submitComment: function() {
        app.getUserInfo(function(userInfo) {
            console.log(userInfo);
        });

        if (!this.data.inputComment) {
            // 如果评论输入为空，则提示用户输入，不进行提交
            wx.showToast({title: '请输入评论'});
        } else {
            // 提交评论到服务器
            console.log(this.data.inputComment);
        }
    },
    onLoad: function(options) {
        var x = MOC.dev ? '' : this.init(options);
        wx.setNavigationBarTitle({title: this.data.course.name});
    },
    init: function(options) {
        // 请求课程 options.courseId 的内容
    }
});
