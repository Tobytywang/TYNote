# JavaScript的高级特性
## 1 作用域
与C、C++、Java等语言不同，JavaScript的作用域不是以花括号包围*块级作用域*，而是由函数来决定的，if、for语句中的花括号不是独立的作用域。
### 1.1 函数作用域
JavaScript中，一个函数内定义的变量只对这个函数内部可见，称之为函数作用域。
在函数中引用一个变量时，JavaScript首先会搜索当前作用域，或者称为“局部作用域”，如果没有找到则会搜索上层作用域，一直到全局作用域。
**示例一**：
```
var v1 = 'v1';

var f1 = function() {
  console.log(v1);    // 输出v1
};
f1();

var f2 = function() {
  var v1 = 'local';
  console.log(v1);    // 输出local
}
f2();
```
**示例二**：
```
var scope = 'global';

var f = function() {
  console.log(scope);    // 输出undefined
  var scope = 'f';
}
f();
```
由于在作用域内搜索到了scope变量，所以上层作用域中的scope就被屏蔽了。
我们可以这样认为：无论在函数内什么地方定义的变量，在一进入函数时就被定义了，但直到var所在的那一行它才会被初始化。（事实上， JavaScript 的内部实现并不是这样，未
定义变量和值为 undefined 的变量还是有区别的。）
**示例三**:
```
var f = function() {
  var scope = 'f0';
  (function() {
    var scope = 'f1';
    (function() {
      cosole.log(scope); // 输出 f1
    })();
  })();
};
f();
```
在最内层函数引用了scope变量，通过作用域搜索，找到了其父作用域中定义的scope变量。
这种嵌套关系是在定义时决定的，而不是在调用时决定的，这被称为*静态作用域*或者*词法作用域*。
**示例四**：
```
var scope = 'top';

var f1 = function() {
  console.log(scope);
};
f1();    // 输出 top

var f2 = function() {
  var scope = 'f2';
  f1();
};
f2();    // 输出 top
```
这个例子中，f2调用f1查找到的scope变量，是在父作用域中定义的scope变量，而不是在f2中定义的scope变量。这说明了作用域的嵌套关系不是在调用时确定的，而是在定义时确定的。

### 1.2 全局作用域
JavaScript中有一种特殊的对象称为全局对象。这个对象在Nodejs中对应的是global对象，在浏览器中对应的是window对象。由于全局对象的所有属性在任何地方都是可见的，所以这个对象又称为全局作用域。
全局作用域中的变量不论在什么函数中都是可以被直接引用的，而不必通过全局对象。
满足以下条件的变量属于全局作用域：
  1. 在最外层定义的变量
  2. 全局对象的属性
  3. 任何隐式定义的变量（未定义直接赋值的变量）

不通过var声明直接赋值的变量都会被定义在全局作用域中。
而模块化编程的一个重要原则就是避免使用全局变量，所以我们在任何地方都不应该隐式定义变量。

## 2 闭包
闭包是函数式编程中的概念，意思是"由函数（环境）及其封闭的自由变量组成的集合体"
### 2.1 什么是闭包
通俗点来说，JavaScript中的每一个函数都是一个闭包，但通常意义上嵌套的函数更能体现出闭包的特性：
**示例**：
```
var generateClosure = function() {
  var count = 0;
  var get = function() {
    count++;
    return count;    // 返回count的值
  };
  return get;    // 返回get函数
};

var counter = generateClosure();    // counter现在是一个函数（get()）
console.log(counter());    // 输出 1
console.log(counter());    // 输出 2
console.log(counter());    // 输出 3
```
在这段代码中，generateClosure()函数中有一个局部变量count，初值为0。还有一个叫做get的函数，get将其父作用域，也就是generateClosure()函数中的count变量增加1，并返回count的值值。
generateClosure()的返回值是get函数。在外部，我们通过counter变量调用了generateClosur()函数并获取了它的返回值，也就是get函数，接下来反复调用几次counter()，我们发现每次返回的值都递增了1。

让我们看看上面的例子有什么特点，按照通常命令式编程思维的理解， count 是
generateClosure 函数内部的变量，它的生命周期就是 generateClosure 被调用的时
期，当 generateClosure 从调用栈中返回时， count 变量申请的空间也就被释放。问题是，在 generateClosure() 调用结束后， counter() 却引用了“已经释放了的” count
变量，而且非但没有出错，反而每次调用 counter() 时还修改并返回了 count。这是怎
么回事呢？

