---
title: Scrolling
title: 列表滚动
prev:
  title: Performance profiling
  title: 性能分析
  path: /docs/cookbook/testing/integration/profiling
next:
  title: An introduction to unit testing
  title: 单元测试介绍
  path: /docs/cookbook/testing/unit/introduction
---

Many apps feature lists of content, from email clients to music apps and beyond.
In order to verify that lists contain the content we expect using integration
tests, we need a way to scroll through lists to search for particular items.

不论是 Email 客户端还是音乐应用，绝大多数 app 都使用到列表来展示内容。我们期望使用集成测试来验证列表中的内容，并需要一种方法去滚动列表来查找特定的项。

In order to scroll through lists via integration tests, we can use the methods
provided by the
[`FlutterDriver`]({{site.api}}/flutter/flutter_driver/FlutterDriver-class.html)
class, which is included in the
[`flutter_driver`]({{site.api}}/flutter/flutter_driver/flutter_driver-library.html)
package:

为了使滚动列表通过集成测试，我们可以使用 [`flutter_driver`]({{site.api}}/flutter/flutter_driver/FlutterDriver-class.html) 这个 package 中的 [`FlutterDriver`]({{site.api}}/flutter/flutter_driver/flutter_driver-library.html) 类：

In this recipe, we'll learn how to scroll through a list of items in order to
verify a specific Widget is being displayed, and discuss the pros on cons of
different approaches. If you're just getting started with integration testing,
please read through the [Introduction to integration
testing](/docs/cookbook/testing/integration) recipe.

在本章节，我们将学习如何滚动项目列表验证是否正在显示特定的 Widget，并讨论不同方法的优缺点。如果您刚刚开始进行集成测试，请阅读[集成测试介绍](/docs/cookbook/testing/integration)获取更多信息。

### Directions

### 步骤
  1. Create an app with a list of items
  
  创建带有列表的 app
  
  2. Instrument the app

  测试 app
  
  3. Write a test that scrolls through the list
  
  编写列表滚动的测试用例
  
  4. Run the test

  运行测试

### 1. Create an app with a list of items

### 1. 创建带有列表的 app

In this recipe, we'll build an app that shows a long list of items. In order to
keep this recipe focused on testing, we'll use the app we created in the
[Working with long lists](/docs/cookbook/lists/long-lists) recipe. If you're unsure
of how to work with lists of content, please see that recipe for an
introduction.

在本章节，我们创建一个带有长列表的 app。为了能够在本章节中专注于测试，我们将使用在[使用长列表](/docs/cookbook/lists/long-lists)章节中创建的 app。如果你不确定如何处理内容列表，请自行查看相关章节的介绍。

As we did in the [Introduction to integration
testing](/docs/cookbook/testing/integration) recipe, we'll also add keys to the
widgets we want to interact with inside our integration tests.

正如我们在[集成测试简介](/docs/cookbook/testing/integration)章节中做的那样，我们还将向集成测试内我们需要互动的 Widgets 添加 keys。

```dart
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';

void main() {
  runApp(MyApp(
    items: List<String>.generate(10000, (i) => "Item $i"),
  ));
}

class MyApp extends StatelessWidget {
  final List<String> items;

  MyApp({Key key, @required this.items}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final title = 'Long List';

    return MaterialApp(
      title: title,
      home: Scaffold(
        appBar: AppBar(
          title: Text(title),
        ),
        body: ListView.builder(
          // Add a key to the ListView. This allows us to find the list and
          // scroll through it in our tests
          key: Key('long_list'),
          itemCount: items.length,
          itemBuilder: (context, index) {
            return ListTile(
              title: Text(
                '${items[index]}',
                // Add a key to the Text Widget for each item. This allows
                // us to look for a particular item in the list and verify the
                // text is correct
                key: Key('item_${index}_text'),
              ),
            );
          },
        ),
      ),
    );
  }
}
```

### 2. Instrument the app

### 2. 测试 app

Next, we'll need to create an instrumented version of our app. This code lives
in a file called `test_driver/app.dart`.

接下来，我们需要创建 app 的测试版本，这段代码位于 `test_driver/app.dart` 文件中。

<!-- skip -->
```dart
import 'package:flutter_driver/driver_extension.dart';
import 'package:scrollable_app/main.dart' as app;

void main() {
  // This line enables the extension
  enableFlutterDriverExtension();

  // Call the `main()` function of your app or call `runApp` with any widget you
  // are interested in testing.
  app.main();
}
```

### 3. Write a test that scrolls through the list

### 3. 编写列表滚动的测试用例

Now, we can write our test! In this example, we need to scroll through the list
of items and verify that a particular item exists in the list. The
[`FlutterDriver`]({{site.api}}/flutter/flutter_driver/FlutterDriver-class.html)
class provides three methods for scrolling through lists:

