Page({
    data: {
        name: '',
        gender: '男',
        age: 18,
        technology: [],
        isPublic: false
    },
    submit: function(e) {
        var value = e.detail.value;

        this.setData({
            name: value.name,
            gender: value.gender,
            age: value.age,
            technology: value.technology,
            isPublic: value.isPublic
        });

        wx.showModal({
            showCancel: false,
            title: '您的信息',
            content: '年龄: ' + JSON.stringify(this.data)
        });

        console.log(this.data);
    }
});