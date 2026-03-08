---
# title: Advanced UI features
title: 高级 UI 特性
# description: >-
#   A gentle introduction into advanced UI features:
#   adaptive layouts, slivers, scrolling, navigation.
description: >-
  高级 UI 特性的入门介绍：
  自适应布局、sliver、滚动和导航。
layout: tutorial
---

Preview the Rolodex app you'll build and set up a Cupertino-based project with data models.

预览你将构建的 Rolodex 应用，并使用数据模型搭建一个基于 Cupertino 的项目。

<SummaryCard>
title: What you'll accomplish
items:
  - title: Preview the Rolodex app you'll build
    icon: preview
  - title: Set up a project with Cupertino widgets
    icon: phone_iphone
  - title: Create data models for contacts and groups
    icon: data_object
</SummaryCard>

---

### Introduction

### 简介

In this third installment of the Flutter tutorial series,
you'll use Flutter's Cupertino library to build a
partial clone of the iOS Contacts app.

在 Flutter 教程系列的第三部分中，
你将使用 Flutter 的 Cupertino 库来构建一个
iOS 通讯录应用的部分克隆版本。

<img src='/assets/images/docs/tutorial/rolodex_complete.png' class="diagram-wrap"
width="320px" alt="A screenshot of the completed Rolodex contact
management app showing a list of contacts organized alphabetically.">

By the end of this tutorial, you'll have learned how to create
adaptive layouts, implement comprehensive theming, build navigation
patterns, and use advanced scrolling techniques.

在本教程结束时，你将学会如何创建
自适应布局、实现全面的主题定制、构建导航
模式，以及使用高级滚动技术。

#### What you'll learn

#### 你将学到什么

This tutorial explores the following topics:

本教程将探讨以下主题：

* Building responsive layouts with `LayoutBuilder`.

  使用 `LayoutBuilder` 构建响应式布局。

* Using advanced scrolling with slivers and search.

  使用 sliver 和搜索实现高级滚动。

* Implementing stack-based navigation patterns.

  实现基于栈的导航模式。

* Creating comprehensive themes with `CupertinoThemeData`.

  使用 `CupertinoThemeData` 创建全面的主题。

* Supporting both light and dark themes.

  同时支持浅色和深色主题。

* Creating an iOS-style UI using Cupertino widgets.

  使用 Cupertino widget 创建 iOS 风格的 UI。

This tutorial assumes that you've completed the previous Flutter tutorials
and are comfortable with basic widget composition, state management,
and the Flutter project structure.

本教程假设你已经完成了之前的 Flutter 教程，
并且熟悉基本的 widget 组合、状态管理
以及 Flutter 项目结构。


### Create a new Flutter project

### 创建一个新的 Flutter 项目

To build a Flutter app, you first need a Flutter project.
You can create a new app with the [Flutter CLI tool][],
which is installed as part of the Flutter SDK.

要构建一个 Flutter 应用，你首先需要一个 Flutter 项目。
你可以使用 [Flutter CLI 工具][Flutter CLI tool] 来创建新应用，
它作为 Flutter SDK 的一部分被安装。

Open your preferred terminal and run
the following command to create a new Flutter project:

打开你常用的终端，运行以下命令来创建一个新的 Flutter 项目：

```console
$ flutter create rolodex --empty
```

This command creates a new Flutter project that
uses the minimal "empty" template.

此命令会使用精简的 "empty" 模板创建一个新的 Flutter 项目。

[Flutter CLI tool]: /reference/flutter-cli

### Add the Cupertino Icons dependency

### 添加 Cupertino Icons 依赖

This project uses the [`cupertino_icons` package][],
an official Flutter package.
Add it as a dependency by running the following command:

本项目使用 [`cupertino_icons` package][]，
这是一个官方的 Flutter package。
运行以下命令将其添加为依赖：

```console
$ flutter pub add cupertino_icons
```

### Set up the project structure

### 搭建项目结构

First, create the basic directory structure for your app.
In your project's `lib` directory, create the following folders:

首先，为你的应用创建基本的目录结构。
在项目的 `lib` 目录中，创建以下文件夹：

```console
$ cd rolodex
$ mkdir lib/data lib/screens lib/theme
```

This command creates folders to organize your code into logical sections:
data models, screen widgets, and theme configuration.

此命令会创建文件夹，将你的代码组织为逻辑分区：
数据模型、屏幕 widget 和主题配置。

### Replace the starter code

### 替换初始代码

In your IDE, open the `lib/main.dart` file, and replace its entire
contents with the following starter code:

