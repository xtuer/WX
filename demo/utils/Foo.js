function Foo() {
    this.message = 'Greeting';
}

Foo.prototype.greeting = function() {
    wx.showToast({title: this.message});
}

module.exports.Foo = Foo;