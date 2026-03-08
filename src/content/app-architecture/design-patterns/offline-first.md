---
# title: "Offline-first support"
title: "离线优先支持"
# description: Implement offline-first support for one feature in an application.
description: 在应用中为某个功能实现离线优先支持。
contentTags:
  - data
  - user experience
  - repository pattern
iconPath: /assets/images/docs/app-architecture/design-patterns/offline-first-icon.svg
order: 3
---

<?code-excerpt path-base="app-architecture/offline_first"?>

An offline-first application is an app capable of offering most
or all of its functionality while being disconnected from the internet.
Offline-first applications usually rely on stored data
to offer users temporary access to data
that would otherwise only be available online.

离线优先应用是一种即使在断开互联网连接的情况下，
也能提供大部分或全部功能的应用。
离线优先应用通常依赖于本地存储的数据，
为用户提供对原本只能在线获取的数据的临时访问。

Some offline-first applications combine local and remote data seamlessly,
while other applications inform the user
when the application is using cached data.
In the same way,
some applications synchronize data in the background
while others require the user to explicitly synchronize it.
It all depends on the application requirements and the functionality it offers,
and it's up to the developer to decide which implementation fits their needs.

一些离线优先应用无缝地结合了本地和远程数据，
而另一些应用则会在使用缓存数据时通知用户。
同样地，一些应用在后台同步数据，
而另一些则需要用户手动触发同步。
这一切取决于应用的需求和它所提供的功能，
开发者需要自行决定哪种实现方式最适合自己的需求。

In this guide,
you will learn how to implement different approaches
to offline-first applications in Flutter,
following the [Flutter Architecture guidelines][].

在本指南中，
你将学习如何按照 [Flutter 架构指南][Flutter Architecture guidelines]，
在 Flutter 中实现离线优先应用的不同方法。

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

正如通用架构概念指南中所解释的，
Repository 充当单一数据源的角色。
它们负责提供本地或远程数据，
并且应该是唯一可以修改数据的地方。
在离线优先应用中，
Repository 将不同的本地和远程数据源组合在一起，
通过单一访问点提供数据，
而不依赖于设备的网络连接状态。

This example uses the `UserProfileRepository`,
a repository that allows you to obtain and store `UserProfile` objects
with offline-first support.

本示例使用了 `UserProfileRepository`，
这是一个允许你获取和存储 `UserProfile` 对象并支持离线优先的 Repository。

The `UserProfileRepository` uses two different data services:
one works with remote data,
and the other works with a local database.

`UserProfileRepository` 使用了两种不同的数据服务：
一个用于处理远程数据，
另一个用于处理本地数据库。

The API client,`ApiClientService`,
connects to a remote service using HTTP REST calls.

API 客户端 `ApiClientService` 通过 HTTP REST 调用连接到远程服务。

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

数据库服务 `DatabaseService` 使用 SQL 存储数据，
类似于 [持久化存储架构：SQL][Persistent Storage Architecture: SQL] 示例中的实现。

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

本示例还使用了通过 [`freezed`][] 包创建的 `UserProfile` 数据类。

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

在数据结构复杂的应用中，
例如当远程数据包含的字段多于 UI 所需时，
你可能需要为 API 和数据库服务使用一个数据类，
为 UI 使用另一个数据类。
例如，
`UserProfileLocal` 用于数据库实体，
`UserProfileRemote` 用于 API 响应对象，
然后 `UserProfile` 用于 UI 数据模型类。
`UserProfileRepository` 会在需要时负责在不同数据类之间进行转换。

This example also includes the `UserProfileViewModel`,
a view model that uses the `UserProfileRepository`
to display the `UserProfile` on a widget.

本示例还包含 `UserProfileViewModel`，
这是一个使用 `UserProfileRepository`
在 widget 上显示 `UserProfile` 的视图模型。

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

读取数据是任何依赖远程 API 服务的应用的基本功能。

In offline-first applications,
you want to ensure that the access to this data is as fast as possible,
and that it doesn't depend on the device being online
to provide data to the user.
This is similar to the [Optimistic State design pattern][].

在离线优先应用中，
你需要确保对数据的访问尽可能快，
并且不依赖于设备在线才能向用户提供数据。
这与 [乐观状态设计模式][Optimistic State design pattern] 类似。

In this section,
you will learn two different approaches,
one that uses the database as a fallback,
and one that combines local and remote data using a `Stream`.

在本节中，
你将学习两种不同的方法，
一种是将数据库作为备选方案，
另一种是使用 `Stream` 将本地和远程数据结合起来。

### Using local data as a fallback

### 将本地数据作为备选方案

As a first approach,
you can implement offline support by having a fallback mechanism
for when the user is offline or a network call fails.

作为第一种方法，
你可以通过设置备选机制来实现离线支持，
用于处理用户离线或网络调用失败的情况。

In this case, the `UserProfileRepository` attempts to obtain the `UserProfile`
from the remote API server using the `ApiClientService`.
If this request fails,
then returns the locally stored `UserProfile` from the `DatabaseService`.

