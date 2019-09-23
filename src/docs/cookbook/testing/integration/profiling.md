---
title: Performance profiling
title: 性能分析
prev:
  title: An introduction to integration testing
  title: Flutter 集成测试介绍
  path: /docs/cookbook/testing/integration/introduction
next:
  title: Handle scrolling
  title: 列表滚动
  path: /docs/cookbook/testing/integration/scrolling
---

When it comes to mobile apps, performance is critical to user experience.
Users expect apps to have smooth scrolling and meaningful animations free of
stuttering or skipped frames, known as "jank." How to ensure that your app
is free of jank on a wide variety of devices?

性能移动应用用户来说相当重要，用户希望应用程序有流畅的滚动和优雅的动画，
不愿看到卡顿和掉帧现象。我们如何确保我们的应用程序在各种设备上不会受到卡顿的影响？

There are two options: first, manually test the app on different devices.
While that approach might work for a smaller app, it becomes more
cumbersome as an app grows in size. Alternatively, run an integration
test that performs a specific task and records a performance timeline.
Then, examine the results to determine whether a specific section of 
the app needs to be improved.


以下两种方式可供选择：首先，我们可以在不同的设备对应用程序进行手动测试。
这种方式适用于较小的应用程序，但随着应用程序扩展性的提升，它将变得更加繁琐。
另外，我们可以运行集成测试，执行特定任务并记录性能时间轴。
然后，我们可以检验结果，以确定是否需要对我们应用程序的特定部分进行改善。

In this recipe, learn how to write a test that records a performance
timeline while performing a specific task and saves a summary of the
results to a local file.

在本文中，我们将学习如何在执行特定任务时编写记录性能时间轴的测试，
并将结果的摘要保存到本地文件中。

This recipe uses the following steps:

步骤：

1. Write a test that scrolls through a list of items.
  
 	 编写一个滚动列表的测试项目；
 	 		
1. Record the performance of the app.
  
 	 记录应用程序的性能；
 
1. Save the results to disk.
	 
 	 将结果保存到磁盘；
  	
1. Run the test.
  
   运行测试；
  	 
1. Review the results.
  
 	 检查结果。

### 1. Write a test that scrolls through a list of items

### 1.  编写一个滚动列表的测试项目

In this recipe, record the performance of an app as it scrolls through a
list of items. To focus on performance profiling, this recipe builds
on the
[Scrolling](/docs/cookbook/testing/integration/scrolling) recipe
in integration tests.

在这一章节，我们将记录当滚动列表条目时应用程序的性能。
为了专注于性能分析，这一小节在
[Scrolling in integration tests（列表滚动集成测试）](/docs/cookbook/testing/integration/scrolling)
的基础上进行。

Follow the instructions in that recipe to create an app, instrument the
app, and write a test to verify that everything works as expected.

请按照基础章节的指南新建一个应用程序，配置应用程序，
然后，编写一个测试程序。最终，确保应用程序按预期运行。

### 2. Record the performance of the app

### 2. 记录应用程序的性能

Next, record the performance of the app as it scrolls through the
list. Perform this task using the
[`traceAction()`]({{site.api}}/flutter/flutter_driver/FlutterDriver/traceAction.html)
method provided by the
[`FlutterDriver`]({{site.api}}/flutter/flutter_driver/FlutterDriver-class.html)
class.

然后，我们需要再应用程序的列表滚动的时候记录它的性能。使用 [`FlutterDriver`]({{site.api}}/flutter/flutter_driver/FlutterDriver-class.html) 类中的 [`traceAction()`]({{site.api}}/flutter/flutter_driver/FlutterDriver/traceAction.html) 方法实现这项功能。

This method runs the provided function and records a
[`Timeline`]({{site.api}}/flutter/flutter_driver/Timeline-class.html)
with detailed information about the performance of the app. This example
provides a function that scrolls through the list of items,
ensuring that a specific item is displayed. When the function completes,
the `traceAction()` method returns a `Timeline`.

这种方式运行提供的方法，并将应用程序性能的详细信息记录在 [`Timeline`]({{site.api}}/flutter/flutter_driver/Timeline-class.html) 中。
在这个示例中，我们提供一个方法，用以滚动列表的条目并确保指定条目是否被显示出来。
当方法执行完成的时候，`traceAction` 会返回一个 `Timeline`。

<!-- skip -->
```dart
// Record a performance timeline as the app scrolls through the list of items.
final timeline = await driver.traceAction(() async {
  await driver.scrollUntilVisible(
    listFinder,
    itemFinder,
    dyScroll: -300.0,
  );

  expect(await driver.getText(itemFinder), 'Item 50');
});
```

### 3. Save the results to disk

### 3. 将结果保存到磁盘

Now that you've captured a performance timeline, you need a way to review it.
The `Timeline` object provides detailed information about all of the events
that took place, but it doesn't provide a convenient way to review the results.

我们已经获取了一个性能时间轴，我们需要一种方式来对它进行检验，
`Timeline` 对象提供所有已发生事件的相关详细信息，但它不提供快捷方式查看结果。

Therefore, convert the `Timeline` into a
[`TimelineSummary`]({{site.api}}/flutter/flutter_driver/TimelineSummary-class.html).
The `TimelineSummary` can perform two tasks that make it easier to review the
results:

