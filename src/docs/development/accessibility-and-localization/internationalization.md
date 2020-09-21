---
title: Internationalizing Flutter apps
title: Flutter 应用里的国际化
short-title: i18n
description: How to internationalize your Flutter app.
tags: Flutter开发
keywords: 国际化
---

{{site.alert.secondary}}
 
  <h4 class="no_toc">What you’ll learn</h4>
  
  <h4 class="no_toc">你将学习到</h4>

  * How to track the device's locale (the user's preferred language).
  
    如何去获取设备的语言环境（用户首选的语言）。
    
  * How to manage locale-specific app values.
  
    如何去管理特定语言环境下的 app 值。
  
  * How to define the locales an app supports.
  
    如何去定义 app 支持的语言环境。
  
{{site.alert.end}}

If your app might be deployed to users who speak another language then
you'll need to "internationalize" it. That means you'll need to write
the app in a way that makes it possible to "localize" values like text
and layouts for each language or "locale" that the app
supports. Flutter provides widgets and classes that help with
internationalization and the Flutter libraries themselves are
internationalized.

如果你的 app 会部署给说其他语言的用户使用，那么你就需要对它进行国际化。
这就意味着你在编写 app 的时候，需要采用一种容易对它进行本地化的方式进行开发，
这种方式让你能够为每一种语言或者 app 所支持的语言环境下的文本和布局等进行本地化。
Flutter 提供了 widgets 和类来帮助开发者进行国际化，
当然 Flutter 库本身就是国际化的。

The tutorial that follows is largely written in terms of the Flutter
`MaterialApp` class, since most applications are written that way.
Applications written in terms of the lower level `WidgetsApp` class
can also be internationalized using the same classes and logic.

和大多数应用一样，下面的教程主要都是使用 Flutter MaterialApp 类编写。
那些使用更底层的 WidgetsApp 类编写的应用也能通过使用相同的类和逻辑来进行国际化。

{{site.alert.secondary}}

  <h4 class="no_toc">Sample internationalized apps</h4>
  
  <h4 class="no_toc">国际化的 app 示例</h4>

  If you'd like to start out by reading the code for an internationalized
  Flutter app, here are two small examples. The first one is intended to
  be as simple as possible, and the second one uses the APIs and tools
  provided by the [`intl`][] package.
  If Dart's intl package is new to you,
  see [Using the Dart intl tools][].
  
  如果你想通过阅读已经国际化的 Flutter app 代码来开始的���，
  这里有两个小例子。第一个例子是一个尽可能简单的实现。
  第二个例子使用了 [`intl`][] package 提供的 API 和工具。
  如果你还不熟悉 Dart 的 intl 包，请查看
  [使用 Dart intl 工具][Using the Dart intl tools]。

  * [Minimal internationalization][]
    
    [最简单的国际化实现示例][Minimal internationalization]
    
  * [Internationalization based on the `intl` package][]
    
    [基于 `intl` package 的国际化实现示例][Internationalization based on the `intl` package]
  
{{site.alert.end}}

## Setting up an internation&shy;alized app: the flutter<wbr>_localizations package {#setting-up}

## 配置一个国际化的 app：flutter_localizations package {#setting-up}

By default, Flutter only provides US English localizations.
To add support for other languages,
an application must specify additional `MaterialApp` properties,
and include a separate package called
`flutter_localizations`.  As of February 2020,
this package supports 77 languages.
If you want your app to work smoothly on iOS,
then you have to add the package
`flutter_cupertino_localizations` as well.

默认情况下，Flutter 只提供美式英语的本地化。
如果想要添加其他语言，你的应用必须指定额外的 MaterialApp
属性并且添加一个单独的 package，叫做 `flutter_localizations`。
截至到 2020 年 2 月份，这��� package 已经支持大约 77 种语言。

To use flutter_localizations,
add the package as a dependency to your `pubspec.yaml` file:

想要使用 flutter_localizations 的话，
你需要在 `pubspec.yaml` 文件中添加它作为依赖：

```yaml
dependencies:
  flutter:
    sdk: flutter
  flutter_localizations:
    sdk: flutter
```

Next, import the flutter_localizations library and specify
`localizationsDelegates` and `supportedLocales` for `MaterialApp`:

下一步，引入 flutter_localizations 库，
然后为 MaterialApp 指定 `localizationsDelegates` 和 `supportedLocales`：

<!-- skip -->
```dart
import 'package:flutter_localizations/flutter_localizations.dart';

MaterialApp(
 localizationsDelegates: [
   // ... app-specific localization delegate[s] here
   GlobalMaterialLocalizations.delegate,
   GlobalWidgetsLocalizations.delegate,
   GlobalCupertinoLocalizations.delegate,
 ],
 supportedLocales: [
    const Locale('en', ''), // English, no country code
    const Locale('he', ''), // Hebrew, no country code
    const Locale.fromSubtags(languageCode: 'zh'), // Chinese *See Advanced Locales below*
    // ... other locales the app supports
  ],
  // ...
)
```

