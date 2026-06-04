---
# title: Writing and using fragment shaders
title: 编写和使用片段着色器
# description: How to author and use fragment shaders to create custom visual effects in your Flutter app.
description: 如何编写和使用片段着色器，在你的 Flutter 应用中创建自定义视觉效果。
# shortTitle: Fragment shaders
shortTitle: 片段着色器
ai-translated: true
---

:::note
Both the Skia and [Impeller][] backends support writing a
custom shader. Except where noted, the same
instructions apply to both.
:::

:::note
Skia 和 [Impeller][] 两种后端都支持编写自定义着色器。除非另有说明，否则以下说明对两者均适用。
:::

[Impeller]: /perf/impeller

Custom shaders can be used to provide rich graphical effects
beyond those provided by the Flutter SDK.
A shader is a program authored in a small,
Dart-like language, known as GLSL,
and executed on the user's GPU.

自定义着色器可用于提供超出 Flutter SDK 所提供的丰富图形效果。着色器是用一种类似 Dart 的小型语言（称为 GLSL）编写、并在用户 GPU 上执行的程序。

Custom shaders are added to a Flutter project
by listing them in the `pubspec.yaml` file,
and obtained using the [`FragmentProgram`][] API.

通过在 `pubspec.yaml` 文件中列出自定义着色器可将其添加到 Flutter 项目，并使用 [`FragmentProgram`][] API 获取。

[`FragmentProgram`]: {{site.api}}/flutter/dart-ui/FragmentProgram-class.html

## Adding shaders to an application

## 向应用添加着色器

Shaders, in the form of GLSL files with the `.frag` extension,
must be declared in the `shaders` section of your project's `pubspec.yaml` file.
The Flutter command-line tool compiles the shader
to its appropriate backend format,
and generates its necessary runtime metadata.
The compiled shader is then included in the application just like an asset.

着色器以带 `.frag` 扩展名的 GLSL 文件形式，必须在项目 `pubspec.yaml` 文件的 `shaders` 部分声明。Flutter 命令行工具会将着色器编译为相应的后端格式，并生成所需的运行时元数据。编译后的着色器会像资源一样包含在应用中。

```yaml
flutter:
  shaders:
    - shaders/myshader.frag
```

When running in debug mode,
changes to a shader program trigger recompilation
and update the shader during hot reload or hot restart.

在 debug 模式下运行时，对着色器程序的更改会触发重新编译，并在热重载或热重启期间更新着色器。

Shaders from packages are added to a project
with `packages/$pkgname` prefixed to the shader program's name
(where `$pkgname` is the name of the package).

来自包的着色器通过在给色器程序名称前加上 `packages/$pkgname` 前缀添加到项目中（其中 `$pkgname` 是包名）。

### Loading shaders at runtime

### 在运行时加载着色器

To load a shader into a `FragmentProgram` object at runtime,
use the [`FragmentProgram.fromAsset`][] constructor.
The asset's name is the same as the path to the shader
given in the `pubspec.yaml` file.

要在运行时将着色器加载到 `FragmentProgram` 对象，请使用 [`FragmentProgram.fromAsset`][] 构造函数。资源名称与 `pubspec.yaml` 文件中给出的着色器路径相同。

[`FragmentProgram.fromAsset`]: {{site.api}}/flutter/dart-ui/FragmentProgram/fromAsset.html

```dart
void loadMyShader() async {
  var program = await FragmentProgram.fromAsset('shaders/myshader.frag');
}
```

The `FragmentProgram` object can be used to create
one or more [`FragmentShader`][] instances.
A `FragmentShader` object represents a fragment program
along with a particular set of _uniforms_ (configuration parameters).
The available uniforms depends on how the shader was defined.

`FragmentProgram` 对象可用于创建一个或多个 [`FragmentShader`][] 实例。`FragmentShader` 对象表示片段程序以及一组特定的 _uniforms_（配置参数）。可用的 uniforms 取决于着色器的定义方式。

