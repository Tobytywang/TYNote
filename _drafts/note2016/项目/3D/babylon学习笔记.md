# 第一课：建立基本场景
```
<script type="text/javascript">
  var canvas = document.getElementById("renderCanvas");
  var engine = new BABYLON.Engine(canvas, true);

  // 构造函数
  var createScene = function(){
    // 定义并初始化场景
    var scene = new BABYLON.Scene(engine);
    scene.clearColor = new BABYLON.Color3(0, 1, 0);

    // 定义相机
    var camera = new BABYLON.FreeCamera("cameral", new BABYLON.Vector3(0, 5, -10), scene);
    camera.setTarget(BABYLON.Vector3.Zero());
    camera.attachControl(canvas, false);

    // 定义灯光
    var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);
    light.intensity = .5;

    // 定义实体（球）
    var sphere = BABYLON.Mesh.CreateSphere("sphere", 16, 2, scene);
    sphere.position.y = 1;

    // 定义地面（平面）
    var ground = BABYLON.Mesh.CreateGround("ground1", 6, 6, 2, scene);

    return scene;
  };

  // 调用createScene创建场景
  var scene = createScene();

  // 调用引擎的渲染循环
  engine.runRenderLoop(function(){
    scene.render();
  });
  // 添加resize事件支持
  window.addEventListener("resize", function(){
    engine.resize;
  });
</script>;
```
