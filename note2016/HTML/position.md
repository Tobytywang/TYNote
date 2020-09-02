# CSS中的POSITION属性
- static(静止定位)
- relative(相对定位)
- absolute(绝对定位)
- fixed(固定定位)

## 综合
静止定位（static）的元素是默认的。不脱离文档流，不能使用left,right,top,bottom，元素不存在遮挡（无法使用z-index）。
相对定位（relative）可以看作是对静止定位（static）的补充。同样不脱离文档流，但是可以使用left,right,top,bottom。移动后会出现遮挡，后面定义的元素会遮挡前面定义的元素，这种情况下可以使用z-index来提升显示优先级。

绝对定位（ablolute）和固定定位（fixed）才是真正意义上的“相对”定位。
绝对定位相对于父元素进行定位，默认的父元素是body，也可以是设定了relative的元素，static，absolute和fixed不会成为其父元素。可以使用left等进行元素的定位（可以伸缩）。同样存在类似于relative的遮挡，先定义的会遮挡后面的（这个规则适用于同一个父容器（body或者relative）下的relative，absolute，fixed元素），可以使用index来提升显示优先级。

固定定位总是相对于视口（浏览器显示空间）的。其余和relative,absolute类似（可以使用left等定位，会出现遮挡，使用z-index提升显示优先级）。

## 使用
1. 在网页中使用static来完成“一块元素”的设计。
2. 当需要对于视口进行定位时，使用fixed属性。
3. 需要相对父元素进行定位时，使用relative提升static的“能力”，在relative定义的父容器中使用absolue来实现相对定位

## 简单的例子(coding.net)
```
+-----------------------------------------------------------------------+
|                                header                                 |
+----+------------------------------------------------------------------+
|    |                                                                  |
|    |                                                                  |
| l  |                                                                  |
| e  |                                                                  |
| f  |                                                                  |
| t  |                           content                                |
|    |                                                                  |
|    |                                                                  |
|    |                                                                  |
+----+------------------------------------------------------------------+
```
描述：
header和left是不会随页面滑动来移动的。content会随页面移动。
思路：
对header和left使用fixed定位，content部分，先使用relative将内容定位到不会被header和left遮挡的地方，在在里面使用static。
```
<head>
  <style>
  .header {
    margin: 0px;
    position: fixed;
    left: 0px;
    right: 0px;
    top: 0px;
    height: 60px;
  }
  .left {
    margin: 0px;
    position: fixed;
    left: 0px;
    top: 60px;
    bottom: 0px;
    width: 80px;
  }
  .cotent {
    margin: 0px;
    position: relative;
    top: 60px;
    left: 80px;
  }
  </style>
</head>
<body>
  <div class="header"></div>
  <div class="left"></div>
  <div class="content"></div>
</body>
```
评价：
实际效果大概是达到了的。
coding的实现(大致)：
```
<style>
  .header {
    position: fixed;
    width: 100%;  // 满足宽度
    padding: 10px 0px; // 根据内容决定高度
  }
  .left {
    postion: fixed;
    height: 100%;
    width: 80px;
  }
  .content {
    margin-left: 80px;
    padding-top: 60px;
  }
</style>
```
仍然有差距的地方：
1. 根据内容动态变化大小(header)
2. 使用margin和padding代替relative定位(content)
3. 使用top,bottom还是100%定义高度(left)
