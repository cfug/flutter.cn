---
title: JSON and serialization
title: JSON 和序列化数据
description: How to use JSON with Flutter.
description: 如何在 Flutter 里使用 JSON。
---

It is hard to think of a mobile app that doesn't need to communicate with a
web server or easily store structured data at some point. When making
network-connected apps, the chances are that it needs to consume some good old
JSON, sooner or later.

很难想象一个移动应用会不需要与 web 服务器通信或者在某些时候轻松地存储结构化数据。
当创造需要网络连接的应用时，它可能迟早会处理一些旧的 JSON。

This guide looks into ways of using JSON with Flutter. 
It covers which JSON solution to use in different scenarios, and why.

本指南介绍了如何在 Flutter 中使用 JSON，
包括了如何在不同场景中使用相应的 JSON 解决方案以及为什么要这么做。

{{site.alert.info}}

  **Terminology:** _Encoding_ and _serialization_ are the same
  thing&mdash;turning a data structure into a string.
  _Decoding_ and _deserialization_ are the
  opposite process&mdash;turning a string into a data structure.
  However, _serialization_ also commonly refers to the entire process of
  translating data structures to and from a more easily readable format.

  **术语：** **编码** 和 **序列化数据** 是一回事 - 将数据结构转换为字符串。
  **解码** 和 **反序列化数据** 则是相反的过程 - 将字符串转换为数据结构。
  然而，**序列化数据** 通常也指将数据结构转换为更加易读的数据格式的整个过程。

  To avoid confusion, this doc uses "serialization" when referring to the
  overall process, and "encoding" and "decoding" when specifically
  referring to those processes.

  为了避免混淆，本文档在涉及到整个过程时使用“序列化数据”，
  在特指这些过程时使用“编码”和“解码”。
{{site.alert.end}}

## Which JSON serialization method is right for me?

## 我需要哪一种 JSON 序列化数据方法？

This article covers two general strategies for working with JSON:

本文涵盖了两种常规的 JSON 使用策略：

* Manual serialization

  手动序列化数据

* Automated serialization using code generation

  利用代码生成进行自动序列化数据

Different projects come with different complexities and use cases. 
For smaller proof-of-concept projects or quick prototypes, 
using code generators might be overkill. 
For apps with several JSON models with more complexity, 
encoding by hand can quickly become tedious, repetitive, 
and lend itself to many small errors.

不同的项目复杂度不同，用例也不一样。对于较小的概念验证项目或者快速原型，
使用代码生成器可能是过度的。对于具有很多更加复杂的 JSON 模型的 App，
手动编码可能很快变得无聊，重复并且发生很多小错误。

### Use manual serialization for smaller projects

### 为较小的项目使用手动序列化数据

Manual JSON decoding refers to using the built-in JSON decoder in
`dart:convert`. It involves passing the raw JSON string to the `jsonDecode()`
function, and then looking up the values you need in the resulting
`Map<String, dynamic>`.
It has no external dependencies or particular setup process,
and it's good for a quick proof of concept.

手动 JSON 解码是指在 `dart:convert` 中使用内置的 JSON 解码器。
它包括将原始 JSON 字符串传递给 `jsonDecode()` 方法，
然后在产生的 `Map<String, dynamic>` 计算结果中寻找你需要的值。
它没有外部依赖或者特定的设置过程，这有利于快速证明概念。

Manual decoding does not perform well when your project becomes bigger.
Writing decoding logic by hand can become hard to manage and error-prone.
If you have a typo when accessing a nonexistent JSON
field, your code throws an error during runtime.

当你的项目变大时，手动解码表现得并不理想。
手动编写解码逻辑会变得难以管理并容易出错。
如果你产生了笔误去获取一个不存在的 JSON 字段，
你的代码会在运行时抛出一个错误。

If you do not have many JSON models in your project and are looking to test a concept quickly, 
manual serialization might be the way you want to start.
For an example of manual encoding, see
[Serializing JSON manually using dart:convert][].

