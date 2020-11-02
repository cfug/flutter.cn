---
title: "Adding an Apple Watch extension"
title: 作为 Apple Watch 插件
description: "Learn how to add an Apple Watch target to a Flutter app."
description: "学习将 Apple Watch target 添加到 Flutter app"
tags: 平台集成
keywords: Apple Watch,手表,Flutter嵌入式
---

While you cannot build an Apple Watch app with Flutter,
it is possible to add a native Apple Watch extension to a Flutter app.

虽然您不能使用 Flutter 构建 Apple Watch 应用程序，
但可以向 Flutter 应用程序添加 Apple Watch 的本地扩展。

## Step 1: Enable bitcode in Xcode

## 步骤 1: 在 Xcode 中开启 bitcode

Apple Watch targets require bitcode to be enabled,
so follow the steps in
[Creating an iOS Bitcode enabled app](https://github.com/flutter/flutter/wiki/Creating-an-iOS-Bitcode-enabled-app)
to use bitcode in your app.

Apple Watch target 要求启用 bitcode，
因此请按照 
[创建支持 bitcode 的 iOS 应用程序](https://github.com/flutter/flutter/wiki/Creating-an-iOS-Bitcode-enabled-app) 
中的步骤在您的应用程序中使用 bitcode。

## Step 2: Add an Apple Watch target

## 步骤 2: 添加一个 Apple Watch target

In the menu, select **File > New > Target**. Once the dialog opens, select
**watchOS** at the top and click **Watch App for iOS App**. Click **Next**, 
enter a product name, and select **Enter**.

在菜单中，选择 **File > New > Target**。
当对话框打开后，在顶部选择 **watchOS** 并且点击 **Watch App for iOS App**。
然后，点击 **Next**，输入产品名，最后选择 **Enter**。

![Adding an Apple Watch target](/images/AppleWatchTarget.png){:width="70%"}

[Creating an iOS Bitcode enabled app]: {{site.github}}/flutter/flutter/wiki/Creating-an-iOS-Bitcode-enabled-app-(experimental)
