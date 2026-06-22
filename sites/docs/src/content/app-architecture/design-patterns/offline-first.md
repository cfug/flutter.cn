---
# title: "Offline-first support"
title: "离线优先支持"
# description: Implement offline-first support for one feature in an application.
description: 为应用中的某一功能实现离线优先支持。
contentTags:
  - data
  - user experience
  - repository pattern
iconPath: /assets/images/docs/app-architecture/design-patterns/offline-first-icon.svg
order: 3
ai-translated: true
---

<?code-excerpt path-base="app-architecture/offline_first"?>

An offline-first application is an app capable of offering most
or all of its functionality while being disconnected from the internet.

离线优先应用是指在断网时仍能提供大部分或全部功能的应用。

Offline-first applications usually rely on stored data
to offer users temporary access to data
that would otherwise only be available online.

离线优先应用通常依赖已存储的数据，让用户临时访问原本仅在联网时才可用的数据。

Some offline-first applications combine local and remote data seamlessly,
while other applications inform the user
when the application is using cached data.
In the same way,
some applications synchronize data in the background
while others require the user to explicitly synchronize it.
It all depends on the application requirements and the functionality it offers,
and it’s up to the developer to decide which implementation fits their needs.

有些离线优先应用会无缝融合本地与远程数据，
另一些则会在使用缓存数据时告知用户。
同样地，有些应用在后台同步数据，另一些则要求用户显式触发同步。
这完全取决于应用的需求及其提供的功能，由开发者自行决定哪种实现方式最契合自身需要。

In this guide,
you will learn how to implement different approaches
to offline-first applications in Flutter,
following the [Flutter Architecture guidelines][].

本指南将介绍如何在 Flutter 中按 [Flutter 架构指南][Flutter Architecture guidelines] 实现离线优先应用的不同方案。

## Offline-first architecture

## 离线优先架构

As explained in the common architecture concepts guide,
repositories act as the single source of truth.
They are responsible for presenting local or remote data,
and should be the only place where data can be modified.
In offline-first applications,
repositories combine different local and remote data sources
to present data in a single access point,
independently of the connectivity state of the device.

正如通用架构概念指南所述，Repository 充当单一数据源。
它们负责呈现本地或远程数据，且应是唯一能修改数据的地方。
在离线优先应用中，Repository 会合并不同的本地与远程数据源，
在单一访问点呈现数据，与设备的联网状态无关。

This example uses the `UserProfileRepository`,
a repository that allows you to obtain and store `UserProfile` objects
with offline-first support.

本示例使用 `UserProfileRepository`，它是一个支持以离线优先方式获取并存储 `UserProfile` 对象的 Repository。

The `UserProfileRepository` uses two different data services:
one works with remote data,
and the other works with a local database.

`UserProfileRepository` 使用两个不同的数据 service：一个处理远程数据，另一个处理本地数据库。

The API client,`ApiClientService`,
connects to a remote service using HTTP REST calls.

API 客户端 `ApiClientService` 通过 HTTP REST 调用连接远程服务。

<?code-excerpt "lib/data/services/api_client_service.dart (ApiClientService)"?>
```dart
class ApiClientService {
  /// performs GET network request to obtain a UserProfile
  Future<UserProfile> getUserProfile() async {
    // ···
  }

  /// performs PUT network request to update a UserProfile
  Future<void> putUserProfile(UserProfile userProfile) async {
    // ···
  }
}
```

The database service, `DatabaseService`, stores data using SQL,
similar to the one found in the [Persistent Storage Architecture: SQL][] recipe.

数据库 service `DatabaseService` 使用 SQL 存储数据，与 [持久化存储架构：SQL][Persistent Storage Architecture: SQL] 教程中的类似。

<?code-excerpt "lib/data/services/database_service.dart (DatabaseService)"?>
```dart
class DatabaseService {
  /// Fetches the UserProfile from the database.
  /// Returns null if the user profile is not found.
  Future<UserProfile?> fetchUserProfile() async {
    // ···
  }

  /// Update UserProfile in the database.
  Future<void> updateUserProfile(UserProfile userProfile) async {
    // ···
  }
}
```

This example also uses the `UserProfile` data class
that has been created using the [`freezed`][] package.

本示例还使用了通过 [`freezed`][] package 创建的 `UserProfile` 数据类。

<?code-excerpt "lib/domain/model/user_profile.dart (UserProfile)" remove="@Default(false) bool synchronized,"?>
```dart
@freezed
abstract class UserProfile with _$UserProfile {
  const factory UserProfile({
    required String name,
    required String photoUrl,
  }) = _UserProfile;
}
```

