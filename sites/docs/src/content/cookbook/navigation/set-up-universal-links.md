---
# title: Set up universal links for iOS
title: 为 iOS 配置通用链接
# description: >-
#    Learn how to set up universal links for an
#    iOS application built with Flutter.
description: >-
   了解如何为使用 Flutter 构建的 iOS 应用配置通用链接。
ai-translated: true
---

Deep linking allows an app user to launch an app with a URI.
This URI contains scheme, host, and path,
and opens the app to a specific screen.

深度链接允许应用用户通过 URI 启动应用。
该 URI 包含 scheme、host 和 path，
可将应用打开到特定屏幕。

A _universal link_, a type of deep link exclusive to iOS devices,
uses only the `http` or `https` protocols.

_通用链接_ 是一种仅适用于 iOS 设备的深度链接类型，
只使用 `http` 或 `https` 协议。

To set up universal links, you need to own a web domain.
As a temporary solution,
consider using [Firebase Hosting][] or [GitHub Pages][].

要配置通用链接，你需要拥有自己的网站域名。
作为临时方案，
可考虑使用 [Firebase Hosting][] 或 [GitHub Pages][]。

Once you've set up your deep links, you can validate them.
To learn more, see [Validate deep links][].

配置好深度链接后，你可以验证它们。
了解更多，请参阅 [验证深度链接][Validate deep links]。

## Create or modify a Flutter app

## 创建或修改 Flutter 应用

Write a Flutter app that can handle an incoming URL.

编写能处理传入 URL 的 Flutter 应用。

This example uses the [go_router][] package to handle the routing.
The Flutter team maintains the `go_router` package.
It provides a simple API to handle complex routing scenarios.

本示例使用 [go_router][] package 处理路由。
Flutter 团队维护 `go_router` package。
它提供简单的 API 来处理复杂的路由场景。

1. To create a new application, type `flutter create <app-name>`.

   要创建新应用，输入 `flutter create <app-name>`。

    ```console
    $ flutter create deeplink_cookbook
    ```

2. To include the `go_router` package as a dependency,
   run `flutter pub add`:

   要将 `go_router` package 添加为依赖，运行 `flutter pub add`：

    ```console
    $ flutter pub add go_router
    ```

3. To handle the routing, create a `GoRouter` object in the `main.dart` file:

   要处理路由，在 `main.dart` 文件中创建 `GoRouter` 对象：

    ```dart title="main.dart"
    import 'package:flutter/material.dart';
    import 'package:go_router/go_router.dart';

    void main() => runApp(MaterialApp.router(routerConfig: router));

    /// This handles '/' and '/details'.
    final router = GoRouter(
      routes: [
        GoRoute(
          path: '/',
          builder: (_, _) => Scaffold(
            appBar: AppBar(title: const Text('Home Screen')),
          ),
          routes: [
            GoRoute(
              path: 'details',
              builder: (_, _) => Scaffold(
                appBar: AppBar(title: const Text('Details Screen')),
              ),
            ),
          ],
        ),
      ],
    );
    ```

## Adjust iOS build settings

## 调整 iOS 构建设置

1. Launch Xcode.

   启动 Xcode。

1. Open the `ios/Runner.xcworkspace` file inside the
   Flutter project's `ios` folder.

   打开 Flutter 项目 `ios` 文件夹内的 `ios/Runner.xcworkspace` 文件。

   :::version-note
   If you use a Flutter version earlier than 3.27,
   you need to manually opt in to deep linking by adding the
   key and value pair `FlutterDeepLinkingEnabled` and `YES` to `info.Plist`.

   如果你使用的 Flutter 版本早于 3.27，
   需要手动启用深度链接，向 `info.Plist` 添加键值对 `FlutterDeepLinkingEnabled` 和 `YES`。
   :::

   :::note
   If you're using third-party plugins to handle deep links,
   such as [app_links][],
   Flutter's default deeplink handler will
   break these plugins.

   如果你使用第三方插件处理深度链接，
   例如 [app_links][]，
   Flutter 的默认深度链接处理器会破坏这些插件。

   If you use a third-party plugin, add the
   key and value pair `FlutterDeepLinkingEnabled` and `NO` to `info.Plist`.
   
   如果你使用第三方插件，向 `info.Plist` 添加键值对 `FlutterDeepLinkingEnabled` 和 `NO`。
   :::

### Add associated domains

### 添加关联域

:::warning
Personal development teams don't support the Associated Domains
capability. To add associated domains, choose the IDE tab.

个人开发团队不支持关联域（Associated Domains）功能。
要添加关联域，请选择 IDE 标签页。
:::

<Tabs key="darwin-editors">
<Tab name="Xcode">

