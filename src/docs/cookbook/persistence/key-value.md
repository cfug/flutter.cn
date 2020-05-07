---
title: Store key-value data on disk
title: 存储键值对数据
description: How to use the shared_preferences package to store key-value data.
description: 如何使用 shared_preferences 包来存储 key-value 数据。
prev:
  title: Read and write files
  title: 文件读写
  path: /docs/cookbook/persistence/reading-writing-files
next:
  title: Play and pause a video
  title: 视频的播放和暂停
  path: /docs/cookbook/plugins/play-video
---

If you have a relatively small collection of key-values
to save, you can use the [`shared_preferences`][] plugin.

如果你要存储的键值集合相对较少，则可以用 [`shared_preferences`]({{site.pub}}/packages/shared_preferences) 插件。

Normally,
you would have to write native platform integrations for storing
data on both iOS and Android. Fortunately,
the [`shared_preferences`][] plugin can be used to persist
key-value data on disk. The shared preferences plugin
wraps `NSUserDefaults` on iOS and `SharedPreferences` on Android,
providing a persistent store for simple data.

通常你需要在两个平台用原生的方式存储数据。幸运的是 [`shared_preferences`]({{site.pub-pkg}}/shared_preferences) 插件可以把 key-value 保存到磁盘中。它通过封装 iOS 上的 `NSUserDefaults` 和 Android 上的 `SharedPreferences` 为简单数据提供持久化存储。

This recipe uses the following steps:

这个教程包含以下步骤：

  1. Add the dependency.

     添加依赖

  2. Save Data.

     保存数据

  3. Read Data.

     读取数据

  4. Remove Data.

     移除数据

## 1. Add the dependency

## 1. 添加依赖

Before starting, add the [`shared_preferences`][]
plugin to the `pubspec.yaml` file:

在开始之前，你需要在 `pubspec.yaml` 文件中添加 [shared_preferences]({{site.pub-pkg}}/shared_preferences) 插件：

```yaml
dependencies:
  flutter:
    sdk: flutter
  shared_preferences: "<newest version>"
```

## 2. Save data

## 2. 保存数据

To persist data, use the setter methods provided by the
`SharedPreferences` class. Setter methods are available for
various primitive types, such as `setInt`, `setBool`, and `setString`.

要存储数据，请使用 `SharedPreferences` 类的 setter 方法。Setter方法可用于各种基本数据类型，例如  `setInt`、`setBool` 和 `setString`。

Setter methods do two things: First, synchronously update the key-value pair
in-memory. Then, persist the data to disk.

Setter 方法做两件事：首先，同步更新 key-value 到内存中，然后保存到磁盘中。

<!-- skip -->
```dart
// obtain shared preferences
final prefs = await SharedPreferences.getInstance();

// set value
prefs.setInt('counter', counter);
```

## 3. Read data

## 3. 读取数据

To read data, use the appropriate getter method provided by the
`SharedPreferences` class. For each setter there is a corresponding getter.
For example, you can use the `getInt`, `getBool`, and `getString` methods.

要读取数据，请使用 `SharedPreferences` 类相应的 getter 方法。对于每一个 setter 方法都有对应的 getter 方法。例如，你可以使用 `getInt`、`getBool` 和 `getString` 方法。

<!-- skip -->
```dart
final prefs = await SharedPreferences.getInstance();

// Try reading data from the counter key. If it doesn't exist, return 0.
final counter = prefs.getInt('counter') ?? 0;
```

## 4. Remove data

## 4. 移除数据

To delete data, use the `remove()` method.

使用 `remove()` 方法删除数据。

<!-- skip -->
```dart
final prefs = await SharedPreferences.getInstance();

prefs.remove('counter');
```

## Supported types

## 支持类型

Although key-value storage is easy and convenient to use,
it has limitations:

虽然使用 key-value 存储非常简单方便，但是它也有以下局限性：

* Only primitive types can be used: `int`, `double`, `bool`, `string`,
  and `stringList`.
  
  只能用于基本数据类型： `int`、`double`、`bool`、`string` 和 `stringList`。
  
* It's not designed to store a lot of data.

  不适用于大量数据的存储。

For more information about shared preferences on Android,
see the [shared preferences documentation][]
on the Android developers website.

关于 Android 平台上 Shared Preferences 的更多信息，请前往 Android 开发者网站上查看 [Shared preferences 文档]({{site.android-dev}}/guide/topics/data/data-storage#pref) 。

## Testing support

## 测试支持

It's a good idea to test code that persists data using
`shared_preferences`. You can do this by mocking out the
`MethodChannel` used by the `shared_preferences` library.

使用 `shared_preferences` 存储数据来测试代码是一个不错的思路。为此，你需要模拟出 `shared_preferences` 库的 `MethodChannel` 方法。

Populate `SharedPreferences` with initial values in your tests
by running the following code in a `setupAll()` method in
your test files:

在你的测试中，你可以通过在测试文件的 `setupAll()` 方法中添加运行以下代码，对 `SharedPreferences` 的值进行初始：

<!-- skip -->
```dart
const MethodChannel('plugins.flutter.io/shared_preferences')
  .setMockMethodCallHandler((MethodCall methodCall) async {
    if (methodCall.method == 'getAll') {
      return <String, dynamic>{}; // set initial values here if desired
    }
    return null;
  });
```

## Complete example

## 示例

<!-- skip -->
```dart
import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  // This widget is the root of the application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Shared preferences demo',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: MyHomePage(title: 'Shared preferences demo'),
    );
  }
}

class MyHomePage extends StatefulWidget {
  MyHomePage({Key key, this.title}) : super(key: key);
  final String title;

  @override
  _MyHomePageState createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  int _counter = 0;

  @override
  void initState() {
    super.initState();
    _loadCounter();
  }

  //Loading counter value on start
  _loadCounter() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    setState(() {
      _counter = (prefs.getInt('counter') ?? 0);
    });
  }

  //Incrementing counter after click
  _incrementCounter() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    setState(() {
      _counter = (prefs.getInt('counter') ?? 0) + 1;
      prefs.setInt('counter', _counter);
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(widget.title),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            Text(
              'You have pushed the button this many times:',
            ),
            Text(
              '$_counter',
              style: Theme.of(context).textTheme.headline4,
            ),
          ],
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: _incrementCounter,
        tooltip: 'Increment',
        child: Icon(Icons.add),
      ), // This trailing comma makes auto-formatting nicer for build methods.
    );
  }
}
```


[`shared_preferences`]: {{site.pub-pkg}}/shared_preferences
[shared preferences documentation]: {{site.android-dev}}/guide/topics/data/data-storage#pref