In apps that have complex data,
such as when the remote data contains more fields than the needed by the UI,
you might want to have one data class for the API and database services,
and another for the UI.
For example,
`UserProfileLocal` for the database entity,
`UserProfileRemote` for the API response object,
and then `UserProfile` for the UI data model class.
The `UserProfileRepository` would take care
of converting from one to the other when necessary.

在数据较复杂的应用中，例如远程数据包含的字段多于 UI 所需时，
你可能希望为 API 与数据库 service 准备一个数据类，再为 UI 准备另一个。
例如，用 `UserProfileLocal` 表示数据库实体、用 `UserProfileRemote` 表示 API 响应对象，
再用 `UserProfile` 作为 UI 数据模型类。
`UserProfileRepository` 会在必要时负责在它们之间相互转换。

This example also includes the `UserProfileViewModel`,
a view model that uses the `UserProfileRepository`
to display the `UserProfile` on a widget.

本示例还包含 `UserProfileViewModel`，它是一个使用 `UserProfileRepository` 在 widget 上展示 `UserProfile` 的 view model。

<?code-excerpt "lib/ui/user_profile/user_profile_viewmodel.dart (UserProfileViewModel)"?>
```dart
class UserProfileViewModel extends ChangeNotifier {
  // ···
  final UserProfileRepository _userProfileRepository;

  UserProfile? get userProfile => _userProfile;
  // ···

  /// Load the user profile from the database or the network
  Future<void> load() async {
    // ···
  }

  /// Save the user profile with the new name
  Future<void> save(String newName) async {
    // ···
  }
}
```

## Reading data

## 读取数据

Reading data is a fundamental part of any application
that relies on remote API services.

对于任何依赖远程 API 服务的应用而言，读取数据都是基础环节。

In offline-first applications,
you want to ensure that the access to this data is as fast as possible,
and that it doesn’t depend on the device being online
to provide data to the user.
This is similar to the [Optimistic State design pattern][].

在离线优先应用中，你希望尽可能快地访问这些数据，
并且无需依赖设备联网即可向用户提供数据。
这与 [乐观状态设计模式][Optimistic State design pattern] 类似。

In this section,
you will learn two different approaches,
one that uses the database as a fallback,
and one that combines local and remote data using a `Stream`.

本节将介绍两种不同方案：一种将数据库用作后备，另一种用 `Stream` 合并本地与远程数据。

### Using local data as a fallback

### 将本地数据用作后备

As a first approach,
you can implement offline support by having a fallback mechanism
for when the user is offline or a network call fails.

第一种方案是通过后备机制实现离线支持，用于用户离线或网络调用失败的情形。

In this case, the `UserProfileRepository` attempts to obtain the `UserProfile`
from the remote API server using the `ApiClientService`.
If this request fails,
then returns the locally stored `UserProfile` from the `DatabaseService`.

此时，`UserProfileRepository` 先尝试用 `ApiClientService` 从远程 API 服务器获取 `UserProfile`；
若该请求失败，则返回 `DatabaseService` 中本地存储的 `UserProfile`。

<?code-excerpt "lib/data/repositories/user_profile_repository.dart (getUserProfileFallback)" replace="/Fallback//g"?>
```dart
Future<UserProfile> getUserProfile() async {
  try {
    // Fetch the user profile from the API
    final apiUserProfile = await _apiClientService.getUserProfile();
    //Update the database with the API result
    await _databaseService.updateUserProfile(apiUserProfile);

    return apiUserProfile;
  } catch (e) {
    // If the network call failed,
    // fetch the user profile from the database
    final databaseUserProfile = await _databaseService.fetchUserProfile();

    // If the user profile was never fetched from the API
    // it will be null, so throw an  error
    if (databaseUserProfile != null) {
      return databaseUserProfile;
    } else {
      // Handle the error
      throw Exception('User profile not found');
    }
  }
}
```

### Using a Stream

### 使用 Stream

A better alternative presents the data using a `Stream`.
In the best case scenario,
the `Stream` emits two values,
the locally stored data, and the data from the server.

一种更好的替代方案是用 `Stream` 呈现数据。
在最理想的情况下，`Stream` 会发出两个值：本地存储的数据和来自服务器的数据。

First, the stream emits the locally stored data using the `DatabaseService`.
This call is generally faster and less error prone than a network call,
and by doing it first the view model can already display data to the user.

首先，stream 通过 `DatabaseService` 发出本地存储的数据。
该调用通常比网络调用更快、更不易出错，先执行它可以让 view model 尽早向用户展示数据。