[`FragmentShader`]: {{site.api}}/flutter/dart-ui/FragmentShader-class.html

```dart
void updateShader(Canvas canvas, Rect rect, FragmentProgram program) {
  var shader = program.fragmentShader();
  shader.setFloat(0, 42.0);
  canvas.drawRect(rect, Paint()..shader = shader);
}
```

### Canvas API

### Canvas API

Fragment shaders can be used with most Canvas APIs
by setting [`Paint.shader`][].
For example, when using [`Canvas.drawRect`][]
the shader is evaluated for all fragments within the rectangle.
For an API like [`Canvas.drawPath`][] with a stroked path,
the shader is evaluated for all fragments within the stroked line.
Some APIs, such as [`Canvas.drawImage`][], ignore the value of the shader.

片段着色器可通过设置 [`Paint.shader`][] 与大多数 Canvas API 一起使用。例如，使用 [`Canvas.drawRect`][] 时，着色器会对矩形内的所有片段求值。对于像 [`Canvas.drawPath`][] 这样绘制描边路径的 API，着色器会对描边线内的所有片段求值。某些 API（如 [`Canvas.drawImage`][]）会忽略着色器的值。

[`Canvas.drawImage`]:  {{site.api}}/flutter/dart-ui/Canvas/drawImage.html
[`Canvas.drawRect`]:   {{site.api}}/flutter/dart-ui/Canvas/drawRect.html
[`Canvas.drawPath`]:   {{site.api}}/flutter/dart-ui/Canvas/drawPath.html
[`Paint.shader`]:      {{site.api}}/flutter/dart-ui/Paint/shader.html

```dart
void paint(Canvas canvas, Size size, FragmentShader shader) {
  // Draws a rectangle with the shader used as a color source.
  canvas.drawRect(
    Rect.fromLTWH(0, 0, size.width, size.height),
    Paint()..shader = shader,
  );

  // Draws a stroked rectangle with the shader only applied to the fragments
  // that lie within the stroke.
  canvas.drawRect(
    Rect.fromLTWH(0, 0, size.width, size.height),
    Paint()
      ..style = PaintingStyle.stroke
      ..shader = shader,
  )
}

```

### ImageFilter API

### ImageFilter API

Fragment shaders can also be used with the [`ImageFilter`][] API.
This allows using custom fragment shaders with the
[`ImageFiltered`][] class or the [`BackdropFilter`][] class
to apply shaders to already rendered content.
[`ImageFilter`][] provides a constructor, [`ImageFilter.shader`][],
for creating an [`ImageFilter`][] with a custom fragment shader.

片段着色器也可与 [`ImageFilter`][] API 一起使用。这允许将自定义片段着色器与 [`ImageFiltered`][] 类或 [`BackdropFilter`][] 类配合，将着色器应用于已渲染的内容。[`ImageFilter`][] 提供构造函数 [`ImageFilter.shader`][]，用于创建带自定义片段着色器的 [`ImageFilter`][]。

:::warning
The `ImageFilter` API for custom shaders is only supported by the [Impeller][] backend.
Using it on other backends will throw an error.
:::

:::warning
用于自定义着色器的 `ImageFilter` API 仅由 [Impeller][] 后端支持。在其他后端上使用会抛出错误。
:::

```dart
Widget build(BuildContext context, FragmentShader shader) {
  return ClipRect(
    child: SizedBox(
      width: 300,
      height: 300,
      child: BackdropFilter(
        filter: ImageFilter.shader(shader),
        child: Container(
          color: Colors.transparent,
        ),
      ),
    ),
  );
}
```

When using [`ImageFilter`][] with [`BackdropFilter`][], a [`ClipRect`][] can be
used to limit the area that is affected by the [`ImageFilter`][]. Without a
[`ClipRect`][], the [`BackdropFilter`][] will be applied to the whole screen.

