## Gugoo

### 目录分布

1. attachment：一些图片
2. collection：依赖包
3. conf：配置文件
4. controllers：MVC的C
5. models：MVC的M
6. node_modules：
7. routers：路由
8. static/view：MVC的View

### 依赖包的作用

andybalholm/cascadia：  
dgrijalva/jwt-go
GGLibs/
guotie/gogb2312
PuerkitoBio/goquery
submail/
x/net
x/tools

### conf包

appname：项目名  
httpport：端口  
runmode：运行模式  
sessionon：开启session  
StaticDir：设置静态映射目录！  
其他还可以设置诸如数据库连接信息（账户，密码，IP，数据库名等）等全局设置信息。

### Main.go && Router

Main.go里进行数据库的注册。  
Router里使用了默认的路由形式和自动路由。  

1. 使用自动路由可以节省代码量。
2. 指定路由方法时可以使用下面的方式:

	get,post:Login
	get:Logout
	get:Index;post:Store

### Model层

### View层

### 静态目录

StaticDir["/static"] = "static"  
beego.SetStaticPath("/xxx", "xxx1")  

## Beego
### 应用逻辑

main文件监听8080端口，每次用户连接的时候会建立对应链接的context（Ctx），**判断是否是WebSocket请求，如果是的话设置Input，还会判断请求的方法是否在标准方法中**并执行BeforeFilter。  
之后静态文件直接交由http包中的ServeFile处理，动态文件执行AfterStatic过滤，交给相应的进行路由/正则路由/自动路由查找，匹配之后交给对应的Controller。  
Controller在执行逻辑之前会先执行BeforeExec，再执行Controller的Init函数，Prepare函数，Get/Post函数，Render函数，Finish函数等，最后执行AfterExec过滤器，执行Destructor函数。（开启了XSRF就调用XsrfToken或者CheckXsrfCookie）   

#### 应用级别

用户可以通过hookfunc来注册函数，使用AddAPPStartHook来注册启动函数，默认已经注册了mime。  
beego启动时会把views里面的模板预编译，存在map里。  
使用EnableDocs配置判断是否开启内置的文档路由功能。  
开启8088端口的应用内监控模块，服务端口8080内部其实调用了ListentAndServe。  

#### Controller

如果没有指定渲染的模板，默认会到模板目录下的Controller/<方法名>.tpl查找，如果设置了模板，则会调用Render函数进行渲染；也可以不用模板，使用this.Ctx.WriteString输出字符串。  

### 模块

#### Session模块

初始化全局变量用来存储session控制器：  var globalSessions *session.Manager  
在入口函数中初始化数据：  globalSessions, _ = seesion.NewManager("memory", ``)  
go globalSessions.GC()  
调用：  
sess, _ := globalSessions.SessionStart(w, r)
defer sess.SessionRelease(w)
username := sess.Get("username")  
if r.Method == "GET" {

}

### 小技巧
使用_引入一个包，只会执行其中的init函数。  
