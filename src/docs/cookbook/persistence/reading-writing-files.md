---
title: Reading and Writing Files
title: 文件读写
prev:
  title: Persist data with SQLite
  title: 用 SQLite 做数据持久化
  path: /docs/cookbook/persistence/sqlite
next:
  title: Storing key-value data on disk
  title: 存储键值对数据
  path: /docs/cookbook/persistence/key-value
---


In some cases, it can be handy to read and write files to disk.
This can be used to persist data across app launches,
or to download data from the internet and save it for later offline use.

在某些场景下，Flutter可以便捷的在磁盘上读写文件。
通常用于应用程序启动后持久化数据，或者保存从 Internet 下载的数据以便离线使用。

In order to save files to disk, you'll need to combine the
[`path_provider` plugin]({{site.pub-pkg}}/path_provider) with
the [`dart:io`]({{site.api}}/flutter/dart-io/dart-io-library.html)
library.

通过使用 [`dart:io`]({{site.api}}/flutter/dart-io/dart-io-library.html) 库中的 [`path_provider`]({{site.pub-pkg}}/path_provider) 插件，你可以在磁盘上保存文件。

## Directions

## 步骤

  1. Find the correct local path
  
     找到正确的本地路径
     
  2. Create a reference to the file location
  
     创建一个指向文件位置的引用
  
  3. Write data to the file
  
     向文件写数据
  
  4. Read data from the file
  
     从文件读取数据
     

## 1. Find the correct local path

## 1. 找到正确的本地路径

In this example, you'll display a counter. When the counter changes, you'll
write data on disk so you can read it again when the app loads.
Therefore, you must wonder: Where should I store this data?

在这个示例中，你将显示一个计数器。当计数器改变了之后你会将数据写入磁盘，然后你可以在应用程序启动的时候再读出来。
因此，你要思考：“我应该将数据存放在哪里？”

The [`path_provider`]({{site.pub-pkg}}/path_provider) plugin
provides a platform-agnostic way to access commonly used locations on the
device's filesystem. The plugin currently supports access to two filesystem
locations:

