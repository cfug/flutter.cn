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

若要显式地为 Firebase 添加身份验证，请查阅
[使用 FirebaseUI 为 Flutter 应用添加用户身份验证流程][fb-lab] codelab，
以及 [在 Flutter 上开始使用 Firebase 身份验证][fb-auth] 文档。

[fb-lab]: {{site.firebase}}/codelabs/firebase-auth-in-flutter-apps
[Calendar]: https://developers.google.com/workspace/calendar/api/guides/overview
[fb-auth]: {{site.firebase}}/docs/auth/flutter/start
[Gmail]: https://developers.google.com/workspace/gmail/api/guides
[Google APIs package]: {{site.pub-pkg}}/googleapis
[service accounts]: https://cloud.google.com/iam/docs/service-account-overview
[YouTube]: https://developers.google.com/youtube/v3

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

From your Flutter project directory, add `googleapis`
and the packages for sign-in and authorization.

在你的 Flutter 项目目录中，
添加 `googleapis` 以及用于登录和授权的 package。

```console
$ flutter pub add googleapis googleapis_auth
$ flutter pub add google_sign_in extension_google_sign_in_as_googleapis_auth
```

The [Google APIs package][] lists the available APIs and their import paths.
Each library provides a client class, such as [`YouTubeApi`][],
that exposes the API's resources and authorization scopes.
To read the signed-in user's YouTube data, request [`youtubeReadonlyScope`][].

[Google APIs package][] 列出了可用的 API 以及导入路径。
每个库都提供了一个客户端类（例如，[`YouTubeApi`][]），
该类还暴露了 API 的资源和授权范围。
如果要读取已登录用户的 YouTube 数据，
请使用 [`youtubeReadonlyScope`][] 进行请求。

<?code-excerpt "lib/main.dart (youtube-import)"?>
```dart
// Provides the `YouTubeApi` class.
import 'package:googleapis/youtube/v3.dart';
```

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
// Provides the `GoogleSignIn` class.
import 'package:google_sign_in/google_sign_in.dart';
```

Store the [`GoogleSignIn`][] initialization future so the app initializes
the plugin only once.
Use a `FutureBuilder` to show progress while the plugin initializes
and display an error if initialization fails.
Show the sign-in controls when initialization succeeds.

将 [`GoogleSignIn`][] 初始化的 Future 进行存储，
确保应用仅初始化一次该插件。
使用 `FutureBuilder` 在插件初始化过程中显示加载，
并在初始化失败时显示错误提示。
初始化成功后，显示登录控件。

<?code-excerpt "lib/main.dart (init)"?>
```dart
class _LikedVideosPage extends StatelessWidget {
  const _LikedVideosPage();

  static final Future<void> _initialization = GoogleSignIn.instance
      .initialize();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text(_title)),
      body: Center(
        child: FutureBuilder<void>(
          future: _initialization,
          builder: (context, snapshot) {
            if (snapshot.error case final error?) {
              return Text(
                error is UnimplementedError
                    ? 'Google Sign-In is unavailable on this platform.'
                    : 'Check your Google Sign-In configuration.\n$error',
              );
            }
            if (snapshot.connectionState != ConnectionState.done) {
              return const CircularProgressIndicator();
            }
            return const _LikedVideosWidget();
          },
        ),
      ),
    );
  }
}
```

Subscribe to `authenticationEvents` before calling
`attemptLightweightAuthentication()` so your app receives a sign-in event
if the plugin restores a previous session.
Import `dart:async` for `StreamSubscription` and `unawaited`.
Cancel the subscription when the widget is disposed.

在调用 `attemptLightweightAuthentication()` 之前，
先订阅 `authenticationEvents`，
这样当插件恢复之前的会话时，
你的应用就能收到登录事件。
导入 `dart:async` 来使用 `StreamSubscription` 和 `unawaited`。
在 widget 被销毁时取消订阅。

<?code-excerpt "lib/main.dart (post-init)" plaster="none"?>
```dart
final GoogleSignIn _googleSignIn = GoogleSignIn.instance;
late final StreamSubscription<GoogleSignInAuthenticationEvent> _subscription;

