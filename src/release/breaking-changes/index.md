---
title: Breaking changes
title: 破坏性变更 (Breaking changes)
description: A list of migration guides for breaking changes in Flutter.
description: Flutter 里破坏性变更的迁移文档。
---

As described in the [breaking change policy][],
on occasion we publish guides
for migrating code across a breaking change.

正如 [重要改动策略][breaking change policy] 中描述的，
我们会不定期地发布关于重要改动的迁移指南。

The following guides are available. They are sorted by
release, and listed in alphabetical order:

以下是可用的迁移指南，
它们按发行版本分类并按字母顺序排列。

### Not yet released to stable

### 尚未推进到稳定版

* [Required Kotlin version][]

  [需要的 Kotlin 版本][Required Kotlin version]

* [Deprecated API removed after v2.5][]

  [2.5 之后的版本将会废弃的 API][Deprecated API removed after v2.5]

* [Raw images on Web uses correct origin and colors][]

  [Web 平台的原始图像使用正确的来源和颜色][Raw images on Web uses correct origin and colors]

[Required Kotlin version]: {{site.url}}/release/breaking-changes/kotlin-version
[Deprecated API removed after v2.5]: {{site.url}}/release/breaking-changes/2-5-deprecations
[Raw images on Web uses correct origin and colors]: {{site.url}}/release/breaking-changes/raw-images-on-web-uses-correct-origin-and-colors


### Released in Flutter 2.5
### 已经在 Flutter 2.5 中发布

* [Default drag scrolling devices][]

  [默认允许触控滑动的设备][Default drag scrolling devices]

* [Deprecated API removed after v2.2][]

  [v2.2 之后的版本将会废弃的 API][Deprecated API removed after v2.2]

* [Change the enterText method to move the caret to the end of the input text][]

  [改变 enterText 方法，将光标移到输入文本的末端][Change the enterText method to move the caret to the end of the input text]

* [GestureRecognizer Cleanup][]

  [GestureRecognizer 代码整理][GestureRecognizer Cleanup]

* [Introducing package:flutter_lints][]

  [引入 flutter_lints package][Introducing package:flutter_lints]

* [Replace AnimationSheetBuilder.display with collate][]

  [将 AnimationSheetBuilder.display 替换为 collate][Replace AnimationSheetBuilder.display with collate]