在你的 IDE 中，打开 `lib/main.dart` 文件，
将其全部内容替换为以下初始代码：

```dart title="lib/main.dart"
import 'package:flutter/cupertino.dart';

void main() {
  runApp(const RolodexApp());
}

class RolodexApp extends StatelessWidget {
  const RolodexApp({super.key});

  @override
  Widget build(BuildContext context) {
    return const CupertinoApp(
      title: 'Rolodex',
      theme: CupertinoThemeData(
        barBackgroundColor: CupertinoDynamicColor.withBrightness(
          color: Color(0xFFF9F9F9),
          darkColor: Color(0xFF1D1D1D),
        ),
      ),
      home: CupertinoPageScaffold(
        child: Center(
          child: Text('Hello Rolodex!'),
        ),
      ),
    );
  }
}
```

Unlike the previous two tutorials,
this app uses `CupertinoApp` instead of `MaterialApp`.
The Cupertino design system provides iOS-style widgets and styling,
which is perfect for building apps that feel native on Apple devices.

与前两个教程不同，
此应用使用 `CupertinoApp` 而非 `MaterialApp`。
Cupertino 设计系统提供了 iOS 风格的 widget 和样式，
非常适合构建在 Apple 设备上具有原生体验的应用。

### Run your app

### 运行你的应用

In your terminal at the root of your Flutter app, run the following command:

在 Flutter 应用的根目录下，在终端中运行以下命令：

```console
$ flutter run -d chrome
```

The app builds and launches in a new instance of Chrome.
It displays "Hello Rolodex!" in the center of the screen.

应用会构建并在新的 Chrome 实例中启动。
屏幕中央会显示 "Hello Rolodex!"。

### Create the data models

### 创建数据模型

Before building the UI,
create the data structures and sample data that the app will use.
This section is lightly explained because it's not the focus of this tutorial.

在构建 UI 之前，
先创建应用将使用的数据结构和示例数据。
本节只做简要说明，因为这不是本教程的重点。

#### `Contact` data

#### `Contact` 数据

Create a new file, `lib/data/contact.dart`, and add the basic `Contact` class:

创建一个新文件 `lib/data/contact.dart`，并添加基本的 `Contact` 类：

