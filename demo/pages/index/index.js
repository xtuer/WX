//index.js
//获取应用实例
var Common = require('../../utils/Foo.js');

var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {}
  },
  //事件处理函数
  bindViewTap: function(e) {
    // wx.request({
    //   url: 'http://localhost:8080/rest?name=biao',
    //   method: 'GET',
    //   success: function(response) {
    //     console.log(response);
    //     wx.showToast({title: response.data.data});
    //   }
    // });
    // wx.navigateTo({url: '../logs/logs'});
    // wx.showToast({title: 'Hello'});
    var foo = new Common.Foo();
    foo.greeting();

    console.log(e);
    wx.switchTab({url: '../logs/logs'});
  },
  onLoad: function () {
    
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })

    // this.aloha();
  },

  aloha: function() {
    wx.request({
      url: 'http://localhost:8080/demo',
      success: function(response) {
        wx.showToast({title: response.data});
      }
    });
  }
})
