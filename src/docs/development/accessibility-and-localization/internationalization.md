---
title: Internationalizing Flutter apps
title: Flutter 应用里的国际化
short-title: i18n
description: How to internationalize your Flutter app.
tags: Flutter开发
keywords: 国际化
---

<?code-excerpt path-base="internationalization"?>

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
  you'll need to internationalize it. That means you need to write
  the app in a way that makes it possible to localize values like text
  and layouts for each language or locale that the app
  supports. Flutter provides widgets and classes that help with
  internationalization and the Flutter libraries themselves are
  internationalized.
  
  如果你的 app 会部署给说其他语言的用户使用，那么你就需要对它进行国际化。
  这就意味着你在编写 app 的时候，需要采用一种容易对它进行本地化的方式进行开发，
  这种方式让你能够为每一种语言或者 app 所支持的语言环境下的文本和布局等进行本地化。
  Flutter 提供了 widgets 和类来帮助开发者进行国际化，
  当然 Flutter 库本身就是国际化的。
  
  This page covers concepts and workflows necessary to localize a
  Flutter application using the `MaterialApp` and `CupertinoApp`
  classes, as most apps are written that way. However, applications
  written using the lower level `WidgetsApp` class can also
  be internationalized using the same classes and logic.
  
  由于大多数应用程序都是以这种方式编写的，
  因此该页面主要介绍了使用 `MaterialApp` 和 `CupertinoApp` 
  对 Flutter 应用程序进行本地化所需的概念和工作流程。 
  但是，使用较低级别的 `WidgetsApp` 类编写的应用程序
  也可以使用相同的类和逻辑进行国际化。

{{site.alert.secondary}}

  <h4 class="no_toc">Sample internationalized apps</h4>
  
  <h4 class="no_toc">国际化的 app 示例</h4>

  If you'd like to start out by reading the code for an internationalized
  Flutter app, here are two small examples. The first one is intended to
  be as simple as possible, and the second one uses the APIs and tools
  provided by the [`intl`][] package.
  If Dart's intl package is new to you,
  see [Using the Dart intl tools][].
  
  如果你想通过阅读已经国际化的 Flutter app 代码来开始的话，
  这里有两个小例子。第一个例子是一个尽可能简单的实现。
  第二个例子使用了 [`intl`][] package 提供的 API 和工具。
  如果你还不熟悉 Dart 的 intl 包，请查看
  [使用 Dart intl 工具][Using the Dart intl tools]。

  * [Minimal internationalization][]
    
    [最简单的国际化实现示例][Minimal internationalization]
    
  * [Internationalization based on the `intl` package][]
    
    [基于 `intl` package 的国际化实现示例][Internationalization based on the `intl` package]
  
{{site.alert.end}}

## Introduction to localizations in Flutter

## Flutter 应用本地化介绍

This section provides a tutorial on how to internationalize
a Flutter application, along with any additional setup that a
target platform might require.

本节主要介绍如何对 Flutter 应用进行国际化，以及针对目标平台需要设置的其他内容。

### Setting up an internation&shy;alized app: the Flutter<wbr>_localizations package {#setting-up}

### 配置一个国际化的 app：flutter_localizations package {#setting-up}

By default, Flutter only provides US English localizations.
To add support for other languages,
an application must specify additional `MaterialApp` (or `CupertinoApp`)
properties, and include a package called
`flutter_localizations`. As of November 2020,
this package supports 78 languages.

默认情况下，Flutter 只提供美式英语的本地化。
如果想要添加其他语言，你的应用必须指定额外的
`MaterialApp` 或者 `CupertinoApp` 属性并且
添加一个名为 `flutter_localizations` 的 package。
截至到 2020 年 11 月份，这个 package 已经支持大约 78 种语言。

To use flutter_localizations,
add the package as a dependency to your `pubspec.yaml` file:

想要使用 flutter_localizations 的话，
你需要在 `pubspec.yaml` 文件中添加它作为依赖：

<?code-excerpt "gen_l10n_example/pubspec.yaml (FlutterLocalizations)"?>
```yaml
dependencies:
  flutter:
    sdk: flutter
  flutter_localizations: # Add this line
    sdk: flutter         # Add this line
```

