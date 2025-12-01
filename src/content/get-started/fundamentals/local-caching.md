---
# title: Local caching
title: 本地缓存
# description: Learn how to persist data locally.
description: 学习如何在本地持久化数据。
prev:
  # title: Networking and data
  title: 网络与数据
  path: /get-started/fundamentals/networking
next:
  # title: Learn more
  title: 了解更多
  path: /get-started/learn-flutter
---

Now that you've learned about how to load data from servers
over the network, your Flutter app should feel more alive.
However, just because you *can* load data from remote servers
doesn't mean you always *should*. Sometimes, it's better to
re-render the data you received from the previous network
request rather than repeat it and make your user wait until
it completes again. This technique of retaining application
data to show again at a future time is called *caching*, and
this page covers how to approach this task in your Flutter app.

既然你已经学习了如何通过网络从服务器加载数据，
你的 Flutter 应用应该感觉更有活力了。
然而，仅仅因为你*能够*从远程服务器加载数据
并不意味着你总是*应该*这样做。
有时候，重新渲染你从上一次网络请求中收到的数据
比重复请求并让用户等待完成要好。
这种保留应用数据以便将来再次显示的技术称为*缓存*，
本页介绍如何在你的 Flutter 应用中处理此任务。

## Introduction to caching

## 缓存简介

At its most basic, all caching strategies amount to the same
three-step operation, represented with the following pseudocode:

在最基本的层面上，所有缓存策略都归结为相同的三步操作，
用以下伪代码表示：

```dart
Data? _cachedData;

Future<Data> get data async {
    // Step 1: Check whether your cache already contains the desired data
    if (_cachedData == null) {
        // Step 2: Load the data if the cache was empty
        _cachedData = await _readData();
    }
    // Step 3: Return the value in the cache
    return _cachedData!;
}
```

There are many interesting ways to vary this strategy,
including the location of the cache, the extent to which you
preemptively write values to, or "warm", the cache; and others.

有许多有趣的方式可以改变此策略，
包括缓存的位置、预先向缓存写入值（或「预热」缓存）的程度等。

## Common caching terminology

## 常见缓存术语

Caching comes with its own terminology, some of which is
defined and explained below.

缓存有其自己的术语，下面定义和解释了其中一些。

**Cache hit**
: An app is said to have had a cache hit when the cache already
  contained their desired information and loading it from the
  real source of truth was unnecessary.

**缓存命中**
：当缓存已经包含所需的信息，无需从真实数据源加载时，
  称应用发生了缓存命中。

**Cache miss**
: An app is said to have had a cache miss when the cache was
  empty and the desired data is loaded from the real source
  of truth, and then saved to the cache for future reads.

**缓存未命中**
：当缓存为空，所需数据从真实数据源加载，
  然后保存到缓存以供将来读取时，称应用发生了缓存未命中。

## Risks of caching data

## 缓存数据的风险

An app is said to have a **stale cache** when the data within
the source of truth has changed, which puts the app at risk
of rendering old, outdated information.

当真实数据源中的数据已更改时，
称应用的缓存为**过期缓存**，这使应用面临渲染旧的、过时信息的风险。

All caching strategies run the risk of holding onto stale data.
Unfortunately, the action of verifying the freshness of a cache
often takes as much time to complete as fully loading the data
in question. This means that most apps tend to only benefit
from caching data if they trust the data to be fresh at runtime
without verification.

所有缓存策略都面临持有过期数据的风险。
不幸的是，验证缓存新鲜度的操作通常与完全加载相关数据所需的时间一样长。
这意味着大多数应用只有在运行时信任数据是新鲜的而无需验证时，
才能从缓存数据中受益。

To deal with this, most caching systems include a time limit
on any individual piece of cached data. After this time limit
is exceeded, would-be cache hits are treated as cache misses
until fresh data is loaded.

为了处理这个问题，大多数缓存系统对任何单独的缓存数据都包含时间限制。
在超过此时间限制后，原本的缓存命中将被视为缓存未命中，
直到加载新数据。

A popular joke among computer scientists is that "The two
hardest things in computer science are cache invalidation,
naming things, and off-by-one errors." 😄

计算机科学家中流行的一个笑话是：
「计算机科学中最难的两件事是缓存失效、命名和差一错误。」😄

Despite the risks, almost every app in the world makes heavy
use of data caching. The rest of this page explores multiple
approaches to caching data in your Flutter app, but know that
all of these approaches can be tweaked or combined for your
situation.

尽管存在风险，世界上几乎每个应用都大量使用数据缓存。
本页的其余部分探讨了在 Flutter 应用中缓存数据的多种方法，
但要知道，所有这些方法都可以根据你的情况进行调整或组合。

## Caching data in local memory

## 在本地内存中缓存数据

The simplest and most performant caching strategy is an
in-memory cache. The downside of this strategy is that,
because the cache is only held in system memory, no data is
retained beyond the session in which it is originally cached.
(Of course, this "downside" also has the upside of automatically
solving most stale cache problems!)