在这种情况下，`UserProfileRepository` 尝试通过 `ApiClientService`
从远程 API 服务器获取 `UserProfile`。
如果请求失败，
则从 `DatabaseService` 返回本地存储的 `UserProfile`。

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

更好的替代方案是使用 `Stream` 来提供数据。
在最理想的情况下，
`Stream` 会发出两个值，
分别是本地存储的数据和来自服务器的数据。

First, the stream emits the locally stored data using the `DatabaseService`.
This call is generally faster and less error prone than a network call,
and by doing it first the view model can already display data to the user.

首先，Stream 使用 `DatabaseService` 发出本地存储的数据。
这个调用通常比网络调用更快、更不容易出错，
通过优先执行这个调用，视图模型可以先向用户展示数据。

If the database does not contain any cached data,
then the `Stream` relies completely on the network call,
emitting only one value.

如果数据库中没有任何缓存数据，
则 `Stream` 完全依赖于网络调用，
只发出一个值。

Then, the method performs the network call using the `ApiClientService`
to obtain up-to-date data.
If the request was successful,
it updates the database with the newly obtained data,
and then yields the value to the view model,
so it can be displayed to the user.

然后，该方法通过 `ApiClientService` 执行网络调用
以获取最新数据。
如果请求成功，
它会用新获取的数据更新数据库，
然后将值传递给视图模型，
以便向用户展示。

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

视图模型必须订阅这个 `Stream` 并等待其完成。
为此，需要对 `Subscription` 对象调用 `asFuture()` 并等待结果。

For each obtained value,
update the view model data and call `notifyListeners()`
so the UI shows the latest data.

对于每个获取到的值，
更新视图模型的数据并调用 `notifyListeners()`，
以便 UI 显示最新的数据。

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

另一种可行的方法是仅使用本地存储的数据进行读取操作。
这种方法要求数据在某个时间点已经预加载到数据库中，
并且需要一个同步机制来保持数据的更新。


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
that don't require data to be in sync with the server at all times.
For example, a weather application
where the weather data is only updated once a day.

这种方法适用于不需要数据始终与服务器保持同步的应用。
例如，一个天气应用，
其天气数据每天只更新一次。

Synchronization could be done manually by the user,
for example, a pull-to-refresh action that then calls the `sync()` method,
or done periodically by a `Timer` or a background process.
You can learn how to implement a synchronization task
in the section about synchronizing state.

同步可以由用户手动完成，
例如通过下拉刷新操作调用 `sync()` 方法，
也可以通过 `Timer` 或后台进程定期完成。
你可以在关于同步状态的章节中学习如何实现同步任务。

## Writing data

## 写入数据

Writing data in offline-first applications depends fundamentally
on the application use case.

在离线优先应用中写入数据，
从根本上取决于应用的使用场景。

Some applications might require the user input data
to be immediately available on the server side,
while other applications might be more flexible
and allow data to be out-of-sync temporarily.

一些应用可能要求用户输入的数据立即在服务器端可用，
而另一些应用可能更灵活，
允许数据暂时不同步。

This section explains two different approaches
for implementing writing data in offline-first applications.

本节介绍了在离线优先应用中实现数据写入的两种不同方法。

### Online-only writing

### 仅在线写入

One approach for writing data in offline-first applications
is to enforce being online to write data.
While this might sound counterintuitive,
this ensures that the data the user has modified
is fully synchronized with the server,
and the application doesn't have a different state than the server.

在离线优先应用中写入数据的一种方法是强制要求在线才能写入数据。
虽然这听起来可能有些矛盾，
但这确保了用户修改的数据与服务器完全同步，
应用不会与服务器存在不同的状态。

In this case, you first attempt to send the data to the API service,
and if the request succeeds,
then store the data in the database.

在这种情况下，你首先尝试将数据发送到 API 服务，
如果请求成功，
则将数据存储到数据库中。

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

这种情况下的缺点是离线优先功能仅适用于读取操作，
而不适用于写入操作，因为写入操作需要用户处于在线状态。

### Offline-first writing

### 离线优先写入

The second approach works the other way around.
Instead of performing the network call first,
the application first stores the new data in the database,
and then attempts to send it to the API service once it has been stored locally.

第二种方法的工作方式恰好相反。
应用不是先执行网络调用，
而是先将新数据存储到数据库中，
然后在本地存储完成后尝试将其发送到 API 服务。

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

这种方法允许用户在应用离线时也能在本地存储数据，
但是，如果网络调用失败，
本地数据库和 API 服务将不再同步。
在下一节中，
你将学习处理本地和远程数据之间同步的不同方法。

## Synchronizing state

## 同步状态

Keeping the local and remote data in sync
is an important part of offline-first applications,
as the changes that have been done locally
need to be copied to the remote service.
The app must also ensure that, when the user goes back to the application,
the locally stored data is the same as in the remote service.

保持本地和远程数据的同步是离线优先应用的重要组成部分，
因为在本地所做的更改需要复制到远程服务。
应用还必须确保当用户返回应用时，
本地存储的数据与远程服务中的数据一致。


### Writing a synchronization task

### 编写同步任务

There are different approaches for implementing
synchronization in a background task.

在后台任务中实现同步有多种不同的方法。

