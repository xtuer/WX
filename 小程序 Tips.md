## 开发环境

腾讯官方提供的**微信web开发者工具**的编辑功能是至今见过的最难用的编辑器，我们可以使用其他的编辑器例如 **Atom**，**SublimeText** 等编辑，保存后**微信web开发者工具**会自动的发现文件变化了，然后自动刷新小程序，看到修改后的效果。

## 创建页面

例如要创建一个课程的页面 **course**，不需要在小程序开发工具中手动的一个一个的创建目录和文件（很多教学视频里就是这么做的），只需要在 **app.json** 中的 **pages** 下加上页面注册的路径 **"pages/course/course"**，保存，然后小程序开发工具就会自动的创建所有相关的目录和文件:

```js
{
    "pages": [
        "pages/index/index",
      	
        // 添加下一行后，微信web开发者工具发现 app.json 变化了，会自动的创建
        //   course 目录
        //   course.wxml
        //   course.wxss
        //   course.js
        //   course.json 
        "pages/course/course"
    ],
    ...
}
```

## URL 管理

为了集中管理 URL，把所有和服务器相关的 URL 都放到 **/util/urls.js** 里集中管理，然后需要使用的页面使用 `require()` 进行加载。

```js
// 文件名: /util/urls.js

var HOST = 'http://192.168.10.98:8080';

// [1] 集中定义 URL
var Urls = {
    REST_HOME:    HOST + '/rest/microapphome',
    REST_BANNERS: HOST + '/rest/banners',
};

// [2] 导出 URL 模块
module.exports = {
    Urls: Urls
};
```

在 **pages/course/course** 中使用 URL:

```js
var Urls = require('../../utils/urls.js').Urls; // [3] 引入 URL 模块

Page({
    onLoad: function(options) {
        var self = this;
        wx.request({
            url: Urls.REST_HOME, // [4] 使用 URL
            success: function(response) {
            }
        });
    }
)};
```



## Moc 数据

开发中可能后端还没有准备好，或者为了开发方便查看效果，可以使用假数据，放在 **/util/moc.js**，初始化时使用 moc 数据初始化，`onLoad()` 时发现是开发就不从服务器加载数据，如果是线上环境就从服务器加载数据，记得上线前修改为不使用 moc 数据，给一个开关进行修改就可以了。

```js
// 文件名: /util/moc.js

// 开发环境中的虚拟数据
var MOC = {
    moc: true,
    course: {courseId: 1234, name: 'Hadoop 入门', instructor: 'Clapton'}
};

// 和 MOC 中的数据一一对应
var EMPTY_MOC = {
    moc: false,
    course: {}
};

module.exports = {
    Moc: Config.moc ? MOC : EMPTY_MOC
};
```

页面中使用 **moc**:

```js
var Moc  = require('../../utils/moc.js').Moc;
var Urls = require('../../utils/urls.js').Urls;

Page({
    data: {
        course: Moc.course // 先初始化为 Moc 里的 course
    },
    onLoad: function(options) {
      	// 如果是生产环境，则执行初始化请求 course，否则就使用 Moc 里的 course，
        // 这样不需要访问服务器也能看到页面的效果
        var x = Moc.moc ? '' : this.init(options);
    },
    init: function(options) {
        var self = this;
      	var courseId = options.courseId; // 生产环境环境时的 courseId 是页面链接传过来的

        wx.request({
            url: Util.formatString(Urls.REST_COURSES, {courseId: courseId}),
            success: function(response) {
                var result = response.data;

                if (result.success) {
                    self.setData({course: result.data});
                }
            }
        });
    }
}
```

## 清空 input

给 **input 的 value** 绑定一个变量，设置这个变量的值为空就可以实现清空 **input** 了:

```xml
<view class="input-box">
    <input value="{{newComment}}" bindinput="bindNewComment" placeholder="请输入评论……"/>
    <button bindtap="submitComment" type="default" plain="{{true}}">评论</button>
</view>
```

```js
App({
    data: {
        newComment: ''
    }
    // 把用户输入的评论保存到变量里
    bindNewComment: function(e) {
        this.data.newComment = e.detail.value; // 不更新 input，提高效率
    },
    submitComment: function() {
        // 提交到服务器
        wx.request({
            url: Urls.REST_COMMENTS,
            success: function(response) {
                this.setData({
                    newComment: '' // 清空 input
                });
            }
        });     
    },
});
    
```

## 路径

使用工程中的文件时，文件的路径有相对路径和绝对路径:

* 相对路径: 
  * 都可以使用相对路径，但是有时候当页面跳转了几次后，容易出错，所以尽量不要使用相对路径
  * **wx.navigateTo()**, **wx.redirectTo()**, **wx.switchTab()**, wxml 中的 **url**，CSS 中图片的路径，**require()** 等引用工程中文件的路径都可以使用相对路径
* 绝对路径:
  * 大多数时候都可以使用绝对路径，只有 **require()** 引用 js 文件时例外
  * 可以使用：**wx.navigateTo()**, **wx.redirectTo()**, **wx.switchTab()**, wxml 中的 **url**，CSS 中图片引用工程中文件的路径都可以使用绝对路径，绝对路径以 `/` 开头，例如 `/image/dog.png`
  * 不可使用：**require()** 引用工程中的文件时只能使用相对路径，不能使用绝对路径