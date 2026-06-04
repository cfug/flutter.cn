---
# title: Leveraging Apple's system APIs and frameworks
title: 利用 Apple 系统 API 与框架
# description: >-
#   Learn about Flutter plugins that offer equivalent
#   functionalities to Apple's frameworks.
description: >-
  了解提供与 Apple 框架等价功能的 Flutter 插件。
ai-translated: true
---

When you come from iOS development, you might need to find
Flutter plugins that offer the same abilities as Apple's system
libraries. This might include accessing device hardware or interacting
with specific frameworks like `HealthKit`.

若你来自 iOS 开发背景，可能需要找到与 Apple 系统库能力相当的 Flutter 插件，例如访问设备硬件或与 `HealthKit` 等特定框架交互。

For an overview of how the SwiftUI framework compares to Flutter,
see [Flutter for SwiftUI developers][].

要了解 SwiftUI 框架与 Flutter 的对比，请参阅 [面向 SwiftUI 开发者的 Flutter 指南][]。

## Introducing Flutter plugins

## Flutter 插件简介

Dart calls libraries that contain platform-specific code _plugins_,
short for "plugin package".
When developing an app with Flutter, you use _plugins_ to interact
with system libraries.

Dart 将包含平台相关代码的库称为 _plugins_（plugin package 的缩写）。使用 Flutter 开发应用时，通过 _plugins_ 与系统库交互。

In your Dart code, you use the plugin's Dart API to call the native
code from the system library being used. This means that you can write
the code to call the Dart API. The API then makes it work for all
platforms that the plugin supports.

在 Dart 代码中，你使用插件的 Dart API 调用所用系统库中的原生代码。也就是说，你只需编写调用 Dart API 的代码，API 会在插件支持的所有平台上生效。

To learn more about plugins, see [Using packages][].
Though this page links to some popular plugins,
you can find thousands more, along with examples,
on [pub.dev][].
The following table does not endorse any particular plugin.
If you can't find a package that meets your needs,
you can create your own or
use platform channels directly in your project.
To learn more, check out [Writing platform-specific code][].

有关插件的更多信息，请参阅 [使用 package][]。本页虽链接了一些常用插件，你仍可在 [pub.dev][] 上找到数千个插件及示例。下表不代表对任何特定插件的背书。若找不到满足需求的 package，可自行创建或在项目中直接使用 platform channel。详情请参阅 [编写平台相关代码][]。

## Adding a plugin to your project

## 向项目添加插件

To use an Apple framework within your native project,
import it into your Swift or Objective-C file.

要在原生项目中使用 Apple 框架，请将其导入 Swift 或 Objective-C 文件。

To add a Flutter plugin, run `flutter pub add package_name`
from the root of your project.
This adds the dependency to your [`pubspec.yaml`][] file.
After you add the dependency, add an `import` statement for the package
in your Dart file.

要添加 Flutter 插件，在项目根目录运行 `flutter pub add package_name`。这会将依赖写入 [`pubspec.yaml`][]。添加依赖后，在 Dart 文件中 `import` 该 package。

You might need to change app settings or initialization logic.
If that's needed, the package's "Readme" page on [pub.dev][]
should provide details.

你可能需要修改应用设置或初始化逻辑；如有需要，[pub.dev][] 上该 package 的「Readme」页面会提供说明。

### Flutter Plugins and Apple Frameworks

### Flutter 插件与 Apple 框架