将 [`ImageFilter`][] 与 [`BackdropFilter`][] 一起使用时，可用 [`ClipRect`][] 限制受 [`ImageFilter`][] 影响的区域。没有 [`ClipRect`][] 时，[`BackdropFilter`][] 将应用于整个屏幕。

`ImageFilter` fragment shaders receive some uniforms automatically from the
engine. The `sampler2D` value at index 0 is set to the filter input image, and
the `float` values at indices 0 and 1 are set to the image's width and height.
Your shader must specify this constructor to accept these values (for example, a
`sampler2D` and a `vec2`), but you should not set them from your Dart code.

`ImageFilter` 片段着色器会从引擎自动接收一些 uniforms。索引 0 处的 `sampler2D` 值设为滤镜输入图像，索引 0 和 1 处的 `float` 值设为图像的宽度和高度。你的着色器必须指定此构造函数以接受这些值（例如 `sampler2D` 和 `vec2`），但你不应从 Dart 代码中设置它们。

When targeting OpenGLES the y-coordinates of the texture will be flipped so the
fragment shader should un-flip the UVs when sampling from textures provided by
the engine.

针对 OpenGLES 时，纹理的 y 坐标会翻转，因此片段着色器在从引擎提供的纹理采样时应取消翻转 UV。

```glsl
#version 460 core
#include <flutter/runtime_effect.glsl>

out vec4 fragColor;

// These uniforms are automatically set by the engine.
uniform vec2 u_size;
uniform sampler2D u_texture;

void main() {
  vec2 uv = FlutterFragCoord().xy / u_size;
#ifdef IMPELLER_TARGET_OPENGLES
  // When sampling from u_texture on OpenGLES the y-coordinates will be flipped.
  uv.y = 1.0 - uv.y;
#endif
  vec4 color = texture(u_texture, uv);
  float gray = dot(color.rgb, vec3(0.299, 0.587, 0.114));
  fragColor = vec4(vec3(gray), color.a);
}
```

[`ImageFilter`]: {{site.api}}/flutter/dart-ui/ImageFilter-class.html
[`ImageFiltered`]: {{site.api}}/flutter/widgets/ImageFiltered-class.html
[`BackdropFilter`]: {{site.api}}/flutter/widgets/BackdropFilter-class.html
[`ImageFilter.shader`]: {{site.api}}/flutter/dart-ui/ImageFilter/ImageFilter.shader.html
[`ClipRect`]: {{site.api}}/flutter/widgets/ClipRect-class.html

## Authoring shaders

## 编写着色器

Fragment shaders are authored as GLSL source files.
By convention, these files have the `.frag` extension.
(Flutter doesn't support vertex shaders,
which would have the `.vert` extension.)

片段着色器以 GLSL 源文件编写。按惯例，这些文件使用 `.frag` 扩展名。（Flutter 不支持顶点着色器，顶点着色器会使用 `.vert` 扩展名。）

Any GLSL version from 460 down to 100 is supported,
though some available features are restricted.
The rest of the examples in this document use version `460 core`.

支持 GLSL 版本 460 至 100，但部分可用功能受限。本文档其余示例使用 `460 core` 版本。

Shaders are subject to the following limitations
when used with Flutter:

在 Flutter 中使用着色器时受以下限制：

* UBOs and SSBOs aren't supported

  不支持 UBO 和 SSBO

* `sampler2D` is the only supported sampler type

  `sampler2D` 是唯一支持的采样器类型

* Only the two-argument version of `texture` (sampler and uv) is supported

  仅支持 `texture` 的两参数版本（采样器和 uv）

* No additional varying inputs can be declared

  不能声明额外的 varying 输入

* All precision hints are ignored when targeting Skia

  针对 Skia 时，所有精度提示都会被忽略

* Unsigned integers and booleans aren't supported

  不支持无符号整数和布尔值

### Uniforms

### Uniforms

A fragment program can be configured by defining
`uniform` values in the GLSL shader source
and then setting these values in Dart for
each fragment shader instance.