* [ThemeData's accent properties have been deprecated][]

  [弃用 ThemeData 的强调属性][ThemeData's accent properties have been deprecated]

* [Transition of platform channel test interfaces to flutter_test package][]

  [平台通道测试接口向 flutter_test package 过渡][Transition of platform channel test interfaces to flutter_test package]

* [Using HTML slots to render platform views in the web][]

  [使用 HTML 在 Web 中渲染平台视图 (platform views)][Using HTML slots to render platform views in the web]


[Change the enterText method to move the caret to the end of the input text]: {{site.url}}/release/breaking-changes/enterText-trailing-caret
[Default drag scrolling devices]: {{site.url}}/release/breaking-changes/default-scroll-behavior-drag
[Deprecated API removed after v2.2]: {{site.url}}/release/breaking-changes/2-2-deprecations
[GestureRecognizer cleanup]: {{site.url}}/release/breaking-changes/gesture-recognizer-add-allowed-pointer
[Introducing package:flutter_lints]: {{site.url}}/release/breaking-changes/flutter-lints-package
[Replace AnimationSheetBuilder.display with collate]: {{site.url}}/release/breaking-changes/animation-sheet-builder-display
[ThemeData's accent properties have been deprecated]: {{site.url}}/release/breaking-changes/theme-data-accent-properties
[Transition of platform channel test interfaces to flutter_test package]: {{site.url}}/release/breaking-changes/mock-platform-channels
[Using HTML slots to render platform views in the web]: {{site.url}}/release/breaking-changes/platform-views-using-html-slots-web

### Reverted change in 2.2

### 在 2.2 版本中回退的改动

The following breaking change was reverted in release 2.2:

以下重要改动在 Flutter 2.2 中已被回退。

<b>[Network Policy on iOS and Android][]</b>
<br/>  Introduced in version: 2.0.0<br>
   Reverted in version:   2.2.0 (proposed)
   
<b>[iOS 端和 Android 端的网络策略][Network Policy on iOS and Android]</b>
<br/> 引入版本：2.0.0<br>
      回退版本：2.2.0（建议）

[Network Policy on iOS and Android]: {{site.url}}/release/breaking-changes/network-policy-ios-android

### Released in Flutter 2.2

### 发布于 Flutter 2.2

* [Default Scrollbars on Desktop][]

  [桌面端的默认滚动条][Default Scrollbars on Desktop]

[Default Scrollbars on Desktop]: {{site.url}}/release/breaking-changes/default-desktop-scrollbars

### Released in Flutter 2

### 发布于 Flutter 2

* [Added BuildContext parameter to TextEditingController.buildTextSpan][]

  [为 TextEditingController.buildTextSpan 添加 BuildContext 参数][Added BuildContext parameter to TextEditingController.buildTextSpan]
  
* [Android ActivityControlSurface attachToActivity signature change][]

  [变更 Android 端 ActivityControlSurface attachToActivity 签名][Android ActivityControlSurface attachToActivity signature change]
  
* [Android FlutterMain.setIsRunningInRobolectricTest testing API removed][]

  [移除 Android 端 FlutterMain.setIsRunningInRobolectricTest 测试 API][Android FlutterMain.setIsRunningInRobolectricTest testing API removed]
  
* [Clip behavior][]

  [剪裁行为][Clip behavior]
  
* [Deprecated API removed after v1.22][]

  [移除 v1.22 后过时的 API][Deprecated API removed after v1.22]
  
* [Dry layout support for RenderBox][]

  [对 RenderBox 的 Dry 布局支持][Dry layout support for RenderBox]（译者注：Dry 即 Don't repeat yourself，意思为不要重复自己）
  
* [Eliminating nullOk Parameters][]

  [取消 nullOk 参数][Eliminating nullOk Parameters]
  
* [Material Chip button semantics][]

  [语义化 Material 纸片按钮][Material Chip button semantics]
  
* [SnackBars managed by the ScaffoldMessenger][]

  [由 ScaffoldMessenger 管理 Snackbar][SnackBars managed by the ScaffoldMessenger]
  
* [TextSelectionTheme migration][]

  [迁移 TextSelectionTheme][TextSelectionTheme migration]
  
* [Use maxLengthEnforcement instead of maxLengthEnforced][]
  
  [使用 maxLengthEnforcement 代替 maxLengthEnforced][Use maxLengthEnforcement instead of maxLengthEnforced]
  
* [Transition of platform channel test interfaces to flutter_test package][]

  [平台通道测试向 flutter_test package 过渡][Transition of platform channel test interfaces to flutter_test package]

[Added BuildContext parameter to TextEditingController.buildTextSpan]: {{site.url}}/release/breaking-changes/buildtextspan-buildcontext
[Android ActivityControlSurface attachToActivity signature change]: {{site.url}}/release/breaking-changes/android-activity-control-surface-attach
[Android FlutterMain.setIsRunningInRobolectricTest testing API removed]: {{site.url}}/release/breaking-changes/android-setIsRunningInRobolectricTest-removed
[Clip behavior]: {{site.url}}/release/breaking-changes/clip-behavior
[Deprecated API removed after v1.22]: {{site.url}}/release/breaking-changes/1-22-deprecations
[Dry layout support for RenderBox]: {{site.url}}/release/breaking-changes/renderbox-dry-layout
[Eliminating nullOk Parameters]: {{site.url}}/release/breaking-changes/eliminating-nullok-parameters
[Material Chip button semantics]: {{site.url}}/release/breaking-changes/material-chip-button-semantics
[SnackBars managed by the ScaffoldMessenger]: {{site.url}}/release/breaking-changes/scaffold-messenger
[TextSelectionTheme migration]: {{site.url}}/release/breaking-changes/text-selection-theme
[Use maxLengthEnforcement instead of maxLengthEnforced]: {{site.url}}/release/breaking-changes/use-maxLengthEnforcement-instead-of-maxLengthEnforced
[Transition of platform channel test interfaces to flutter_test package]: {{site.url}}/release/breaking-changes/mock-platform-channels

### Released in Flutter 1.22

### 发布于 Flutter 1.22

* [Android v1 embedding app and plugin creation deprecation][]

  [废弃 Android v1 嵌入式应用和插件的创建][Android v1 embedding app and plugin creation deprecation]
  
* [Cupertino icons 1.0.0][]

  [Cupertino 图标 1.0.0][Cupertino icons 1.0.0]
  
* [The new Form, FormField auto-validation API][]

  [新的表单、表单字段自动验证 API][The new Form, FormField auto-validation API]


[Android v1 embedding app and plugin creation deprecation]: {{site.url}}/release/breaking-changes/android-v1-embedding-create-deprecation
[Cupertino icons 1.0.0]: {{site.url}}/release/breaking-changes/cupertino-icons-1.0.0
[The new Form, FormField auto-validation API]: {{site.url}}/release/breaking-changes/form-field-autovalidation-api

### Released in Flutter 1.20

### 发布于 Flutter 1.20

* [Actions API revision][]

  [修正 Actions API][Actions API revision]
  
* [Adding TextInputClient.currentAutofillScope property][]

  [添加 TextInputClient.currentAutofillScope 属性][Adding TextInputClient.currentAutofillScope property]
  
* [New Buttons and Button Themes][]

  [新的按钮和按钮主题][New Buttons and Button Themes]
  
* [Dialogs' Default BorderRadius][]

  [对话框的默认圆角][Dialogs' Default BorderRadius]
  
* [More Strict Assertions in the Navigator and the Hero Controller Scope][]

  [在导航和 Hero Controller 范围内使用更加严格的断言][More Strict Assertions in the Navigator and the Hero Controller Scope]
  
* [The Route Transition record and Transition delegate updates][]

  [更新路由 Transition 值和 Transition delegate][The Route Transition record and Transition delegate updates]
  
* [The RenderEditable needs to be laid out before hit testing][]

  [RenderEditable 需要在点击测试前进行布局][The RenderEditable needs to be laid out before hit testing]
  
* [Reversing the dependency between the scheduler and services layer][]

  [反转调度器和服务层之间的依赖关系][Reversing the dependency between the scheduler and services layer]
  
* [Semantics Order of the Overlay Entries in Modal Routes][]

  [语义化路由模型中的 Overlay 项][Semantics Order of the Overlay Entries in Modal Routes]

* [showAutocorrectionPromptRect method added to TextInputClient][]

  [TextInputClient 增加 showAutocorrectionPromptRect 方法][showAutocorrectionPromptRect method added to TextInputClient]

* [TestWidgetsFlutterBinding.clock][]

* [TextField requires MaterialLocalizations][]

  [文本字段需要 MaterialLocalizations 类][TextField requires MaterialLocalizations]

[Actions API revision]: {{site.url}}/release/breaking-changes/actions-api-revision
[Adding TextInputClient.currentAutofillScope property]: {{site.url}}/release/breaking-changes/add-currentAutofillScope-to-TextInputClient
[New Buttons and Button Themes]: {{site.url}}/release/breaking-changes/buttons
[Dialogs' Default BorderRadius]: {{site.url}}/release/breaking-changes/dialog-border-radius
[More Strict Assertions in the Navigator and the Hero Controller Scope]: {{site.url}}/release/breaking-changes/hero-controller-scope
[Reversing the dependency between the scheduler and services layer]: {{site.url}}/release/breaking-changes/services-scheduler-dependency-reversed
[The RenderEditable needs to be laid out before hit testing]: {{site.url}}/release/breaking-changes/rendereditable-layout-before-hit-test
[Semantics Order of the Overlay Entries in Modal Routes]: {{site.url}}/release/breaking-changes/modal-router-semantics-order
[showAutocorrectionPromptRect method added to TextInputClient]: {{site.url}}/release/breaking-changes/add-showAutocorrectionPromptRect
[TestWidgetsFlutterBinding.clock]: {{site.url}}/release/breaking-changes/test-widgets-flutter-binding-clock
[TextField requires MaterialLocalizations]: {{site.url}}/release/breaking-changes/text-field-material-localizations
[The Route Transition record and Transition delegate updates]: {{site.url}}/release/breaking-changes/route-transition-record-and-transition-delegate

### Released in Flutter 1.17

### 发布于 Flutter 1.17

* [Adding 'linux' and 'windows' to TargetPlatform enum][]

  [在 TargetPlatform 枚举中添加 'linux' 和 'windows'][Adding 'linux' and 'windows' to TargetPlatform enum]
  
* [Annotations return local position relative to object][]

  [注释返回局部对象的相对位置][Annotations return local position relative to object]
  
* [Container color optimization][]

  [容器颜色优化][Container color optimization]
  
* [CupertinoTabBar requires Localizations parent][]

  [CupertinoTabBar 要有 Localizations 父级][CupertinoTabBar requires Localizations parent]
  
* [Generic type of ParentDataWidget changed to ParentData][]

  [ParentDataWidget 的泛型改为 ParentData][Generic type of ParentDataWidget changed to ParentData]
  
* [ImageCache and ImageProvider changes][]

  [ImageCache 和 ImageProvider 的更改][ImageCache and ImageProvider changes]
  
* [ImageCache large images][]

  [ImageCache 缓存大图][ImageCache large images]
  
* [MouseTracker moved to rendering][]

  [MouseTracker 移动至渲染][MouseTracker  moved to rendering]
  
* [MouseTracker no longer attaches annotations][]

  [MouseTracker 不再附加注释][MouseTracker no longer attaches annotations]
  
* [Nullable CupertinoTheme.brightness][]

  [CupertinoTheme.brightness 允许为空值][Nullable CupertinoTheme.brightness]
  
* [Rebuild optimization for OverlayEntries and Routes][]

  [重建并优化 OverlayEntries 和路由][Rebuild optimization for OverlayEntries and Routes]
  
* [Scrollable AlertDialog][]

  [可滚动的对话框][Scrollable AlertDialog]
  
* [TestTextInput state reset][]

  [TestTextInput 状态重置][TestTextInput state reset]
  
* [TextInputClient currentTextEditingValue][]

* [The forgetChild() method must call super][]

  [forgetChild() 必须调用 super][The forgetChild() method must call super]
  
* [The Route and Navigator refactoring][]

  [重构路由和导航][The Route and Navigator refactoring]
  
* [FloatingActionButton and ThemeData's accent properties][]

  [FloatingActionButton 和 ThemeData 的强调速度][FloatingActionButton and ThemeData's accent properties]


[Adding 'linux' and 'windows' to TargetPlatform enum]: {{site.url}}/release/breaking-changes/target-platform-linux-windows
[Annotations return local position relative to object]: {{site.url}}/release/breaking-changes/annotations-return-local-position-relative-to-object
[breaking change policy]: {{site.url}}/resources/compatibility
[Container color optimization]: {{site.url}}/release/breaking-changes/container-color
[CupertinoTabBar requires Localizations parent]: {{site.url}}/release/breaking-changes/cupertino-tab-bar-localizations
[Generic type of ParentDataWidget changed to ParentData]: {{site.url}}/release/breaking-changes/parent-data-widget-generic-type
[ImageCache and ImageProvider changes]: {{site.url}}/release/breaking-changes/image-cache-and-provider
[ImageCache large images]: {{site.url}}/release/breaking-changes/imagecache-large-images
[MouseTracker moved to rendering]: {{site.url}}/release/breaking-changes/mouse-tracker-moved-to-rendering
[MouseTracker no longer attaches annotations]: {{site.url}}/release/breaking-changes/mouse-tracker-no-longer-attaches-annotations
[Nullable CupertinoTheme.brightness]: {{site.url}}/release/breaking-changes/nullable-cupertinothemedata-brightness
[Rebuild optimization for OverlayEntries and Routes]: {{site.url}}/release/breaking-changes/overlay-entry-rebuilds
[Replace AnimationSheetBuilder.display with collate]: {{site.url}}/release/breaking-changes/animation-sheet-builder-display
[Scrollable AlertDialog]: {{site.url}}/release/breaking-changes/scrollable-alert-dialog
[TestTextInput state reset]: {{site.url}}/release/breaking-changes/test-text-input
[TextInputClient currentTextEditingValue]: {{site.url}}/release/breaking-changes/text-input-client-current-value
[The forgetChild() method must call super]: {{site.url}}/release/breaking-changes/forgetchild-call-super
[The Route and Navigator refactoring]: {{site.url}}/release/breaking-changes/route-navigator-refactoring
[FloatingActionButton and ThemeData's accent properties]: {{site.url}}/release/breaking-changes/fab-theme-data-accent-properties
