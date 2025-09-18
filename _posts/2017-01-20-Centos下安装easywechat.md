## 在Centos下安装easywechat（php）环境
使用的操作系统为centos6.8。
涉及的主要内容有：
- php的安装（5.6.x版本）
- MySQL的安装(5.7版本)
- php-fpm模块的安装
- nginx的安装（1.10.2）
- composer的安装
- easywechat的安装

### 一：PHP和MySQL的安装
由于操作系统默认的镜像比较老，通过yum无法安装新版本的php和MySQL。
有以下几种方式来安装新版本的PHP和MySQL：
#### 1.1 EPEL方法安装
#### 1.2 rpm包安装
#### 1.3 编译安装

### 二：Nginx的安装
我们通过编译安装的方式来安装Nginx。

### 三：php-fpm的安装

### 四：compser的安装
安装：
http://blog.csdn.net/gb4215287/article/details/53942845
http://docs.phpcomposer.com/01-basic-usage.html
http://docs.phpcomposer.com/00-intro.html#Globally
http://semaphoreci.com/community/tutorials/getting-started-with-composer-for-php-dependency-management
使用：
卸载：
https://segmentfault.com/a/1190000006835510
错误：
1. ssl链接错误：http://stackoverflow.com/questions/36787413/curl-35-ssl-connect-error
2. Failed to decode zlib stream：https://github.com/composer/composer/issues/4619
3. sudo: composer: command not found  
### 安装easywechat
easywechat是一个标准的composer包，直接使用composer即可创建。