1. Launch Xcode if necessary.

   如有必要，启动 Xcode。

1. Click the top-level **Runner**.

   点击顶层的 **Runner**。

1. In the Editor, click the **Runner** target.

   在编辑器中，点击 **Runner** target。

1. Click **Signing & Capabilities**.

   点击 **Signing & Capabilities**。

1. To add a new domain, click **+ Capability** under
   **Signing & Capabilities**.

   要添加新域，在 **Signing & Capabilities** 下点击 **+ Capability**。

1. Click **Associated Domains**.

   点击 **Associated Domains**。

   <img
      src="/assets/images/docs/cookbook/set-up-universal-links-associated-domains.png"
      alt="Xcode associated domains screenshot"
      width="100%" />

1. In the **Associated Domains** section, click **+**.

   在 **Associated Domains** 部分，点击 **+**。

1. Enter `applinks:<web domain>`. Replace `<web domain>` with your own domain name.

   输入 `applinks:<web domain>`。将 `<web domain>` 替换为你自己的域名。

   <img
      src="/assets/images/docs/cookbook/set-up-universal-links-add-associated-domains.png"
      alt="Xcode add associated domains screenshot"
      width="100%" />

</Tab>
<Tab name="Other editors">

1. Open the `ios/Runner/Runner.entitlements` XML file in your preferred editor.

   在你偏好的编辑器中打开 `ios/Runner/Runner.entitlements` XML 文件。

1. Add an associated domain inside the `<dict>` tag.

   在 `<dict>` 标签内添加关联域。

   ```xml
   <?xml version="1.0" encoding="UTF-8"?>
   <!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
   <plist version="1.0">
   <dict>
     [!<key>com.apple.developer.associated-domains</key>!]
     [!<array>!]
       [!<string>applinks:example.com</string>!]
     [!</array>!]
   </dict>
   </plist>
   ```

1. Save the `ios/Runner/Runner.entitlements` file.

   保存 `ios/Runner/Runner.entitlements` 文件。

To check that the associated domains you created are available,
perform the following steps:

要检查你创建的关联域是否可用，请执行以下步骤：

1. Launch Xcode if necessary.

   如有必要，启动 Xcode。

1. Click the top-level **Runner**.

   点击顶层的 **Runner**。

1. In the Editor, click the **Runner** target.

   在编辑器中，点击 **Runner** target。

1. Click **Signing & Capabilities**.
   The domains should appear in the
   **Associated Domains** section.

   点击 **Signing & Capabilities**。
   域应出现在 **Associated Domains** 部分。

   <img
      src="/assets/images/docs/cookbook/set-up-universal-links-add-associated-domains.png"
      alt="Xcode add associated domains screenshot"
      width="100%" />

</Tab>
</Tabs>

You have finished configuring the application for deep linking.

你已完成应用的深度链接配置。

## Associate your app with your web domain

## 将应用与网站域名关联

You need to host an `apple-app-site-association` file in the web domain.
This file tells the mobile browser which
iOS application to open instead of the browser.
To create the file, find the `appID` of the Flutter app you
created in the previous section.

你需要在网站域名上托管 `apple-app-site-association` 文件。
该文件告诉移动浏览器应打开哪个 iOS 应用，而不是浏览器。
要创建该文件，请找到上一节创建的 Flutter 应用的 `appID`。

### Locate components of the `appID`

### 定位 `appID` 的组成部分

Apple formats the `appID` as `<team id>.<bundle id>`.

Apple 将 `appID` 格式化为 `<team id>.<bundle id>`。

* Locate the bundle ID in the Xcode project.

  在 Xcode 项目中定位 bundle ID。

* Locate the team ID in the [developer account][].

  在 [开发者账户][developer account] 中定位 team ID。

**For example:** Given a team ID of `S8QB4VV633`
and a bundle ID of `com.example.deeplinkCookbook`,
you would enter an `appID` entry of
`S8QB4VV633.com.example.deeplinkCookbook`.

**例如：** 给定 team ID 为 `S8QB4VV633`，
bundle ID 为 `com.example.deeplinkCookbook`，
你应输入 `appID` 条目
`S8QB4VV633.com.example.deeplinkCookbook`。

### Create and host `apple-app-site-association` JSON file

### 创建并托管 `apple-app-site-association` JSON 文件

