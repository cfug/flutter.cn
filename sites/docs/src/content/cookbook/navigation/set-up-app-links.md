---
# title: Set up app links for Android
title: 为 Android 配置应用链接
# description: >-
#   Learn how to set up app links for an
#   Android application built with Flutter.
description: >-
  了解如何为使用 Flutter 构建的 Android 应用配置应用链接。
ai-translated: true
---

Deep linking is a mechanism for launching an app with a URI.
This URI contains scheme, host, and path,
and opens the app to a specific screen.

深度链接是一种通过 URI 启动应用的机制。
该 URI 包含 scheme、host 和 path，
可将应用打开到特定屏幕。

An _app link_ is a type of deep link that uses
`http` or `https` and is exclusive to Android devices.

_应用链接_ 是一种使用 `http` 或 `https` 的深度链接，仅适用于 Android 设备。

Setting up app links requires one to own a web domain.
Otherwise, consider using [Firebase Hosting][]
or [GitHub Pages][] as a temporary solution.

配置应用链接需要拥有自己的网站域名。
否则，可考虑使用 [Firebase Hosting][]
或 [GitHub Pages][] 作为临时方案。

Once you've set up your deep links, you can validate them.
To learn more, see [Validate deep links][].

配置好深度链接后，你可以验证它们。
了解更多，请参阅 [验证深度链接][Validate deep links]。

## 1. Customize a Flutter application

## 1. 自定义 Flutter 应用

Write a Flutter app that can handle an incoming URL.
This example uses the [go_router][] package to handle the routing.
The Flutter team maintains the `go_router` package.
It provides a simple API to handle complex routing scenarios.

编写能处理传入 URL 的 Flutter 应用。
本示例使用 [go_router][] package 处理路由。
Flutter 团队维护 `go_router` package。
它提供简单的 API 来处理复杂的路由场景。

 1. To create a new application, type `flutter create <app-name>`:

    要创建新应用，输入 `flutter create <app-name>`：

    ```console
    $ flutter create deeplink_cookbook
    ```

 2. To include `go_router` package in your app,
    add a dependency for `go_router` to the project:

    要在应用中包含 `go_router` package，
    向项目添加 `go_router` 依赖：

    To add the `go_router` package as a dependency,
    run `flutter pub add`:

    要将 `go_router` package 添加为依赖，运行 `flutter pub add`：

    ```console
    $ flutter pub add go_router
    ```

 3. To handle the routing,
    create a `GoRouter` object in the `main.dart` file:

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

## 2. Modify AndroidManifest.xml

## 2. 修改 AndroidManifest.xml

 1. Open the Flutter project with VS Code or Android Studio.

    使用 VS Code 或 Android Studio 打开 Flutter 项目。

 2. Navigate to `android/app/src/main/AndroidManifest.xml` file.

    导航到 `android/app/src/main/AndroidManifest.xml` 文件。

 3. Add the following metadata tag and intent filter inside the
   `<activity>` tag with `.MainActivity`.

    在带有 `.MainActivity` 的 `<activity>` 标签内添加以下元数据标签和 intent filter。

    Replace `example.com` with your own web domain.

    将 `example.com` 替换为你自己的网站域名。

    ```xml
    <intent-filter android:autoVerify="true">
        <action android:name="android.intent.action.VIEW" />
        <category android:name="android.intent.category.DEFAULT" />
        <category android:name="android.intent.category.BROWSABLE" />
        <data android:scheme="http" android:host="example.com" />
        <data android:scheme="https" />
    </intent-filter>
    ```

    :::version-note
    If you use a Flutter version earlier than 3.27,
    you need to manually opt in to deep linking by
    adding the following metadata tag to `<activity>`:

    如果你使用的 Flutter 版本早于 3.27，
    需要手动启用深度链接，向 `<activity>` 添加以下元数据标签：

    ```xml
    <meta-data android:name="flutter_deeplinking_enabled" android:value="true" />
    ```
    :::

    :::note
    If you use a third-party plugin to handle deep links,
    such as [app_links][],
    Flutter's default deeplink handler will
    break these plugins.

    如果你使用第三方插件处理深度链接，
    例如 [app_links][]，
    Flutter 的默认深度链接处理器会破坏这些插件。

    To opt out of using Flutter's default deep link handler,
    add the following metadata tag to `<activity>`:

    要退出使用 Flutter 的默认深度链接处理器，
    向 `<activity>` 添加以下元数据标签：

    ```xml
    <meta-data android:name="flutter_deeplinking_enabled" android:value="false" />
    ```
    :::

## 3. Hosting assetlinks.json file

## 3. 托管 assetlinks.json 文件

Host an `assetlinks.json` file in using a web server
with a domain that you own. This file tells the
mobile browser which Android application to open instead
of the browser. To create the file,
get the package name of the Flutter app you created in
the previous step and the sha256 fingerprint of the
signing key you will be using to build the APK.

在你拥有的域名的 Web 服务器上托管 `assetlinks.json` 文件。
该文件告诉移动浏览器应打开哪个 Android 应用，而不是浏览器。
要创建该文件，请获取上一步创建的 Flutter 应用的 package 名称，
以及用于构建 APK 的签名密钥的 sha256 指纹。

