# Persistent storage architecture: SQL

# 持久化存储架构：SQL

Most Flutter applications, no matter how small or big they are, might require storing data on the user’s device at some point. For example, API keys, user preferences or data that should be available offline.

大多数 Flutter 应用程序，无论大小，在某个时刻都可能需要将数据存储在用户设备上。例如 API 密钥、用户偏好，或者其他在离线时应该依然可用的数据。

In this recipe, you will learn how to integrate persistent storage for complex data using SQL in a Flutter application following the Flutter Architecture design pattern.

在这个教程中，你将会学习到如何在遵循 Flutter 架构设计模式的 Flutter 应用程序中，使用 SQL 集成持久化存储来处理复杂数据。

To learn how to store simpler key-value data, take a look at the Cookbook recipe: [Persistent storage architecture: Key-value data](https://docs.flutter.cn/app-architecture/design-patterns/key-value-data).

要学习如何存储简单的键值对数据，请查看 Cookbook 教程：[持久化存储架构：键值数据](https://docs.flutter.cn/app-architecture/design-patterns/key-value-data)。

To read this recipe, you should be familiar with SQL and SQLite. If you need help, you can read the [Persist data with SQLite](https://docs.flutter.cn/cookbook/persistence/sqlite) recipe before reading this one.

你应该先熟悉 SQL 和 SQLite，然后再阅读这个教程。如果你需要帮助，可以在阅读这个教程之前先阅读 [用 SQLite 实现数据持久化](https://docs.flutter.cn/cookbook/persistence/sqlite)。

This example uses `sqflite` with the `sqflite_common_ffi` plugin, which combined support for mobile and desktop. Support for web is provided in the experimental plugin `sqflite_common_ffi_web` but it's not included in this example.

这个示例使用 `sqflite` 和 `sqflite_common_ffi` 两个插件，能够同时支持移动端和桌面端。如果需要支持 Web ，则需要使用实验性插件 `sqflite_common_ffi_web`，但这个示例中并非包含该插件的使用方法。

## [Example application: ToDo list application](https://docs.flutter.cn/app-architecture/design-patterns/sql#example-application-todo-list-application)

## [示例应用：待办事项应用](https://docs.flutter.cn/app-architecture/design-patterns/sql#example-application-todo-list-application)

The example application consists of a single screen with an app bar at the top, a list of items, and a text field input at the bottom.

示例应用由一个屏幕组成，顶部有一个应用栏，中间是一系列内容，底部有一个文本输入框。

The body of the application contains the `TodoListScreen`. This screen contains a `ListView` of `ListTile` items, each one representing a ToDo item. At the bottom, a `TextField` allows users to create new ToDo items by writing the task description and then tapping on the “Add” `FilledButton`.

应用主体包含 `TodoListScreen` 。这个屏幕的 `ListView` 组件中包含若干个 `ListTile` 项目，每个项目代表一个待办事项。在底部，`TextField` 允许用户通过输入任务描述然后点击带有 “Add” 字样的 `FilledButton` 来创建新的待办事项。

Users can tap on the delete `IconButton` to delete the ToDo item.

用户可以点击 “删除” `IconButton` 来删除待办事项。

The list of ToDo items is stored locally using a database service, and restored when the user starts the application.

待办事项列表使用数据库服务来实现本地存储，并在用户启动应用程序时重新加载到应用中。

::: note

The full, runnable source-code for this example is available in [/examples/app-architecture/todo_data_service/](https://github.com/cfug/flutter.cn/tree/main/examples/app-architecture/todo_data_service/).

此示例的完整、可运行的源代码可在 [/examples/app-architecture/todo_data_service/](https://github.com/cfug/flutter.cn/tree/main/examples/app-architecture/todo_data_service/) 中找到。

:::

## [Storing complex data with SQL](https://docs.flutter.cn/app-architecture/design-patterns/sql#storing-complex-data-with-sql)

## [使用 SQL 存储复杂数据](https://docs.flutter.cn/app-architecture/design-patterns/sql#storing-complex-data-with-sql)

This functionality follows the recommended [Flutter Architecture design](https://docs.flutter.cn/app-architecture), containing a UI layer and a data layer. Additionally, in the domain layer you will find the data model used.

此功能遵循推荐的 [Flutter 架构设计](https://docs.flutter.cn/app-architecture)，包含一个 UI 层和一个数据层。此外，在网域层中，你将找到使用的数据模型。

- UI layer with `TodoListScreen` and `TodoListViewModel`

  含有 `TodoListScreen` 和 `TodoListViewModel` 的 UI 层

- Domain layer with `Todo` data class

  含有 `Todo` 数据类的网域层

- Data layer with `TodoRepository` and `DatabaseService`

  含有 `TodoRepository` 和 `DatabaseService` 的数据层

### [ToDo list presentation layer](https://docs.flutter.cn/app-architecture/design-patterns/sql#todo-list-presentation-layer)

### [待办事项列表展示层](https://docs.flutter.cn/app-architecture/design-patterns/sql#todo-list-presentation-layer)

The `TodoListScreen` is a Widget that contains the UI in charge of displaying and creating the ToDo items. It follows the [MVVM pattern](https://docs.flutter.cn/get-started/fundamentals/state-management#using-mvvm-for-your-applications-architecture) and is accompanied by the TodoListViewModel, which contains the list of ToDo items and three commands to load, add, and delete ToDo items.

`TodoListScreen` 是一个含有负责显示和创建待办事项的 UI 的 Widget。它遵循 [MVVM 模式](https://docs.flutter.cn/get-started/fundamentals/state-management#using-mvvm-for-your-applications-architecture)，并附带 `TodoListViewModel` ，其中包含待办事项列表以及三个用于加载、添加和删除待办事项的命令。

This screen is divided into two parts, one containing the list of ToDo items, implemented using a `ListView`, and the other is a `TextField` and a `Button`, used for creating new ToDo items.

这个界面分为两部分，一部分使用 `ListView` 实现，包含待办事项列表；另一部分是 `TextField` 和 `Button` ，用于创建新的待办事项。

The `ListView` is wrapped by a `ListenableBuilder`, which listens to changes in the `TodoListViewModel`, and shows a `ListTile` for each ToDo item.

包裹在 `ListView` 上的是 `ListenableBuilder` ，它监听 `TodoListViewModel` 发生的变化，并为每个待办事项显示一个 `ListTile` 。

```dart
ListenableBuilder(
  listenable: widget.viewModel,
  builder: (context, child) {
    return ListView.builder(
      itemCount: widget.viewModel.todos.length,
      itemBuilder: (context, index) {
        final todo = widget.viewModel.todos[index];
        return ListTile(
          title: Text(todo.task),
          trailing: IconButton(
            icon: const Icon(Icons.delete),
            onPressed: () => widget.viewModel.delete.execute(todo.id),
          ),
        );
      },
    );
  },
)
```

The list of ToDo items is defined in the `TodoListViewModel`, and loaded by the `load` command. This method calls the `TodoRepository` and fetches the list of ToDo items.

待办事项列表在 `TodoListViewModel` 中定义，并通过 `load` 命令加载。这个方法调用 `TodoRepository` 并获取待办事项列表。

```dart
List<Todo> _todos = [];

List<Todo> get todos => _todos;

Future<Result<void>> _load() async {
  try {
    final result = await _todoRepository.fetchTodos();
    switch (result) {
      case Ok<List<Todo>>():
        _todos = result.value;
        return Result.ok(null);
      case Error():
        return Result.error(result.error);
    }
  } on Exception catch (e) {
    return Result.error(e);
  } finally {
    notifyListeners();
  }
}
```

Pressing the `FilledButton`, executes the `add` command and passes in the text controller value.

按下 `FilledButton` ，执行 `add` 命令，之后应用程序会传入文本控制器的值。

```dart
FilledButton.icon(
  onPressed: () =>
      widget.viewModel.add.execute(_controller.text),
  label: const Text('Add'),
  icon: const Icon(Icons.add),
)
```

The `add` command then calls the `TodoRepository.createTodo()` method with the task description text and it creates a new ToDo item.

`add` 命令随后调用 `TodoRepository.createTodo()` 方法，并传入用户输入的任务描述文本，从而创建一个新的待办事项。

The `createTodo()` method returns the newly created ToDo, which is then added to the `_todo` list in the view model.

`createTodo()` 方法返回新创建的 ToDo，然后将其添加到视图模型中的 `_todo` 列表中。

ToDo items contain a unique identifier generated by the database. This is why the view model doesn’t create the ToDo item, but rather the `TodoRepository` does.

待办事项包含由数据库生成的唯一标识符。这就是为什么视图模型不会创建待办事项，而是由 `TodoRepository` 来创建。

```dart
Future<Result<void>> _add(String task) async {
  try {
    final result = await _todoRepository.createTodo(task);
    switch (result) {
      case Ok<Todo>():
        _todos.add(result.value);
        return Result.ok(null);
      case Error():
        return Result.error(result.error);
    }
  } on Exception catch (e) {
    return Result.error(e);
  } finally {
    notifyListeners();
  }
}
```

Finally, the `TodoListScreen` also listens to the result in the `add` command. When the action completes, the `TextEditingController` is cleared.

最后， `TodoListScreen` 还会监听 `add` 命令中的结果。当操作完成时， `TextEditingController` 被清除。

```dart
void _onAdd() {
  // Clear the text field when the add command completes.
  if (widget.viewModel.add.completed) {
    widget.viewModel.add.clearResult();
    _controller.clear();
  }
}
```

When a user taps on the `IconButton` in the `ListTile`, the delete command is executed.

当用户点击 `ListTile` 中的 `IconButton` 时，执行删除命令。

```dart
IconButton(
  icon: const Icon(Icons.delete),
  onPressed: () => widget.viewModel.delete.execute(todo.id),
)
```

Then, the view model calls the `TodoRepository.deleteTodo()` method, passing the unique ToDo item identifier. A correct result removes the ToDo item from the view model and the screen.

然后，视图模型调用 `TodoRepository.deleteTodo()` 方法，传入唯一的待办事项标识符。与之相符的结果会被程序从视图模型和屏幕中移除。

```dart
Future<Result<void>> _delete(int id) async {
  try {
    final result = await _todoRepository.deleteTodo(id);
    switch (result) {
      case Ok<void>():
        _todos.removeWhere((todo) => todo.id == id);
        return Result.ok(null);
      case Error():
        return Result.error(result.error);
    }
  } on Exception catch (e) {
    return Result.error(e);
  } finally {
    notifyListeners();
  }
}
```

### [Todo list domain layer](https://docs.flutter.cn/app-architecture/design-patterns/sql#todo-list-domain-layer)

### [待办事项网域层](https://docs.flutter.cn/app-architecture/design-patterns/sql#todo-list-domain-layer)

The domain layer of this example application contains the `Todo` item data model.

这个示例应用程序的网域层包含 `Todo` 项目数据模型。

Items are presented by an immutable data class. In this case, the application uses the `freezed` package to generate the code.

项目由不可变数据类提供。在这种情况下，应用程序应使用 `freezed` 包生成代码。

The class has two properties, an ID represented by an `int`, and a task description, represented by a `String`.

该类有两个属性，使用 `int` 表示的 ID，以及使用 `String` 表示的 任务描述。

```dart
@freezed
abstract class Todo with _$Todo {
  const factory Todo({
    /// The unique identifier of the Todo item.
    required int id,

    /// The task description of the Todo item.
    required String task,
  }) = _Todo;
}
```

### [Todo list data layer](https://docs.flutter.cn/app-architecture/design-patterns/sql#todo-list-data-layer)

### [待办事项数据层](https://docs.flutter.cn/app-architecture/design-patterns/sql#todo-list-data-layer)

The data layer of this functionality is composed of two classes, the `TodoRepository` and the `DatabaseService`.

该功能的数据层由两个类组成，即 `TodoRepository` 和 `DatabaseService`。

The `TodoRepository` acts as the source of truth for all the ToDo items. View models must use this repository to access to the ToDo list, and it should not expose any implementation details on how they are stored.

`TodoRepository` 作为所有待办事项的数据来源。视图模型必须使用此仓库来访问待办事项列表，并且它不应暴露它们存储的实现细节。

Internally, the `TodoRepository` uses the `DatabaseService`, which implements the access to the SQL database using the `sqflite` package. You can implement the same DatabaseService using other storage packages like `sqlite3`, `drift` or even cloud storage solutions like `firebase_database`.

在内部， `TodoRepository` 使用 `DatabaseService` ，它通过 `sqflite` 包实现 SQL 数据库的访问。你可以使用其他存储包，如 `sqlite3`、 `drift` ，甚至云存储解决方案，如 `firebase_database` ，来实现相同的 `DatabaseService` 。

The `TodoRepository` checks if the database is open before every request and opens it if necessary.

`TodoRepository` 在每次请求前检查数据库是否已打开，并在必要时打开它。

It implements the `fetchTodos()`, `createTodo()`, and `deleteTodo()` methods.

它实现了 `fetchTodos()`、 `createTodo()` 和 `deleteTodo()` 方法。

```dart
class TodoRepository {
  TodoRepository({required DatabaseService database}) : _database = database;

  final DatabaseService _database;

  Future<Result<List<Todo>>> fetchTodos() async {
    if (!_database.isOpen()) {
      await _database.open();
    }
    return _database.getAll();
  }

  Future<Result<Todo>> createTodo(String task) async {
    if (!_database.isOpen()) {
      await _database.open();
    }
    return _database.insert(task);
  }

  Future<Result<void>> deleteTodo(int id) async {
    if (!_database.isOpen()) {
      await _database.open();
    }
    return _database.delete(id);
  }
}
```

The `DatabaseService` implements the access to the SQLite database using the `sqflite` package.

`DatabaseService` 使用 `sqflite` 包实现了对 SQLite 数据库的访问。

It’s a good idea to define the table and column names as constants to avoid typos when writing SQL code.

在编写 SQL 代码时，建议将表名和列名定义为常量，这样可以避免拼写错误。

```dart
static const String _todoTableName = 'todo';
static const String _idColumnName = '_id';
static const String _taskColumnName = 'task';
```

The `open()` method opens the existing database, or creates a new one if it doesn’t exist.

`open()` 方法会打开现有的数据库，如果不存在，则会创建一个新的数据库。

```dart
Future<void> open() async {
  _database = await databaseFactory.openDatabase(
    join(await databaseFactory.getDatabasesPath(), 'app_database.db'),
    options: OpenDatabaseOptions(
      onCreate: (db, version) {
        return db.execute(
          'CREATE TABLE $_todoTableName($_idColumnName INTEGER PRIMARY KEY AUTOINCREMENT, $_taskColumnName TEXT)',
        );
      },
      version: 1,
    ),
  );
}
```

Note that the column `id` is set as `primary` key and `autoincrement`; this means that each newly inserted item is assigned a new value for the `id` column.

请注意，列 `id` 被设置为 `primary` key 和 `autoincrement`，这意味着每个新插入的项目都会为 `id` 列分配一个新值。

The `insert()` method creates a new ToDo item in the database, and returns a newly created Todo instance. The `id` is generated as mentioned before.

`insert()` 方法在数据库中创建一个新的 ToDo 项，并返回一个新创建的 Todo 实例。 `id` 的值则采用上面提及的方式生成。

```dart
Future<Result<Todo>> insert(String task) async {
  try {
    final id = await _database!.insert(_todoTableName, {
      _taskColumnName: task,
    });
    return Result.ok(Todo(id: id, task: task));
  } on Exception catch (e) {
    return Result.error(e);
  }
}
```

All the `DatabaseService` operations use the `Result` class to return a value, as recommended by the [Flutter architecture recommendations](https://docs.flutter.cn/app-architecture). This facilitates handling errors in further steps in the application code.

所有 `DatabaseService` 操作都使用 `Result` 类来返回值，正如 [Flutter 架构建议](https://docs.flutter.cn/app-architecture) 的那样。这有助于在应用程序代码中的后续步骤中处理错误。

The `getAll()` method performs a database query, obtaining all the values in the `id` and `task` columns. For each entry, it creates a `Todo` class instance.

`getAll()` 方法执行数据库查询，获取 `id` 和 `task` 列中的所有值。对于每一条记录，它创建一个 `Todo` 类的实例。

```dart
Future<Result<List<Todo>>> getAll() async {
  try {
    final entries = await _database!.query(
      _todoTableName,
      columns: [_idColumnName, _taskColumnName],
    );
    final list = entries
        .map(
          (element) => Todo(
            id: element[_idColumnName] as int,
            task: element[_taskColumnName] as String,
          ),
        )
        .toList();
    return Result.ok(list);
  } on Exception catch (e) {
    return Result.error(e);
  }
}
```

The `delete()` method performs a database delete operation based on the ToDo item `id`.

`delete()` 方法根据待办事项的 `id` 来执行数据库删除操作。

In this case, if no items were deleted an error is returned, indicating that something went wrong.

在这种情况下，如果没有删除任何项目，将返回一个错误，它表示哪里出了问题。

```dart
Future<Result<void>> delete(int id) async {
  try {
    final rowsDeleted = await _database!.delete(
      _todoTableName,
      where: '$_idColumnName = ?',
      whereArgs: [id],
    );
    if (rowsDeleted == 0) {
      return Result.error(Exception('No todo found with id $id'));
    }
    return Result.ok(null);
  } on Exception catch (e) {
    return Result.error(e);
  }
}
```

:::note

In some cases, you might want to close the database when you are done with it. For example, when the user leaves the screen, or after a certain time has passed.

在某些情况下，你可能希望在完成数据库操作后关闭它。例如，当用户离开屏幕，或经过一定时间后。

This depends on the database implementation as well as your application requirements. It’s recommended that you check with the database package authors for recommendations.

这取决于数据库实现以及你的应用程序需求。建议你咨询数据库包的作者以获取建议。

:::

## [Putting it all together](https://docs.flutter.cn/app-architecture/design-patterns/sql#putting-it-all-together)

## [将所有内容整合在一起](https://docs.flutter.cn/app-architecture/design-patterns/sql#putting-it-all-together)

In the `main()` method of your application, first initialize the `DatabaseService`, which requires different initialization code on different platforms. Then, pass the newly created `DatabaseService` into the `TodoRepository` which is itself passed into the `MainApp` as a constructor argument dependency.

在你的应用程序的 `main()` 方法中，首先初始化 `DatabaseService` ，这需要在不同的平台上使用不同的初始化代码。然后，将新创建的 `DatabaseService` 传递给 `TodoRepository` ，而 `TodoRepository` 本身作为构造函数参数的依赖被传递给 `MainApp` 。

```dart
void main() {
  late DatabaseService databaseService;
  if (kIsWeb) {
    throw UnsupportedError('Platform not supported');
  } else if (Platform.isLinux || Platform.isWindows || Platform.isMacOS) {
    // Initialize FFI SQLite
    sqfliteFfiInit();
    databaseService = DatabaseService(databaseFactory: databaseFactoryFfi);
  } else {
    // Use default native SQLite
    databaseService = DatabaseService(databaseFactory: databaseFactory);
  }

  runApp(
    MainApp(
      // ···
      todoRepository: TodoRepository(database: databaseService),
    ),
  );
}
```

Then, when the `TodoListScreen` is created, also create the `TodoListViewModel` and pass the TodoRepository to it as dependency.

然后，在创建 `TodoListScreen` 时，也创建 `TodoListViewModel` ，并将其作为依赖项传递给它。

```dart
TodoListScreen(
  viewModel: TodoListViewModel(todoRepository: widget.todoRepository),
)
```
