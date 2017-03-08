//app.js
App({
    onLaunch: function() {
        this.getUserInfo(); // 第一次为微信登陆
    },
    getUserInfo: function(cb) {
        var self = this;
        if (this.globalData.userInfo) {
            typeof cb === "function" && cb(this.globalData.userInfo);
        } else {
            //调用登录接口
            wx.login({
                success: function() {
                    wx.getUserInfo({
                        success: function(res) {
                            console.log(res);
                            self.login(res.userInfo, cb);
                        }
                    });
                }
            });
        }
    },
    // 使用微信的用户信息到系统进行登陆，登陆成功后保存用户信息
    login: function(userInfo, cb) {
        // 登陆成功后保存用户信息，如果是第一次的话，需要上传头像到服务器
        this.globalData.userInfo = userInfo;
        typeof cb === "function" && cb(userInfo);
    },
    globalData: {
        userInfo: null
    }
});