Apps based on `WidgetsApp` are similar except that the
`GlobalMaterialLocalizations.delegate` isn't needed.

基于 WidgetsApp 构建的 app 在添加语言环境���，
除了 `GlobalMaterialLocalizations.delegate` 不需要之外，
其他的操作是类似的。

The full `Locale.fromSubtags` constructor is preferred
as it supports scriptCode, though the `Locale` default
constructor is still fully valid.

虽然 `语言环境 (Locale)` 默认的构造函数是完全没有问题的，
但是还是建议大家使用 `Locale.fromSubtags` 的构造函数，
因为它支持设置文字代码。

The elements of the `localizationsDelegates` list are factories that produce
collections of localized values. `GlobalMaterialLocalizations.delegate`
provides localized strings and other values for the Material Components
library. `GlobalWidgetsLocalizations.delegate` defines the default
text direction, either left-to-right or right-to-left, for the widgets
library.

`localizationDelegates` 数组是用于生成本地化值集合的工厂。
`GlobalMaterialLocalizations.delegate` 为 Material 组件库
提供本地化的字符串和一些其他的值。
`GlobalWidgetsLocalizations.delegate` 为 widgets 库
定义了默认的文本排列方向，由左到右或者由右到左。

More information about these app properties, the types they
depend on, and how internationalized Flutter apps are typically
structured, can be found below.

想知道更多关于这些 app 属性，
它们依赖的类型以及那些国际化的 Flutter app 通常是如何组织的，
可以��续阅读下面内容。

<a name="advanced-locale"></a>
## Advanced locale definition

## 高级语言环境定义

Some languages with multiple variants require more than just a
language code to properly differentiate.

一些具有着多个变种的语言仅仅用语言代码是不能合适地区分的。

For example, fully differentiating all variants of
Chinese requires specifying the language code, script code,
and country code. This is due to the existence
of simplified and traditional script, as well as regional
differences in the way characters are written within the same script type.

例如，要能完全区分具有多个变种的中文需要指定语言代码、文字代码和国家代码。
这是因为存在着简体和繁体的文字系统，
而且同时使用相同文字系统写的字符又有地域性的差别。

In order to fully express every variant of Chinese for the
country codes `CN`, `TW`, and `HK`, the list of supported
locales should include:

为了让 `CN`，`TW` 和 `HK` 
三个不同的国家/地区代码能够完整地表达每个变种的中文，
你应该包括以下支持的语言环境:

<!-- skip -->
```dart
// Full Chinese support for CN, TW, and HK
supportedLocales: [
  const Locale.fromSubtags(languageCode: 'zh'), // generic Chinese 'zh'
  const Locale.fromSubtags(languageCode: 'zh', scriptCode: 'Hans'), // generic simplified Chinese 'zh_Hans'
  const Locale.fromSubtags(languageCode: 'zh', scriptCode: 'Hant'), // generic traditional Chinese 'zh_Hant'
  const Locale.fromSubtags(languageCode: 'zh', scriptCode: 'Hans', countryCode: 'CN'), // 'zh_Hans_CN'
  const Locale.fromSubtags(languageCode: 'zh', scriptCode: 'Hant', countryCode: 'TW'), // 'zh_Hant_TW'
  const Locale.fromSubtags(languageCode: 'zh', scriptCode: 'Hant', countryCode: 'HK'), // 'zh_Hant_HK'
],
```

This explicit full definition ensures that your app can
distinguish between and provide the fully nuanced localized
content to all combinations of these country codes.
If a user's preferred locale is not specified,
then the closest match is used instead,
which will likely contain differences to what the user expects.
Flutter only resolves to locales defined in `supportedLocales`.
Flutter provides scriptCode-differentiated
localized content for commonly used languages.
See [`Localizations`][] for information on how the supported
locales and the preferred locales are resolved.

这种明确完整的定义可以确保你的 app 能够区分
以及提供完全地道的本地内容给这些国家/地区代码的所有组合的用户。
如果用户没有指定首选的语言环境，那么我们就会使用最近的匹配，
这很可能与用户的期望会有差异。
Flutter 只会解析定义在 `supportedLocales` 里面的语言环境。
对于那些常用语言，Flutter 为本地化内容提供了文字代码级别的区分。
查看 [`Localizations`][] 了解 Flutter 是如何
解析支持的语言环境和首选的语言环境的。

Although Chinese is a primary example,
other languages like French (fr_FR, fr_CA)
should also be fully differentiated for more nuanced localization.

