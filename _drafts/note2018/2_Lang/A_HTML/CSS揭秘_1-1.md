# CSS揭秘阅读笔记
## 序章

```
# $$()函数
function $$(selector, context) {
  context = context || document;
  var elements = context.querySelectorAll(selector);
  return Array.prototype.slice.call(elements);
}
```

浏览器支持与回退机制

有些时候不太可能通过样式的层叠实现完善的回退，这时可能会需要使用Modernizr这样的工具给根元素（html）来添加辅助类。
```
h1 { color: gray; }
.textshadow h1 {
  color: transparent;
  text-shadow: 0 0 .3em gray;
}
```

还可以使用@supports规则来实现回退，可以将其视为浏览器原生的Modernizr。
```
h1 { color: gray; }
@support (text-shadow: 0 0 .3em gray) {
  h1 {
    color: transparent;
    text-shadow: 0 0 .3em gray;
  }
}
```

如果你不打算使用Modernizr，也可以自己写一小段JS代码来实现相同的功能——做一些特性检测然后给根元素添加一些辅助类。
```
var root = document.documentElement; // <html>

if ('textShadow' in root.style) {
  root.classList.add('textshadow');
} else {
  root.classList.add('no-textshadow');
}

function testProperty(property) {
  var root = document.documentElement;

  if (property in root.style) {
    root.classList.add(property.toLowerCase());
    return true;
  }

  root.classList.add('no-'+property.toLowerCase());
  return false;
}
```
```
var dummy = document.createElement('p');
dummy.style.backgroundImage = 'linear-gradient(red, tan)';
if (dummy.style.backgroundImage) {
  root.classList.add('lineargradients');
} else {
  root.classList.add('no-lineargradients');
}

function testValue(id, value, property) {
  var dummy = document.createElement('p');
  dummy.style[property] = value;

  if (dummy.style[property]) {
    root.classList.add(id);
    return true;
  }

  root.classList.add('no-' + id);
  return false;
}
```

如果要检测选择符和@规则的支持情况，则比较复杂。

