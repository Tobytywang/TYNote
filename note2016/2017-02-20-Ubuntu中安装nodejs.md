# Ubunt中安装nodejs
在考虑安装nodejs之前，我们有几种方法作为备选项。

##  使用apt-get安装
在命令行中输入`apt-get install nodejs`和`apt-get install npm`来安装node.js和npm。

### 版本问题
默认安装的nodejs是4.2.6，npm是3.5.2，都比较老，所以还是不推荐使用这种方式来安装

### nodejs和npm是否相互依赖
通过`apt-cache depends npm`命令可以看到npm是依赖nodejs的。

## 下载安装
这个方法需要现在(http://nodejs.cn/#download) 网站上下载对应的文件。

参考https://my.oschina.net/blogshi/blog/260953

### 下载完成后如何安装
解压缩到任意目录（我的是/usr/local/node），并将其中的bin/文件夹添加到环境变量中，就可以在终端使用node命令和npm命令了。

## 使用nvm安装
这个方法来自鱼hexo的推荐方法：https://hexo.io/zh-cn/docs/index.html ，就是运行的有点慢。

## 其他
淘宝npm镜像：

设置淘宝镜像最简单的就是将主目录下的.npmrc文件中添加源信息，不需要额外下载cnpm。

http://www.cnblogs.com/trying/p/4064518.html

http://www.tuicool.com/articles/UVR3qqA

http://yijiebuyi.com/blog/b12eac891cdc5f0dff127ae18dc386d4.html