这正是所谓闭包的特性。当一个函数返回它内部定义的一个函数时，就产生了一个闭包，闭包不但包括被返回的函数，还包括这个函数的定义环境 。

上面的例子中，当函数generateClosure()的内部函数get被一个外部变量counter引用时，counter和generateClosure()的局部变量就是一个闭包。
**示例二**：
```
var generateClosure = function() {
  var count = 0;
  var get = function() {
    count ++;
    return count;
  };
  return get;
};

var counter1 = generateClosure();
var counter2 = generateClosure();
console.log(counter1());
console.log(counter2());
console.log(counter1());
console.log(counter1());
console.log(counter2());
```
上面的例子中，counter1和counter2分别调用了generateClosure()函数，生成了两个闭包的实例，它们内部引用的count变量分别属于各自的运行环境。我们可以理解为，在generateClosure()返回get函数时，私下将get能引用到的generateClosure()函数的内部变量（也就是count）也返回了，并在内存中生成了一个副本。

### 2.2 闭包的用途
闭包主要有两个主要用途，一是实现嵌套的回调函数，二是隐藏对象的细节。
1. 嵌套的回调函数
```
exports.add_user = function(user_info, callback) {    // 增加 user
  var uid = parseInt(user_info['uid']);
  mongodb.open(function(err, db){    // 创建数据库链接
    if (err) {callback(err); return;}    // 如果有错误
    db.collection('users', function(err, collection) {    //
      if (err) {callback(err); return;}
      collection.ensureIndex("uid", function(err){
        if (err) {callback(err); return;}
        collection.ensureIndex("username", function(err){
          if (err) {callback{err}; return;}
          collection.findOne({uid: uid}, function(err) {
            if (err) {callback(err); return;}
            if (doc) {
              callback('occupied');
            } else {
              var user = {
                uid: uid,
                user: user_info,
              };
              collection.insert(user, function(err){
                callback(err);
              });
            }
          });
        });
      });
    });
  });
};
```
这段代码中用到了闭包的层层嵌套，每一层的嵌套都是一个回掉函数。回调函数不会立即执行，而是等待相应请求处理完后由请求的函数回调。
我们可以看到，在嵌套的每一层中都有对callback的引用，而且最里层还用到了外层定义的uid变量。由于闭包机制的存在，即使外层函数已经执行完毕，其作用域内申请的变量也不会释放，因为里层的函数还有可能会引用到这些变量。这样就实现了嵌套的异步回调。

2. 实现私有成员
JavaScript没有私有属性，也就是说对象的每一个属性都是暴露给外部的，通过闭包可以实现变量的隐藏。
```
var generateClosure = function() {
  var count = 0;
  var get = function() {
    count ++;
    return count;
  };
  return get;
};

var counter = generateClosure();
console.log(counter());
console.log(counter());
console.log(counter());
```
http://javascript.crockford.com/private.html。

## 3 对象
### 3.1 创建和访问
JavaScript中的对象实际上就是一个由属性组成的关联数组，属性由名称和值组成，值的类型可以是任何数据结构，或者函数和其他对象。
```
var foo = {};
foo.prop_1 = 'bar';
foo.prop_2 = false;
foo.prop_3 = function() {
  return 'hello world';
}
console.log(foo.prop_3());
```
示例中我们使用{}来创建对象，这是*对象字面量*的表示方法，也可以用foo = new Object()来显示的创建一个对象。
1. 使用关联数组访问对象成员
```
var foo = {};
foo['prop_1'] = 'bar';
foo['prop_2'] = 'false';
foo['prop_3'] = 'function() {
  return 'hello world';
}'
```
在JavaScript中，使用句点运算符和使用关联数组引用是等价的，也就是说任何对象（包括this指针）都可以使用这种模式。
2. 使用对象初始化器创建对象
```
var foo = {
  'prop_1': 'bar',
  prop_2: 'false',
  prop_3: function() {
    return 'hello world';
  }
};
```
这种方法称为对象的初始化器。

