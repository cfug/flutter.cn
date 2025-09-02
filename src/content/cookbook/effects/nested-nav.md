---
# title: Create a nested navigation flow
title: 创建一个嵌套导航
# description: How to implement a flow with nested navigation.
description: 如何实现嵌套的导航
js:
  - defer: true
    url: /assets/js/inject_dartpad.js
---

<?code-excerpt path-base="cookbook/effects/nested_nav"?>

Apps accumulate dozens and then hundreds of routes over time.
Some of your routes make sense as top-level (global) routes.
For example, "/", "profile", "contact", "social_feed" are all
possible top-level routes within your app. 
But, imagine that you defined every possible route in your
top-level `Navigator` widget. The list would be very long,
and many of these routes would 
be better handled nested within another widget.

随着应用程序的发展，它会累积几十甚至上百条路由。
虽然，有些路由可以作为顶层（全局）路由。
例如，“/”、“profile”、“contact”、“social_feed” 
这些都是应用中可能存在的顶层路由。
但是，如果你在顶层 `Navigator` widget 中定义了所有可能的路由，
那么路由列表将会非常庞大，
实际上，许多路由更适合嵌套在其他 widget 中处理。

Consider an Internet of Things (IoT) setup flow for a wireless
light bulb that you control with your app.
This setup flow consists of four pages: 

设想一个用于无线灯泡的物联网 (IoT) 设置流程，
你可以通过应用程序来控制这个灯泡。
该设置流程包括 4 个页面：

* `find_devices` page: Find nearby bulbs.

  `find_devices` 页面：查找附近的灯泡。

* `select_device` page: Select the bulb that you want to
  add.

  `select_device` 页面：选择想要添加的灯泡。

* `connecting` page: Add the bulb.

  `connecting` 页面：添加灯泡。

* `finished` page: Complete the setup.

  `finished` 页面：完成设置。

You could orchestrate this behavior from your top-level 
`Navigator` widget. However, it makes more sense to define a second, 
nested `Navigator` widget within your `SetupFlow` widget,
and let the nested `Navigator` take ownership over the four pages
in the setup flow. This delegation of navigation facilitates
greater local control, which is 
generally preferable when developing software.

你可以在顶层 `Navigator` widget 中协调这些操作。
然而，更合理的做法是，
在你的 `SetupFlow` widget 中定义一个嵌套的 `Navigator` widget，
并让这个嵌套的 `Navigator` 负责管理设置流程中的这 4 个页面。
这种导航委托方式有助于加强局部控制，
这在软件开发中通常是更可取的。

The following animation shows the app's behavior:

下面的动画展示了应用程序的行为：

![Gif showing the nested "setup" flow](/assets/images/docs/cookbook/effects/NestedNavigator.webp){:.site-mobile-screenshot}

In this recipe, you implement a four-page IoT setup
flow that maintains its own navigation nested beneath
the top-level `Navigator` widget.

在这个教程中，你将实现一个包含四个页面的物联网 (IoT) 设置流程，
该流程在顶层 `Navigator` widget 下嵌套了单独管理的导航。

## Prepare for navigation

## 导航准备阶段

This IoT app has two top-level screens,
along with the setup flow. Define these 
route names as constants so that they can
be referenced within code.

这个物联网 (IoT) 应用程序包含两个顶层页面，
以及一个设置流程。
将这些路由名称定义为常量，以便在代码中引用它们。

<?code-excerpt "lib/main.dart (routes)"?>
```dart
const routeHome = '/';
const routeSettings = '/settings';
const routePrefixDeviceSetup = '/setup/';
const routeDeviceSetupStart = '/setup/$routeDeviceSetupStartPage';
const routeDeviceSetupStartPage = 'find_devices';
const routeDeviceSetupSelectDevicePage = 'select_device';
const routeDeviceSetupConnectingPage = 'connecting';
const routeDeviceSetupFinishedPage = 'finished';
```