```dart foldable title="lib/data/contact.dart"
class Contact {
  Contact({
    required this.id,
    required this.firstName,
    this.middleName,
    required this.lastName,
    this.suffix,
  });

  final int id;
  final String firstName;
  final String lastName;
  final String? middleName;
  final String? suffix;
}

[* -
final johnAppleseed = Contact(id: 0, firstName: 'John', lastName: 'Appleseed');
final kateBell = Contact(id: 1, firstName: 'Kate', lastName: 'Bell');
final annaHaro = Contact(id: 2, firstName: 'Anna', lastName: 'Haro');
final danielHiggins = Contact(
  id: 3,
  firstName: 'Daniel',
  lastName: 'Higgins',
  suffix: 'Jr.',
);
final davidTaylor = Contact(id: 4, firstName: 'David', lastName: 'Taylor');
final hankZakroff = Contact(
  id: 5,
  firstName: 'Hank',
  middleName: 'M.',
  lastName: 'Zakroff',
);

final alexAnderson = Contact(id: 6, firstName: 'Alex', lastName: 'Anderson');
final benBrown = Contact(id: 7, firstName: 'Ben', lastName: 'Brown');
final carolCarter = Contact(id: 8, firstName: 'Carol', lastName: 'Carter');
final dianaDevito = Contact(id: 9, firstName: 'Diana', lastName: 'Devito');
final emilyEvans = Contact(id: 10, firstName: 'Emily', lastName: 'Evans');
final frankFisher = Contact(id: 11, firstName: 'Frank', lastName: 'Fisher');
final graceGreen = Contact(id: 12, firstName: 'Grace', lastName: 'Green');
final henryHall = Contact(id: 13, firstName: 'Henry', lastName: 'Hall');
final isaacIngram = Contact(id: 14, firstName: 'Isaac', lastName: 'Ingram');
final juliaJackson = Contact(id: 15, firstName: 'Julia', lastName: 'Jackson');
final kevinKelly = Contact(id: 16, firstName: 'Kevin', lastName: 'Kelly');
final lindaLewis = Contact(id: 17, firstName: 'Linda', lastName: 'Lewis');
final michaelMiller = Contact(id: 18, firstName: 'Michael', lastName: 'Miller');
final nancyNewman = Contact(id: 19, firstName: 'Nancy', lastName: 'Newman');
final oliverOwens = Contact(id: 20, firstName: 'Oliver', lastName: 'Owens');
final penelopeParker = Contact(
  id: 21,
  firstName: 'Penelope',
  lastName: 'Parker',
);
final quentinQuinn = Contact(id: 22, firstName: 'Quentin', lastName: 'Quinn');
final rachelReed = Contact(id: 23, firstName: 'Rachel', lastName: 'Reed');
final samuelSmith = Contact(id: 24, firstName: 'Samuel', lastName: 'Smith');
final tessaTurner = Contact(id: 25, firstName: 'Tessa', lastName: 'Turner');
final umbertoUpton = Contact(id: 26, firstName: 'Umberto', lastName: 'Upton');
final victoriaVance = Contact(id: 27, firstName: 'Victoria', lastName: 'Vance');
final williamWilson = Contact(id: 28, firstName: 'William', lastName: 'Wilson');
final xavierXu = Contact(id: 29, firstName: 'Xavier', lastName: 'Xu');
final yasmineYoung = Contact(id: 30, firstName: 'Yasmine', lastName: 'Young');
final zacharyZimmerman = Contact(
  id: 31,
  firstName: 'Zachary',
  lastName: 'Zimmerman',
);
final elizabethMJohnson = Contact(
  id: 32,
  firstName: 'Elizabeth',
  middleName: 'M.',
  lastName: 'Johnson',
);
final robertLWilliamsSr = Contact(
  id: 33,
  firstName: 'Robert',
  middleName: 'L.',
  lastName: 'Williams',
  suffix: 'Sr.',
);
final margaretAnneDavis = Contact(
  id: 34,
  firstName: 'Margaret',
  middleName: 'Anne',
  lastName: 'Davis',
);
final williamJamesBrownIII = Contact(
  id: 35,
  firstName: 'William',
  middleName: 'James',
  lastName: 'Brown',
  suffix: 'III',
);
final maryElizabethClark = Contact(
  id: 36,
  firstName: 'Mary',
  middleName: 'Elizabeth',
  lastName: 'Clark',
);
final drSarahWatson = Contact(
  id: 37,
  firstName: 'Dr. Sarah',
  lastName: 'Watson',
);
final jamesRSmithEsq = Contact(
  id: 38,
  firstName: 'James',
  middleName: 'R.',
  lastName: 'Smith',
  suffix: 'Esq.',
);
final mariaCruz = Contact(id: 39, firstName: 'Maria', lastName: 'Cruz');
final pierreMartin = Contact(id: 40, firstName: 'Pierre', lastName: 'Martin');
final yukiTanaka = Contact(id: 41, firstName: 'Yuki', lastName: 'Tanaka');
final hansSchmidt = Contact(id: 42, firstName: 'Hans', lastName: 'Schmidt');
final priyaPatel = Contact(id: 43, firstName: 'Priya', lastName: 'Patel');
final carlosGarcia = Contact(id: 44, firstName: 'Carlos', lastName: 'Garcia');
final ninaVolkova = Contact(id: 45, firstName: 'Nina', lastName: 'Volkova');
final jenniferAdams = Contact(id: 46, firstName: 'Jennifer', lastName: 'Adams');
final michaelBaker = Contact(id: 47, firstName: 'Michael', lastName: 'Baker');
final sarahCooper = Contact(id: 48, firstName: 'Sarah', lastName: 'Cooper');
final christopherDaniel = Contact(
  id: 49,
  firstName: 'Christopher',
  lastName: 'Daniel',
);
final jessicaEdwards = Contact(
  id: 50,
  firstName: 'Jessica',
  lastName: 'Edwards',
);
*]

[* -
final Set<Contact> allContacts = <Contact>{
  johnAppleseed,
  kateBell,
  annaHaro,
  danielHiggins,
  davidTaylor,
  hankZakroff,
  alexAnderson,
  benBrown,
  carolCarter,
  dianaDevito,
  emilyEvans,
  frankFisher,
  graceGreen,
  henryHall,
  isaacIngram,
  juliaJackson,
  kevinKelly,
  lindaLewis,
  michaelMiller,
  nancyNewman,
  oliverOwens,
  penelopeParker,
  quentinQuinn,
  rachelReed,
  samuelSmith,
  tessaTurner,
  umbertoUpton,
  victoriaVance,
  williamWilson,
  xavierXu,
  yasmineYoung,
  zacharyZimmerman,
  elizabethMJohnson,
  robertLWilliamsSr,
  margaretAnneDavis,
  williamJamesBrownIII,
  maryElizabethClark,
  drSarahWatson,
  jamesRSmithEsq,
  mariaCruz,
  pierreMartin,
  yukiTanaka,
  hansSchmidt,
  priyaPatel,
  carlosGarcia,
  ninaVolkova,
  jenniferAdams,
  michaelBaker,
  sarahCooper,
  christopherDaniel,
  jessicaEdwards,
};
*]
```

