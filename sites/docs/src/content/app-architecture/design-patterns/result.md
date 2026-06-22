---
# title: Error handling with Result objects
title: 使用 Result 对象进行错误处理
# description: "Improve error handling across classes with Result objects."
description: "使用 Result 对象改善跨类的错误处理。"
contentTags:
  - error handling
  - services
iconPath: /assets/images/docs/app-architecture/design-patterns/result-icon.svg
order: 5
ai-translated: true
---

<?code-excerpt path-base="app-architecture/result"?>

Dart provides a built-in error handling mechanism
with the ability to throw and catch exceptions.

Dart 提供内置错误处理机制，支持抛出与捕获异常。

As mentioned in the [Error handling documentation][],
Dart's exceptions are unhandled exceptions.
This means that methods that throw exceptions don't need to declare them,
and calling methods aren't required to catch them either.

如 [错误处理文档][Error handling documentation] 所述，Dart 的异常是未处理异常 (unhandled exceptions)。
这意味着抛出异常的方法无需声明异常，调用方也不必捕获。

This can lead to situations where exceptions are not handled properly.
In large projects,
developers might forget to catch exceptions,
and the different application layers and components
could throw exceptions that aren't documented.
This can lead to errors and crashes.

这可能导致异常未得到妥善处理。
在大型项目中，开发者可能忘记捕获异常，
各层与组件可能抛出未文档化的异常，进而导致错误与崩溃。

In this guide,
you will learn about this limitation
and how to mitigate it using the _result_ pattern.

本指南将介绍这一局限，以及如何用 **结果类型 (result)** 模式缓解。

## Error flow in Flutter applications

## Flutter 应用中的错误流

Applications following the [Flutter architecture guidelines][]
are usually composed of view models,
repositories, and services, among other parts.
When a function in one of these components fails,
it should communicate the error to the calling component.

遵循 [Flutter 架构指南][Flutter architecture guidelines] 的应用通常由 view model、repository、service 等组成。
当其中某组件的函数失败时，应将错误告知调用方。

Typically, that's done with exceptions.
For example,
an API client service failing to communicate with the remote server
might throw an HTTP Error Exception.
The calling component,
for example a Repository,
would have to either capture this exception
or ignore it and let the calling view model handle it.

通常通过异常完成。例如，无法与远程服务器通信的 API 客户端 service 可能抛出 HTTP 错误异常；
调用方（如 Repository）须捕获该异常，或忽略并由 view model 处理。

This can be observed in the following example. Consider these classes:

以下示例可见这一点。考虑这些类：

- A service, `ApiClientService`, performs API calls to a remote service.

  Service `ApiClientService` 向远程服务发起 API 调用。

- A repository, `UserProfileRepository`,
  provides the `UserProfile` provided by the `ApiClientService`.

  Repository `UserProfileRepository` 提供由 `ApiClientService` 获取的 `UserProfile`。

- A view model, `UserProfileViewModel`, uses the `UserProfileRepository`.

  View model `UserProfileViewModel` 使用 `UserProfileRepository`。

The `ApiClientService` contains a method, `getUserProfile`,
that throws exceptions in certain situations:

`ApiClientService` 的 `getUserProfile` 在特定情况下会抛出异常：

- The method throws an `HttpException` if the response code isn't 200.

  响应码非 200 时抛出 `HttpException`。

- The JSON parsing method throws an exception
  if the response isn't formatted correctly.

  响应格式不正确时 JSON 解析抛出异常。

- The HTTP client might throw an exception due to networking issues.

  HTTP 客户端可能因网络问题抛出异常。

The following code tests for a variety of possible exceptions:

以下代码处理多种可能的异常：

<?code-excerpt "lib/no_result.dart (ApiClientService)"?>
```dart
class ApiClientService {
  // ···

  Future<UserProfile> getUserProfile() async {
    try {
      final request = await client.get(_host, _port, '/user');
      final response = await request.close();
      if (response.statusCode == 200) {
        final stringData = await response.transform(utf8.decoder).join();
        return UserProfile.fromJson(jsonDecode(stringData));
      } else {
        throw const HttpException('Invalid response');
      }
    } finally {
      client.close();
    }
  }
}
```

The `UserProfileRepository` doesn't need to handle
the exceptions from the `ApiClientService`.
In this example, it just returns the value from the API Client.

`UserProfileRepository` 无需处理 `ApiClientService` 的异常；
本例中它直接返回 API 客户端的值。

<?code-excerpt "lib/no_result.dart (UserProfileRepository)"?>
```dart
class UserProfileRepository {
  // ···

  Future<UserProfile> getUserProfile() async {
    return await _apiClientService.getUserProfile();
  }
}
```

