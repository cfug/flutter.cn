---
title: Read and write files
title: 文件读写
description: How to read from and write to files on disk.
description: 如何读写硬盘上的文件。
prev:
  title: Persist data with SQLite
  title: 用 SQLite 做数据持久化
  path: /docs/cookbook/persistence/sqlite
next:
  title: Store key-value data on disk
  title: 存储键值对数据
  path: /docs/cookbook/persistence/key-value
---

In some cases, you need to read and write files to disk.
For example, you may need to persist data across app launches,
or download data from the internet and save it for later offline use.

磁盘文件的读写操作可能会相对方便地实现某些业务场景。
它常见于应用启动期间产生的持久化数据，或者从网络下载数据供离线使用。

To save files to disk, combine the [`path_provider`][]
plugin with the [`dart:io`][] library.

为了将文件保存到磁盘，你需要结合使用 [`dart:io`]({{site.api}}/flutter/dart-io/dart-io-library.html) 
库中的 [`path_provider`]({{site.pub-pkg}}/path_provider) 这个 package。

## Directions

## 步骤

  1. Find the correct local path.
  
     找到正确的本地路径
     
  2. Create a reference to the file location.
  
     创建一个指向文件位置的引用
  
  3. Write data to the file.
  
     将数据写入文件
  
  4. Read data from the file.
  
     从文件读取数据
     

## 1. Find the correct local path

## 1. 找到正确的本地路径

This example displays a counter. When the counter changes,
write data on disk so you can read it again when the app loads.
Where should you store this data?

这个例子里，我们将会显示一个计数器，当计数器发生变化时，你将在磁盘中写入数据，
以便在应用加载时重新读取这些数据。因此，你一定想知道：我应该将这些数据存储在哪里？

The [`path_provider`][] plugin
provides a platform-agnostic way to access commonly used locations on the
device's file system. The plugin currently supports access to
two file system locations:

*Temporary directory*
<br> A temporary directory (cache) that the system can
  clear at any time. On iOS, this corresponds to the
  [`NSCachesDirectory`][]. On Android, this is the value that
  [`getCacheDir()`][]) returns.

*临时文件夹：* 
<br> 这是一个系统可以随时清空的临时（缓存）文件夹。
  在 iOS 上 对应 [`NSCachesDirectory`][] 的返回值；
  在 Android 上对应 [`getCacheDir()`][]) 的返回值。

*Documents directory*
<br> A directory for the app to store files that only
  it can access. The system clears the directory only when the app
  is deleted.
  On iOS, this corresponds to the `NSDocumentDirectory`.
  On Android, this is the `AppData` directory.
  
*Documents 目录：*
<br> 供应用使用，用于存储只能由该应用访问的文件。
  只有在删除应用时，系统才会清除这个目录。
  在 iOS 上，这个目录对应于 `NSDocumentDirectory`。
  在 Android 上，则是 `AppData` 目录。 

This example stores information in the documents directory.
You can find the path to the documents directory as follows:

在本示例中，你需要将信息存储在 Documents 目录中。
可以按如下所示，找到 Documents 目录路径：

<!-- skip -->
```dart
Future<String> get _localPath async {
  final directory = await getApplicationDocumentsDirectory();

  return directory.path;
}
```

## 2. Create a reference to the file location

## 2. 创建一个指向文件位置的引用

Once you know where to store the file, create a reference to the
file's full location. You can use the [`File`][]
class from the [`dart:io`][] library to achieve this.

确定文件的存储位置后，需要创建对文件完整位置的引用。
为此，你可以使用 [dart:io]({{site.api}}/flutter/dart-io/dart-io-library.html)
库的 [`File`]({{site.api}}/flutter/dart-io/File-class.html) 类来实现。

<!-- skip -->
```dart
Future<File> get _localFile async {
  final path = await _localPath;
  return File('$path/counter.txt');
}
```

## 3. Write data to the file

## 3. 将数据写入文件

Now that you have a `File` to work with,
use it to read and write data.
First, write some data to the file.
The counter is an integer, but is written to the
file as a string using the `'$counter'` syntax.

现在你已经有了可以使用的 `File`，接下来使用这个文件来读写数据。
首先，将一些数据写入该文件。由于使用了计数器，因此只需将整数存储为字符串格式，
使用 `'$counter'` 即可调用。

<!-- skip -->
```dart
Future<File> writeCounter(int counter) async {
  final file = await _localFile;

  // Write the file.
  return file.writeAsString('$counter');
}
```

## 4. Read data from the file

## 4. 从文件读取数据

Now that you have some data on disk, you can read it.
Once again, use the `File` class.

现在，你的磁盘上已经有了一些数据可供读取。
此时同样需要使用 `File` 类。

<!-- skip -->
```dart
Future<int> readCounter() async {
  try {
    final file = await _localFile;

    // Read the file.
    String contents = await file.readAsString();

    return int.parse(contents);
  } catch (e) {
    // If encountering an error, return 0.
    return 0;
  }
}
```

## Testing

## 测试

To test code that interacts with files, you need to mock calls to
the `MethodChannel`&mdash;the class that
communicates with the host platform. For security reasons,
you can't directly interact with the file system on a device,
so you interact with the test environment's file system.

为了测试代码与文件的交互情况，你需要对 `MethodChannel` 发起模拟调用。
`MethodChannel` 是 Flutter 用于与主平台通信的类。
出于安全起见，在这些测试中是无法与设备上的文件系统进行交互的，
你将会与测试环境的文件系统进行交互。

To mock the method call, provide a `setupAll()` function in the test file.
This function runs before the tests are executed.

要模拟方法调用，请在测试文件中提供 `setupAll` 函数。这样会先运行这个函数，然后再执行测试。

<!-- skip -->
```dart
setUpAll(() async {

  // Create a temporary directory. (提供一个临时文件夹作为工作空间)
  final directory = await Directory.systemTemp.createTemp();

  // Mock out the MethodChannel for the path_provider plugin. (为 path_provider 插件提供一个模拟的 MethodChannel)  
  const MethodChannel('plugins.flutter.io/path_provider')
      .setMockMethodCallHandler((MethodCall methodCall) async {
    // If you're getting the apps documents directory, return the path to the
    // temp directory on the test environment instead. (如果您要获取应用的 Documents 目录，请返回测试环境中的临时目录的路径)
    if (methodCall.method == 'getApplicationDocumentsDirectory') {
      return directory.path;
    }
    return null;
  });
});
```

## Complete example

## 完整样例

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

[`dart:io`]: {{site.api}}/flutter/dart-io/dart-io-library.html
[`File`]: {{site.api}}/flutter/dart-io/File-class.html
[`getCacheDir()`]: {{site.android-dev}}/reference/android/content/Context#getCacheDir()
[`NSCachesDirectory`]: https://developer.apple.com/documentation/foundation/nssearchpathdirectory/nscachesdirectory
[`path_provider`]: {{site.pub-pkg}}/path_provider
