---
# title: What's new
title: 最近更新
# description: >-
#   A list of what's new on docs.flutter.dev and related documentation sites.
description: >-
  Flutter 和 Dart 文档的相关更新说明页面。
tags: Flutter文档更新
keywords: 最近更新
---

This page contains current and recent announcements
of what's new on the Flutter website and blog.
Find past what's new information on the
[what's new archive][] page.
You might also check out the
Flutter SDK [release notes][].
Also, check out the [What's new in Flutter][]
and [Flutter at Google I/O 2024 in 5 minutes][]
videos from Google I/O!

本页包含了近期的公告以及网站上的更新内容。
想要了解每个 Flutter 发布的版本更新内容，
你可以在 [更新内容归档][what's new archive] 页面上查找历史更新信息。
还可以查看 Flutter SDK [发布说明][release notes] 页面。
另外，你也可以观看 Google I/O 上的视频：
[What's new in Flutter][] 和 
[Flutter at Google I/O 2024 in 5 minutes][]。

To stay on top of Flutter announcements including
breaking changes,
join the [flutter-announce][] Google group.

要及时同步最新 Flutter 公告，包括重大变更 (breaking changes) 等，
请加入 [flutter-announce][] 邮件组。

For Dart, you can join the [Dart Announce][] Google group,
and review the [Dart changelog][].

你可以加入 [Dart Announce][] 邮件组或查看 [Dart 更新日志][Dart changelog]
了解 Dart 的更新内容。

[Dart Announce]: {{site.groups}}a/dartlang.org/g/announce
[Dart changelog]: {{site.github}}dart-lang/sdk/blob/main/CHANGELOG.md
[flutter-announce]: {{site.groups}}forum/#!forum/flutter-announce
[Flutter at Google I/O 2024 in 5 minutes]: {{site.youtube-site}}watch?v=x2WOHonEwqM
[release notes]: /release/release-notes
[What's new in Flutter]: {{site.youtube-site}}watch?v=lpnKWK-KEYs

## 14 May 2024: Google I/O 3.22 release

Flutter 3.22 is live! For more information,
check out the [Flutter 3.22 umbrella blog post][3.22-umbrella]
and the [Flutter 3.22 technical blog post][3.22-tech].

You might also check out the [Dart 3.4 release][] blog post.
In particular, Dart now provides a "baked in" language macro,
`JsonCodable`, for serializing and deserializing JSON data. 
A future (and unspecified) Dart release will allow
you to create your own macros.
To learn more, check out [dart.dev/go/macros][].

[3.22-tech]: {{site.flutter-medium}}whats-new-in-flutter-3-22-fbde6c164fe3
[3.22-umbrella]: {{site.flutter-medium}}io24-5e211f708a37
[Dart 3.4 release]: {{site.medium}}dartlang/dart-3-4-bd8d23b4462a
[dart.dev/go/macros]: http://dart.dev/go/macros

**Docs updated or added since the 3.19 release**

* A new 7-page section on [Adaptive and Responsive design][].
  (This replaces our previous, somewhat scattered,
  documentation on this subject.)
* For new-ish Flutter developer who has worked through
  the first Flutter codelab, we've added some "what's next"
  advice on how to move beyond that initial step.
  Check out the docs for the
  [First week experience of Flutter][], also called **FWE**.
* Our [Flutter install][] docs have been revamped.
* We have three new codelabs and a new guide for the Games Toolkit.
  To see the list of additions,
  check out the updated [Casual Games Toolkit][] page.
* A new section, [Conditionally bundling assets based on flavor][],
  in the Flavors page.
* Flutter support for Web Assembly (Wasm) has now reached stable.
  To learn more, check out the updated
  [Support for WebAssembly (Wasm)][] page.
* DevTools has a new screen for evaluating deep links on Android.
  To learn more, check out the new page, [Validate deep links][].
* We have a new page that describes web bootstrapping for
  Flutter SDK release 3.22 and later.
  Check out [Flutter web app initialization][].
* You can now provide code to transform your assets
  into another format at runtime. To learn more,
  check out [Transforming assets at build time][].

**Website infrastructure**

* If you contribute to the website, you might have noticed
  some recent changes. Namely, the website infrastructure
  has been updated and the new workflow is simpler.
  For more details, check out the [website README][].
* You might also have noticed that the **App solutions**
  submenu in the sidenav now has an **AI** section,
  and an enhanced **Monetization** section,
  to name some of the changes.

[Adaptive and Responsive design]: /ui/adaptive-responsive
[Casual Games Toolkit]: /resources/games-toolkit
[Conditionally bundling assets based on flavor]: /deployment/flavors#conditionally-bundling-assets-based-on-flavor
[First week experience of Flutter]: /get-started/fwe
[Flutter install]: /get-started/install
[Flutter web app initialization]: /platform-integration/web/bootstrapping
[website README]: {{site.repo.organization}}website/?tab=readme-ov-file#flutter-documentation-website
[Support for WebAssembly (Wasm)]: /platform-integration/web/wasm
[Transforming assets at build time]: /ui/assets/asset-transformation
[Validate deep links]: /tools/devtools/deep-links

**Articles**

The following articles were published on the [Flutter Medium][]
publication since Flutter 3.19:

[Flutter Medium]: {{site.flutter-medium}}

## 15 February 2024: Valentine's-Day-adjacent 3.19 release

Flutter 3.19 is live! For more information,
check out the [Flutter 3.19 umbrella blog post][3.19-umbrella]
and the [Flutter 3.19 technical blog post][3.19-tech].

You might also check out the [Dart 3.3 release][] blog post.

[3.19-tech]: {{site.flutter-medium}}whats-new-in-flutter-3-19-58b1aae242d2
[3.19-umbrella]: {{site.flutter-medium}}starting-2024-strong-with-flutter-and-dart-cae9845264fe
[Dart 3.3 release]: {{site.medium}}dartlang/new-in-dart-3-3-extension-types-javascript-interop-and-more-325bf2bf6c13

**Docs updated or added since the 3.16 release**

* A new page on [migrating from Material 2 to Material 3][]
  is added. Thanks to [@TahaTesser][] for writing this guide.
* Material 3 uses theming in new and different ways than
  Material 2. The [Use themes to share colors and font styles][]
  cookbook recipe is updated to reflect these changes.
* The [Flutter install][] pages have been updated. Please
  [let us know][] if you have any feedback.
* The [Concurrency and isolates][] page has been reworked.

[@TahaTesser]: {{site.github}}TahaTesser
[Concurrency and isolates]: /perf/isolates
[Flutter install]: /get-started/install
[let us know]: {{site.repo.organization}}website/issues/new/choose
[migrating from Material 2 to Material 3]: /release/breaking-changes/material-3-migration
[Use themes to share colors and font styles]: /cookbook/design/themes

**Other updates**

* Check out the just-published
  [Flutter and Dart 2024 Roadmap][].
* Check out [Harness the Gemini API in your Dart and Flutter apps][].

[Flutter and Dart 2024 Roadmap]: {{site.repo.flutter}}wiki/Roadmap
[Harness the Gemini API in your Dart and Flutter apps]: {{site.flutter-medium}}harness-the-gemini-api-in-your-dart-and-flutter-apps-00573e560381

---

For past releases, check out the
[What's new archive][] page.

[What's new archive]: /release/archive-whats-new