虽然中文是最主要的一个示例，
但是其他语言如法语（FR_fr，FR_ca 等等）也应该为了更细致的本地化而做完全的区分。

<a name="tracking-locale"></a>

## Tracking the locale: The Locale class and the Localizations widget

## 获取语言环境：Locale 类和 Localizations Widget

The [`Locale`][] class identifies the user's language.
Mobile devices support setting the locale for all applications,
usually using a system settings menu.
Internationalized apps respond by displaying values that are
locale-specific. For example, if the user switches the device's locale
from English to French, then a `Text` widget that originally
displayed "Hello World" would be rebuilt with "Bonjour le monde".

[`Locale`][] 类用来识别用户的语言。
移动设备支持为所有的应用设置语言环境，经常是通过系统设置菜单来进行操作。
设置完之后，国际化的 app 就会展示成对应特定语言环境的值。
例如，如果用户把设备的语��环境从英语切换到法语，
显示 "Hello World" 的文本 widget 会使用 "Bonjour le monde" 进行重建。

The [`Localizations`][widgets-global] widget defines the locale
for its child and the localized resources that the child depends on.
The [`WidgetsApp`][] widget creates a `Localizations` widget
and rebuilds it if the system's locale changes.

[`Localizations`][widgets-global]
widget 定义了它的子节点的语言环境和依赖的本地化的资源。
[`WidgetsApp`][] 创建了一个本地化的 widget，
如果系统的语言环境变化了，它会重建这个 widget。

You can always lookup an app's current locale with
`Localizations.localeOf()`:

你可以通过调用 `Localizations.localeOf()` 方法来查看 app 当前的语言环境。 

<!-- skip -->
```dart
Locale myLocale = Localizations.localeOf(context);
```

<a name="loading-and-retrieving"></a>
## Loading and retrieving localized values

## 加载和获取本地化值

