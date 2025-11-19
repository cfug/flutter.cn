---
# title: Google APIs
title: 使用 Google API
# description: How to use Google APIs with Flutter.
description: 如何在 Flutter 中使用 Google API
---

<?code-excerpt path-base="googleapis/"?>

The [Google APIs package][] exposes dozens of Google
services that you can use from Dart projects.

[Google APIs package]({{site.pub-pkg}}/googleapis)
提供了许多你可以从 Dart 项目中使用的 Google 服务。

This page describes how to use APIs that interact with
end-user data by using Google authentication.

本页面描述了如何通过 Google 身份验证，使用这些 API 和终端用户数据交互。

Examples of user-data APIs include
[Calendar][], [Gmail][], [YouTube][], and Firebase.

用户数据 API 的例子包括
[Calendar][]、[Gmail][]、[YouTube][] 和 Firebase。

:::note

The only APIs you should use directly from your Flutter
project are those that access user data using Google authentication.

你只应该在 Flutter 项目中使用那些已经通过了 Google 身份验证的用户数据 API。

APIs that require [service accounts][] **should not**
be used directly from a Flutter application.
Doing so requires shipping service credentials as part
of your application, which is not secure.
To use these APIs,
we recommend creating an intermediate service.

那些需要 [服务账号][service accounts] 的 API，
**不应该** 直接使用到 Flutter 应用中。
直接使用需要将服务证书作为应用程序的一部分，这是不安全的。
我们推荐创建一个中间服务，来使用这些 API。

:::

To add authentication to Firebase explicitly, check out the
[Add a user authentication flow to a Flutter app using FirebaseUI][fb-lab]
codelab and the
[Get Started with Firebase Authentication on Flutter][fb-auth] docs.

[fb-lab]: {{site.firebase}}/codelabs/firebase-auth-in-flutter-apps
[Calendar]: {{site.pub-api}}/googleapis/latest/calendar_v3/calendar_v3-library.html
[fb-auth]: {{site.firebase}}/docs/auth/flutter/start
[Gmail]: {{site.pub-api}}/googleapis/latest/gmail_v1/gmail_v1-library.html
[Google APIs package]: {{site.pub-pkg}}/googleapis
[service accounts]: https://cloud.google.com/iam/docs/service-account-overview
[YouTube]: {{site.pub-api}}/googleapis/latest/youtube_v3/youtube_v3-library.html

## Overview

## 概览

To use Google APIs, follow these steps:

请遵循以下步骤使用 Google API：

1. Pick the desired API

   选择所需的 API

1. Enable the API

   启用 API 服务

1. Authenticate and determine the current user

   验证并确认当前用户

1. Obtain an authenticated HTTP client

   获取身份验证后的 HTTP 客户端

1. Create and use the desired API class

   创建并使用所需的 API 类

## 1. Pick the desired API

## 1. 选择所需的 API


The documentation for [`package:googleapis`][] lists
each API as a separate Dart library&emdash;in a
`name_version` format.
Check out [`youtube_v3`][] as an example.

文档 [`package:googleapis`][] 采用 `name_version` 的形式，
列举了每一个可以单独作为 Dart 库的 API。
一起看看 [`youtube_v3`][] 这个例子。

Each library might provide many types,
but there is one _root_ class that ends in `Api`.
For YouTube, it's [`YouTubeApi`][].

每个库都可能提供多种类型，但是一定会有一个以 `Api` 结尾的 **根** 类。
在 YouTube 中，根类就是 [`YouTubeApi`][]。

Not only is the `Api` class the one you need to
instantiate (see step 3), but it also
exposes the scopes that represent the permissions
needed to use the API. For example,
the [Constants section][] of the
`YouTubeApi` class lists the available scopes.
To request access to read (but not write) an end-user's
YouTube data, authenticate the user with
[`youtubeReadonlyScope`][].

`Api` 类不仅是你需要初始化的类（详见步骤 3），
它还暴露了使用该 API 所需权限的作用域。
例如， `YouTubeApi` 类中 [常量][Constants section] 这一节，
你会看到可用的作用域有哪些。
为了获取终端用户的 YouTube 数据的读取（并非写入）权限，
请使用 [`youtubeReadonlyScope`][] 对用户进行验证。

<?code-excerpt "lib/main.dart (youtube-import)"?>
```dart
/// Provides the `YouTubeApi` class.
import 'package:googleapis/youtube/v3.dart';
```

[Constants section]: {{site.pub-api}}/googleapis/latest/youtube_v3/YouTubeApi-class.html#constants
[`package:googleapis`]: {{site.pub-api}}/googleapis
[`youtube_v3`]: {{site.pub-api}}/googleapis/latest/youtube_v3/youtube_v3-library.html
[`YouTubeApi`]: {{site.pub-api}}/googleapis/latest/youtube_v3/YouTubeApi-class.html
[`youtubeReadonlyScope`]: {{site.pub-api}}/googleapis/latest/youtube_v3/YouTubeApi/youtubeReadonlyScope-constant.html

## 2. Enable the API

## 2. 启用 API 服务

To use Google APIs you must have a Google account
and a Google project. You also
need to enable your desired API.

使用 Google API，你必须有一个 Google 账户和一个 Google 项目。你还需要启用所需的 API 服务。

This example enables [YouTube Data API v3][].

在本示例中，你将需要启用 [YouTube Data API v3][] 服务。

For details, see the [getting started instructions][].

详情请看 [入门指南][getting started instructions]。

[getting started instructions]: https://cloud.google.com/apis/docs/getting-started
[YouTube Data API v3]: https://console.cloud.google.com/apis/library/youtube.googleapis.com

## 3. Authenticate and determine the current user

## 3. 验证并确认当前用户

