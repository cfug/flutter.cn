---
title: Flutter 2.5 更新详解
toc: true
---

![](https://gglh6.g.forms.cn/YoLrEC3CimENH3yNhDhyTM27tDkMsiEtEemrKlXfgP7IlFnJFP58KCS7-AAb0QgddmUiziQK3eGs8BuYADBp6-TeKJ01C88ww83c80PhJP_x6i1GdUvtU_1YqRUSJ-HTf3pwQtSN=s0)

Flutter 2.5 正式版已于上周正式发布！这是一次重要的版本更新，也是 Flutter 发布历史上各项统计数据排名第二的版本。我们关闭了 4600 个 Issue，合并了 3932 个 PR，它们分别来自 252 个贡献者和 216 个审核者。回顾去年 -- 我们收到来自 1337 个贡献者提交的 21072 个 PR，其中有 15172 个被合并。在详述本次更新的内容之前，我们想强调，Flutter 的首要工作始终是高质量交付开发者们所需要功能。

Flutter 2.5 带来了一些重要的性能和工具改进，以帮助开发者们追踪应用中的性能问题。同时，加入了一些新的功能，包括对 Android 的全屏支持、 对 Material You (也称 v3) 的更多支持、对文本编辑的更新以支持切换键盘快捷键、在 Widget Inspector 中查看 widget 详情、在 Visual Studio Code 项目中添加依赖关系的新支持、从 IntelliJ / Android Studio 的测试运行中获得测试覆盖率信息的新支持，以及一个更贴近 Flutter 应用在真实的使用场景下的应用模板等。这个版本充满了令人兴奋的新更新，让我们开始介绍吧！

该版本进行了一些性能上的改进：首先是一项用于从离线训练运行中连接 Metal 着色器预编译的 PR ([#25644](https://github.com/flutter/engine/pull/25644 "#25644"))，这将最坏情况下的光栅化时间减少了 2/3 (如我们的基准测试所示)，将第 99 百分位的帧时间减少了一半。我们在减少 iOS 卡顿方面取得了持续性的进展，这也是在这条道路上迈出的另一步。然而，着色器预热只是卡顿的一个来源。在该版本以前，处理来自网络、文件系统、插件或其他 isolate 的异步事件可能导致动画中断，这是另一个卡顿的来源。在该版本中我们对 UI Isolate 的事件循环的调度策略 ([#25789](https://github.com/flutter/engine/pull/25789 "#25789")) 进行了改进，现在帧处理优先于其他异步事件的处理，在我们的测试中，其导致的卡顿已经被消除。

![调整前后处理异步事件造成的帧构建滞后时间](https://gglh6.g.forms.cn/sfegQdXcNLdBLnybZjacGhJwUuGErq5Jp4MQt3BStGm-EDysCKkD9uaWyVM2NCMVb81-TljxLW7-KEENUTsqMSWayhfLRX7yIrgYTU5kXH-s8otMzg2ffj-u5B6GV0j3-npcCMPg=s0)

另一个原因是垃圾回收 (GC) 会暂停 UI 线程来回收内存。在该版本以前，一些图像的内存只能在 Dart VM 执行 GC 时以较慢的速度进行回收。在早期版本中，常用的做法是 Flutter 引擎会向 Dart VM 提示图像内存可以通过 GC 回收，理论上可以让内存回收更为及时。不幸的是，在实践中这造成了过多的回收，而且内存有时仍然不能被快速回收，导致无法避免在内存有限的设备上出现低内存的情况。在现在的版本中，未使用的图像的内存会尽可能快速地进行回收 ([#26219](https://github.com/flutter/engine/pull/26219 "#26219")、[#82883](https://github.com/flutter/flutter/pull/82883 "#82883")、[#84740](https://github.com/flutter/flutter/pull/84740 "#84740"))，这大大减少了 GC 的次数。

![修复前和修复后的 GC 次数，以尽快回收未使用的大图像内存](https://gglh6.g.forms.cn/aYmIHpHERjkTHh_ymdkgeyQRh_qXN72rlIAHSvFxAEoBaejKtM5u82GNAadbS8FH8JFe2WvZdtSmJVoqw0b_lUmMpCWKkFQh9fOuTFcsmyveFzesGlkHDDuuPc-H_7gcWrrsvNS0=s0)

举个例子，在我们的一个测试中，播放了一个 20 秒的 GIF 动画，GC 的次数从需要 400 次下降到只需 4 次。更少的主要 GC，意味着更少的涉及图像出现和消失的动画卡顿，更少的 CPU 和电量消耗。

Flutter 2.5 的另一项性能改进是优化了 iOS 上 Dart 和 Objective-C/Swift、Android 上 Dart 和 Java/Kotlin 之间相互通信的延迟。作为 [调整消息通道](https://files.flutter-io.cn/flutter-design-docs/2021_Platform_Channel%20Performance_Tuneup.pdf "调整消息通道") 的一部分，我们从消息编解码器中移除了不必要的拷贝，在不同内容的大小和设备上减少了高达 50% 的延迟 (详见 [#25988](https://github.com/flutter/engine/pull/25988 "#25988")、[#26331](https://github.com/flutter/engine/pull/26331 "#26331"))。

![调整前后的 iOS 消息延迟](https://gglh6.g.forms.cn/gc-YrPSIwirzTDVJ6FqGK5Lugn1YsA_l5h8shX8W5ROi_2doeJO8h-835CDX4wsDBAyjMwQGp-Ytr9dBLnswV6xMOWWJJzAAkupJ62-Gy0IRxk-9bbtuq0r4OdshSzuAmTwS6oEI=s0)

更多详情，请你参阅 Aaron Clarke 的文章：[提高 Flutter 中的平台通道性能](https://medium.com/flutter/improving-platform-channel-performance-in-flutter-e5b4e5df04af "提高 Flutter 中的平台通道性能")。

如果你要构建 iOS 应用，我们还有最后一项性能更新：在该版本中，使用 Apple Silicon M1 Mac 构建的 Flutter 应用可以直接在 ARM 架构的 iOS 模拟器 ([#pull/85642](https://github.com/flutter/flutter/pull/85642 "#pull/85642")) 上运行。这意味着无需使用 Rosetta 对 Intel x86_64 指令和 ARM 进行转换，这提升了 iOS 应用测试的性能，并规避了一些微妙的 Rosetta 问题 ([#74970](https://github.com/flutter/flutter/issues/74970#issuecomment-858170914 "#74970")、[#79641](https://github.com/flutter/flutter/issues/79641 "#79641"))。这是 Flutter 在全面支持 Apple Silicon 的路程上迈出的又一步，敬请继续关注。

当然，没有 Dart 语言和它的运行时环境，就不会有现在的 Flutter，它建立在 Dart 语言和 runtime 之上。Flutter 2.5 同时带来了 Dart 2.14。[新发布的 Dart 版本](https://medium.com/@mit.mit/announcing-dart-2-14-b48b9bb2fb67 "新发布的 Dart 版本") 不仅带来了新的格式化使 [级联](https://dart.cn/guides/language/language-tour%23cascade-notation "级联") 操作更加清晰，还带来了支持忽略文件的新 pub 命令工具，以及新的语言功能 (包括传说中的无符号右移操作符的回归)。此外，这个版本带来了一套新的 Dart 和 Flutter 项目之间共享的标准代码规范提示，开箱即用，这也是 Dart 2.14 最精彩的部分。

![](https://gglh6.g.forms.cn/HKlMxP0-H-E-E39GOaThjkrQXfE21owI2dPCHiDzNskmDJe81eomRBqQrYeV7jhYYFqcD9gOotVMJYjrYdAir0eqs_feJD4PQcj1k1sb7kPMQtHBpZcQVXn6tYjsGdIm92O7HOh3=s0)

`flutter create` 开箱即有一个 analysis_options.yaml 文件，预先使用了推荐的 Flutter lint。

当你创建一个新的 Dart 或 Flutter 项目时，你不仅可以使用这些规范，而且 [只需要几个步骤](https://flutter.cn/docs/release/breaking-changes/flutter-lints-package#migration-guide "只需要几个步骤") 就可以将这种相同的分析添加到你现有的应用中。关于这些规范的细节、新的语言功能和更多内容，请查阅：[Dart](https://medium.com/dartlang/announcing-dart-2-14-b48b9bb2fb67 "Dart") [2.14](https://medium.com/dartlang/announcing-dart-2-14-b48b9bb2fb67 "2.14") [发布](https://medium.com/dartlang/announcing-dart-2-14-b48b9bb2fb67 "发布")。

Flutter 2.5 版本对框架进行了一些修复和改进。[我们修复了关于 Android 全屏模式的一系列相关问题](https://github.com/flutter/flutter/pull/81303 "我们修复了关于 Android 全屏模式的一系列相关问题")，该 Issue 获得了上百个点赞，全屏选项包括向后倾斜、沉浸模式、粘性沉浸模式和边到边四种。这一变化还增加了一种方法用来监听其他模式下的全屏变化。例如，如果用户在使用应用时，改变了系统界面的全屏模式，开发者现在可以通过代码让应用重新变为全屏，或执行其他操作。

![新的 Android 边到边模式：正常模式 (左)，边到边模式 (中)，带有自定义 SystemUIOverlayStyle 的边到边 (右)](https://gglh6.g.forms.cn/lgpnggVQ-nZ3DDzVapq5KLwF4n65RT4AKL5CqNgPdiEhItRwQIAPHswdzM6Gso4_eZdKh7Vpau-Q7dKKePF_NL_uD0fWNj40kXoPb6m1tUoN1gitLaEwEE6NM93ldIw040IU1Ah5=s0)

在这个版本中，我们继续建立对新的 Material You (又称 v3) 规范的支持，包括对悬浮按钮尺寸和主题的更新 ([#86441](https://github.com/flutter/flutter/pull/86441 "#86441"))，以及一个新的 `MaterialState.scrolledUnder` 状态，你可以通过 PR ([#79999](https://github.com/flutter/flutter/pull/79999 "#79999")) 中的示例代码看到它的效果。

![Material You 中新的 FAB 尺寸](https://gglh6.g.forms.cn/74UEjhhQqiY0Aiy0RJ6JLFfVOKSweMDuzk92mSdN7de_UE-Y5AlOno1HlOeqnjZAItC1zcyl-KO9J9GAapTFzb_o-8F04AVC6kTR23-cInBrYQGAn4V4tVEfl03pbTyVJRTF6Osi=s0)

![新的 MaterialState.scrolledUnder 状态](https://gglh6.g.forms.cn/B65Zt6C7aiA7XWaZ8k4kvd_p5SJ29NE7kl89eMMNE8hidGBNydsAPI0rcVk9kM3ECfsQR26VGY8TRi7BdnxVW5Dq0wQOTzpknXcjsWCtg_T-SzoJiA3DY0_tPPUUxXGWepTLmJz2=s0)

当我们讨论滚动时，另一个改进是增加了额外的滚动指标通知 ([#85221](https://github.com/flutter/flutter/pull/85221 "#85221")、[#85499](https://github.com/flutter/flutter/pull/85499 "#85499"))，即使用户没有滚动，也会提供可滚动区域的通知。例如，如下示例展示了滚动条根据 ListView 的实际大小而适时出现或消失的效果。

![新的滚动指标通知，使滚动条自动出现和消失。](https://gglh6.g.forms.cn/WxBebxGYC1nJdPctbw4vYuy_fVI-KmS9YsU0jrXjZ3BLkvwxEb1LoM65aKjN0HUaJmmrf8w83T29q_NzZiH6bUvCe1K9NeEVPQkCVHYaHntrutLprfBo6-LYT-u8c9OuSad7VhYu=s0)

在这种情况下，你不需要写任何代码，就可以捕获 [ScrollMetricNotification](https://master-api.flutter-io.cn/flutter/widgets/ScrollMetricsNotification-class.html "ScrollMetricNotification") 的变化。特别感谢社区贡献者 [xu-baolin](https://github.com/xu-baolin "xu-baolin")，他在这方面做了大量工作，并提出了一个很好的解决方案。

社区的另一杰出贡献是为 `ScaffoldMessenger` 增加了 Material 横幅的支持。在 [Flutter 2.0](https://medium.com/flutter/whats-new-in-flutter-2-0-fe8e95ecc65 "Flutter 2.0") 中新增的 `ScaffoldMessenger`，它提供了一种强大的方式，在屏幕底部显示 SnackBars 以向用户提供通知。在 Flutter 2.5 中，现在你可以在 Scaffold 顶部添加一个横幅，在用户将其关闭之前，它将一直保持在原位。

![你可以通过调用 ScaffoldMessenger 的 showMaterialBanner 方法触发这种行为](https://gglh6.g.forms.cn/r0-lBXgPf0gr0mqiW9H3p3t9w7_4kD5SzVuLIv7ElmhlmzJeZNbckDlg0yJW2Kp0hwswa7NGerIWCOZ-StOjRFRNx5cuf1aIaAUCsV0IOle8lMJPxM0nSEOasLAHmGAuMnRAPgCu=s0)

[横幅的 Material 指南](https://material-io.cn/components/banners "横幅的 Material 指南") 规定你的应用一次只能显示一个横幅，所以如果你的应用多次调用 `showMaterialBanner`，`ScaffoldMessenger` 将持有一个队列，在前一个横幅被关闭时显示下一个新的横幅。感谢 [Calamity210](https://github.com/Calamity210 "Calamity210") 为 Flutter 的 Material 支持提供了有力补充。

在 Flutter 2.0 及其新文本编辑功能的基础上，我们在这个版本中添加了如文本选择器、拦截覆写任何键盘事件，以及覆写文本编辑的键盘快捷方式的能力 ([#85381](https://github.com/flutter/flutter/pull/85381 "#85381"))。如果你想让 Ctrl - A 做一些自定义操作，而不是选择所有文本，你可以自行定义。[DefaultTextEditingShortcuts](https://github.com/flutter/flutter/blob/b524270af147847f64fa296cf6eed3633ffe683d/packages/flutter/lib/src/widgets/default_text_editing_shortcuts.dart#L163 "DefaultTextEditingShortcuts") 类包含了 Flutter 在每个平台上支持的每个键盘快捷方式的列表。如果你想覆写其中的关联，请使用 Flutter 现有的 [Shortcuts](https://api.flutter-io.cn/flutter/widgets/Shortcuts-class.html "Shortcuts") widget，将任一快捷键重新映射到现有或自定义的意图，你可以将该 widget 放置在你想要覆写的地方。示例请参阅：[API 文档](https://api.flutter-io.cn/flutter/widgets/DefaultTextEditingShortcuts-class.html "API 文档")。

另一个得到大量改进的插件是 [camera 插件](https://pub.flutter-io.cn/packages/camera "camera 插件")：

- [3795](https://github.com/flutter/plugins/pull/3795 "3795") \[camera\] android-rework 第 1 部分：支持 Android 相机功能的基础类
- [3796](https://github.com/flutter/plugins/pull/3796 "3796") \[camera\] android-rework 第 2 部分：Android 自动对焦功能
- [3797](https://github.com/flutter/plugins/pull/3797 "3797") \[camera\] android-rework 第 3 部分：Android 曝光相关功能
- [3798](https://github.com/flutter/plugins/pull/3798 "3798") \[camera\] android-rework 第 4 部分：Android 闪光灯和变焦功能
- [3799](https://github.com/flutter/plugins/pull/3799 "3799") \[camera\] android-rework 第 5 部分：Android FPS 范围、分辨率和传感器方向功能
- [4039](https://github.com/flutter/plugins/pull/4039 "4039") \[camera\] android-rework 第 6 部分：Android 曝光和对焦点功能
- [4052](https://github.com/flutter/plugins/pull/4052 "4052") \[camera\] android-rework 第 7 部分：Android 降噪功能
- [4054](https://github.com/flutter/plugins/pull/4054 "4054") \[camera\] android-rework 第 8 部分：最终实现的支持模块
- [4010](https://github.com/flutter/plugins/pull/4010 "4010") \[camera\] 在 iOS 上不触发平放时的设备方向
- [4158](https://github.com/flutter/plugins/pull/4158 "4158") \[camera\] 修复 iOS 上设置焦点和曝光点的坐标旋转
- [4197](https://github.com/flutter/plugins/pull/4197_ "4197") \[camera\] 修复相机预览在设备方向改变时不总是重建的问题
- [3992](https://github.com/flutter/plugins/pull/3992 "3992") \[camera\] 防止在设置不支持的 FocusMode 时崩溃
- [4151](https://github.com/flutter/plugins/pull/4151 "4151") \[camera\] 引入 camera_web package

在 [image_picker 插件](https://pub.flutter-io.cn/packages/image_picker "image_picker 插件") 上也做了很多工作，专注于端到端的相机体验。

- [3898](https://github.com/flutter/plugins/pull/3898 "3898") \[image_picker\] 图像采集器修复相机设备
- [3956](https://github.com/flutter/plugins/pull/3956 "3956") \[image_picker\] 在 Android 中将相机捕捉的存储位置改为内部缓存，以符合新的 Google Play 存储要求
- [4001](https://github.com/flutter/plugins/pull/4001 "4001") \[image_picker\] 删除了多余的相机权限请求
- [4019](https://github.com/flutter/plugins/pull/4019 "4019") \[image_picker\] 修复当相机作为源时的旋转问题

这些工作改善了 Android 的相机和 `image_picker` 插件的功能和健壮性。此外，你也许会注意到 [camera 插件](https://pub.flutter-io.cn/packages/camera_web "camera 插件") 的 Web 功能已处于预览阶段 ([#4151](https://github.com/flutter/plugins/pull/4151 "#4151"))。这个预览版提供了对查看相机预览、拍摄照片、使用闪光灯和变焦控制的基本支持，所有这些都可以在 Web 上进行。它目前不是一个 [被认可的联合插件](https://flutter.cn/docs/development/packages-and-plugins/developing-packages#endorsed-federated-plugin "被认可的联合插件")，因此在配置中，你需要明确这个插件仅能够在 Web 应用中 [添加使用](https://pub.flutter-io.cn/packages/camera_web/install "添加使用")。

最初的 Android 相机重构工作是由 [acoutts](https://github.com/acoutts "acoutts") 贡献完成的。`camera` 和 `image_picker` 的工作是由 [Baseflow](https://www.baseflow.com/open-source/flutter "Baseflow") 完成的，这是一家专门从事 Flutter 的咨询公司，因其 [在 pub.dev 上的 package ](https://pub.flutter-io.cn/publishers/baseflow.com/packages "在 pub.dev 上的 package") 而闻名。`camera_web` 的工作主要由 [Very Good Ventures](https://verygood.ventures/ "Very Good Ventures") 完成，这是一家位于美国的 Flutter 咨询公司。非常感谢你们对 Flutter 社区的贡献！

另一个有价值的社区贡献是由 fluttercommunity.dev 组织做出的，他们的代表作是 [](https://plus.fluttercommunity.dev/_3yzKulu_dTTYflhO) [plus 系列插件](https://plus.fluttercommunity.dev/ "plus 系列插件")。随着新的 Flutter 版本发布，之前由 Flutter 官方团队维护的插件现在 “交接” 给了 fluttercommunity.dev 组织，在每个插件下方都会有下面类似的提示：

![](https://gglh6.g.forms.cn/tD8xTpW_n2e9beQeVht1RJSxwBr9ZeMbwPFOy9zfbjp26TzyKR4FAFjbiuwzE2HkdVm8ycv76l_0j1bo24WhuvSjrh3wcMF2bC85OBpCvoQvDpMFE4n1gLrJOdSn_wPZp0Rxrs6x=s0)

此外，由于这些插件不再积极维护，所以我们已取消了它们的 Flutter Favorite 标记。如果你还没有迁移到 plus 系列插件，我们建议你按照以下的表格进行对照迁移。

![](https://gglh6.g.forms.cn/Um8hjP4VXFLcmVGwwXqB9kDqifZoTLIcXf2z5KZYaMm0RBttCg-b1YoTMZ4SlxaRACKHEPgphTJ255Cw8bdU_ArQkrkpBGXZ2jX2Mcf2FobNylC8VHMnSbTZH-kh9ZMmrrZqpY5w=s0)

Flutter 2.5 对 Flutter DevTools 进行了大量的改进。首先是在 DevTools 中增加了对引擎更新的支持 ([#26205](https://github.com/flutter/engine/pull/26205 "#26205")、[#26233](https://github.com/flutter/engine/pull/26233 "#26233")、[#26237](https://github.com/flutter/engine/pull/26237 "#26237")、[#26970](https://github.com/flutter/engine/pull/26970 "#26970")、[#27074](https://github.com/flutter/engine/pull/27074 "#27074")、[#26617](https://github.com/flutter/engine/pull/26617 "#26617"))。其中一组更新使 Flutter 能够更好地将跟踪事件与特定的帧联系起来，这有助于开发人员确定一个帧可能会超出预算的原因。你可以在 DevTools 框架图中看到这一点，该图表重构之后已经支持了实时展示；当你的应用正在渲染时，它们的数据会被填入该图中。从这个图表中选择一个构建帧，就可以跳转到该帧的时间线事件。

![](https://gglh6.g.forms.cn/j3HBk0HsjqGsxNN_U-cs_vZNBnUboY2n0ZIkikwmHdQOz12Vrn3TaIZlLzgxkj4CAnv6tWFYf0a-juf4JHJt-l6u924cA47n7RdnB4vNA1DZ3OUxRSqrh4VylaMJJf-4J-3zs-qH=s0)

Flutter 引擎现在也能识别时间线中的着色器编译事件。Flutter DevTools 使用这些事件来帮助你诊断应用中的着色器编译缺陷。

![DevTools 检测到因着色器编译而丢失的构建帧](https://gglh6.g.forms.cn/RFhqkY-_vYhPNn4BD9c14NqAti5EKTYmhXvl6tN45a_R6eCAfAicUU9YT_b70ZfuFsxN68UaPy5M0fPM3tpddXVw_kZ1Tw2-QGot_NSa6xFC2wtp3ghsL0ohEuIfA-j2_xi1rYcb=s0)

有了这个新功能，DevTools 可以检测到你因着色器编译而丢失的构建帧，以帮助你修复这个问题。如果你希望像首次运行应用一样，使用 `flutter run` 命令并加上 `--purge-persistent-cache` 这个标记。这将清除着色器的缓存，以确保你重现用户在「首次运行」或「重新打开」 (iOS) 应用时看到的效果。此功能仍在开发中，所以请将你发现的 [问题或改进建议](https://github.com/flutter/devtools/issues "问题或改进建议") 提交给我们，以帮助发现和改进着色器编译工具。

此外，当你追踪应用中的 CPU 性能问题时，可能已经淹没在了来自 Dart 和 Flutter 库或引擎的原生代码的剖析数据中。如果你想关闭这些数据以专注自己的代码，那么你可以使用新的 CPU Profiler 功能 ([#3236](https://github.com/flutter/devtools/pull/3236 "#3236"))，使你能够隐藏来自任何这些源的 Profiler 信息。

![](https://gglh6.g.forms.cn/ayyGLnegxZ-ZKcwHL3v9Co7MO6WrfDExU2oVC3QshvWdo6BKn5IaUdtR0aw69Ltf87Zieqae46OEZOnbrxRhIs1ETmAeeB1G0RRdkXGJ7bCIEHlCcRrn6zbamYpCkexyZPQ6Q8np=s0)

对于你没有过滤掉的类别，它们现在已经用颜色进行了分类 ([#3310](https://github.com/flutter/devtools/pull/3310 "#3310")、[#3324](https://github.com/flutter/devtools/pull/3324 "#3324"))，这样你就可以很清晰地看到 CPU 火焰图内容对应的部分。

![彩色的火焰图，识别应用中的应用 vs. 原生 vs. Dart vs. Flutter 代码活动](https://gglh6.g.forms.cn/asJ8kGDi5H3BhU7tdAoaA_HVuBhqpFQAS51AaqxQZCit64SGUkD-A7XPcLhBHCs2wKCJH6bOPTBWMQlvmXikT-EcPL1Sr3wSTlwrZHaZWWYe5OSbdjGScU4qcAH81xPBtHIFQNPp=s0)

性能可能并不是你唯一想要调试的内容。新版本的 DevTools 带有对 Widget Inspector 的更新，当你将鼠标悬停在 widget 上时，可以评估对象、查看属性、widget 状态等等。

![](https://gglh6.g.forms.cn/j1K1fVwrpRwC82J5W5RvViiwiXPkm1DOdWu6E2DmXfhu3rYCOuZ80k9oKPx9af1hdvtRng7m04_oQfWTauz15cXrWn6zZ7l8zSeNcL3g6K3Aqe00xD5o2vbLxBFYj1RlYXDxPFzo=s0)

而且当你选择一个 widget 时，它会在新的 Widget Inspector Console 自动弹出，在那里你可以自由探索 widget 的属性。

![](https://gglh6.g.forms.cn/rqzYV63V3EPFy1VAouAEWxHB8kyijkX-movIxTp4-77woc7hfFnt4xiOs7Aq35LQhrHkzM1_DRDVuUTs66ipUZ1IXPlx1qIFdbsKxN8KVBKRjdZOVdC11nTGrJYx21drRa62WACj=s0)

当在断点处暂停时，你也可以在控制台执行表达式。

除了新功能，Widget Inspector 也进行了改头换面。为了使 DevTools 成为理解和调试 Flutter 应用的最佳工具，我们与芬兰的创意技术机构 [Codemate 合作](https://codemate.com/ "Codemate 合作")，进行了一些更新。

![DevTools 调整后提供了更易于使用的用户体验](https://gglh6.g.forms.cn/CjA8kBKJqNbdFMUU4THyN1agx3Ys_5gnYHEMPRLNKXCw73kg4i5HM5YKTMhIG6CQYCE_s71EqddWnQ3CBa9VUGvnYqddX3JuO7UIxOyWCR4KTI434ik6dJWOay-qGZ2jk9Uz5pvD=s0)

如上图所示，你可以看到以下变化：

- 更好地传达调试切换按钮的作用 —— 这些按钮有新的图标、面向任务的标签，以及丰富的工具提示 (用于描述它们的功能和何时使用它们)。每个工具提示都进一步链接到了该功能的详细文档。
- 更容易查找和定位感兴趣的 widget——Flutter 框架中经常使用的 widget 现在已在 Inspector 左侧的 widget 树视图中作为图标常驻。它们已经根据其类别使用颜色进行了分类。例如，布局 widget 显示为蓝色，内容 widget 显示为绿色。此外，每个文本 widget 现在会显示其内容预览。
- 更一致的 Layout Explorer 和 widget 树的颜色方案 —— 现在更容易从 Layout Explorer 和 widget 树中识别出相同 widget。例如，如上图所示中的「Column」widget 在 Layout Explorer 中是蓝色背景，在 widget 树视图中也有一个蓝色图标。

我们很乐意听到你对这些更新产生的任何 [问题和改进建议](https://github.com/flutter/devtools/issues "问题和改进建议") 以确保 DevTools 高效地运行。这些亮点仅是开始。关于 DevTools 在 Flutter 这个版本中的全部新内容，请查阅以下版本说明：

- [Flutter DevTools 2.3.2 版本说明](https://groups.google.com/g/flutter-announce/c/LSNbc2rKIjQ/m/7Y7cWgO2CQAJ "Flutter DevTools 2.3.2 版本说明")
- [Flutter DevTools 2.4.0 版本说明](https://groups.google.com/g/flutter-announce/c/qenYe5LuHb8/m/tkWcBCVaAQAJ "Flutter DevTools 2.4.0 版本说明")
- [Flutter DevTools 2.6.0 版本说明](https://groups.google.com/g/flutter-announce/c/yBEZOWdV9nc/m/KCX3m2BpCAAJ "Flutter DevTools 2.6.0 版本说明")

IntelliJ / Android Studio 的 Flutter 插件在这个版本中也有一些改进，首先改进是运行集成测试的能力 ([#5459](https://github.com/flutter/flutter-intellij/pull/5459 "#5459"))。集成测试是在设备上运行的整个应用测试，在 integration_test 目录下运行，并使用与 widget 单元测试相同的 `testWidgets()` 功能。

![在 IntelliJ / Android Studio 中对 Flutter 应用进行集成测试](https://gglh6.g.forms.cn/ZqPzOQNznRhaLdiHOwfxVQSkBQjI9wkTFe-Ia4t0I_TjiwgrTURkb2vfUd4gTSFpey3oaPACcmHYcSzXXjxeU1jhVyBz9Toe0ygUEfS39fd66TB3Yg2lwtwLcFIGyrFFm7fLRR1P=s0)

要在你的项目中添加集成测试，请 [遵循 flutter.dev 上的说明](https://flutter.cn/docs/testing/integration-tests "遵循 flutter.dev 上的说明")。要将测试与 IntelliJ 或 Android Studio 连接，请添加一个运行配置，启动集成测试，并连接一个设备供测试使用。运行配置可以让你在运行测试的同时，设置断点、步进等。

此外，Flutter 的最新 IntelliJ / Android Studio 系列插件允许你查看单元测试和集成测试运行的覆盖率信息。你可以通过「debug」按钮旁边的工具栏按钮来访问这个信息：

![](https://gglh6.g.forms.cn/emcKys6WDwSlUct4O-HwggDbXOFKj8VdXd7QPnbsf51q8m8LZarOHXGSCxoNpZwUYLOHU8QG_99BPW_bAzkCceea2fRoVsiRx5hbefMf5sLxmOgEJo0uB0ZtJN7a5FGHblwh1GpH=s0)

覆盖率信息将以红色和绿色的矩形显示在编辑窗口左侧的空隙中。在这个例子里，第 9 - 13 行被测试覆盖，但第 3 和 4 行没有被测试。

![](https://gglh6.g.forms.cn/kJyY1pox9TwRBohaGJR-p9frbyfCRvV6ldPRD7BK6Ie0g0rVAG5r_tNg94ipXkShy_nwaRmiyH4ZLD_imR8YZfN0oHD-9F2OsN5T_X1ZglJSkVc_i2msrKL9EIQfrdUsUUCIhrjl=s0)

最新版本还包括预览来自 pub.dev 的 package 中使用的图标的新功能，这些 package 是围绕 TrueType 字体文件构建的 ([#5504](https://github.com/flutter/flutter-intellij/pull/5504 "#5504")、[#5595](https://github.com/flutter/flutter-intellij/pull/5595 "#5595")、[#5677](https://github.com/flutter/flutter-intellij/pull/5677 "#5677")、[#5704](https://github.com/flutter/flutter-intellij/pull/5704 "#5704"))，正如 Material 和 `Cupertino` 图标支持预览一样。

![IntelliJ / Android Studio 中的图标预览](https://gglh6.g.forms.cn/gqM1Sij4nxD3wd7CMCapkYAl3wrIQRnXjInjCaPv7Of8TUgixR94KBA9P0QclPodwWYfthq5i4vUMaXJoF12bXU2WmPPsXo2cEfNBnPn36SqPqJI0TsEB7aNYS9IvA9VayElr3Hb=s0)

要启用图标预览，你需要告诉该插件你正在使用哪些 package。在插件的设置 / 偏好页面有一个新的文本字段。

![](https://gglh6.g.forms.cn/I87uIo9Htez8sAB28Ec-yavKndT2Jx_wGERQ_q_VwRO_mEgp3IHqtWoAg8s-01eviyLbsMrSy1mpJAtWuPya_xGs-NQHhIu1QuTO153XBmOjPBjqYz0qJz2MQficIbe5LKPhuTpg=s0)

注意，这对定义为类中静态常量的图标有效，如屏幕截图中的示例代码所示。它不会对表达式起作用，例如 `LineIcons.addressBook()` 或 `LineIcons.values['code']`。如果你是一个图标 package 的作者，而这个图标 package 并不适合这个功能，请 [创建一个 Issue](https://github.com/flutter/flutter-intellij/issues "创建一个 Issue") 进行反馈。

更多有关 Flutter 的 IntelliJ / Android Studio 插件的更新信息，请参阅下列发布说明：

- [Flutter IntelliJ Plugin M57 发布](https://groups.google.com/g/flutter-announce/c/nZPj0uIW3h4/m/2Xnx8KQtAwAJ "Flutter IntelliJ Plugin M57 发布")
- [Flutter IntelliJ Plugin M58 发布](https://groups.google.com/g/flutter-announce/c/WJUH0m6cu-U/m/_n0RltLFAAAJ "Flutter IntelliJ Plugin M58 发布")
- [Flutter IntelliJ Plugin M59 发布](https://groups.google.com/g/flutter-announce/c/CNzqxtybpBA/m/nSu7QabMAQAJ "Flutter IntelliJ Plugin M59 发布")
- [Flutter IntelliJ Plugin M60 发布](https://groups.google.com/g/flutter-announce/c/qc40yulxvAg/m/B_1HuGmoBQAJ "Flutter IntelliJ Plugin M60 发布")

Flutter 的 Visual Studio Code 插件在这个版本中也得到了改进，首先是两个新的命令「Dart: Add Dependency」和「Dart: Add Dev Dependency」 ([#3306](https://github.com/Dart-Code/Dart-Code/issues/3306 "#3306")、[#3474](https://github.com/Dart-Code/Dart-Code/issues/3474 "#3474"))。

![在 Visual Studio Code 中添加 Dart 依赖](https://gglh6.g.forms.cn/zkRnoDFdsyVea3ukAArVqKLXz7u49QSi3ufrV3nlNpRSVxzY8XVcTQUjuf-iXS94nFetuyt4mVhxMpHylb0A2W6_jOPbm3YTKoO0ZFbSe_iYmrND3yk3eKx8baImfrtZeiVsgjn5=s0)

这些命令提供的功能与已经提供了一段时间的 [Jeroen Meijer 的 Pubspec Assist 插件](https://marketplace.visualstudio.com/items?itemName=jeroen-meijer.pubspec-assist "Jeroen Meijer 的 Pubspec Assist 插件") 类似。这些新命令开箱即用，提供了一个从 pub.dev 定期获取的 package 的类型过滤列表。

你可能还对「Fix All」命令感兴趣 ([#3445](https://github.com/Dart-Code/Dart-Code/issues/3445 "#3445")、[#3469](https://github.com/Dart-Code/Dart-Code/issues/3469 "#3469"))，该命令对 Dart 文件可用，可以在一个步骤中修复所有与 [dart fix](https://dart.cn/tools/dart-fix "dart fix") 相同的问题。

![使用 Flutter Fix 规则来修复你代码中的所有已知问题](https://gglh6.g.forms.cn/zhC59kp2HFl_SK7jvmrFE_z6qrGxBNq1h8X3rjYiEKl4oRaTLF29P6lY1Mmh7F6tiERWHOd26jOKsc_kDDLWDeaEyToCSkI_0I75h4bk4av6jl4Ao013B11Bp6jaiQD5_5xQ-097=s0)

你也可以在 VS Code 中，通过在 `editor.codeActionsOnSave` 中添加 `source.fixAll` 来设置为保存时运行。

又或者如果你想尝试一下预览功能，你可以启用 `dart.previewVsCodeTestRunner` 设置，看到 Dart 和 Flutter 测试通过新的 Visual Studio Code 测试运行器运行。

![使用新的 Visual Studio Code 测试运行器测试你的 Dart 和 Flutter 代码](https://gglh6.g.forms.cn/lUZmN0Qnnrmatl12GQUmTHOFYLT92N-etnOYgGt2p4DZgZzEXVW-HuSKYer6ZeodMtG0zs8u3u3L5bvA_OEcSpkEsVBruU_dgzB1jffeepyxHa0rlisonTqYO2AWhiL4s1RxGvJo=s0)

Visual Studio Code 测试运行器看起来与当前的 Dart 和 Flutter 测试运行器有些不同，它会在不同的会话中显示结果。Visual Studio Code 测试运行器还在编辑界面的左侧增加了新的间距图标 (Gutter icon)，显示测试的执行结果状态，可以点击它来运行测试 (或右键点击上下文菜单)。

![](https://gglh6.g.forms.cn/OEFD6Au4bXaGrKy1XVn5TEYGP-y3m3Kt1h52trrwVYLec0ShiaESW3-ymgosGuAOqpn_KudJH-Xa_IOGYRj9g-nvF6Qn5CEiZSB6CEdvSa76c0Sbx2FNx5-JNjSXTuejGjNIlcJG=s0)

在之后的版本，现有的 Dart 和 Flutter 测试运行器将被移除，而采用新的 Visual Studio Code 测试运行器。

而这仅仅是 Visual Studio Code 插件新功能和修正的冰山一角。所有详情，请查阅下列发布说明：

- [v3.26](https://dartcode.org/releases/v3-26/ "v3.26") VS Code Test Runner 集成，Flutter 创建设置，...
- [v3.25](https://dartcode.org/releases/v3-25/ "v3.25") 额外的依赖性管理改进，在文件 / 保存时修复所有，...
- [v3.24](https://dartcode.org/releases/v3-24/ "v3.24") 依赖关系树的改进，更容易启动配置，编辑器的改进
- [v3.23](https://dartcode.org/releases/v3-23/ "v3.23") 配置文件模式的改进，改进依赖关系树，改进 LSP

在以前的 Flutter 版本中，你可能会被那些你不希望处理的异常所困扰，你可能希望它们触发调试器并找出它们的源头，但却发现 Flutter 框架没有让异常通过来触发调试器中的「未处理的异常」处理程序。在这个版本中，调试器现在可以正确地中断未处理的异常，而以前这些异常只是被框架捕获 ([#17007](https://github.com/flutter/flutter/issues/17007 "#17007"))。这改善了调试的体验，调试器现在可以直接指向异常在代码中的抛出行，而不是指向框架深处的一个随机位置。与之相关的一个新功能是你能够决定 FutureBuilder 是否应该重新抛出或隐藏错误 ([#84308](https://github.com/flutter/flutter/pull/84308 "#84308"))。这应该会给你提供更多的异常，以帮助你追踪 Flutter 应用中的问题。

自从 Flutter 诞生以来，就有了 Counter 应用模板，它有很多优点：它展示了 Dart 语言的很多特性，演示了几个关键的 Flutter 概念，而且它足够小，即使有很多解释性的注释，也能装进一个文件。然而，它并未对 Flutter 应用的实际使用场景提供一个特别好的展示。在这个版本中，你可以通过以下命令创建一个新的模板 ([#83530](https://github.com/flutter/flutter/pull/83530 "#83530"))。

`$ flutter create -t skeleton my_app`

![新的 Flutter Skeleton 模板演示](https://files.flutter-io.cn/posts/flutter-cn/2021/whats-new-in-flutter-2-5/flutter-skeleton-demo.gif)

新的 Skeleton 模板，可生成包含两页的列表视图 Flutter 应用 (带详细视图)，并遵循社区最佳实践。它的开发经过了大量的内部和外部评审，以提供一个更好的基础来构建一个达到产品级品质的应用。它支持以下功能：

- 使用 ChangeNotifier 来协调多个小工具
- 默认情况下，使用 arb 文件生成本地化。
- 包括一个示例图像，并为图像资源建立了 1x、2x 和 3x 文件夹。
- 使用「功能优先」的文件夹组织方式
- 支持 shared_preference
- 支持浅色和深色主题设计
- 支持多页之间的导航

随着时间的推移和 Flutter 最佳实践的发展，希望这个新模板也能随之发展。

如果你正在开发一个插件而不是一个应用，你可能会对 Pigeon 1.0 版本感兴趣。Pigeon 是一个代码生成工具，用于生成 Flutter 和其宿主平台之间类型安全的交互代码。你可以定义插件的 API 描述，并为 Dart 与 Java / Objective-C / Kotlin / Swift 生成模板代码。

![Pigeon 生成的示例代码](https://gglh6.g.forms.cn/uzONXOqW9s2Vmw05F_ZFdAV_ys59HRphftET69Ra_KHy0qvkTAbZUxNhpWCXvWXPUgGvZQyJ1gmAFLrBpxq1LRHbJG5yEmI9vs8fSppLYAlc_sa-pKsP-xSdZWxhWF7PqSh6WiEL=s0)

Pigeon 已经应用在 Flutter 团队的一些插件中。这个版本提供了更多有用的错误信息，增加了对泛型、原始数据类型作为参数和返回类型以及多参数的支持，在未来它会被更广泛地使用。如果你想在自己的插件或 add-to-app 的项目中使用 Pigeon，请查阅 [pigeon 插件页面](https://pub.flutter-io.cn/packages/pigeon "pigeon 插件页面") 找到更多信息。

以下是 Flutter 2.5 版本中的破坏性改动：

- [默认的设备拖动和滚动](https://flutter.cn/docs/release/breaking-changes/default-scroll-behavior-drag "默认的设备拖动和滚动")
- [v2.2 版后删除了废弃的 API](https://flutter.cn/docs/release/breaking-changes/2-2-deprecations "v2.2 版后删除了废弃的 API")
- [Package 介绍: flutter_lints](https://flutter.cn/docs/release/breaking-changes/flutter-lints-package "Package 介绍: flutter_lints")
- [ThemeData 的 accent 属性已被弃用](https://flutter.cn/docs/release/breaking-changes/theme-data-accent-properties "ThemeData 的 accent 属性已被弃用")
- [手势识别器清理](https://flutter.cn/docs/release/breaking-changes/gesture-recognizer-add-allowed-pointer "手势识别器清理")
- [将 AnimationSheetBuilder.display 替换为 collate](https://flutter.cn/docs/release/breaking-changes/animation-sheet-builder-display "将 AnimationSheetBuilder.display 替换为 collate")
- [使用 HTML 插槽在 Web 中渲染平台视图](https://flutter.cn/docs/release/breaking-changes/platform-views-using-html-slots-web "使用 HTML 插槽在 Web 中渲染平台视图")
- [将 LogicalKeySet 迁移至 SingleActivator](https://github.com/flutter/flutter/pull/80756_yWRVR6Y "将 LogicalKeySet 迁移至 SingleActivator")

了解自 1.17 版本以来完整的破坏性改动列表，请参阅：[Flutter 文档网站](https://flutter.cn/docs/release/breaking-changes "Flutter 文档网站")。

随着我们继续更新 Flutter Fix (可在 IDE 中使用，也可通过 `dart fix` 命令使用)，我们总共应用了 157 条规则，来迁移受破坏性改动以及任何弃用影响的代码。一如既往，我们非常感谢社区 [提供的测试](https://github.com/flutter/tests/blob/master/README.md "提供的测试")，帮助我们识别了这些破坏性改动。如需了解更多，请查阅： [Flutter 破坏性改动政策](https://github.com/flutter/flutter/wiki/Tree-hygiene#handling-breaking-changes "Flutter 破坏性改动政策")。

另外，随着 Flutter 2.5 的发布，我们将放弃对 iOS 8 的支持，[正如 2020 年 9 月宣布](https://flutter.cn/go/rfc-ios8-deprecation "正如 2020 年 9 月宣布") 的那样。放弃对市场份额不足 1% 的 iOS 8 的支持，使 Flutter 团队能够专注于使用范围更广的新平台。弃用意味着这些平台可能可以正常使用 Flutter，但我们不会在这些平台上测试新版本的 Flutter 或插件。你可以在 [Flutter 文档网站](https://flutter.cn/docs/development/tools/sdk/release-notes/supported-platforms "Flutter 文档网站") 上看到 [目前 Flutter 支持的平台列表](https://flutter.cn/docs/development/tools/sdk/release-notes/supported-platforms "目前 Flutter 支持的平台列表")。

最后，一如既往地感谢世界各地的 Flutter 社区组织和社区成员们，是社区让这一切成为可能。在本次更新中贡献和审核 1000 多个 PR 的数百位开发者，因为有你们每个人的努力才成就了本次的成果。让我们携手共同努力，为世界各地的开发者共同转变应用的开发流程，让开发者们可以从一个代码库中交付更多应用、更快开发、部署到更多你所关心的平台。

敬请关注 Flutter 团队的更多更新，这一年还没有结束，拭目以待！

*感谢 flutter.cn 社区成员 (@AlexV525、@Vadaski、@MeandNi) 以及 Yuan 和 Lynn 对本文的审校和贡献。*