### Package name

### Package 名称

Locate the package name in `AndroidManifest.xml`,
the `package` property under `<manifest>` tag.
Package names are usually in the format of `com.example.*`.

在 `AndroidManifest.xml` 中查找 package 名称，
即 `<manifest>` 标签下的 `package` 属性。
Package 名称通常格式为 `com.example.*`。

### sha256 fingerprint

### sha256 指纹

The process might differ depending on how the apk is signed.

具体流程可能因 APK 签名方式而异。

#### Using google play app signing

#### 使用 Google Play 应用签名

You can find the sha256 fingerprint directly from play
developer console. Open your app in the play console,
under **Release> Setup > App Integrity> App Signing tab**:

你可以直接从 Play 开发者控制台找到 sha256 指纹。
在 Play 控制台中打开你的应用，
在 **Release > Setup > App Integrity > App Signing** 标签下：

<img src="/assets/images/docs/cookbook/set-up-app-links-pdc-signing-key.png" alt="Screenshot of sha256 fingerprint in play developer console" width="50%" />

#### Using local keystore

#### 使用本地 keystore

If you are storing the key locally,
you can generate sha256 using the following command:

如果你在本地存储密钥，
可以使用以下命令生成 sha256：

```console
keytool -list -v -keystore <path-to-keystore>
```

### assetlinks.json

The hosted file should look similar to this:

托管的文件应类似如下：

```json
[{
  "relation": ["delegate_permission/common.handle_all_urls"],
  "target": {
    "namespace": "android_app",
    "package_name": "com.example.deeplink_cookbook",
    "sha256_cert_fingerprints":
    ["FF:2A:CF:7B:DD:CC:F1:03:3E:E8:B2:27:7C:A2:E3:3C:DE:13:DB:AC:8E:EB:3A:B9:72:A1:0E:26:8A:F5:EC:AF"]
  }
}]
```

 1. Set the `package_name` value to your Android application ID.

    将 `package_name` 值设为你的 Android 应用 ID。

 2. Set sha256_cert_fingerprints to the value you got
    from the previous step.

    将 sha256_cert_fingerprints 设为上一步获得的值。

 3.  Host the file at a URL that resembles the following:
    `<webdomain>/.well-known/assetlinks.json`

    在类似以下结构的 URL 托管该文件：
    `<webdomain>/.well-known/assetlinks.json`

 4. Verify that your browser can access this file.

    验证浏览器能否访问该文件。

:::note
If you have multiple flavors, you can have many sha256_cert_fingerprint
values in the sha256_cert_fingerprints field.
Just add it to the sha256_cert_fingerprints list

如果你有多个 flavor，可以在 sha256_cert_fingerprints 字段中包含多个 sha256_cert_fingerprint 值。
只需将它们添加到 sha256_cert_fingerprints 列表中即可。
:::

## Testing

## 测试

You can use a real device or the Emulator to test an app link,
but first make sure you have executed `flutter run` at least once on
the devices. This ensures that the Flutter application is installed.

你可以使用真机或模拟器测试应用链接，
但请先在设备上至少执行一次 `flutter run`。
这确保 Flutter 应用已安装。

<img src="/assets/images/docs/cookbook/set-up-app-links-emulator-installed.png" alt="Emulator screenshot" width="50%" />

To test **only** the app setup, use the adb command:

要**仅**测试应用配置，使用 adb 命令：

```console
adb shell 'am start -a android.intent.action.VIEW \
    -c android.intent.category.BROWSABLE \
    -d "http://<web-domain>/details"' \
    <package name>
```

:::note
This doesn't test whether the web files are
hosted correctly,
the command launches the app even
if web files are not presented.

这不会测试 Web 文件是否正确托管，
即使 Web 文件不存在，该命令也会启动应用。
:::

To test **both** web and app setup, you must click a link
directly through web browser or another app.
One way is to create a Google Doc, add the link, and tap on it.

要**同时**测试 Web 和应用配置，你必须通过 Web 浏览器或其他应用直接点击链接。
一种方法是创建 Google 文档，添加链接并点击它。

:::note
If you are debugging locally (and not downloading the app from the Play Store),
you might need to enable the toggle for **Supported web addresses** manually.

如果你在本地调试（而不是从 Play 商店下载应用），
可能需要手动启用 **Supported web addresses** 开关。
:::

If everything is set up correctly, the Flutter application
launches and displays the details screen:

如果一切配置正确，Flutter 应用会启动并显示详情屏幕：

<img src="/assets/images/docs/cookbook/set-up-app-links-emulator-deeplinked.png" alt="Deeplinked Emulator screenshot" width="50%" />

## Appendix

## 附录

Source code: [deeplink_cookbook][]

源代码：[deeplink_cookbook 示例][deeplink_cookbook]

[deeplink_cookbook]: {{site.github}}/flutter/codelabs/tree/main/deeplink_cookbook
[Firebase Hosting]: {{site.firebase}}/docs/hosting
[go_router]: {{site.pub}}/packages/go_router
[GitHub Pages]: https://pages.github.com
[app_links]: {{site.pub}}/packages/app_links
[Signing the app]: /deployment/android#signing-the-app
[Validate deep links]: /tools/devtools/deep-links
