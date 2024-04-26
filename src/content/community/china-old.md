---
title: Using Flutter in China
title: 在中国网络环境下使用 Flutter
description: Where to find a version of the Flutter site that is localized to Simplified Chinese.
description: 如果你需要在中国网络环境下使用 Flutter，请查阅此页面。
toc: true
---

{% assign path = 'flutter_infra_release/releases/stable/windows/flutter_windows_3.3.0-stable.zip' -%}

{% comment %}
The Flutter community has made a Simplified Chinese version
of the Flutter website available at
[https://flutter.cn](https://flutter.cn),
maintained by [The China Flutter User Group (CFUG)][].
{% endcomment %}

欢迎你来到由中国 Flutter 社区维护的中文 Flutter 资源网站。

{% comment %}
If you'd like to install Flutter using an 
[installation bundle](/release/archive),
you can replace the domain of the original URL with a trusted mirror
to speed it up. For example:
{% endcomment %}

如果你需要下载
[Flutter SDK 的独立打包文件](/development/tools/sdk/releases)，
你可以将下载链接前缀替换为镜像链接：

{% comment %}
* Original URL:<br>
  [`https://storage.googleapis.com/{{path}}`](https://storage.googleapis.com/{{path}})

* Mirrored URL:<br>
  [`https://storage.flutter-io.cn/{{path}}`](https://storage.flutter-io.cn/{{path}})
{% endcomment %}

* 原始链接：<br>
  [`https://storage.googleapis.com/{{path}}`](https://storage.googleapis.com/{{path}})

* 镜像之后的链接：<br>
  [`https://storage.flutter-io.cn/{{path}}`](https://storage.flutter-io.cn/{{path}})

{% comment %}
You must also set two environment variables to upgrade Flutter and use the pub
package repository in China. Instructions are below.
{% endcomment %}

同时为了正常升级 Flutter 和通过 pub 命令获取 packages，
你需要设置如下两个环境变量，设置方式如下：

{% comment %}
{{site.alert.important}}
  Use mirror sites only if you _trust_ the provider.
  The Flutter team cannot verify their reliability or security.
{{site.alert.end}}
{% endcomment %}

{% comment %}
## Configuring Flutter to use a mirror site
{% endcomment %}

## 为 Flutter 设定镜像配置

{% comment %}
If you're installing or using Flutter in China,
it might be helpful to use a trustworthy local
mirror site that hosts Flutter's dependencies.
To instruct the Flutter tool to use an alternate storage location,
you need to set two environment variables, `PUB_HOSTED_URL` and
`FLUTTER_STORAGE_BASE_URL`, before running the `flutter` command.
{% endcomment %}

如果你在国内使用 Flutter，那么你可能需要找一个与官方同步的可信的镜像站点，
帮助你的 Flutter 命令行工具到该镜像站点下载其所需的资源。
你需要为此设置两个环境变量：`PUB_HOSTED_URL` 和 `FLUTTER_STORAGE_BASE_URL`，
然后再运行 Flutter 命令行工具。

{% comment %}
Taking macOS or Linux as an example, here are the first few steps in
the setup process for using a mirror site. Run the following in a Bash
shell from the directory where you wish to store your local Flutter clone:
{% endcomment %}

以 macOS 或者与 Linux 相近的系统为例，这里有以下步骤帮助你设定镜像。
在系统终端里执行如下命令设定环境变量，并通过 GitHub 检出 Flutter SDK：

```terminal
$ export PUB_HOSTED_URL=https://pub.flutter-io.cn
$ export FLUTTER_STORAGE_BASE_URL=https://storage.flutter-io.cn
$ git clone -b dev {{site.repo.flutter}}.git
$ export PATH="$PWD/flutter/bin:$PATH"
$ cd ./flutter
$ flutter doctor
```

{% comment %}
After these steps, you should be able to continue
[setting up Flutter](/get-started/editor) normally.
From here on, packages fetched by `flutter pub get` are
downloaded from `flutter-io.cn` in any shell where `PUB_HOSTED_URL`
and `FLUTTER_STORAGE_BASE_URL` are set.
{% endcomment %}

如上步骤设定之后，你可以继续进行 Flutter 安装的下一步：[编辑工具设定](/get-started/editor)，
在这两个环境变量（`PUB_HOSTED_URL` 和 `FLUTTER_STORAGE_BASE_URL`）设定过后，
未来通过命令 `flutter pub get` 获取 packages 的时候，网络请求将会通过
`flutter-io.cn` 提供的镜像进行。

{% comment %}
The `flutter-io.cn` server is a provisional mirror for Flutter
dependencies and packages maintained by [The China Flutter User Group (CFUG)][].
The Flutter team cannot guarantee long-term availability of this service.
You're free to use other mirrors if they become available.
If you're interested in setting up your own mirror in China,
contact [flutter-dev@googlegroups.com](mailto:flutter-dev@googlegroups.com)
for assistance.
{% endcomment %}

`flutter-io.cn` 所提供的镜像由
[Flutter 中文社区][The China Flutter User Group (CFUG)]
提供和维护，Flutter 团队无法保证其的长期稳定运作，你也可以自由使用其他可信的机构提供的镜像服务。

{% comment %}
If you're running into issues that only occur when using the `flutter-io.cn` server,
consider reporting the issue to
[the issue tracker (镜像问题)](https://github.com/cfug/flutter.cn/issues/new/choose).
{% endcomment %}

{% comment %}
## Community-run mirror sites
{% endcomment %}

{% comment %}
* Shanghai Jiao Tong University Linux User Group
  * `FLUTTER_STORAGE_BASE_URL`: [https://mirror.sjtu.edu.cn/](https://mirror.sjtu.edu.cn)
  * `PUB_HOSTED_URL`: [https://mirror.sjtu.edu.cn/dart-pub/](https://mirror.sjtu.edu.cn/dart-pub)
{% endcomment %}

[The China Flutter User Group (CFUG)]: https://github.com/cfug

## 社区运行的镜像站点

如下列表为目前在国内提供镜像的社区以及其镜像配置，
由于镜像的实现方式有所不同，可能会导致数据的滞后等问题。
我们制作了一个 [镜像可用性监控页面](https://stats.uptimerobot.com/JZK3ZTql79) 供参考。

### Flutter 社区

社区主镜像，采用多种方式同步 Flutter 开发者资源（推荐）。
有任何镜像相关的问题，请与我们
[反馈镜像问题](https://github.com/cfug/flutter.cn/issues)，
中国镜像存储由 [七牛云](https://sensors.qiniu.com/t/n9Q) 提供服务。

```terminal
$ export PUB_HOSTED_URL=https://pub.flutter-io.cn
$ export FLUTTER_STORAGE_BASE_URL=https://storage.flutter-io.cn
```

### 上海交大 Linux 用户组

使用全量同步方式建立 Flutter 镜像，配置了完善的回源
(flutter-io.cn 主镜像和 GCS 站源) 策略（推荐），
有任何镜像相关的问题，请向上海交大 Linux 用户组
[反馈镜像问题](https://github.com/sjtug/mirror-requests/issues/new?labels=bug&template=2-bug-report.md)。

查看帮助文档：
[Flutter 镜像安装帮助](https://mirrors.sjtug.sjtu.edu.cn/docs/flutter_infra)，
[Pub 镜像安装帮助](https://mirrors.sjtug.sjtu.edu.cn/docs/dart-pub)。

```terminal
$ export PUB_HOSTED_URL=https://mirror.sjtu.edu.cn/dart-pub
$ export FLUTTER_STORAGE_BASE_URL=https://mirror.sjtu.edu.cn
```

### 清华大学 TUNA 协会

采取自定义脚本定时主动抓取策略，并配置了完善的回源
(flutter-io.cn 主镜像和 GCS 站源) 策略（推荐），
有任何镜像相关的问题（包含 TUNA、OpenTUNA），请向清华大学 TUNA 协会
[反馈镜像问题](https://github.com/tuna/issues/issues)。

查看帮助文档：
[Flutter 镜像安装帮助](https://mirrors.tuna.tsinghua.edu.cn/help/flutter/)，
[Pub 镜像安装帮助](https://mirrors.tuna.tsinghua.edu.cn/help/dart-pub/)。

```terminal
$ export PUB_HOSTED_URL=https://mirrors.tuna.tsinghua.edu.cn/dart-pub
$ export FLUTTER_STORAGE_BASE_URL=https://mirrors.tuna.tsinghua.edu.cn/flutter
```

#### OpenTUNA

数据策略与 TUNA 镜像一致、由清华 TUNA 协会运行维护，
[OpenTUNA](https://mirrors.tuna.tsinghua.edu.cn/news/opentuna-mirror/) 
镜像通过 CloudFront CDN 进行分发。

**已知问题**：Pub API 与预期返回值不一致，可能造成请求无效 (2021/6/8)。

```terminal
$ export PUB_HOSTED_URL=https://opentuna.cn/dart-pub
$ export FLUTTER_STORAGE_BASE_URL=https://opentuna.cn/flutter
```

#### CNNIC

基于 TUNA 协会的镜像服务，数据策略和内容与 TUNA 一致，
通过非教育网的域名访问（建议选择 TUNA）。
暂无反馈渠道，可尝试 TUNA 反馈渠道。

```terminal
$ export PUB_HOSTED_URL=http://mirrors.cnnic.cn/dart-pub
$ export FLUTTER_STORAGE_BASE_URL=http://mirrors.cnnic.cn/flutter
```

### 腾讯云开源镜像站

使用 TUNA 开源的脚本每天凌晨 0 - 2 点执行同步，未配置回源策略。
使用腾讯云服务器的用户，可将源域名从 mirrors.cloud.tencent.com 修改为
mirrors.tencentyun.com，使用内网流量不占用公网流量。
有任何镜像问题，请通过邮件 (mirrors@tencent.com) 向腾讯云开源镜像站反馈。

**已知问题**：
- Flutter Storage 已经从 `flutter_infra` 调整为 `flutter_infra_release`，
  腾讯云开源镜像并未对此做调整，可能会在更新的 Flutter 版本里无法请求到完整数据 (2021/6/8)。 
- 根据反馈 ([#1135](https://github.com/cfug/flutter.cn/issues/1135))，
  腾讯云对 CIPD 的支持尚不确定是否完整。

```terminal
$ export PUB_HOSTED_URL=https://mirrors.cloud.tencent.com/dart-pub
$ export FLUTTER_STORAGE_BASE_URL=https://mirrors.cloud.tencent.com/flutter
```

### 其他已知问题

- 所有 Flutter 镜像目前均不支持/也不应支持上传 packages 到 pub.dev 网站。
  这个过程通常需要登录谷歌账号，而这将是一个无法绕开且复杂的挑战。
- [上海大学的镜像](https://mirrornews.shuosc.org/p/6d7146f9.html) 
  暂时只允许校内访问，故暂未展示，感谢上海大学 Linux 用户组的同学。
- 腾讯云开源镜像站使用 TUNA 开源脚本制作，每天同步一次，
  经测试，其数据延迟较大并尚未配置有效的回源策略，有待于社区成员进一步验证。
- 任何其他与镜像相关的问题，请通过
  [Issue 向我们反馈](https://github.com/cfug/flutter.cn/issues/new?template=2_mirror_issue.yml&title=&title=%5BMirror+issue%5D+使用+Flutter+中国镜像的问题)。
- 部分镜像的问题已经特别标识，待镜像修复之后移除。

## 致谢

本页面列出的镜像由提供者分别维护，我们确保上述列出的镜像提供方不会对数据进行恶意修改，
因为国内网络情况的复杂性和特殊性，我们无法保证镜像长期稳定性和访问速度，请谅解。

如果在镜像使用中有任何问题，欢迎通过邮件与我们联系：cfug-dev@googlegroups.com。
非常感谢所有帮助 Flutter 在国内维护社区基础设施建设资源的社区和公司，查看
[详细致谢名单]({{site.main-url}}/about)。
