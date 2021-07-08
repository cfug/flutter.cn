---
title: Google APIs
title: 使用 Google API
description: How to use Google APIs with Flutter.
description: 如何在 Flutter 中使用 Google API
---

<?code-excerpt path-base="googleapis/"?>

The [Google APIs package]({{site.pub-pkg}}/googleapis) exposes dozens of Google
services that you can use from Dart projects.

[Google APIs package]({{site.pub-pkg}}/googleapis) 提供了许多你可以从 Dart 项目中使用的 Google 服务。

This page describes how to use APIs that interact with end-user data by using
Google authentication.

本页面描述了如何通过 Google 身份验证，使用这些 API 和终端用户数据交互。

Examples of user-data APIs include
[Calendar]({{site.pub-api}}/googleapis/latest/calendar.v3/calendar.v3-library.html),
[Gmail]({{site.pub-api}}/googleapis/latest/gmail.v1/gmail.v1-library.html), and
[YouTube]({{site.pub-api}}/googleapis/latest/youtube.v3/youtube.v3-library.html).

用户数据 API 的例子包括 [Calendar]({{site.pub-api}}/googleapis/latest/calendar.v3/calendar.v3-library.html)、
[Gmail]({{site.pub-api}}/googleapis/latest/gmail.v1/gmail.v1-library.html) 
和 [YouTube]({{site.pub-api}}/googleapis/latest/youtube.v3/youtube.v3-library.html)。