Finally, the `UserProfileViewModel`
should capture all exceptions and handle the errors.

最后，`UserProfileViewModel` 应捕获所有异常并处理错误。

This can be done by wrapping
the call to the `UserProfileRepository` with a try-catch:

可用 try-catch 包装对 `UserProfileRepository` 的调用：

<?code-excerpt "lib/no_result.dart (UserProfileViewModel)"?>
```dart
class UserProfileViewModel extends ChangeNotifier {
  // ···

  Future<void> load() async {
    try {
      _userProfile = await userProfileRepository.getUserProfile();
      notifyListeners();
    } on Exception catch (exception) {
      // handle exception
    }
  }
}
```

In reality, a developer might forget to properly capture exceptions and
end up with the following code.
It compiles and runs, but crashes if
one of the exceptions mentioned previously occurs:

现实中开发者可能忘记正确捕获异常，写出如下代码。
它能编译运行，但若前述任一异常发生则会崩溃：

<?code-excerpt "lib/no_result.dart (UserProfileViewModelNoTryCatch)" replace="/NoTryCatch//g"?>
```dart
class UserProfileViewModel extends ChangeNotifier {
  // ···

  Future<void> load() async {
    _userProfile = await userProfileRepository.getUserProfile();
    notifyListeners();
  }
}
```

You can attempt to solve this by documenting the `ApiClientService`,
warning about the possible exceptions it might throw.
However, since the view model doesn't use the service directly,
other developers working in the codebase might miss this information.

可尝试为 `ApiClientService` 文档化可能抛出的异常。
但 view model 不直接使用 service，其他开发者可能忽略该信息。

## Using the result pattern

## 使用结果类型模式

An alternative to throwing exceptions
is to wrap the function output in a `Result` object.

抛异常的替代方案是将函数输出包装在 `Result` 对象中。

When the function runs successfully,
the `Result` contains the returned value.
However, if the function does not complete successfully,
the `Result` object contains the error.

成功时 `Result` 含返回值；失败时含错误。

A `Result` is a [`sealed`][] class
that can either subclass `Ok` or the `Error` class.
Return the successful value with the subclass `Ok`,
and the captured error with the subclass `Error`.

`Result` 是 [`sealed`][] 类，子类为 `Ok` 或 `Error`；
成功值用 `Ok` 返回，捕获的错误用 `Error` 返回。

The following code shows a sample `Result` class that
has been simplified for demo purposes.
A full implementation is at the end of this page.

以下是为演示简化的 `Result` 示例，完整实现见文末。

<?code-excerpt "lib/simple_result.dart"?>
```dart
/// Utility class that simplifies handling errors.
///
/// Return a [Result] from a function to indicate success or failure.
///
/// A [Result] is either an [Ok] with a value of type [T]
/// or an [Error] with an [Exception].
///
/// Use [Result.ok] to create a successful result with a value of type [T].
/// Use [Result.error] to create an error result with an [Exception].
sealed class Result<T> {
  const Result();

  /// Creates an instance of Result containing a value
  factory Result.ok(T value) => Ok(value);

  /// Create an instance of Result containing an error
  factory Result.error(Exception error) => Error(error);
}

/// Subclass of Result for values
final class Ok<T> extends Result<T> {
  const Ok(this.value);

  /// Returned value in result
  final T value;
}

/// Subclass of Result for errors
final class Error<T> extends Result<T> {
  const Error(this.error);

  /// Returned error in result
  final Exception error;
}
```

In this example,
the `Result` class uses a generic type `T` to represent any return value,
which can be a primitive Dart type like `String` or an `int` or a custom class like `UserProfile`.

本例中 `Result` 用泛型 `T` 表示任意返回值，可为 `String`、`int` 或 `UserProfile` 等。

### Creating a `Result` object

### 创建 `Result` 对象

For functions using the `Result` class to return values,
instead of a value,
the function returns a `Result` object containing the value.

使用 `Result` 返回值的函数不再直接返回值，而是返回包含值的 `Result`。

For example, in the `ApiClientService`,
`getUserProfile` is changed to return a `Result`:

例如 `ApiClientService` 的 `getUserProfile` 改为返回 `Result`：

<?code-excerpt "lib/main.dart (ApiClientService1)"?>
```dart
class ApiClientService {
  // ···

  Future<Result<UserProfile>> getUserProfile() async {
    // ···
  }
}
```

Instead of returning the `UserProfile` directly,
it returns a `Result` object containing a `UserProfile`.