最简单且性能最高的缓存策略是内存缓存。
此策略的缺点是，由于缓存仅保存在系统内存中，
因此在最初缓存的会话之外不会保留任何数据。
（当然，这个「缺点」也有自动解决大多数过期缓存问题的优点！）

Due to their simplicity, in-memory caches closely mimic
the pseudocode seen above. That said, it is best to use proven
design principles, like the [repository pattern][],
to organize your code and prevent cache checks like the above
from appearing all over your code base.

由于其简单性，内存缓存与上面看到的伪代码非常相似。
也就是说，最好使用经过验证的设计原则，
如[仓库模式][repository pattern]，来组织你的代码，
并防止上述缓存检查出现在代码库的各处。

Imagine a `UserRepository` class that is also tasked with
caching users in memory to avoid duplicate network requests.
Its implementation might look like this:

想象一个 `UserRepository` 类，它还负责在内存中缓存用户以避免重复的网络请求。
其实现可能如下所示：

```dart
class UserRepository {
  UserRepository(this.api);

  final Api api;
  final Map<int, User?> _userCache = {};

  Future<User?> loadUser(int id) async {
    if (!_userCache.containsKey(id)) {
      final response = await api.get(id);
      if (response.statusCode == 200) {
        _userCache[id] = User.fromJson(response.body);
      } else {
        _userCache[id] = null;
      }
    }
    return _userCache[id];
  }
}
```

This `UserRepository` follows multiple proven design
principles including:

此 `UserRepository` 遵循多个经过验证的设计原则，包括：

* [dependency injection][], which helps with testing
* [loose coupling][], which protects surrounding code from
its implementation details, and
* [separation of concerns][], which prevents its implementation
from juggling too many concerns.

* [依赖注入][dependency injection]，有助于测试
* [松耦合][loose coupling]，保护周围代码免受其实现细节的影响，以及
* [关注点分离][separation of concerns]，防止其实现处理过多的关注点

And best of all, no matter how many times within a single session
a user visits pages in your Flutter app that load a given user,
the `UserRepository` class only loads that data over the network *once*.

最重要的是，无论用户在单个会话中访问加载给定用户的
Flutter 应用页面多少次，
`UserRepository` 类只通过网络加载该数据*一次*。

However, your users might eventually tire of waiting for data
to load every time they relaunch your app. For that, you should
choose from one of the persistent caching strategies found below.

然而，你的用户最终可能会厌倦每次重新启动应用时等待数据加载。
为此，你应该从下面的持久缓存策略中选择一种。

[dependency injection]: https://en.wikipedia.org/wiki/Dependency_injection
[loose coupling]: https://en.wikipedia.org/wiki/Loose_coupling
[repository Pattern]: https://medium.com/@pererikbergman/repository-design-pattern-e28c0f3e4a30
[separation of concerns]: https://en.wikipedia.org/wiki/Separation_of_concerns

## Persistent caches

## 持久缓存

Caching data in memory will never see your precious cache
outlive a single user session.
To enjoy the performance benefits of cache hits on fresh
launches of your application, you need to cache data somewhere
on the device's hard drive.

在内存中缓存数据永远不会让你宝贵的缓存存活超过单个用户会话。
要在应用的新启动中享受缓存命中的性能优势，
你需要将数据缓存在设备的硬盘上的某个位置。

### Caching data with `shared_preferences`

### 使用 `shared_preferences` 缓存数据

[`shared_preferences`][] is a Flutter plugin that wraps
platform-specific [key-value storage][] on all six of Flutter's
target platforms.
Although these underlying platform key-value stores were designed
for small data sizes, they are still suitable for a caching
strategy for most applications.
For a complete guide, see our other resources on using key-value stores.

[`shared_preferences`][] 是一个 Flutter 插件，
它在 Flutter 的所有六个目标平台上封装了特定于平台的[键值存储][key-value storage]。
虽然这些底层平台键值存储是为小数据量设计的，
但它们仍然适用于大多数应用的缓存策略。
有关完整指南，请参阅我们关于使用键值存储的其他资源。

* Cookbook: [Store key-value data on disk][]
* Video: [Package of the Week: `shared_preferences`][]

* Cookbook：[在磁盘上存储键值数据][Store key-value data on disk]
* 视频：[每周包：`shared_preferences`][Package of the Week: `shared_preferences`]

[key-value storage]: https://en.wikipedia.org/wiki/Key%E2%80%93value_database
[Package of the Week: `shared_preferences`]: https://www.youtube.com/watch?v=sa_U0jffQII
[`shared_preferences`]: {{site.pub-pkg}}/shared_preferences
[Store key-value data on disk]: /cookbook/persistence/key-value

### Caching data with the file system

### 使用文件系统缓存数据

If your Flutter app outgrows the low-throughput scenarios
ideal for `shared_preferences`, you might be ready to explore
caching data with your device's file system.
For a more thorough guide, see our other resources on
file system caching.