Use the [google_sign_in][gsi-pkg] package to
authenticate users with their Google identity.
Configure sign in for each platform you want to support.

使用 [google_sign_in][gsi-pkg] package 对用户进行 Google 身份验证。
为你需要的平台配置登录。

<?code-excerpt "lib/main.dart (google-import)"?>
```dart
/// Provides the `GoogleSignIn` class.
import 'package:google_sign_in/google_sign_in.dart';
```

The package's functionality is accessed through
a static instance of the [`GoogleSignIn`][] class.
Before interacting with the instance,
the `initialize` method must be called and allowed to complete.

该 package 的功能是通过 [`GoogleSignIn`][] 类的静态实例访问的。
在于该实例交互之前，
必须调用 `initialize` 方法并等待其执行完成。

<?code-excerpt "lib/main.dart (init)"?>
```dart
final _googleSignIn = GoogleSignIn.instance;

@override
void initState() {
  super.initState();
  _googleSignIn.initialize();
  // ···
}
```

Once initialization is complete but before user authentication,
listen to authentication events to determine if a user signed in.

初始化完成后，在用户身份验证之前监听身份验证事件，
以确认用户是否已登录。

<?code-excerpt "lib/main.dart (post-init)" plaster="none"?>
```dart highlightLines=1,7,9-12
GoogleSignInAccount? _currentUser;

@override
void initState() {
  super.initState();
  _googleSignIn.initialize().then((_) {
    _googleSignIn.authenticationEvents.listen((event) {
      setState(() {
        _currentUser = switch (event) {
          GoogleSignInAuthenticationEventSignIn() => event.user,
          _ => null,
        };
      });
    });
  });
}
```

Once you're listening to any relevant authentication events,
you can attempt to authenticate a previously signed-in user.

在监听任何相关的身份验证事件后，
你就可以尝试为之前登录过的用户进行身份验证。

```dart highlightLines=5-6
void initState() {
  super.initState();
  _googleSignIn.initialize().then((_) {
    // ...
    // Attempt to authenticate a previously signed in user.
    _googleSignIn.attemptLightweightAuthentication();
  });
}
```

To also allow for new users to authenticate,
follow the instructions provided by
[`package:google_sign_in`][gsi-pkg].

为了允许新用户进行身份验证，
请遵循 [`package:google_sign_in`][gsi-pkg] 提供的说明。

Once a user has been authenticated,
you must obtain an authenticated HTTP client.

用户身份验证通过后，你必须获取一个验证后的 HTTP 客户端。

[gsi-pkg]: {{site.pub-pkg}}/google_sign_in
[`GoogleSignIn`]: {{site.pub-api}}/google_sign_in/latest/google_sign_in/GoogleSignIn-class.html

## 4. Obtain an authenticated HTTP client

## 4. 获取身份验证后的 HTTP 客户端

Once you have a signed-in user, request the
relevant client authorization tokens using [`authorizationForScopes`][]
for the API scopes that your app requires.

<?code-excerpt "lib/main.dart (scope-authorize)"?>
```dart
const relevantScopes = [YouTubeApi.youtubeReadonlyScope];
final authorization = await currentUser.authorizationClient
    .authorizationForScopes(relevantScopes);
```

:::note
If your scopes require user interaction,
you'll need to use [`authorizeScopes`][] from an interaction handler
instead of `authorizationForScopes`.
:::

Once you have the relevant authorization tokens,
use the [`authClient`][] extension from
[`package:extension_google_sign_in_as_googleapis_auth`][] to
set up an authenticated HTTP client with the relevant credentials applied.

<?code-excerpt "lib/main.dart (auth-import)"?>
```dart
import 'package:extension_google_sign_in_as_googleapis_auth/extension_google_sign_in_as_googleapis_auth.dart';
```

<?code-excerpt "lib/main.dart (auth-client)"?>
```dart
final authenticatedClient = authorization!.authClient(
  scopes: relevantScopes,
);
```

[`authorizationForScopes`]: {{site.pub-api}}/google_sign_in/latest/google_sign_in/GoogleSignInAuthorizationClient/authorizationForScopes.html
[`authorizeScopes`]: {{site.pub-api}}/google_sign_in/latest/google_sign_in/GoogleSignInAuthorizationClient/authorizeScopes.html
[`authClient`]: {{site.pub-api}}/extension_google_sign_in_as_googleapis_auth/latest/extension_google_sign_in_as_googleapis_auth/GoogleApisGoogleSignInAuth/authClient.html
[`package:extension_google_sign_in_as_googleapis_auth`]: {{site.pub-pkg}}/extension_google_sign_in_as_googleapis_auth

[`Client`]({{site.pub-api}}/http/latest/http/Client-class.html) 实例
包含了调用 Google API 类时所需的凭证。

## 5. Create and use the desired API class

## 5. 创建并使用所需的 API 类

Use the API to create the desired API type and call methods.
For instance:

使用 API 来创建所需的 API 类型和调用方法，例如：

<?code-excerpt "lib/main.dart (playlist)"?>
```dart
final youTubeApi = YouTubeApi(authenticatedClient);

final favorites = await youTubeApi.playlistItems.list(
  ['snippet'],
  playlistId: 'LL', // Liked List
);
```

## More information

## 更多信息

You might want to check out the following:

你可能还需要了解以下内容：

* The [`extension_google_sign_in_as_googleapis_auth` example][auth-ex]
  is a working implementation of the concepts described on this page.

  示例 [`extension_google_sign_in_as_googleapis_auth`][auth-ex] 
  是本页面所述概念的一个可行的实现。

[auth-ex]: {{site.pub-pkg}}/extension_google_sign_in_as_googleapis_auth/example