This sample data includes contacts with and without middle names and suffixes.
This gives you a variety of data to work with as you build the UI.

这些示例数据包含有中间名和后缀的联系人，也有没有的。
这为你在构建 UI 时提供了多样化的数据。

#### `ContactGroup` data

#### `ContactGroup` 数据

Now, create the contact groups that organize your contacts into lists.
Create a new `lib/data/contact_group.dart` file and
add the `ContactGroup` class:

现在，创建联系人分组来将你的联系人组织为列表。
创建一个新的 `lib/data/contact_group.dart` 文件，
并添加 `ContactGroup` 类：

```dart title="lib/data/contact_group.dart"
import 'dart:collection';
import 'package:flutter/cupertino.dart';
import 'contact.dart';

class ContactGroup {
  factory ContactGroup({
    required int id,
    required String label,
    bool permanent = false,
    String? title,
    List<Contact>? contacts,
  }) {
    final contactsCopy = contacts ?? <Contact>[];
    _sortContacts(contactsCopy);
    return ContactGroup._internal(
      id: id,
      label: label,
      permanent: permanent,
      title: title,
      contacts: contactsCopy,
    );
  }

  ContactGroup._internal({
    required this.id,
    required this.label,
    this.permanent = false,
    String? title,
    List<Contact>? contacts,
  })  : title = title ?? label,
        _contacts = contacts ?? const <Contact>[];

  final int id;
  final bool permanent;
  final String label;
  final String title;
  final List<Contact> _contacts;

  List<Contact> get contacts => _contacts;

  AlphabetizedContactMap get alphabetizedContacts {
    final AlphabetizedContactMap contactsMap = AlphabetizedContactMap();
    for (final Contact contact in _contacts) {
      final String lastInitial = contact.lastName[0].toUpperCase();
      if (contactsMap.containsKey(lastInitial)) {
        contactsMap[lastInitial]!.add(contact);
      } else {
        contactsMap[lastInitial] = [contact];
      }
    }
    return contactsMap;
  }
}
```

A `ContactGroup` represents a collection of contacts,
such as "All Contacts" or "Favorites".

`ContactGroup` 代表一组联系人的集合，
例如"所有联系人"或"收藏夹"。

Add the following helper code and sample data to the same file:

将以下辅助代码和示例数据添加到同一文件中：

```dart title="lib/data/contact_group.dart"
// ... ContactGroup class from above

typedef AlphabetizedContactMap = SplayTreeMap<String, List<Contact>>;

/// Sorts a list of contacts alphabetically by
/// last name, then first name, then middle name.
/// If names are identical, sorts by contact ID to ensure consistent ordering.
void _sortContacts(List<Contact> contacts) {
  contacts.sort((Contact a, Contact b) {
    final int checkLastName = a.lastName.compareTo(b.lastName);
    if (checkLastName != 0) {
      return checkLastName;
    }
    final int checkFirstName = a.firstName.compareTo(b.firstName);
    if (checkFirstName != 0) {
      return checkFirstName;
    }
    if (a.middleName != null && b.middleName != null) {
      final int checkMiddleName = a.middleName!.compareTo(b.middleName!);
      if (checkMiddleName != 0) {
        return checkMiddleName;
      }
    } else if (a.middleName != null || b.middleName != null) {
      return a.middleName != null ? 1 : -1;
    }
    // If both contacts have the exact same name, order by first created.
    return a.id.compareTo(b.id);
  });
}

final allPhone = ContactGroup(
  id: 0,
  permanent: true,
  label: 'All iPhone',
  title: 'iPhone',
  contacts: allContacts.toList(),
);

final friends = ContactGroup(
  id: 1,
  label: 'Friends',
  contacts: [allContacts.elementAt(3)],
);

final work = ContactGroup(id: 2, label: 'Work');

List<ContactGroup> generateSeedData() {
  return [allPhone, friends, work];
}
```

This code creates three sample groups and a function to
generate the initial data for the app.

这段代码创建了三个示例分组和一个用于
生成应用初始数据的函数。

Finally, add a class that manages state changes:

最后，添加一个管理状态变更的类：