The `Localizations` widget is used to load and lookup objects that
contain collections of localized values. Apps refer to these objects
with [`Localizations.of(context,type)`][].
If the device's locale changes,
the `Localizations` widget automatically loads values for
the new locale and then rebuilds widgets that used it.
This happens because `Localizations` works like an
[`InheritedWidget`][].
When a build function refers to an inherited widget,
an implicit dependency on the inherited widget is created.
When an inherited widget changes
(when the `Localizations` widget's locale changes),
its dependent contexts are rebuilt.

我们使用 Localizations widget 来加载和查询那些包含本地化值集合的对象。
app 通过调用 [`Localizations.of(context,type)`][] 来引用这些对象。
如果设备的语言环境变化了，Localizations widget 会自动地加载新的语言环境的值，
然后重建那些使用了语言环境的 widget。
这是因为 Localizations 像 [继承 widget][`InheritedWidget`] 一样执行。
当一个构建过程涉及到继承 widget，对继承 widget 的隐式依赖就创建了。
当一个继承 widget 变化了（即 Localizations widget 的语言环境变化），
它的依赖上下文就会被重建。

Localized values are loaded by the `Localizations` widget's
list of [`LocalizationsDelegate`][]s.
Each delegate must define an asynchronous [`load()`][]
method that produces an object that encapsulates a
collection of localized values.
Typically these objects define one method per localized value.

本地化的值是通过使用 Localizations widget 的 [`LocalizationsDelegate`] 加载的。
每一个 delegate 必须定义一个异步的 [`load()`][] 方法。
这个方法生成了一个封装本地化值的对象，
通常这些对象为每个本地化的值定义了一个方法。

In a large app, different modules or packages might be bundled with
their own localizations. That's why the `Localizations` widget
manages a table of objects, one per `LocalizationsDelegate`.
To retrieve the object produced by one of the `LocalizationsDelegate`'s
`load` methods, you specify a `BuildContext` and the object's type.

在一个大型的 app 中，
不同的模块或者 package 需要和它们对应的本地化资源打包在一起。
这就是为什么 `Localizations` widget 管理着对象的一个对应表，
每个 `LocalizationsDelegate` 对应一个对象。
为了获得由 `LocalizationsDelegate` 的 `load` 方法生成的对象，
你需要指定一个构建上下文 (`BuildContext`) 和对象的类型。

For example,
the localized strings for the Material Components widgets
are defined by the [`MaterialLocalizations`][] class.
Instances of this class are created by a `LocalizationDelegate`
provided by the [`MaterialApp`][] class.
They can be retrieved with `Localizations.of()`:

例如，Material 组件 widget 的本地化字符串是由 [`MaterialLocalizations`][]
类定义的。这个类的实例是由 [[`MaterialApp`][] 
类提供的一个 `LocalizationDelegate` 方法创建的，
它们可以通过 `Localizations.of` 方法获得。

<!-- skip -->
```dart
Localizations.of<MaterialLocalizations>(context, MaterialLocalizations);
```

This particular `Localizations.of()` expression is used frequently,
so the `MaterialLocalizations` class provides a convenient shorthand:

因为这个特定的 `Localizations.of()` 表达式经常使用，
所以 `MaterialLocalizations` 类提供了一个快捷访问：

<!-- skip -->
```dart
static MaterialLocalizations of(BuildContext context) {
  return Localizations.of<MaterialLocalizations>(context, MaterialLocalizations);
}

/// References to the localized values defined by MaterialLocalizations
/// are typically written like this:

tooltip: MaterialLocalizations.of(context).backButtonTooltip,
```

<a name="using-bundles">
## Using the bundled Localizations&shy;Delegates

## 使用内置的 LocalizationsDelegates

To keep things as small and uncomplicated as possible,
the flutter package includes implementations of the
`MaterialLocalizations` and `WidgetsLocalizations`
interfaces that only provide US English values.
These implementation classes are called `DefaultMaterialLocalizations`
and `DefaultWidgetsLocalizations`, respectively.
They're included automatically unless a different delegate
of the same base type is specified with the app's
`localizationsDelegates` parameter.

Flutter package 包括的
`MaterialLocalizations` 和 `WidgetsLocalizations` 的接口都只提供美式英语的值，
这样使得它尽可能小而简单。
这些实现的类被分别称为
`DefaultMaterialLocalizations` 和 `DefaultWidgetsLocalizations`。
它们会被自动地引入程序，除非你在 `localizationsDelegates` 参数中，
相同的基本类型指定了一个不同的 delegate。

The `flutter_localizations` package includes multi-language
implementations of the localizations interfaces called
[`GlobalMaterialLocalizations`][material-global] and
[`GlobalWidgetsLocalizations`][widgets-global].
International apps must specify localization delegates for
these classes as described in [Setting up an internationalized app][].

flutter_localizations package 包括了多种语言本地化接口的实现，它们称为 
[`GlobalMaterialLocalizations`][material-global] 和
[`GlobalWidgetsLocalizations`][widgets-global]。
国际化 app 必须为这些类的指定本地化 delegate，
就如在 [配置一个国际化的 app](#setting-up) 中描述的那样。

<!-- skip -->
```dart
import 'package:flutter_localizations/flutter_localizations.dart';

MaterialApp(
 localizationsDelegates: [
   // ... app-specific localization delegate[s] here
   GlobalMaterialLocalizations.delegate,
   GlobalWidgetsLocalizations.delegate,
 ],
 supportedLocales: [
    const Locale('en', ''), // English, no country code
    const Locale('he', ''), // Hebrew, no country code
    const Locale('zh', ''), // Chinese, no country code
    // ... other locales the app supports
  ],
  // ...
)
```

The global localization delegates construct locale-specific instances
of the corresponding classes. For example,
`GlobalMaterialLocalizations.delegate` is a `LocalizationsDelegate`
that produces an instance of `GlobalMaterialLocalizations`.

全球本地化 delegate 构建了对应类在特定语言环境下的实例。
例如，`GlobalMaterialLocalizations.delegate` 就是一个本地化 delegate，
它用来产生一个 GlobalMaterialLocalizations 的实例。

As of February 2020, the global localization classes support
[77 languages][].

截至 2020 年 2 月，这个全球本地化类一共支持 [大约 77 种语言][77 languages]。
<a name="defining-class"></a>
## Defining a class for the app's localized resources

## 为 app 的本地化资源定义一个类

Putting all of this together for an internationalized app usually
starts with the class that encapsulates the app's localized values.
The example that follows is typical of such classes.

综合所有这些在一起，一个需要国际化的 app 经常以一个封装 app 本地化值的类开始的。
下面是使用这种类的典型示例。

Complete source code for the [`intl_example`][] for this app.

此示例 app 的 [完整的源码][`intl_example`]。

This example is based on the APIs and tools provided by the
[`intl`][] package.
[An alternative class for the app's localized resources][]
describes [an example][] that doesn't depend on the `intl` package.

这个示例是基于 [`intl`][] package 提供的 API 和 工具开发的，
[app 本地化资源的替代方法][An alternative class for the app's localized resources]
里面讲解了一个不依赖于 intl package 的 [示例][an example]。

The `DemoLocalizations` class contains the app's strings
(just one for the example) translated into the locales
that the app supports.
It uses the `initializeMessages()` function
generated by Dart's [`intl`][] package,
[`Intl.message()`][], to look them up.

DemoLocalizations 类包含了 app 语言环境内支持的
已经翻译成了本地化语言的字符串（本例子只有一个）。
它通过调用由 Dart 的 [`intl`][] package 生成的
`initializeMessages()` 方法来加载翻译好的字符串，
然后使用 [`Intl.message()`][] 来查阅它们。

<!-- skip -->
```dart
class DemoLocalizations {
  DemoLocalizations(this.localeName);

  static Future<DemoLocalizations> load(Locale locale) {
    final String name = locale.countryCode.isEmpty ? locale.languageCode : locale.toString();
    final String localeName = Intl.canonicalizedLocale(name);
    return initializeMessages(localeName).then((_) {
      return DemoLocalizations(localeName);
    });
  }

  static DemoLocalizations of(BuildContext context) {
    return Localizations.of<DemoLocalizations>(context, DemoLocalizations);
  }

  final String localeName;

  String get title {
    return Intl.message(
      'Hello World',
      name: 'title',
      desc: 'Title for the Demo application',
      locale: localeName,
    );
  }
}
```

A class based on the `intl` package imports a generated
message catalog that provides the `initializeMessages()`
function and the per-locale backing store for `Intl.message()`.
The message catalog is produced by an [`intl` tool][]
that analyzes the source code for classes that contain
`Intl.message()` calls.  In this case that would just be the
`DemoLocalizations` class.

基于 `intl` package 的类引入了一个生成好的信息目录，
它提供了 `initializeMessage()` 方法和 `Intl.message()` 方法的
每个语言环境的备份存储。
[`intl` 工具](#dart-tools) 通过分析包含 `Intl.message()` 
调用类的源码生成这个信息目录。在当前情况下，
就是 DemoLocalizations 的类（包含了 `Intl.message()` 调用）。

<a name="specifying-supportedlocales"></a>
## Specifying the app's supported&shy;Locales parameter

## 具体说明 app 支持的语言环境参数

Although Flutter's flutter_localizations library includes support
for 77 languages, only English language translations are available
by default. It's up to the developer to decide exactly which languages
to support, since it wouldn't make sense for the toolkit
libraries to support a different set of locales than the app does.

虽然 Flutter 的 flutter_localizations 库能够支持大约 52 种语言，
但是默认只支持英语翻译。
这是因为应该由开发者决定到底要支持哪一种语言，
让工具库默认去支持和 app 不一样的语言环境是完全没有意义的。

The `MaterialApp` [`supportedLocales`][]
parameter limits locale changes. When the user changes the locale
setting on their device, the app's `Localizations` widget only
follows suit if the new locale is a member of the this list.
If an exact match for the device locale isn't found,
then the first supported locale with a matching [`languageCode`][]
is used. If that fails, then the first element of the
`supportedLocales` list is used.

MaterialApp 的 [`supportedLocales`][] 参数限制了语言环境的变化范围。
当用户在他们的设备切换语言环境的时候，
只有当新语言环境是 `supportedLocales` 列表项中之一时， 
app 的 `Localizations` widget 才会跟着一起变。
如果这个设备的语言环境不能被精确匹配，
[`languageCode`][] 相同的第一个支持的语言环境会被使用。
如果这个也失败了，那就会使用 `supportedLocales` 的第一个语言环境。

In terms of the previous DemoApp example, the app only accepts the
US English or French Canadian locales, and it substitutes US
English (the first locale in the list) for anything else.

以上面那个 DemoApp 例子来说，这个 app 仅接受美式英语或者加拿大法语的语言环境。
对于其他任何语言环境都是使用美式英语作为替代（因为它是列表当中的第一个）。

An app that wants to use a different "locale resolution"
method can provide a [`localeResolutionCallback`][].
For example, to have your app unconditionally accept
whatever locale the user selects:

如果一个 app 想要使用不同的语言环境解析方案，它可以提供一个 
[`localeResolutionCallback`][]，
例如，让你的 app 无条件的接受用户选择的任何语言环境：

<!-- skip -->
```dart
class DemoApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
       localeResolutionCallback: (Locale locale, Iterable<Locale> supportedLocales) {
         return locale;
       }
       // ...
    );
  }
}
```

<a name="alternative-class"></a>
## An alternative class for the app's localized resources

## app 本地化资源的替代方法

The previous DemoApp example was defined in terms of the Dart `intl`
package. Developers can choose their own approach for managing
localized values for the sake of simplicity or perhaps to integrate
with a different i18n framework.

之前的那个 DemoApp 示例是使用 Dart `intl` package 进行开发的。
为了更简便，或者和其他不同的 i18n 框架集成，
开发者可以选择他们自己的方法来管理本地化的值。

Complete source code for the [`minimal`][] app.

这个示例 APP 的 [完整代码][`minimal`]。

In this version of DemoApp the class that contains the app's
localizations, DemoLocalizations, includes all of its translations
directly in per language Maps.

在这个版本的 DemoApp 中，这个类包含了 app 的
localizations 和 DemoLocalizations，
并且直接将它所有的翻译放在每个语言的映射当中。

<!-- skip -->
```dart
class DemoLocalizations {
  DemoLocalizations(this.locale);

  final Locale locale;

  static DemoLocalizations of(BuildContext context) {
    return Localizations.of<DemoLocalizations>(context, DemoLocalizations);
  }

  static Map<String, Map<String, String>> _localizedValues = {
    'en': {
      'title': 'Hello World',
    },
    'es': {
      'title': 'Hola Mundo',
    },
  };

  String get title {
    return _localizedValues[locale.languageCode]['title'];
  }
}
```

In the minimal app the `DemoLocalizationsDelegate` is slightly
different. Its `load` method returns a [`SynchronousFuture`][]
because no asynchronous loading needs to take place.

在这个最小实现的 app 当中，DemoLocalizationDelegate 有一点不一样。
它的 `load` 方法返回了一个 [`SynchronousFuture`][]，因为不需要进行异步的加载。

<!-- skip -->
```dart
class DemoLocalizationsDelegate extends LocalizationsDelegate<DemoLocalizations> {
  const DemoLocalizationsDelegate();

  @override
  bool isSupported(Locale locale) => ['en', 'es'].contains(locale.languageCode);

  @override
  Future<DemoLocalizations> load(Locale locale) {
    return SynchronousFuture<DemoLocalizations>(DemoLocalizations(locale));
  }

  @override
  bool shouldReload(DemoLocalizationsDelegate old) => false;
}
```

<a name="adding-language"></a>
## Adding support for a new language

## 添加支持新的语言

An app that needs to support a language that's not included in
[`GlobalMaterialLocalizations`][] has to do some extra work:
it must provide about 70 translations ("localizations")
for words or phrases.

如果你要开发一个 app 需要支持的语言不在 [`GlobalMaterialLocalizations`][] 当中，
那就需要做一些额外的工作：它必须提供大概 70 个字和词的翻译（本地化）。

See the following for an example of how to add
support for the Belarusian language.

举个例子，我们将给大家展示如何支持白俄罗斯语。

A new `GlobalMaterialLocalizations` subclass defines the
localizations that the Material library depends on.
A new `LocalizationsDelegate` subclass, which serves
as factory for the `GlobalMaterialLocalizations` subclass,
must also be defined.

我们需要定义一个新的 `GlobalMaterialLocalizations` 子类，
它定义了 Material 库依赖的本地化资源。
同时，我们也必须定义一个新的 `LocalizationsDelegate` 子类，
它是给 `GlobalMaterialLocalizations` 子类作为一个工厂使用的。

Here's the source code for the complete [`add_language`][] example,
minus the actual Belarusian translations.

这是支持添加一种新语言的[一个完整例子的源码][`add_language`]，
相对实际上要翻译的白俄罗斯语数量，我们只翻译��部分。

The locale-specific `GlobalMaterialLocalizations` subclass
is called `BeMaterialLocalizations`,
and the `LocalizationsDelegate` subclass is
`_BeMaterialLocalizationsDelegate`.
The value of `BeMaterialLocalizations.delegate`
is an instance of the delegate, and is all
that's needed by an app that uses these localizations.

这个特定语言环境的 `GlobalMaterialLocalizations`
子类被称为 `BeMaterialLocalizations`，
`LocalizationsDelegate` 子类被称为 `_BeMaterialLocalizationsDelegate`。
`BeMaterialLocalizations.delegate` 是 delegate 的一个实例，
这就是 app 使用这些本地化所需要的全部。

The delegate class includes basic date and number format
localizations. All of the other localizations are defined by `String`
valued property getters in `BeMaterialLocalizations`, like this:

delegate 类包括基本的日期和数字格式的本地化。
其他所有的本地化是由 `BeMaterialLocalizations`
里面的字符串值属性的 getters 所定义的，
像下面这样：

<!-- skip -->
```dart
@override
String get backButtonTooltip => r'Back';

@override
String get cancelButtonLabel => r'CANCEL';

@override
String get closeButtonLabel => r'CLOSE';

// etc..
```

These are the English translations, of course.
To complete the job you need to change the return
value of each getter to an appropriate Belarusian string.

These are the English translations of course. To complete the job you 
need to change the return value of each getter to an appropriate 
Belarusian string.

当然，这些都是英语翻译。为了完成本地化操作，
你需要把每一个 getter 的返回值翻译成合适的白俄罗斯语字符。

The getters return "raw" Dart strings that have an r prefix,
like `r'About $applicationName'`,
because sometimes the strings contain variables with a `$` prefix.
The variables are expanded by parameterized localization methods:

像 `r'About $applicationName'` 一样，
这些带 r 前缀的 getters 返回的是原始的字符串，
因为有一些时候这些字符串会包含一些带有 `$` 前缀的变量。
通过调用带参数的本地化方法，这些变量会被替换：

<!-- skip -->
```dart
@override
String get aboutListTileTitleRaw => r'About $applicationName';

@override
String aboutListTileTitle(String applicationName) {
  final String text = aboutListTileTitleRaw;
  return text.replaceFirst(r'$applicationName', applicationName);
}
```

For more information about localization strings, see the
[flutter_localizations README][].

需要了解更多关于本地化字符串的内容，可以查看 [flutter_localizations README][]。

Once you've implemented your language-specific subclasses of
`GlobalMaterialLocalizations` and `LocalizationsDelegate`,
you just need to add the language and a delegate instance to your app.
Here's some code that sets the app's language to Belarusian and
adds the `BeMaterialLocalizations` delegate instance to the app's
`localizationsDelegates` list:

一旦你实现了指定语言的
`GlobalMaterialLocalizations` 和 `LocalizationsDelegate` 的子类，
你只需要给你的 app 添加此语言以及一个 delegate 的实例。
这里有一些代码展示了如何设置 app 的语言为白俄罗斯语以及如何给 app 的
`localizationsDelegates` 列表添加 `BeMaterialLocalizations` delegate 实例。

<!-- skip -->
```dart
MaterialApp(
  localizationsDelegates: [
    GlobalWidgetsLocalizations.delegate,
    GlobalMaterialLocalizations.delegate,
    BeMaterialLocalizations.delegate,
  ],
  supportedLocales: [
    const Locale('be', 'BY')
  ],
  home: ...
)
```

<a name="dart-tools"></a>
## Appendix: Using the Dart intl tools

## 附录：使用 Dart intl 工具

Before building an API using the Dart [`intl`][] package
you'll want to review the `intl` package's documentation.
Here's a summary of the process
for localizing an app that depends on the `intl` package.

在你使用 Dart [`intl`][] package 进行构建 API 之前，
你应该想要了解一下 `intl` package 的文档。

The demo app depends on a generated source file called
`l10n/messages_all.dart`, which defines all of the
localizable strings used by the app.

这个 demo app 依赖于一个生成的源文件，叫做 `l10n/messages_all.dart`，
这个文件定义了 app 使用的所有本地化的字符串。

Rebuilding `l10n/messages_all.dart` requires two steps.

重建 `l10n/messages_all.dart` 需要 2 步。

 1. With the app's root directory as the current directory,
    generate `l10n/intl_messages.arb` from `lib/main.dart`:
    
    在 app 的根目录，使用 `lib/main.dart` 生成 `l10n/intl_messages.arb`：

    ```terminal
    $ flutter pub run intl_translation:extract_to_arb --output-dir=lib/l10n lib/main.dart
    ```

    The `intl_messages.arb` file is a JSON format map with one entry for
    each `Intl.message()` function defined in `main.dart`. This
    file serves as a template for the English and Spanish translations,
    `intl_en.arb` and `intl_es.arb`.
    These translations are created by you, the developer.
    
    `intl_messages.arb` 是一个 JSON 格式的文件，
    每一个入口代表定义在 `main.dart` 里面的 `Intl.message()` 方法。
    `intl_en.arb` 和 `intl_es.arb` 分别作为英语和西班牙语翻译的模板。
    这些翻译是由你（开发者）来创建的。
    

 2. With the app's root directory as the current directory, generate
    `intl_messages_<locale>.dart` for each `intl_<locale>.arb` file and
    `intl_messages_all.dart`, which imports all of the messages files:
    
    在 app 的根目录，生成每个 `intl_<locale>.arb` 
    文件对应的 `intl_messages_<locale>.dart` 文件，
    以及 `intl_messages_all.dart` 文件，它引入了所有的信息文件。

    ```terminal
    $ flutter pub run intl_translation:generate_from_arb \
        --output-dir=lib/l10n --no-use-deferred-loading \
        lib/main.dart lib/l10n/intl_*.arb
    ```
    
    ***Windows does not support file name wildcarding.***
    Instead, list the .arb files that were generated by the `intl_translation:extract_to_arb` command.
    ```terminal
    $ flutter pub run intl_translation:generate_from_arb \
        --output-dir=lib/l10n --no-use-deferred-loading \
        lib/main.dart \
        lib/l10n/intl_en.arb lib/l10n/intl_fr.arb lib/l10n/intl_messages.arb
    ```

    The `DemoLocalizations` class uses the generated `initializeMessages()`
    function (defined in `intl_messages_all.dart`)
    to load the localized messages and `Intl.message()` to look them up.
    
    DemoLocalizations 类使用生成的 `initializeMessages()` 方法
    （该方法定义在 `intl_messages_all.dart` 文件）
    来加载本地化的信息，然后使用 `Intl.message()` 来查阅这些本地化的信息。

<a name="ios-specifics"></a>

## Appendix: Updating the iOS app bundle

## 附录：更新 iOS app 包

iOS applications define key application metadata,
including supported locales, in an `Info.plist` file
that is built into the application bundle.
To configure the locales supported by your app,
you'll need to edit this file.

iOS 应用在 `Info.plist` 文件当中定义了很多关键应用元数据，
其中就包括支持的语言环境，而这个文件是会被打包进应用包里面的。
为了配置 app 支持的语言环境，你需要编辑这个文件。

First, open your project's `ios/Runner.xcworkspace` Xcode
workspace file then, in the **Project Navigator**,
open the `Info.plist` file under the `Runner`
project's `Runner` folder.

首先，打开你项目的 Xcode 工作区文件 `ios/Runner.xcworkspace`，
在项目导航栏中，打开运行项目的对应运行文件夹下的 `Info.plist` 文件。

Next, select the **Information Property List** item,
select **Add Item** from the **Editor** menu,
then select **Localizations** from the pop-up menu.

下一步，选择 **Information Property List** 项，
从 *Editor* 菜单中选择 *Add Item*，
然后从弹出菜单中选择 **Localizations**。

Select and expand the newly-created `Localizations` item then,
for each locale your application supports,
add a new item and select the locale you wish to add
from the pop-up menu in the **Value** field.
This list should be consistent with the languages listed
in the [supportedLocales][] parameter.

选择和展开新创建的 `Localizations` 项，
对于应用需要支持的每个语言环境，
你需要添加一个新的项。然后点击 *Value* 域，
从弹出菜单当中选择你想要的语言环境。
这个列表应该和 [supportedLocales][]
参数当中的语言列表保持一致。

Once all supported locales have been added, save the file.

添加完所有支持的语言环境后，保存这个文件。

[77 languages]: {{site.api}}/flutter/flutter_localizations/GlobalMaterialLocalizations-class.html
[`add_language`]: {{site.github}}/flutter/website/tree/master/examples/internationalization/add_language/lib/main.dart
[An alternative class for the app's localized resources]: #alternative-class
[an example]: {{site.github}}/flutter/website/tree/master/examples/internationalization/minimal
[`intl_example`]: {{site.github}}/flutter/website/tree/master/examples/internationalization/intl_example
[flutter_localizations README]: {{site.github}}/flutter/flutter/blob/master/packages/flutter_localizations/lib/src/l10n/README.md
[`GlobalMaterialLocalizations`]: {{site.api}}/flutter/flutter_localizations/GlobalMaterialLocalizations-class.html
[`InheritedWidget`]: {{site.api}}/flutter/widgets/InheritedWidget-class.html
[Internationalization based on the `intl` package]: {{site.github}}/flutter/website/tree/master/examples/internationalization/intl_example
[`intl`]: {{site.pub-pkg}}/intl
[`intl` tool]: #dart-tools
[`Intl.message()`]: {{site.pub-api}}/intl/latest/intl/Intl/message.html
[`languageCode`]: {{site.api}}/flutter/dart-ui/Locale/languageCode.html
[`load()`]: {{site.api}}/flutter/widgets/LocalizationsDelegate/load.html
[`Locale`]: {{site.api}}/flutter/dart-ui/Locale-class.html
[`localeResolutionCallback`]: {{site.api}}/flutter/widgets/LocaleResolutionCallback.html
[`Localizations`]: {{site.api}}/flutter/widgets/WidgetsApp/supportedLocales.html
[`Localizations.of(context,type)`]: {{site.api}}/flutter/widgets/Localizations/of.html
[`LocalizationsDelegate`]: {{site.api}}/flutter/widgets/LocalizationsDelegate-class.html
[material-global]: {{site.api}}/flutter/flutter_localizations/GlobalMaterialLocalizations-class.html
[`MaterialApp`]: {{site.api}}/flutter/material/MaterialApp-class.html
[`MaterialLocalizations`]: {{site.api}}/flutter/material/MaterialLocalizations-class.html
[`minimal`]: {{site.github}}/flutter/website/tree/master/examples/internationalization/minimal
[Minimal internationalization]: {{site.github}}/flutter/website/tree/master/examples/internationalization/minimal
[Setting up an internationalized app]: #setting-up
[`SynchronousFuture`]: {{site.api}}/flutter/foundation/SynchronousFuture-class.html
[`supportedLocales`]: {{site.api}}/flutter/material/MaterialApp/supportedLocales.html
[supportedLocales]: #specifying-supportedlocales
[Using the Dart intl tools]: #dart-tools
[widgets-local]: {{site.api}}/flutter/widgets/Localizations-class.html
[widgets-global]: {{site.api}}/flutter/flutter_localizations/GlobalWidgetsLocalizations-class.html
[`WidgetsApp`]: {{site.api}}/flutter/widgets/WidgetsApp-class.html