可通过在 GLSL 着色器源中定义 `uniform` 值，然后为每个片段着色器实例在 Dart 中设置这些值来配置片段程序。

Floating point uniforms with the GLSL types `float`, `vec2`, `vec3`, and `vec4`
are set using the [`FragmentShader.setFloat`][] or
[`FragmentShader.getUniformFloat`][] method. GLSL sampler values, which use the
`sampler2D` type, are set using the [`FragmentShader.setImageSampler`][] or
[`FragmentShader.getImageSampler`][] method.

GLSL 类型为 `float`、`vec2`、`vec3` 和 `vec4` 的浮点 uniform 使用 [`FragmentShader.setFloat`][] 或 [`FragmentShader.getUniformFloat`][] 方法设置。使用 `sampler2D` 类型的 GLSL 采样器值使用 [`FragmentShader.setImageSampler`][] 或 [`FragmentShader.getImageSampler`][] 方法设置。

The correct index for each `uniform` value is determined by the order that the
uniform values are defined in the fragment program. For data types composed of
multiple floats, such as a `vec4`, you must call [`FragmentShader.setFloat`][]
or [`UniformFloatSlot.set`][] once for each value.

每个 `uniform` 值的正确索引由片段程序中 uniform 值的定义顺序决定。对于由多个 float 组成的数据类型（如 `vec4`），你必须为每个值调用一次 [`FragmentShader.setFloat`][] 或 [`UniformFloatSlot.set`][]。

[`FragmentShader.setFloat`]: {{site.api}}/flutter/dart-ui/FragmentShader/setFloat.html
[`UniformFloatSlot.set`]: {{site.api}}/flutter/dart-ui/UniformFloatSlot/set.html
[`FragmentShader.getUniformFloat`]: {{site.api}}/flutter/dart-ui/FragmentShader/getUniformFloat.html
[`FragmentShader.setImageSampler`]: {{site.api}}/flutter/dart-ui/FragmentShader/setImageSampler.html
[`FragmentShader.getImageSampler`]: {{site.api}}/flutter/dart-ui/FragmentShader/getImageSampler.html

For example, given the following uniforms declarations in a GLSL fragment program:

例如，给定 GLSL 片段程序中的以下 uniform 声明：

```glsl
uniform float uScale;
uniform sampler2D uTexture;
uniform vec2 uMagnitude;
uniform vec4 uColor;
```

The corresponding Dart code to initialize these `uniform` values is as follows:

初始化这些 `uniform` 值的对应 Dart 代码如下：

```dart
class Foobar {
  late final UniformFloatSlot _scale;
  late final List<UniformFloatSlot> _magnitude;
  late final List<UniformFloatSlot> _color;
  late final ImageSamplerSlot _texture;

  void setUp(FragmentShader shader) {
    _scale = shader.getUniformFloat('uScale');
    _magnitude = List<UniformFloatSlot>.generate(2, (int index) {
      return shader.getUniformFloat('uMagnitude', index);
    });    
    _color = List<UniformFloatSlot>.generate(4, (int index) {
      return shader.getUniformFloat('uColor', index);
    });
    _texture = shader.getImageSampler('uTexture');
  }

  void update(Color color, Image image) {
    _scale.set(23);
    _magnitude[0].set(114);
    _magnitude[1].set(83);
    _color[0].set(color.r * color.a);
    _color[1].set(color.g * color.a);
    _color[2].set(color.b * color.a);
    _color[3].set(color.a);
    _texture.set(image);
  }
}
 ```

When using [`FragmentShader.setFloat`][] note that the indices do not count the
`sampler2D` uniform. This uniform is set separately with
[`FragmentShader.setImageSampler`][], with the index starting over at 0.

使用 [`FragmentShader.setFloat`][] 时注意，索引不计入 `sampler2D` uniform。该 uniform 使用 [`FragmentShader.setImageSampler`][] 单独设置，索引从 0 重新开始。