The home and settings screens are referenced with
static names. The setup flow pages, however,
use two paths to create their route names: 
a `/setup/` prefix followed by the name of the specific page.
By combining the two paths, your `Navigator` can determine
that a route name is intended for the setup flow without
recognizing all the individual pages associated with 
the setup flow.

主页和设置页的路由是使用静态名称引用的。
然而，设置流程中的页面是通过两个路径组合来生成它们的路由名称的：
首先是一个 `/setup/` 前缀，然后是具体页面的名称。
通过将这两个路径组合在一起，
你的 `Navigator` 可以判断出某个路由名称是否属于设置流程，
而无需识别所有与设置流程相关的具体页面。

The top-level `Navigator` isn't responsible for identifying
individual setup flow pages. Therefore, your top-level
`Navigator` needs to parse the incoming route name to
identify the setup flow prefix. Needing to parse the route name 
means that you can't use the `routes` property of your top-level
`Navigator`. Instead, you must provide a function for the
`onGenerateRoute` property.

顶层 `Navigator` 不负责识别具体的设置流程页面。
因此，顶层 `Navigator` 需要解析传入的路由名称，
以识别设置流程的前缀。
由于需要解析路由名称，
不能使用顶层 `Navigator` 的 `routes` 属性。
相反，你必须为 `onGenerateRoute` 属性提供一个函数。

Implement `onGenerateRoute` to return the appropriate widget
for each of the three top-level paths.

实现 `onGenerateRoute` 函数，
以便为三个顶层路径分别返回相应的 widget。

<?code-excerpt "lib/main.dart (OnGenerateRoute)"?>
```dart
onGenerateRoute: (settings) {
  final Widget page;
  if (settings.name == routeHome) {
    page = const HomeScreen();
  } else if (settings.name == routeSettings) {
    page = const SettingsScreen();
  } else if (settings.name!.startsWith(routePrefixDeviceSetup)) {
    final subRoute = settings.name!.substring(
      routePrefixDeviceSetup.length,
    );
    page = SetupFlow(setupPageRoute: subRoute);
  } else {
    throw Exception('Unknown route: ${settings.name}');
  }

  return MaterialPageRoute<void>(
    builder: (context) {
      return page;
    },
    settings: settings,
  );
},
```

Notice that the home and settings routes are matched with exact 
route names. However, the setup flow route condition only
checks for a prefix. If the route name contains the setup
flow prefix, then the rest of the route name is ignored
and passed on to the `SetupFlow` widget to process. 
This splitting of the route name is what allows the top-level
`Navigator` to be agnostic toward the various subroutes
within the setup flow.

请注意，主页和设置页的路由是与精确的路由名称相匹配的。
然而，设置流程的路由条件只检查前缀。
如果路由名称包含设置流程的前缀，那么路由名称的其余部分将被忽略，
并将其余部分传递给 `SetupFlow` widget 进行处理。
这种对路由名称的拆分方式，使顶层 `Navigator` 可以不关注设置流程中的各个子路由。

Create a stateful widget called `SetupFlow` that
accepts a route name.

创建一个名为 `SetupFlow` 的 stateful widget，
该 widget 接收一个路由名称作为参数。

<?code-excerpt "lib/setupflow.dart (SetupFlow)" replace="/@override\n*.*\n\s*return const SizedBox\(\);\n\s*}/\/\/.../g"?>
```dart
class SetupFlow extends StatefulWidget {
  const SetupFlow({super.key, required this.setupPageRoute});

  final String setupPageRoute;

  @override
  State<SetupFlow> createState() => SetupFlowState();
}

class SetupFlowState extends State<SetupFlow> {
  //...
}
```

## Display an app bar for the setup flow

## 为设置流程显示一个 AppBar

The setup flow displays a persistent app bar
that appears across all pages.

设置流程显示一个始终可见的 AppBar，贯穿设置流程中的所有页面。

Return a `Scaffold` widget from your `SetupFlow`
widget's `build()` method, 
and include the desired `AppBar` widget.

