### Use frameworks in Xcode and Flutter framework as podspec {:#method-c .no_toc}

### 在 Xcode 中使用 framework，并将 Flutter framework 作为 podspec {:#method-c .no_toc}

#### Approach {:#method-c-approach}

#### 方法 {:#method-c-approach}

This method generates Flutter as a CocoaPods podspec instead of
distributing the large `Flutter.xcframework` to other developers,
machines, or continuous integration systems.
Flutter still generates iOS frameworks for your compiled Dart code,
and for each of your Flutter plugins.
Embed these frameworks and update your existing application's build settings.

此方法将 Flutter 生成为 CocoaPods podspec，而不是将大型 `Flutter.xcframework` 分发给其他开发者、机器或持续集成系统。
Flutter 仍会为已编译的 Dart 代码以及每个 Flutter plugin 生成 iOS framework。
嵌入这些 framework 并更新现有应用的构建设置。

#### Requirements {:#method-c-reqs}

#### 要求 {:#method-c-reqs}

No additional software or hardware requirements are needed for this method.
Use this method in the following use cases:

此方法不需要额外的软件或硬件。
在以下用例中使用此方法：

* Members of your team can't install the Flutter SDK and CocoaPods

* 团队成员无法安装 Flutter SDK 和 CocoaPods

* You don't want to use CocoaPods as a dependency manager in existing iOS apps

* 你不想在现有 iOS app 中使用 CocoaPods 作为依赖管理器

#### Limitations {:#method-c-limits}

#### 限制 {:#method-c-limits}

{% render "docs/add-to-app/ios-project/limits-common-deps.md" %}

This method only works with the `beta` or `stable` [release channels][].

此方法仅适用于 `beta` 或 `stable` [发布渠道][release channels]。

[release channels]: /install/upgrade#switching-flutter-channels

#### Example project structure {:#method-c-structure}

#### 示例项目结构 {:#method-c-structure}

{% render "docs/add-to-app/ios-project/embed-framework-directory-tree.md" %}

#### Add Flutter engine to your Podfile

#### 将 Flutter engine 添加到你的 Podfile

Host apps using CocoaPods can add the Flutter engine to their Podfile.

使用 CocoaPods 的宿主 app 可以将 Flutter engine 添加到其 Podfile。

```ruby title="MyApp/Podfile"
pod 'Flutter', :podspec => '/path/to/MyApp/Flutter/[![build mode]!]/Flutter.podspec'
```

:::note
You must hard code the `[build mode]` value.
For example, use `Debug` if you need to use `flutter attach`
and `Release` when you're ready to ship.

你必须硬编码 `[build mode]` 值。
例如，若需要使用 `flutter attach` 请使用 `Debug`，准备发布时使用 `Release`。
:::

#### Link and embed app and plugin frameworks

#### 链接并嵌入 app 与 plugin framework

{% render "docs/add-to-app/ios-project/link-and-embed.md" %}