Next, run `pub get packages`, then import the `flutter_localizations` library and specify
`localizationsDelegates` and `supportedLocales` for `MaterialApp`:

下一步，先运行 `pub get packages`，然后引入 flutter_localizations 库，
然后为 MaterialApp 指定 `localizationsDelegates` 和 `supportedLocales`：

<?code-excerpt "gen_l10n_example/lib/main.dart (LocalizationDelegatesImport)"?>
```dart
import 'package:flutter_localizations/flutter_localizations.dart';
```

<?code-excerpt "gen_l10n_example/lib/main.dart (MaterialApp)" remove="AppLocalizations.delegate"?>
```dart
return MaterialApp(
  title: 'Localizations Sample App',
  localizationsDelegates: [
    GlobalMaterialLocalizations.delegate,
    GlobalWidgetsLocalizations.delegate,
    GlobalCupertinoLocalizations.delegate,
  ],
  supportedLocales: [
    const Locale('en', ''), // English, no country code
    const Locale('es', ''), // Spanish, no country code
  ],
  theme: ThemeData(
    primarySwatch: Colors.blue,
  ),
  home: MyHomePage(),
);
```

After introducing the `flutter_localizations` package
and adding the code above, the `Material` and `Cupertino`
packages should now be correctly localized in
one of the 78 supported locales. Widgets should be
adapted to the localized messages, along with
correct left-to-right and right-to-left layout.

Try switching the target platform's locale to
Spanish (`es`) and notice that the messages should
be localized.

引入 `flutter_localizations` package 并添加了上面的代码之后，
`Material` 和 `Cupertino` 包现在应该被正确地本地化为 78 个受支持的语言环境之一。
widget 应当与本地化信息保持同步，并具有正确的从左到右或从右到左的布局。 
您可以尝试将目标平台的语言环境切换为阿拉伯语（`ar`），
请注意应该对信息进行本地化，并且此时的 widget 应当以从右到左的布局排列。

Apps based on `WidgetsApp` are similar except that the
`GlobalMaterialLocalizations.delegate` isn't needed.

基于 `WidgetsApp` 构建的 app 在添加语言环境时，
除了 `GlobalMaterialLocalizations.delegate` 不需要之外，
其他的操作是类似的。

The full `Locale.fromSubtags` constructor is preferred
as it supports [`scriptCode`][], though the `Locale` default
constructor is still fully valid.

虽然 `语言环境 (Locale)` 默认的构造函数是完全没有问题的，
但是还是建议大家使用 `Locale.fromSubtags` 的构造函数，
因为它支持设置 [文字代码][`scriptCode`]。

[`scriptCode`]: {{site.api}}/flutter/package-intl_locale/Locale/scriptCode.html

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
可以继续阅读下面内容。

<a name="adding-localized-messages"></a>
### Adding your own localized messages

### 添加您自己的本地化信息

Once the `flutter_localizations` package is added, use the
following instructions to add localized text to your application.

引入 `flutter_localizations` package 后，
请按照以下说明将本地化的文本添加到您的应用程序。

1. Add the `intl` package to the `pubspec.yaml` file:

   将 `intl` package 添加到 `pubspec.yaml` 文件中：

{% comment %}
RegEx removes "# Add this line" from lines "flutter_localizations:" and "sdk: flutter"
{% endcomment %}
   <?code-excerpt "gen_l10n_example/pubspec.yaml (Intl)" replace="/(?<!0) # Add this line//g" ?>
   ```yaml
   dependencies:
     flutter:
       sdk: flutter
     flutter_localizations:
       sdk: flutter
     intl: ^0.17.0 # Add this line
   ```

2. Also, in the `pubspec.yaml` file, enable the `generate`
   flag. This is added to the section of the pubspec that is
   specific to Flutter, and usually comes later in the pubspec
   file.

   另外，在 `pubspec.yaml` 文件中，启用 `generate` 标志。
   该设置项添加在 pubspec 中 Flutter 部分，
   通常处在 pubspec 文件中后面的部分。

   <?code-excerpt "gen_l10n_example/pubspec.yaml (Generate)"?>
   ```yaml
   # The following section is specific to Flutter.
   flutter:
     generate: true # Add this line
   ```

