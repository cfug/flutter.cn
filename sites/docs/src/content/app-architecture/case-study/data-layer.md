---
# title: Data layer
title: 数据层
# shortTitle: Data layer
shortTitle: 数据层
# description: >-
#   A walk-through of the data layer of an app that implements MVVM architecture.
description: >-
  实现 MVVM 架构的应用数据层 walkthrough。
# prev:
#   title: UI layer
#   path: /app-architecture/case-study/ui-layer
prev:
  title: UI 层
  path: /app-architecture/case-study/ui-layer
# next:
#   title: Dependency Injection
#   path: /app-architecture/case-study/dependency-injection
next:
  title: 依赖注入
  path: /app-architecture/case-study/dependency-injection
ai-translated: true
---


The data layer of an application, known as the *model* in MVVM terminology,
is the source of truth for all application data.
As the source of truth,
it's the only place that application data should be updated.

应用的数据层在 MVVM 术语中称为 *model*，是所有应用数据的单一数据源。
作为单一数据源，应用数据只应在此更新。

It's responsible for consuming data from various external APIs,
exposing that data to the UI,
handling events from the UI that require data to be updated,
and sending update requests to those external APIs as needed.

它负责从各类外部 API 消费数据、向 UI 暴露数据、
处理需要更新数据的 UI 事件，并在需要时向外部 API 发送更新请求。

The data layer in this guide has two main components,
[repositories][] and [services][].

本指南中的数据层有两个主要组件：[仓库][repositories] 与 [service][services]。

![A diagram that highlights the data layer components of an application.](/assets/images/docs/app-architecture/guide/feature-architecture-simplified-Data-highlighted.png)

* **Repositories** are the source of the truth for application data, and contain
  logic that relates to that data, like updating the data in response to new
  user events or polling for data from services. Repositories are responsible
  for synchronizing the data when offline capabilities are supported, managing
  retry logic, and caching data.

  **仓库** 是应用数据的单一数据源，包含与该数据相关的逻辑，如响应用户事件更新数据或从 service 轮询数据。
  仓库负责在支持离线能力时同步数据、管理重试逻辑与缓存数据。
* **Services** are stateless Dart classes that interact with APIs, like HTTP
  servers and platform plugins. Any data that your application needs that isn't
  created inside the application code itself should be fetched from within
  service classes.

  **Service** 是无状态 Dart 类，与 HTTP 服务器、平台插件等 API 交互。
  应用所需且非应用代码内创建的数据都应在 service 类中获取。

## Define a service

## 定义 service

A service class is the least ambiguous of all the architecture components.
It's stateless, and its functions don't have side effects.
Its only job is to wrap an external API.
There's generally one service class per data source,
such as a client HTTP server or a platform plugin.


Service 类是架构组件中最明确的一类：无状态，函数无副作用，唯一职责是封装外部 API。
通常每个数据源一个 service 类，如面向客户端的 HTTP 服务器或平台插件。

![A diagram that shows the inputs and outputs of service objects.](/assets/images/docs/app-architecture/case-study/mvvm-case-study-services-architecture.png)

In the Compass app, for example, there's an [`APIClient`][] service that
handles the CRUD calls to the client-facing server.

例如 Compass 应用中有 [`APIClient`][] service，处理面向客户端服务器的 CRUD 调用。

```dart title=api_client.dart
class ApiClient {
  // Some code omitted for demo purposes.

  Future<Result<List<ContinentApiModel>>> getContinents() async { /* ... */ }

  Future<Result<List<DestinationApiModel>>> getDestinations() async { /* ... */ }

  Future<Result<List<ActivityApiModel>>> getActivityByDestination(String ref) async { /* ... */ }

  Future<Result<List<BookingApiModel>>> getBookings() async { /* ... */ }

  Future<Result<BookingApiModel>> getBooking(int id) async { /* ... */ }

  Future<Result<BookingApiModel>> postBooking(BookingApiModel booking) async { /* ... */ }

  Future<Result<void>> deleteBooking(int id) async { /* ... */ }

  Future<Result<UserApiModel>> getUser() async { /* ... */ }
}
```

The service itself is a class,
where each method wraps a different API endpoint and
exposes asynchronous response objects.
Continuing the earlier example of deleting a saved booking,
the `deleteBooking` method returns a `Future<Result<void>>`.

Service 本身是一个类，每个方法封装不同 API 端点并暴露异步响应对象。
延续删除已保存预订的示例，`deleteBooking` 返回 `Future<Result<void>>`。

