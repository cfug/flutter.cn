---
# title: "Persistent storage architecture: Key-value data"
title:  持久存储架构：键值对数据
# description: Save application data to a user's on-device key-value store.
description: 以键值对形式将应用产生的数据保存到用户的设备中。
contentTags:
  - data
  - shared-preferences
  - dark mode
iconPath: /assets/images/docs/app-architecture/design-patterns/kv-store-icon.svg
order: 1
js:
  - defer: true
    url: /assets/js/inject_dartpad.dart.js
---

<?code-excerpt path-base="app-architecture/todo_data_service"?>

Most Flutter applications, no matter how small or big they are,
require storing data on the user’s device at some point, such as API keys, 
user preferences or data that should be available offline.

大多数 Flutter 应用程序，
无论规模大小，
往往需要在用户设备上存储数据。
例如：API 密钥、用户偏好内容，以及需要支持离线访问的数据。

In this recipe, you will learn how to integrate persistent storage 
for key-value data in a Flutter application 
that uses the recommended [Flutter architecture design][]. 
If you aren’t familiar with storing data to disk at all, 
you can read the [Store key-value data on disk][] recipe. 

在本教程中，
你将学习如何遵循 [Flutter 架构设计模式][Flutter architecture design]，
并在 Flutter 应用中实现基于键值对的数据持久化存储。
如果你尚且不熟悉如何将数据存储到磁盘上，
可以阅读 [将键值对数据存储到磁盘上][Store key-value data on disk]。

Key-value stores are often used for saving simple data, 
such as app configuration, 
and in this recipe you’ll use it to save Dark Mode preferences. 
If you want to learn how to store complex data on a device, 
you’ll likely want to use SQL. 
In that case, take a look at the cookbook recipe 
that follows this one called [Persistent storage architecture: SQL][]. 

键值对存储常用于存储简单的数据，
例如应用配置，
在本教程中，你将学习如何使用它来保存深色模式偏好设置。
如果你希望学习如何在设备上存储复杂的数据，
你可能需要使用 SQL。
此时，请阅读本教程之后的 [持久化存储架构：SQL][Persistent storage architecture: SQL]。

## Example application: App with theme selection

## 示例应用：带主题选择的应用

The example application consists of a single screen with an app bar at the top,
a list of items, and a text field input at the bottom.

该示例应用为单页面结构，主要包含：
顶部的 AppBar、中间的项目列表以及底部的文本输入框。

<img src='/assets/images/docs/cookbook/architecture/todo_app_light.png'
class="site-mobile-screenshot" alt="ToDo application in light mode" >

In the `AppBar`, 
a `Switch` allows users to change between dark and light theme modes. 
This setting is applied immediately and it’s stored in the device 
using a key-value data storage service. 
The setting is restored when the user starts the application again.

在 `AppBar` 中，一个 `Switch` 允许用户在深色和浅色主题之间切换。
该设置立即生效，并通过键值对数据存储服务保存在设备上。
当用户再次启动应用时，该设置会被恢复。

<img src='/assets/images/docs/cookbook/architecture/todo_app_dark.png'
class="site-mobile-screenshot" alt="ToDo application in dark mode" >

:::note
The full, runnable source-code for this example is
available in [`/examples/app-architecture/todo_data_service/`][].

此示例完整且可运行的源代码，
可在 [`/examples/app-architecture/todo_data_service/`][] 中找到。
:::

## Storing theme selection key-value data

## 存储当前选择主题的键值对数据

This functionality follows the recommended Flutter architecture design pattern, 
with a presentation and a data layer.

此功能遵循推荐的 Flutter 架构设计，
包含展示层和数据层（Data Layer）。

- The presentation layer contains the `ThemeSwitch` widget 
and the `ThemeSwitchViewModel`.
  展示层包含 `ThemeSwitch` 组件和 `ThemeSwitchViewModel` 。
- The data layer contains the `ThemeRepository` 
and the `SharedPreferencesService`.
  数据层包含 `ThemeRepository` 和 `SharedPreferencesService` 。

### Theme selection presentation layer

### 主题选择展示层

The `ThemeSwitch` is a `StatelessWidget` that contains a `Switch` widget. 
The state of the switch is represented 
by the public field `isDarkMode` in the `ThemeSwitchViewModel`. 
When the user taps the switch, 
the code executes the command `toggle` in the view model.

`ThemeSwitch` 是一个 `StatelessWidget` ，它包含一个 `Switch` 组件。
开关的状态由 `ThemeSwitchViewModel` 中的公共字段 `isDarkMode` 表示。
当用户点击开关时，代码执行视图模型中的命令 `toggle` 。