3. Add a new yaml file to the root directory of the Flutter
   project called `l10n.yaml` with the following content:
   
   在 Flutter 项目的根目录中添加一个新的 yaml 文件，
   命名为 `l10n.yaml`，其内容如下：

   <?code-excerpt "gen_l10n_example/l10n.yaml"?>
   ```yaml
   arb-dir: lib/l10n
   template-arb-file: app_en.arb
   output-localization-file: app_localizations.dart
   ```

   This file configures the localization tool; in this example,
   the input files are located in `${FLUTTER_PROJECT}/lib/l10n`,
   the `app_en.arb` file provides the template, and the generated
   localizations are placed in the `app_localizations.dart` file.

   该文件用于配置本地化工具；在上面的示例中，指定输入文件在 
   `${FLUTTER_PROJECT}/lib/l10n` 中，`app_en.arb` 文件提供模板，
   生成的本地化文件在 `app_localizations.dart` 文件中。

4. In `${FLUTTER_PROJECT}/lib/l10n`,
   add the `app_en.arb` template file. For example:
   
   在 `${FLUTTER_PROJECT}/lib/l10n` 中，添加 `app_en.arb` 模板文件。如下：

   <?code-excerpt "gen_l10n_example/lib/l10n/app_en.arb"?>
   ```json
   {
       "helloWorld": "Hello World!",
       "@helloWorld": {
         "description": "The conventional newborn programmer greeting"
       }
   }
   ```

5. Next, add an `app_es.arb` file in the same directory for
   Spanish translation of the same message:
   
   接下来，在同一目录中添加一个 `app_es.arb` 文件，
   对同一条信息做西班牙语的翻译：

   <?code-excerpt "gen_l10n_example/lib/l10n/app_es.arb"?>
   ```json
   {
       "helloWorld": "Hola Mundo!"
   }
   ```

6. Now, run your app so that codegen takes place. You should see generated files in
   `${FLUTTER_PROJECT}/.dart_tool/flutter_gen/gen_l10n`.
   
   要测试本地化工具，可以运行您的应用程序。
   您将在 `${FLUTTER_PROJECT}/.dart_tool/flutter_gen/gen_l10n` 中看到生成的文件。

7. Add the import statement on `app_localizations.dart` and `AppLocalizations.delegate`
   in your call to the constructor for `MaterialApp`.

   在调用 `MaterialApp` 的构造函数时候，添加 `import` 语句，导入
   `app_localizations.dart` 和 `AppLocalizations.delegate`。
   
   <?code-excerpt "gen_l10n_example/lib/main.dart (AppLocalizationsImport)"?>
   ```dart
   import 'package:flutter_gen/gen_l10n/app_localizations.dart';
   ```

   <?code-excerpt "gen_l10n_example/lib/main.dart (MaterialApp)"?>
   ```dart
   return MaterialApp(
     title: 'Localizations Sample App',
     localizationsDelegates: [
       AppLocalizations.delegate, // Add this line
       GlobalMaterialLocalizations.delegate,
       GlobalWidgetsLocalizations.delegate,
       GlobalCupertinoLocalizations.delegate,
     ],
     supportedLocales: [
       const Locale('en', ''), // English, no country code
       const Locale('es', ''), // Spanish, no country code
     ],
     theme: ThemeData(
       primarySwatch: Colors.blue,
     ),
     home: MyHomePage(),
   );
   ```

8. Use AppLocalizations anywhere in your app.
   Here, the translated message is used in a Text widget.

   在你应用的任何地方，都使用 `AppLocalizations`，
   这里它被用于在 Text widget 里展示翻译过的消息。

   <?code-excerpt "gen_l10n_example/lib/examples.dart (Example)"?>
   ```dart
   Text(AppLocalizations.of(context)!.helloWorld);
   ```