| Use Case                                       | Apple Framework or Class                                                              | Flutter Plugin               |
|------------------------------------------------|---------------------------------------------------------------------------------------|------------------------------|
| 使用场景                                       | Apple 框架或类                                                                        | Flutter 插件                 |
| Access the photo library                       | `PhotoKit` using the `Photos` and `PhotosUI ` frameworks and `UIImagePickerController`| [`image_picker`][]           |
| 访问照片库                                     | 使用 `Photos`、`PhotosUI` 框架及 `UIImagePickerController` 的 `PhotoKit`              | [`image_picker`][]           |
| Access the camera                              | `UIImagePickerController` using the `.camera` `sourceType`                            | [`image_picker`][]           |
| 访问相机                                       | 使用 `.camera` `sourceType` 的 `UIImagePickerController`                              | [`image_picker`][]           |
| Use advanced camera features                   | `AVFoundation`                                                                        | [`camera`][]                 |
| 使用高级相机功能                               | `AVFoundation`                                                                        | [`camera`][]                 |
| Offer In-app purchases                         | `StoreKit`                                                                            | [`in_app_purchase`][][^1]    |
| 提供应用内购买                                 | `StoreKit`                                                                            | [`in_app_purchase`][][^1]    |
| Process payments                               | `PassKit`                                                                             | [`pay`][][^2]                |
| 处理支付                                       | `PassKit`                                                                             | [`pay`][][^2]                |
| Send push notifications                        | `UserNotifications`                                                                   | [`firebase_messaging`][][^3] |
| 发送推送通知                                   | `UserNotifications`                                                                   | [`firebase_messaging`][][^3] |
| Access GPS coordinates                         | `CoreLocation`                                                                        | [`geolocator`][]             |
| 获取 GPS 坐标                                  | `CoreLocation`                                                                        | [`geolocator`][]             |
| Access sensor data[^4]                         | `CoreMotion`                                                                          | [`sensors_plus`][]           |
| 访问传感器数据[^4]                             | `CoreMotion`                                                                          | [`sensors_plus`][]           |
| Make network requests                          | `URLSession`                                                                          | [`http`][]                   |
| 发起网络请求                                   | `URLSession`                                                                          | [`http`][]                   |
| Store key-values                               | `@AppStorage` property wrapper and `NSUserDefaults`                                   | [`shared_preferences`][]     |
| 存储键值对                                     | `@AppStorage` 属性包装器与 `NSUserDefaults`                                           | [`shared_preferences`][]     |
| Persist to a database                          | `CoreData` or SQLite                                                                  | [`sqflite`][]                |
| 持久化到数据库                                 | `CoreData` 或 SQLite                                                                  | [`sqflite`][]                |
| Access health data                             | `HealthKit`                                                                           | [`health`][]                 |
| 访问健康数据                                   | `HealthKit`                                                                           | [`health`][]                 |
| Use machine learning                           | `CoreML`                                                                              | [`google_ml_kit`][][^5]      |
| 使用机器学习                                   | `CoreML`                                                                              | [`google_ml_kit`][][^5]      |
| Recognize text                                 | `VisionKit`                                                                           | [`google_ml_kit`][][^5]      |
| 识别文字                                       | `VisionKit`                                                                           | [`google_ml_kit`][][^5]      |
| Recognize speech                               | `Speech`                                                                              | [`speech_to_text`][]         |
| 语音识别                                       | `Speech`                                                                              | [`speech_to_text`][]         |
| Use augmented reality                          | `ARKit`                                                                               | [`ar_flutter_plugin`][]      |
| 使用增强现实                                   | `ARKit`                                                                               | [`ar_flutter_plugin`][]      |
| Access weather data                            | `WeatherKit`                                                                          | [`weather`][][^6]            |
| 访问天气数据                                   | `WeatherKit`                                                                          | [`weather`][][^6]            |
| Access and manage contacts                     | `Contacts`                                                                            | [`contacts_service`][]       |
| 访问和管理联系人                               | `Contacts`                                                                            | [`contacts_service`][]       |
| Expose quick actions on the home screen        | `UIApplicationShortcutItem`                                                           | [`quick_actions`][]          |
| 在主屏幕暴露快捷操作                           | `UIApplicationShortcutItem`                                                         | [`quick_actions`][]          |
| Index items in Spotlight search                | `CoreSpotlight`                                                                       | [`flutter_core_spotlight`][] |
| 在 Spotlight 搜索中建立索引                    | `CoreSpotlight`                                                                       | [`flutter_core_spotlight`][] |
| Configure, update and communicate with Widgets | `WidgetKit`                                                                           | [`home_widget`][]            |
| 配置、更新 widget 并与之通信                   | `WidgetKit`                                                                           | [`home_widget`][]            |
| Automate app actions with Siri/Shortcuts       | `AppIntents`                                                                          | [`intelligence`][]            |
| 通过 Siri/快捷指令自动化应用操作               | `AppIntents`                                                                          | [`intelligence`][]            |