在你的 `SetupFlow` widget 的 `build()` 方法中返回一个 `Scaffold` widget，
并包含所需的 `AppBar` widget。

<?code-excerpt "lib/setupflow2.dart (SetupFlow2)"?>
```dart
@override
Widget build(BuildContext context) {
  return Scaffold(appBar: _buildFlowAppBar(), body: const SizedBox());
}

PreferredSizeWidget _buildFlowAppBar() {
  return AppBar(title: const Text('Bulb Setup'));
}
```

The app bar displays a back arrow and exits the setup
flow when the back arrow is pressed. However,
exiting the flow causes the user to lose all progress. 
Therefore, the user is prompted to confirm whether they
want to exit the setup flow.

AppBar 显示一个返回箭头，
当返回箭头被按下时，会退出设置流程。
然而，退出流程会导致用户丢失所有进度。
因此，系统会提示用户确认是否真的想要退出设置流程。

Prompt the user to confirm exiting the setup flow,
and ensure that the prompt appears when the user
presses the hardware back button on their device.

提示用户确认是否退出设置流程，
并确保在用户按下设备上的实体返回按钮时也会出现该提示。

<?code-excerpt "lib/prompt_user.dart (PromptUser)"?>
```dart
Future<void> _onExitPressed() async {
  final isConfirmed = await _isExitDesired();

  if (isConfirmed && mounted) {
    _exitSetup();
  }
}

Future<bool> _isExitDesired() async {
  return await showDialog<bool>(
        context: context,
        builder: (context) {
          return AlertDialog(
            title: const Text('Are you sure?'),
            content: const Text(
              'If you exit device setup, your progress will be lost.',
            ),
            actions: [
              TextButton(
                onPressed: () {
                  Navigator.of(context).pop(true);
                },
                child: const Text('Leave'),
              ),
              TextButton(
                onPressed: () {
                  Navigator.of(context).pop(false);
                },
                child: const Text('Stay'),
              ),
            ],
          );
        },
      ) ??
      false;
}

void _exitSetup() {
  Navigator.of(context).pop();
}

@override
Widget build(BuildContext context) {
  return PopScope(
    canPop: false,
    onPopInvokedWithResult: (didPop, _) async {
      if (didPop) return;

      if (await _isExitDesired() && context.mounted) {
        _exitSetup();
      }
    },
    child: Scaffold(appBar: _buildFlowAppBar(), body: const SizedBox()),
  );
}

PreferredSizeWidget _buildFlowAppBar() {
  return AppBar(
    leading: IconButton(
      onPressed: _onExitPressed,
      icon: const Icon(Icons.chevron_left),
    ),
    title: const Text('Bulb Setup'),
  );
}
```

When the user taps the back arrow in the app bar,
or presses the back button on their device,
an alert dialog pops up to confirm that the
user wants to leave the setup flow.
If the user presses **Leave**, then the setup flow pops itself 
from the top-level navigation stack.
If the user presses **Stay**, then the action is ignored.

当用户点击 AppBar 中的返回箭头或按下设备上的实体返回按钮时，
会弹出一个警告对话框，确认用户是否要离开设置流程。
如果用户点击 **Leave**，则设置流程会从顶层导航堆栈中移除。
如果用户点击 **Stay**，则忽略该操作。

You might notice that the `Navigator.pop()`
is invoked by both the **Leave** and 
**Stay** buttons. To be clear,
this `pop()` action pops the alert dialog off 
the navigation stack, not the setup flow.

你可能会注意到，
**Leave** 和 **Stay** 按钮都会调用 `Navigator.pop()`。
需要明确的是，这个 `pop()` 操作是将警告对话框从导航堆栈中移除，
而不是移除设置流程。

## Generate nested routes

## 创建嵌套路由

The setup flow's job is to display the appropriate
page within the flow.

设置流程的任务是显示流程中相应的页面。

Add a `Navigator` widget to `SetupFlow`,
and implement the `onGenerateRoute` property.