Any float uniforms that are left uninitialized will default to `0.0`.

任何未初始化的 float uniform 默认为 `0.0`。

The reflection data generated by the Flutter's shader compiler can be audited
with the following commands in order to see things like uniform offsets.

可以使用以下命令审计 Flutter 着色器编译器生成的反射数据，以查看 uniform 偏移等信息。

```shell
cd $FLUTTER
# Generate the .sl file.
`find bin/ -name impellerc` \
  --runtime-stage-metal \
  --iplr \
  --input=path/to/myshader.frag \
  --sl=foo.sl \
  --spirv=foo.spirv \
  --include=engine/src/flutter/impeller/compiler/shader_lib/ \
  --input-type=frag
# Convert the .sl file to .json
flatc \
  --json \
  ./engine/src/flutter/impeller/runtime_stage/runtime_stage.fbs \
  -- ./foo.sl
# View results
cat foo.json
```

#### Current position

#### 当前位置

The shader has access to a `varying` value that contains the local coordinates for
the particular fragment being evaluated. Use this feature to compute
effects that depend on the current position, which can be accessed by
importing the `flutter/runtime_effect.glsl` library and calling the
`FlutterFragCoord` function. For example:

着色器可访问包含当前被求值片段的局部坐标的 `varying` 值。使用此功能可计算依赖当前位置的效果，可通过导入 `flutter/runtime_effect.glsl` 库并调用 `FlutterFragCoord` 函数访问。例如：

```glsl
#include <flutter/runtime_effect.glsl>

void main() {
  vec2 currentPos = FlutterFragCoord().xy;
}
```

The value returned from `FlutterFragCoord` is distinct from `gl_FragCoord`.
`gl_FragCoord` provides the screen space coordinates and should generally be
avoided to ensure that shaders are consistent across backends. When targeting a
Skia backend, the calls to `gl_FragCoord` are rewritten to access local
coordinates but this rewriting isn't possible with Impeller.

`FlutterFragCoord` 返回的值与 `gl_FragCoord` 不同。`gl_FragCoord` 提供屏幕空间坐标，通常应避免使用，以确保着色器在各后端间一致。针对 Skia 后端时，对 `gl_FragCoord` 的调用会重写为访问局部坐标，但 Impeller 无法进行此重写。

#### Colors

#### 颜色

There isn't a built-in data type for colors. Instead they are commonly
represented as a `vec4` with each component corresponding to one of the RGBA
color channels.

没有用于颜色的内置数据类型。通常用 `vec4` 表示，每个分量对应 RGBA 颜色通道之一。

The single output `fragColor` expects that the color value is normalized to be
in the range of `0.0` to `1.0` and that it has premultiplied alpha. This is
different than typical Flutter colors which use a `0-255` value encoding and
have unpremultipled alpha.

单一输出 `fragColor` 要求颜色值归一化到 `0.0` 至 `1.0` 范围，并具有预乘 alpha。这与典型的 Flutter 颜色不同，后者使用 `0-255` 值编码且具有非预乘 alpha。

#### Samplers

#### 采样器

A sampler provides access to a `dart:ui` `Image` object. This image can be
acquired either from a decoded image or from part of the application using
[`Scene.toImageSync`][] or [`Picture.toImageSync`][].

采样器提供对 `dart:ui` `Image` 对象的访问。该图像可从解码后的图像获取，或使用 [`Scene.toImageSync`][] 或 [`Picture.toImageSync`][] 从应用的一部分获取。

[`Picture.toImageSync`]: {{site.api}}/flutter/dart-ui/Picture/toImageSync.html
[`Scene.toImageSync`]: {{site.api}}/flutter/dart-ui/Scene/toImageSync.html

##### Sampler usage in GLSL example

##### GLSL 中的采样器用法示例