现在，我们可以编写我们的测试用例了！在这个例子中，我们需要滚动列表并校验特定的列表项是否存在于列表中。[`FlutterDriver`]({{site.api}}/flutter/flutter_driver/FlutterDriver-class.html) 类为我们的滚动列表提供了三个方法：

  - The
  [`scroll`]({{site.api}}/flutter/flutter_driver/FlutterDriver/scroll.html)
  method allows us to scroll through a specific list by a given amount.
  
  [`scroll`]({{site.api}}/flutter/flutter_driver/FlutterDriver/scroll.html) 方法允许我们按给定的数量滚动特定的列表。
  
  - The
  [`scrollIntoView`]({{site.api}}/flutter/flutter_driver/FlutterDriver/scrollIntoView.html)
  method finds a specific Widget that's already been rendered, and will scroll
  it completely into view. Some Widgets, such as
  [`ListView.builder`]({{site.api}}/flutter/widgets/ListView/ListView.builder.html),
  render items on-demand.
  
  [`scrollIntoView`]({{site.api}}/flutter/flutter_driver/FlutterDriver/scrollIntoView.html) 方法找到已经被渲染的特定的 Widget，并将它完全滚动到视图中。某些 Widget，比如 [`ListView.builder`]({{site.api}}/flutter/widgets/ListView/ListView.builder.html)，只有在将要显示的时候才会去渲染列表项。
  
  - The
  [`scrollUntilVisible`]({{site.api}}/flutter/flutter_driver/FlutterDriver/scrollUntilVisible.html)
  method scrolls through a list until a specific Widget is visible.
  
  [`scrollUntilVisible`]({{site.api}}/flutter/flutter_driver/FlutterDriver/scrollUntilVisible.html) 方法会滚动列表直到特定的 Widget 显示出来。

While all three methods work for specific use-cases, `scrollUntilVisible` is
oftentimes the most robust option. Why?

当我们遇到三种方法同时使用的情况时，`scrollUntilVisible` 方法通常来说是最优的方式，为什么呢？

  1. If we use the `scroll` method alone, we might incorrectly assume the height
  of each item in the list. This could lead to scrolling too much or too little.
  
  如果只使用 `scroll` 方法，我们可能错误地假定列表中每一项的高度，这可能导致滚动的太多或太少。
  
  2. If we use the `scrollIntoView` method, we assume the Widget has been
  instantiated and rendered. In order to verify our apps work on a broad range
  of devices, we might run our integration tests against devices with different
  screen sizes. Since `ListView.builder` will render items on-demand,
  whether or not a particular Widget has been rendered can depend
  on the size of the screen.
  
  如果使用 `scrollIntoView` 方法，我们假定 Widget 已被实例化和渲染。为了验证 app 在不同的设备了能够很好的运行，我们可以对具有不同屏幕大小的设备运行集成测试。因为 `ListView.builder` 是只有在需要的时候才会渲染列表项，所以是否渲染特定的 Widget 取决于屏幕的大小。

Therefore, rather than assuming we know the height of all the items in a list,
or that a particular Widget will be rendered on all devices, we can use the
`scrollUntilVisible` method to repeatedly scroll through a list of items until
we find what we're looking for!

所以，我们既不需要知道所有列表项的高度，也不需要知道一个特定的 Widget 在不同的屏幕大小的设备上是否被渲染，我们只需要调用 `scrollUntilVisible` 方法反复滚动列表直到找到要查找的列表项。

Let's see how we can use the `scrollUntilVisible` method to look through the
list for a particular item! This code lives in a file called
`test_driver/app_test.dart`.

让我们看一下如何通过 `scrollUntilVisible` 方法去寻找列表中特定的一项，这段代码位于 `test_driver/app_test.dart` 文件中。

```dart
// Imports the Flutter Driver API
import 'package:flutter_driver/flutter_driver.dart';
import 'package:test/test.dart';

void main() {
  group('Scrollable App', () {
    FlutterDriver driver;

    // Connect to the Flutter driver before running any tests
    setUpAll(() async {
      driver = await FlutterDriver.connect();
    });

    // Close the connection to the driver after the tests have completed
    tearDownAll(() async {
      if (driver != null) {
        await driver.close();
      }
    });

    test('verifies the list contains a specific item', () async {
      // Create two SerializableFinders. We will use these to locate specific
      // Widgets displayed by the app. The names provided to the byValueKey
      // method correspond to the Keys we provided to our Widgets in step 1.
      final listFinder = find.byValueKey('long_list');
      final itemFinder = find.byValueKey('item_50_text');

      await driver.scrollUntilVisible(
        // Scroll through this list
        listFinder,
        // Until we find this item
        itemFinder,
        // In order to scroll down the list, we need to provide a negative
        // value to dyScroll. Ensure this value is a small enough increment to
        // scroll the item into view without potentially scrolling past it.
        //
        // If you need to scroll through horizontal lists, provide a dxScroll
        // argument instead
        dyScroll: -300.0,
      );

      // Verify the item contains the correct text
      expect(
        await driver.getText(itemFinder),
        'Item 50',
      );
    });
  });
}
```

### 4. Run the test

### 4. 运行测试

Finally, we can run the test using the following command from the root of the
project:

最后，我们在项目根目录下使用以下命令来运行测试：

```
flutter drive --target=test_driver/app.dart
```