在 `SetupFlow` 中添加一个 `Navigator` widget，
并实现 `onGenerateRoute` 属性。

<?code-excerpt "lib/add_navigator.dart (AddNavigator)"?>
```dart
final _navigatorKey = GlobalKey<NavigatorState>();

void _onDiscoveryComplete() {
  _navigatorKey.currentState!.pushNamed(routeDeviceSetupSelectDevicePage);
}

void _onDeviceSelected(String deviceId) {
  _navigatorKey.currentState!.pushNamed(routeDeviceSetupConnectingPage);
}

void _onConnectionEstablished() {
  _navigatorKey.currentState!.pushNamed(routeDeviceSetupFinishedPage);
}

@override
Widget build(BuildContext context) {
  return PopScope(
    canPop: false,
    onPopInvokedWithResult: (didPop, _) async {
      if (didPop) return;

      if (await _isExitDesired() && context.mounted) {
        _exitSetup();
      }
    },
    child: Scaffold(
      appBar: _buildFlowAppBar(),
      body: Navigator(
        key: _navigatorKey,
        initialRoute: widget.setupPageRoute,
        onGenerateRoute: _onGenerateRoute,
      ),
    ),
  );
}

Route<Widget> _onGenerateRoute(RouteSettings settings) {
  final page = switch (settings.name) {
    routeDeviceSetupStartPage => WaitingPage(
      message: 'Searching for nearby bulb...',
      onWaitComplete: _onDiscoveryComplete,
    ),
    routeDeviceSetupSelectDevicePage => SelectDevicePage(
      onDeviceSelected: _onDeviceSelected,
    ),
    routeDeviceSetupConnectingPage => WaitingPage(
      message: 'Connecting...',
      onWaitComplete: _onConnectionEstablished,
    ),
    routeDeviceSetupFinishedPage => FinishedPage(onFinishPressed: _exitSetup),
    _ => throw StateError('Unexpected route name: ${settings.name}!'),
  };

  return MaterialPageRoute(
    builder: (context) {
      return page;
    },
    settings: settings,
  );
}
```

The `_onGenerateRoute` function works the same as
for a top-level `Navigator`. A `RouteSettings`
object is passed into the function,
which includes the route's `name`.
Based on that route name,
one of four flow pages is returned.

`_onGenerateRoute` 函数的工作方式与顶层 `Navigator` 相同。
该函数接收一个`RouteSettings` 对象，其中包含了路由名称 `name`。
根据路由名称，将返回四个流程页面之一。

The first page, called `find_devices`,
waits a few seconds to simulate network scanning.
After the wait period, the page invokes its callback. 
In this case, that callback is `_onDiscoveryComplete`.
The setup flow recognizes that, when device discovery
is complete, the device selection page should be shown.
Therefore, in `_onDiscoveryComplete`, the `_navigatorKey` 
instructs the nested `Navigator` to navigate to the
`select_device` page.

第一页名为 `find_devices`，它会等待几秒钟来模拟网络扫描。
在等待时间结束后，页面会调用其回调函数。
在这个教程中，回调函数是 `_onDiscoveryComplete`。
设置流程识别到设备发现完成后，应该显示设备选择页面。
因此，在 `_onDiscoveryComplete` 中，
`_navigatorKey` 指示嵌套的 `Navigator` 导航到 `select_device` 页面。

The `select_device` page asks the user to select a
device from a list of available devices. In this recipe,
only one device is presented to the user. 
When the user taps a device, the `onDeviceSelected`
callback is invoked. The setup flow recognizes that,
when a device is selected, the connecting page 
should be shown. Therefore, in `_onDeviceSelected`,
the `_navigatorKey` instructs the nested `Navigator`
to navigate to the `"connecting"` page.

`select_device` 页面要求用户从可用设备列表中选择一个设备。
在这个教程中，只向用户展示了一个设备。
当用户点击设备时，`onDeviceSelected` 回调被调用。
设置流程识别到设备选择后，应该显示连接页面。
因此，在 `_onDeviceSelected` 中，
`_navigatorKey` 指示嵌套的 `Navigator` 导航到 `"connecting"` 页面。

