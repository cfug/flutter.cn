---
title: Flutter GPU 入门：使用自定义渲染器和 3D 渲染
description: Flutter GPU 入门：使用自定义渲染器和 3D 渲染
toc: true
---

Flutter 3.24 版本引入了一个名为 [Flutter GPU](https://github.com/flutter/engine/blob/main/docs/impeller/Flutter-GPU.md) 的新型底层图形 API。同时还有一个由 Flutter GPU 驱动的 3D 渲染库，叫做 [Flutter Scene](https://pub.flutter-io.cn/packages/flutter_scene) (package: `flutter_scene`)。Flutter GPU 和 Flutter Scene 目前都处于预览阶段，仅在 Flutter 的 [主渠道](https://docs.flutter.cn/release/upgrade#other-channels)上可用（因为依赖实验性功能），需要 [启用 Impeller](https://docs.flutter.cn/perf/impeller#availability)，并且可能偶尔引入破坏性变更。

本文包含两个关于这些 package 的“入门”指南：

1. 🔺 **进阶：** Flutter GPU 入门  
   如果你是一位经验丰富的图形程序员，或者你对底层图形感兴趣并想在 Flutter 中从头构建渲染器，那么这个指南将帮助你开始使用 Flutter GPU。你将从零开始绘制你的第一个三角形……使用 Flutter！
2. 💚 **中级：** 使用 Flutter Scene 进行 3D 渲染
   如果你是一名想要在应用中添加 3D 功能的 Flutter 开发者，或者你想使用 Dart 和 Flutter 创建 3D 游戏，那么这个指南就是为你准备的！你将设置一个项目，导入并在 Flutter 中渲染 3D 资源。

## Flutter GPU 入门

⚠️ 警告！⚠️ Flutter GPU 本质上是一个底层 API。绝大多数 Flutter 开发者感受 Flutter GPU 强大的方式是通过使用发布在 Pub.dev 上的高级渲染库，比如 Flutter Scene。如果你对 Flutter GPU API 本身不感兴趣，而只对 3D 渲染感兴趣，可以直接跳到使用 Flutter Scene 进行 3D 渲染部分。

![哇，真漂亮。这是一个光线追踪的符号距离场。](https://files.flutter-io.cn/posts/flutter-cn/2024/flutter-gpu/0_hAqIOVkaI1IWnOHE.png)

你可以使用 Flutter GPU 来渲染这个，不过使用 [自定义片段着色器](https://docs.flutter.cn/ui/design/graphics/fragment-shaders) 也完全可以实现。

## Flutter GPU 入门

Flutter GPU 是 Flutter 内置的底层图形 API。它让你通过编写 Dart 代码和 GLSL 着色器在 Flutter 中构建和集成自定义渲染器。无需编写任何本机平台代码。

目前，Flutter GPU 处于早期预览阶段，提供了基本的光栅化 API，但随着 API 接近稳定版，将继续添加和完善更多功能。

Flutter GPU 还需要 [启用 Impeller](https://docs.flutter.cn/perf/impeller#availability)。这意味着它只能在 Impeller 支持的平台上使用。在撰写本文时，Impeller 支持：

- iOS（默认开启）  
- macOS（选择加入预览）
- Android（选择加入预览）

我们的目标是最终让 Flutter GPU 支持 Flutter 的所有目标平台。我们的终极目标是培养 Flutter 中跨平台渲染解决方案的生态系统，让 package 作者易于维护，用户易于安装。

3D 渲染只是一个可能的用例。Flutter GPU 还可以用于构建专门的 2D 渲染器，或者做一些更非常规的事情，比如渲染 4D 空间的 3D 切片，或者投影非欧几里德空间。

一个由 Flutter GPU 驱动的自定义 2D 渲染器的很好的用例示例是依赖骨骼网格变形的 2D 角色动画格式。Spine 2D 就是一个很好的例子。这种骨骼网格解决方案通常具有操纵骨骼层次结构中的平移、旋转和缩放属性的动画剪辑，每个顶点都有一些相关的"骨骼权重"，用于确定哪些骨骼应该影响顶点以及影响程度。

使用 Canvas 解决方案（如 `drawVertices`），需要在 CPU 上对每个顶点应用骨骼权重变换。使用 Flutter GPU，骨骼变换可以以均匀数组或纹理采样器的形式提供给顶点着色器，允许根据骨骼的状态和每个顶点的骨骼权重在 GPU 上并行计算每个顶点的最终位置。

说了这么多，让我们通过一个温和的介绍开始使用 Flutter GPU 吧：绘制你的第一个三角形！

![](https://files.flutter-io.cn/posts/flutter-cn/2024/flutter-gpu/0_JEI3fLDGcRHWKruT.png)

## 将 Flutter GPU 添加到你的项目中

首先，请注意 Flutter GPU 目前处于早期预览状态，可能容易发生 API 变化。目前的 API 已经可以实现很多功能，但有经验的图形工程师可能会注意到一些常见功能的缺失。未来几个月计划为 Flutter GPU 添加很多功能。

出于这些原因，我们强烈建议你在开发使用 Flutter GPU 的 package 时，暂时使用 [主渠道](https://docs.flutter.cn/release/upgrade#other-channels)的最新版本。如果你遇到任何意外行为、错误或有功能请求，请使用 GitHub 上的标准 [Flutter 问题模板](https://github.com/flutter/flutter/issues/new/choose)提交问题。所有与 Flutter GPU 相关的跟踪问题都被标记为 [flutter-gpu 标签](https://github.com/flutter/flutter/labels/flutter-gpu)。

因此，在尝试 Flutter GPU 之前，请通过运行以下命令将 Flutter 切换到主渠道。

```shell
flutter channel main
flutter upgrade
```

现在创建一个新的 Flutter 项目。

```shell
flutter create my_cool_renderer
cd my_cool_renderer
```

接下来，将 flutter_gpu SDK package 添加到你的 pubspec 中。

```shell
flutter pub add flutter_gpu --sdk=flutter
```

## 构建和导入着色器包

为了使用 Flutter GPU 渲染任何内容，你需要编写一些 GLSL 着色器。Flutter GPU 的着色器与 Flutter 的 [片段着色器](https://docs.flutter.cn/ui/design/graphics/fragment-shaders) 功能所使用的着色器有不同的语义，特别是在统一绑定方面。你还需要定义一个顶点着色器来配合片段着色器。

首先定义最简单的着色器。你可以将着色器放在项目的任何位置，但在这个例子中，创建一个 `shaders` 目录并在其中放置两个着色器：`simple.vert` 和 `simple.frag`。

```glsl
#version 320 es

in vec2 position;

void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
```

绘制三角形时，你将有一个定义每个顶点的数据列表。在这种情况下，它只列出了 2D 位置。对于这些顶点中的每一个，一个简单的顶点着色器将这些 2D 位置分配给裁剪空间输出内在变量 `gl_Position`。

```glsl
#version 320 es

out vec4 frag_color;

void main() {
  frag_color = vec4(0, 1, 0, 1);
}
```

片段着色器更简单；它输出一个 RGBA 颜色，范围从 `(0, 0, 0, 0)` 到 `(1, 1, 1, 1)`。所以一切都会被着色为绿色。

好了，现在你有了着色器，使用 Flutter 的预先时间（AOT）着色器编译器编译它们。要为着色器包设置自动构建，我们建议使用 [flutter_gpu_shaders](https://pub.flutter-io.cn/packages/flutter_gpu_shaders) package。

使用 pub 将 `flutter_gpu_shaders` 作为常规依赖项添加到你的项目中。

```shell
flutter pub add flutter_gpu_shaders
```

Flutter GPU 着色器被打包成 `.shaderbundle` 文件，可以作为常规资源添加到你项目的资源库中。着色器包包含针对平台目标编译的着色器源代码。

接下来，创建一个着色器包清单文件，描述着色器包的内容。在项目的根目录中添加以下内容到 `my_renderer.shaderbundle.json`。

```json
{
    "SimpleVertex": {
        "type": "vertex",
        "file": "shaders/simple.vert"
    },
    "SimpleFragment": {
        "type": "fragment",
        "file": "shaders/simple.frag"
    }
}
```

着色器包中的每个条目都可以有任意名称。在这种情况下，名称是"SimpleVertex"和"SimpleFragment"。这些名称用于在你的应用中查找着色器。

接下来，使用 `flutter_gpu_shaders` package 构建 `shaderbundle`。你可以添加一个钩子，通过启用实验性的“平台原生资源 (Native Assets)”功能来自动触发构建。使用以下命令启用平台原生资源并安装 `native_assets_cli` package。

```shell
flutter config --enable-native-assets
flutter pub add native_assets_cli
```

启用“平台原生资源”功能后，在 `hook` 目录下添加一个 `build.dart` 脚本，它将自动触发构建着色器包。

```dart
import 'package:native_assets_cli/native_assets_cli.dart';
import 'package:flutter_gpu_shaders/build.dart';

void main(List<String> args) async {
  await build(args, (config, output) async {
    await buildShaderBundleJson(
        buildConfig: config,
        buildOutput: output,
        manifestFileName: 'my_renderer.shaderbundle.json');
  });
}
```

进行此更改后，当 Flutter 工具构建项目时，`buildShaderBundleJson` 会构建着色器包并将结果输出到 package 根目录下的 `build/shaderbundles/my_renderer.shaderbundle`。

着色器包格式本身与你使用的特定 Flutter 版本相关联，并且可能随时间而变化。如果你正在创作一个构建着色器包的 package，不要将生成的 `.shaderbundle` 文件放进你的源代码库。相反，使用构建钩子来自动化构建过程（如前面所解释的）。

这样，使用你的库的开发者将始终使用正确格式构建新的着色器包！

现在你已经自动构建了着色器包，像常规资源一样导入它。在项目的 `pubspec.yaml` 中添加一个 `assets` 条目：

```yaml
flutter:
  assets:
    - build/shaderbundles/
```

将来，“平台原生资源”功能将允许构建钩子将数据资源附加到 package 中。一旦发生这种情况，就不再需要在构建钩子旁边添加资源导入规则了。

接下来，添加一些代码在运行时加载着色器。创建 `lib/shaders.dart` 并添加以下代码。

```dart
import 'package:flutter_gpu/gpu.dart' as gpu;

const String _kShaderBundlePath =
    'build/shaderbundles/my_renderer.shaderbundle';

// 这是 Flutter GPU 着色器运行时库的单例 getter
gpu.ShaderLibrary? _shaderLibrary;
gpu.ShaderLibrary get shaderLibrary {
  if (_shaderLibrary != null) {
    return _shaderLibrary!;
  }
  _shaderLibrary = gpu.ShaderLibrary.fromAsset(_kShaderBundlePath);
  if (_shaderLibrary != null) {
    return _shaderLibrary!;
  }

  throw Exception("加载着色器包失败！($_kShaderBundlePath)");
}
```

这段代码为 Flutter GPU 着色器运行时库创建了一个单例 getter。第一次访问 `shaderLibrary` 时，使用内置资源包初始化运行时着色器库，使用 `gpu.ShaderLibrary.fromAsset(shader_bundle_path)`。

现在项目已经设置好使用 Flutter GPU 着色器了。是时候渲染那个三角形了！

## 绘制你的第一个三角形

在本指南中，你将创建一个 RGBA Flutter GPU `Texture` 和一个 `RenderPass`，将 Texture 作为颜色输出附加。然后，你将使用 `Canvas.drawImage` 在 widget 中渲染 `Texture`。

为了简洁起见，你将不遵循最佳实践，而是为每一帧重新构建所有资源。

只要在分配 `Texture` 时将其标记为"着色器可读"，你就可以将其转换为 `dart:ui.Image`。要在 widget 树中显示渲染结果，将其绘制到 `dart:ui.Canvas` 上！

你可以通过使用自定义画家来搭建 widget 树来访问 `Canvas`。将 `lib/main.dart` 的内容替换为以下内容：

```dart
import 'dart:typed_data';

import 'package:flutter/material.dart';
import 'package:flutter_gpu/gpu.dart' as gpu;

import 'shaders.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter GPU 三角形示例',
      home: CustomPaint(
        painter: TrianglePainter(),
      ),
    );
  }
}

class TrianglePainter extends CustomPainter {
  @override
  void paint(Canvas canvas, Size size) {
    // 这里是魔法发生的地方！
    
    print('默认颜色格式：' +
        gpu.gpuContext.defaultColorFormat.toString());
  }

  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) => true;
}
```

现在，运行应用。请记住，Flutter GPU 目前需要 [启用 Impeller](https://docs.flutter.cn/perf/impeller#availability)。所以你必须使用支持 Impeller 的平台。在本指南中，我将以 macOS 为目标。

```shell
flutter run -d macos --enable-impeller
```

![](https://files.flutter-io.cn/posts/flutter-cn/2024/flutter-gpu/0_lKTtaX2ih6dFpSMQ.png)

如果 Flutter GPU 正常工作，你应该会看到默认颜色格式打印到控制台。

```console
flutter: Default color format: PixelFormat.b8g8r8a8UNormInt
```

如果未启用 Impeller，在尝试访问 `gpu.gpuContext` 时会抛出异常。

```console
Exception: Flutter GPU requires the Impeller rendering backend to be enabled.
异常：Flutter GPU 需要启用 Impeller 渲染后端。

The relevant error-causing widget was:
  CustomPaint
相关错误来源的 widget 是：
  CustomPaint
```

为了简单起见，从现在开始你只会修改 `paint` 方法。

首先，创建一个 Flutter GPU `Texture`，清除它，然后通过将其绘制到 `Canvas` 上来显示它。

创建一个与 `Canvas` 大小相同的 `Texture`。必须选择一个 `StorageMode`。在这种情况下，你将 `Texture` 标记为 `devicePrivate`，因为你只会使用从设备（GPU）访问纹理内存的指令。

```dart
final texture = gpu.gpuContext.createTexture(gpu.StorageMode.devicePrivate,
    size.width.toInt(), size.height.toInt())!;
```

如果要通过从主机（CPU）上传来覆盖纹理的数据，则改用 `StorageMode.hostVisible`。

第三个可用选项是 `StorageMode.deviceTransient`，这对于不需要超过单个 `RenderPass` 生命周期的附件很有用（因此它们可以只存在于平铺内存中，不需要由 VRAM 分配支持）。通常，深度/模板纹理符合这个标准。

接下来，定义一个 `RenderTarget`。渲染目标包含一组"附件"，描述每个片段的内存布局及其在 `RenderPass` 开始和结束时的设置/拆卸行为。

本质上，`RenderTarget` 是 `RenderPass` 的可重用描述符。

现在，定义一个只包含一个颜色附件的非常简单的 `RenderTarget`。

```dart
final renderTarget = gpu.RenderTarget.singleColor(
  gpu.ColorAttachment(texture: texture, clearValue: Colors.lightBlue));
```

注意这段代码将 `clearValue` 设置为浅蓝色。每个附件都有一个 `LoadAction` 和一个 `StoreAction`，它们决定在通道开始和结束时应该对附件的短暂平铺内存发生什么。

默认情况下，颜色附件设置为 `LoadAction.clear`（将平铺内存初始化为给定颜色）和 `StoreAction.store`（将结果保存到附加纹理的 VRAM 分配中）。

现在，创建一个 `CommandBuffer`，使用早前的 `RenderTarget` 从中生成一个 `RenderPass`，然后立即提交 `CommandBuffer` 以清除纹理。

```dart
final commandBuffer = gpu.gpuContext.createCommandBuffer();
final renderPass = commandBuffer.createRenderPass(renderTarget);

commandBuffer.submit();
```

剩下的就是将初始化的纹理绘制到 Canvas 上！

```dart
final image = texture.asImage();
canvas.drawImage(image, Offset.zero, Paint());
```

![](https://files.flutter-io.cn/posts/flutter-cn/2024/flutter-gpu/0_ebUDtzQOuIGmdlop.png)

OK，屏幕上现在有了一个连接到 `RenderPass` 的结果，你已经准备好开始绘制三角形了。为此，我们接下来设置以下内容：

1. 从我们的着色器创建的 `RenderPipeline`，以及
2. 包含我们几何体的 GPU 可访问缓冲区（三个顶点位置）。

创建 `RenderPipeline` 很容易。你只需要将库中的顶点和片段着色器组合起来。

```dart
final vert = shaderLibrary['SimpleVertex']!;
final frag = shaderLibrary['SimpleFragment']!;
final pipeline = gpu.gpuContext.createRenderPipeline(vert, frag);
```

现在是几何体。回想一下，"SimpleVertex" 着色器只有一个输入：`in vec2 position`。所以，要绘制三个顶点，你需要三组两个浮点数。

```dart
final vertices = Float32List.fromList([
  -0.5, -0.5, // 左下
   0.5, -0.5, // 右下
   0.0,  0.5, // 顶部中心
]);
final verticesDeviceBuffer = gpu.gpuContext
    .createDeviceBufferWithCopy(ByteData.sublistView(vertices))!;
```

剩下的就是绑定新资源并调用 `renderPass.draw()` 来完成绘制调用的记录。

```dart
renderPass.bindPipeline(pipeline);

final verticesView = gpu.BufferView(
  verticesDeviceBuffer,
  offsetInBytes: 0,
  lengthInBytes: verticesDeviceBuffer.sizeInBytes,
);
renderPass.bindVertexBuffer(verticesView, 3);

renderPass.draw();
```

如果你启动应用，你现在应该会看到一个绿色三角形！

![耶，你使用 Flutter、Dart 和一点 GLSL 构建了一个渲染器！](https://files.flutter-io.cn/posts/flutter-cn/2024/flutter-gpu/0_LWnGU5WPT_Eom0wJ.png)

无论这是你第一次渲染三角形还是你是一个经验丰富的图形老手，我希望你会继续探索 Flutter GPU 并查看我们正在开发的 package，比如 Flutter Scene。

将来，我们希望发布初学者友好的 codelabs，深入探讨 Flutter GPU 的默认行为和最佳实践。我们还没有讨论顶点属性布局、纹理绑定、统一和对齐要求、管线混合、深度和模板附件、透视校正等等！

在此之前，我建议探索 [Flutter Scene](https://github.com/bdero/flutter_scene) 作为如何使用 Flutter GPU 的更全面示例。

## 使用 Flutter Scene 进行 3D 渲染

Flutter Scene（package `flutter_scene`）是一个由 Flutter GPU 驱动的新的 3D 场景图 package，使 Flutter 开发者能够导入动画 glTF 模型并渲染实时 3D 场景。

其目的是提供一个 package，使在 Flutter 中构建交互式 3D 应用和游戏变得容易。

![](https://files.flutter-io.cn/posts/flutter-cn/2024/flutter-gpu/0_tC68CbPLef2rJp1e.png)

这个 package 最初是作为 `dart:ui` 扩展开始的，用于一个用 C++ 编写并直接构建到 Flutter 的原生运行时中的 3D 渲染器，但它已经被重写为针对 Flutter GPU 的更灵活接口。

与 Flutter GPU API 本身一样，Flutter Scene 目前处于早期预览状态，需要 [启用 Impeller](https://docs.flutter.cn/perf/impeller#availability)。Flutter Scene 通常会跟上 Flutter GPU API 的破坏性变更，因此强烈建议在尝试 Flutter Scene 时使用 [主渠道](https://docs.flutter.cn/release/upgrade#other-channels)。

接下来，让我们用 Flutter Scene 制作一个应用！

## 设置 Flutter Scene 项目

由于强烈建议在 [主渠道](https://docs.flutter.cn/release/upgrade#other-channels) 上使用 Flutter Scene，首先切换到它。

```shell
flutter channel main
flutter upgrade
```

接下来，创建一个新的 Flutter 项目。

```shell
flutter create my_3d_app
cd my_3d_app
```

Flutter Scene 依赖于实验性的“平台原生资源”功能来自动构建着色器。你稍后将使用“平台原生资源”来设置自动导入 3D 模型以供 Flutter Scene 使用。

使用以下命令启用“平台原生资源”功能：

```shell
flutter config --enable-native-assets
```

最后，将 Flutter Scene 添加为项目依赖项。

你还需要在与 Flutter Scene 的 API 交互时使用几个 `vector_math` 构造，所以也添加 `vector_math` package。

```shell
flutter pub add flutter_scene vector_math
```

接下来，导入一个 3D 模型！

## 导入 3D 模型

首先，你需要一个 3D 模型来渲染。对于本指南，你将使用一个常见的 [glTF](https://en.wikipedia.org/wiki/GlTF) 示例资源：[DamagedHelmet.glb](https://github.com/KhronosGroup/glTF-Sample-Assets/tree/main/Models/DamagedHelmet)。这是它的样子。

![](https://files.flutter-io.cn/posts/flutter-cn/2024/flutter-gpu/0_vVWRLxJ348tCxv7T.png)

原始的 Damaged Helmet 模型由 theblueturtle\_ 在 2016 年创建（许可证：[CC BY-NC 4.0 International](https://creativecommons.org/licenses/by-nc/4.0/legalcode)）。转换后的 glTF 版本由 ctxwing 在 2018 年创建（许可证：[CC BY 4.0 International](https://creativecommons.org/licenses/by/4.0/legalcode)）

你可以从托管在 GitHub 上的 [glTF 示例资源仓库](https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/main/Models/DamagedHelmet/glTF-Binary/DamagedHelmet.glb) 获取它。将 DamagedHelmet.glb 放在你的项目根目录中。

```shell
curl -O https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/main/2.0/DamagedHelmet/glTF-Binary/DamagedHelmet.glb
```

像大多数实时 3D 渲染器一样，Flutter Scene 在内部使用专门的 3D 模型格式。你可以使用 Flutter Scene 的离线导入工具将标准 glTF 二进制文件（.glb 文件）转换为这种格式。

将 `flutter_scene_importer` package 作为常规依赖项添加到项目中。

```shell
flutter pub add flutter_scene_importer
```

添加这个 package 使得可以使用 `dart run` 手动调用导入器。

```shell
dart --enable-experiment=native-assets \
     run flutter_scene_importer:import \
     --input "path/to/my/source_model.glb" \
     --output "path/to/my/imported_model.model"
```

你可以通过使用“平台原生资源”构建钩子自动运行导入器。为此，首先将 `native_assets_cli` 安装为常规项目依赖项。

```shell
flutter pub add native_assets_cli
```

现在你可以编写构建钩子了。创建 `hook/build.dart`，内容如下：

```dart
import 'package:native_assets_cli/native_assets_cli.dart';
import 'package:flutter_scene_importer/build_hooks.dart';

void main(List<String> args) {
  build(args, (config, output) async {
    buildModels(buildConfig: config, inputFilePaths: [
      'DamagedHelmet.glb',
    ]);
  });
}
```

使用 `flutter_scene_importer` 中的 `buildModels` 实用程序，提供要构建的模型列表。路径相对于项目的构建根目录。

当 Flutter 工具构建项目时，`buildModels` 现在会构建着色器包并将结果输出到 package 根目录下的 `build/models/DamagedModel.model`。

导入的模型格式本身与你使用的特定 Flutter Scene 版本相关联，并且会随时间变化。在创作使用 Flutter Scene 的应用或库时，不要将生成的 `.model` 文件检入你的源代码树。相反，使用构建钩子从源模型生成它们（如前面所解释的）。

这样，随着你随时间升级 Flutter Scene，你将始终构建具有正确格式的新 .model 文件！

接下来，像常规资源一样导入模型。在项目的 `pubspec.yaml` 中添加一个 assets 条目。

```yaml
flutter:
  assets:
    - build/models/
```

将来，“平台原生资源”功能将允许构建钩子将数据资源附加到 package 中。一旦发生这种情况，就不再需要在构建钩子旁边添加资源导入规则了。

## 渲染 3D 场景

现在是应用代码的时候了。

首先，创建一个有状态 widget 以在帧之间保持 `Scene`。

你将根据时间进行动画，所以将 `SingleTickerProviderStateMixin` 添加到状态中，并添加一个 `elapsedSeconds` 成员。

```dart
import 'dart:math';

import 'package:flutter/material.dart';
import 'package:flutter/scheduler.dart';
import 'package:flutter_scene/camera.dart';
import 'package:flutter_scene/node.dart';
import 'package:flutter_scene/scene.dart';
import 'package:vector_math/vector_math.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatefulWidget {
  const MyApp({super.key});

  @override
  MyAppState createState() => MyAppState();
}

class MyAppState extends State<MyApp> with SingleTickerProviderStateMixin {
  double elapsedSeconds = 0;
  Scene scene = Scene();

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: '我的 3D 应用',
      home: Placeholder(),
    );
  }
}
```

运行应用作为烟雾测试，确保没有错误。记住要 [启用 Impeller](https://docs.flutter.cn/perf/impeller#availability)！

```shell
flutter run -d macos --enable-impeller
```

![](https://files.flutter-io.cn/posts/flutter-cn/2024/flutter-gpu/0_74qs6ytcTjyVHwML.png)

在继续之前，为动画设置 ticker。在 `MyAppState` 中重写 `initState` 以调用 `createTicker`。

```dart
  @override
  void initState() {
    createTicker((elapsed) {
      setState(() {
        elapsedSeconds = elapsed.inMilliseconds.toDouble() / 1000;
      });
    }).start();

    super.initState();
  }
```

只要 widget 可见，ticker 回调就会在每一帧被调用。调用 `setState` 触发此 widget 在每一帧重建。

接下来，加载你之前放在项目中的 3D 模型并将其添加到 Scene 中。

使用 `Node.fromAsset` 从资源包中加载模型。将以下代码放在 `initState` 中。

```dart
    Node.fromAsset('build/models/DamagedHelmet.model').then((model) {
      model.name = 'Helmet';
      scene.add(model);
    });
```

`Node.fromAsset` 从资源包中异步反序列化模型，并在准备好添加到场景时解析返回的 `Future<Node>`。

`MyAppState.initState` 现在应该如下所示：

```dart
  @override
  void initState() {
    createTicker((elapsed) {
      setState(() {
        elapsedSeconds = elapsed.inMilliseconds.toDouble() / 1000;
      });
    }).start();

    Node.fromAsset('build/models/DamagedHelmet.model').then((model) {
      model.name = 'Helmet';
      scene.add(model);
    });

    super.initState();
  }
```

然而，你还没有真正渲染 3D Scene！要做到这一点，使用 `Scene.render`，它接受一个 UI `Canvas`、一个 Flutter Scene `Camera` 和一个大小。

访问 Canvas 的一种方法是创建一个 `CustomPainter`：

```dart
class ScenePainter extends CustomPainter {
  ScenePainter({required this.scene, required this.camera});
  Scene scene;
  Camera camera;

  @override
  void paint(Canvas canvas, Size size) {
    scene.render(camera, canvas, viewport: Offset.zero & size);
  }

  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) => true;
}
```

不要忘记将 `shouldRepaint` 重写设置为返回 true，这样自定义画家会在每次重建时重新绘制。

最后，将 `CustomPainter` 添加到源代码树中。

```dart
  @override
  Widget build(BuildContext context) {
    final painter = ScenePainter(
      scene: scene,
      camera: PerspectiveCamera(
        position: Vector3(sin(elapsedSeconds) * 3, 2, cos(elapsedSeconds) * 3),
        target: Vector3(0, 0, 0),
      ),
    );

    return MaterialApp(
      title: '我的 3D 应用',
      home: CustomPaint(painter: painter),
    );
  }
```

这段代码指示相机在一个连续的圆中移动，但始终面向原点。

最后，启动应用！

```shell
flutter run -d macos --enable-impeller
```

![](https://files.flutter-io.cn/posts/flutter-cn/2024/flutter-gpu/0__-OFc0vhBHAhrPrO.gif)

这是我们组合在一起的完整源代码。

```dart
import 'dart:math';

import 'package:flutter/material.dart';
import 'package:flutter_scene/camera.dart';
import 'package:flutter_scene/node.dart';
import 'package:flutter_scene/scene.dart';
import 'package:vector_math/vector_math.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatefulWidget {
  const MyApp({super.key});

  @override
  MyAppState createState() => MyAppState();
}

class MyAppState extends State<MyApp> with SingleTickerProviderStateMixin {
  double elapsedSeconds = 0;
  Scene scene = Scene();

  @override
  void initState() {
    createTicker((elapsed) {
      setState(() {
        elapsedSeconds = elapsed.inMilliseconds.toDouble() / 1000;
      });
    }).start();

    Node.fromAsset('build/models/DamagedHelmet.model').then((model) {
      model.name = 'Helmet';
      scene.add(model);
    });

    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    final painter = ScenePainter(
      scene: scene,
      camera: PerspectiveCamera(
        position: Vector3(sin(elapsedSeconds) * 3, 2, cos(elapsedSeconds) * 3),
        target: Vector3(0, 0, 0),
      ),
    );

    return MaterialApp(
      title: '我的 3D 应用',
      home: CustomPaint(painter: painter),
    );
  }
}

class ScenePainter extends CustomPainter {
  ScenePainter({required this.scene, required this.camera});
  Scene scene;
  Camera camera;

  @override
  void paint(Canvas canvas, Size size) {
    scene.render(camera, canvas, viewport: Offset.zero & size);
  }

  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) => true;
}
```

## Flutter 的美好未来

如果你能成功按照这些指南之一操作并让某些东西运行起来：太棒了，恭喜你！

Flutter GPU 和 Flutter Scene 都是非常早期和“年轻”的项目，对平台支持非常有限。但我认为有一天我们会怀念这些“年轻的冲动”。

借助于 Impeller，Flutter 团队完全掌控了渲染堆栈，因为我们需要针对 Flutter 的使用情况专门设计渲染器。现在我们正在开始 Flutter 历史的新篇章。所有人都可以“控制”每一个堆栈的渲染！

Flutter Scene 最初作为 Impeller 中的 C++ 组件开始，与 2D Canvas 渲染器一起，只有一个瘦薄的 `dart:ui` 扩展。当我构建它时，我已经知道 Flutter Engine 不会是它的最终目标。

33D 渲染器的架构决策选择非常广泛，没有单一的通用 3D 渲染器能够很好地解决每一个用例。“通用”和“高性能”通常是对立的目标。

充其量只能保证对所有东西都够用，但却无法在任何方面做到卓越。

在渲染性能领域，情况甚至更糟。针对于某一个用例进行优化通常意味着降低另一个用例的性能。

简而言之，**我们不可能发布一个能够解决所有人的所有需求（用例）的通用级 3D 渲染器**，但是，通过提供构建自己解决方案所需的底层 API（Flutter GPU），并在其上构建一个易于 Flutter 社区检查和修改的有用的通用 3D 渲染器（Flutter Scene），我们正在为 Flutter 开发者们构建一个低淘汰风险、高回报的空间。

![](https://files.flutter-io.cn/posts/flutter-cn/2024/flutter-gpu/1_jfeUgpEP9AgAz94yVxVW1g_gif.gif)

我迫不及待地想看看你们将用这些新功能创造出什么。敬请期待 Flutter Scene 的未来版本。还有很多内容正在路上。

同时，我要回去工作了。

不久后再见。:)