## 3.2 构造函数
构造函数允许我们设计C++中的“类”。
```
function User(name, uri) {    // 表明这是 User 的构造函数
  this.name = name;
  this.uri = uri;
  this.display = function() {
    console.log(this.name);
  }
}

var someuser = new User('byvoid', 'http://www.byvoid.com');
```

## 3.3 上下文对象

## 3.4 原型
原型是JavaScript中面向对象的重要概念，前面的例子中都没有涉及原型，仅仅通过构造函数和new语句来生成类。
下面让我们关注如何使用原型和构造函数共同生成对象。
```
function Person() {
}
Person.prototype.name = 'BYVoid';
Person.prototype.showName = function () {
  console.log(this.name);
};
var person = new Person();
person.showName();
```
上面的代码使用原型而不是构造函数来初始化对象，这样做与直接在构造函数中定义属性有什么不同呢？
1. 构造函数内定义的属性继承方式与原型不同
   子对象需要显示调用父对象才能继承构造函数内定义的属性
2. 构造函数内定义的任何属性，包括函数在内都会被重复创建，同一个构造函数产生的两个对象不共享实例。
3. 构造函数内定义的函数有运行时闭包的开销，因为构造函数内的局部变量对其中定义的函数来说也是可见的。

下面的代码用来验证以上问题：
```
function Foo() {
  var innerVar = 'hello';
  this.prop1 = 'BYVoid';
  this.func1 = function(){
    innerVar = '';
  };
}
Foo.prototype.prop2 = 'Carbo';
Foo.prototype.func2 = function () {
  console.log(this.prop2);
};

var foo1 = new Foo();
var foo2 = new Foo();

console.log(foo1.func1 == foo2.func1);    // 输出false
console.log(foo1.func2 == foo2.func2);    // 输出true
```

尽管如此，并不是说在构造函数内创建属性不好，而是两者各有各的适用范围。那么我们什么时候使用原型，什么时候使用构造函数内定义来创建属性呢？
1. 除非必须使用构造函数闭包，否则尽量用原型定义成员函数，因为这样可以减少开销
2. 尽量在构造函数内定义一般成员，尤其是对象或数组，因为用原型定义的成员是多个实例共享的。

### 原型链机制
JavaScript中有两个特殊的对象：Object和Function，它们都是构造函数，用于生成对象。
Object.protorype是所有对象的祖先，Function。protorype是所有函数的原型，包括构造函数。

我们把JavaScript中的对象分为三类：一类是用户创建的对象，一类是构造函数对象，一类是原型对象。
1. 用于创建的对象，即一般意义上用new语句显示构造的对象。
2. 构造函数对象指的是普通的构造函数，即通过new调用生成普通对象的函数。
3. 原型对象特指构造函数prototype属性指向的对象。

这三类对象中每一类都有一个__proto__属性，它指向该对象的原型，从任何对象沿它开始遍历都可以追溯到Object.prototype。
构造函数对象有prototype属性，指向一个原型对象，通过该构造函数创建对象时，被创建对象的__proto__属性将会指向构造函数的prototype属性。
原型对象有constructor属性，指向它对应的构造函数。
```
// 定义构造函数
function Foo() {
}
// Object的原型对象
Object.prototype.name = 'My Object';
// Foo的原型对象
Foo.protorype.name = 'Bar';

var obj = new Object();
var foo = new Foo();

console.log(obj.name);    // 输出 My Object
console.log(foo.name);    // 输出 Bar
console.log(foo.__proto__.name);    // 输出 Bar
console.log(foo.__proto__.__proto__.name);    // 输出 My Object
console.log(foo.__proto__.constructor.prototype.name);    // 输出 Bar
```

### 3.5 对象的复制
JavaScript和Java一样没有C语言中一样的指针，所有对象类型的变量都是指向对象的引用，两个变量之间赋值传递一个对象并不会对这个变量进行复制，而只是传递引用。
如果我们需要完整的复制一个对象，就需要我们自己手动实现这样一个函数，复制对象的所有属性：
```
Object.prototype.clone = function() {
  var newObj = {};
  for (var i in this) {
    newObj[i] = this[i];
  }
  return newObj;
}
var obj = {
  name: 'byvoid',
  likes: ['node']
};

var newObj = obj.clone();
obj.likes.push('python');
console.log(obj.likes);    // 输出 [ 'node', 'python' ]
console.log(newObj.likes);    // 输出 [ 'node', 'python']
```
