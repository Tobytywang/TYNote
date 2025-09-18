## app_bar_main.xml
> 作为住内容区域的主内容展示

### 根元素：android.support.design.widget.CoordinatorLayout
http://blog.csdn.net/litengit/article/details/52948574
http://blog.csdn.net/lmj623565791/article/details/45303349
actionvar->toolbar(AppBarLayout)
继承路线
```
java.lang.Object
  android.view.View
    android.view.ViewGroup
      android.support.design.widget.CoordinatorLayout
```
说明
```
CoordinatorLayout是一个很强大的FrameLayout
1. 作为根元素（decor）或者壳元素（）
2. 作为几个view的容器
```
### 子元素：android.support.design.widget.AppBarLayout
继承路线
```
java.lang.Object
  android.view.View
    android.view.ViewGroup
      android.widget.LinearLayout
        android.support.design.widget.AppBarLayout
```
说明
```
通过设置（setScrollFlags(int)，app:layout_scrollFlags来允许滑动
最好将其置于CoordinatorLayout根元素下，否则很多功能会无法使用。
```
代码
```
<android.support.design.widget.CoordinatorLayout
         xmlns:android="http://schemas.android.com/apk/res/android"
         xmlns:app="http://schemas.android.com/apk/res-auto"
         android:layout_width="match_parent"
         android:layout_height="match_parent">

     <android.support.v4.widget.NestedScrollView
             android:layout_width="match_parent"
             android:layout_height="match_parent"
             app:layout_behavior="@string/appbar_scrolling_view_behavior">

         <!-- Your scrolling content -->

     </android.support.v4.widget.NestedScrollView>

     <android.support.design.widget.AppBarLayout
             android:layout_height="wrap_content"
             android:layout_width="match_parent">

         <android.support.v7.widget.Toolbar
                 ...
                 app:layout_scrollFlags="scroll|enterAlways"/>

         <android.support.design.widget.TabLayout
                 ...
                 app:layout_scrollFlags="scroll|enterAlways"/>

     </android.support.design.widget.AppBarLayout>

 </android.support.design.widget.CoordinatorLayout>
```