[`path_provider`]({{site.pub-pkg}}/path_provider) 插件在不同设备的文件系统中提供了一个平台无关的方式获得常用路径：


  * *Temporary directory:* A temporary directory (cache) that the system can
    clear at any time. On iOS, this corresponds to the value that
    [`NSTemporaryDirectory()`](https://developer.apple.com/reference/foundation/1409211-nstemporarydirectory)
    returns. On Android, this is the value that
    [`getCacheDir()`]({{site.android-dev}}/reference/android/content/Context#getCacheDir())
    returns.
    
    *临时文件夹：*这是一个系统可以随时清空的临时（缓存）文件夹。在 iOS 上 对应 [`NSTemporaryDirectory()`](https://developer.apple.com/reference/foundation/1409211-nstemporarydirectory) 的返回值。
    在 Android 上对应 [`getCacheDir()`]({{site.android-dev}}/reference/android/content/Context#getCacheDir()) 的返回值。
    
  * *Documents directory:* A directory for the app to store files that only
    it can access. The system clears the directory only when the app is deleted.
    On iOS, this corresponds to `NSDocumentDirectory`. On Android, this is the
    `AppData` directory.
    
    *文档文件夹：*这是一个给本应用程序提供存储文件且只有本应用程序可以读取的文件夹。系统仅在应用程序被删除后才会清空这个文件夹。
    在 iOS 上对应于 `NSDocumentDirectory`。 在 Android 上对应于 `AppData` 文件夹。
    
In this case, you'll want to store information in the documents directory.
You can find the path to the documents directory as follows:

如果你想在 *文档文件夹* 存储数据，你可以使用下面的方法找到 *文档文件夹*：

<!-- skip -->
```dart
Future<String> get _localPath async {
  final directory = await getApplicationDocumentsDirectory();

  return directory.path;
}
```

## 2. Create a reference to the file location

## 2. 创建一个指向文件位置的引用

Once you know where to store the file, you'll need to create a reference to the
file's full location. You can use the
[`File`]({{site.api}}/flutter/dart-io/File-class.html)
class from the [dart:io]({{site.api}}/flutter/dart-io/dart-io-library.html)
library to achieve this.
现在你已经知道将文件存储在什么地方，你需要创建一个文件全路径的引用。你可以使用 [dart:io]({{site.api}}/flutter/dart-io/dart-io-library.html) 库的 [`File`]({{site.api}}/flutter/dart-io/File-class.html) 来实现。

<!-- skip -->
```dart
Future<File> get _localFile async {
  final path = await _localPath;
  return File('$path/counter.txt');
}
```

## 3. Write data to the file

## 3. 向文件写数据

Now that you have a `File` to work with, use it to read and write data.
First, write some data to the file. Since you're working with a counter,
you'll simply store the integer as a String.

现在有了一个 `File` 的帮助，可以使用它来读写数据。
首先，向文件写入一些数据。 既然你在做计数器，那么你只需要把一个整型数据存储成字符串。

<!-- skip -->
```dart
Future<File> writeCounter(int counter) async {
  final file = await _localFile;

  // Write the file
  return file.writeAsString('$counter');
}
```

## 4. Read data from the file

## 4. 从文件读取数据

Now that you have some data on disk, you can read it.
Once again, use the `File` class.

现在你的磁盘上已经有了数据，你可以读取它了。
这一次还是要用到 `File` 类。

<!-- skip -->
```dart
Future<int> readCounter() async {
  try {
    final file = await _localFile;

    // Read the file
    String contents = await file.readAsString();

    return int.parse(contents);
  } catch (e) {
    // If encountering an error, return 0
    return 0;
  }
}
```

## Testing

## 测试


In order to test code that interacts with files, you'll need to Mock calls to
the `MethodChannel`. The `MethodChannel` is the class that Flutter uses to
communicate with the host platform.

为了测试与文件交互的代码，你需要进行 Mock 调用`MethodChannel`。
`MethodChannel` 是Flutter用来与主机平台通信的类。

In these tests, you can't interact with the filesystem on a device.
You'll need to interact with the test environment's filesystem.

在这些测试中，你无法与设备上的文件系统进行交互。 你需要与测试环境的文件系统进行交互。

To mock the method call, provide a `setupAll` function in the test file.
This function runs before the tests are executed.

要模拟方法调用，在测试文件中提供了`setupAll`函数。 此函数在执行测试之前运行。

<!-- skip -->
```dart
setUpAll(() async {
  // Create a temporary directory to work with
  // 提供一个临时文件夹作为工作空间
  final directory = await Directory.systemTemp.createTemp();

  // Mock out the MethodChannel for the path_provider plugin
  // 为 path_provider 插件提供一个模拟的 MethodChannel。
  const MethodChannel('plugins.flutter.io/path_provider')
      .setMockMethodCallHandler((MethodCall methodCall) async {
    // If you're getting the apps documents directory, return the path to the
    // temp directory on the test environment instead.
    // 如果您要获取应用程序文档目录，请返回测试环境中的临时目录的路径。
    if (methodCall.method == 'getApplicationDocumentsDirectory') {
      return directory.path;
    }
    return null;
  });
});
```

## Complete example

## 完整示例

```dart
import 'dart:async';
import 'dart:io';

import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:path_provider/path_provider.dart';

void main() {
  runApp(
    MaterialApp(
      title: 'Reading and Writing Files',
      home: FlutterDemo(storage: CounterStorage()),
    ),
  );
}

class CounterStorage {
  Future<String> get _localPath async {
    final directory = await getApplicationDocumentsDirectory();

    return directory.path;
  }

  Future<File> get _localFile async {
    final path = await _localPath;
    return File('$path/counter.txt');
  }

  Future<int> readCounter() async {
    try {
      final file = await _localFile;

      // Read the file
      String contents = await file.readAsString();

      return int.parse(contents);
    } catch (e) {
      // If encountering an error, return 0
      return 0;
    }
  }

  Future<File> writeCounter(int counter) async {
    final file = await _localFile;

    // Write the file
    return file.writeAsString('$counter');
  }
}

class FlutterDemo extends StatefulWidget {
  final CounterStorage storage;

  FlutterDemo({Key key, @required this.storage}) : super(key: key);

  @override
  _FlutterDemoState createState() => _FlutterDemoState();
}

class _FlutterDemoState extends State<FlutterDemo> {
  int _counter;

  @override
  void initState() {
    super.initState();
    widget.storage.readCounter().then((int value) {
      setState(() {
        _counter = value;
      });
    });
  }

  Future<File> _incrementCounter() {
    setState(() {
      _counter++;
    });

    // Write the variable as a string to the file.
    return widget.storage.writeCounter(_counter);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Reading and Writing Files')),
      body: Center(
        child: Text(
          'Button tapped $_counter time${_counter == 1 ? '' : 's'}.',
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: _incrementCounter,
        tooltip: 'Increment',
        child: Icon(Icons.add),
      ),
    );
  }
}
```