因此，我们可以将 `Timeline` 转换成 [`TimelineSummary`]({{site.api}}/flutter/flutter_driver/TimelineSummary-class.html)，
`TimelineSummary` 通过执行两个任务可以使我们更容易的检查结果：

  1. Writing a json document on disk that summarizes the data contained
     within the `Timeline`. This summary includes information about the
     number of skipped frames, slowest build times, and more.
     
     将一个 json 文件写入磁盘，它包含了 `Timeline` 中包含的数据的摘要。 
     此摘要包括掉帧数量，最慢构建时间等的信息。
     
  2. Saving the complete `Timeline` as a json file on disk. This file can
     be opened with the Chrome browser's tracing tools found at
     [chrome://tracing](chrome://tracing).
     
     它可以将完整的 `Timeline` 以 json 文件的形式存储在磁盘上，
     可以使用 Chrome 浏览器的追踪工具打开此文件。
     追踪工具在这里: [chrome://tracing](chrome://tracing)。

<!-- skip -->
```dart
// Convert the Timeline into a TimelineSummary that's easier to read and
// understand.
final summary = new TimelineSummary.summarize(timeline);

// Then, save the summary to disk.
summary.writeSummaryToFile('scrolling_summary', pretty: true);

// Optionally, write the entire timeline to disk in a json format. This
// file can be opened in the Chrome browser's tracing tools found by
// navigating to chrome://tracing.
summary.writeTimelineToFile('scrolling_timeline', pretty: true);
```

### 4. Run the test

### 4. 运行测试

After configuring the test to capture a performance `Timeline` and save a
summary of the results to disk, run the test with the following command:

在我们为了捕获一个性能 `Timeline` 配置了测试代码，并且将结果的摘要保存在了磁盘上，
我们可以使用以下命令运行测试代码：

```
flutter drive --target=test_driver/app.dart
```

### 5. Review the results

### 5. 检查结果

After the test completes successfully, the `build` directory at the root of
the project contains two files:

在测试代码运行成功以后，在项目根目录下的 `build` 文件夹里包含以下两个文件：

  1. `scrolling_summary.timeline_summary.json` contains the summary. Open
     Open the file with any text editor to review the information contained
     within.  With a more advanced setup, you could save a summary every
     time the test runs and create a graph of the results.
     
     `scrolling_summary.timeline_summary.json` 包含摘要。
     可以使用任何文本编辑器打开它并查看其中包含的信息。
     通过更高级的设置，我们可以在每次测试时保存摘要并创建一个结果图。
     
  2. `scrolling_timeline.timeline.json` contains the complete timeline data.
     Open the file using the Chrome browser's tracing tools found at
     [chrome://tracing](chrome://tracing). The tracing tools provide a
     convenient interface for inspecting the timeline data to discover
     the source of a performance issue.
     
     `scrolling_timeline.timeline.json` 包含完整的时间轴数据。
     使用 Chorme 浏览器的追踪工具打开这个文件。
     追踪工具在这里： [chrome://tracing](chrome://tracing)。
     追踪工具提供了一个便捷的用户界面，用以检测时间轴数据并发现其中导致性能问题的源头。

#### Summary example

#### 摘要的示例

```json
{
  "average_frame_build_time_millis": 4.2592592592592595,
  "worst_frame_build_time_millis": 21.0,
  "missed_frame_build_budget_count": 2,
  "average_frame_rasterizer_time_millis": 5.518518518518518,
  "worst_frame_rasterizer_time_millis": 51.0,
  "missed_frame_rasterizer_budget_count": 10,
  "frame_count": 54,
  "frame_build_times": [
    6874,
    5019,
    3638
  ],
  "frame_rasterizer_times": [
    51955,
    8468,
    3129
  ]
}
```

### Complete example

### 完整样例

```dart
import 'package:flutter_driver/flutter_driver.dart';
import 'package:test/test.dart';

void main() {
  group('Scrollable App', () {
    FlutterDriver driver;

    setUpAll(() async {
      driver = await FlutterDriver.connect();
    });

    tearDownAll(() async {
      if (driver != null) {
        driver.close();
      }
    });

    test('verifies the list contains a specific item', () async {
      final listFinder = find.byValueKey('long_list');
      final itemFinder = find.byValueKey('item_50_text');

      // Record a performance profile as the app scrolls through
      // the list of items.
      final timeline = await driver.traceAction(() async {
        await driver.scrollUntilVisible(
          listFinder,
          itemFinder,
          dyScroll: -300.0,
        );

        expect(await driver.getText(itemFinder), 'Item 50');
      });

      // Convert the Timeline into a TimelineSummary that's easier to
      // read and understand.
      final summary = new TimelineSummary.summarize(timeline);

      // Then, save the summary to disk.
      summary.writeSummaryToFile('scrolling_summary', pretty: true);

      // Optionally, write the entire timeline to disk in a json format.
      // This file can be opened in the Chrome browser's tracing tools
      // found by navigating to chrome://tracing.
      summary.writeTimelineToFile('scrolling_timeline', pretty: true);
    });
  });
}
```