如果你的项目没有很多的 JSON 模型并且你正在寻找一个快速测试概念的方法，
手动序列化数据可能是你要的开始的方式。关于手动编码的示例，
请参阅 [使用 dart:convert 手动序列化 JSON 数据](#manual-encoding)。

### Use code generation for medium to large projects

### 为中大型项目使用代码生成

JSON serialization with code generation means having an external library
generate the encoding boilerplate for you. After some initial setup,
you run a file watcher that generates the code from your model classes.
For example, [`json_serializable`][] and [`built_value`][] are these
kinds of libraries.

利用代码生成的 JSON 序列化数据意味着有外部的库为你生成编码模板。
在一些初始化设置后，你可以运行文件监听程序来从你的模型类生成代码。
例如，[json_serializable]({{site.pub}}/packages/json_serializable) 和
[built_value]({{site.pub}}/packages/built_value) 就是这类的库。

This approach scales well for a larger project. No hand-written
boilerplate is needed, and typos when accessing JSON fields are caught at
compile-time. The downside with code generation is that it requires some
initial setup. Also, the generated source files might produce visual clutter
in your project navigator.

这种方法适用于大型项目。不需要手动编写模板，
当试图去获取不存在的 JSON 字段时的笔误会在编译阶段被发现。
代码生成的缺点是它需要一些初始化设置。
并且，生成的源文件可能在你的项目导航中产生一些视觉上的混乱。

You might want to use generated code for JSON serialization when you have a
medium or a larger project. To see an example of code generation based JSON
encoding, see [Serializing JSON using code generation libraries][].

当你有一个中大型项目时，你可能想要使用生成的代码来进行 JSON 序列化。
要看基于代码生成的 JSON 编码，见
[使用代码生成库序列化 JSON 数据](#code-generation)。

## Is there a GSON/<wbr>Jackson/<wbr>Moshi equivalent in Flutter?

## Flutter 中是否有 GSON/Jackson/Moshi 的等价物

The simple answer is no.

简单来说是没有。

Such a library would require using runtime [reflection][], which is disabled in
Flutter. Runtime reflection interferes with [tree shaking][], which Dart has
supported for quite a long time. With tree shaking, you can "shake off" unused
code from your release builds. This optimizes the app's size significantly.

这样的库需要使用运行时 [反射][]，这在 Flutter 中是被禁用的。
运行时反射会影响被 Dart 支持了相当久的 [tree shaking][]。
通过 tree shaking，你可以从你的发布版本中“抖掉”不需要使用的代码。
这会显著优化 App 的体积。

Since reflection makes all code implicitly used by default, it makes tree
shaking difficult. The tools cannot know what parts are unused at runtime, so
the redundant code is hard to strip away. App sizes cannot be easily optimized
when using reflection.

由于反射会默认让所有的代码被隐式使用，这让 tree shaking 变得困难。
工具不知道哪一部分在运行时不会被用到，所以冗余的代码很难被清除。
当使用反射时，App 的体积不能被轻易优化。

{{site.alert.info}}

  **What about dartson?** The [dartson][] library uses runtime
  [reflection][], which makes it incompatible with Flutter.

  **dartson 怎么样？**
  [dartson][dartson] 是一个使用运行时
  [反射][reflection] 的库，这让它不能兼容 Flutter。
{{site.alert.end}}

Although you cannot use runtime reflection with Flutter, some libraries give
you similarly easy-to-use APIs but are based on code generation instead. This
approach is covered in more detail in the 
[code generation libraries][] section.

尽管你不能在 Flutter 中使用运行时反射，
还是有一些库提供了基于代码生成的方便使用的 API，
这个方法的更多细节在 [代码生成库](#code-generation) 部分。

<a name="manual-encoding"></a>
## Serializing JSON manually using dart:convert

## 使用 dart:convert 手动序列化 JSON 数据

Basic JSON serialization in Flutter is very simple. Flutter has a built-in
`dart:convert` library that includes a straightforward JSON encoder and
decoder.

在 Flutter 中基础的序列化 JSON 十分容易的。
Flutter 有一个内置的 `dart:convert` 的库，
这个库包含了一个简单的 JSON 编码器和解码器。

The following sample JSON implements a simple user model.

下面的样例实现了一个简单用户模型。

```json
{
  "name": "John Smith",
  "email": "john@example.com"
}
```

With `dart:convert`,
you can serialize this JSON model in two ways.

通过 `dart:convert`，你可以用两种方法编码这个 JSON 模型。 

### Serializing JSON inline

### 内联序列化 JSON 数据

By looking at the [`dart:convert`][] documentation,
you'll see that you can decode the JSON by calling the
`jsonDecode()` function, with the JSON string as the method argument.

通过查阅 [dart:convert][] 文档，
你会看到你可以将 JSON 字符串作为方法的参数来调用
`jsonDecode()` 方法来解码 JSON。

<!-- skip -->
```dart
Map<String, dynamic> user = jsonDecode(jsonString);

print('Howdy, ${user['name']}!');
print('We sent the verification link to ${user['email']}.');
```

Unfortunately, `jsonDecode()` returns a `Map<String, dynamic>`, meaning
that you do not know the types of the values until runtime. With this approach,
you lose most of the statically typed language features: type safety,
autocompletion and most importantly, compile-time exceptions. Your code will
become instantly more error-prone.

不幸的是，`jsonDecode()` 返回一个 `Map<String, dynamic>`，
这意味着你在运行时以前都不知道值的类型。
使用这个方法，你失去了大部分的静态类型语言特性：
类型安全，自动补全以及最重要的编译时异常。
你的代码会立即变得更加容易出错。

For example, whenever you access the `name` or `email` fields, you could quickly
introduce a typo. A typo that the compiler doesn't know about since the
JSON lives in a map structure.

例如，当你获取 `name` 或者 `email` 字段，你可能很快引入一个笔误。
然而编译器却无法知道 map 中有 JSON 笔误，编译器并不知道这个笔误。

### Serializing JSON inside model classes

### 在模型类中序列化 JSON 数据

Combat the previously mentioned problems by introducing a plain model
class, called `User` in this example. Inside the `User` class, you'll find:

通过引入简单的模型类来解决上面提到的问题，
在这个例子中叫做 `User`。在 `User` 类中，你会发现：

* A `User.fromJson()` constructor, for constructing a new `User` instance from a
  map structure.

  一个 `User.fromJson()` 构造函数，用于从 map 结构中构造一个新的 `User` 实例

* A `toJson()` method, which converts a `User` instance into a map.

  一个 `toJson()` 方法，这个方法会将 `User` 实例转换为一个 map

With this approach, the _calling code_ can have type safety,
autocompletion for the `name` and `email` fields, and compile-time exceptions.
If you make typos or treat the fields as `int`s instead of `String`s,
the app won't compile, instead of crashing at runtime.

通过这种方法，_调用代码_ 可以拥有类型安全，
`name` 和 `email` 字段的自动完成以及编译时异常（检测）。
如果你发生了笔误或者把 `String` 类型的字段看成了 `int` 类型，
app 将不会编译，而不是在运行时崩溃。

**user.dart**

<!-- skip -->
```dart
class User {
  final String name;
  final String email;

  User(this.name, this.email);

  User.fromJson(Map<String, dynamic> json)
      : name = json['name'],
        email = json['email'];

  Map<String, dynamic> toJson() =>
    {
      'name': name,
      'email': email,
    };
}
```

The responsibility of the decoding logic is now moved inside the model
itself. With this new approach, you can decode a user easily.

解码逻辑的责任现在移动到了模型内部。
通过这个新方法，你可以很容易地解码一个 user。

<!-- skip -->
```dart
Map userMap = jsonDecode(jsonString);
var user = User.fromJson(userMap);

print('Howdy, ${user.name}!');
print('We sent the verification link to ${user.email}.');
```

To encode a user, pass the `User` object to the `jsonEncode()` function.
You don't need to call the `toJson()` method, since `jsonEncode()`
already does it for you.

要编码 user，将 `User` 对象传到 `jsonEncode()` 函数中。
你不需要调用 `toJson()` 方法，因为 `jsonEncode()` 已经帮你做了这件事。

<!-- skip -->
```dart
String json = jsonEncode(user);
```

With this approach, the calling code doesn't have to worry about JSON
serialization at all. However, the model class still definitely has to.
In a production app, you would want to ensure that the serialization
works properly. In practice, the `User.fromJson()` and `User.toJson()`
methods both need to have unit tests in place to verify correct behavior.

通过这种方法，被调用的代码根本不需要担心序列化 JSON 数据的问题。
然而，模型类仍然是必须的。在一个生产环境下的 App，
你可能希望确保序列化数据能正确奏效。
在实践中，`User.fromJson()` 和
`User.toJson()` 方法都需要单元测试以便验证正确的行为。

{{site.alert.info}}

  The cookbook contains [a more comprehensive worked example of using
  JSON model classes][json background parsing], using an isolate to parse
  the JSON file on a background thread. This approach is ideal if you
  need your app to remain responsive while the JSON file is being
  decoded.

  这篇 cookbook 包含了[更加全面的使用 JSON model 类的实用样例][json background parsing]，
  它将使用 isolate 在后台线程解析 JSON 文件。若你在解析 JSON 文件的同时需要应用保持响应，这是理想的解决方案。

{{site.alert.end}}

However, real-world scenarios are not usually that simple.
Sometimes JSON API responses are more complex, for example since they 
contain nested JSON objects that must be parsed through their own model
class.

然而，现实场景通常不是那么简单，
有时候响应的 JSON API 会更加复杂，
例如它可能会包含一些相邻的 JSON 对象，
而这些对象同样需要使用它的 model 类进行解析。

It would be nice if there were something that handled the JSON encoding
and decoding for you.  Luckily, there is!

如果有一些东西可以帮你处理 JSON 编码和解码就好了。
幸运的是，已经有了！

<a name="code-generation"></a>
## Serializing JSON using code generation libraries

## 使用代码生成库序列化 JSON 数据

Although there are other libraries available, this guide uses
[`json_serializable`][], an automated source code generator that
generates the JSON serialization boilerplate for you.

尽管有其它库可以使用，本指南使用了[`json_serializable`][]，
一个自动化源代码生成器来为你生成 JSON 序列化数据模板。

{{site.alert.info}}

  **Choosing a library:**
  You might have noticed two [Flutter Favorite][] packages
  on pub.dev that generate JSON serialization code,
  [`json_serializable`][] and [`built_value`][].
  How do you choose between these packages?
  The `json_serializable` package allows you to make regular
  classes serializable by using annotations, 
  whereas the `built_value` package provides a higher-level way
  of defining immutable value classes that can also be
  serialized to JSON.

  **选择一个 library**
  你也许已经发现了，在 pub.dev 上有两个用于生成 JSON 序列化代码的 package，
  [Flutter Favorite][] 以及 [`json_serializable`][] & [`built_value`][]。
  那么你该如何在这些 packages 之间进行选择呢？
  `json_serializable` package 能够通过注解让你的普通类序列化，
  而 `built_value` package 则提供了更高层次的方法，
  让定义为无变化的类也能够被序列化为 JSON。
  
{{site.alert.end}}

Since the serialization code is not handwritten or maintained manually
anymore, you minimize the risk of having JSON serialization exceptions at
runtime.

由于序列化数据代码不再需要手动编写或者维护，
你可以将序列化 JSON 数据在运行时的异常风险降到最低。

### Setting up json_serializable in a project

### 在项目中设置 json_serializable

To include `json_serializable` in your project, you need one regular
dependency, and two _dev dependencies_. In short, _dev dependencies_
are dependencies that are not included in our app source code&mdash;they
are only used in the development environment.

要在你的项目中包含 `json_serializable`，你需要一个常规依赖，
以及两个 **dev 依赖**。简单来说，**dev 依赖**
是不包括在我们的 App 源代码中的依赖 - 它们只会被用在开发环境中。

The latest versions of these required dependencies can be seen by
following the [pubspec file][] in the JSON serializable example.

在序列化 JSON 数据的例子中，
这些必须的依赖的最新版本可以在下面 [pubspec 文件][the pubspec file] 中查看。

**pubspec.yaml**

```yaml
dependencies:
  # Your other regular dependencies here
  json_annotation: <latest_version>

dev_dependencies:
  # Your other dev_dependencies here
  build_runner: <latest_version>
  json_serializable: <latest_version>
```

Run `flutter pub get` inside your project root folder
(or click **Packages get** in your editor)
to make these new dependencies available in your project.

在你的项目根文件夹下运行 `flutter pub get`
（或者在你的编辑器中点击 **Packages Get**）
以确保在你的项目中可以使用这些新的依赖。

### Creating model classes the json_serializable way

### 以 json_serializable 的方式创建模型类

The following shows how to convert the `User` class to a 
`json_serializable` class. For the sake of simplicity, 
this code uses the simplified JSON model
from the previous samples.

下面显示了怎样将 `User` 类转换为 `json_serializable` 后的类。
简单起见，该代码使用了前面的例子中的简化的 JSON 模型。

**user.dart**

{% prettify dart %}
import 'package:json_annotation/json_annotation.dart';

/// This allows the `User` class to access private members in
/// the generated file. The value for this is *.g.dart, where
/// the star denotes the source file name.
part '[[highlight]]user[[/highlight]].g.dart';

/// An annotation for the code generator to know that this class needs the
/// JSON serialization logic to be generated.
[[highlight]]@JsonSerializable()[[/highlight]]

class User {
  User(this.name, this.email);

  String name;
  String email;

  /// A necessary factory constructor for creating a new User instance
  /// from a map. Pass the map to the generated `_$UserFromJson()` constructor.
  /// The constructor is named after the source class, in this case, User.
  factory User.fromJson(Map<String, dynamic> json) => _$[[highlight]]User[[/highlight]]FromJson(json);

  /// `toJson` is the convention for a class to declare support for serialization
  /// to JSON. The implementation simply calls the private, generated
  /// helper method `_$UserToJson`.
  Map<String, dynamic> toJson() => _$[[highlight]]User[[/highlight]]ToJson(this);
}
{% endprettify %}

With this setup, the source code generator generates code for encoding
and decoding the `name` and `email` fields from JSON.

通过这个设置，源代码生成器将生成用于 JSON 编码及解码 `name` 以及 `email` 字段的代码。

If needed, it is also easy to customize the naming strategy. 
For example, if the API returns objects with _snake\_case_, 
and you want to use _lowerCamelCase_ in your models,
you can use the `@JsonKey` annotation with a name parameter:

如果需要，你可以很容易自定义命名策略。
例如，如果 API 返回带有蛇形命名方式的对象，
并且你想要在你的模型里使用 **小驼峰** 的命名方式，
你可以使用带有一个 name 参数的 `@JsonKey` 注解。

<!-- skip -->
```dart
/// Tell json_serializable that "registration_date_millis" should be
/// mapped to this property.
@JsonKey(name: 'registration_date_millis')
final int registrationDateMillis;
```

It's best if both server and client follow the same naming strategy.  
`@JsonSerializable()` provide `fieldRename` enum to totally converting dart 
fields into JSON keys.

Modifying `@JsonSerializable(fieldRename: FieldRename.snake)` is equivalent to
adding `@JsonKey(name: '<snake_case>')` to each field.

Sometimes server data is uncertain, so it is necessary to verify and protect data
 on client.  
Other commonly used `@JsonKey` annotations include: 

<!-- skip -->
```dart
/// Tell json_serializable to use "defaultValue" if the JSON doesn't
/// contain this key or if the value is `null`.
@JsonKey(defaultValue: false)
final bool isAdult;

/// When `true` tell json_serializable that JSON must contain the key, 
/// If the key doesn't exist, an exception is thrown.
@JsonKey(required: true)
final String id;

/// When `true` tell json_serializable that generated code should 
/// ignore this field completely. 
@JsonKey(ignore: true)
final String verificationCode;
```

### Running the code generation utility

### 运行代码生成工具

When creating `json_serializable` classes the first time, 
you'll get errors similar to what is shown in the image below.

当你首次创建 `json_serializable` 类时，你会得到类似下图的错误。

![IDE warning when the generated code for a model class does not exist
yet.](/images/json/ide_warning.png){:.mw-100}

These errors are entirely normal and are simply because the generated code for
the model class does not exist yet. To resolve this, run the code
generator that generates the serialization boilerplate.

这些错误完全正常，很简单，因为这些模型类的生成代码并不存在。
要解决这个问题，运行代码生成器来生成序列化数据模板。

There are two ways of running the code generator.

有两种方式运行代码生成器。

#### One-time code generation

#### 一次性代码生成

By running `flutter pub run build_runner build` in the project root,
you generate JSON serialization code for your models whenever they are needed.
This triggers a one-time build that goes through the source files, picks the
relevant ones, and generates the necessary serialization code for them.

通过在项目根目录运行 `flutter pub run build_runner build`，
你可以在任何需要的时候为你的模型生成 JSON 序列化数据代码。
这会触发一次构建，遍历源文件，选择相关的文件，然后为它们生成必须的序列化数据代码。

While this is convenient, it would be nice if you did not have to run the
build manually every time you make changes in your model classes.

虽然这样很方便，但是如果你不需要在每次修改了你的模型类后都要手动构建那将会很棒。

#### Generating code continuously

#### 持续生成代码

A _watcher_ makes our source code generation process more convenient. It
watches changes in our project files and automatically builds the necessary
files when needed. Start the watcher by running
`flutter pub run build_runner watch` in the project root.

_监听器_ 让我们的源代码生成过程更加方便。
它监听我们项目中的文件变化并且会在需要的时候自动构建必要的文件。
通过在项目根目录运行 `flutter pub run build_runner watch` 启动监听。

It is safe to start the watcher once and leave it running in the background.

一旦启动监听并让它留在后台运行是安全的。

### Consuming json_serializable models

### 使用 json_serializable 模型

To decode a JSON string the `json_serializable` way,
you do not have actually to make any changes to our previous code.

为了以 `json_serializable` 的方式解码 JSON 字符串，
事实上你不必对以前的代码做任何的改动。

<!-- skip -->
```dart
Map userMap = jsonDecode(jsonString);
var user = User.fromJson(userMap);
```
The same goes for encoding. The calling API is the same as before.

编码也是如此。调用 API 和以前一样。

<!-- skip -->
```dart
String json = jsonEncode(user);
```

With `json_serializable`,
you can forget any manual JSON serialization in the `User` class.
The source code generator creates a file called `user.g.dart`,
that has all the necessary serialization logic.
You no longer have to write automated tests to ensure
that the serialization works&mdash;it's now
_the library's responsibility_ to make sure the serialization works
appropriately.

使用 `json_serializable`，在 `User` 类中你可以忘记手动序列化任意的 JSON 数据。
源代码生成器会创建一个名为 `user.g.dart` 的文件，
它包含了所有必须的序列化数据逻辑。你不必再编写自动化测试来确保序列化数据奏效。
现在由 _库来负责_ 确保序列化数据能正确地奏效。

## Generating code for nested classes

## 为嵌套类 (Nested Classes) 生成代码

You might have code that has nested classes within a class.
If that is the case, and you have tried to pass the class in JSON format
as an argument to a service (such as Firebase, for example),
you might have experienced an `Invalid argument` error.

你可能类在代码中用了嵌套类，在你把类作为参数传递给一些服务（比如 Firebase）的时候，
你可能会遇到`Invalid argument`错误。

Consider the following `Address` class:

比如下面的这个 `Address` 类：

<!-- skip -->
```dart
import 'package:json_annotation/json_annotation.dart';
part 'address.g.dart';

@JsonSerializable()
class Address {
  String street;
  String city;

  Address(this.street, this.city);

  factory Address.fromJson(Map<String, dynamic> json) => _$AddressFromJson(json);
  Map<String, dynamic> toJson() => _$AddressToJson(this);
}
```

The `Address` class is nested inside the `User` class:

一个 `Address` 类被嵌套在 `User` 类中使用：

<!-- skip -->
```dart
import 'address.dart';
import 'package:json_annotation/json_annotation.dart';
part 'user.g.dart';

@JsonSerializable()
class User {
  String firstName;
  Address address;

  User(this.firstName, this.address);

  factory User.fromJson(Map<String, dynamic> json) => _$UserFromJson(json);
  Map<String, dynamic> toJson() => _$UserToJson(this);
}
```

Running `flutter pub run build_runner build` in the terminal creates
the `*.g.dart` file, but the private `_$UserToJson()` function
looks something like the following:

在终端中运行 `flutter pub run build_runner build` 创建 `* .g.dart`文件，
但私有函数如 `_ $ UserToJson（）` 会看起来像下面这样：

<!-- skip -->
```dart
(
Map<String, dynamic> _$UserToJson(User instance) => <String, dynamic>{
  'firstName': instance.firstName,
  'address': instance.address,
};
```

All looks fine now, but if you do a print() on the user object:

看起来没有什么问题，如果 `print` 用户对象时：

<!-- skip -->
```dart
Address address = Address("My st.", "New York");
User user = User("John", address);
print(user.toJson());
```

The result is:

结果会是：

```json
{name: John, address: Instance of 'address'}
```

When what you probably want is output like the following:

但实际上你希望的输出结果是这样的：

```json
{name: John, address: {street: My st., city: New York}}
```

To make this work, pass `explicitToJson: true` in the `@JsonSerializable()`
annotation over the class declaration. The `User` class now looks as follows:

为了得到正常的输出，你需要在类声明之前
为 `@JsonSerializable` 方法加入 `explicitToJson: true` 参数，
`User`类现在看起来是这样的：

``` dart
import 'address.dart';
import 'package:json_annotation/json_annotation.dart';
part 'user.g.dart';

@JsonSerializable(explicitToJson: true)
class User {
  String firstName;
  Address address;

  User(this.firstName, this.address);

  factory User.fromJson(Map<String, dynamic> json) => _$UserFromJson(json);
  Map<String, dynamic> toJson() => _$UserToJson(this);
}
```

For more information, see [`explicitToJson`][] in the
[`JsonSerializable`][] class for the [`json_annotation`][] package.

了解更多信息，请查阅 [`json_annotation`][] 这个 package 里的 
[`JsonSerializable`][] 类的 [`explicitToJson`][] 参数等相关文档。

## Further references

## 进一步参考

For more information, see the following resources:

更多信息，请查看以下资源：

* The [`dart:convert`][] and [`JsonCodec`][] documentation

  [`dart:convert`][] 和 [`JsonCodec`][] 文档
  
* The [`json_serializable`][] package on pub.dev

  [Pub 中的 json_serializable package][`json_serializable`]
  
* The [`json_serializable` examples][] on GitHub

  [GitHub 中的 json_serializable 例子][`json_serializable` examples]
  
* The [discussion about dart:mirrors in Flutter][]

  [Flutter 中有关 dart:mirrors 的讨论][discussion about dart:mirrors in Flutter]

[`built_value`]: {{site.pub}}/packages/built_value
[code generation libraries]: #code-generation
[`dart:convert`]: {{site.dart.api}}/{{site.dart.sdk.channel}}/dart-convert
[`explicitToJson`]: {{site.pub}}/documentation/json_annotation/latest/json_annotation/JsonSerializable/explicitToJson.html
[Flutter Favorite]: /docs/development/packages-and-plugins/favorites
[json background parsing]: https://flutter.dev/docs/cookbook/networking/background-parsing
[`JsonCodec`]: {{site.dart.api}}/{{site.dart.sdk.channel}}/dart-convert/JsonCodec-class.html
[`JsonSerializable`]: {{site.pub}}/documentation/json_annotation/latest/json_annotation/JsonSerializable-class.html
[`json_annotation`]: {{site.pub}}/packages/json_annotation
[`json_serializable`]: {{site.pub}}/packages/json_serializable
[`json_serializable` examples]: {{site.github}}/dart-lang/json_serializable/blob/master/example/lib/example.dart
[pubspec file]: https://raw.githubusercontent.com/dart-lang/json_serializable/master/example/pubspec.yaml
[reflection]: https://en.wikipedia.org/wiki/Reflection_(computer_programming)
[反射]: https://en.wikipedia.org/wiki/Reflection_(computer_programming)
[Serializing JSON manually using dart:convert]: #manual-encoding
[Serializing JSON using code generation libraries]: #code-generation
[tree shaking]: https://en.wikipedia.org/wiki/Tree_shaking
