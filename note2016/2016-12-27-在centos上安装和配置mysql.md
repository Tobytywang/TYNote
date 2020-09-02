## 在Centos上安装和配置mysql
> 由于镜像自带软件源中的mysql版本较低，我想使用rpm安装包的方式来安装mysql。

### 下载mysql的rpm包
找一个镜像站来下载mysql的rpm包（我使用的是搜狐的mirrors.sohu.com）。

mysql有企业版和社区版，我们选择社区版进行下载。

针对的不同的操作系统，mysql有不同的发布版本，因为我使用的是centos6.8，所以选择el6版本（适用于centos.6.x）。

我们选择对应版本的libs,common,client和server包下载。

### 安装
安装前先使用rpm -e xxx或者yum remove删除系统中已经有的旧版本的mysql。

安装时按照libs->common->client->server的顺序进行安装。

安装好后，要进行数据库的初始化操作，根据版本的不同，这个初始化的操作流程不一样。在我们安装的5.7.16版本中，使用mysqld --initailize来进行初始化。在初始化之前，可以先将配置文件（/user/share/mysql/mydefault.cnf）拷贝到/etc/my.cnf下。进行初始化后，在/var/log/mysqld.log中可以看到初始化后的mysql密码。

初始化过程中指定的datadir将是mysql储存数据库数据的地方。

### 新增一个普通级别的mysql用户

http://www.cnblogs.com/zhenmingliu/archive/2012/05/25/2518691.html

### 修改中文支持错误
刚刚安装好的mysql数据库可以登入后输入status查看它的编码设置，如果出现latin1的话，在插入中文的时候会出现错误，按照下面这篇文章的说法修改它的编码为utf8即可。

https://my.oschina.net/glenxu/blog/808631


http://blog.csdn.net/baiquan17/article/details/53209441?locationNum=3&fps=1