```glsl
#include <flutter/runtime_effect.glsl>

uniform vec2 uSize;
uniform sampler2D uTexture;

out vec4 fragColor;

void main() {
  vec2 uv = FlutterFragCoord().xy / uSize;
  fragColor = texture(uTexture, uv);
}
```

By default, the image uses [`TileMode.clamp`][] to determine how values outside
of the range of `[0, 1]` behave. Customization of the tile mode is not supported
and needs to be emulated in the shader.

默认情况下，图像使用 [`TileMode.clamp`][] 确定超出 `[0, 1]` 范围的值的行为。不支持自定义平铺模式，需要在着色器中模拟。

[`TileMode.clamp`]: {{site.api}}/flutter/dart-ui/TileMode.html

##### `toImageSync` example

##### `toImageSync` 示例

```dart
class SDFPainter {
  SDFPainter(this.sdfShader, this.renderShader);

  FragmentShader sdfShader;
  FragmentShader renderShader;
  Image? _sdf;
  bool isDirty = false;
  double radius = 0.5;

  void paint(Canvas canvas, Size size) {
    if (_sdf == null || isDirty) {
      final recorder = PictureRecorder();
      final subCanvas = Canvas(recorder);
      final paint = Paint()..shader = sdfShader;
      sdfShader.setFloat(0, size.width);
      sdfShader.setFloat(1, size.height);
      sdfShader.setFloat(2, radius);
      subCanvas.drawRect(Rect.fromLTWH(0, 0, size.width, size.height), paint);
      final picture = recorder.endRecording();
      _sdf = picture.toImageSync(size.width.toInt(), size.height.toInt());
      isDirty = false;
    }

    renderShader.setFloat(0, size.width);
    renderShader.setFloat(1, size.height);
    renderShader.setImageSampler(0, _sdf!);

    canvas.drawRect(
      Rect.fromLTWH(0, 0, size.width, size.height),
      Paint()..shader = renderShader,
    );
  }
}
```

## Performance considerations

## 性能注意事项

When targeting the Skia backend, loading the shader might be expensive since it
must be compiled to the appropriate platform-specific shader at runtime. If you
intend to use one or more shaders during an animation, consider precaching the
fragment program objects before starting the animation.

针对 Skia 后端时，加载着色器可能开销较大，因为必须在运行时将着色器编译为相应的平台特定着色器。如果你打算在动画期间使用一个或多个着色器，考虑在动画开始前预缓存片段程序对象。

You can reuse a `FragmentShader` object across frames; this is more efficient
than creating a new `FragmentShader` for each frame.

你可以跨帧复用 `FragmentShader` 对象；这比每帧创建新的 `FragmentShader` 更高效。

For a more detailed guide on writing performant shaders,
check out [Writing efficient shaders][] on GitHub.

有关编写高性能着色器的更详细指南，请查看 GitHub 上的 [Writing efficient shaders][]。

[Writing efficient shaders]: {{site.repo.flutter}}/blob/main/docs/engine/impeller/docs/shader_optimization.md

## Other resources

## 其他资源

For more information, here are a few resources.

更多信息请参阅以下资源。

* [The Book of Shaders][] by Patricio Gonzalez Vivo and Jen Lowe

  Patricio Gonzalez Vivo 和 Jen Lowe 撰写的 [The Book of Shaders][]

* [Shader toy][], a collaborative shader playground

  [Shader toy][]，协作式着色器游乐场

* [`simple_shader`][], a simple Flutter fragment shaders sample project

  [`simple_shader`][]，简单的 Flutter 片段着色器示例项目

* [`flutter_shaders`][], a package that simplifies using fragment shaders in
  Flutter

  [`flutter_shaders`][]，简化在 Flutter 中使用片段着色器的包

[Shader toy]: https://www.shadertoy.com/
[The Book of Shaders]: https://thebookofshaders.com/
[`simple_shader`]: {{site.repo.samples}}/tree/main/simple_shader
[`flutter_shaders`]: {{site.pub}}/packages/flutter_shaders