The `connecting` page works the same way as the
`find_devices` page. The `connecting` page waits
for a few seconds and then invokes its callback. 
In this case, the callback is `_onConnectionEstablished`.
The setup flow recognizes that, when a connection is established,
the final page should be shown. Therefore,
in `_onConnectionEstablished`, the `_navigatorKey` 
instructs the nested `Navigator` to navigate to the
`finished` page.

`connecting` 页面与 `find_devices` 页面工作方式相同。
`connecting` 页面等待几秒钟，然后调用其回调函数。
在这个教程中，回调函数是 `_onConnectionEstablished`。
设置流程识别到连接建立后，应该显示最终页面。
因此，在 `_onConnectionEstablished` 中，
`_navigatorKey` 指示嵌套的 `Navigator` 导航到 `finished` 页面。

The `finished` page provides the user with a **Finish**
button. When the user taps **Finish**,
the `_exitSetup` callback is invoked, which pops the entire 
setup flow off the top-level `Navigator` stack,
taking the user back to the home screen.

`finished` 页面提供了一个 **Finish** 按钮。
当用户点击 **Finish** 时，`_exitSetup` 回调被调用，
这会将整个设置流程从顶层 `Navigator` 堆栈中移除，使用户回到主页。

Congratulations!
You implemented nested navigation with four subroutes.

恭喜你！你实现了具有四个子路由的嵌套导航。

## Interactive example

## 交互示例

Run the app:

运行应用程序：

* On the **Add your first bulb** screen,
  click the FAB, shown with a plus sign, **+**.
  This brings you to the **Select a nearby device**
  screen. A single bulb is listed.

  在 **Add your first bulb** 页面上，
  点击带有加号 **+** 的悬浮操作按钮。
  这会将你带到 **Select a nearby device** 页面。
  页面上列出了一个灯泡设备。

* Click the listed bulb. A **Finished!** screen appears.

  点击列出的灯泡设备。页面上出现 **Finish** 按钮。

* Click the **Finished** button to return to the
  first screen.

  按下 **Finish** 按钮返回第一页。

