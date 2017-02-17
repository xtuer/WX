Page({
    data: {
        controlsVisible: true,
        playing: false,
        timerId: 0
    },
    onReady: function() {
        this.videoContext = wx.createVideoContext("myVideo");
    },
    seconds10: function() {
        this.videoContext.seek(30);
        this.videoContext.play();
    },
    toggleControls: function() {
       this.setData({controlsVisible: true});
       this.hideControls();
    },
    started: function() {
        this.setData({playing: true});
        this.hideControls();
    },
    hideControls: function() {
        var self = this;
        clearTimeout(this.data.timerId);

        var timerId = setTimeout(function() {
            self.setData({controlsVisible: false});
        }, 4000);

        this.setData({timerId: timerId});
    }
});