If the database does not contain any cached data,
then the `Stream` relies completely on the network call,
emitting only one value.

如果数据库中没有任何缓存数据，则 `Stream` 完全依赖网络调用，只发出一个值。

Then, the method performs the network call using the `ApiClientService`
to obtain up-to-date data.
If the request was successful,
it updates the database with the newly obtained data,
and then yields the value to the view model,
so it can be displayed to the user.

随后，该方法用 `ApiClientService` 发起网络调用以获取最新数据。
若请求成功，则用新获取的数据更新数据库，再将该值 yield 给 view model，以便展示给用户。

<?code-excerpt "lib/data/repositories/user_profile_repository.dart (getUserProfile)"?>
```dart
Stream<UserProfile> getUserProfile() async* {
  // Fetch the user profile from the database
  final userProfile = await _databaseService.fetchUserProfile();
  // Returns the database result if it exists
  if (userProfile != null) {
    yield userProfile;
  }

  // Fetch the user profile from the API
  try {
    final apiUserProfile = await _apiClientService.getUserProfile();
    //Update the database with the API result
    await _databaseService.updateUserProfile(apiUserProfile);
    // Return the API result
    yield apiUserProfile;
  } catch (e) {
    // Handle the error
  }
}
```

The view model must subscribe
to this `Stream` and wait until it has completed.
For that, call `asFuture()` with the `Subscription` object and await the result.

view model 必须订阅该 `Stream` 并等待其完成。
为此，对 `Subscription` 对象调用 `asFuture()` 并 await 其结果。

For each obtained value,
update the view model data and call `notifyListeners()`
so the UI shows the latest data.

每获取到一个值，就更新 view model 的数据并调用 `notifyListeners()`，使 UI 展示最新数据。

<?code-excerpt "lib/ui/user_profile/user_profile_viewmodel.dart (load)"?>
```dart
Future<void> load() async {
  await _userProfileRepository
      .getUserProfile()
      .listen(
        (userProfile) {
          _userProfile = userProfile;
          notifyListeners();
        },
        onError: (error) {
          // handle error
        },
      )
      .asFuture<void>();
}
```
### Using only local data

### 仅使用本地数据

Another possible approach uses locally stored data for read operations.
This approach requires that the data has been preloaded
at some point into the database,
and requires a synchronization mechanism that can keep the data up to date.

另一种可行方案是读取操作仅使用本地存储的数据。
这种方案要求数据在某个时刻已预加载到数据库中，并需要一套能保持数据最新的同步机制。

<?code-excerpt "lib/data/repositories/user_profile_repository.dart (getUserProfileLocal)" replace="/Local//g;/Read//g"?>
```dart
Future<UserProfile> getUserProfile() async {
  // Fetch the user profile from the database
  final userProfile = await _databaseService.fetchUserProfile();

  // Return the database result if it exists
  if (userProfile == null) {
    throw Exception('Data not found');
  }

  return userProfile;
}

Future<void> sync() async {
  try {
    // Fetch the user profile from the API
    final userProfile = await _apiClientService.getUserProfile();

    // Update the database with the API result
    await _databaseService.updateUserProfile(userProfile);
  } catch (e) {
    // Try again later
  }
}
```

This approach can be useful for applications
that don’t require data to be in sync with the server at all times.
For example, a weather application
where the weather data is only updated once a day.

这种方案适用于无需数据始终与服务器保持同步的应用。
例如天气应用，其天气数据每天仅更新一次。

Synchronization could be done manually by the user,
for example, a pull-to-refresh action that then calls the `sync()` method,
or done periodically by a `Timer` or a background process.
You can learn how to implement a synchronization task
in the section about synchronizing state.

同步既可由用户手动触发，例如下拉刷新动作随后调用 `sync()` 方法，
也可由 `Timer` 或后台进程定期执行。
你可以在「同步状态」一节中了解如何实现同步任务。

## Writing data

## 写入数据

Writing data in offline-first applications depends fundamentally
on the application use case.

在离线优先应用中，写入数据的方式从根本上取决于应用的使用场景。

Some applications might require the user input data
to be immediately available on the server side,
while other applications might be more flexible
and allow data to be out-of-sync temporarily.

有些应用要求用户输入的数据立即在服务器端可用，
另一些则更灵活，允许数据临时处于不同步状态。

This section explains two different approaches
for implementing writing data in offline-first applications.

本节介绍在离线优先应用中实现数据写入的两种不同方案。

### Online-only writing

### 仅在线写入

One approach for writing data in offline-first applications
is to enforce being online to write data.
While this might sound counterintuitive,
this ensures that the data the user has modified
is fully synchronized with the server,
and the application doesn’t have a different state than the server.