不再直接返回 `UserProfile`，而是返回包含 `UserProfile` 的 `Result`。

To facilitate using the `Result` class,
it contains two named constructors, `Result.ok` and `Result.error`.
Use them to construct the `Result` depending on desired output.
As well, capture any exceptions thrown by the code
and wrap them into the `Result` object.

`Result` 提供 `Result.ok` 与 `Result.error` 命名构造函数，按输出构造 `Result`，
并捕获代码抛出的异常包装进 `Result`。

For example, here the `getUserProfile()` method
has been changed to use the `Result` class:

例如 `getUserProfile()` 已改为使用 `Result`：

<?code-excerpt "lib/main.dart (ApiClientService2)"?>
```dart
class ApiClientService {
  // ···

  Future<Result<UserProfile>> getUserProfile() async {
    try {
      final request = await client.get(_host, _port, '/user');
      final response = await request.close();
      if (response.statusCode == 200) {
        final stringData = await response.transform(utf8.decoder).join();
        return Result.ok(UserProfile.fromJson(jsonDecode(stringData)));
      } else {
        return const Result.error(HttpException('Invalid response'));
      }
    } on Exception catch (exception) {
      return Result.error(exception);
    } finally {
      client.close();
    }
  }
}
```

The original return statement was replaced
with a statement that returns the value using `Result.ok`.
The `throw HttpException()`
was replaced with a statement that returns `Result.error(HttpException())`,
wrapping the error into a `Result`.
As well, the method is wrapped with a `try-catch` block
to capture any exceptions thrown by the Http client
or the JSON parser into a `Result.error`.

原 return 改为 `Result.ok` 返回；`throw HttpException()` 改为 `Result.error(HttpException())`；
并用 try-catch 将 HTTP 客户端或 JSON 解析器抛出的异常捕获为 `Result.error`。

The repository class also needs to be modified,
and instead of returning a `UserProfile` directly,
now it returns a `Result<UserProfile>`.

Repository 类也需修改，直接返回 `UserProfile` 改为返回 `Result<UserProfile>`。

<?code-excerpt "lib/main.dart (getUserProfile1)" replace="/1//g"?>
```dart
Future<Result<UserProfile>> getUserProfile() async {
  return await _apiClientService.getUserProfile();
}
```

### Unwrapping the Result object

### 解包 Result 对象

Now the view model doesn't receive the `UserProfile` directly,
but instead it receives a `Result` containing a `UserProfile`.

现在 view model 收到的是包含 `UserProfile` 的 `Result`，而非直接的 `UserProfile`。

This forces the developer implementing the view model
to unwrap the `Result` to obtain the `UserProfile`,
and avoids having uncaught exceptions.

这迫使实现 view model 的开发者解包 `Result` 获取 `UserProfile`，避免未捕获异常。

<?code-excerpt "lib/main.dart (UserProfileViewModel)"?>
```dart
class UserProfileViewModel extends ChangeNotifier {
  // ···

  UserProfile? userProfile;

  Exception? error;

  Future<void> load() async {
    final result = await userProfileRepository.getUserProfile();
    switch (result) {
      case Ok<UserProfile>():
        userProfile = result.value;
      case Error<UserProfile>():
        error = result.error;
    }
    notifyListeners();
  }
}
```

The `Result` class is implemented using a `sealed` class,
meaning it can only be of type `Ok` or `Error`.
This allows the code to evaluate the result with a
[switch result or expression][].

`Result` 用 `sealed` 实现，只能是 `Ok` 或 `Error`，
可用 [switch 结果或表达式][switch result or expression] 求值。

In the `Ok<UserProfile>` case,
obtain the value using the `value` property.

`Ok<UserProfile>` 时用 `value` 属性获取值。

In the `Error<UserProfile>` case,
obtain the error object using the `error` property.

`Error<UserProfile>` 时用 `error` 属性获取错误对象。

## Improving control flow

## 改善控制流

Wrapping code in a `try-catch` block ensures that
thrown exceptions are caught and not propagated to other parts of the code.

try-catch 确保抛出的异常被捕获而不传播到其他代码。

Consider the following code.

考虑以下代码。

<?code-excerpt "lib/no_result.dart (UserProfileRepository2)" replace="/2//g"?>
```dart
class UserProfileRepository {
  // ···

  Future<UserProfile> getUserProfile() async {
    try {
      return await _apiClientService.getUserProfile();
    } catch (e) {
      try {
        return await _databaseService.createTemporaryUser();
      } catch (e) {
        throw Exception('Failed to get user profile');
      }
    }
  }
}
```