:::note
Some methods return data classes that are
specifically for raw data from the API,
such as the `BookingApiModel` class.
As you'll soon see, repositories extract data and
expose it in a different format.

部分方法返回专用于 API 原始数据的数据类，如 `BookingApiModel`。
稍后你将看到，仓库提取数据并以不同格式暴露。
:::


## Define a repository

## 定义仓库

A repository's sole responsibility is to manage application data.
A repository is the source of truth for a single type of application data,
and it should be the only place where that data type is mutated.
The repository is responsible for polling new data from external sources,
handling retry logic, managing cached data,
and transforming raw data into domain models.

仓库的唯一职责是管理应用数据。
仓库是某一类应用数据的单一数据源，且应是唯一能变更该数据类型的地方。
仓库负责从外部源轮询新数据、处理重试逻辑、管理缓存数据，并将原始数据转换为领域模型。

![A diagram that highlights the repository component of an application.](/assets/images/docs/app-architecture/guide/feature-architecture-simplified-Repository-highlighted.png)

You should have a separate repository for
each different type of data in your application.
For example, the Compass app has repositories called `UserRepository`,
`BookingRepository`, `AuthRepository`, `DestinationRepository`, and more.

应用中每种不同数据类型应有一个独立仓库。
例如 Compass 有 `UserRepository`、`BookingRepository`、`AuthRepository`、`DestinationRepository` 等。

The following example is the `BookingRepository` from the Compass app,
and shows the basic structure of a repository.

以下示例来自 Compass 的 `BookingRepository`，展示仓库的基本结构。

```dart title=booking_repository_remote.dart
class BookingRepositoryRemote implements BookingRepository {
  BookingRepositoryRemote({
    required ApiClient apiClient,
  }) : _apiClient = apiClient;

  final ApiClient _apiClient;
  List<Destination>? _cachedDestinations;

  Future<Result<void>> createBooking(Booking booking) async {...}
  Future<Result<Booking>> getBooking(int id) async {...}
  Future<Result<List<BookingSummary>>> getBookingsList() async {...}
  Future<Result<void>> delete(int id) async {...}
}
```

:::note Development versus staging environments
The class in the previous example is `BookingRepositoryRemote`,
which extends an abstract class called `BookingRepository`.
This base class is used to create repositories for different environments.
For example, the compass app also has a class called `BookingRepositoryLocal`,
which is used for local development.

You can see the differences between the
[`BookingRepository` classes on GitHub][].

上一示例中的类是 `BookingRepositoryRemote`，继承抽象类 `BookingRepository`。
基类用于为不同环境创建仓库，例如 Compass 还有用于本地开发的 `BookingRepositoryLocal`。

可在 [GitHub 上的 `BookingRepository` 类][] 查看差异。
:::


The `BookingRepository` takes the `ApiClient` service as an input,
which it uses to get and update the raw data from the server.
It's important that the service is a private member,
so that the UI layer can't bypass the repository and call a service directly.

`BookingRepository` 以 `ApiClient` service 为输入，用于从服务器获取与更新原始数据。
Service 应为私有成员，以免 UI 层绕过仓库直接调用 service。

With the `ApiClient` service,
the repository can poll for updates to a user's saved bookings that
might happen on the server, and make `POST` requests to delete saved bookings.

借助 `ApiClient`，仓库可轮询服务器上用户已保存预订的更新，并通过 `POST` 请求删除预订。

The raw data that a repository transforms into application models can come from
multiple sources and multiple services,
and therefore repositories and services have a many-to-many relationship.
A service can be used by any number of repositories,
and a repository can use more than one service.

仓库转换为应用模型的原始数据可来自多个源与多个 service，
因此仓库与 service 为多对多关系：一个 service 可被任意数量仓库使用，一个仓库也可使用多个 service。

![A diagram that highlights the data layer components of an application.](/assets/images/docs/app-architecture/guide/feature-architecture-simplified-Data-highlighted.png)

### Domain models

### 领域模型

The `BookingRepository` outputs `Booking` and `BookingSummary` objects,
which are *domain models*.
All repositories output corresponding domain models.
These data models differ from API models in that they only contain the data
needed by the rest of the app.
API models contain raw data that often needs to be filtered,
combined, or deleted to be useful to the app's view models.
The repo refines the raw data and outputs it as domain models.

