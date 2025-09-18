## 源的问题
CentOS的源似乎与Ubuntu不同。  
CentOS的默认源如下所示(其实已经做过修改了，应该是手动添加了epel源)：  
```
CentOS-Base.repo
CentOS-Base.rpmnew
CentOS-Debuging.repo
CentOS-fasttrack.repo
CentOS-Media.repo
CentOS-Vault.repo
webstatic-archive.repo
webstatic.repo
webstatic-testing.repo
epel.repo
epel.rpmnew
epel-test.repo
```
使用命令`yum repolist`可以查看系统中的所有源。  
一些被禁用了的源可以使用`yum repolist --enablerepo`来查看。  
### CentOS基本源
这个是CentOS默认安装应用的源，内容可能会比较老。  
### webstatic源
这个是对网站服务器功能的一个扩展。  
### epel源
这个是对基本源的一个扩展，内容比较少。  
### remi源
这个源以来epel建立，资源相对丰富
### IUS源和rpmforge源
暂时还没有用到
## 使用remi源安装PHP
## 编译安装Nginx
http://nginx.org/
## 使用MySQL的源来安装MySQL
https://dev.mysql.com/downloads/file/?id=459918
