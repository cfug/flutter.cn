---
title: FAQ
title: 常见问题与解答
description: Frequently asked questions and answers.
description: 常见问题与解答
---

## Introduction

## 简介

### What is Flutter?

Flutter is Google’s portable UI toolkit for crafting high-quality
native experiences for mobile, web and desktop in record time.
Flutter works with existing code, is used by developers
and organizations around the world, and is free and open source.

Flutter 是 Google 的便携式 UI 工具包，帮助你在移动、web、桌面端创造高质量的绝妙原生体验的应用。
Flutter 可以和世界上的开发人员和开发组织广泛使用的那些现存代码一起使用，并且是开源的、免费的。

### What does Flutter do?

### Flutter 是干什么的？

For users, Flutter makes beautiful app UIs come to life.

对于用户来说，Flutter 让漂亮的应用 UI 变得生动有趣。

For developers, Flutter lowers the bar to entry
for building mobile apps. It speeds up development of
mobile apps and reduces the cost and complexity
of app production across iOS and Android.

For designers, Flutter helps deliver the original design vision,
without loss of fidelity or compromises. It also
acts as a productive prototyping tool.

### Who is Flutter for?

Flutter is for _developers_ that want a faster
way to build beautiful mobile apps, or
a way to reach more users with a single investment.

Flutter is also for _engineering managers_ that need to lead
mobile development teams. Flutter allows eng managers
to create a single _mobile app dev team_, unifying their
development investments to ship more features faster,
ship the same feature set to iOS and Android at the same
time, and lower maintenance costs.

While not the initial target audience,
Flutter is also for _designers_
that want their original design visions delivered
consistently, with high fidelity, to all users on mobile.

Fundamentally, Flutter is for users that want beautiful apps,
with delightful motion and animation, and UIs with character
and an identity all their own.

### How experienced of a programmer/<wbr>developer do I have to be to use Flutter?

Flutter is approachable to programmers familiar with object-oriented
concepts (classes, methods, variables, etc) and imperative programming
concepts (loops, conditionals, etc).

No prior mobile experience is required in order to learn and use Flutter.

We have seen people with very little programming experience learn
and use Flutter for prototyping and app development.

### What kinds of apps can I build with Flutter?

Flutter is optimized for 2D mobile apps that want to run on
both Android and iOS.

Apps that need to deliver brand-first designs are particularly
well suited for Flutter. However, apps that need to look like
stock platform apps can also be built with Flutter.

You can build full-featured apps with Flutter, including
camera, geolocation, network, storage, 3rd-party SDKs, and more.

### Who makes Flutter?

Flutter is an open source project, with contributions from Google
and the community.

### Who uses Flutter?

Developers inside and outside of Google use Flutter to build
beautiful native apps for iOS and Android.
To learn about some of these apps, visit the [showcase](/showcase).

### What makes Flutter unique?

Flutter is different than most other options for building
mobile apps because Flutter uses neither WebView nor the OEM widgets
that shipped with the device. Instead, Flutter uses its own high-performance
rendering engine to draw widgets.

In addition, Flutter is different because it only has a thin layer of
C/C++ code. Flutter implements most of its system (compositing, gestures,
animation, framework, widgets, etc) in _Dart_ (a modern, concise,
object-oriented language) that developers can
easily approach read, change, replace, or remove.
This gives developers tremendous
control over the system, as well as significantly lowers the bar
to approachability for the majority of the system.

### Should I build my next production app with Flutter?

Flutter 1.0 was launched on Dec 4th, 2018. Thousands of apps
have shipped with Flutter to hundreds of millions of devices.
See some sample apps in the [showcase](/showcase).

