## activity_main.xml
### 根元素：android.support.v4.widget.DrawerLayout
继承路线：
```
java.lang.Object
  android.view.View
    android.view.ViewGroup
      android.support.v4.widget.DrawerLayout
```
说明：
```
DrawerLayout是一个允许使用Drawer元素的根元素。
使用android:layout_gravity(left,right/start,end)来定义滑动的方向。
需要设置子元素的高度，宽度，layout_gravity。
DrawerLayout.DrawerListener可以监听开启，关闭的状态。
=================================================================
要添加抽屉式导航栏，请将包含 DrawerLayout 对象的用户界面声明为布局的根视图。
在 DrawerLayout 内，添加一个包含屏幕主内容（当抽屉式导航栏处于隐藏状态时为主要布局）的视图和另一个包含抽屉式导航栏内容的视图。
例如，以下布局使用包含两个子视图的 DrawerLayout：包含主内容的 FrameLayout（在运行时由 Fragment 填充）和抽屉式导航栏的 ListView。
<android.support.v4.widget.DrawerLayout
    xmlns:android="http://schemas.android.com/apk/res/android"
    android:id="@+id/drawer_layout"
    android:layout_width="match_parent"
    android:layout_height="match_parent">
    <!-- The main content view -->
    <!--
    主内容视图必须是第一个视图
    主内容区域匹配父视图宽度和高度
    -->
    <FrameLayout
        android:id="@+id/content_frame"
        android:layout_width="match_parent"
        android:layout_height="match_parent" />
    <!-- The navigation drawer -->
    <!--
    抽屉导航栏必须使用gravity指定其水平重力（start或者end）
    以dp指定宽度，高度与父视图匹配
    -->
    <ListView android:id="@+id/left_drawer"
        android:layout_width="240dp"
        android:layout_height="match_parent"
        android:layout_gravity="start"
        android:choiceMode="singleChoice"
        android:divider="@android:color/transparent"
        android:dividerHeight="0dp"
        android:background="#111"/>
</android.support.v4.widget.DrawerLayout>
```
一些设置：
```
  android:id="@+id/drawer_layout"
  android:layout_width="match_parent"
  android:layout_height="match_parent"
  android:background="#ffffff"

  android:fitsSystemWindows="true"

  tools:openDrawer="start"
```
### 包含元素：android.support.design.widget.NavigationView
继承路线：
```
java.lang.Object
  android.view.View
    android.view.ViewGroup
      android.widget.FrameLayout
        android.support.design.widget.NavigationView
```
说明：
```
代表了应用的一个标准的导航
和DrawerLayout配合使用
<android.support.v4.widget.DrawerLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    android:id="@+id/drawer_layout"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:fitsSystemWindows="true">

    <!-- Your contents -->

    <android.support.design.widget.NavigationView
        android:id="@+id/navigation"
        android:layout_width="wrap_content"
        android:layout_height="match_parent"
        android:layout_gravity="start"
        app:menu="@menu/my_navigation_items" />
</android.support.v4.widget.DrawerLayout>
```
一些设置
```
  android:layout_gravity="start"
  android:fitsSystemWindows="true"

  app:headerLayout="@layout/nav_header_main"
  app:menu="@menu/activity_main_drawer"
```
