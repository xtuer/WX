// require 不能使用绝对路径，但是图片，跳转的页面可以
var URLs = require('../../utils/urls.js').URLs;
var app = getApp();

Page({
    data: {
        // 课程信息
        course: {
            courseId: 1024,
            author: '艾里克·克莱普顿',
            name: 'Tears in Heaven - 泪洒天堂',
            video: 'http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400',
            description: '80年代末，在伦敦和纽约街头墙壁上最显眼的涂鸦就是“克莱普顿（Clapton）”了。这首《泪洒天堂》是克莱普顿用他已经被悲痛碾得粉碎的心为纪念他的儿子所作。'
        },
        // 课程的评论
        comments: [
            {
                commentId: 1,
                user: '公孙二狗',
                userImage: '/image/user.png',
                content: '大圣，此去欲何？踏南天，碎凌霄。若一去不回……？便一去不回！'
            },
            {
                commentId: 2,
                user: '道格拉斯·狗',
                userImage: '/image/user.png',
                content: 'Would you know my name if I saw you in heaven?'
            },
            {
                commentId: 2,
                user: 'Alice',
                userImage: '/image/user.png',
                content: 'Begging please 求饶'
            },
            {
                commentId: 2,
                user: 'Alice',
                userImage: '/image/user.png',
                content: '沙哑的嗓音，伤感的旋律'
            },
            {
                commentId: 2,
                user: 'Alice',
                userImage: '/image/user.png',
                content: '最后一个模块'
            }
        ],
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
        this.data.course.video = 'http://localhost/th.mp4';
        this.data.comments[0].userImage = app.globalData.userInfo.avatarUrl;
        this.setData({
            course: this.data.course,
            comments: this.data.comments
        });
        wx.setNavigationBarTitle({title: this.data.course.name});
    }
});