<?code-excerpt "lib/main.dart"?>
```dartpad title="Flutter nested navigation hands-on example in DartPad" run="true" height="640px"
import 'package:flutter/material.dart';

const routeHome = '/';
const routeSettings = '/settings';
const routePrefixDeviceSetup = '/setup/';
const routeDeviceSetupStart = '/setup/$routeDeviceSetupStartPage';
const routeDeviceSetupStartPage = 'find_devices';
const routeDeviceSetupSelectDevicePage = 'select_device';
const routeDeviceSetupConnectingPage = 'connecting';
const routeDeviceSetupFinishedPage = 'finished';

void main() {
  runApp(
    MaterialApp(
      theme: ThemeData(
        brightness: Brightness.dark,
        appBarTheme: const AppBarTheme(backgroundColor: Colors.blue),
        floatingActionButtonTheme: const FloatingActionButtonThemeData(
          backgroundColor: Colors.blue,
        ),
      ),
      onGenerateRoute: (settings) {
        final Widget page;
        if (settings.name == routeHome) {
          page = const HomeScreen();
        } else if (settings.name == routeSettings) {
          page = const SettingsScreen();
        } else if (settings.name!.startsWith(routePrefixDeviceSetup)) {
          final subRoute = settings.name!.substring(
            routePrefixDeviceSetup.length,
          );
          page = SetupFlow(setupPageRoute: subRoute);
        } else {
          throw Exception('Unknown route: ${settings.name}');
        }

        return MaterialPageRoute<void>(
          builder: (context) {
            return page;
          },
          settings: settings,
        );
      },
      debugShowCheckedModeBanner: false,
    ),
  );
}

@immutable
class SetupFlow extends StatefulWidget {
  static SetupFlowState of(BuildContext context) {
    return context.findAncestorStateOfType<SetupFlowState>()!;
  }

  const SetupFlow({super.key, required this.setupPageRoute});

  final String setupPageRoute;

  @override
  SetupFlowState createState() => SetupFlowState();
}

class SetupFlowState extends State<SetupFlow> {
  final _navigatorKey = GlobalKey<NavigatorState>();

  @override
  void initState() {
    super.initState();
  }

  void _onDiscoveryComplete() {
    _navigatorKey.currentState!.pushNamed(routeDeviceSetupSelectDevicePage);
  }

  void _onDeviceSelected(String deviceId) {
    _navigatorKey.currentState!.pushNamed(routeDeviceSetupConnectingPage);
  }

  void _onConnectionEstablished() {
    _navigatorKey.currentState!.pushNamed(routeDeviceSetupFinishedPage);
  }

  Future<void> _onExitPressed() async {
    final isConfirmed = await _isExitDesired();

    if (isConfirmed && mounted) {
      _exitSetup();
    }
  }

  Future<bool> _isExitDesired() async {
    return await showDialog<bool>(
          context: context,
          builder: (context) {
            return AlertDialog(
              title: const Text('Are you sure?'),
              content: const Text(
                'If you exit device setup, your progress will be lost.',
              ),
              actions: [
                TextButton(
                  onPressed: () {
                    Navigator.of(context).pop(true);
                  },
                  child: const Text('Leave'),
                ),
                TextButton(
                  onPressed: () {
                    Navigator.of(context).pop(false);
                  },
                  child: const Text('Stay'),
                ),
              ],
            );
          },
        ) ??
        false;
  }

  void _exitSetup() {
    Navigator.of(context).pop();
  }

  @override
  Widget build(BuildContext context) {
    return PopScope(
      canPop: false,
      onPopInvokedWithResult: (didPop, _) async {
        if (didPop) return;

        if (await _isExitDesired() && context.mounted) {
          _exitSetup();
        }
      },
      child: Scaffold(
        appBar: _buildFlowAppBar(),
        body: Navigator(
          key: _navigatorKey,
          initialRoute: widget.setupPageRoute,
          onGenerateRoute: _onGenerateRoute,
        ),
      ),
    );
  }

  Route<Widget> _onGenerateRoute(RouteSettings settings) {
    final page = switch (settings.name) {
      routeDeviceSetupStartPage => WaitingPage(
        message: 'Searching for nearby bulb...',
        onWaitComplete: _onDiscoveryComplete,
      ),
      routeDeviceSetupSelectDevicePage => SelectDevicePage(
        onDeviceSelected: _onDeviceSelected,
      ),
      routeDeviceSetupConnectingPage => WaitingPage(
        message: 'Connecting...',
        onWaitComplete: _onConnectionEstablished,
      ),
      routeDeviceSetupFinishedPage => FinishedPage(onFinishPressed: _exitSetup),
      _ => throw StateError('Unexpected route name: ${settings.name}!'),
    };

    return MaterialPageRoute(
      builder: (context) {
        return page;
      },
      settings: settings,
    );
  }

  PreferredSizeWidget _buildFlowAppBar() {
    return AppBar(
      leading: IconButton(
        onPressed: _onExitPressed,
        icon: const Icon(Icons.chevron_left),
      ),
      title: const Text('Bulb Setup'),
    );
  }
}

class SelectDevicePage extends StatelessWidget {
  const SelectDevicePage({super.key, required this.onDeviceSelected});

  final void Function(String deviceId) onDeviceSelected;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 24),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              Text(
                'Select a nearby device:',
                style: Theme.of(context).textTheme.titleLarge,
              ),
              const SizedBox(height: 24),
              SizedBox(
                width: double.infinity,
                height: 54,
                child: ElevatedButton(
                  style: ButtonStyle(
                    backgroundColor: WidgetStateColor.resolveWith((states) {
                      return const Color(0xFF222222);
                    }),
                  ),
                  onPressed: () {
                    onDeviceSelected('22n483nk5834');
                  },
                  child: const Text(
                    'Bulb 22n483nk5834',
                    style: TextStyle(fontSize: 24),
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class WaitingPage extends StatefulWidget {
  const WaitingPage({
    super.key,
    required this.message,
    required this.onWaitComplete,
  });

  final String message;
  final VoidCallback onWaitComplete;

  @override
  State<WaitingPage> createState() => _WaitingPageState();
}

class _WaitingPageState extends State<WaitingPage> {
  @override
  void initState() {
    super.initState();
    _startWaiting();
  }

  Future<void> _startWaiting() async {
    await Future<dynamic>.delayed(const Duration(seconds: 3));

    if (mounted) {
      widget.onWaitComplete();
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 24),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              const CircularProgressIndicator(),
              const SizedBox(height: 32),
              Text(widget.message),
            ],
          ),
        ),
      ),
    );
  }
}

class FinishedPage extends StatelessWidget {
  const FinishedPage({super.key, required this.onFinishPressed});

  final VoidCallback onFinishPressed;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 24),
          child: SingleChildScrollView(
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                Container(
                  width: 200,
                  height: 200,
                  decoration: const BoxDecoration(
                    shape: BoxShape.circle,
                    color: Color(0xFF222222),
                  ),
                  child: const Center(
                    child: Icon(
                      Icons.lightbulb,
                      size: 140,
                      color: Colors.white,
                    ),
                  ),
                ),
                const SizedBox(height: 32),
                const Text(
                  'Bulb added!',
                  textAlign: TextAlign.center,
                  style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
                ),
                const SizedBox(height: 32),
                ElevatedButton(
                  style: ButtonStyle(
                    padding: WidgetStateProperty.resolveWith((states) {
                      return const EdgeInsets.symmetric(
                        horizontal: 24,
                        vertical: 12,
                      );
                    }),
                    backgroundColor: WidgetStateColor.resolveWith((states) {
                      return const Color(0xFF222222);
                    }),
                    shape: WidgetStateProperty.resolveWith((states) {
                      return const StadiumBorder();
                    }),
                  ),
                  onPressed: onFinishPressed,
                  child: const Text('Finish', style: TextStyle(fontSize: 24)),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}

@immutable
class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: _buildAppBar(context),
      body: Center(
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 24),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              Container(
                width: 200,
                height: 200,
                decoration: const BoxDecoration(
                  shape: BoxShape.circle,
                  color: Color(0xFF222222),
                ),
                child: Center(
                  child: Icon(
                    Icons.lightbulb,
                    size: 140,
                    color: Theme.of(context).scaffoldBackgroundColor,
                  ),
                ),
              ),
              const SizedBox(height: 32),
              const Text(
                'Add your first bulb',
                textAlign: TextAlign.center,
                style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
              ),
            ],
          ),
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          Navigator.of(context).pushNamed(routeDeviceSetupStart);
        },
        child: const Icon(Icons.add),
      ),
    );
  }

  PreferredSizeWidget _buildAppBar(BuildContext context) {
    return AppBar(
      title: const Text('Welcome'),
      actions: [
        IconButton(
          icon: const Icon(Icons.settings),
          onPressed: () {
            Navigator.pushNamed(context, routeSettings);
          },
        ),
      ],
    );
  }
}

class SettingsScreen extends StatelessWidget {
  const SettingsScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: _buildAppBar(),
      body: SingleChildScrollView(
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: List.generate(8, (index) {
            return Container(
              width: double.infinity,
              height: 54,
              margin: const EdgeInsets.only(left: 16, right: 16, top: 16),
              decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(8),
                color: const Color(0xFF222222),
              ),
            );
          }),
        ),
      ),
    );
  }

  PreferredSizeWidget _buildAppBar() {
    return AppBar(title: const Text('Settings'));
  }
}
```
