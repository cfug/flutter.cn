### Link and Embed frameworks in Xcode {:#method-b .no_toc}

### 在 Xcode 中链接并嵌入 framework {:#method-b .no_toc}

#### Approach {:#method-b-approach}

#### 方法 {:#method-b-approach}

In this second method, edit your existing Xcode project,
generate the necessary frameworks, and embed them in your app.
Flutter generates iOS frameworks for Flutter itself,
for your compiled Dart code, and for each of your Flutter plugins.
Embed these frameworks and update your existing application's build settings.

在第二种方法中，编辑你现有的 Xcode 项目，生成所需的 framework，并将其嵌入 app。
Flutter 会为 Flutter 自身、你已编译的 Dart 代码以及每个 Flutter plugin 生成 iOS framework。
嵌入这些 framework 并更新现有应用的构建设置。

#### Requirements {:#method-b-reqs}

#### 要求 {:#method-b-reqs}

No additional software or hardware requirements are needed for this method.
Use this method in the following use cases:

此方法不需要额外的软件或硬件。
在以下用例中使用此方法：

* Members of your team can't install the Flutter SDK and CocoaPods

  团队成员无法安装 Flutter SDK 和 CocoaPods

* You don't want to use CocoaPods as a dependency manager in existing iOS apps

  你不想在现有 iOS app 中使用 CocoaPods 作为依赖管理器

#### Limitations {:#method-b-limits}

#### 限制 {:#method-b-limits}

{% render "docs/add-to-app/ios-project/limits-common-deps.md" %}

#### Example project structure {:#method-b-structure}

#### 示例项目结构 {:#method-b-structure}

{% render "docs/add-to-app/ios-project/embed-framework-directory-tree.md" %}

#### Procedures

#### 步骤

How you link, embed, or both the generated frameworks
into your existing app in Xcode depends on the type of framework.

在 Xcode 中将生成的 framework 链接、嵌入或同时执行两者，取决于 framework 的类型。

* Link and embed dynamic frameworks.

  链接并嵌入动态 framework。

* Link static frameworks. [Never embed them][static-framework].

  链接静态 framework。[切勿嵌入它们][static-framework]。

{% render "docs/add-to-app/ios-project/link-and-embed.md" %}

[static-framework]: https://developer.apple.com/library/archive/technotes/tn2435/_index.html
