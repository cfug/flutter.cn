---
title: Persist data with SQLite
title: 用 SQLite 做数据持久化
description: How to use SQLite to store and retrieve data.
description: 如何使用 SQLite 做数据持久化。
prev:
  title: Work with WebSockets
  title: 发起 WebSockets 请求
  path: /docs/cookbook/networking/web-sockets
next:
  title: Read and write files
  title: 文件读写
  path: /docs/cookbook/persistence/reading-writing-files
---

If writing an app that needs to persist and query larger amounts of data on
the local device, consider using a database instead of a local file or
key-value store. In general, databases provide faster inserts, updates,
and queries, compared to other local persistence solutions.

如果您正在编写一个需要持久化且查询大量本地设备数据的 app，
可考虑采用数据库，而不是本地文件夹或关键值库。
总的来说，相比于其他本地持久化方案来说，数据库能够提供更为迅速的插入、更新、查询功能。

Flutter apps can make use of the SQLite databases via the
[`sqflite`][] plugin available on pub.
This recipe demonstrates the basics of using `sqflite`
to insert, read, update, and remove data about various Dogs.

Flutter应用程序中可以通过 [`sqflite`][] package
来使用 SQLite 数据库。
本文将通过使用 `sqflite` 来演示插入，读取，更新，删除各种狗狗的数据。

If you are new to SQLite and SQL statements, review the
[SQLite Tutorial][] to learn the basics before
completing this recipe.

