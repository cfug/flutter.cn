---
# title: Store key-value data on disk
title: 存储键值对数据
# description: >-
#   Learn how to use the shared_preferences package to store key-value data.
description: 学习如何使用 shared_preferences 包来存储键值对数据。
tags: cookbook, 实用教程, 持久化
keywords: KV,SharedPreferences
---

<?code-excerpt path-base="cookbook/persistence/key_value/"?>

If you have a relatively small collection of key-values
to save, you can use the [`shared_preferences`][] plugin.

如果你要存储的键值集合相对较少，
则可以用 [`shared_preferences`][] 插件。

Normally, you would have to
write native platform integrations for storing data on each platform.
Fortunately, the [`shared_preferences`][] plugin can be used to
persist key-value data to disk on each platform Flutter supports.

通常你需要在两个平台用原生的方式存储数据。
幸运的是 [`shared_preferences`] 插件可以把 key-value 保存到磁盘中。

This recipe uses the following steps:

这个教程包含以下步骤：

  1. Add the dependency.

     添加依赖

  2. Save data.

     保存数据

  3. Read data.

     读取数据

  4. Remove data.

     移除数据

:::note
To learn more, watch this short Package of the Week video
on the `shared_preferences` package:

{% ytEmbed 'sa_U0jffQII', 'shared_preferences | Flutter package of the week' %}
:::

## 1. Add the dependency

## 1. 添加依赖

Before starting, add the [`shared_preferences`][] package as a dependency.

在开始之前，你需要添加 [`shared_preferences`][] 为依赖：

To add the `shared_preferences` package as a dependency,
run `flutter pub add`:

运行 `flutter pub add` 将 `shared_preferences` 添加为依赖：

```console
flutter pub add shared_preferences
```

## 2. Save data

## 2. 保存数据

To persist data, use the setter methods provided by the
`SharedPreferences` class. Setter methods are available for
various primitive types, such as `setInt`, `setBool`, and `setString`.

要存储数据，请使用 `SharedPreferences` 类的 setter 方法。
Setter方法可用于各种基本数据类型，
例如 `setInt`、`setBool` 和 `setString`。

Setter methods do two things: First, synchronously update the
key-value pair in memory. Then, persist the data to disk.

Setter 方法做两件事：
首先，同步更新 key-value 到内存中，然后保存到磁盘中。

<?code-excerpt "lib/partial_excerpts.dart (Step2)"?>
```dart
// Load and obtain the shared preferences for this app.
final prefs = await SharedPreferences.getInstance();

// Save the counter value to persistent storage under the 'counter' key.
await prefs.setInt('counter', counter);
```

## 3. Read data

## 3. 读取数据

To read data, use the appropriate getter method provided by the
`SharedPreferences` class. For each setter there is a corresponding getter.
For example, you can use the `getInt`, `getBool`, and `getString` methods.

要读取数据，请使用 `SharedPreferences` 类相应的 getter 方法。
对于每一个 setter 方法都有对应的 getter 方法。
例如，你可以使用 `getInt`、`getBool` 和 `getString` 方法。

<?code-excerpt "lib/partial_excerpts.dart (Step3)"?>
```dart
final prefs = await SharedPreferences.getInstance();

// Try reading the counter value from persistent storage.
// If not present, null is returned, so default to 0.
final counter = prefs.getInt('counter') ?? 0;
```

Note that the getter methods throw an exception if the persisted value
has a different type than the getter method expects.

## 4. Remove data

## 4. 移除数据

To delete data, use the `remove()` method.

使用 `remove()` 方法删除数据。

<?code-excerpt "lib/partial_excerpts.dart (Step4)"?>
```dart
final prefs = await SharedPreferences.getInstance();

// Remove the counter key-value pair from persistent storage.
await prefs.remove('counter');
```

## Supported types

## 支持类型

Although the key-value storage provided by `shared_preferences` is
easy and convenient to use, it has limitations:

虽然使用 `shared_preferences` 提供的键值对存储非常简单方便，
但是它也有以下局限性：

* Only primitive types can be used: `int`, `double`, `bool`, `String`,
  and `List<String>`.

  只能用于基本数据类型： `int`、`double`、`bool`、`string` 和 `List<String>`。

* It's not designed to store large amounts of data.

  不是为存储大量数据而设计的。

* There is no guarantee that data will be persisted across app restarts.

  不能确保应用重启后数据仍然存在。

## Testing support

## 测试支持

It's a good idea to test code that persists data using `shared_preferences`.
To enable this, the package provides an
in-memory mock implementation of the preference store.

使用 `shared_preferences` 来存储测试代码的数据是一个不错的思路。
为此，你需要使用 package 自带的基于内存的模拟持久化存储。

To set up your tests to use the mock implementation,
call the `setMockInitialValues` static method in
a `setUpAll()` method in your test files.
Pass in a map of key-value pairs to use as the initial values.

在你的测试中，你可以通过在测试文件的 `setupAll()` 方法中
调用 `setMockInitialValues` 静态方法来使用对应的模拟存储。
同时你还可以设定初始值：

<?code-excerpt "test/prefs_test.dart (setup)"?>
```dart
SharedPreferences.setMockInitialValues(<String, Object>{'counter': 2});
```

## Complete example

## 完整示例

<?code-excerpt "lib/main.dart"?>
```dart
import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';

void main() => runApp(const MyApp());

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return const MaterialApp(
      title: 'Shared preferences demo',
      home: MyHomePage(title: 'Shared preferences demo'),
    );
  }
}

class MyHomePage extends StatefulWidget {
  const MyHomePage({super.key, required this.title});

  final String title;

  @override
  State<MyHomePage> createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  int _counter = 0;

  @override
  void initState() {
    super.initState();
    _loadCounter();
  }

  /// Load the initial counter value from persistent storage on start,
  /// or fallback to 0 if it doesn't exist.
  Future<void> _loadCounter() async {
    final prefs = await SharedPreferences.getInstance();
    setState(() {
      _counter = prefs.getInt('counter') ?? 0;
    });
  }

  /// After a click, increment the counter state and
  /// asynchronously save it to persistent storage.
  Future<void> _incrementCounter() async {
    final prefs = await SharedPreferences.getInstance();
    setState(() {
      _counter = (prefs.getInt('counter') ?? 0) + 1;
      prefs.setInt('counter', _counter);
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text(widget.title)),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            const Text('You have pushed the button this many times: '),
            Text(
              '$_counter',
              style: Theme.of(context).textTheme.headlineMedium,
            ),
          ],
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: _incrementCounter,
        tooltip: 'Increment',
        child: const Icon(Icons.add),
      ),
    );
  }
}
```

[`shared_preferences`]: {{site.pub-pkg}}/shared_preferences
