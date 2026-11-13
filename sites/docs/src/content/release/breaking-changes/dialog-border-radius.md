---
# title: Dialogs' Default BorderRadius
title: 对话框的默认 BorderRadius
# description: The default BorderRadius of Dialog widgets is changing.
description: Dialog widget 的默认 BorderRadius 正在改变。
ai-translated: true
---

{% render "docs/breaking-changes.md" %}

## Summary

## 概要

Instances of `Dialog`, as well as
`SimpleDialog`, `AlertDialog`, and `showTimePicker`,
now have a default shape of a `RoundedRectangleBorder`
with a `BorderRadius` of 4.0 pixels.
This matches the current specifications of Material Design.
Prior to this change, the default behavior for
`Dialog.shape`'s `BorderRadius` was 2.0 pixels.

`Dialog` 以及 `SimpleDialog`、`AlertDialog` 和 `showTimePicker`
现在的默认形状是 `RoundedRectangleBorder`，
`BorderRadius` 为 4.0 像素。
这与当前的 Material Design 规范一致。
此次改动之前，`Dialog.shape` 的 `BorderRadius` 默认是 2.0 像素。

## Context

## 上下文

`Dialog`s and their associated subclasses
(`SimpleDialog`, `AlertDialog`, and `showTimePicker`), appears
slightly different as the border radius is larger.
If you have master golden file images that have the
prior rendering of the `Dialog` with a 2.0 pixel border radius,
your widget tests will fail.
These golden file images can be updated to reflect the new rendering,
or you can update your code to maintain the original behavior.

`Dialog` 及其相关子类
（`SimpleDialog`、`AlertDialog` 和 `showTimePicker`）
会因为圆角变大而看起来略有不同。
如果你的主黄金文件图像仍是圆角半径为 2.0 像素的旧 `Dialog` 渲染结果，
widget 测试会失败。
可以更新这些黄金文件图像以反映新的渲染结果，
也可以修改代码以保持原来的行为。

The `showDatePicker` dialog already matched
this specification and is unaffected by this change.

`showDatePicker` 对话框已经符合这一规范，不受此次改动影响。

## Migration guide

## 迁移指南

If you prefer to maintain the old shape, you can use
the shape property of your `Dialog` to specify the original 2 pixel radius.

如果希望保持旧形状，
可以用 `Dialog` 的 shape 属性指定原来的 2 像素半径。

Setting the Dialog shape to the original radius:

将 Dialog 的形状设为原来的圆角半径：

```dart
import 'package:flutter/material.dart';

void main() => runApp(Foo());

class Foo extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        floatingActionButton: FloatingActionButton(onPressed: () {
          showDialog(
            context: context,
            builder: (BuildContext context) {
              return AlertDialog(
                content: Text('Alert!'),
                shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.all(Radius.circular(2))),
              );
            },
          );
        }),
      ),
    );
  }
}
```

If you prefer the new behavior and have failing golden file tests,
you can update your master golden files using this command:

如果你更希望使用新行为，且黄金文件测试失败，
可以用下面的命令更新主黄金文件：

```console
flutter test --update-goldens
```

## Timeline

## 时间线

Landed in version: 1.20.0-0.0.pre<br>
合入版本：1.20.0-0.0.pre<br>
In stable release: 1.20

进入稳定版：1.20

## References

## 参考资料

API documentation:

API 文档：

* [`Dialog`][]
* [`SimpleDialog`][]
* [`AlertDialog`][]
* [`showTimePicker`][]
* [`showDatePicker`][]

Relevant PR:

相关 PR：

* [PR 58829: Matching Material Spec for Dialog shape][]

  [PR 58829：使 Dialog 形状符合 Material 规范][PR 58829: Matching Material Spec for Dialog shape]

[`Dialog`]: {{site.api}}/flutter/material/Dialog-class.html
[`SimpleDialog`]: {{site.api}}/flutter/material/SimpleDialog-class.html
[`AlertDialog`]: {{site.api}}/flutter/material/AlertDialog-class.html
[`showTimePicker`]: {{site.api}}/flutter/material/showTimePicker.html
[`showDatePicker`]: {{site.api}}/flutter/material/showDatePicker.html
[PR 58829: Matching Material Spec for Dialog shape]: {{site.repo.flutter}}/pull/58829
