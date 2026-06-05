---
# title: Testing each layer
title: 测试各层
# shortTitle: Testing
shortTitle: 测试
# description: >-
#   How to test an app that implements MVVM architecture.
description: >-
  如何测试实现 MVVM 架构的应用。
# prev:
#   title: Dependency injection
#   path: /app-architecture/case-study/dependency-injection
prev:
  title: 依赖注入
  path: /app-architecture/case-study/dependency-injection
ai-translated: true
---

## Testing the UI layer

## 测试 UI 层

One way to determine whether your architecture is sound is
considering how easy (or difficult) the application is to test.
Because view models and views have well-defined inputs,
their dependencies can easily be mocked or faked,
and unit tests are easily written.

判断架构是否合理的一种方式，是看应用是否易于测试。
由于 view model 与 view 输入明确，依赖易于 mock 或 fake，单元测试也易编写。

### ViewModel unit tests

### ViewModel 单元测试

To test the UI logic of the view model, you should write unit tests that
don't rely on Flutter libraries or testing frameworks.

测试 view model 的 UI 逻辑时，应编写不依赖 Flutter 库或测试框架的单元测试。

Repositories are a view model's only dependencies
(unless you're implementing [use-cases][]),
and writing `mocks` or `fakes` of the repository is
the only setup you need to do.
In this example test, a fake called `FakeBookingRepository` is used.

仓库是 view model 的唯一依赖（除非实现 [用例][use-cases]），
只需为仓库编写 `mock` 或 `fake`。
本示例测试使用名为 `FakeBookingRepository` 的 fake。

```dart title=home_screen_test.dart
void main() {
  group('HomeViewModel tests', () {
    test('Load bookings', () {
      // HomeViewModel._load is called in the constructor of HomeViewModel.
      final viewModel = HomeViewModel(
        bookingRepository: FakeBookingRepository()
          ..createBooking(kBooking),
        userRepository: FakeUserRepository(),
      );

      expect(viewModel.bookings.isNotEmpty, true);
    });
  });
}
```

The [`FakeBookingRepository`][] class implements [`BookingRepository`][].
In the [data layer section][] of this case-study,
the `BookingRepository` class is explained thoroughly.

[`FakeBookingRepository`][] 实现 [`BookingRepository`][]。
在本案例研究的 [数据层部分][`BookingRepository`] 中对 `BookingRepository` 有详细说明。

```dart title=fake_booking_repository.dart
class FakeBookingRepository implements BookingRepository {
  List<Booking> bookings = List.empty(growable: true);

  @override
  Future<Result<void>> createBooking(Booking booking) async {
    bookings.add(booking);
    return Result.ok(null);
  }
  // ...
}
```

:::note
If you're using this architecture with [use-cases][], these would
similarly need to be faked.

若在此架构中使用 [用例][use-cases]，同样需要 fake 用例。
:::

### View widget tests

### View widget 测试

Once you've written tests for your view model,
you've already created the fakes you need to write widget tests as well.
The following example shows how the `HomeScreen` widget tests
are set up using the `HomeViewModel` and needed repositories:

为 view model 写好测试后，编写 widget 测试所需的 fake 也已就绪。
以下示例展示如何使用 `HomeViewModel` 与所需仓库设置 `HomeScreen` widget 测试：

```dart title=home_screen_test.dart
void main() {
  group('HomeScreen tests', () {
    late HomeViewModel viewModel;
    late MockGoRouter goRouter;
    late FakeBookingRepository bookingRepository;

    setUp(() {
      bookingRepository = FakeBookingRepository()
        ..createBooking(kBooking);
      viewModel = HomeViewModel(
        bookingRepository: bookingRepository,
        userRepository: FakeUserRepository(),
      );
      goRouter = MockGoRouter();
      when(() => goRouter.push(any())).thenAnswer((_) => Future.value(null));
    });

    // ...
  });
}
```

This setup creates the two fake repositories needed,
and passes them into a `HomeViewModel` object.
This class doesn't need to be faked.

该设置创建两个 fake 仓库并传入 `HomeViewModel`，该类无需 fake。

:::note
The code also defines a `MockGoRouter`.
The router is mocked using [`package:mocktail`][],
and is outside the scope of this case-study.
You can find general testing guidance in [Flutter's testing documentation][].

代码还定义了 `MockGoRouter`，使用 [`package:mocktail`][] mock 路由，
超出本案例范围。一般测试指导见 [Flutter 测试文档][]。
:::

After the view model and its dependencies are defined,
the Widget tree that will be tested needs to be created.
In the tests for `HomeScreen`, a `loadWidget` method is defined.

定义 view model 及其依赖后，需创建待测 Widget 树。
`HomeScreen` 测试中定义了 `loadWidget` 方法。

```dart title=home_screen_test.dart highlightLines=11-23
void main() {
  group('HomeScreen tests', () {
    late HomeViewModel viewModel;
    late MockGoRouter goRouter;
    late FakeBookingRepository bookingRepository;

    setUp(
      // ...
    );

    void loadWidget(WidgetTester tester) async {
      await testApp(
        tester,
        ChangeNotifierProvider.value(
          value: FakeAuthRepository() as AuthRepository,
          child: Provider.value(
            value: FakeItineraryConfigRepository() as ItineraryConfigRepository,
            child: HomeScreen(viewModel: viewModel),
          ),
        ),
        goRouter: goRouter,
      );
    }

    // ...
  });
}
```

This method turns around and calls `testApp`,
a generalized method used for all widget tests in the compass app.
It looks like this:

该方法转而调用 Compass 应用所有 widget 测试共用的 `testApp`，如下：

```dart title=testing/app.dart
void testApp(
  WidgetTester tester,
  Widget body, {
  GoRouter? goRouter,
}) async {
  tester.view.devicePixelRatio = 1.0;
  await tester.binding.setSurfaceSize(const Size(1200, 800));
  await mockNetworkImages(() async {
    await tester.pumpWidget(
      MaterialApp(
        localizationsDelegates: [
          GlobalWidgetsLocalizations.delegate,
          GlobalMaterialLocalizations.delegate,
          AppLocalizationDelegate(),
        ],
        theme: AppTheme.lightTheme,
        home: InheritedGoRouter(
          goRouter: goRouter ?? MockGoRouter(),
          child: Scaffold(
            body: body,
          ),
        ),
      ),
    );
  });
}
```

This function's only job is to create a widget tree that can be tested.

该函数唯一职责是创建可测试的 widget 树。

The `loadWidget` method passes in the unique parts of a widget tree for testing.
In this case, that includes the `HomeScreen` and its view model,
as well as some additional faked repositories that
are higher in the widget tree.

`loadWidget` 传入测试中 widget 树的独特部分，包括 `HomeScreen` 及其 view model，
以及 widget 树更高处的额外 fake 仓库。

The most important thing to take away is that view and view model tests
only require mocking repositories if your architecture is sound.

最重要的是：若架构合理，view 与 view model 测试只需 mock 仓库。

## Testing the data layer

## 测试数据层

Similar to the UI layer, the components of the data layer have
well-defined inputs and outputs, making both sides fake-able.
To write unit tests for any given repository,
mock the services that it depends on.
The following example shows a unit test for the `BookingRepository`.

与 UI 层类似，数据层组件输入输出明确，两侧都可 fake。
为任意仓库编写单元测试时，mock 其依赖的 service。
以下示例为 `BookingRepository` 的单元测试。

```dart title=booking_repository_remote_test.dart
void main() {
  group('BookingRepositoryRemote tests', () {
    late BookingRepository bookingRepository;
    late FakeApiClient fakeApiClient;

    setUp(() {
      fakeApiClient = FakeApiClient();
      bookingRepository = BookingRepositoryRemote(
        apiClient: fakeApiClient,
      );
    });

    test('should get booking', () async {
      final result = await bookingRepository.getBooking(0);
      final booking = result.asOk.value;
      expect(booking, kBooking);
    });
  });
}
```

To learn more about writing mocks and fakes,
check out examples in the [Compass App `testing` directory][] or
read [Flutter's testing documentation][].

更多 mock 与 fake 示例见 [Compass 应用 `testing` 目录][] 或 [Flutter 测试文档][]。

[use-cases]: /app-architecture/guide#optional-domain-layer
[用例]: /app-architecture/guide#optional-domain-layer
[`FakeBookingRepository`]: https://github.com/flutter/samples/blob/main/compass_app/app/testing/fakes/repositories/fake_booking_repository.dart
[`BookingRepository`]: https://github.com/flutter/samples/tree/main/compass_app/app/lib/data/repositories/booking
[data layer section]: /app-architecture/case-study/data-layer
[数据层部分]: /app-architecture/case-study/data-layer
[`package:mocktail`]: {{site.pub-pkg}}/mocktail
[Flutter's testing documentation]: /testing/overview
[Flutter 测试文档]: /testing/overview
[Compass App `testing` directory]: https://github.com/flutter/samples/tree/main/compass_app/app/testing
[Compass 应用 `testing` 目录]: https://github.com/flutter/samples/tree/main/compass_app/app/testing

## Feedback

## 反馈

As this section of the website is evolving,
we [welcome your feedback][]!

网站本节内容仍在完善中，
[欢迎提供反馈][welcome your feedback]！

[welcome your feedback]: https://google.qualtrics.com/jfe/form/SV_4T0XuR9Ts29acw6?page="case-study/testing"