A simple solution is to create a `Timer`
in the `UserProfileRepository` that runs periodically,
for example every five minutes.

一个简单的解决方案是在 `UserProfileRepository` 中创建一个定期运行的 `Timer`，
例如每五分钟运行一次。

<?code-excerpt "lib/data/repositories/user_profile_repository.dart (Timer)"?>
```dart
Timer.periodic(const Duration(minutes: 5), (timer) => sync());
```

The `sync()` method then fetches the `UserProfile` from the database,
and if it requires synchronization, it is then sent to the API service.

`sync()` 方法从数据库中获取 `UserProfile`，
如果需要同步，则将其发送到 API 服务。

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

更复杂的解决方案使用后台进程，
例如 [`workmanager`][] 插件。
这允许你的应用在后台运行同步过程，
即使应用没有在运行也可以。

:::note
Running background operations continuously
can drain the device battery dramatically,
and some devices limit the background processing capabilities,
so this approach needs to be tuned
to the application requirements and one solution might not fit all cases.

持续运行后台操作会大量消耗设备电池，
并且一些设备会限制后台处理能力，
因此这种方法需要根据应用需求进行调整，
一种解决方案可能无法适用于所有情况。
:::

It's also recommended to only perform the synchronization task
when the network is available.
For example, you can use the [`connectivity_plus`][] plugin
to check if the device is connected to WiFi.
You can also use [`battery_plus`][] to verify
that the device is not running low on battery.

还建议仅在网络可用时执行同步任务。
例如，你可以使用 [`connectivity_plus`][] 插件检查设备是否连接到 WiFi。
你还可以使用 [`battery_plus`][] 来验证设备电量是否充足。

In the previous example, the synchronization task runs every 5 minutes.
In some cases, that might be excessive,
while in others it might not be frequent enough.
The actual synchronization period time for your application
depends on your application needs and it's something you will have to decide.

在前面的示例中，同步任务每 5 分钟运行一次。
在某些情况下，这可能过于频繁，
而在另一些情况下，可能不够频繁。
你的应用的实际同步周期时间取决于应用需求，
这是你需要自行决定的。

### Storing a synchronization flag

### 存储同步标志

To know if the data requires synchronization,
add a flag to the data class indicating if the changes need to be synchronized.

要知道数据是否需要同步，
可以在数据类中添加一个标志来指示更改是否需要同步。

For example, `bool synchronized`:

例如，`bool synchronized`：

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

你的同步逻辑应该仅在 `synchronized` 标志为 `false` 时
尝试将数据发送到 API 服务。
如果请求成功，则将其更改为 `true`。

### Pushing data from server

### 从服务器推送数据

A different approach for synchronization
is to use a push service to provide up-to-date data to the application.
In this case, the server notifies the application when data has changed,
instead of being the application asking for updates.

另一种同步方法是使用推送服务向应用提供最新数据。
在这种情况下，当数据发生变化时由服务器通知应用，
而不是由应用主动请求更新。

For example, you can use [Firebase messaging][],
to push small payloads of data to the device,
as well as trigger synchronization tasks remotely using background messages.

例如，你可以使用 [Firebase messaging][]
向设备推送小量数据，
以及通过后台消息远程触发同步任务。

Instead of having a synchronization task running in the background,
the server notifies the application
when the stored data needs to be updated with a push notification.

服务器通过推送通知在存储的数据需要更新时通知应用，
而不是让同步任务在后台持续运行。

You can combine both approaches together,
having a background synchronization task and using background push messages,
to keep the application database synchronized with the server.

你可以将两种方法结合使用，
既有后台同步任务，又使用后台推送消息，
以保持应用数据库与服务器的同步。

## Putting it all together

## 总结

Writing an offline-first application
requires making decisions regarding
the way read, write and sync operations are implemented,
which depend on the requirements from the application you are developing.

编写离线优先应用需要就读取、写入和同步操作的实现方式做出决策，
这些决策取决于你正在开发的应用的需求。

The key takeaways are:

关键要点如下：

- When reading data,
you can use a `Stream` to combine locally stored data with remote data.
- When writing data,
decide if you need to be online or offline,
and if you need synchronizing data later or not.
- When implementing a background sync task,
take into account the device status and your application needs,
as different applications may have different requirements.

- 读取数据时，
  你可以使用 `Stream` 将本地存储的数据与远程数据结合起来。
- 写入数据时，
  决定是否需要在线或离线操作，
  以及是否需要稍后同步数据。
- 实现后台同步任务时，
  需要考虑设备状态和应用需求，
  因为不同的应用可能有不同的要求。

[Flutter Architecture guidelines]:/app-architecture
[Persistent Storage Architecture: SQL]:/app-architecture/design-patterns/sql
[`freezed`]:{{site.pub}}/packages/freezed
[Optimistic State design pattern]:/app-architecture/design-patterns/optimistic-state
[`workmanager`]:{{site.pub}}/packages/workmanager
[`connectivity_plus`]:{{site.pub}}/packages/connectivity_plus
[`battery_plus`]:{{site.pub}}/packages/battery_plus
[Firebase messaging]:{{site.firebase}}/docs/cloud-messaging/flutter/client
