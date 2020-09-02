# MySQL常用操作
## 全局命令
操作|命令|备注
--|--|--
切换数据库|use xxx||
查看所有数据库|show databases||
查看所有表|show tables||
显示表的结构|show columns from xxx|describe, desc|
显示数据库的创建信息|show create database xxx||
显示表的创建信息|show create table xxx||
显示服务器状态信息|show status||
显示授予用户的权限|show grants||
显示服务器错误或着警告信息|show erros, show warnings||
显示命令的帮助信息|help show||

## 查询命令
操作|命令|备注
--|--|--
查看数据|select xxx, yyy, zzz from table||
查看所有数据|select * from table||
查看差别信息|select distinct xxx from table|distinct 关键字针对一个检索的列有用|
查看限制信息|select xxx from table limit 5;||
查看限制信息|select xxx from table limit 5, 5;|检索出的第一行是0|
查看限制信息|select xxx from table limit 4 offset 3;|从第三行开始的4行|
完全表名|select table.column from database.table;

## 排序命令
操作|命令|备注
--|--|--
按要求排序|select xxx from yyy order by xxx;||
按多个列排序|select xxx, xx, x from yyy order by xx, x;||
降序排序|select xxx, xx, x from yyy order by xx desc;|desc只针对第一个项目有效|
降序排序xx，升序排列x|select xxx, xx, x from yyy order by xx desc, x||
升序排列|select xxx from yyy order by xxx asc;
结合orderby和limit|select xxx from yyy order by x desc limit 1;||

**排序顺序**:在字典（dictionnarr)中，A被视为和a相同，这是MySQL的默认行为。

## 过滤数据
操作|命令|备注
--|--|--
筛选示例|select xxx, xx from yyy where xx = ??;||

**子语句**:
where支持的子语句操作符
操作符|说明
--|--
=|等于
<>|不等于
!=|不等于
<|小于
<=|小于等于
\>|大于
\>=|大于等于
between and|在指定的两个值之间
is null |是否为空

**注意**:同时使用order by和where语句时，应该让order by位于where之后。
**注意**:MySQL在执行匹配时默认不区分大小写。
**注意**:在通过过滤选择出不具有特定值的行时，不会返回具有NULL值的行。

## 数据过滤
MySQL允许给出多个WHERE语句，这些语句用AND子句和OR语句的方式使用

操作|命令|备注
--|--|--
AND操作符|select xxx, xx, x from yyy where xxxx = 1003 and xx <=10;||
OR操作副|select xxx, xx from yyy where xxxx = 1002 or xxxx = 1003;||
IN操作符|select xxx, xx from yyy where vend_id IN (1002, 1003) order by prod_name|提供圆括号的功能|
NOT操作符|select xxx, xx from yyy where vend_id NOT IN (1002, 1003) order by prod_name|NOT可以对IN，BETWEEN，EXISTS语句取反|

**计算次序**
select prod_name, prod_price from products where vend_id = 1002 or vend_id = 1003 and prod_price >= 10;

select prod_name, prod_price from prodects where (vend_id = 1002 or vend_id = 1003 ) and prod_price >= 10;

## 通配符

### LIKE操作符
### 百分号通配符
```
select prod_id, prod_name
from prodects
where prod_name like 'jet%'
```
```
select prod_id, prod_name
from products
where prod_name like '%anvil%'
```
```
select prod_id, prod_name
from products
where prod_name like 's%e'
```
**注意**:%并不能匹配null
### 下划线（\_）通配符
下划线匹配单个字符
```
select prod_id, prod_name
from products
where prod_name like '_ ton anvil'
```

## （九）正则表达式
## （十）创建计算字段
## （十一）使用数据处理函数
## （十二）汇总数据
## （十三）分组数据
## （十四）使用子查询
## （十五）联结表
## （十六）创建高级联结
## （十七）组合查询
## （十八）全文本搜索
## （十九）插入数据
## （二十）更新和删除数据
## （二十一）创建和操纵表
## （二十二）使用视图
## （二十三）使用存储过程
## （二十四）使用游标
## （二十五）使用触发器
## （二十六）管理事务处理
## （二十七）全球化和本地化
## （二十八）安全管理
## （二十九）数据库维护
## （三十）改善性能