In this method, the `UserProfileRepository`
attempts to obtain the `UserProfile`
using the `ApiClientService`.
If it fails, it tries to create a temporary user in a `DatabaseService`.

此方法中 `UserProfileRepository` 先通过 `ApiClientService` 获取 `UserProfile`，
失败则尝试在 `DatabaseService` 创建临时用户。

Because either service method can fail,
the code must catch the exceptions in both cases.

因两种 service 方法都可能失败，代码须在两种情况下捕获异常。

This can be improved using the `Result` pattern:


可用 `Result` 模式改进：

<?code-excerpt "lib/main.dart (getUserProfile)"?>
```dart
Future<Result<UserProfile>> getUserProfile() async {
  final apiResult = await _apiClientService.getUserProfile();
  if (apiResult is Ok) {
    return apiResult;
  }

  final databaseResult = await _databaseService.createTemporaryUser();
  if (databaseResult is Ok) {
    return databaseResult;
  }

  return Result.error(Exception('Failed to get user profile'));
}
```

In this code, if the `Result` object is an `Ok` instance,
then the function returns that object;
otherwise, it returns `Result.Error`.

若 `Result` 为 `Ok` 则返回该对象，否则返回 `Result.error`。

## Putting it all together

## 总结

In this guide, you have learned
how to use a `Result` class to return result values.

本指南介绍了如何使用 `Result` 类返回结果值。

The key takeaways are:

要点：

- `Result` classes force the calling method to check for errors,
  reducing the amount of bugs caused by uncaught exceptions.

  `Result` 类迫使调用方检查错误，减少未捕获异常导致的 bug。

- `Result` classes help improve control flow compared to try-catch blocks.

  相比 try-catch，`Result` 类有助于改善控制流。

- `Result` classes are `sealed` and can only return `Ok` or `Error` instances,
  allowing the code to unwrap them with a switch statement.

  `Result` 类为 `sealed`，只能为 `Ok` 或 `Error`，可用 switch 解包。

Below you can find the full `Result` class
as implemented in the [Compass App example][]
for the [Flutter architecture guidelines][].

下文为 [Flutter 架构指南][Flutter architecture guidelines] 的 [Compass 应用示例][Compass App example] 中的完整 `Result` 类。

:::note
Check [pub.dev][] for different ready-to-use
implementations of the `Result` class,
such as the [`result_dart`][], [`result_type`][], and [`multiple_result`][] packages.

可在 [pub.dev][] 查看现成的 `Result` 实现，
如 [`result_dart`][]、[`result_type`][]、[`multiple_result`][] 等 package。
:::

<?code-excerpt "lib/result.dart (Result)"?>
```dart
/// Utility class that simplifies handling errors.
///
/// Return a [Result] from a function to indicate success or failure.
///
/// A [Result] is either an [Ok] with a value of type [T]
/// or an [Error] with an [Exception].
///
/// Use [Result.ok] to create a successful result with a value of type [T].
/// Use [Result.error] to create an error result with an [Exception].
///
/// Evaluate the result using a switch statement:
/// ```dart
/// switch (result) {
///   case Ok(): {
///     print(result.value);
///   }
///   case Error(): {
///     print(result.error);
///   }
/// }
/// ```
sealed class Result<T> {
  const Result();

  /// Creates a successful [Result], completed with the specified [value].
  const factory Result.ok(T value) = Ok._;

  /// Creates an error [Result], completed with the specified [error].
  const factory Result.error(Exception error) = Error._;
}

/// A successful [Result] with a returned [value].
final class Ok<T> extends Result<T> {
  const Ok._(this.value);

  /// The returned value of this result.
  final T value;

  @override
  String toString() => 'Result<$T>.ok($value)';
}

/// An error [Result] with a resulting [error].
final class Error<T> extends Result<T> {
  const Error._(this.error);

  /// The resulting error of this result.
  final Exception error;

  @override
  String toString() => 'Result<$T>.error($error)';
}
```

[Error handling documentation]: https://dart.cn/language/error-handling
[Flutter architecture guidelines]: /app-architecture
[Compass App example]: {{site.repo.samples}}/tree/main/compass_app
[pub.dev]: {{site.pub}}
[`result_dart`]: {{site.pub-pkg}}/result_dart
[`result_type`]: {{site.pub-pkg}}/result_type
[`multiple_result`]: {{site.pub-pkg}}/multiple_result
[`sealed`]: {{site.dart-site}}/language/class-modifiers#sealed
[switch result or expression]: {{site.dart-site}}/language/branches#switch-statements
