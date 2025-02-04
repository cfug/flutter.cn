---
# title: Deferred components
title: 延迟加载组件
# description: How to create deferred components for improved download performance.
description: 如何使用延迟组件来提高下载性能
---

<?code-excerpt path-base="perf/deferred_components"?>

## Introduction

## 简介

Flutter has the capability to build apps that can
download additional Dart code and assets at runtime.
This allows apps to reduce install apk size and download
features and assets when needed by the user.

Flutter 支持构建在运行时下载额外 Dart 代码和静态资源的应用程序。
这可以减少安装应用程序 apk 的大小，并在用户需要时下载功能和静态资源。

We refer to each uniquely downloadable bundle of Dart
libraries and assets as a "deferred component".
To load these components, use [Dart's deferred imports][dart-def-import].
They can be compiled into split AOT and JavaScript shared libraries.

我们将每个独立的可下载的 Dart 库和静态资源称为「延迟组件」。
请使用 [Dart 的延迟导入][dart-def-import] 加载这些组件。
这些组件可以编译到拆分的 AOT 和 JavaScript 共享库中。

:::note

Flutter supports deferred, or "lazy", loading on Android and the web.
The implementations differ.
Android's [dynamic feature modules][] deliver the
deferred components packaged as Android modules.
The web creates these components as separate `*.js` files.
Deferred code doesn't impact other platforms,
which continue to build as normal with all deferred
components and assets included at initial install time.

Flutter 在 Android 和 Web 上支持延迟加载或「懒」加载。
在不同平台实现方式有所不同。
Android 平台的 [动态功能模块][dynamic feature modules] 
提供打包为 Android module 的延迟组件。
Web 平台将这些组件创建为单独的 `*.js` 文件。
延迟组件中的代码不会影响其他平台，
其他平台在初始安装时会正常构建包含所有延迟组件和资源的应用。

:::

Though you can defer loading modules,
you must build the entire app and upload that app as a single
[Android App Bundle][android-app-bundle] (`*.aab`).
Flutter doesn't support dispatching partial updates without re-uploading
new Android App Bundles for the entire application.

尽管模块可以延迟加载 module，
但整个应用程序必须作为单个 [Android App Bundle][android-app-bundle] (`*.aab`) 
完全构建和上传。
不支持在没有重新上传整个新 Android App Bundle 的情况下发送部分更新。

Flutter performs deferred loading when you compile your app
in [release or profile mode][].
Debug mode treats all deferred components as regular imports.
The components are present at launch and load immediately.
This allows debug builds to hot reload.

在 [Release 或 Profile 模式][release or profile mode] 
下编译应用程序时，
Flutter 会执行延迟加载。
在 Debug 模式下，所有延迟组件都被视为常规导入，
它们在启动时立即加载。
因此，Debug 模式下仍然可以热重载。

For a deeper dive into the technical details of
how this feature works, see [Deferred Components][]
on the [Flutter wiki][].

关于此功能的技术细节，请查看 [Flutter wiki][] 上的 [延迟加载组件][Deferred Components]。

## How to set your project up for deferred components

## 如何让项目支持延迟加载组件

The following instructions explain how to set up your
Android app for deferred loading.

下面的引导将介绍如何设置 Android 应用程序以支持延迟加载。

### Step 1: Dependencies and initial project setup

### 步骤 1：依赖项和初始项目设置

<ol>
<li>

Add Play Core to the Android app's
build.gradle dependencies.
In `android/app/build.gradle` add the following:

将 Play Core 添加到 Android 应用程序的 build.gradle 依赖项中。
在 `android/app/build.gradle` 中添加以下内容：

```groovy
...
dependencies {
  ...
  implementation "com.google.android.play:core:1.8.0"
  ...
}
```
</li>

<li>

If using the Google Play Store as the
distribution model for dynamic features,
the app must support `SplitCompat` and provide an instance
of a `PlayStoreDeferredComponentManager`.
Both of these tasks can be accomplished by setting
the `android:name` property on the application in
`android/app/src/main/AndroidManifest.xml` to
`io.flutter.embedding.android.FlutterPlayStoreSplitApplication`:

如果使用 Google Play 商店作为动态功能的分发模型，
应用程序必须支持 `SplitCompat` 并手动提供 `PlayStoreDeferredComponentManager` 的实例。
这两个任务都可以通过设置 `android/app/src/main/AndroidManifest.xml` 中的 `android:name` 为
`io.flutter.embedding.android.FlutterPlayStoreSplitApplication` 应用属性来完成：

```xml
<manifest ...
  <application
     android:name="io.flutter.embedding.android.FlutterPlayStoreSplitApplication"
        ...
  </application>
</manifest>
```

`io.flutter.app.FlutterPlayStoreSplitApplication` handles
both of these tasks for you. If you use
`FlutterPlayStoreSplitApplication`,
you can skip to step 1.3.

`io.flutter.app.FlutterPlayStoreSplitApplication` 已经为你完成了这两项任务。
如果你使用了 `FlutterPlayStoreSplitApplication`，可以跳转至步骤 1.3。

If your Android application
is large or complex, you might want to separately support
`SplitCompat` and provide the
`PlayStoreDynamicFeatureManager` manually.

如果你的 Android 应用程序很大或很复杂，
你可能需要单独支持 `SplitCompat` 并提供 `PlayStoreDynamicFeatureManager`。

To support `SplitCompat`, there are three methods
(as detailed in the [Android docs][]), any of which are valid:

要支持 `SplitCompat`，有三种方法（详见 [Android docs][]），其中任何一种都是有效的：

<ul>
<li>

Make your application class extend `SplitCompatApplication`:

让你的 application 类继承 `SplitCompatApplication`：

```java
public class MyApplication extends SplitCompatApplication {
    ...
}
```

</li>

<li>

Call `SplitCompat.install(this);`
in the `attachBaseContext()` method:

在 `attachBaseContext()` 中调用 `SplitCompat.install(this);`：

```java
@Override
protected void attachBaseContext(Context base) {
    super.attachBaseContext(base);
    // Emulates installation of future on demand modules using SplitCompat.
    SplitCompat.install(this);
}
```

</li>

<li>

Declare `SplitCompatApplication` as the application
subclass and add the Flutter compatibility code from
`FlutterApplication` to your application class:

将 `SplitCompatApplication` 声明为 application 的子类，
并将 `FlutterApplication` 中的 Flutter 兼容性代码添加到你的 application 类中：

```xml
<application
    ...
    android:name="com.google.android.play.core.splitcompat.SplitCompatApplication">
</application>
```

</li>
</ul>

The embedder relies on an injected
`DeferredComponentManager` instance to handle
install requests for deferred components.
Provide a `PlayStoreDeferredComponentManager` into
the Flutter embedder by adding the following code
to your app initialization:

嵌入层依赖注入的 `DeferredComponentManager` 实例来处理延迟组件的安装请求。
通过在应用程序的初始流程中添加以下代码，将 `PlayStoreDeferredComponentManager` 添加到 Flutter 嵌入层中：

```java
import io.flutter.embedding.engine.dynamicfeatures.PlayStoreDeferredComponentManager;
import io.flutter.FlutterInjector;
... 
PlayStoreDeferredComponentManager deferredComponentManager = new
  PlayStoreDeferredComponentManager(this, null);
FlutterInjector.setInstance(new FlutterInjector.Builder()
    .setDeferredComponentManager(deferredComponentManager).build());
```

</li>
    
<li>

Opt into deferred components by adding
the `deferred-components` entry to the app's `pubspec.yaml`
under the `flutter` entry:

通过将 `deferred-components` 依赖添加到
应用程序的 `pubspec.yaml` 中的 `flutter` 下，并选择延迟组件：

```yaml
...
flutter:
  ...
  deferred-components:
  ...
```

The `flutter` tool looks for the `deferred-components`
entry in the `pubspec.yaml` to determine whether the
app should be built as deferred or not.
This can be left empty for now unless you already
know the components desired and the Dart deferred libraries
that go into each. You will fill in this section later
in [step 3.3][] once `gen_snapshot` produces the loading units.

`flutter` 工具会在 `pubspec.yaml` 中查找 `deferred-components`，
来确定是否应将应用程序构建为延迟加载。
除非你已经知道所需的组件和每个组件中的 Dart 延迟库，否则可以暂时将其留空。
当 `gen_snapshot` 生成加载单元后，你可以在后面的 [步骤 3.3][step 3.3] 中完善这部分内容。
  
</li>
</ol>

### Step 2: Implementing deferred Dart libraries

### 步骤 2：实现延迟加载的 Dart 库

Next, implement deferred loaded Dart libraries in your
app's Dart code. The implementation does not need
to be feature complete yet. The example in the
rest of this page adds a new simple deferred widget
as a placeholder. You can also convert existing code
to be deferred by modifying the imports and
guarding usages of deferred code behind `loadLibrary()`
`Futures`.

接下来，在 Dart 代码中实现延迟加载的 Dart 库。实现并非立刻需要的功能。
文章剩余部分中的示例添加了一个简单的延迟 widget 作为占位。
你还可以通过修改 `loadLibrary()` 和 `Futures` 后面的延迟加载代码的导入和保护用法，将现有代码转换为延迟代码。

<ol>
<li>

Create a new Dart library.
For example, create a new `DeferredBox` widget that
can be downloaded at runtime.
This widget can be of any complexity but,
for the purposes of this guide,
create a simple box as a stand-in.
To create a simple blue box widget,
create `box.dart` with the following contents:

创建一个新的 Dart 库。
例如，创建一个可以在运行时下载的 `DeferredBox` widget。
这个 widget 可以是任意复杂的，
本指南在 `box.dart` 中使用以下内容创建了一个简单的蓝色方框：
    
<?code-excerpt "lib/box.dart"?>
```dart title="box.dart"
import 'package:flutter/material.dart';

/// A simple blue 30x30 box.
class DeferredBox extends StatelessWidget {
  const DeferredBox({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      height: 30,
      width: 30,
      color: Colors.blue,
    );
  }
}
```

</li>

<li>

Import the new Dart library
with the `deferred` keyword in your app and
call `loadLibrary()` (see [lazily loading a library][]).
The following example uses `FutureBuilder`
to wait for the `loadLibrary` `Future` (created in
`initState`) to complete and display a
`CircularProgressIndicator` as a placeholder.
When the `Future` completes, it returns the `DeferredBox` widget.
`SomeWidget` can then be used in the app as normal and
won't ever attempt to access the deferred Dart code until
it has successfully loaded.

在应用中使用 `deferred` 关键字导入新的 Dart 库，
并调用 `loadLibrary()`（请参见 [延迟加载库][lazily loading a library]）。
下面的示例使用 `FutureBuilder` 等待 `loadLibrary` 的 `Future` 对象（在 `initState` 中创建）完成，
并将 `CircularProgressIndicator` 做为占位。
当 `Future` 完成时，会返回 `DeferredBox`。
`SomeWidget` 便可在应用程序中正常使用，在成功加载之前不会尝试访问延迟的 Dart 代码。
    
<?code-excerpt "lib/use_deferred_box.dart"?>
```dart
import 'package:flutter/material.dart';
import 'box.dart' deferred as box;

class SomeWidget extends StatefulWidget {
  const SomeWidget({super.key});

  @override
  State<SomeWidget> createState() => _SomeWidgetState();
}

class _SomeWidgetState extends State<SomeWidget> {
  late Future<void> _libraryFuture;

  @override
  void initState() {
    super.initState();
    _libraryFuture = box.loadLibrary();
  }

  @override
  Widget build(BuildContext context) {
    return FutureBuilder<void>(
      future: _libraryFuture,
      builder: (context, snapshot) {
        if (snapshot.connectionState == ConnectionState.done) {
          if (snapshot.hasError) {
            return Text('Error: ${snapshot.error}');
          }
          return box.DeferredBox();
        }
        return const CircularProgressIndicator();
      },
    );
  }
}
```

The `loadLibrary()` function returns a `Future<void>`
that completes successfully when the code in the library
is available for use and completes with an error otherwise.
All usage of symbols from the deferred library should be
guarded behind a completed `loadLibrary()` call. All imports
of the library must be marked as `deferred` for it to be
compiled appropriately to be used in a deferred component.
If a component has already been loaded, additional calls
to `loadLibrary()` complete quickly (but not synchronously).
The `loadLibrary()` function can also be called early to
trigger a pre-load to help mask the loading time.

`loadLibrary()` 函数返回一个 `Future<void>` 对象，
该对象会在延迟库中的代码可用时成功返回，否则返回一个错误。
延迟库中所有的符号在使用之前都应确保 `loadLibrary()` 已经完成。
所有导入的库都必须通过 `deferred` 标记，以便对其进行适当的编译以及在延迟组件中使用。
如果组件已经被加载，再次调用 `loadLibrary` 将快速返回（但不是同步完成）。
也可以提前调用 `loadLibrary()` 函数进行预加载，以帮助屏蔽加载时间。

You can find another example of deferred import loading in
[Flutter Gallery's `lib/deferred_widget.dart`][].

你可以在
[Flutter Gallery 的 `lib/deferred_widget.dart` 文件][Flutter Gallery's `lib/deferred_widget.dart`]
中找到其他延迟加载组件的示例。

</li>
</ol>

### Step 3: Building the app

### 步骤 3：构建应用程序

Use the following `flutter` command to build a
deferred components app:

使用以下 `flutter` 命令构建延迟组件应用：

```console
$ flutter build appbundle
```

This command assists you by validating that your project
is properly set up to build deferred components apps.
By default, the build fails if the validator detects
any issues and guides you through suggested changes to fix them.

此命令会帮助你检查项目是否正确设置为构建延迟组件应用。
默认情况下，验证程序检测到任何问题都会导致构建失败，你可以通过系统建议的更改来修复这些问题。

:::note

You can opt out of building deferred components
with the `--no-deferred-components` flag.
This flag causes all assets defined under
deferred components to be treated as if they were
defined under the assets section of `pubspec.yaml`.
All Dart code is compiled into a single shared library
and `loadLibrary()` calls complete in the next event
loop boundary (as soon as possible while being asynchronous).
This flag is also equivalent to omitting the `deferred-components:`
entry in `pubspec.yaml`.

你可以使用 `--no-deferred-components` 标志禁用构建延迟组件。
这个标志会让 `pubspec.yaml` 中定义的所有延迟组件，被视为定义在 assets 部分的普通组件。
所有 Dart 代码会被编译到一个共享库中，`loadLibrary()` 调用会在下一个事件循环中完成（异步时尽快完成）。
此标志也等效于移除 `pubspec.yaml` 中的 `deferred-components:`。

:::

<ol>
<li><a id="step-3.1"></a>

The `flutter build appbundle` command
runs the validator and attempts to build the app with
`gen_snapshot` instructed to produce split AOT shared libraries
as separate `.so` files. On the first run, the validator will
likely fail as it detects issues; the tool makes
recommendations for how to set up the project and fix these issues.

`flutter build appbundle` 命令会尝试构建应用，
通过 `gen_snapshot` 将应用中拆分的 AOT 共享库分割为单独的 `.so` 文件。
第一次运行时，验证程序可能会在检测到问题时失败，
该工具会为如何设置项目和解决这些问题提供建议。
    
The validator is split into two sections: prebuild
and post-gen_snapshot validation. This is because any
validation referencing loading units cannot be performed
until `gen_snapshot` completes and produces a final set
of loading units.

验证程序分为两个部分：预构建和生成快照后的验证。
这是因为在 `gen_snapshot` 完成并生成最后一组加载单元之前，无法执行任何引用加载单元的验证。

:::note

You can opt to have the tool attempt to build your
app without the validator by passing the
`--no-validate-deferred-components` flag.
This can result in unexpected and confusing
instructions to resolve failures.
This flag is meant to be used in
custom implementations that do not rely on the default
Play-store-based implementation that the validator checks for.

你可以通过 `--no-validate-deferred-components` 标志，来让工具尝试在不执行验证程序下构建应用。
这可能导致由意外和错误的指令而引起的故障。
此标志应当仅在不需要依赖验证程序检查的默认 Play-store-based 的自定义实现时使用。

:::

The validator detects any new, changed, or removed
loading units generated by `gen_snapshot`.
The current generated loading units are tracked in your
`<projectDirectory>/deferred_components_loading_units.yaml` file.
This file should be checked into source control to ensure that
changes to the loading units by other developers can be caught.

验证程序会检测 `gen_snapshot` 生成的所有新增、修改或者删除的加载单元。
当前生成的加载单元记录在 `<projectDirectory>/deferred_components_loading_units.yaml` 文件中。
这个文件应该加入到版本管理中，以确保其他开发人员对加载单元所做的更改可被追踪。

The validator also checks for the following in the
`android` directory:

验证程序还会检查 `android` 目录中的以下内容：

<ul>
<li>

**`<projectDir>/android/app/src/main/res/values/strings.xml`**<br>
An entry for every deferred component mapping the key
`${componentName}Name` to `${componentName}`.
This string resource is used by the `AndroidManifest.xml`
of each feature module to define the `dist:title property`.
For example:

**`<projectDir>/android/app/src/main/res/values/strings.xml`**<br>
每个延迟组件名称的键值对映射 `${componentName}Name`：`${componentName}`。
每个功能模块的 `AndroidManifest.xml` 使用此字符串资源来定义 `dist:title property`。
例如：

```xml
<?xml version="1.0" encoding="utf-8"?>
<resources>
  ...
  <string name="boxComponentName">boxComponent</string>
</resources>
```

</li>

<li>

**`<projectDir>/android/<componentName>`**<br>
An Android dynamic feature module for
each deferred component exists and contains a `build.gradle`
and `src/main/AndroidManifest.xml` file.
This only checks for existence and does not validate
the contents of these files. If a file does not exist,
it generates a default recommended one.

**`<projectDir>/android/<componentName>`**<br>
每个延迟组件都有一个 Android 动态功能模块，
它包含一个 `build.gradle` 和 `src/main/AndroidManifest.xml` 文件。
验证程序只检查文件是否存在，不验证文件内容。
如果文件不存在，它将生成一个默认的推荐文件。
    
</li>

<li>

**`<projectDir>/android/app/src/main/res/values/AndroidManifest.xml`**<br>
Contains a meta-data entry that encodes
the mapping between loading units and component name the
loading unit is associated with. This mapping is used by the
embedder to convert Dart's internal loading unit id
to the name of a deferred component to install. For example:

**`<projectDir>/android/app/src/main/res/values/AndroidManifest.xml`**<br>
包含一个 meta-data 键值对，
对加载单元与其关联的组件名称之间的映射进行编码。
嵌入程序使用此映射将 Dart 的内部加载单元 id 转换为要安装的延迟组件的名称。
例如：
    
```xml
...
<application
    android:label="MyApp"
    android:name="io.flutter.app.FlutterPlayStoreSplitApplication"
    android:icon="@mipmap/ic_launcher">
    ...
    <meta-data android:name="io.flutter.embedding.engine.deferredcomponents.DeferredComponentManager.loadingUnitMapping" android:value="2:boxComponent"/>
</application>
...
```

</li>
</ul>

The `gen_snapshot` validator won't run until the prebuild
validator passes.

`gen_snapshot` 验证程序在预构建验证通过之前不会运行。

</li>

<li>

For each of these checks,
the tool produces the modified or new files
needed to pass the check.
These files are placed in the
`<projectDir>/build/android_deferred_components_setup_files` directory.
It is recommended that the changes be applied by
copying and overwriting the same files in the
project's `android` directory. Before overwriting,
the current project state should be committed to
source control and the recommended changes should be
reviewed to be appropriate. The tool won't make any
changes to your `android/` directory automatically.

对于每个检查，该工具会创建或者修改需要的文件。
这些文件放在 `<projectDir>/build/android_deferred_components_setup_files` 目录下。
建议通过复制和覆盖项目 `android` 目录中的相同文件来应用更改。
在覆盖之前，当前的项目状态应该被提交到源代码管理中，并检查建议的改动。
该工具不会自动更改 `android` 目录。

</li>

<li><a id="step-3.3"></a>

Once the available
loading units are generated and logged in
`<projectDirectory>/deferred_components_loading_units.yaml`,
it is possible to fully configure the pubspec's
`deferred-components` section so that the loading units
are assigned to deferred components as desired.
To continue with the box example, the generated
`deferred_components_loading_units.yaml` file would contain:

一旦生成可用的加载单元并将其记录到 `<projectDirectory>deferred_components_loading_units.yaml` 中，
便可完善 pubspec 的 `deferred-components` 配置，将加载单元分配给延迟的组件。
在上面的案例中，生成的 `deferred_components_loading_units.yaml` 文件将包含：
    
```yaml
loading-units:
  - id: 2
    libraries:
      - package:MyAppName/box.Dart
```

The loading unit id ('2' in this case) is used
internally by Dart, and can be ignored.
The base loading unit (id '1') is not listed
and contains everything not explicitly contained
in another loading unit.

加载单元 id（在本例中为「2」）由 Dart 内部使用，可以忽略。
基本加载单元（id 为「1」）包含了其他加载单元中未显式列出的所有内容，在这里没有列出。

You can now add the following to `pubspec.yaml`:

现在可以将以下内容添加到 `pubspec.yaml` 中：

```yaml
...
flutter:
  ...
  deferred-components:
    - name: boxComponent
      libraries:
        - package:MyAppName/box.Dart
  ...
```

To assign a loading unit to a deferred component,
add any Dart lib in the loading unit into the
libraries section of the feature module.
Keep the following guidelines in mind:

将加载单元分配到延迟组件，把加载单元中的任何 Dart 库添加到功能模块的 libraries 部分。
请记住以下准则：

<ul>
<li>

Loading units should not be included
in more than one component.

一个加载单元只能包含在一个延迟组件中

</li>
<li>

Including one Dart library from a
loading unit indicates that the entire loading
unit is assigned to the deferred component.

引用加载单元中的一个 Dart 库意味着整个加载单元都被包含在延迟组件中。

</li>
<li>

All loading units not assigned to
a deferred component are included in the base component,
which always exists implicitly.

所有未被分配给延迟组件的加载单元都包含在基本组件中，基本组件始终隐式存在。

</li>
<li>

Loading units assigned to the same
deferred component are downloaded, installed,
and shipped together.

分配给同一延迟组件的加载单元将一起下载、安装和运行。

</li>
<li>

The base component is implicit and
need not be defined in the pubspec.
    
基本组件是隐式的，不需要在 pubspec 中定义。

</li>
</ul>
</li>

<li>

Assets can also be included by adding
an assets section in the deferred component configuration:

静态资源也可以通过在延迟组件中配置 assets 进行添加：
    
```yaml
  deferred-components:
    - name: boxComponent
      libraries:
        - package:MyAppName/box.Dart
      assets:
        - assets/image.jpg
        - assets/picture.png
          # wildcard directory
        - assets/gallery/
```

An asset can be included in multiple deferred components,
but installing both components results in a replicated asset.
Assets-only components can also be defined by omitting the
libraries section. These assets-only components must be
installed with the [`DeferredComponent`][] utility class in
services rather than `loadLibrary()`.
Since Dart libs are packaged together with assets,
if a Dart library is loaded with `loadLibrary()`,
any assets in the component are loaded as well.
However, installing by component name and the services utility
won't load any dart libraries in the component.

一个静态资源可以包含在多个延迟组件中，但是安装这两个组件会导致资源的重复。
也可以通过省略 libraries 来定义纯静态资源的延迟组件。
这些静态资源的组件必须与服务中的 [`DeferredComponent`][] 实用程序类一起安装，而不是 `loadLibrary()`。
由于 Dart 库是与静态资源打包在一起的，因此如果用 `loadLibrary()` 加载 Dart 库，则也会加载组件中的所有资源。
但是，按组件名称和服务实用程序来安装不会加载组件中的任何 Dart 库。

You are free to include assets in any component,
as long as they are installed and loaded when they
are first referenced, though typically,
assets and the Dart code that uses those assets
are best packed in the same component.

你可以自由选择将资源包含在任何组件中，只要它们是在首次引用时安装和加载的，
但通常情况下，静态资源和使用这些资源的 Dart 代码最好打包在同一组件中。

</li>

<li>

Manually add all deferred components
that you defined in `pubspec.yaml` into the
`android/settings.gradle` file as includes.
For example, if there are three deferred components
defined in the pubspec named, `boxComponent`, `circleComponent`,
and `assetComponent`, ensure that `android/settings.gradle`
contains the following:

将在 `pubspec.yaml` 中定义的所有延迟组件手动添加到 `android/settings.gradle` 文件中的 includes 部分。
例如，如果 pubspec 中定义了三个名为 `boxComponent`、 `circleComponent` 和 `assetComponent` 的延迟组件，
请确保 `android/settings.gradle` 中包含以下内容：
    
```groovy
include ':app', ':boxComponent', ':circleComponent', ':assetComponent'
...
```

</li>

<li>

Repeat steps [3.1][] through 3.6 (this step)
until all validator recommendations are handled and the tool
runs without further recommendations.

重复步骤 [3.1][] 到 3.6（此步骤），
直到处理了所有验证程序的建议，并且该工具在没有更多建议的情况下运行。

When successful, this command outputs an `app-release.aab`
file in `build/app/outputs/bundle/release`.

成功时，此命令将在 `build/app/outputs/bundle/release` 目录下输出 `app-release.aab` 文件。

A successful build does not always mean the app was
built as intended. It is up to you to ensure that all loading
units and Dart libraries are included in the way you intended.
For example, a common mistake is accidentally importing a
Dart library without the `deferred` keyword,
resulting in a deferred library being compiled as part of
the base loading unit. In this case, the Dart lib would
load properly because it is always present in the base,
and the lib would not be split off. This can be checked
by examining the `deferred_components_loading_units.yaml`
file to verify that the generated loading units are described
as intended.

构建成功并非总是意味着应用是按预期构建的。
你需要确保所有的加载单元和 Dart 库都以你想要的方式包含在内。
例如，一个常见的错误是不小心导入了一个没有 `deferred` 关键字的 Dart 库，
导致一个延迟加载库被编译为基本加载单元的一部分。
在这种情况下，Dart 库将正确加载，因为它始终存在于基本组件中，并且库不会被拆分。
可以通过检查 `deferred_components_loading_units.yaml` 文件，
验证预期的加载单元是否生成描述。

When adjusting the deferred components configurations,
or making Dart changes that add, modify, or remove loading units,
you should expect the validator to fail.
Follow steps [3.1][] through 3.6 (this step) to apply any
recommended changes to continue the build.

当调整延迟组件配置，或者进行添加、修改、删除加载单元的更改时，
你应该预料到验证程序会失败。按照步骤 [3.1][] 到 3.6（此步骤）中的所有建议继续构建。

</li>
</ol>

### Running the app locally

### 在本地运行应用

Once your app has successfully built an `.aab` file,
use Android's [`bundletool`][] to perform
local testing with the `--local-testing` flag.

一旦你的应用程序成功构建了一个 `.aab` 文件，
就可以使用 Android 的 [`bundletool`][] 来执行带有 `--local testing` 标志的本地测试。

To run the `.aab` file on a test device,
download the bundletool jar executable from
[github.com/google/bundletool/releases][] and run:

要在测试设备上运行 `.aab` 文件，请从
[github.com/google/bundletool/releases][] 下载
bundletool jar 可执行文件，然后运行：

```console
$ java -jar bundletool.jar build-apks --bundle=<your_app_project_dir>/build/app/outputs/bundle/release/app-release.aab --output=<your_temp_dir>/app.apks --local-testing

$ java -jar bundletool.jar install-apks --apks=<your_temp_dir>/app.apks
```

Where `<your_app_project_dir>` is the path to your app's
project directory and `<your_temp_dir>` is any temporary
directory used to store the outputs of bundletool.
This unpacks your `.aab` file into an `.apks` file and
installs it on the device. All available Android dynamic
features are loaded onto the device locally and
installation of deferred components is emulated.

`<your_app_project_dir>` 是应用程序对应项目的目录位置，
 `<your_temp_dir>` 用于存储 bundletool 输出的所有临时目录。
这会将你的 `.aab` 文件解压为 `.apks` 文件并将其安装到设备上。
所有可用的 Android 动态特性都已在本地设备上加载，并模拟了延迟组件的安装。

Before running `build-apks` again,
remove the existing app .apks file:

再次运行 `build-apks` 之前，
请删除已存在的 .apks 文件：

```console
$ rm <your_temp_dir>/app.apks
```

Changes to the Dart codebase require either incrementing
the Android build ID or uninstalling and reinstalling
the app, as Android won't update the feature modules
unless it detects a new version number.

对 Dart 代码库的更改需要增加 Android 构建 ID，或者卸载并重新安装应用程序。
因为只有检测到新的版本号，Android 才会去更新功能模块。

### Releasing to the Google Play store

### 发布到 Google Play 商店

The built `.aab` file can be uploaded directly to
the Play store as normal. When `loadLibrary()` is called,
the needed Android module containing the Dart AOT lib and
assets is downloaded by the Flutter engine using the
Play store's delivery feature.

生成的 `.aab` 文件可以像平常一样直接上传到 Google Play 商店。
调用 `loadLibrary()` 时，Flutter 引擎将会使用从商店下载的包含 Dart AOT 库和资源的 Android 模块。

[3.1]: #step-3.1
[Android docs]: {{site.android-dev}}/guide/playcore/feature-delivery#declare_splitcompatapplication_in_the_manifest
[`bundletool`]: {{site.android-dev}}/studio/command-line/bundletool
[Deferred Components]: {{site.repo.flutter}}/wiki/Deferred-Components
[`DeferredComponent`]: {{site.api}}/flutter/services/DeferredComponent-class.html
[dynamic feature modules]: {{site.android-dev}}/guide/playcore/feature-delivery
[Flutter Gallery's `lib/deferred_widget.dart`]: {{site.repo.gallery-archive}}/blob/main/lib/deferred_widget.dart
[Flutter wiki]: {{site.repo.flutter}}/tree/main/docs
[github.com/google/bundletool/releases]: {{site.github}}/google/bundletool/releases
[lazily loading a library]: {{site.dart-site}}/language/libraries#lazily-loading-a-library
[release or profile mode]: /testing/build-modes
[step 3.3]: #step-3.3
[android-app-bundle]: {{site.android-dev}}/guide/app-bundle
[dart-def-import]: https://dart.dev/language/libraries#lazily-loading-a-library