<?code-excerpt "lib/ui/theme_config/widgets/theme_switch.dart (ThemeSwitch)"?>
```dart
class ThemeSwitch extends StatelessWidget {
  const ThemeSwitch({super.key, required this.viewmodel});

  final ThemeSwitchViewModel viewmodel;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 16.0),
      child: Row(
        children: [
          const Text('Dark Mode'),
          ListenableBuilder(
            listenable: viewmodel,
            builder: (context, _) {
              return Switch(
                value: viewmodel.isDarkMode,
                onChanged: (_) {
                  viewmodel.toggle.execute();
                },
              );
            },
          ),
        ],
      ),
    );
  }
}
```

The `ThemeSwitchViewModel` implements a view model
as described in the MVVM pattern. 
This view model contains the state of the `ThemeSwitch` widget,
represented by the boolean variable `_isDarkMode`.

`ThemeSwitchViewModel` 实现了 MVVM 模式中描述的视图模型。
该视图模型包含 `ThemeSwitch` 组件的状态，
由布尔变量 `_isDarkMode` 表示。

The view model uses the `ThemeRepository`
to store and load the dark mode setting.

视图模型使用 `ThemeRepository` 存储和加载深色模式的设置。

It contains two different command actions: 
`load`, which loads the dark mode setting from the repository,
and `toggle`, which switches the state between dark mode and light mode. 
It exposes the state through the `isDarkMode` getter.

该模型包含两个不同的命令操作：
`load`，从存储库中加载深色模式设置，
`toggle`，在深色模式和浅色模式之间切换状态。
它通过 `isDarkMode` getter 暴露状态。

The `_load` method implements the `load` command. 
This method calls `ThemeRepository.isDarkMode` 
to obtain the stored setting and calls `notifyListeners()` to refresh the UI.

`_load` 方法实现了 `load` 命令。
该方法调用 `ThemeRepository.isDarkMode` 获取存储的设置，
然后调用 `notifyListeners()` 刷新 UI。

The `_toggle` method implements the `toggle` command. 
This method calls `ThemeRepository.setDarkMode` 
to store the new dark mode setting. 
As well, it changes the local state of `_isDarkMode`
then calls `notifyListeners()` to update the UI.

`_toggle` 方法实现了 `toggle` 命令。
该方法调用 `ThemeRepository.setDarkMode` 存储新的深色模式设置。
与此同时，它修改本地状态 `_isDarkMode` ，
然后调用 `notifyListeners()` 更新 UI。

<?code-excerpt "lib/ui/theme_config/viewmodel/theme_switch_viewmodel.dart (ThemeSwitchViewModel)"?>
```dart
class ThemeSwitchViewModel extends ChangeNotifier {
  ThemeSwitchViewModel(this._themeRepository) {
    load = Command0(_load)..execute();
    toggle = Command0(_toggle);
  }

  final ThemeRepository _themeRepository;

  bool _isDarkMode = false;

  /// If true show dark mode
  bool get isDarkMode => _isDarkMode;

  late final Command0<void> load;

  late final Command0<void> toggle;

  /// Load the current theme setting from the repository
  Future<Result<void>> _load() async {
    final result = await _themeRepository.isDarkMode();
    if (result is Ok<bool>) {
      _isDarkMode = result.value;
    }
    notifyListeners();
    return result;
  }

  /// Toggle the theme setting
  Future<Result<void>> _toggle() async {
    _isDarkMode = !_isDarkMode;
    final result = await _themeRepository.setDarkMode(_isDarkMode);
    notifyListeners();
    return result;
  }
}
```

### Theme selection data layer

### 主题选择数据层

Following the architecture guidelines, 
the data layer is split into two parts: 
the `ThemeRepository` and the `SharedPreferencesService`.

根据架构指南，
数据层被分为两部分：
`ThemeRepository` 和 `SharedPreferencesService` 。

The `ThemeRepository` is the single source of truth 
for all the theming configuration settings, 
and handles any possible errors coming from the service layer.

`ThemeRepository` 是所有主题配置设置的唯一数据来源，
并处理来自服务层可能出现的任何错误。

In this example, 
the `ThemeRepository` also exposes the dark mode setting 
through an observable `Stream`. 
This allows other parts of the application 
to subscribe to changes in the dark mode setting.

在本示例中，
`ThemeRepository` 还通过可观察的 `Stream` 暴露深色模式设置。
这允许应用程序的其他部分订阅深色模式设置的变化。

The `ThemeRepository` depends on `SharedPreferencesService`.
The repository obtains the stored value from the service, 
and stores it when it changes.

`ThemeRepository` 依赖于 `SharedPreferencesService` 。
该主题仓库从服务中获取存储的值，
并存储其改变后的值。

The `setDarkMode()` method passes the new value to the `StreamController`,
so that any component listening to the `observeDarkMode` stream 

`setDarkMode()` 方法将新值传递给 `StreamController`，
以便让任何监听 `observeDarkMode` 流的组件观察到数据变化。