{:.table .table-striped .nowrap}

[^1]: Supports both Google Play Store on Android and Apple App Store on iOS.
[^1]: 同时支持 Android 的 Google Play 商店与 iOS 的 Apple App Store。
[^2]: Adds Google Pay payments on Android and Apple Pay payments on iOS.
[^2]: 在 Android 上添加 Google Pay，在 iOS 上添加 Apple Pay。
[^3]: Uses Firebase Cloud Messaging and integrates with APNs.
[^3]: 使用 Firebase Cloud Messaging 并与 APNs 集成。
[^4]: Includes sensors like accelerometer, gyroscope, etc.
[^4]: 包括加速度计、陀螺仪等传感器。
[^5]: Uses Google's ML Kit and supports various features like text recognition, face detection, image labeling, landmark recognition, and barcode scanning. You can also create a custom model with Firebase. To learn more, see [Use a custom TensorFlow Lite model with Flutter][].
[^5]: 使用 Google ML Kit，支持文字识别、人脸检测、图像标注、地标识别、条码扫描等。也可通过 Firebase 创建自定义模型。详情请参阅 [在 Flutter 中使用自定义 TensorFlow Lite 模型][]。
[^6]: Uses the [OpenWeatherMap API][]. Other packages exist that can pull from different weather APIs.
[^6]: 使用 [OpenWeatherMap API][]。另有 package 可从其他天气 API 拉取数据。

[Flutter for SwiftUI developers]: /flutter-for/swiftui-devs
[面向 SwiftUI 开发者的 Flutter 指南]: /flutter-for/swiftui-devs
[Using packages]: /packages-and-plugins/using-packages
[使用 package]: /packages-and-plugins/using-packages
[pub.dev]: {{site.pub-pkg}}
[`shared_preferences`]: {{site.pub-pkg}}/shared_preferences
[`http`]: {{site.pub-pkg}}/http
[`sensors_plus`]: {{site.pub-pkg}}/sensors_plus
[`geolocator`]: {{site.pub-pkg}}/geolocator
[`image_picker`]: {{site.pub-pkg}}/image_picker
[`pubspec.yaml`]: /tools/pubspec
[`quick_actions`]: {{site.pub-pkg}}/quick_actions
[`in_app_purchase`]: {{site.pub-pkg}}/in_app_purchase
[`pay`]: {{site.pub-pkg}}/pay
[`firebase_messaging`]: {{site.pub-pkg}}/firebase_messaging
[`google_ml_kit`]: {{site.pub-pkg}}/google_ml_kit
[Use a custom TensorFlow Lite model with Flutter]: {{site.firebase}}/docs/ml/flutter/use-custom-models
[在 Flutter 中使用自定义 TensorFlow Lite 模型]: {{site.firebase}}/docs/ml/flutter/use-custom-models
[`speech_to_text`]: {{site.pub-pkg}}/speech_to_text
[`ar_flutter_plugin`]: {{site.pub-pkg}}/ar_flutter_plugin
[`weather`]: {{site.pub-pkg}}/weather
[`contacts_service`]: {{site.pub-pkg}}/contacts_service
[`health`]: {{site.pub-pkg}}/health
[OpenWeatherMap API]: https://openweathermap.org/api
[`sqflite`]: {{site.pub-pkg}}/sqflite
[Writing platform-specific code]: /platform-integration/platform-channels
[编写平台相关代码]: /platform-integration/platform-channels
[`camera`]: {{site.pub-pkg}}/camera
[`flutter_core_spotlight`]: {{site.pub-pkg}}/flutter_core_spotlight
[`home_widget`]: {{site.pub-pkg}}/home_widget
[`intelligence`]: {{site.pub-pkg}}/intelligence
