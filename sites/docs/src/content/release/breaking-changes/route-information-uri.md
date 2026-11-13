---
# title: Migration guide for `RouteInformation.location`
title: "`RouteInformation.location` 迁移指南"
# description: Deprecation of `RouteInformation.location` and its related APIs.
description: 弃用 `RouteInformation.location` 及其相关 API。
ai-translated: true
---

{% render "docs/breaking-changes.md" %}

## Summary

## 概要

`RouteInformation.location` and related APIs were deprecated
in the favor of `RouteInformation.uri`.

`RouteInformation.location` 及相关 API 已弃用，
请改用 `RouteInformation.uri`。

## Context

## 上下文

The [`RouteInformation`][] needs the authority information to
handle mobile deeplinks from different web domains.
The `uri` field was added to `RouteInformation` that captures
the entire deeplink information and route-related parameters
were converted to the full [`Uri`][] format.
This led to deprecation of incompatible APIs.

[`RouteInformation`][] 需要 authority 信息，
才能处理来自不同 Web 域名的移动端深层链接。
`RouteInformation` 新增了 `uri` 字段，
用于完整捕获深层链接信息，
与路由相关的参数也转换为完整的 [`Uri`][] 格式。
因此，不兼容的 API 已被弃用。

## Description of change

## 改动说明

* The `RouteInformation.location` was replaced by `RouteInformation.uri`.

  `RouteInformation.location` 已由 `RouteInformation.uri` 替代。

* The `WidgetBindingObserver.didPushRoute` was deprecated.

  `WidgetBindingObserver.didPushRoute` 已弃用。

* The `location` parameter of `SystemNavigator.routeInformationUpdated` was
  replaced by the newly added `uri` parameter.

  `SystemNavigator.routeInformationUpdated` 的 `location` 参数
  已由新增的 `uri` 参数替代。

## Migration guide

## 迁移指南

Code before migration:

迁移前的代码：

```dart
const RouteInformation myRoute = RouteInformation(location: '/myroute');
```

Code after migration:

迁移后的代码：

```dart
final RouteInformation myRoute = RouteInformation(uri: Uri.parse('/myroute'));
```

Code before migration:

迁移前的代码：

```dart
final String myPath = myRoute.location;
```

Code after migration:

迁移后的代码：

```dart
final String myPath = myRoute.uri.path;
```

Code before migration:

迁移前的代码：

```dart
class MyObserverState extends State<MyWidget> with WidgetsBindingObserver {
  @override
  Future<bool> didPushRoute(String route) => _handleRoute(route);
}
```

Code after migration:

迁移后的代码：

```dart
class MyObserverState extends State<MyWidget> with WidgetsBindingObserver {
  @override
  Future<bool> didPushRouteInformation(RouteInformation routeInformation) => _handleRoute(
    Uri.decodeComponent(
      Uri(
        path: uri.path.isEmpty ? '/' : uri.path,
        queryParameters: uri.queryParametersAll.isEmpty ? null : uri.queryParametersAll,
        fragment: uri.fragment.isEmpty ? null : uri.fragment,
      ).toString(),
    )
  );
}
```

Code before migration:

迁移前的代码：

```dart
SystemNavigator.routeInformationUpdated(location: '/myLocation');
```

Code after migration:

迁移后的代码：

```dart
SystemNavigator.routeInformationUpdated(uri: Uri.parse('/myLocation'));
```

## Timeline

## 时间线

Landed in version: 3.10.0-13.0.pre<br>
合入版本：3.10.0-13.0.pre<br>
In stable release: 3.13.0

进入稳定版：3.13.0

## References

## 参考资料

Relevant PRs:

相关 PR：

* [PR 119968][]: Implement url support for
  RouteInformation and didPushRouteInformation.

  [PR 119968][PR 119968]：为 RouteInformation
  和 didPushRouteInformation 实现 URL 支持。

[PR 119968]: {{site.repo.flutter}}/pull/119968
[`RouteInformation`]: {{site.api}}/flutter/widgets/RouteInformation-class.html
[`Uri`]: {{site.api}}/flutter/dart-core/Uri-class.html