<?code-excerpt "lib/data/repositories/theme_repository.dart (ThemeRepository)"?>
```dart
class ThemeRepository {
  ThemeRepository(this._service);

  final _darkModeController = StreamController<bool>.broadcast();

  final SharedPreferencesService _service;

  /// Get if dark mode is enabled
  Future<Result<bool>> isDarkMode() async {
    try {
      final value = await _service.isDarkMode();
      return Result.ok(value);
    } on Exception catch (e) {
      return Result.error(e);
    }
  }

  /// Set dark mode
  Future<Result<void>> setDarkMode(bool value) async {
    try {
      await _service.setDarkMode(value);
      _darkModeController.add(value);
      return Result.ok(null);
    } on Exception catch (e) {
      return Result.error(e);
    }
  }

  /// Stream that emits theme config changes.
  /// ViewModels should call [isDarkMode] to get the current theme setting.
  Stream<bool> observeDarkMode() => _darkModeController.stream;
}
```

The `SharedPreferencesService` wraps 
the `SharedPreferences` plugin functionality, 
and calls to the `setBool()` and `getBool()` methods 
to store the dark mode setting, 
hiding this third-party dependency from the rest of the application

`SharedPreferencesService` 内部集成了 `SharedPreferences` 插件的功能，
并调用 `setBool()` 和 `getBool()` 方法来存储深色模式设置，
从而对应用隐藏第三方依赖项。

:::note
A third-party dependency is a way to refer to packages and plugins 
developed by other programmers outside of your organization.

第三方依赖是指引用组织外程序员开发的 packages 和插件的一种方式。
:::

<?code-excerpt "lib/data/services/shared_preferences_service.dart (SharedPreferencesService)"?>
```dart
class SharedPreferencesService {
  static const String _kDarkMode = 'darkMode';

  Future<void> setDarkMode(bool value) async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setBool(_kDarkMode, value);
  }

  Future<bool> isDarkMode() async {
    final prefs = await SharedPreferences.getInstance();
    return prefs.getBool(_kDarkMode) ?? false;
  }
}
```

## Putting it all together

## 整合业务

In this example, 
the `ThemeRepository` and `SharedPreferencesService` are created 
in the `main()` method 
and passed to the `MainApp` as constructor argument dependency.

在本示例中， 
`ThemeRepository` 和 `SharedPreferencesService` 是在 `main()` 方法中创建的，
并作为构造函数参数依赖项传递给 `MainApp` 。

<?code-excerpt "lib/main.dart (MainTheme)"?>
```dart
void main() {
  // ···
  runApp(
    MainApp(
      themeRepository: ThemeRepository(SharedPreferencesService()),
      // ···
    ),
  );
}
```

Then, when the `ThemeSwitch` is created, 
also create `ThemeSwitchViewModel` 
and pass the `ThemeRepository` as dependency.

然后，当创建 `ThemeSwitch` 时，
也创建 `ThemeSwitchViewModel` 
并将 `ThemeRepository` 作为依赖项注入。

<?code-excerpt "lib/main.dart (AddThemeSwitch)"?>
```dart
ThemeSwitch(
  viewmodel: ThemeSwitchViewModel(widget.themeRepository),
),
```

The example application also includes the `MainAppViewModel` class, 
which listens to changes in the `ThemeRepository` 
and exposes the dark mode setting to the `MaterialApp` widget.

该示例程序还包括 `MainAppViewModel` 类，
该类监听 `ThemeRepository` 的变化并向 `MaterialApp` 小部件暴露深色模式设置。

<?code-excerpt "lib/main_app_viewmodel.dart (MainAppViewModel)"?>
```dart
class MainAppViewModel extends ChangeNotifier {
  MainAppViewModel(this._themeRepository) {
    _subscription = _themeRepository.observeDarkMode().listen((isDarkMode) {
      _isDarkMode = isDarkMode;
      notifyListeners();
    });
    _load();
  }

  final ThemeRepository _themeRepository;
  StreamSubscription<bool>? _subscription;

  bool _isDarkMode = false;

  bool get isDarkMode => _isDarkMode;

  Future<void> _load() async {
    final result = await _themeRepository.isDarkMode();
    if (result is Ok<bool>) {
      _isDarkMode = result.value;
    }
    notifyListeners();
  }

  @override
  void dispose() {
    _subscription?.cancel();
    super.dispose();
  }
}
```

<?code-excerpt "lib/main.dart (ListenableBuilder)" replace="/^return //g;/},$/},\n  child: \/\/...\n)/g"?>
```dart
ListenableBuilder(
  listenable: _viewModel,
  builder: (context, child) {
    return MaterialApp(
      theme: _viewModel.isDarkMode ? ThemeData.dark() : ThemeData.light(),
      home: child,
    );
  },
  child: //...
)
```

[Flutter architecture design]: /app-architecture
[Store key-value data on disk]: /cookbook/persistence/key-value
[Persistent Storage Architecture: SQL]: /app-architecture/design-patterns/sql
[`/examples/app-architecture/todo_data_service/`]: {{site.repo.this}}/tree/main/examples/app-architecture/todo_data_service/