如果你的 Flutter 应用超出了适合 `shared_preferences` 的低吞吐量场景，
你可能已准备好探索使用设备的文件系统来缓存数据。
有关更详尽的指南，请参阅我们关于文件系统缓存的其他资源。

* Cookbook: [Read and write files][]

* Cookbook：[读写文件][Read and write files]

[Read and write files]: /cookbook/persistence/reading-writing-files

### Caching data with an on-device database

### 使用设备上的数据库缓存数据

The final boss of local data caching is any strategy
that uses a proper database to read and write data.
Multiple flavors exist, including relational and
non-relational databases.
All approaches offer dramatically improved performance over
simple files - especially for large datasets.
For a more thorough guide, see the following resources:

本地数据缓存的终极方案是使用适当的数据库来读写数据的任何策略。
存在多种类型，包括关系型和非关系型数据库。
所有方法都比简单文件提供了显著改进的性能——尤其是对于大型数据集。
有关更详尽的指南，请参阅以下资源：

* Cookbook: [Persist data with SQLite][]
* SQLite alternate: [`sqlite3` package][]
* Drift, a relational database: [`drift` package][]
* Hive CE, a non-relational database: [`hive_ce` package][]
* Isar Community, a fast non-relational database: [`isar_community` package][]
* Remote Caching, a lightweight caching system for API responses: [`remote_caching` package][]

* Cookbook：[使用 SQLite 持久化数据][Persist data with SQLite]
* SQLite 替代方案：[`sqlite3` 包][`sqlite3` package]
* Drift，关系型数据库：[`drift` 包][`drift` package]
* Hive CE，非关系型数据库：[`hive_ce` 包][`hive_ce` package]
* Isar Community，快速非关系型数据库：[`isar_community` 包][`isar_community` package]
* Remote Caching，用于 API 响应的轻量级缓存系统：[`remote_caching` 包][`remote_caching` package]

[`drift` package]: {{site.pub-pkg}}/drift
[`hive_ce` package]: {{site.pub-pkg}}/hive_ce
[`isar_community` package]: {{site.pub-pkg}}/isar_community
[`remote_caching` package]: {{site.pub-pkg}}/remote_caching

[Persist data with SQLite]: /cookbook/persistence/sqlite
[`sqlite3` package]: {{site.pub-pkg}}/sqlite3

## Caching images

## 缓存图片

Caching images is a similar problem space to caching regular data,
though with a one-size-fits-all solution.
To direct your Flutter app to use the file system to store images,
use the [`cached_network_image` package][].

缓存图片与缓存常规数据是类似的问题空间，
但有一个一刀切的解决方案。
要指导你的 Flutter 应用使用文件系统来存储图片，
请使用 [`cached_network_image` 包][`cached_network_image` package]。

* Video: [Package of the Week: `cached_network_image`][]

* 视频：[每周包：`cached_network_image`][Package of the Week: `cached_network_image`]

{% comment %}
TODO: My understanding is that we now recommend `Image.network` instead of cache_network_image.
{% endcomment %}

[`cached_network_image` package]: {{site.pub-pkg}}/cached_network_image
[Package of the Week: `cached_network_image`]: https://www.youtube.com/watch?v=fnHr_rsQwDA

## State restoration

## 状态恢复

Along with application data, you might also want to persist other
aspects of a user's session, like their navigation stack, scroll
positions, and even partial progress filling out forms. This
pattern is called "state restoration", and is built in to Flutter.

除了应用数据，你可能还想持久化用户会话的其他方面，
如他们的导航栈、滚动位置，甚至填写表单的部分进度。
这种模式称为「状态恢复」，它内置于 Flutter 中。

State restoration works by instructing the Flutter framework
to sync data from its Element tree with the Flutter engine,
which then caches it in platform-specific storage for future
sessions. To enable state restoration on Flutter for Android
and iOS, see the following documentation:

状态恢复的工作原理是指示 Flutter 框架将其 Element 树中的数据
与 Flutter 引擎同步，然后引擎将其缓存在特定于平台的存储中以供将来的会话使用。
要在 Android 和 iOS 上的 Flutter 中启用状态恢复，请参阅以下文档：

* Android documentation: [Android state restoration][]
* iOS documentation: [iOS state restoration][]

* Android 文档：[Android 状态恢复][Android state restoration]
* iOS 文档：[iOS 状态恢复][iOS state restoration]

[Android state restoration]: /platform-integration/android/restore-state-android
[iOS state restoration]: /platform-integration/ios/restore-state-ios

## Feedback

## 反馈

As this section of the website is evolving,
we [welcome your feedback][]!

由于本网站的此部分正在不断发展，
我们[欢迎你的反馈][welcome your feedback]！

[welcome your feedback]: https://google.qualtrics.com/jfe/form/SV_6A9KxXR7XmMrNsy?page="local-caching"
