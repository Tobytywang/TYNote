## Nginx配置
### 一：Rewrite功能
#### 1.1 Nginx后端服务器组的5个指令
##### upstream指令
该指令用于给后端服务器命名。
默认情况下，服务器组收到请求后，按照“轮叫调度（RR）”策略调用服务器。
##### server指令
server address [parameters]
该指令用于定义组内的服务器。
parameters：
weight=number：权重
max_fails=number：设置一个请求失败的次数
fail_timeout=time：一是设置max_fails指令尝试请求服务器的时间，二是服务器无效状态持续时间
backup：设置某台服务器为备用服务器
down：设置某台服务器为宕机状态
示例：
```
upstream backup
{
 server backend1.example.com weight=5;
 server 127.0.0.1:8000 max_fails=3 fail_timeout=30s;
 server unix:/tmp/backend3;
}
```
这里有三个服务器，分别是基于域名，基于IP，基于进程间通信的Unix Domain Socket
##### ip_hash指令
对话保持功能
不能和server中的weight一起使用
根据用户IP来分配，Nginx必须是最前端服务器
客户端必须是C类地址
示例：
```
upstream backend
{
 ip_hash;
 server myback1.proxy.com;
 server myback2.proxy.com;
}
```
##### keepalive指令?
控制网络连接保持功能
keepalive connections;
##### least_conn指令
使用负载均衡策略
#### 1.2 Rewrite功能
依赖于PCRE
##### 地址重写与地址转发
概念：
地址重写：将google.cn重写为google.com
地址转发：将一个域名指到另一个已有站点的过程
区别：
地址转发后浏览器地址栏中显示的地址不改变，地址重写后浏览器地址栏显示的地址为重写后的地址
在一次地址转发过程中，只产生一次网络请求，地址重写会产生两次请求
地址转发发生在同一个站点里，地址重写没有该限制
地址转发到的页面可以不用全路径名表示，地址重写到的页面必须用完整的路径名表示
地址转发过程中，可以将客户端请求的request范围内属性传递给新的页面，地址重写不可以
地址转发的速度较地址重定向快
#### 1.3 Rewrite规则
借助于ngx_http_rewrite_module模块
#### 1.4 if指令
if ( condition ) {}
##### 1.变量名或者使用“=，!=”判断变量与字符串是否相等
使用正则表达式进行匹配，成功时视为true
变量与正则表达式之间用“~，~*，!~，!~*”链接
~表示对大小敏感
~*表示对大小写不敏感
!表示对结果取反
在正则表达式中，可以使用小括号对变量进行截取，在花括号中使用$引用截取的量
```
if ($http_user_agent ~ MSIE) {
}
if ($http_user_agent ~* "id=([^;])(?:;|$)") {
  # 可以使用$1和$2获得截取到的值
  # set $id $1; 将截取的id赋给$1以备后用
}
```
##### 2.判断请求的文件是否存在
-f或者!-f
##### 3.判断请求的目录是否存在
-d或者!-d
##### 4.判断请求的目录或文件是否存在
-e或者!-e
##### 5. 判断请求的文件是否可执行
-x或者!-x
#### 1.5 break指令
用于中断当前作用域中的其他Nginx配置
可以在server块，location块，if块中使用
location / {
  if ($slow) {
    set $id $1
    break;
    limit_rate 10k;
  }
}
#### 1.6 return 指令 **
直接向客户端返回响应状态代码
return [ text ]
return code URI;
return URL;
code：返回给客户端的HTTP状态吗
text：为返回给客户端的响应体内容
#### 1.7 rewrite指令
URI:主机名[传输协议+主机+资源路径]+片段标志符+相对URI
Scheme:[//][][用户名[:密码]@]主机名[:端口号]][/资源路径]
URL：是URI的子集：传输协议+主机+资源具体地址
Scheme://主机名[:端口号][/资源路径]
该指令可在server块或者location块中配置
rewrite regex replacement [flag];
**注意：**
rewrite接受到的URI不包含host地址
rewrite myweb.com http://newweb.com/permanent;
我们希望重写http://myweb.com/source是办不到的，因为rewrite指令接收到的URI是/source，不包含myweb.com
另外，请求URL中的请求指令也是不包含在rewrite指令接收到的URI内容中的
http://myweb.com/source?agr1=value1&agr2=value2
rewrite接收到的URI为/source，不包含“?agr1=value1&agr2=value2”
replacement用于替换URI中被截取的内容，如果该字符串是由http://或者https://开头，则不会继续向下进行其他
处理，而直接将重写后的URI返回给客户端
**提示：**
rewrite myweb.com http://example.com$request_un?permanent;
replcacement中支持全局变量的使用，常用的还有$uri和$args等
flag用来设置rewrite对URI的处理行为
last:
break:
redirect:
permanent:
#### 1.8 rewrite_log指令
#### 1.9 set指令
#### 1.10 uninitialized_variable_warm指令
#### 1.11 全局变量
$args:
$content_length:
$content_type:
$document_root:针对当前请求的根路径
$document_uri:请求中的当前uri，并且不包括请求指令
$host:请求url中的主机字段部分
$uri:与变量$document_uri含义相同
#### 1.12 rewrite的使用
##### 一：域名跳转
1. 域名跳转
```
server
{
  listen 80;
  server_name jump.myweb.name;
  rewrite ^/ http://www.myweb.info/;
}
```
2. 多域名跳转
```
server
{
  listen 80;
  server_name jump.myweb.name jump.myweb.info;
  if ($host ~ myweb\.info)
  {
    rewrite ^(.*) http://jump.myweb.name$1 permanent;
  }
}
```
3. 三级域名跳转
```
server
{
  listen 80;
  server_name jump1.myweb.com jump2.myweb.com;
  if ($http_host ~* ^(.*)\.myweb\.name$)
  {
    rewrite ^(.*) http://jump.myweb.name$1;
    break;
  }
}
```
##### 二：域名镜像
```
server
{
  listen 80;
  server_name mirror1.myweb.com;
  rewrite ^(.*) http://jump1.myweb.name$1 last;
}
server
{
  listen 81;
  server_name mirror2.myweb.name;
  rewrite ^(.*) http://jump2.myweb.name$1 last;
}
```
```
server
{
  listen 80;
  server_name jump.myweb.name;
  location ^~ /source1
  {
    rewrite ^/source1(.*) http://jump.myweb.name/websrc2$1 last;
    break;
  }
  location ^~ /source2
  {
    rewrite ^/source2(.*) http://jump.myweb.name/websrc2$1 last;
  }
}
```
##### 三：独立域名
##### 四：目录自动添加"/"
##### 五：目录合并
##### 六：防盗链