@override
void initState() {
  super.initState();
  _subscription = _googleSignIn.authenticationEvents.listen(
    _onAuthenticationEvent,
    onError: (Object error) => _snackbarError(error.toString()),
  );
  unawaited(_restoreSignIn());
}

Future<void> _restoreSignIn() async {
  try {
    await _googleSignIn.attemptLightweightAuthentication();
  } on Exception catch (error) {
    _snackbarError(error.toString());
  }
}

@override
void dispose() {
  unawaited(_subscription.cancel());
  super.dispose();
}
```

On sign-in, check whether the account already has access to YouTube.
On sign-out or an account change, clear the previous account's videos.

登录时，检查该账户是否已拥有访问 YouTube 的权限。
登出或切换账户时，清除上一个账户的视频。

<?code-excerpt "lib/main.dart (auth-event)"?>
```dart
void _onAuthenticationEvent(GoogleSignInAuthenticationEvent event) {
  final user = switch (event) {
    GoogleSignInAuthenticationEventSignIn() => event.user,
    GoogleSignInAuthenticationEventSignOut() => null,
  };
  setState(() {
    _currentUser = user;
    _favoriteVideos = null;
    _loadingVideos = false;
  });
  if (user != null) {
    unawaited(_loadLikedVideos(user));
  }
}
```

For interactive sign-in, call `authenticate()` from a button press
on platforms where `supportsAuthenticate()` returns true.
For web apps, run `flutter pub add google_sign_in_web` and
[render the sign-in button provided by Google][web-sign-in].
Both flows report the signed-in account through `authenticationEvents`.

对于交互式登录，
需要在 `supportsAuthenticate()` 返回 true 的平台上，
通过点击按钮调用 `authenticate()`。
对于 Web 应用，
需要运行 `flutter pub add google_sign_in_web`，
并 [渲染 Google 提供的登录按钮][web-sign-in]。
这两种流程都会通过 `authenticationEvents` 报告已登录的账户。

[web-sign-in]: {{site.pub-pkg}}/google_sign_in_web#authentication
[gsi-pkg]: {{site.pub-pkg}}/google_sign_in
[`GoogleSignIn`]: {{site.pub-api}}/google_sign_in/latest/google_sign_in/GoogleSignIn-class.html

## 4. Obtain an authenticated HTTP client

## 4. 获取身份验证后的 HTTP 客户端

Signing in identifies the account.
To read its liked videos, request the YouTube read-only scope.

登录可识别该账户。
如果要读取该账户点赞的视频，可以请求 YouTube 的只读权限。

<?code-excerpt "lib/main.dart (youtube-scopes)"?>
```dart
const List<String> _youtubeScopes = [YouTubeApi.youtubeReadonlyScope];
```

When a user signs in, call [`authorizationForScopes`][] to check for
an existing grant without opening a consent prompt.
If it returns `null`, let the user choose when to grant access.

当用户登录时，调用 [`authorizationForScopes`][] 来检查是否已存在授权，
而无需弹出同意提示。
如果返回 `null`，则让用户自行选择何时授予访问权限。

<?code-excerpt "lib/main.dart (request-access)"?>
```dart
ElevatedButton(
  onPressed: () => _loadLikedVideos(currentUser, requestAccess: true),
  child: const Text('Load liked videos'),
),
```

Only the button handler sets `requestAccess` to `true`.
It calls [`authorizeScopes`][] as part of that user interaction.
If the user declines, keep the button available so they can try again.

只有按钮操作会将 `requestAccess` 设置为 `true`。
作为该用户交互的一部分，
它会调用 [`authorizeScopes`][]。
如果用户拒绝，请保持按钮可用，以便他们可以重试。

<?code-excerpt "lib/main.dart (scope-authorize)"?>
```dart
final authorizationClient = user.authorizationClient;
final authorization = requestAccess
    ? await authorizationClient.authorizeScopes(_youtubeScopes)
    : await authorizationClient.authorizationForScopes(_youtubeScopes);