9. You can also use the generated `localizationsDelegates` and `supportedLocales` list
   instead of providing them manually.

   您也可以使用生成的 `localizationsDelegates` 和 `supportedLocales` 列表，
   而不是手动提供它们。

   <?code-excerpt "gen_l10n_example/lib/examples.dart (MaterialAppExample)"?>
   ```dart
   MaterialApp(
     title: 'Localizations Sample App',
     localizationsDelegates: AppLocalizations.localizationsDelegates,
     supportedLocales: AppLocalizations.supportedLocales,
   );
   ```

   This code generates a Text widget that displays "Hello World!"
   if the target device's locale is set to English, and "Hola Mundo!"
   if the target device's locale is set to Spanish. In the `arb` files,
   the key of each entry is used as the method name of the getter,
   while the value of that entry contains the localized message.
   
   如果目标设备的语言环境设置为英语，
   此代码生成的 Text widget 会展示「Hello World!」。
   如果目标设备的语言环境设置为西班牙语，则展示「Hola Mundo!」，
   在 `arb` 文件中，每个条目的键值都被用作 getter 的方法名称，
   而该条目的值则表示本地化的信息。

To see a sample Flutter app using this tool, please see
[`gen_l10n_example`][].

要查看使用该工具的示例 Flutter 应用，请参阅 [`gen_l10n_example`][]。

To localize your device app description, you can pass in the localized
string into [`MaterialApp.onGenerateTitle`][]:

如需本地化设备应用描述，你可以将本地化后的字符串传递给
[`MaterialApp.onGenerateTitle`][]:

<?code-excerpt "intl_example/lib/main.dart (MaterialAppTitleExample)"?>
```dart
return MaterialApp(
  onGenerateTitle: (BuildContext context) => DemoLocalizations.of(context).title,
```