For more information on the launch and subsequent releases,
see [Flutter 1.0: Google's Portable UI
Toolkit](https://developers.googleblog.com/2018/12/flutter-10-googles-portable-ui-toolkit.html).

## What does Flutter provide?

### What is inside the Flutter SDK?

* Heavily optimized, mobile-first 2D rendering engine with excellent support for
  text
* Modern react-style framework
* Rich set of widgets for Android and iOS
* APIs for unit and integration tests
* Interop and plugin APIs to connect to the system and 3rd-party SDKs
* Headless test runner for running tests on Windows, Linux, and Mac
* Command-line tools for creating, building, testing, and compiling your apps

### Does Flutter work with any editors or IDEs?

We support plugins for [Android
Studio]({{site.android-dev}}/studio),
[IntelliJ IDEA](https://www.jetbrains.com/idea/),
and [VS Code](https://code.visualstudio.com/).

See [editor configuration](/docs/get-started/editor) for setup details, and
['Developing Flutter apps in an IDE'](/docs/development/tools/android-studio)
for tips on how to use the plugins.

Alternatively, you can use a combination of the `flutter` command in a terminal
and one of the many editors that support [editing
Dart]({{site.dart-site}}/tools).

### Does Flutter come with a framework?

Yes! Flutter ships with a modern framework, inspired by React.
Flutter's framework is designed to be layered and customizable (and optional).
Developers can choose to use only parts of the framework, or a different
framework.

### Does Flutter come with widgets?

Yes! Flutter ships with a set of
[high quality Material Design and Cupertino (iOS-style) widgets][widgets],
layouts, and themes. Of course, these widgets are only a starting point.
Flutter is designed to make it easy to
create your own widgets, or customize the existing widgets.

### Does Flutter support Material Theming?

Yes! The Flutter and Material teams collaborate closely,
and Material Theming is fully supported. A number of
examples of this are shown in the [MDC-103 Flutter: Material
Theming]({{site.codelabs}}/codelabs/mdc-103-flutter) codelab.

### Does Flutter come with a testing framework?

Yes, Flutter provides APIs for writing unit and integration
tests. Learn more about
[testing with Flutter](/docs/testing).

We use our own testing capabilities to test our SDK. We measure our
[test coverage](https://coveralls.io/github/flutter/flutter?branch=master)
on every commit.

### Does Flutter come with a dependency injection framework or solution?

Not at this time. Please share your ideas at
[{{site.email}}](mailto:{{site.email}}).

## Technology

### What technology is Flutter built with?

Flutter is built with C, C++, Dart, and Skia (a 2D rendering engine). See this
[architecture
diagram](https://docs.google.com/presentation/d/1cw7A4HbvM_Abv320rVgPVGiUP2msVs7tfGbkgdrTy0I/edit#slide=id.gbb3c3233b_0_162)
for a better picture of the main components.

### How does Flutter run my code on Android? {#run-android}

The engine's C and C++ code are compiled with Android's NDK. The Dart code
(both the SDK's and yours) are ahead-of-time (AOT) compiled into a native, ARM and x86
libraries. Those libraries are included in a "runner" Android project, and the whole
thing is built into an APK. When launched, the app loads the Flutter library.
Any rendering, input or event handling, and so on, are delegated to the compiled
Flutter and app code. This is similar to the way many game engines work.

Debug mode builds use a virtual machine (VM) to run Dart code (hence the "debug"
banner they show to remind people that they're slightly slower) in order to
enable stateful hot reload.

### How does Flutter run my code on iOS? {#run-ios}

The engine's C and C++ code are compiled with LLVM. The Dart code (both the
SDK's and yours) are ahead-of-time (AOT) compiled into a native, ARM library.
That library is included in a "runner" iOS project, and the whole thing is built
into an `.ipa`. When launched, the app loads the Flutter library. Any rendering,
input or event handling, and so on, are delegated to the compiled Flutter and
app code. This is similar to the way many game engines work.

Debug mode builds use a virtual machine (VM) to run Dart code (hence the "debug"
banner they show to remind people that they're slightly slower) in order to
enable stateful hot reload.

### Does Flutter use my system's OEM widgets?

No. Instead, Flutter provides a set of widgets
(including Material Design and Cupertino (iOS-styled) widgets),
managed and rendered by Flutter's framework and engine.
You can browse a
[catalog of Flutter's widgets](/docs/development/ui/widgets).

We are hoping the end-result will be higher quality apps. If we reused
the OEM widgets, the quality and performance of Flutter apps would be
limited by the quality of those widgets.

In Android, for example, there's a hard-coded set of gestures and fixed
rules for disambiguating them. In Flutter, you can write your
own gesture recognizer that is a first-class participant in the
[gesture system](/docs/development/ui/advanced/gestures). Moreover, two widgets
authored by different people can coordinate to disambiguate gestures.

Modern app design trends point towards designers and users wanting
more motion-rich UIs and brand-first designs.
In order to achieve that level of customized, beautiful design,
Flutter is architectured to drive pixels instead of the OEM widgets.

By using the same renderer, framework, and set of widgets, it's
easier to publish for both iOS and Android concurrently, without having to do
careful and costly planning to align two separate codebases and feature sets.

By using a single language, a single framework,
and a single set of libraries for all of your UI
(regardless if your UI is different for each mobile platform
or largely consistent), we also aim to
help lower app development and maintenance costs.

### What happens when my mobile OS updates and introduces new widgets?

The Flutter team watches the adoption and demand for new mobile
widgets from iOS and Android, and aims to work with the community
to build support for new widgets. This work may come in the form
of lower-level framework features, new composable widgets, or new
widget implementations.

Flutter's layered architecture is designed to support numerous
widget libraries, and we encourage and support the community in
building and maintaining widget libraries.

### What happens when my mobile OS updates and introduces new platform capabilities?

Flutter's interop and plugin system is designed to allow
developers to access new mobile OS features and capabilities
immediately. Developers don't have to wait for the Flutter team
to expose the new mobile OS capability.

### What operating systems can I use to build a Flutter app?

Flutter supports development on Linux, Mac, and, Windows.

### What language is Flutter written in?

We looked at a lot of languages and runtimes, and ultimately adopted Dart for
the framework and widgets. The underlying graphics framework and the Dart
virtual machine are implemented in C/C++.

### Why did Flutter choose to use Dart?

Flutter used four primary dimensions for evaluation, and considered the needs
of framework authors, developers, and end users. We found some languages met
some requirements, but Dart scored highly on all of our evaluation dimensions
and met all our requirements and criteria.

Dart runtimes and compilers support the combination of two critical features for
Flutter: a JIT-based fast development cycle that allows for shape changing and
stateful hot reloads in a language with types, plus an Ahead-of-Time compiler
that emits efficient ARM code for fast startup and predictable performance of
production deployments.

In addition, we have the opportunity to work closely with the Dart community,
which is actively investing resources in improving Dart for use in Flutter. For
example, when we adopted Dart, the language did not have an ahead-of-time
toolchain for producing native binaries, which is instrumental in achieving
predictable, high performance, but now the language does because the Dart team
built it for Flutter. Similarly, the Dart VM has previously been optimized for
throughput but the team is now optimizing the VM for latency, which is more
important for Flutter’s workload.

Dart scores highly for us on the following primary criteria:

* _Developer productivity_. One of Flutter's main value propositions is that it
  saves engineering resources by letting developers create apps for both iOS and
  Android with the same codebase. Using a highly productive language
  accelerates developers further and makes Flutter more attractive.
  This was very important to both our framework team as well as our developers.
  The majority of Flutter is built in the same language we give to our users, so
  we need to stay productive at 100k's lines of code, without sacrificing
  approachability or readability of the framework and widgets for our developers.
  
  **开发人员生产力**。Flutter 的主要价值之一是通过让开发人员用同一套代码创建适用于 iOS 和 Android 的应用而节省开发资源。使用高生产力的语言加速开发，并提升 Flutter 的吸引力。
  这对于我们的框架团队和开发人员都很重要。
  Flutter 本身的大部分内容所用的语言都和我们提供给用户的一样，所以我们要让十万行代码保持生产力，而不会牺牲框架和部件对我们开发人员的可达性和可读性。

* _Object-orientation_. For Flutter, we want a language that's suited to
  Flutter's problem domain: creating visual user experiences. The industry has
  multiple decades of experience building user interface frameworks in
  object-oriented languages. While we could use a non-object-oriented language,
  this would mean reinventing the wheel to solve several hard problems.
  Plus, the vast majority of developers have experience with object-oriented
  development, making it easier to learn how to develop with Flutter.

* _Predictable, high performance_. With Flutter, we want to empower developers
  to create fast, fluid user experiences. In order to achieve that, we need to
  be able to run a significant amount of end-developer code during every
  animation frame. That means we need a language that both delivers high
  performance and delivers predictable performance, without periodic
  pauses that would cause dropped frames.

* _Fast allocation_. The Flutter framework uses a functional-style flow
  that depends heavily on the underlying memory
  allocator efficiently handling small, short-lived allocations.
  This style was developed in languages with this property and does
  not work efficiently in languages that lack this facility.

### Can Flutter run any Dart code?

Flutter should be able to run most Dart code that does not import (transitively,
or directly) dart:mirrors or dart:html.

### How big is the Flutter engine?

In December 2018, we measured the download size of a [minimal Flutter
app]({{site.github}}/flutter/flutter/tree/75228a59dacc24f617272f7759677e242bbf74ec/examples/hello_world)
(no Material Components, just a single `Center` widget, built with
`flutter build apk`), bundled and compressed as a release APK, to be
approximately 4.06&nbsp;MB.

For this simple app,
the core engine is approximately 2.7&nbsp;MB (compressed),
the framework + app code is approximately 820.6&nbsp;KB (compressed),
the LICENSE file is 53.5&nbsp;KB (compressed),
necessary Java code (classes.dex) is 61.8&nbsp;KB (compressed),
and there is approximately 450.4&nbsp;KB of (compressed) ICU data.

These numbers were measured using
[apkanalyzer]({{site.android-dev}}/studio/command-line/apkanalyzer),
which is also built into [Android
Studio]({{site.android-dev}}/studio/build/apk-analyzer).

On iOS, a release IPA of the same app has a download size of 10.8&nbsp;MB on an
iPhone X, as reported by Apple's App Store Connect. The IPA is larger than the
APK mainly because Apple encrypts binaries within the IPA,
making the compression less efficient (see the [iOS App Store Specific
Considerations](https://developer.apple.com/library/archive/qa/qa1795/_index.html#//apple_ref/doc/uid/DTS40014195-CH1-APP_STORE_CONSIDERATIONS)
section of Apple's
[QA1795](https://developer.apple.com/library/archive/qa/qa1795/_index.html)).

Of course, YMMV, and we recommend that you measure your own app. To measure an
Android app, run `flutter build apk` and load the APK
(`build/app/outputs/apk/release/app-release.apk`) into Android Studio
([instructions]({{site.android-dev}}/studio/build/apk-analyzer)) for a
detailed size report. To measure an iOS app, upload a release IPA to Apple's
App Store Connect ([instructions](/docs/deployment/ios)) and
obtain the size report from there.

## Capabilities

### What kind of app performance can I expect?

You can expect excellent performance. Flutter is
designed to help developers easily achieve a constant 60fps. Flutter apps run
via natively compiled code – no interpreters are involved.
This means Flutter apps start quickly.

### What kind of developer cycles can I expect? How long between edit and refresh? {#hot-reload}

Flutter implements a _hot reload_ developer cycle. You can expect
sub-second reload times, on a device or an emulator/simulator.

Flutter's hot reload is _stateful_, which means the app state
is retained after a reload. This means you can quickly iterate
on a screen deeply nested in your app, without starting
from the home screen after every reload.

### How is 'hot reload' different from 'hot restart'?

Hot reload works by injecting updated source code files into the running Dart VM
(Virtual Machine). This includes not only adding new classes, but also adding
methods and fields to existing classes, and changing existing functions. A few
types of code changes cannot be hot reloaded though:

* Global variable initializers.
* Static field initializers.
* The `main()` method of the app.

See [Using Hot Reload](/docs/development/tools/hot-reload) for additional details.

### Where can I deploy my Flutter app?

You can compile and deploy your Flutter app to iOS and Android.

### What devices and OS versions does Flutter run on?

Mobile operating systems: Android Jelly Bean, v16, 4.1.x or newer, and
iOS 8 or newer.

Mobile hardware: iOS devices (iPhone 4S or newer) and ARM Android devices.

Note Flutter currently does not support building for x86 Android
(issue [#9253]({{site.github}}/flutter/flutter/issues/9253))
directly, however apps built for ARMv7 or ARM64 run fine (via ARM emulation)
on many x86 Android devices.

We support developing Flutter apps with Android and iOS devices, as
well as with Android emulators and the iOS simulator.

We test on a variety of low-end to high-end phones
but we don't yet have an official device compatibility guarantee.

We believe Flutter works well on tablets. We do not currently implement
all of the tablet-specific adaptations recommended by Material Design,
though we are planning further investment in this area.

### Does Flutter run on the web?

We're [working on porting Flutter to the Web]({{site.flutter-medium}}/hummingbird-building-flutter-for-the-web-e687c2a023a8),
by taking advantage of the capability of the Dart platform to compile to JavaScript.
This will enable Flutter code to run on the standards-based Web without change.
This is not currently available.

### Can I use Flutter to build desktop apps?

Yes, but right now it's not very well supported.
We're working on making this a first class experience.
Our current progress is documented [on our wiki](https://github.com/flutter/flutter/wiki/Desktop-shells).

### Can I use Flutter inside of my existing native app?

Yes, you can embed a Flutter view in your existing Android or iOS app, however
our tooling is currently not fully optimized for this use case (see
[issue #14821]({{site.github}}/flutter/flutter/issues/14821) for details).

Two current demonstrations of this are the
[platform_view]({{site.github}}/flutter/flutter/tree/master/examples/platform_view)
and [flutter_view]({{site.github}}/flutter/flutter/tree/master/examples/flutter_view)
examples. Some initial documentation is available in the wiki page
[Add Flutter to existing
apps]({{site.github}}/flutter/flutter/wiki/Add-Flutter-to-existing-apps).

### Can I access platform services and APIs like sensors and local storage?

Yes. Flutter gives developers out-of-the-box access to _some_ platform-specific
services and APIs from the operating system. However, we want to avoid the
"lowest common denominator" problem with most cross-platform APIs, so we do not
intend to build cross-platform APIs for all native services and APIs.

A number of platform services and APIs have [ready-made
packages]({{site.pub}}/flutter/) available in the Pub
site. Using an existing package [is
easy](/docs/development/packages-and-plugins/using-packages).

Finally, we encourage developers to use Flutter's asynchronous message passing
system to create your own integrations with [platform and third-party
APIs](/docs/development/platform-integration/platform-channels).
Developers can expose as much or as little of the
platform APIs as they need, and build layers of abstractions that are a best fit
for their project.

### Can I extend and customize the bundled widgets?

Absolutely. Flutter's widget system was designed to be easily customizable.

Rather than having each widget provide a large number of parameters, Flutter
embraces composition. Widgets are built out of smaller widgets that you can
reuse and combine in novel ways to make custom widgets. For example, rather
than subclassing a generic button widget, RaisedButton combines a Material
widget with a GestureDetector widget. The Material widget provides the visual
design and the GestureDetector widget provides the interaction design.

To create a button with a custom visual design, you can combine widgets that
implement your visual design with a GestureDetector, which provides the
interaction design. For example, CupertinoButton follows this approach and
combines a GestureDetector with several other widgets that implement its
visual design.

Composition gives you maximum control over the visual and interaction design
of your widgets while also allowing a large amount of code reuse. In the
framework, we've decomposed complex widgets to pieces that separately implement
the visual, interaction, and motion design. You can remix these widgets however
you like to make your own custom widgets that have full range of expression.

### Why would I want to share layout code across iOS and Android?

You can choose to implement different app layouts for iOS and Android.
Developers are free to check the mobile OS at runtime
and render different layouts, though we find this practice to be rare.

More and more, we see mobile app layouts and designs evolving
to be more brand-driven and unified across platforms. This implies
a strong motivation to share layout and UI code across iOS and
Android.

The brand identity and customization of the app's aesthetic design is now
becoming more important than strictly adhering to traditional platform
aesthetics. For example, app designs often require custom fonts, colors,
shapes, motion, and more in order to clearly convey their brand identity.

We also see common layout patterns deployed across iOS and Android.
For example, the "bottom nav bar" pattern can now be naturally found
across iOS and Android. There seems to be a convergence of design ideas
across mobile platforms.

### Can I interop with my mobile platform's default programming language?

Yes, Flutter supports calling into the platform, including integrating with
Java or Kotlin code on Android, and ObjectiveC or Swift code on iOS.
This is enabled via a flexible message passing style where a Flutter app
may send and receive messages to the mobile platform using a
[`BasicMessageChannel`]({{site.api}}/flutter/services/BasicMessageChannel-class.html).

Learn more about accessing platform and third-party services in Flutter with
[platform channels](/docs/development/platform-integration/platform-channels).

Here is an [example
project]({{site.github}}/flutter/flutter/tree/master/examples/platform_channel)
that shows how to use a platform channel to access battery state information on
iOS and Android.

### Does Flutter come with a reflection/mirrors system?

Not at this time. Because Flutter apps are pre-compiled for production,
and binary size is always a concern with mobile apps, we disabled
dart:mirrors. We are curious what you might need reflection/mirrors
for&mdash;please let us know at [{{site.email}}](mailto:{{site.email}}).

### How do I do international&shy;ization (i18n), localization (l10n), and accessibility (a11y) in Flutter?

Learn more about i18n and l10n in the
[internationalization tutorial](/docs/development/accessibility-and-localization/internationalization).

Learn more about a11y in the [accessibility documentation](/docs/development/accessibility-and-localization/accessibility).

### How do I write parallel and/or concurrent apps for Flutter?

Flutter supports isolates. Isolates are separate heaps in Flutter's VM, and they
are able to run in parallel (usually implemented as separate threads). Isolates
communicate by sending and receiving asynchronous messages. Flutter does not
currently have a shared-memory parallelism solution, although we are evaluating
solutions for this.

Check out an [example of using isolates with
Flutter]({{site.github}}/flutter/flutter/blob/master/examples/layers/services/isolate.dart).

### Can I run Dart code in the background of an Flutter app?

Yes, you can run Dart code in a background process on both iOS and Android.
For more information, see the Medium article
[Executing Dart in the Background with Flutter Plugins and
Geofencing]({{site.flutter-medium}}/executing-dart-in-the-background-with-flutter-plugins-and-geofencing-2b3e40a1a124).

### Can I use JSON/XML/<wbr>protobuffers, etc. with Flutter?

Absolutely. There are libraries on the
[Pub site]({{site.pub}}) for JSON, XML,
protobufs, and many other utilities and formats.

For a detailed writeup on using JSON with Flutter, check out [the JSON
tutorial](/docs/development/data-and-backend/json).

### Can I build 3D (OpenGL) apps with Flutter?

Today we don't support for 3D via OpenGL ES or similar. We have long-term plans
to expose an optimized 3D API, but right now we're focused on 2D.

### Why is my APK or IPA so big?

Usually, assets including images, sound files, fonts, etc, are the bulk
of an APK or IPA.
Various tools in the Android and iOS ecosystems can help you understand
what's inside of your APK or IPA.

Also, be sure to create a
_release build_
of your APK or IPA with the Flutter tools.
A release build is usually _much_ smaller
than a _debug build_.

Learn more about creating a
[release build of your Android app](/docs/deployment/android),
and creating a [release build of your iOS app](/docs/deployment/ios).

### Do Flutter apps run on Chromebooks?

We have seen Flutter apps run on some Chromebooks.
We are tracking [issues related to running Flutter on
Chromebooks]({{site.github}}/flutter/flutter/labels/platform-arc).

## Framework

### Why is the build() method on State, not StatefulWidget?

Putting a `Widget build(BuildContext context)` method on State
rather putting a `Widget build(BuildContext context, State state)`
method on StatefulWidget gives developers more flexibility when
subclassing StatefulWidget. You can read a more
[detailed discussion on the API docs for
State.build]({{site.api}}/flutter/widgets/State/build.html).

### Where is Flutter's markup language? Why doesn't Flutter have a markup syntax?

Flutter UIs are built with an imperative, object-oriented
language (Dart, the same language used to build Flutter's framework). Flutter
does not ship with a declarative markup.

We found that UIs dynamically built with code allow for
more flexibility. For example, we have found it difficult
for a rigid markup system to express and produce
customized widgets with bespoke behaviours.

We have also found that our "code-first" better allows for features like
hot reload and dynamic environment adaptations.

It is possible to create a custom language that is then
converted to widgets on the fly. Because build methods are "just code", they
can do anything, including interpreting markup and turning it into widgets.

### My app has a Debug banner/ribbon in the upper right. Why am I seeing that?

By default `flutter run` command uses the debug build configuration.

The debug configuration runs your Dart code in a VM (Virtual Machine) enabling a
fast development cycle with [hot reload](#hot-reload) (release builds are
compiled using the standard [Android](#run-android) and [iOS](#run-ios)
toolchains).

The debug configuration also checks all asserts, which helps you catch errors
early during development, but imposes a runtime cost. The "Debug" banner
indicates that these checks are enabled. You can run your app without these
checks by using either the `--profile` or `--release` flag to `flutter run`.

If you are using the Flutter plugin for IntelliJ, you can launch the app in
profile or release mode using the menu entries
**Run > Flutter Run in Profile Mode** or **Release Mode**.

### What programming paradigm does Flutter's framework use?

Flutter is a multi-paradigm programming environment. Many programming techniques
developed over the past few decades are used in Flutter. We use each one where
we believe the strengths of the technique make it particularly well-suited. In
no particular order:

* Composition: The primary paradigm used by Flutter is that of using
small objects with narrow scopes of behavior, composed together to
obtain more complicated effects. Most widgets in the Flutter widget
library are built in this way. For example, the Material
[FlatButton]({{site.api}}/flutter/material/FlatButton-class.html)
class is built using a
[MaterialButton]({{site.api}}/flutter/material/MaterialButton-class.html)
class, which itself is built using
an [IconTheme]({{site.api}}/flutter/widgets/IconTheme-class.html),
an [InkWell]({{site.api}}/flutter/material/InkWell-class.html),
a [Padding]({{site.api}}/flutter/widgets/Padding-class.html),
a [Center]({{site.api}}/flutter/widgets/Center-class.html),
a [Material]({{site.api}}/flutter/material/Material-class.html),
an [AnimatedDefaultTextStyle]({{site.api}}/flutter/widgets/AnimatedDefaultTextStyle-class.html),
and a [ConstrainedBox]({{site.api}}/flutter/widgets/ConstrainedBox-class.html).
The [InkWell]({{site.api}}/flutter/material/InkWell-class.html)
is built using a [GestureDetector]({{site.api}}/flutter/widgets/GestureDetector-class.html).
The [Material]({{site.api}}/flutter/material/Material-class.html)
is built using an [AnimatedDefaultTextStyle]({{site.api}}/flutter/widgets/AnimatedDefaultTextStyle-class.html),
a [NotificationListener]({{site.api}}/flutter/widgets/NotificationListener-class.html),
and an [AnimatedPhysicalModel]({{site.api}}/flutter/widgets/AnimatedPhysicalModel-class.html).
And so on. It's widgets all the way down.

* Functional programming: Entire applications can be built with only
[StatelessWidget]({{site.api}}/flutter/widgets/StatelessWidget-class.html)s,
which are essentially functions that describe how arguments map to other
functions, bottoming out in primitives that compute layouts or paint graphics.
(Such applications can't easily have state, so are typically non-interactive.)
For example, the [Icon]({{site.api}}/flutter/widgets/Icon-class.html)
widget is essentially a function that maps its arguments
([color]({{site.api}}/flutter/widgets/Icon/color.html),
[icon]({{site.api}}/flutter/widgets/Icon/icon.html),
[size]({{site.api}}/flutter/widgets/Icon/size.html)) into layout
primitives. Additionally, heavy use is made of immutable data structures,
including the entire
[Widget]({{site.api}}/flutter/widgets/Widget-class.html) class
hierarchy as well as numerous supporting classes such as
[Rect]({{site.api}}/flutter/dart-ui/Rect-class.html) and
[TextStyle]({{site.api}}/flutter/painting/TextStyle-class.html). On a
smaller scale, Dart's
[Iterable]({{site.api}}/flutter/dart-core/Iterable-class.html) API,
which makes heavy use of the functional style (map, reduce, where, etc), is
frequently used to process lists of values in the framework.

* Event-driven programming: User interactions are represented by event objects
that are dispatched to callbacks registered with event handlers. Screen updates
are triggered by a similar callback mechanism. The
[Listenable]({{site.api}}/flutter/foundation/Listenable-class.html)
class, which is used as the basis of the animation system, formalizes a
subscription model for events with multiple listeners.

* Class-based object-oriented programming: Most of the APIs of the framework
are built using classes with inheritance. We use an approach whereby we define
very high-level APIs in our base classes, then specialize them iteratively in
subclasses. For example, our render objects have a base class
([RenderObject]({{site.api}}/flutter/rendering/RenderObject-class.html))
that is agnostic regarding the coordinate system, and then we have a subclass
([RenderBox]({{site.api}}/flutter/rendering/RenderBox-class.html))
that introduces the opinion that the geometry should be based on the Cartesian
coordinate system (x/width and y/height).

* Prototype-based object-oriented programming: The
[ScrollPhysics]({{site.api}}/flutter/widgets/ScrollPhysics-class.html)
class chains instances to compose the physics that apply to scrolling
dynamically at runtime. This lets the system compose, for example, paging
physics with platform-specific physics, without the platform having to be
selected at compile time.

* Imperative programming: Straightforward imperative programming, usually
paired with state encapsulated within an object, is used where it provides the
most intuitive solution. For example, tests are written in an imperative style,
first describing the situation under test, then listing the invariants that the
test must match, then advancing the clock or inserting events as necessary for
the test.

* Reactive programming: The widget and element trees are sometimes described as
reactive, because new inputs provided in a widget's constructor are immediately
propagated as changes to lower-level widgets by the widget's build method, and
changes made in the lower widgets (e.g., in response to user input) propagate
back up the tree via event handlers. Aspects of both functional-reactive and
imperative-reactive are present in the framework, depending on the needs of the
widgets. Widgets with build methods that consist of just an expression
describing how the widget reacts to changes in its configuration are functional
reactive widgets (e.g., the Material
[Divider]({{site.api}}/flutter/material/Divider-class.html) class).
Widgets whose build methods construct a list of children over several
statements, describing how the widget reacts to changes in its configuration,
are imperative reactive widgets (e.g., the
[Chip]({{site.api}}/flutter/material/Chip-class.html) class).

* Declarative programming: The build methods of widgets are often a single
expression with multiple levels of nested constructors, written using a strictly
declarative subset of Dart. Such nested expressions could be mechanically
transformed to or from any suitably expressive markup language. For example,
the
[UserAccountsDrawerHeader]({{site.api}}/flutter/material/UserAccountsDrawerHeader-class.html)
widget has a long build method (20+ lines), consisting of a single nested
expression. This can also be combined with the imperative style to build UIs
that would be harder to describe in a pure-declarative approach.

* Generic programming: Types can be used to help developers catch programming
errors early. The Flutter framework uses generic programming to help in this
regard. For example, the
[State]({{site.api}}/flutter/widgets/State-class.html) class is
parameterized in terms of the type of its associated widget, so that the Dart
analyzer can catch mismatches of states and widgets. Similarly, the
[GlobalKey]({{site.api}}/flutter/widgets/GlobalKey-class.html) class
takes a type parameter so that it can access a remote widget's state in a
type-safe manner (using runtime checking), the
[Route]({{site.api}}/flutter/widgets/Route-class.html) interface is
parameterized with the type that it is expected to use when
[popped]({{site.api}}/flutter/widgets/Navigator/pop.html), and
collections such as
[List]({{site.api}}/flutter/dart-core/List-class.html)s,
[Map]({{site.api}}/flutter/dart-core/Map-class.html)s, and
[Set]({{site.api}}/flutter/dart-core/Set-class.html)s are all
parameterized so that mismatched elements can be caught early either during
analysis or at runtime during debugging.

* Concurrent programming: Flutter makes heavy use of
[Future]({{site.api}}/flutter/dart-async/Future-class.html)s and
other asynchronous APIs. For example, the animation system reports when an
animation is finished by completing a future. The image loading system similarly
uses futures to report when a load is complete.

* Constraint programming: The layout system in Flutter uses a weak form of
constraint programming to determine the geometry of a scene. Constraints (e.g.,
for cartesian boxes, a minimum and maximum width and a minimum and maximum
height) are passed from parent to child, and the child selects a resulting
geometry (e.g., for cartesian boxes, a size, specifically a width and a height)
that fulfills those constraints. By using this technique, Flutter can usually
lay out an entire scene with a single pass.

## Project

### Where can I get support?

If you think you've encountered a bug, please file it in our
[issue tracker]({{site.github}}/flutter/flutter/issues). We
encourage you to use
[Stack Overflow]({{site.so}}/tags/flutter) for "HOWTO" type questions.
For discussions, please join our mailing list at
[{{site.email}}](mailto:{{site.email}}).

### How do I get involved?

Flutter is open source, and we encourage you to contribute. You can start by
simply filing issues for feature requests and bugs in our
[issue tracker]({{site.github}}/flutter/flutter/issues).

We recommend that you join our mailing list at
[{{site.email}}](mailto:{{site.email}}) and let us
know how you're using Flutter and what you'd like to do with it.

If you're
interested in contributing code, you can start by reading our
[Contributing
Guide]({{site.github}}/flutter/flutter/blob/master/CONTRIBUTING.md)
and check out our list of
[easy starter issues]({{site.github}}/flutter/flutter/issues?q=is%3Aopen+is%3Aissue+label%3A%22easy+fix%22).

### Is Flutter open source?

Yes, Flutter is open source technology. You can find the project
on [GitHub]({{site.github}}/flutter/flutter).

### Which software license(s) apply to Flutter and its dependencies?

Flutter includes two components: an engine that ships as a dynamically linked
binary, and the Dart framework as a separate binary that the engine loads.
The engine uses multiple software components with many dependencies; view the
complete list in its [license
file](https://raw.githubusercontent.com/flutter/engine/master/sky/packages/sky_engine/LICENSE).

The framework is entirely self-contained and requires [only one
license]({{site.github}}/flutter/flutter/blob/master/LICENSE).

In addition, any Dart packages you use may have their own license requirements.

### How can I determine the licenses my Flutter application needs to show?

There's an API to find the list of licenses you need to show:

* If your application has a
  [Drawer]({{site.api}}/flutter/material/Drawer-class.html),
  add an
  [AboutListTile]({{site.api}}/flutter/material/AboutListTile-class.html).

* If your application doesn't have a Drawer but does use the Material Components
  library, call either
  [showAboutDialog]({{site.api}}/flutter/material/showAboutDialog.html)
  or [showLicensePage]({{site.api}}/flutter/material/showLicensePage.html).

* For a more custom approach, you can get the raw licenses from the
  [LicenseRegistry]({{site.api}}/flutter/foundation/LicenseRegistry-class.html).

### Who works on Flutter?

Flutter is an open source project. Currently, the bulk of the development is
done by engineers at Google. If you're excited about Flutter, we encourage
you to join the community and contribute to Flutter!

[widgets]: /docs/development/ui/widgets

### What are Flutter's guiding principles?

We believe that:

* In order to reach every potential user, developers need to target multiple
  mobile platforms.
* HTML and WebViews as they exist today make it challenging to
  consistently hit high frame rates and deliver high-fidelity experiences,
  due to automatic behavior (scrolling, layout) and legacy support.
* Today, it's too costly to build the same app multiple times: it
  requires different teams, different code bases, different workflows,
  different tools, etc.
* Developers want an easier, better way to use a single codebase to
  build mobile apps for multiple target platforms, and they don't want
  to sacrifice quality, control, or performance.

We are focused on three things:

* _Control_ - Developers deserve access to, and control over, all layers of the
  system. Which leads to:
* _Performance_ - Users deserve perfectly fluid, responsive,
  jank-free apps. Which leads to:
* _Fidelity_ - Everyone deserves precise, beautiful,
  delightful mobile app experiences.

### Will Apple reject my Flutter app?

We can't speak for Apple, but Apple's policies have changed over the
years, and their App Store contains many apps built with technologies
like Unity and Flutter.
Apple has even featured Flutter apps such as [Hamilton.][Hamilton for iOS]

Of course, Apple is ultimately in charge of their ecosystem, but our goal
is to continue doing everything we can to ensure that Flutter apps can be
deployed to Apple's App Store.

[Hamilton for Android]: https://play.google.com/store/apps/details?id=com.hamilton.app
[Hamilton for iOS]: https://itunes.apple.com/us/app/hamilton-the-official-app/id1255231054?mt=8