```dart title="lib/data/contact_group.dart"
// ...

class ContactGroupsModel {
  ContactGroupsModel() : _listsNotifier = ValueNotifier(generateSeedData());

  final ValueNotifier<List<ContactGroup>> _listsNotifier;

  ValueNotifier<List<ContactGroup>> get listsNotifier => _listsNotifier;

  List<ContactGroup> get lists => _listsNotifier.value;

  ContactGroup findContactList(int id) {
    return lists[id];
  }

  void dispose() {
    _listsNotifier.dispose();
  }
}
```

If you aren't familiar with `ValueNotifier`,
you should complete the [previous tutorial covering state][] before continuing,
which covers state management.

如果你不熟悉 `ValueNotifier`，
你应该先完成[前一个关于状态管理的教程][previous tutorial covering state]，
该教程涵盖了状态管理的内容。

[previous tutorial covering state]: /learn/pathway/tutorial/set-up-state-project

### Connect the data to your app

### 将数据连接到你的应用

Update your `main.dart` to include the global state and
import the new data file:

更新你的 `main.dart` 以包含全局状态并导入新的数据文件：

```dart title="lib/main.dart"
import 'package:flutter/cupertino.dart';
import 'package:rolodex/data/contact_group.dart';

final contactGroupsModel = ContactGroupsModel();

void main() {
  runApp(const RolodexApp());
}

class RolodexApp extends StatelessWidget {
  const RolodexApp({super.key});

  @override
  Widget build(BuildContext context) {
    return CupertinoApp(
      title: 'Rolodex',
      theme: const CupertinoThemeData(
        barBackgroundColor: CupertinoDynamicColor.withBrightness(
          color: Color(0xFFF9F9F9),
          darkColor: Color(0xFF1D1D1D),
        ),
      ),
      home: CupertinoPageScaffold(child: Center(child: Text('Hello Rolodex!'))),
    );
  }
}
```

With all the extraneous code out of the way, in the next lesson,
you'll start building the app in earnest.

所有准备工作完成后，在下一课中，
你将正式开始构建这个应用。

[`cupertino_icons` package]: {{site.pub-pkg}}/cupertino_icons

### Review

### 回顾

<SummaryCard>
title: What you accomplished
subtitle: Here's a summary of what you built and learned in this lesson.
completed: true
items:
  - title: Previewed the Rolodex app
    icon: preview
    details: >-
      You're starting a new tutorial section focused on advanced UI features.
      To make your app feel polished and native on any device,
      you'll learn adaptive layouts, slivers, navigation, and theming.
  - title: Set up a project with Cupertino widgets
    icon: phone_iphone
    details: >-
      Unlike the previous lessons,
      this app uses `CupertinoApp` instead of `MaterialApp`.
      The Cupertino design system provides iOS-style widgets that
      feel native on Apple devices.
  - title: Created data models for contacts and groups
    icon: data_object
    details: >-
      You created `Contact` and `ContactGroup` classes with sample data,
      plus a `ContactGroupsModel` for state management.
      This foundation supports the UI you'll build in the coming lessons.
</SummaryCard>

### Test yourself

### 测试一下

<Quiz title="Advanced UI Setup Quiz">
- question: What is the main difference between CupertinoApp and MaterialApp?
  options:
    - text: CupertinoApp only works on iOS devices.
      correct: false
      explanation: CupertinoApp can run on any platform; it just provides iOS-style widgets.
    - text: CupertinoApp provides iOS-style widgets and styling, while MaterialApp provides Material Design widgets.
      correct: true
      explanation: CupertinoApp uses Cupertino design system widgets that match the iOS look and feel.
    - text: CupertinoApp is lighter and has better performance.
      correct: false
      explanation: Both have similar performance; they differ in visual style, not speed.
    - text: MaterialApp requires more configuration to set up.
      correct: false
      explanation: Both have similar setup requirements; they just use different design systems.
- question: What is the purpose of a ValueNotifier in state management?
  options:
    - text: To validate user input values.
      correct: false
      explanation: ValueNotifier holds and notifies about value changes, not validation.
    - text: To hold a single value and notify listeners when that value changes.
      correct: true
      explanation: ValueNotifier is a simple ChangeNotifier that wraps a single value and notifies listeners on change.
    - text: To convert values between different data types.
      correct: false
      explanation: Type conversion is not the purpose of ValueNotifier.
    - text: To store values permanently in local storage.
      correct: false
      explanation: ValueNotifier holds values in memory; persistence requires separate implementation.
</Quiz>