在离线优先应用中写入数据的一种方案是强制要求联网才能写入。
这听起来或许有违直觉，但能确保用户修改的数据与服务器完全同步，
使应用不会与服务器处于不同的状态。

In this case, you first attempt to send the data to the API service,
and if the request succeeds,
then store the data in the database.

此时，你先尝试将数据发送给 API service，若请求成功，再将数据存入数据库。

<?code-excerpt "lib/data/repositories/user_profile_repository.dart (updateUserProfileOnline)" replace="/Online//g"?>
```dart
Future<void> updateUserProfile(UserProfile userProfile) async {
  try {
    // Update the API with the user profile
    await _apiClientService.putUserProfile(userProfile);

    // Only if the API call was successful
    // update the database with the user profile
    await _databaseService.updateUserProfile(userProfile);
  } catch (e) {
    // Handle the error
  }
}
```

The disadvantage in this case is that the offline-first functionality
is only available for read operations,
but not for write operations, as those require the user being online.

这种方案的缺点是：离线优先功能仅对读取操作可用，对写入操作不可用，因为写入要求用户处于在线状态。

### Offline-first writing

### 离线优先写入

The second approach works the other way around.
Instead of performing the network call first,
the application first stores the new data in the database,
and then attempts to send it to the API service once it has been stored locally.

第二种方案恰好相反。应用不先发起网络调用，
而是先将新数据存入数据库，待本地存储完成后再尝试将其发送给 API service。

<?code-excerpt "lib/data/repositories/user_profile_repository.dart (updateUserProfileOffline)" replace="/Offline//g"?>
```dart
Future<void> updateUserProfile(UserProfile userProfile) async {
  // Update the database with the user profile
  await _databaseService.updateUserProfile(userProfile);

  try {
    // Update the API with the user profile
    await _apiClientService.putUserProfile(userProfile);
  } catch (e) {
    // Handle the error
  }
}
```

This approach allows users to store data locally
even when the application is offline,
however, if the network call fails,
the local database and the API service are no longer in sync.
In the next section,
you will learn different approaches to handle synchronization
between local and remote data.

这种方案允许用户即使在应用离线时也能将数据存储到本地，
但如果网络调用失败，本地数据库与 API service 便不再同步。
在下一节中，你将学习处理本地与远程数据同步的不同方案。

## Synchronizing state

## 同步状态

Keeping the local and remote data in sync
is an important part of offline-first applications,
as the changes that have been done locally
need to be copied to the remote service.
The app must also ensure that, when the user goes back to the application,
the locally stored data is the same as in the remote service.

保持本地与远程数据同步是离线优先应用的重要部分，
因为本地所做的更改需要复制到远程服务。
应用还必须确保用户重新回到应用时，本地存储的数据与远程服务中的数据一致。

### Writing a synchronization task

### 编写同步任务

There are different approaches for implementing
synchronization in a background task.

在后台任务中实现同步有多种不同方案。

A simple solution is to create a `Timer`
in the `UserProfileRepository` that runs periodically,
for example every five minutes.

一种简单方案是在 `UserProfileRepository` 中创建一个定期运行的 `Timer`，例如每五分钟一次。

<?code-excerpt "lib/data/repositories/user_profile_repository.dart (Timer)"?>
```dart
Timer.periodic(const Duration(minutes: 5), (timer) => sync());
```

The `sync()` method then fetches the `UserProfile` from the database,
and if it requires synchronization, it is then sent to the API service.

`sync()` 方法随后从数据库获取 `UserProfile`，若其需要同步，则将其发送给 API service。

<?code-excerpt "lib/data/repositories/user_profile_repository.dart (sync)"?>
```dart
Future<void> sync() async {
  try {
    // Fetch the user profile from the database
    final userProfile = await _databaseService.fetchUserProfile();

    // Check if the user profile requires synchronization
    if (userProfile == null || userProfile.synchronized) {
      return;
    }

    // Update the API with the user profile
    await _apiClientService.putUserProfile(userProfile);

    // Set the user profile as synchronized
    await _databaseService.updateUserProfile(
      userProfile.copyWith(synchronized: true),
    );
  } catch (e) {
    // Try again later
  }
}
```

A more complex solution uses background processes
like the [`workmanager`][] plugin.
This allows your application to run the synchronization process
in the background even when the application is not running.

更复杂的方案则使用 [`workmanager`][] 等插件提供的后台进程。
这样即使应用未在运行，也能在后台执行同步过程。

