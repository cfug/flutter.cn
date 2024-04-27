---
title: 使用 DartPad 制作代码实践教程
toc: true
---

![](https://devrel.andfun.cn/devrel/posts/2022/06/183a339569ee9.png)

DartPad 是一个开源的、在浏览器中体验和运行 Dart 编程语言的线上编辑器，目标是为了帮助开发者更好地了解 Dart 编程语言以及 Flutter 应用开发。

DartPad 项目起始于 2015 年，最初只是一个在线的编译器，可以编译、分析和显示 Dart 代码运行结果。后期主要进行过几次重要的改进：
- 2019 年 12 月，新版的 DartPad 发布，不仅推出了独立的访问域名 (dartpad.dev)，同时也支持运行 Flutter 应用 (通过网页展现)
- 2020 年 4 月，CodePen 开始支持 Flutter 应用，其使用了与 DartPad 相同的后端处理
- 2020 年 10 月，DartPad 空安全版本上线，为开发者们提供空安全编译环境的 Dart SDK
- 2021 年 5 月，DartPad 正式支持 Workshop 格式内容
- 2021 年 11 月，DartPad 支持 SDK 版本切换 (Stable / Beta / Old)，并引入一些常用的 package，比如 Google 字体 (google_fonts)、bloc、http、intl，并计划在后期不断引入新的 package，目前已经支持了 87 个 package

DartPad 用户大部分是学习 Dart 编程语言的开发者，可以免于配置本地开发环境直接测试 Dart 编程语言特性。另一个场景是用于代码片段的分享，这可以是一个小功能，比如 Flutter API 文档里介绍某个 widget 时就会内嵌一个 DartPad 向开发者展示这个 widget 实际运行时的效果，代码片段也可以是一个最小可复现的 bug 代码，方便在描述问题的时候，同时将代码分享给 debug 的开发者。

本文将带你了解 DartPad 的另一种用法，我们称之为 DartPad Workshop，我们称之为 DartPad 实践教程，本文由 Flutter GDE Alex [撰写发表](https://juejin.cn/post/7098544316296986638)。

## Workshop 是什么？

2021 年 5 月 Dart 2.13 (Flutter 2.2) 发布之时，Flutter 团队为 DartPad 新增了 Workshop 格式的支持，目标是支持和改善 Flutter 讲师在分享和进行课程讲解时的实践体验，当年的 I/O 大会上也正式测试了很多个 Workshop，开发者们的反应也非常积极。

以往的 DartPad 内容基于 GitHub Gist 分享，仅能分享一份代码，并且没有引导式的步骤和交互。而 Workshop 是一套可交互、多步骤、引导式且基于 Web Server 的内容架构。作者可以自定义 workshop 名称，定义每一个步骤的内容和解法，使用 Markdown 展示步骤的介绍，最后使用多种方式托管 workshop 源文件以进行使用。

![DartPad Workshop 架构](https://pic.alexv525.com/202205112305930.png)

接下来，我将带来大家从使用、创建、撰写到发布 workshop 的所有必要步骤，成为一名教学大师！

##  Workshop 怎么开始？

**工欲善其事，必先利其器**。想要写好一个 Workshop，首先要了解 Workshop 最终会呈现什么效果。

此处推荐浏览官方的 [Sliver Workshop](https://dartpad.cn/workshops.html?webserver=https://dartpad-workshops-io2021.web.app/getting_started_with_slivers)，简单体验一番。

![Flutter Sliver Workshop 界面](https://pic.alexv525.com/202205161642752.png)

从上图中我们不难看出，整个 Workshop 被一分为三：
- 左侧为介绍内容块，同时可以进行步骤的切换；
- 右上为代码编辑器，可以点击 Run 运行代码；
- 右下则为界面输出、控制台以及文档界面。

同时，将鼠标放在左侧下方的 **Step 1** 上，将出现步骤切换列表，展示出所有的可切换步骤。

![Workshop 步骤切换](https://pic.alexv525.com/202205112348483.png)

当某个步骤包含解答（有 `solution.dart` 且 `has_solution` 为 `true`）时，左侧介绍内容块的右下角将显示 **Show Solution** 按钮，点击后右侧的代码内容将使用解答代码完整替换。

![Workshop 显示解答](https://pic.alexv525.com/202205161644944.png)

整个过程中，无论是 Workshop 为你准备好的代码，还是点击 **Show Solution** 替换的解答代码，**都可以在右侧的代码编辑器中进行修改并运行**。

## Workshop 怎么写？

新建一个目录，名字随意（例如 `my_workshop`），在 Workshop 完成时，结构应当如下：

```console
my_workshop/
|---meta.yaml          # 元数据声明文件
|---step_01/           # 步骤目录（任意名称）
   |---instructions.md    # 步骤介绍 Markdown 文档
   |---snippet.dart       # 代码文件
   |---solution.dart      # 解答文件（可选）
|---step_02/
   |---instructions.md
   |---snippet.dart
```

### meta.yml

在元数据声明文件中，你需要声明如下结构的内容：

```yaml
name: My workshop      # Workshop 的名称
type: dart             # Workshop 的类型，可为 "dart" 或 "flutter"
steps:                 # 声明步骤
  - name: Step 1         # 步骤的名称
    directory: step_01   # 步骤对应的目录
    has_solution: true   # 步骤是否有解答
  - name: Step 2
    directory: step_02
    has_solution: false
```

如果你的某一个步骤需要开发者动手修改，最后提供一份解答，你可以将 `has_solution` 设置为 `true` 并且创建 `solution.dart` 文件进行交互。

每个步骤包含的内容大同小异，但在开始写一个具体的步骤前，我们还有一项有利于我们开发 Workshop 的操作，那就是 **在项目的同级目录新建一个 `pubspec.yaml`** 。`pubspec.yaml` 有助于 CLI / IDE 识别并配置你的 Dart / Flutter 项目。如此你便可以像正常的 Dart / Flutter 项目一样编写你的 Workshop。

### 编写步骤内容

**instructions.md**

`instructions.md` 是每一个步骤对应的介绍文档，支持以 Markdown 的形式编写。实测在 DartPad 环境中可以支持 `<iframe>` 标签进行嵌入，你可以嵌入视频或者其他交互式内容来辅助你的介绍。

![instructions 界面预览](https://pic.alexv525.com/202205162308673.png)

**snippet.dart**

该文件是每个步骤对应的必需 Dart 代码片段，
在切换步骤时对应的代码将直接替换到代码编辑器内。
代码文件有时候并不需要开发者关注所有的内容，
在这样的情况，推荐在文件中使用 **TODO** 标记需要开发者修改的内容。

![使用 TODO 标记代码](https://pic.alexv525.com/202205162304888.png)

**solution.dart**

该文件是可选的步骤解答。在使用它前，你需要在 `meta.yml` 中把对应步骤的 `has_solution` 设置为 `true` 方可生效。
它和 `snippet.dart` 格式基本相同，
在前文中我们介绍到，点击 **Show Solution** 按钮，
可以将已有的代码替换为你编写的解答内容。
当你想教会开发者一种特定的实现方式时，解法文件可以发挥它的作用。
但如果对应的步骤是开放性的体验尝试，就无需提供特定的解法。

文末可体验截图里的 Workshop，并参考其构建源码 (包含 `instructions.md`、`snippet.dart`、`solution.dart` 等文件)。

## Workshop 如何部署？

**Workshop 支持以 HTTP 服务器的方式被托管**。总的来说有三种主要的托管方式：

* 使用你的个人服务器进行部署，也可以托管在本地或局域网给同事或者学生分享。此时的访问网址应当是: `https://dartpad.cn/workshops.html?webserver=https://www.example.com/my_workshop`
* 使用 Web 应用服务商提供的服务，类似于 Firebase、web.app、Web+、Webify 等 PaaS 服务；此时的访问网址应当是: `https://dartpad.cn/workshops.html?webserver=https://your_app.web.app/path/to/my_workshop`
* 直接将代码上传至 GitHub，通过 GitHub API 或原始存储地址进行访问。此时的访问网址可以是: `https://dartpad.cn/workshops.html?webserver=https://raw.githubusercontent.com/your_name/my_workshop` 也可以是: `https://dartpad.cn/workshops.html?gh_owner=your_name&gh_repo=my_workshop`

需要注意的是，在实际运行的过程中，Workshop 的读者会通过自己的浏览器从部署页面读取相应的内容，并展示和运行在 DartPad 页面，因此需要作者确保部署后的 Workshop 地址可以被正确访问。

## 体验现有的 Workshop

今年的 I/O Adventure，在 Flutter 产品分区通过 15 个虚拟展位展示了由 Flutter GDE 制作的 Workshop，大家可以到 https://io.google/ 线上体验:

![DartPad Workshop 展区](https://pic.alexv525.com/202205170011031.png)

推荐大家体验 Alex 制作的 [LazyIndexedStack Worshop](https://flutter.cn/urls/lazyindexedstack)，[代码仓库地址](https://github.com/AlexV525/dartpad_workshops/tree/main/implement_lazy_indexed_stack)。
