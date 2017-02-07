Page({
    data: {},
    onReachBottom: function() {
        wx.showToast({title: 'On Bottom'});
    },
    onShareAppMessage: function () {
        return {
        title: 'Flex 布局',
        desc: '演示 Flex 的各种布局',
        path: '/pages/flex/flex'
        }
    }
});