:::note
Running background operations continuously
can drain the device battery dramatically,
and some devices limit the background processing capabilities,
so this approach needs to be tuned
to the application requirements and one solution might not fit all cases.

持续运行后台操作会大幅消耗设备电量，
而且某些设备会限制后台处理能力，
因此这种方案需要根据应用需求进行调整，单一方案未必适用于所有情况。
:::

It’s also recommended to only perform the synchronization task
when the network is available.
For example, you can use the [`connectivity_plus`][] plugin
to check if the device is connected to WiFi.
You can also use [`battery_plus`][] to verify
that the device is not running low on battery.

还建议仅在网络可用时才执行同步任务。
例如，你可以用 [`connectivity_plus`][] 插件检查设备是否已连接 WiFi，
也可以用 [`battery_plus`][] 确认设备电量是否充足。

In the previous example, the synchronization task runs every 5 minutes.
In some cases, that might be excessive,
while in others it might not be frequent enough.
The actual synchronization period time for your application
depends on your application needs and it’s something you will have to decide.

前述示例中，同步任务每 5 分钟运行一次。
在某些场景下这可能过于频繁，而在另一些场景下又不够频繁。
应用实际的同步周期取决于你的应用需求，需要由你自行决定。

### Storing a synchronization flag

### 存储同步标志

To know if the data requires synchronization,
add a flag to the data class indicating if the changes need to be synchronized.

为判断数据是否需要同步，可在数据类中添加一个标志，表示更改是否需要同步。

For example, `bool synchronized`:

例如 `bool synchronized`：

<?code-excerpt "lib/domain/model/user_profile.dart (UserProfile)"?>
```dart
@freezed
abstract class UserProfile with _$UserProfile {
  const factory UserProfile({
    required String name,
    required String photoUrl,
    @Default(false) bool synchronized,
  }) = _UserProfile;
}
```

Your synchronization logic should attempt
to send it to the API service
only when the `synchronized` flag is `false`.
If the request is successful, then change it to `true`.

你的同步逻辑应仅在 `synchronized` 标志为 `false` 时才尝试将数据发送给 API service。
若请求成功，再将其改为 `true`。

### Pushing data from server

### 从服务器推送数据

A different approach for synchronization
is to use a push service to provide up-to-date data to the application.
In this case, the server notifies the application when data has changed,
instead of being the application asking for updates.

另一种同步方案是使用推送服务向应用提供最新数据。
此时由服务器在数据变更时通知应用，而非由应用主动请求更新。

For example, you can use [Firebase messaging][],
to push small payloads of data to the device,
as well as trigger synchronization tasks remotely using background messages.

例如，你可以用 [Firebase messaging][] 向设备推送小型数据载荷，并通过后台消息远程触发同步任务。

Instead of having a synchronization task running in the background,
the server notifies the application
when the stored data needs to be updated with a push notification.

服务器通过推送通知在存储数据需要更新时通知应用，从而无需在后台持续运行同步任务。

You can combine both approaches together,
having a background synchronization task and using background push messages,
to keep the application database synchronized with the server.

你也可以将两种方案结合使用：既运行后台同步任务，又使用后台推送消息，从而保持应用数据库与服务器同步。

## Putting it all together

## 总结

Writing an offline-first application
requires making decisions regarding
the way read, write and sync operations are implemented,
which depend on the requirements from the application you are developing.

编写离线优先应用需要就读取、写入与同步操作的实现方式做出决策，而这些决策取决于你所开发应用的需求。

The key takeaways are:

要点：

- When reading data,
you can use a `Stream` to combine locally stored data with remote data.

  读取数据时，可用 `Stream` 合并本地存储的数据与远程数据。

- When writing data,
decide if you need to be online or offline,
and if you need synchronizing data later or not.

  写入数据时，需决定是要求在线还是允许离线，以及是否需要稍后同步数据。

- When implementing a background sync task,
take into account the device status and your application needs,
as different applications may have different requirements.

  实现后台同步任务时，需考虑设备状态与应用需求，因为不同应用的要求可能不同。

[Flutter Architecture guidelines]:/app-architecture
[Persistent Storage Architecture: SQL]:/app-architecture/design-patterns/sql
[`freezed`]:{{site.pub}}/packages/freezed
[Optimistic State design pattern]:/app-architecture/design-patterns/optimistic-state
[`workmanager`]:{{site.pub}}/packages/workmanager
[`connectivity_plus`]:{{site.pub}}/packages/connectivity_plus
[`battery_plus`]:{{site.pub}}/packages/battery_plus
[Firebase messaging]:{{site.firebase}}/docs/cloud-messaging/flutter/client