This file uses the JSON format.
Don't include the `.json` file extension when you save this file.
Per [Apple's documentation][apple-app-site-assoc],
this file should resemble the following content:

该文件使用 JSON 格式。
保存时不要包含 `.json` 文件扩展名。
根据 [Apple 文档][apple-app-site-assoc]，
该文件应类似以下内容：

```json
{
  "applinks": {
    "apps": [],
    "details": [
      {
        "appIDs": [
          "S8QB4VV633.com.example.deeplinkCookbook"
        ],
        "paths": [
          "*"
        ],
        "components": [
          {
            "/": "/*"
          }
        ]
      }
    ]
  },
  "webcredentials": {
    "apps": [
      "S8QB4VV633.com.example.deeplinkCookbook"
    ]
  }
}
```

1. Set one value in the `appIDs` array to
   `<team id>.<bundle id>`.

   将 `appIDs` 数组中的一个值设为 `<team id>.<bundle id>`。

1. Set the `paths` array to `["*"]`.
   The `paths` array specifies the allowed universal links.
   Using the asterisk, `*` redirects every path to the Flutter app.
   If needed, change the `paths` array value to a setting more
   appropriate to your app.

   将 `paths` 数组设为 `["*"]`。
   `paths` 数组指定允许的通用链接。
   使用星号 `*` 会将每个路径重定向到 Flutter 应用。
   如有需要，将 `paths` 数组值改为更适合你应用的设置。

1. Host the file at a URL that resembles the following structure.

   在类似以下结构的 URL 托管该文件。

   `<webdomain>/.well-known/apple-app-site-association`

1. Verify that your browser can access this file.

   验证浏览器能否访问该文件。

:::note
If you have more than one scheme/flavor, you can
add more than one `appID` into the `appIDs` field.

如果你有多个 scheme/flavor，可以在 `appIDs` 字段中添加多个 `appID`。
:::

## Test the universal link

## 测试通用链接

Test a universal link using a physical iOS device or the Simulator.

使用实体 iOS 设备或模拟器测试通用链接。

:::note
It might take up to 24 hours before Apple's [Content Delivery Network][] (CDN)
requests the `apple-app-site-association` (AASA) file from your web domain.
Until the CDN requests the file, the universal link won't work.
To bypass Apple's CDN, check out the [alternate mode section][].

Apple 的 [内容分发网络][Content Delivery Network] (CDN) 可能需要最多 24 小时
才会从你的网站域名请求 `apple-app-site-association` (AASA) 文件。
在 CDN 请求该文件之前，通用链接不会生效。
要绕过 Apple 的 CDN，请参阅 [备用模式部分][alternate mode section]。
:::

1. Before testing,
   install the Flutter app on the iOS device or Simulator,
   Use `flutter run` on the desired device.

   测试前，在 iOS 设备或模拟器上安装 Flutter 应用，
   在目标设备上使用 `flutter run`。

   <img
       src="/assets/images/docs/cookbook/set-up-universal-links-simulator.png"
       alt="Simulator screenshot"
       width="50%" />

   When complete,
   the Flutter app displays on the home screen of the
   iOS device or Simulator.

   完成后，Flutter 应用会显示在 iOS 设备或模拟器的主屏幕上。

1. If you test using the Simulator, use the Xcode CLI:

   如果使用模拟器测试，使用 Xcode CLI：

   ```console
   $ xcrun simctl openurl booted https://<web domain>/details
   ```

1. If you test with a physical iOS device:

   如果使用实体 iOS 设备测试：

   1. Launch the **Note** app.

      启动 **备忘录** 应用。

   1. Type the URL in the **Note** app.

      在 **备忘录** 应用中输入 URL。

   1. Click the resulting link.

      点击生成的链接。

   If successful, the Flutter app launches and displays its details screen.

   如果成功，Flutter 应用会启动并显示其详情屏幕。

   <img
      src="/assets/images/docs/cookbook/set-up-universal-links-simulator-deeplinked.png"
      alt="Deeplinked Simulator screenshot"
      width="50%" />

## Find the source code

## 查找源代码

You can find the source code for the [deeplink_cookbook][]
recipe in the GitHub repo.

你可以在 GitHub 仓库中找到 [deeplink_cookbook 示例][deeplink_cookbook] 食谱的源代码。

[Content Delivery Network]: https://en.wikipedia.org/wiki/Content_delivery_network
[apple-app-site-assoc]: {{site.apple-dev}}/documentation/xcode/supporting-associated-domains
[alternate mode section]: {{site.apple-dev}}/documentation/bundleresources/entitlements/com_apple_developer_associated-domains?language=objc
[deeplink_cookbook]: {{site.repo.organization}}/codelabs/tree/main/deeplink_cookbook
[developer account]: {{site.apple-dev}}/account
[Firebase Hosting]: {{site.firebase}}/docs/hosting
[go_router]: {{site.pub-pkg}}/go_router
[GitHub Pages]: https://pages.github.com
[app_links]: {{site.pub-pkg}}/app_links
[Validate deep links]: /tools/devtools/deep-links
