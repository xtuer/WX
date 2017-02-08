Page({
    data: {
        imgUrls: [
            'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
            'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg',
            'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg'
        ],
        indicatorDots: true,
        autoPlay: true,
        circular: true,
        interval: 2000,
        duration: 1000
    },
    changeIndicatorDots: function(e) {
        this.setData({
            indicatorDots: !this.data.indicatorDots
        });
    },
    changeAutoPlay: function(e) {
        this.setData({
            autoPlay: !this.data.autoPlay
        });
    },
    intervalChange: function(e) {
        this.setData({
            interval: e.detail.value
        });
    },
    durationChange: function(e) {
        this.setData({
            duration: e.detail.value
        });
    }
});