{{site.alert.info}} 

  Note: The only APIs you should use directly from your Flutter
  project are those that access user data via Google authentication.
  
  注意：你直接使用自 Flutter 项目的 API，应该只有那些通过 Google 身份验证访问用户数据的 API。

  APIs that require
  [service accounts](https://cloud.google.com/iam/docs/service-accounts) **should
  not** be used directly from a Flutter application. Doing so requires shipping
  service credentials as part of your application, which is not secure. To use
  these APIs, we recommend creating an intermediate service.
  
  那些需要 [服务账号](https://cloud.google.com/iam/docs/service-accounts) 的 API，
  不应该直接使用自 Flutter 应用。直接使用需要将服务证书作为应用程序的一部分，这是不安全的。
  我们推荐创建一个中间服务，来使用这些 API。

<!-- TODO(kevmoo): Add link to public user guide when available. -->

{{site.alert.end}}

## Overview

## 概览

To use Google APIs, follow these steps.

请遵循以下步骤使用 Google API。

1. Pick the desired API

   选择所需的 API

1. Enable the API

   启用 API 服务

1. Authenticate user with the required scopes

   使用所需的作用域对用户进行身份验证

1. Obtain an authenticated HTTP client

   获取身份验证后的 HTTP 客户端

1. Create and use the desired API class

   创建并使用所需的 API 类

## 1. Pick the desired API

## 1. 选择所需的 API

The documentation for [package:googleapis]({{site.pub-api}}/googleapis) lists
each API as a separate Dart library – in a `name.version` format. Let's look at
[`youtube.v3`]({{site.pub-api}}/googleapis/latest/youtube.v3/youtube.v3-library.html)
as an example.

文档 [package:googleapis]({{site.pub-api}}/googleapis) 采用 `name.version` 的形式，
列举了每一个可以单独作为 Dart 库的 API。
一起看看 [`youtube.v3`]({{site.pub-api}}/googleapis/latest/youtube.v3/youtube.v3-library.html) 这个例子。

Each library may provide many types, but there is one _root_ class that ends in
`Api`. For YouTube, it's
[`YouTubeApi`]({{site.pub-api}}/googleapis/latest/youtube.v3/YouTubeApi-class.html).

每一个库都可以提供多种类型，但是一定会有一个以 `Api` 结尾的 **根** 类。
在 YouTube 中，根类就是 [`YouTubeApi`]({{site.pub-api}}/googleapis/latest/youtube.v3/YouTubeApi-class.html)。

Not only is the `Api` class the one you need to instantiate – see step 3 – but
it also exposes the scopes that represent the permissions needed to use the API.
Look under the
[Constants section]({{site.pub-api}}/googleapis/latest/youtube.v3/YouTubeApi-class.html#constants)
of the `YouTubeApi` class and you'll see the available scopes. To request access
to simply read (but not write) an end-users YouTube data, use the
[`youtubeReadonlyScope`]({{site.pub-api}}/googleapis/latest/youtube.v3/YouTubeApi/youtubeReadonlyScope-constant.html)
when authenticating the user.

`Api` 类不仅是你需要初始化的类——详见步骤 3 ——它还暴露了使用该 API 所需权限的作用域。
请看 `YouTubeApi` 类中 [常量]({{site.pub-api}}/googleapis/latest/youtube.v3/YouTubeApi-class.html#constants) 这一节，
你会看到可用的作用域有哪些。为了获取终端用户的 YouTube 数据的读取（并非写入）权限，
用户验证时使用 [`youtubeReadonlyScope`]({{site.pub-api}}/googleapis/latest/youtube.v3/YouTubeApi/youtubeReadonlyScope-constant.html)。

<?code-excerpt "lib/main.dart" skip="13" take="2"?>
```dart
/// Provides the `YouTubeApi` class.
import 'package:googleapis/youtube/v3.dart';
```

## 2. Enable the API

## 2. 启用 API 服务

To use Google APIs you must have a Google account and a Google project. You also
need to enable your desired API.

使用 Google API，你必须有一个 Google 账户和一个 Google 项目。你还需要启用所需的 API 服务。

In this example, you'd enable
[YouTube Data API v3](https://console.cloud.google.com/apis/api/youtube.googleapis.com).

在本示例中，你将需要启用 [YouTube Data API v3](https://console.cloud.google.com/apis/api/youtube.googleapis.com) 服务。

For details, see the
[getting started instructions](https://cloud.google.com/apis/docs/getting-started).

详情请看 [入门指南](https://cloud.google.com/apis/docs/getting-started)。

## 3. Authenticate the user with the required scopes

## 3. 使用所需的作用域对用户进行身份验证

Use the [google_sign_in]({{site.pub-pkg}}/google_sign_in) package to
authenticate users with their Google identity. You will have to configure signin
for each platform you want to support.

使用 [google_sign_in]({{site.pub-pkg}}/google_sign_in) 包对用户进行 Google 身份验证。
你必须为每一种想要支持的平台配置登录。

<?code-excerpt "lib/main.dart" skip="10" take="2"?>
```dart
/// Provides the `GoogleSignIn` class
import 'package:google_sign_in/google_sign_in.dart';
```

When you instantiate the
[`GoogleSignIn`]({{site.pub-api}}/google_sign_in/latest/google_sign_in/GoogleSignIn-class.html)
class, you provide the desired scopes as discussed in the previous section.

当你初始化 [`GoogleSignIn`]({{site.pub-api}}/google_sign_in/latest/google_sign_in/GoogleSignIn-class.html) 类时，
你需要提供前面的小节中提到的所需的作用域。

<?code-excerpt "lib/main.dart" skip="35" take="3"?>
```dart
final _googleSignIn = GoogleSignIn(
  scopes: <String>[YouTubeApi.youtubeReadonlyScope],
);
```

Follow the instructions provided by
[package:google_sign_in]({{site.pub-pkg}}/google_sign_in) to allow a user to
authenticate.

按照 [package:google_sign_in]({{site.pub-pkg}}/google_sign_in) 中的介绍来进行用户验证。

Once authenticated, you must obtain an authenticated HTTP client.

一旦验证完毕，你必须获取一个验证后的 HTTP 客户端。

## 4. Obtain an authenticated HTTP client

## 4. 获取身份验证后的 HTTP 客户端

The
[extension_google_sign_in_as_googleapis_auth]({{site.pub-pkg}}/extension_google_sign_in_as_googleapis_auth)
package provides an
[extension method]({{site.dart-site}}/guides/language/extension-methods) on
`GoogleSignIn`:
[`authenticatedClient`]({{site.pub-api}}/extension_google_sign_in_as_googleapis_auth/latest/extension_google_sign_in_as_googleapis_auth/GoogleApisGoogleSignInAuth/authenticatedClient.html).

[extension_google_sign_in_as_googleapis_auth]({{site.pub-pkg}}/extension_google_sign_in_as_googleapis_auth) 包
在 `GoogleSignIn` 中提供了一个 [扩展方法]({{site.dart-site}}/guides/language/extension-methods)：
[`authenticatedClient`]({{site.pub-api}}/extension_google_sign_in_as_googleapis_auth/latest/extension_google_sign_in_as_googleapis_auth/GoogleApisGoogleSignInAuth/authenticatedClient.html)。

<?code-excerpt "lib/main.dart" skip="7" take="1"?>
```dart
import 'package:extension_google_sign_in_as_googleapis_auth/extension_google_sign_in_as_googleapis_auth.dart';
```

You can listen to
[`onCurrentUserChanged`]({{site.pub-api}}/google_sign_in/latest/google_sign_in/GoogleSignIn/onCurrentUserChanged.html).
When event value is not `null`, you can create an authenticated client.

你可以监听 [`onCurrentUserChanged`]({{site.pub-api}}/google_sign_in/latest/google_sign_in/GoogleSignIn/onCurrentUserChanged.html)。
当事件值不是 `null` 时，你可以创建一个身份验证后的客户端。

<?code-excerpt "lib/main.dart" skip="124" take="1"?>
```dart
var httpClient = (await _googleSignIn.authenticatedClient())!;
```

This [`Client`]({{site.pub-api}}/http/latest/http/Client-class.html) instance
includes the nessesary credentials when invoking Google API classes.

[`Client`]({{site.pub-api}}/http/latest/http/Client-class.html) 实例
包含了调用 Google API 类时所需的凭证。

## 5. Create and use the desired API class

## 5. 创建并使用所需的 API 类

Use the API to create the desired API type and call methods, for instance:

使用 API 来创建所需的 API 类型和调用方法，例如：

<?code-excerpt "lib/main.dart" skip="125" take="6"?>
```dart
var youTubeApi = YouTubeApi(httpClient);

var favorites = await youTubeApi.playlistItems.list(
  ['snippet'],
  playlistId: 'LL', // Liked List
);
```

## More information

## 更多信息

- The
  [`extension_google_sign_in_as_googleapis_auth` example]({{site.pub-pkg}}/extension_google_sign_in_as_googleapis_auth/example)
  is a working implementation of the concepts described on this page.
  
  示例 [`extension_google_sign_in_as_googleapis_auth`]({{site.pub-pkg}}/extension_google_sign_in_as_googleapis_auth/example) 
  是本页面所述概念的一个可行的实现。