`BookingRepository` 输出 `Booking` 与 `BookingSummary` 等*领域模型*。
所有仓库都输出对应的领域模型。
这些数据模型与 API 模型的区别在于仅包含应用其余部分所需数据；
API 模型含常需过滤、合并或删除才有用的原始数据，仓库精炼后以领域模型输出。

In the example app, domain models are exposed through
return values on methods like `BookingRepository.getBooking`.
The `getBooking` method is responsible for getting the raw data from
the `ApiClient` service, and transforming it into a `Booking` object.
It does this by combining data from multiple service endpoints.

在示例应用中，领域模型通过 `BookingRepository.getBooking` 等方法返回值暴露。
`getBooking` 从 `ApiClient` 获取原始数据并转换为 `Booking`，通过合并多个 service 端点数据实现。

```dart title=booking_repository_remote.dart highlightLines=14-21
// This method was edited for brevity.
Future<Result<Booking>> getBooking(int id) async {
  try {
    // Get the booking by ID from server.
    final resultBooking = await _apiClient.getBooking(id);
    if (resultBooking is Error<BookingApiModel>) {
      return Result.error(resultBooking.error);
    }
    final booking = resultBooking.asOk.value;

    final destination = _apiClient.getDestination(booking.destinationRef);
    final activities = _apiClient.getActivitiesForBooking(
            booking.activitiesRef);

    return Result.ok(
      Booking(
        startDate: booking.startDate,
        endDate: booking.endDate,
        destination: destination,
        activity: activities,
      ),
    );
  } on Exception catch (e) {
    return Result.error(e);
  }
}
```

:::note
In the Compass app, service classes return `Result` objects.
`Result` is a utility class that wraps asynchronous calls and
makes it easier to handle errors and manage UI state that relies
on asynchronous calls.

This pattern is a recommendation, but not a requirement.
The architecture recommended in this guide can be implemented without it.

You can learn about this class in the [Result cookbook recipe][].

在 Compass 中，service 类返回 `Result` 对象。
`Result` 是包装异步调用的工具类，便于处理错误与管理依赖异步调用的 UI 状态。

这是建议而非硬性要求，本指南架构可不使用它。
可在 [Result 指南食谱][] 了解该类。
:::

### Complete the event cycle

### 完成事件循环

Throughout this page, you've seen how a user can delete a saved booking,
starting with an event—a user swiping on a `Dismissible` widget.
The view model handles that event by delegating
the actual data mutation to the `BookingRepository`.
The following snippet shows the `BookingRepository.deleteBooking` method.

本页你已看到用户如何删除已保存预订：从在 `Dismissible` 上滑动的事件开始，
view model 将实际数据变更委托给 `BookingRepository`。
以下片段展示 `BookingRepository.deleteBooking` 方法。

```dart title=booking_repository_remote.dart
Future<Result<void>> delete(int id) async {
  try {
    return _apiClient.deleteBooking(id);
  } on Exception catch (e) {
    return Result.error(e);
  }
}
```

The repository sends a `POST` request to the API client with
the `_apiClient.deleteBooking` method, and returns a `Result`.
The `HomeViewModel` consumes the `Result` and the data it contains,
then ultimately calls `notifyListeners`, completing the cycle.

仓库通过 `_apiClient.deleteBooking` 向 API 客户端发送 `POST` 请求并返回 `Result`。
`HomeViewModel` 消费 `Result` 及其数据，最终调用 `notifyListeners`，完成循环。

[repositories]: /app-architecture/guide#repositories
[services]:  /app-architecture/guide#services
[`APIClient`]: https://github.com/flutter/samples/blob/main/compass_app/app/lib/data/services/api/api_client.dart
[`sealed`]: {{site.dart-site}}/language/class-modifiers#sealed
[`BookingRepository` classes on GitHub]: https://github.com/flutter/samples/tree/main/compass_app/app/lib/data/repositories/booking
[GitHub 上的 `BookingRepository` 类]: https://github.com/flutter/samples/tree/main/compass_app/app/lib/data/repositories/booking
[Result cookbook recipe]: /app-architecture/design-patterns/result
[Result 指南食谱]: /app-architecture/design-patterns/result

## Feedback

## 反馈

As this section of the website is evolving,
we [welcome your feedback][]!

网站本节内容仍在完善中，
[欢迎提供反馈][welcome your feedback]！

[welcome your feedback]: https://google.qualtrics.com/jfe/form/SV_4T0XuR9Ts29acw6?page="case-study/data-layer"