如果你对于 SQLite 和 SQL 的各种语句还不熟悉，请查看 SQLite 官方的教程
[SQLite 教程](http://www.sqlitetutorial.net/)，
在查看本文之前需要掌握基本的SQL语句。

This recipe uses the following steps:

步骤：

1. 添加依赖
1. 定义 `Dog（狗）` 数据模型；
1. 打开数据库；
1. 创建 `dogs` 数据表；
1. 将一条 `Dog` 数据插入数据库；
1. 查询所有狗狗的数据；
1. 更新（修改）一条 `Dog` 的数据；
1. 删除一条 `Dog` 的数据。

## 1. Add the dependencies

## 1. 添加依赖

To work with SQLite databases, import the `sqflite` and `path` packages. 

为了使用 SQLite 数据库，首先需要导入 `sqflite` 和 `path` 这两个 package。

  * The `sqflite` package provides classes and functions to
    interact with a SQLite database. 
    
    `sqflite` 提供了丰富的类和方法，以便你能便捷实用 SQLite 数据库。
    
  * The `path` package provides functions to
    define the location for storing the database on disk.
    
    `path` 提供了大量方法，以便你能正确的定义数据库在磁盘上的存储位置。

```yaml
dependencies:
  flutter:
    sdk: flutter
  sqflite:
  path:
```

Make sure to import the packages in the file you'll be working in.

确保你已将 packages 导入要使用的文件中。

<!-- skip -->
```dart
import 'dart:async';

import 'package:path/path.dart';
import 'package:sqflite/sqflite.dart';
```

## 2. Define the Dog data model

## 2. 定义狗狗的数据模型

Before creating the table to store information on Dogs, take a few moments to
define the data that needs to be stored. For this example, define a Dog class
that contains three pieces of data:
A unique `id`, the `name`, and the `age` of each dog.

在你准备在新建的表里存储狗狗们的信息的的时候，你需要先定义这些数据。
例如，定义一个狗类时，每一条狗狗的数据将包含三个字段：
一个唯一的 `id` ；名字 `name` ；年龄 `age`。

<!-- skip -->
```dart
class Dog {
  final int id;
  final String name;
  final int age;

  Dog({this.id, this.name, this.age});
}
```

## 3. Open the database

## 3. 打开数据库

Before reading and writing data to the database, open a connection 
to the database. This involves two steps:

在你准备读写数据库的数据之前，你要先打开这个数据库。
打开一个数据库有以下两个步骤：

  1. Define the path to the database file using `getDatabasesPath()` from the
  `sqflite` package, combined with the `join` function from the `path` package.
  
     使用 `sqflite` package 里的 `getDatabasesPath` 方法并配合 `path` package里的
     `join` 方法定义数据库的路径。
     
  2. Open the database with the `openDatabase()` function from `sqflite`.
  
  	 使用 `sqflite` package 里的 `openDatabase` 方法打开数据库。

Note: In order to use the keyword `await`, the code must be placed
inside an `async` function.

<!-- skip -->
```dart
// Open the database and store the reference.
final Future<Database> database = openDatabase(
  // Set the path to the database. Note: Using the `join` function from the
  // `path` package is best practice to ensure the path is correctly
  // constructed for each platform.
  join(await getDatabasesPath(), 'doggie_database.db'),
);
```

## 4. Create the `dogs` table

## 4. 创建 `dogs` 表

Next, create a table to store information about various Dogs.
For this example, create a table called `dogs` that defines the data
that can be stored. Each `Dog` contains an `id`, `name`, and `age`.
Therefore, these are represented as three columns in the `dogs` table.

接下来，你需要创建一个表用以存储各种狗狗的信息。
在这个示例中，创建一个名为 `dogs` 数据库表，它定义了可以被存储的数据。
这样，每条 `Dog` 数据就包含了一个 `id`， `name` 和 `age`。
因此，在 `dogs` 数据库表中将有三列，分别是 `id`， `name` 和 `age`。


  1. The `id` is a Dart `int`, and is stored as an `INTEGER` SQLite
     Datatype. It is also good practice to use an `id` as the primary
     key for the table to improve query and update times.
     
     `id` 是 Dart 的 `int` 类型，在数据表中是 SQLite 的 `INTEGER` 数据类型。
     最佳实践是将 `id` 作为数据库表的主键，用以改善查询和修改的时间。
     
  2. The `name` is a Dart `String`, and is stored as a `TEXT` SQLite
     Datatype.
     
     `name` 是Dart的 `String`类型，在数据表中是SQLite的 `TEXT` 数据类型。
     
  3. The `age` is also a Dart `int`, and is stored as an `INTEGER`
     Datatype.
     
     `age` 也是Dart的 `int` 类型，在数据表中是SQLite的 `INTEGER` 数据类型。

For more information about the available Datatypes that can be stored in a
SQLite database, see the [official SQLite Datatypes documentation][].

关于 SQLite 数据库能够存储的更多的数据类型信息请查阅官方的
[SQLite Datatypes 文档](https://www.sqlite.org/datatype3.html)。

<!-- skip -->
```dart
final Future<Database> database = openDatabase(
  // Set the path to the database.
  join(await getDatabasesPath(), 'doggie_database.db'),
  // When the database is first created, create a table to store dogs.
  onCreate: (db, version) {
    // Run the CREATE TABLE statement on the database.
    return db.execute(
      "CREATE TABLE dogs(id INTEGER PRIMARY KEY, name TEXT, age INTEGER)",
    );
  },
  // Set the version. This executes the onCreate function and provides a
  // path to perform database upgrades and downgrades.
  version: 1,
);
```

## 5. Insert a Dog into the database

## 5. 插入一条狗狗的数据

Now that you have a database with a table suitable for storing information 
about various dogs, it's time to read and write data.

现在你已经准备好了一个数据库用于存储各种狗狗的信息数据，现在开始读写数据咯。

First, insert a `Dog` into the `dogs` table. This involves two steps:

首先，在 `dogs` 数据表中插入一条 `Dog` 数据。分以下两步：

1. Convert the `Dog` into a `Map`
  
   把 `Dog` 转换成一个 `Map` 数据类型；
     
2. Use the [`insert()`][] method to store the
   `Map` in the `dogs` table.
  
   使用 [`insert()`][] 方法把 `Map` 保存到 `dogs` 数据表中。

<!-- skip -->
```dart
// Update the Dog class to include a `toMap` method.
class Dog {
  final int id;
  final String name;
  final int age;

  Dog({this.id, this.name, this.age});

  // Convert a Dog into a Map. The keys must correspond to the names of the
  // columns in the database.
  Map<String, dynamic> toMap() {
    return {
      'id': id,
      'name': name,
      'age': age,
    };
  }
}

// Define a function that inserts dogs into the database
Future<void> insertDog(Dog dog) async {
  // Get a reference to the database.
  final Database db = await database;

  // Insert the Dog into the correct table. You might also specify the
  // `conflictAlgorithm` to use in case the same dog is inserted twice.
  //
  // In this case, replace any previous data.
  await db.insert(
    'dogs',
    dog.toMap(),
    conflictAlgorithm: ConflictAlgorithm.replace,
  );
}

// Create a Dog and add it to the dogs table.
final fido = Dog(
  id: 0,
  name: 'Fido',
  age: 35,
);

await insertDog(fido);
```

## 6. Retrieve the list of Dogs

## 6. 查询狗狗列表

Now that a `Dog` is stored in the database, query the database
for a specific dog or a list of all dogs. This involves two steps:

现在已经有了一条 `Dog` 存储在数据库里。
你可以通过查询数据库，检索到一只狗狗的数据或者所有狗狗的数据。分为以下两步:

  1. Run a `query` against the `dogs` table. This returns a `List<Map>`.
  
     调用 `dogs` 表对像的 `query` 方法。这将返回一个`List <Map>`。
     
  2. Convert the `List<Map>` into a `List<Dog>`.
  
     将 `List<Map>` 转换成 `List<Dog>` 数据类型。

<!-- skip -->
```dart
// A method that retrieves all the dogs from the dogs table.
Future<List<Dog>> dogs() async {
  // Get a reference to the database.
  final Database db = await database;

  // Query the table for all The Dogs.
  final List<Map<String, dynamic>> maps = await db.query('dogs');

  // Convert the List<Map<String, dynamic> into a List<Dog>.
  return List.generate(maps.length, (i) {
    return Dog(
      id: maps[i]['id'],
      name: maps[i]['name'],
      age: maps[i]['age'],
    );
  });
}

// Now, use the method above to retrieve all the dogs.
print(await dogs()); // Prints a list that include Fido.
```

## 7. Update a `Dog` in the database

## 7. 修改一条 `Dog` 数据

After inserting information into the database,
you might want to update that information at a later time.
You can do this by using the [`update()`][]
method from the `sqflite` library.

使用 `sqflite` package 中的 [`update()`][]方法，
可以对已经插入到数据库中的数据进行修改（更新）。

This involves two steps:

修改数据操作包含以下两步：

  1. Convert the Dog into a Map.
  
     将一条狗狗的数据转换成 `Map` 数据类型；
  
  2. Use a `where` clause to ensure you update the correct Dog.
     
     使用  `where` 语句定位到具体将要被修改的数据。

<!-- skip -->
```dart
Future<void> updateDog(Dog dog) async {
  // Get a reference to the database.
  final db = await database;

  // Update the given Dog.
  await db.update(
    'dogs',
    dog.toMap(),
    // Ensure that the Dog has a matching id.
    where: "id = ?",
    // Pass the Dog's id as a whereArg to prevent SQL injection.
    whereArgs: [dog.id],
  );
}

// Update Fido's age.
await updateDog(Dog(
  id: 0,
  name: 'Fido',
  age: 42,
));

// Print the updated results.
print(await dogs()); // Prints Fido with age 42.
```

{{site.alert.warning}}

  Always use `whereArgs` to pass arguments to a `where` statement.
  This helps safeguard against SQL injection attacks.

  使用 `whereArgs` 将参数传递给 `where` 语句。有助于防止 SQL 注入攻击。

  Do not use string interpolation, such as `where: "id = ${dog.id}"`!
  
  这里不要使用字符串模板，比如： `where: "id = ${dog.id}"`！
  
{{site.alert.end}}

## 8. Delete a `Dog` from the database

## 8. 删除一条 `Dog` 的数据

In addition to inserting and updating information about Dogs,
you can also remove dogs from the database. To delete data,
use the [`delete()`][] method from the `sqflite` library.

除了插入和修改狗狗们的数据，你还可以从数据库中删除狗狗的数据。
删除数据用到了 `sqflite` package 中的 [`delete()`][] 方法。

In this section, create a function that takes an id and deletes the dog with
a matching id from the database. To make this work, you must provide a `where`
clause to limit the records being deleted.

在这一小节，新建一个方法用来接收一个 id 并且删除数据库中与这个 id 匹配的那一条数据。
为了达到这个目的，你必须使用 `where` 语句限定哪一条才是被删除的数据。

<!-- skip -->
```dart
Future<void> deleteDog(int id) async {
  // Get a reference to the database (获得数据库引用)
  final db = await database;

  // Remove the Dog from the Database.
  await db.delete(
    'dogs',
    // Use a `where` clause to delete a specific dog (使用 `where` 语句删除指定的狗狗).
    where: "id = ?",
    // Pass the Dog's id as a whereArg to prevent SQL injection (通过 `whereArg` 将狗狗的 id 传递给 `delete` 方法，以防止 SQL 注入)
    whereArgs: [id],
  );
}
```

## Example

## 示例

To run the example:

运行示例需要以下几步：

1. Create a new Flutter project.
   
   创建一个新的 Flutter 工程；
  	 
2. Add the `sqflite` and `path` packages to your `pubspec.yaml`.
   
   将 `sqflite` 和 `path` 包添加到 `pubspec.yaml` 文件里；
  
3. Paste the following code into a new file called `lib/db_test.dart`.
  
   将以下代码粘贴在 `lib/db_test.dart` 文件里（若无则新建，若有则覆盖）；
  
4. Run the code with `flutter run lib/db_test.dart`.
  
   运行 `flutter run lib/db_test.dart`。

```dart
import 'dart:async';

import 'package:flutter/widgets.dart';

import 'package:path/path.dart';
import 'package:sqflite/sqflite.dart';

void main() async {
  // Avoid errors caused by flutter upgrade.
  // Importing 'package:flutter/widgets.dart' is required.
  WidgetsFlutterBinding.ensureInitialized();
  final database = openDatabase(
    // Set the path to the database. Note: Using the `join` function from the
    // `path` package is best practice to ensure the path is correctly
    // constructed for each platform.
    // 设置数据库的路径。注意：使用 `path` 包中的 `join` 方法是
    // 确保在多平台上路径都正确的最佳实践。
    join(await getDatabasesPath(), 'doggie_database.db'),
    // When the database is first created, create a table to store dogs.
    // 当数据库第一次被创建的时候，创建一个数据表，用以存储狗狗们的数据。
    onCreate: (db, version) {
      return db.execute(
        "CREATE TABLE dogs(id INTEGER PRIMARY KEY, name TEXT, age INTEGER)",
      );
    },
    // Set the version. This executes the onCreate function and provides a
    // path to perform database upgrades and downgrades.
    // 设置版本。 它将执行 onCreate 方法，同时提供数据库升级和降级的路径。
    version: 1,
  );
  Future<void> insertDog(Dog dog) async {
    // Get a reference to the database (获得数据库引用)
    final Database db = await database;
    // Insert the Dog into the correct table. Also specify the
    // `conflictAlgorithm`. In this case, if the same dog is inserted
    // multiple times, it replaces the previous data.
    // 在正确的数据表里插入狗狗的数据。 我们也要在这个操作中指定 `conflictAlgorithm` 策略。
    // 如果同样的狗狗数据被多次插入，后一次插入的数据将会覆盖之前的数据。
    await db.insert(
      'dogs',
      dog.toMap(),
      conflictAlgorithm: ConflictAlgorithm.replace,
    );
  }

  Future<List<Dog>> dogs() async {
    // Get a reference to the database (获得数据库引用)
    final Database db = await database;
    // Query the table for all The Dogs (查询数据表，获取所有的狗狗们)
    final List<Map<String, dynamic>> maps = await db.query('dogs');
    // Convert the List<Map<String, dynamic> into a List<Dog> (将 List<Map<String, dynamic> 转换成 List<Dog> 数据类型)
    return List.generate(maps.length, (i) {
      return Dog(
        id: maps[i]['id'],
        name: maps[i]['name'],
        age: maps[i]['age'],
      );
    });
  }

  Future<void> updateDog(Dog dog) async {
    // Get a reference to the database (获得数据库引用)
    final db = await database;
    // Update the given Dog (修改给定的狗狗的数据)
    await db.update(
      'dogs',
      dog.toMap(),
      // Ensure that the Dog has a matching id (确定给定的狗狗id是否匹配)
      where: "id = ?",
      // Pass the Dog's id as a whereArg to prevent SQL injection (通过 whereArg 传递狗狗的 id 可以防止 SQL 注入)
      whereArgs: [dog.id],
    );
  }

  Future<void> deleteDog(int id) async {
    // Get a reference to the database (获得数据库引用)
    final db = await database;
    // Remove the Dog from the database (将狗狗从数据库移除)
    await db.delete(
      'dogs',
      // Use a `where` clause to delete a specific dog (使用 `where` 语句删除指定的狗狗)
      where: "id = ?",
      // Pass the Dog's id as a whereArg to prevent SQL injection (通过 `whereArg` 将狗狗的 id 传递给 `delete` 方法，以防止 SQL 注入)
      whereArgs: [id],
    );
  }

  var fido = Dog(
    id: 0,
    name: 'Fido',
    age: 35,
  );
  // Insert a dog into the database (在数据库插入一条狗狗的数据)
  await insertDog(fido);
  // Print the list of dogs (only Fido for now) [打印一个列表的狗狗们 (现在列表里只有一只叫 Fido 的狗狗)]
  print(await dogs());
  // Update Fido's age and save it to the database (修改数据库中 Fido 的 年龄并且保存)
  fido = Dog(
    id: fido.id,
    name: fido.name,
    age: fido.age + 7,
  );
  await updateDog(fido);
  // Print Fido's updated information (打印 Fido 的修改后的信息)
  print(await dogs());
  // Delete Fido from the database (从数据库中删除 Fido)
  await deleteDog(fido.id);
  // Print the list of dogs (empty) [打印一个列表的狗狗们 (这里已经空了)]
  print(await dogs());
}

class Dog {
  final int id;
  final String name;
  final int age;
  Dog({this.id, this.name, this.age});
  Map<String, dynamic> toMap() {
    return {
      'id': id,
      'name': name,
      'age': age,
    };
  }

  // Implement toString to make it easier to see information about
  // each dog when using the print statement.
  // 重写 toString 方法，以便使用 print 方法查看每个狗狗信息的时候能更清晰。
  @override
  String toString() {
    return 'Dog{id: $id, name: $name, age: $age}';
  }
}
```


[`delete()`]: {{site.pub-api}}/sqflite/latest/sqlite_api/DatabaseExecutor/delete.html'
[`insert()`]: {{site.pub-api}}/sqflite/latest/sqlite_api/DatabaseExecutor/insert.html
[`sqflite`]: {{site.pub-pkg}}/sqflite
[SQLite Tutorial]: http://www.sqlitetutorial.net/
[official SQLite Datatypes documentation]: https://www.sqlite.org/datatype3.html
[`update()`]: {{site.pub-api}}/sqflite/latest/sqlite_api/DatabaseExecutor/update.html
