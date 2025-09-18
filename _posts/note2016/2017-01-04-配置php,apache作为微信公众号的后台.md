## Apache安装与配置
### 一：安装
操作系统：centos6.8  
使用yum install php来安装php,默认会设定httpd为依赖，自动安装apache2。  
\* 安装的php版本为5.3，包括php,php-common,php-cli和php-devel等包。   
\* 安装的httpd版本为2.2.15，包括httpd和httpd-tools等包。  
### 二：配置
1. 修改监听端口为8081[http://www.centoscn.com/apache/2015/0324/4989.html]  
2. 设置nginx的反向代理，将weixin.wangtianyu00.com:80端口定向到8081端口
3. 在apache的www目录下放置php文件，从浏览器能正常访问，说明配置正确。
### 三：上传方倍工作室默认php文件到服务器
### 四：配置公众号的开发者模式
### 五：实现正常访问
## 下一步的计划
使用方备工作室提供的简单代码可以实现基本的回复功能，但要作为一个可以接入任意公众号的产品，还需要将整个过程可视化，这方面可能需要参照一些php的后台应用。