For more information about the localization tool,
such as dealing with DateTime and handling plurals,
see the [Internationalization User's Guide][].

有关本地化工具的更多信息，例如处理 DateTime 和复数，
请参见 [国际化用户指南][Internationalization User's Guide]。

<a name="ios-specifics"></a>
### Localizing for iOS: Updating the iOS app bundle

### iOS 本地化：更新 iOS app bundle

iOS applications define key application metadata,
including supported locales, in an `Info.plist` file
that is built into the application bundle.
To configure the locales supported by your app,
use the following instructions:

iOS 应用在内置于应用程序包中的 `Info.plist` 文件中
定义了关键的应用程序元数据，其中包括了受支持的语言环境，
要配置您的应用支持的语言环境，请按照以下步骤进行操作：

1. Open your project's `ios/Runner.xcworkspace` Xcode file.

   打开项目的 `ios/Runner.xcworkspace` Xcode 文件。

2. In the **Project Navigator**, open the `Info.plist` file
   under the `Runner` project's `Runner` folder.
   
   在 **Project Navigator** 中，打开 `Runner` 项目的 `Runner` 文件夹
   下的 `Info.plist` 文件。

3. Select the **Information Property List** item.
   Then select **Add Item** from the **Editor** menu,
   and select **Localizations** from the pop-up menu.
   
   选择 **Information Property List** 项。然后从 **Editor** 菜单中
   选择 **Add Item**，接着从弹出菜单中选择 **Localizations**。

4. Select and expand the newly-created `Localizations` item.
   For each locale your application supports,
   add a new item and select the locale you wish to add
   from the pop-up menu in the **Value** field.
   This list should be consistent with the languages listed
   in the [supportedLocales][] parameter.
   
   选择并展开新创建的 `Localizations` 项。对于您的应用程序支持的每种语言环境，
   请添加一个新项，然后从 **Value** 字段中的弹出菜单中选择要添加的语言环境。
   该列表应需要与 [supportedLocales][] 参数中列出的语言一致。

5. Once all supported locales have been added, save the file.

   添加所有受支持的语言环境后，保存文件。

<a name="advanced-customization">
## Advanced topics for further customization

## 定制的进阶操作

This section covers additional ways to customize a
localized Flutter application.

本节介绍自定义本地 Flutter 应用程序的其他方法。

<a name="advanced-locale"></a>
### Advanced locale definition

### 高级语言环境定义

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

<?code-excerpt "gen_l10n_example/lib/examples.dart (SupportedLocales)"?>
```dart
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
which likely contains differences to what the user expects.
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
other languages like French (`fr_FR`, `fr_CA`)
should also be fully differentiated for more nuanced localization.

虽然中文是最主要的一个示例，
但是其他语言如法语（`fr_FR`，`fr_CA` 等等）
也应该为了更细致的本地化而做完全的区分。

<a name="tracking-locale"></a>

### Tracking the locale: The Locale class and the Localizations widget

### 获取语言环境：Locale 类和 Localizations Widget

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
例如，如果用户把设备的语言环境从英语切换到法语，
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

<?code-excerpt "gen_l10n_example/lib/examples.dart (MyLocale)"?>
```dart
Locale myLocale = Localizations.localeOf(context);
```

<a name="specifying-supportedlocales"></a>
### Specifying the app's supported&shy;Locales parameter

Although the `flutter_localizations` library currently supports 78
languages and language variants, only English language translations
are available by default. It's up to the developer to decide exactly
which languages to support.

The `MaterialApp` [`supportedLocales`][]
parameter limits locale changes. When the user changes the locale
setting on their device, the app's `Localizations` widget only
follows suit if the new locale is a member of this list.
If an exact match for the device locale isn't found,
then the first supported locale with a matching [`languageCode`][]
is used. If that fails, then the first element of the
`supportedLocales` list is used.

An app that wants to use a different "locale resolution"
method can provide a [`localeResolutionCallback`][].
For example, to have your app unconditionally accept
whatever locale the user selects:

<?code-excerpt "gen_l10n_example/lib/examples.dart (LocaleResolution)"?>
```dart
MaterialApp(
  localeResolutionCallback: (
    Locale? locale,
    Iterable<Locale> supportedLocales,
  ) {
    return locale;
  },
);
```

## How internationalization in Flutter works

## Flutter 里的国际化是如何工作的

This section covers the technical details of how localizations work
in Flutter. If you're planning on supporting your own set of localized
messages, the following content would be helpful. Otherwise, you can
skip this section.

本节涵盖了 Flutter 中本地化工作的技术细节，
如果你计划使用自定的一套本地化消息，下面的内容会很有帮助。
反之则可以跳过本节。

<a name="loading-and-retrieving"></a>
### Loading and retrieving localized values

### 加载和获取本地化值

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


<a name="defining-class"></a>
### Defining a class for the app's localized resources

### 为 app 的本地化资源定义一个类

Putting together an internationalized Flutter app usually
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

<?code-excerpt "intl_example/lib/main.dart (DemoLocalizations)"?>
```dart
class DemoLocalizations {
  DemoLocalizations(this.localeName);

  static Future<DemoLocalizations> load(Locale locale) {
    final String name = locale.countryCode == null || locale.countryCode!.isEmpty
        ? locale.languageCode
        : locale.toString();
    final String localeName = Intl.canonicalizedLocale(name);

    return initializeMessages(localeName).then((_) {
      return DemoLocalizations(localeName);
    });
  }

  static DemoLocalizations of(BuildContext context) {
    return Localizations.of<DemoLocalizations>(context, DemoLocalizations)!;
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
[`intl` 工具][`intl` tool] 通过分析包含 `Intl.message()` 
调用类的源码生成这个信息目录。在当前情况下，
就是 DemoLocalizations 的类（包含了 `Intl.message()` 调用）。


<a name="adding-language"></a>
### Adding support for a new language

### 添加支持新的语言

An app that needs to support a language that's not included in
[`GlobalMaterialLocalizations`][] has to do some extra work:
it must provide about 70 translations ("localizations")
for words or phrases and the date patterns and symbols for the
locale.

如果你要开发一个 app 需要支持的语言不在 [`GlobalMaterialLocalizations`][] 当中，
那就需要做一些额外的工作：它必须提供大概 70 个字和词还有日期以及符号的翻译（本地化）。

See the following for an example of how to add
support for the Norwegian Nynorsk language.

举个例子，我们将给大家展示如何支持挪威尼诺斯克语。

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
minus the actual Nynorsk translations.

这是支持添加一种新语言的[一个完整例子的源码][`add_language`]，
相对实际上要翻译的尼诺斯克语数量，我们只翻译了一小部分。

The locale-specific `GlobalMaterialLocalizations` subclass
is called `NnMaterialLocalizations`,
and the `LocalizationsDelegate` subclass is
`_NnMaterialLocalizationsDelegate`.
The value of `NnMaterialLocalizations.delegate`
is an instance of the delegate, and is all
that's needed by an app that uses these localizations.

这个特定语言环境的 `GlobalMaterialLocalizations`
子类被称为 `NnMaterialLocalizations`，
`LocalizationsDelegate` 子类被称为 `_NnMaterialLocalizationsDelegate`。
`BeMaterialLocalizations.delegate` 是 delegate 的一个实例，
这就是 app 使用这些本地化所需要的全部。

The delegate class includes basic date and number format
localizations. All of the other localizations are defined by `String`
valued property getters in `NnMaterialLocalizations`, like this:

delegate 类包括基本的日期和数字格式的本地化。
其他所有的本地化是由 `BeMaterialLocalizations`
里面的字符串值属性的 getters 所定义的，
像下面这样：

<?code-excerpt "add_language/lib/nn_intl.dart (Getters)"?>
```dart
@override
String get moreButtonTooltip => r'More';

@override
String get aboutListTileTitleRaw => r'About $applicationName';

@override
String get alertDialogLabel => r'Alert';
```

These are the English translations, of course.
To complete the job you need to change the return
value of each getter to an appropriate Nynorsk string.

These are the English translations of course. To complete the job you 
need to change the return value of each getter to an appropriate 
Belarusian string.

当然，这些都是英语翻译。为了完成本地化操作，
你需要把每一个 getter 的返回值翻译成合适的尼诺斯克语字符。

The getters return "raw" Dart strings that have an r prefix,
like `r'About $applicationName'`,
because sometimes the strings contain variables with a `$` prefix.
The variables are expanded by parameterized localization methods:

像 `r'About $applicationName'` 一样，
这些带 r 前缀的 getters 返回的是原始的字符串，
因为有一些时候这些字符串会包含一些带有 `$` 前缀的变量。
通过调用带参数的本地化方法，这些变量会被替换：

<?code-excerpt "add_language/lib/nn_intl.dart (Raw)"?>
```dart
@override
String get pageRowsInfoTitleRaw => r'$firstRow–$lastRow of $rowCount';

@override
String get pageRowsInfoTitleApproximateRaw =>
    r'$firstRow–$lastRow of about $rowCount';
```

The date patterns and symbols of the locale will also need to
be specified. In the source code, the date patterns and symbols
are defined like this:

语言对应的日期格式和符号需要一并指定。
在源码中，它们会以下列形式进行定义：

{% comment %}
RegEx adds last two lines with commented out code and closing bracket.
{% endcomment %}
<?code-excerpt "add_language/lib/nn_intl.dart (Date)" replace="/  'LLL': 'LLL',/  'LLL': 'LLL',\n  \/\/ ...\n}/g"?>
```dart
const nnLocaleDatePatterns = {
  'd': 'd.',
  'E': 'ccc',
  'EEEE': 'cccc',
  'LLL': 'LLL',
  // ...
}
```

{% comment %}
RegEx adds last two lines with commented out code and closing bracket.
{% endcomment %}
<?code-excerpt "add_language/lib/nn_intl.dart (Date2)" replace="/  ],/  ],\n  \/\/ ...\n}/g"?>
```dart
const nnDateSymbols = {
  'NAME': 'nn',
  'ERAS': <dynamic>[
    'f.Kr.',
    'e.Kr.',
  ],
  // ...
}
```

These will need to be modified for the locale to use the correct
date formatting. Unfortunately, since the `intl` library does
not share the same flexibility for number formatting, the formatting
for an existing locale will have to be used as a substitute in
`_NnMaterialLocalizationsDelegate`:

上列内容需要修改以匹配语言的正确日期格式。
可惜的是，`intl` 并不具备数字格式的灵活性，
以至于 `_NnMaterialLocalizationsDelegate` 需要使用
现有的语言的格式作为替代方法：

<?code-excerpt "add_language/lib/nn_intl.dart (Delegate)"?>
```dart
class _NnMaterialLocalizationsDelegate
    extends LocalizationsDelegate<MaterialLocalizations> {
  const _NnMaterialLocalizationsDelegate();

  @override
  bool isSupported(Locale locale) => locale.languageCode == 'nn';

  @override
  Future<MaterialLocalizations> load(Locale locale) async {
    final String localeName = intl.Intl.canonicalizedLocale(locale.toString());

    // The locale (in this case `nn`) needs to be initialized into the custom
    // date symbols and patterns setup that Flutter uses.
    date_symbol_data_custom.initializeDateFormattingCustom(
      locale: localeName,
      patterns: nnLocaleDatePatterns,
      symbols: intl.DateSymbols.deserializeFromMap(nnDateSymbols),
    );

    return SynchronousFuture<MaterialLocalizations>(
      NnMaterialLocalizations(
        localeName: localeName,
        // The `intl` library's NumberFormat class is generated from CLDR data
        // (see https://github.com/dart-lang/intl/blob/master/lib/number_symbols_data.dart).
        // Unfortunately, there is no way to use a locale that isn't defined in
        // this map and the only way to work around this is to use a listed
        // locale's NumberFormat symbols. So, here we use the number formats
        // for 'en_US' instead.
        decimalFormat: intl.NumberFormat('#,##0.###', 'en_US'),
        twoDigitZeroPaddedFormat: intl.NumberFormat('00', 'en_US'),
        // DateFormat here will use the symbols and patterns provided in the
        // `date_symbol_data_custom.initializeDateFormattingCustom` call above.
        // However, an alternative is to simply use a supported locale's
        // DateFormat symbols, similar to NumberFormat above.
        fullYearFormat: intl.DateFormat('y', localeName),
        compactDateFormat: intl.DateFormat('yMd', localeName),
        shortDateFormat: intl.DateFormat('yMMMd', localeName),
        mediumDateFormat: intl.DateFormat('EEE, MMM d', localeName),
        longDateFormat: intl.DateFormat('EEEE, MMMM d, y', localeName),
        yearMonthFormat: intl.DateFormat('MMMM y', localeName),
        shortMonthDayFormat: intl.DateFormat('MMM d'),
      ),
    );
  }

  @override
  bool shouldReload(_NnMaterialLocalizationsDelegate old) => false;
}
```

For more information about localization strings, see the
[flutter_localizations README][].

需要了解更多关于本地化字符串的内容，可以查看 [flutter_localizations README][]。

Once you've implemented your language-specific subclasses of
`GlobalMaterialLocalizations` and `LocalizationsDelegate`,
you just need to add the language and a delegate instance to your app.
Here's some code that sets the app's language to Nynorsk and
adds the `NnMaterialLocalizations` delegate instance to the app's
`localizationsDelegates` list:

一旦你实现了指定语言的
`GlobalMaterialLocalizations` 和 `LocalizationsDelegate` 的子类，
你只需要给你的 app 添加此语言以及一个 delegate 的实例。
这里有一些代码展示了如何设置 app 的语言为尼诺斯克语以及如何给 app 的
`localizationsDelegates` 列表添加 `NnMaterialLocalizations` delegate 实例。

<?code-excerpt "add_language/lib/main.dart (MaterialApp)"?>
```dart
MaterialApp(
  localizationsDelegates: [
    GlobalWidgetsLocalizations.delegate,
    GlobalMaterialLocalizations.delegate,
    NnMaterialLocalizations.delegate, // Add the newly created delegate
  ],
  supportedLocales: [
    const Locale('en', 'US'),
    const Locale('nn'),
  ],
  home: Home(),
),
```

<a name="alternative-internationalization-workflows">
## Alternative internationalization workflows
  
## 其他的国际化方法

This section describes different approaches to internationalize
your Flutter application.

本节主要介绍国际化 Flutter 应用的不同方法。

<a name="alternative-class"></a>
### An alternative class for the app's localized resources

### 应用程序本地化资源的替代类

The previous DemoApp example was defined in terms of the Dart `intl`
package. Developers can choose their own approach for managing
localized values for the sake of simplicity or perhaps to integrate
with a different i18n framework.

之前的 DemoApp 示例应用主要根据 Dart `intl` package 定义，为了简单起见，
或者可能想要与不同的 i18n 框架集成，开发者也可以选择自己的方法来管理本地化的值。

Complete source code for the [`minimal`][] app.

点击查看 [`minimal`][] 应用的完整源代码。

In this version of DemoApp the class that contains the app's
localizations, DemoLocalizations, includes all of its translations
directly in per language Maps.

在该版本的 DemoApp 中，包含应用程序本地化版本的类 DemoLocalizations 
直接在每种语言的 Map 中包括了所有的翻译。

<?code-excerpt "minimal/lib/main.dart (Demo)"?>
```dart
class DemoLocalizations {
  DemoLocalizations(this.locale);

  final Locale locale;

  static DemoLocalizations of(BuildContext context) {
    return Localizations.of<DemoLocalizations>(context, DemoLocalizations)!;
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
    return _localizedValues[locale.languageCode]!['title']!;
  }
}
```

In the minimal app the `DemoLocalizationsDelegate` is slightly
different. Its `load` method returns a [`SynchronousFuture`][]
because no asynchronous loading needs to take place.

在 minimal 应用中，`DemoLocalizationsDelegate` 略有不同，
它的 `load` 方法返回一个 [`SynchronousFuture`][]，因为不需要进行异步加载。

<?code-excerpt "minimal/lib/main.dart (Delegate)"?>
```dart
class DemoLocalizationsDelegate extends LocalizationsDelegate<DemoLocalizations> {
  const DemoLocalizationsDelegate();

  @override
  bool isSupported(Locale locale) => ['en', 'es'].contains(locale.languageCode);

  @override
  Future<DemoLocalizations> load(Locale locale) {
    // Returning a SynchronousFuture here because an async "load" operation
    // isn't needed to produce an instance of DemoLocalizations.
    return SynchronousFuture<DemoLocalizations>(DemoLocalizations(locale));
  }

  @override
  bool shouldReload(DemoLocalizationsDelegate old) => false;
}
```

<a name="dart-tools"></a>
### Using the Dart intl tools

### 附录：使用 Dart intl 工具

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
    Instead, list the .arb files that were generated by the
    `intl_translation:extract_to_arb` command.

    **Windows 系统不支持文件名通配符**。
    列出的 `.arb` 文件是由 `intl_translation:extract_to_arb` 命令生成的。

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

[78 languages]: {{site.api}}/flutter/flutter_localizations/GlobalMaterialLocalizations-class.html
[`add_language`]: {{site.github}}/flutter/website/tree/master/null_safety_examples/internationalization/add_language/lib/main.dart
[An alternative class for the app's localized resources]: #alternative-class
[an example]: {{site.github}}/flutter/website/tree/master/null_safety_examples/internationalization/minimal
[`intl_example`]: {{site.github}}/flutter/website/tree/master/null_safety_examples/internationalization/intl_example
[`gen_l10n_example`]: {{site.github}}/flutter/website/tree/master/null_safety_examples/internationalization/gen_l10n_example
[flutter_localizations README]: {{site.github}}/flutter/flutter/blob/master/packages/flutter_localizations/lib/src/l10n/README.md
[`GlobalMaterialLocalizations`]: {{site.api}}/flutter/flutter_localizations/GlobalMaterialLocalizations-class.html
[`InheritedWidget`]: {{site.api}}/flutter/widgets/InheritedWidget-class.html
[Internationalization based on the `intl` package]: {{site.github}}/flutter/website/tree/master/null_safety_examples/internationalization/intl_example
[Internationalization User's Guide]: /go/i18n-user-guide
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
[`MaterialApp.onGenerateTitle`]: {{site.api}}/flutter/material/MaterialApp/onGenerateTitle.html
[`MaterialLocalizations`]: {{site.api}}/flutter/material/MaterialLocalizations-class.html
[`minimal`]: {{site.github}}/flutter/website/tree/master/null_safety_examples/internationalization/minimal
[Minimal internationalization]: {{site.github}}/flutter/website/tree/master/null_safety_examples/internationalization/minimal
[Setting up an internationalized app]: #setting-up
[`SynchronousFuture`]: {{site.api}}/flutter/foundation/SynchronousFuture-class.html
[`supportedLocales`]: {{site.api}}/flutter/material/MaterialApp/supportedLocales.html
[supportedLocales]: #specifying-supportedlocales
[Using the Dart intl tools]: #dart-tools
[widgets-local]: {{site.api}}/flutter/widgets/Localizations-class.html
[widgets-global]: {{site.api}}/flutter/flutter_localizations/GlobalWidgetsLocalizations-class.html
[`WidgetsApp`]: {{site.api}}/flutter/widgets/WidgetsApp-class.html