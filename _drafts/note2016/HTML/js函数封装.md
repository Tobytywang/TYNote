# Js中的函数封装
[参考1](http://www.cnblogs.com/kuailingmin/p/3838322.html)
[参考2](http://www.open-open.com/lib/view/open1427622896809.html)
[参考3](http://www.ruanyifeng.com/blog/2012/10/javascript_module.html)

## 1. 最简单的js函数
```
function hello() {
  var a = 'hello';
  alert(a);
}
```

## 2. JQ的函数
```
$(function(){
  $('#id').click(function(){
    alert('hello');
  })
});
```

## 3. Node的函数
```
var http = require('http');
http.createServe(function(req, res){
  res.writeHead(200, {'Content-Type':'text/html'});
  res.write('<p>hello</p>');
}).listen(8080);
```

## 4. 匿名函数
```
!function() {} ()
(function() {})
(function() {} ())
new function() {}
void function() {} ()
```
最常用的一个匿名函数
```
(function() {
  star.init = (function(name){
    var e = new Editor(name, Data.toolbarData);
  });
})();
```
## 5. 面向对象的写法
```
var module = new Object({
  _count : 0,
  m1 : function () {

  },
  m2 : function () {

  }
});
```
这种写法会暴露所有的模块成员，内部状态可以被外部改写。
```
var klm = klm || {};

klm = (function(){
  // 第一种写法
  klm.init = function() {
    alert('hello');
  }
  // 第二种写法
  klm.brower = (function(ua){
    var b = {
      xxx
    };
    })(window.navigator.userAgent.toLowerCase());
    return {
      init: klm.init,
      brower: klm.brower
    }
})();
```
另一个例子
```
var myOpinion = myOpinion || {};
myOpinion.prototype = {
  // 第一个属性
  init:function(obj,i){
    alert('hello');
  },
  // 第二个属性
  closeWindow:function(obj,d){
    obj.click(function(){
      d.hide();
    });
  }
}
$(function(){
  var my = myOpinion.prototype;
  my.init($(".z-sidebar li em"),$("#contact"));  
  // 绑定到操作事件上           
  $("#contact").add(my.closeWindow($(".z-sidebar li em"),$("#contact")));
});
```
定义单个属性封装
```
WinShow.create = function(c,body){        
  var _head = '<div class="+ c.heacss +"><span class="+ c.concss +">' + c.title + '</span></div>';
  this.container.innerHTML = _head;
  return this.container;
  this.container.onclick = function(e){
    alert('hello');
  }
}
```

## 6. 立即执行函数
使用立即执行函数（Immediately-Invoked Function Expression, IIFE），可以达到不暴露私有成员的目的。
```
var module = (function() {
  var _count = 0;
  var m1 = function(){
    //...
  };
  var m2 = function(){
    //...
  }；
  return {
    m1 : m1,
    m2 : m2
  };
})();
```

## 7. 放大模式
如果一个模块很大，必须分成几个部分，或者一个模块需要继承另一个模块，这是就必须采用“放大模式”（augmentation）。
```
var module = (function (mod){
  mod.m3 = function() {
    //...
  };
  return mod;
})(module);
```
上面的代码为module模块添加了一个新的方法m3，然后返回新的module模块

## 8. 宽放大模式
在浏览器环境下，模块的各个部分通常都是从网上获取的，有时无法确定模块的依赖问题。如果采用上一节的写法，第一个执行的部分就有可能加载一个不存在的空对象，这时就要采用“宽放大模式”。
```
var module = (function(mod){
  //...
  return mod;
})(window.module || {});
```
与放大模式相比，宽放大模式就是立即执行函数的参数可以是空对象。

## 9. 输入全局变量
为了在模块内部调用全局变量，必须显式地将其他变量输入模块。
```
var module = (function ($, YAHOO){
  //...
})(JQuery, YAHOO);
```
上面地module模块需要依赖JQuery和YUI库，就把这两个库当作参数输入module，这样就保证了模块地独立性，还使得模块之间地依赖关系变得明显。
# JavaScript模块的前世今生
JavaScript在创立之初并没有模块的概念，自从ajax引入了web2.0的概念之后，js代码已经和以前大不一样了，2009年html5兴起之后，前段代码的行数已经呈现井喷式的发展，随着代码量的增加，模块缺失的缺点日益暴露出来。

## 原始写法
仅从定义入手，一个函数即可成为一个模块，而这也是当前绝大部分框架实现模块的基础。
```
function add(x, y){
  return x + y;
}
```
```
(function (mod, $, _) {
  mod.add = ***;
  mod.sub = ***;
}((window.mod = window.mod || {}), jQuery, Underscore));
```
这种写法的缺点在于依赖函数定义的顺序。

## YUI（YUI3）
在YUI3中定义一个模块
```
YUI.use('node', function(Y) {
  /// ***
})
```

## CMD（Common Module Definition）
> CMD<-commonjs<-node

CMD规范参照commonjs中的方式，定义模块的方法如下
```
define(function(require, exports, module) {
  /// ***
});
```
一个文件就是一个模块，文件名就是模块的名字，使用模块的方法也和commonjs中一致，只需要require就好了。
```
var ec = require('event');
```
CMD的典型实例就是seajs

## AMD（Asynchronous Module Definition）
AMD是一个异步模块定义，特别适合在浏览器端使用。
```
define(id?, dependencies?, factory);
```
同CMD一样，一个文件就是一个模块，模块的使用方法如下：
```
define(["beta"], function(beta) {
  beta.*** //调用模块
});
```
AMD的典型实现有requireJS，modJS和lodJS。

## UMD（Universal Module Definition）
一段典型的UMD代码如下
```
(function (root, factory) {
  var Data = factory(root);
  if ( typeof define === 'function' && define.amd) {
    // AMD
    define('data', function()) {
      return Data;
    });
  } else if ( typeof exports === 'object') {
    // Node
    module.exports = Data;

    Data.noConflict = function () {
      if (root.Data === Data){
        root.Data = _Data;
      }
      return Data;
    };
    root.Data = Data;
  }
  }(this, function(root){
    var Data = ...
    // 自己的代码
    return Data;
}));
```
这是来自data.js的一段代码，原理就是做个判断，在不同的环境下作不同的处理。

# JavaScript模块化编程
## commonjs
nodejs的诞生也标志者Javascript模块化编程的诞生。因为在浏览器环境下，没有模块也不是特别大的问题，但在服务器端，一定要有模块，与操作系统和其他程序有互动，否则根本没法进行编程。
nodejs的模块系统，就是参照commonjs规范实现的。在commonjs里，有一个全局方法require()，用于加载模块。
假设有一个数学模块，就可以像下面这样加载
```
var math = require('math');
```
然后就可以调用模块提供的方法
```
var math = require('math');
math.add(2, 3);
```
这个规范主要来自node的服务端编程环境。

## 浏览器环境
有了服务端的模块之后，很自然地，大家想要客户端模块。而且两者最好兼容，一个模块也不用修改，在服务器端和浏览器端都可以运行。
但是，有一个重大的局限使得commonjs不适用于浏览器环境。
```
var math = require('math');
math.add(2, 3);
```
这个例子中，math.add的运行必须要等math.js加载完成才能运行。
这在服务端不会是什么大问题，服务端的模块都存储在硬盘里，加载时间不会太久，但在浏览器上，这个时间取决于网速的快慢，可能要等待很长时间。
这就是异步加载（AMD）的由来。

## AMD
AMD规范同样采用require来加载模块，但是不同于commonjs，它要求两个参数：
```
require([module], callback);
```
第一个参数[module]是一个数组，里面的主要成员就是要加载的模块；第二个参数callback，则是成功加载之后的回调函数。
将前面我们提到的代码改写成AMD形式，就是下面这样：
```
require(['math'], function(math){
  math.add(2, 3);
})
```
目前主要有两个js库实现了amd规范：requirejs和curljs。

## requireJS
在一个网页中可能会使用非常多的js代码，这会导致加载速度慢和依赖关系错乱的问题。
requireJS就是为了解决这个问题。
在其官网下载其最新版本，使用如下语句进行加载：
```
<script src="js/require.js" defer async="true" ></script>
```
加载js之后，就可以加载我们自己的代码了，如下：
```
<script src="js/require.js" data-main="js/main"></script>
```
data-main属性的作用是，指定网页程序的主模块。在上例中，就是js目录下面的main.js，这个文件会第一个被require.js加载。由于require.js默认的文件后缀名是js，所以可以把main.js简写成main。

## 主模块的书写
如果我们的代码不依赖任何其他模块，那么可以直接写入JavaScript代码。
当有其他依赖模块时，就需要使用AMD规范的require函数了：
```
require(['moduleA', 'moduleB'], function (moduleA, moduleB){
　// some code here
});
```
require()接收两个参数。第一个参数是一个数组，表示我们需要依赖的模块。第二个参数是一个回调函数，当前面所有的模块都加载成功之后，它将会被调用。记载的模块会以参数的形式传入该函数，从而在回调函数中使用这些模块。
```
require(['jquery', 'underscore', 'backbone'], function ($, _, Backbone){
　// some code here
});
```

## 模块的加载
使用require.config()方法，我们可以对模块的加载行为进行自定义。require.config()就写在主模块的头部。参数是一个对象，这个对象的paths属性指定各个模块的加载路径。
```
require.config({
  paths: {
    "jquery": "jquery.min",
    "underscore": "underscore.min",
    "backbone": "backbone"
  }
});
```
以上是处在同一目录的写法，当文件在不同目录时，有两种写法，一种是逐一指定目录，另一种是指定根目录：
```
require.config({
　paths: {
　　"jquery": "lib/jquery.min",
　　"underscore": "lib/underscore.min",
　　"backbone": "lib/backbone.min"
  }
});
```
```
require.config({
　baseUrl: "js/lib",
　paths: {
　　"jquery": "jquery.min",
　　"underscore": "underscore.min",
　　"backbone": "backbone.min"
　}
});
```
甚至可以指定远程文件
```
require.config({
　paths: {
　 "jquery": "https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min"
　}
});
```
requirejs要求，每个模块都是一个单独的js文件，这样有可能会拖慢网页的加载速度。require提供了一个优化工具，当模块部署完之后，可以使用这个工具将多个模块合并在一个文件里。

## 模块的写法
使用requirejs加载的模块，必须采用AMD规范来书写。
也就是说，要采用特定的define()函数来定义：
```
// math.js
define(function (){
　var add = function (x,y){
　　return x+y;
　};
　return {
　　add: add
　};
});
```
加载的方式如下：
```
// main.js
require(['math'], function (math){
  alert(math.add(1,1));
});
```
如果这个模块同时还依赖其他模块，那马define()函数的第一个参数，必须是一个数组：
```
define(['myLib'], function(myLib){
　function foo(){
　　myLib.doSomething();
　}
　return {
　　foo : foo
　};
});
```
## 加载非规范的js库
加载没有采用AMD规范的函数库，就要用require.config方法来规范它们的特征：
```
require.config({
　shim: {
　　'underscore':{
　　　exports: '_'
　　},
    'backbone': {
　　　deps: ['underscore', 'jquery'],
　　　exports: 'Backbone'
　　}
　}
});
```
require.config加载一个配置对象，这个对象除了之前说过的paths属性外，还有一个shim属性，用来配置不兼容的模块。
具体来说，每个模块需要定义1.exports(输出的变量名)，表明这个模块外部调用时的名称；2.deps数组，表明模块的依赖性。

# JavaScript中的匿名函数与封装介绍
[参考自](http://www.jb51.net/article/62261.htm)
不同JS库的封装原理
```
创建一个自调用的匿名函数，涉及参数window，并传入window对象
```
这个过程的目的则是
>使得自身的代码不会被其他代码污染，也不会污染其他代码。

## jQuery封装
```
(function( window, undefined ) {
  var jQuery = (function() {console.log('hello');});
  window.jQuery = window.$ = jQuery;
  if ( typeof define === "function" && define.amd && define.amd.jQuery ) {
    define( "jquery", [], function () { return jQuery; } );
  }
})( window );
```
这样我们就可以在window中调用jQuery
```
window.$
```
或者是
```
window.jQuery
```
于是我们可以创建一个类似的封装
```
(function(window, undefined){
  var PH = function(){

  }
})
```
相比于上面的定义，少了两步：
1. 定义jQuery的符号和全局调用
2. 异步支持

以下是更早期的jQuery封装
```
if(typeof window.jQuery == "undefined"){
  var jQuery = function() {};
  if (typeof $ != "undefined")
    jQuery._$ = $;
  var $ = jQuery;
};
```
2.1.1版本中jQuery的封装
```
(function(global, factory) {
  if (typeof module === "object" && typeof module.exports === "object") {
    module.exports = global.document ?
    factory(global, true) :
    function(w) {
      if (!w.document) {
        throw new Error("jQuery requires a window with a document");
      }
      return factory(w);
    };
  } else {
    factory(global);
  }
}(typeof window !== "undefined" ? window : this, function(window, noGlobal) {
  var jQuery = function() {
    console.log('jQuery');
  };
  if (typeof define === "function" && define.amd) {
    define("jquery", [], function() {
      return jQuery;
    });
  };
  strundefined = typeof undefined;
  if (typeof noGlobal === strundefined) {
    window.jQuery = window.$ = jQuery;
  };
  return jQuery;
}));
```
在使用浏览器的状况下：
```
typeof module = "undefined"
```
所以上面的情况是针对node进行判断的。

## Backbone封装
```
(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['underscore', 'jquery', 'exports'], function(_, $, exports) {
      root.Backbone = factory(root, exports, _, $);
    });
  } else if (typeof exports !== 'undefined') {
    var _ = require('underscore');
    factory(root, exports, _);
  } else {
    root.Backbone = factory(root, {}, root._, (root.jQuery || root.Zepto || root.ender || root.$));
  }
}(this, function(root, Backbone, _, $) {
  Backbone.$ = $;
  return Backbone;
}));
```
除了异步支持，也体现了对于jQuery和underscore的依赖
```
define(['underscore', 'jquery', 'exports'], function(_, $, exports) {
  root.Backbone = factory(root, exports, _, $);
});
```
表明backbone支持了requirejs标准。

## Underscore封装
```
(function() {
  var root = this;
  var _ = function(obj) {
    if (obj instanceof _) return obj;
    if (!(this instanceof _)) return new _(obj);
    this._wrapped = obj;
  };
  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = _;
    }
    exports._ = _;
  } else {
    root._ = _;
  }
  if (typeof define === 'function' && define.amd) {
    define('underscore', [], function() {
      return _;
    });
  }
}.call(this));
```

# 同样是封装
[参考自](http://www.imooc.com/article/6911)
这时来自一个Ajax库的封装代码
```
;(function (root, factory) {
  'use strict'
  /* istanbul ignore next */
  if (typeof define === 'function' && define.amd) {
    // 使用requriejs的情况（AMD规范）
    define('ajax', factory)
  } else if (typeof exports === 'object') {
    // 使用seajs的情况
    exports = module.exports = factory()
  } else {
    // @deprecated
    // 这是传入root === window
    // 绑定到全局变量上
    root.Ajax = factory()
    root.ajax = factory()
  }
})(this, function () {
  'use strict'
  function Ajax (options) {/* code */}
  return Ajax
})
```
首先它使用了一个匿名的自执行函数将自己封装起来，这样做的好处就是可以避免代码污染

# 浏览器加载commondjs模块的原理和实现
[参考自](http://www.ruanyifeng.com/blog/2015/05/commonjs-in-browser.html)
浏览器所以不兼容commonjs，在于四个nodejs变量的缺失
```
module
exports
requrie
global
```
只要能提供这四个变量，就可以加载commonjs
```
var module = {
  exports: {}
};

(function(module, exports) {
  exports.multiply = function (n) { return n * 1000 };
}(module, module.exports))

var f = module.exports.multiply;
f(5) // 5000
```
上面的代码向一个立即执行函数提供了module和exports两个外部变量，模块就放在这个立即执行函数里，模块的输出值放在module.exports之中，这样就实现了模块的加载

# JavaScript匿名函数
函数的定义大致分为三种方式
```
function double(x) {
  return 2 * x;
}

var double = new Function('x', 'return 2 * x;');

var double = function(x) { return 2 * x; }
```
## 匿名函数的创建
第一种方式，就是上面所讲的函数，也是最常用的方式。
第二种方式
```
(function(x, y){
  alert(x + y);
})(2, 3);
```
这里创建了一个匿名函数（在一个括号内），第二个括号用于调用该匿名函数，并传入参数。括号是表达式，是表达式就有返回值，所以可以在后面加一对括号让它们执行。

## 自执行的匿名函数
1. 什么是自执行的匿名函数
形如(function{ // code... })();
2. 为什么(function{ // code... })();可以被执行而function{ // code.. }();却会报错？
    1. 首先(function{ // code... })是表达式而function{ // code.. }是函数声明。
    2. 其次js预编译的特点，会解释函数声明，但是会忽略表达式。
    3. 当js执行到function(){ // code... }();时，由于function{ // code... }在预编译阶段已经被解释过，js会跳过function(){ // code... }，试图去执行();，故会报错。
    而当js执行到(function{ // code... })();时，由于(function{ // code... })();是表达式，js会去对它求解得到返回值，由于返回值是一个函数，故而遇到();时，便会被执行。
3. 另外函数转换为表达式的方式并不一定是分组操作符()，也可以是void操作符，~操作符，!操作符

## 匿名函数与闭包
闭包（closure）说白了就是函数的嵌套，内层的函数可以使用外层函数的所有变量，即使外层函数已经执行完毕（涉及js作用域链）
```
function checkClosure(){
  var str = 'rain-man';
  setTimeout(
    function(){ alert(str); } //这是一个匿名函数
    , 2000);
  }
checkClosure();
```
checkClosure函数的执行是瞬间的，在checkClosure的函数体内部创建了一个变量str，在checkClosure执行完毕之后，并没有被释放，这是因为setTimeout内的匿名函数存在对str的引用。待到2秒之后，函数体内的匿名函数被执行完毕之后，str才被释放。

## 用闭包来优化代码
```
function forTimeout(x, y){
  alert(x + y);
}
function delay(x , y , time){
  setTimeout('forTimeout(' + x + ',' + y + ')' , time);
}
/**
* 上面的delay函数十分难以阅读，也不容易编写，但如果使用闭包就可以让代码更加清晰
* function delay(x , y , time){
* setTimeout(
* function(){
* forTimeout(x , y)
* }
* , time);
* }
*/
```

## 减少全局变量的使用
```
var oEvent = {};
(function(){
  // 匿名函数的声明
  var addEvent = function(){ /*代码的实现省略了*/ };
  // 具名函数的声明
  function removeEvent(){}
  oEvent.addEvent = addEvent;
  oEvent.removeEvent = removeEvent;
})();
```
这段代码中，addEvent和removeEvent都是局部变量，但我们可以通过全局变量onEvent来使用它们，这样就减少了全局变量的使用。
如果我么想使用此段代码
```
oEvent.addEvent(document.getElementById('box') , 'click' , function(){});
var rainman = (function(x , y){
    return x + y;
})(2 , 3);
/**
* 也可以写成下面的形式，因为第一个括号只是帮助我们阅读，但是不推荐使用下面这种书写格式。
* var rainman = function(x , y){
* return x + y;
* }(2 , 3);
```
这里我们创建了一个变量，并通过直接调用匿名函数初始化为5。
```
var outer = null;
(function(){
  var one = 1;
  function inner (){
    one += 1;
    alert(one);
  }
  outer = inner;
})();
outer(); //2
outer(); //3
outer(); //4
```
这里的one是一个局部变量（因为被定义在一个函数之内），因此外部是不可以访问的。但是这里我们创建了inner函数，inner函数是可以访问one的；又将全局变量outer引用了inner，所以三次调用outer会弹出递增的结果。

# AMD异步模块定义介绍和require.js中使用jQuery及jQuery插件的方法
[参考](http://www.jb51.net/article/50724.htm)
## AMD模块
AMD模块格式本身是一个关于如何定义模块的提案，在这种定义下模块和依赖都能够异步地进行加载。

## requirejs
requirejs是一个用于客户端地模块管理工具库。其中模块管理地实现遵守AMD规范。

## jQuery对AMD的支持
jQuery 1.7开始支持将jQuery注册为一个AMD异步模块。requirejs和curl都可以用一个异步模块格式来加载模块。
```
if ( typeof define === "function" && define.amd && define.amd.jQuery ) {
 define( "jquery", [], function () { return jQuery; } );
}
```
其工作的原理是，所使用的脚本加载器通过指定一个属性，即define.amd.jQuery为true，来表明自己可以支持多个jQuery版本。如果有兴趣了解特定的实现细节的话，我们可以将jQuery注册为一个具名模块，因为可能会有这样的风险，即它可能被与其他使用了AMD的define()方法的文件拼合在一起，而没有使用一个合适的，理解匿名AMD模块定义的拼合脚本。

高版本的jQuery去掉了define.amd.jQuery判断
```
if ( typeof define === "function" && define.amd ) {
 define( "jquery", [], function() {
  return jQuery;
 });
}
```
## requirejs中使用jQuery
```
// 简单的配置
require.config({
    // RequireJS 通过一个相对的路径 baseUrl来加载所有代码。baseUrl通常被设置成data-main属性指定脚本的同级目录。
    baseUrl: "./js",
    // 第三方脚本模块的别名,jquery比libs/jquery-1.11.1.min.js简洁明了；
    paths: {
        "jquery": "libs/jquery-1.11.1.min.js"
    }
});

// 开始使用jQuery 模块
require(["jquery"], function ($) {
    //你的代码
    //这里直接可以使用jquery的方法，比如：$( "#result" ).html( "Hello World!" );
});
```
虽然jQuery支持AMD的API，但这并不意味着jQuery的插件和AMD是兼容的。
一半的jQuery插件
```
(function ($) {
  $.fn.m​​yPlugin = function () {
    //你自己的插件代码
  };
})(jQuery);
```
我们可以修改以下来使得require来加载一个jQuery插件
```
;(function (factory) {
  if (typeof define === "function" && define.amd) {
    // AMD模式
      define([ "jquery" ], factory);
  } else {
    // 全局模式
    factory(jQuery);
  }
}(function ($) {
  $.fn.jqueryPlugin = function () {
    //插件代码
  };
}));
```
## requirejs中使用jQuery UI组件
```
(function (widgetFactory) {
    if (typeof define === "function" && define.amd) {
        // AMD模式
        define("jquery.ui.widget", ["jquery"], function () {
            widgetFactory(window.jQuery);
        });
    } else {
        // 全局模式
        widgetFactory(window.jQuery);
    }
}
(function ($, undefined) {
    // jQuery Widget Factory 代码
}));
```
# AMD加载实现笔记
[参考自](http://www.cnblogs.com/dojo-lzz/p/5149348.html)
配置文件
```
{
  shim: {
    'some/thing': {
      deps: ['a', 'b'],
      exports: 'some.thing',
      init: function (a, b) {
        return some.thing + 'another';
      }
    }
  }
}
```
这个配置的目的是想将window.some.thing这个全局变量包装成id为‘some/thing’的模块。模块的依赖项Id为'a'、'b'，输出值为some.thing但因为定义了init函数，所以最后模块的输出值变成了some.thing + 'another'。

因为shim是要将全局变量包装成模块，所以直接用shim中的配置项来定义模块即可。上例中的配置最终将转化为：
```
define('some/thing', ['a', 'b'], function(a, b) {
   var initResult = shimItem.init(a, b);
   return initResult === undefined ? shimItem.exports : initResult;  
});
```

# 让你的插件兼容AMD,CMD和原生js
```
// 定义匿名函数
;(function(){
  // 我的代码
	function MyModule() {
		// ...
	}

	var moduleName = MyModule;
	if (typeof module !== 'undefined' && typeof exports === 'object' && define.cmd) {
    // CMD规范
		module.exports = moduleName;
	} else if (typeof define === 'function' && define.amd) {
    // AMD规范
		define(function() { return moduleName; });
	} else
    // 原生js
		this.moduleName = moduleName;
	}
}).call(function() {
	return this || (typeof window !== 'undefined' ? window : global);
});
```

# js中的this
[参考自](http://www.jb51.net/article/41656.htm)
## 第一种情况
```
function test(){
　this.x = 1;
　alert(this.x);
}
test(); // 1
```
全局性调用，this代表全局对象global
## 第二种对象
```
function test(){
　alert(this.x);
}
var o = {};
o.x = 1;
o.m = test;
o.m(); // 1
```
作为对象方法定义，这时this就指这个上级对象
## 第三种方法
```
function test(){
　this.x = 1;
}
var o = new test();
alert(o.x); // 1
```
作为构造函数调用，就是通过这个函数生成一个新对象（object）。这时，this就指这个新对象。
## 第四种方法
```
var x = 0;
function test(){
　alert(this.x);
}
var o={};
o.x = 1;
o.m = test;
o.m.apply(); //0
```
apply()是函数对象的一个方法，它的作用是改变函数的调用对象，它的第一个参数就表示改变后的调用这个函数的对象。因此，this指的就是这第一个参数。
apply()的参数为空时，默认调用全局对象。因此，这时的运行结果为0，证明this指的是全局对象。

# Js中变量和属性
[参考自](http://blog.csdn.net/veranal/article/details/50594615)

# js函数
expend函数
apply函数

# js面向对象
[参考自](http://www.cnblogs.com/jikey/archive/2011/05/13/2045005.html)
[参考自](http://www.cnblogs.com/jikey/archive/2011/05/13/2045005.html)