if (!mounted || !identical(user, _currentUser)) return;
if (authorization != null) {
  videos = await _downloadLikedList(authorizationClient, authorization);
}
```

Once you have the relevant authorization tokens,
use the [`authClient`][] extension from
[`package:extension_google_sign_in_as_googleapis_auth`][] to
set up an authenticated HTTP client with the relevant credentials applied.

当你拥有相关的授权令牌后，使用
[`package:extension_google_sign_in_as_googleapis_auth`][] 提供的 [`authClient`][] 扩展，
配置一个应用了相关凭证、已通过身份验证的 HTTP 客户端。

<?code-excerpt "lib/main.dart (auth-import)"?>
```dart
import 'package:extension_google_sign_in_as_googleapis_auth/extension_google_sign_in_as_googleapis_auth.dart';
```

<?code-excerpt "lib/main.dart (auth-client)"?>
```dart
final authenticatedClient = authorization.authClient(
  scopes: _youtubeScopes,
);
```

[`authorizationForScopes`]: {{site.pub-api}}/google_sign_in/latest/google_sign_in/GoogleSignInAuthorizationClient/authorizationForScopes.html
[`authorizeScopes`]: {{site.pub-api}}/google_sign_in/latest/google_sign_in/GoogleSignInAuthorizationClient/authorizeScopes.html
[`authClient`]: {{site.pub-api}}/extension_google_sign_in_as_googleapis_auth/latest/extension_google_sign_in_as_googleapis_auth/GoogleApisGoogleSignInAuth/authClient.html
[`package:extension_google_sign_in_as_googleapis_auth`]: {{site.pub-pkg}}/extension_google_sign_in_as_googleapis_auth

## 5. Create and use the desired API class

## 5. 创建并使用所需的 API 类

Pass the authenticated client to `YouTubeApi` and request the
signed-in user's liked videos.
If YouTube rejects the access token, clear it from the sign-in cache
so the next button press can request a fresh token.
To handle an authentication challenge from the HTTP client,
import and check for `AccessDeniedException` from
`package:googleapis_auth/googleapis_auth.dart`.
Close the client when the request finishes, even if it fails.

将经过身份验证的客户端传递给 `YouTubeApi`，
并请求已登录用户点赞的视频。
如果 YouTube 拒绝了访问 token，请将其从登录缓存中清除，
以便下次点击按钮时能够请求一个新的 token。
如果要处理来自 HTTP 客户端的身份验证挑战，
可以导入并检查 `package:googleapis_auth/googleapis_auth.dart` 的
`AccessDeniedException`。
请求完成后，即使请求失败，也应该关闭客户端。

<?code-excerpt "lib/main.dart (playlist)"?>
```dart
try {
  final youTubeApi = YouTubeApi(authenticatedClient);
  final favorites = await youTubeApi.playlistItems.list(
    ['snippet'],
    playlistId: 'LL', // Liked List
  );
  return [
    for (final item in favorites.items ?? <PlaylistItem>[]) ?item.snippet,
  ];
} on Exception catch (error) {
  if (error is AccessDeniedException ||
      (error is DetailedApiRequestError && error.status == 401)) {
    await authorizationClient.clearAuthorizationToken(
      accessToken: authorization.accessToken,
    );
  }
  rethrow;
} finally {
  authenticatedClient.close();
}
```

## More information

## 更多信息

* [Complete YouTube sign-in and liked videos example][youtube-example]
* [Google People API example using the same sign-in flow][auth-ex]

[youtube-example]: {{site.repo.this}}/tree/main/examples/googleapis
[auth-ex]: {{site.pub-pkg}}/extension_google_sign_in_as_googleapis_auth/example
