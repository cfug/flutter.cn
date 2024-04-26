:::note

Downloading the Flutter SDK
also downloads a compatible version of Dart.
If you've downloaded the Dart SDK separately,
make sure that the Flutter version of `dart` is
first in your path, as the two versions might not be compatible.
The following command tells you whether the `flutter` and `dart`
commands originate from the same `bin` directory and are
therefore compatible.

下载 Flutter SDK 的时候也将同时包含兼容版本的 Dart SDK，
但是如果你已经单独的下载了 Dart SDK，需要请你确保
Flutter SDK 里包含的 `dart` 在 `PATH` 环境变量里靠前的位置，
因为这两个渠道下载的 `dart` 可能并不兼容。
下述命令将教你判断 `flutter` 与 `dart` 命令是否来自于相同的 `bin` 目录，
以及它们是否兼容。

```console
$ which flutter dart
/path-to-flutter-sdk/bin/flutter
/usr/local/bin/dart
```

As shown above, the two commands don't come from
the same `bin` directory. Update your path to use
commands from `/path-to-flutter-sdk/bin` before
commands from `/usr/local/bin` (in this case).
After updating your shell for the change to take effect,
running the `which` command again
should show that the `flutter` and `dart` commands
now come from the same directory.

如上命令行返回的内容所示，
看起来 `flutter` 和 `dart` 并非来自同一 `bin` 目录，
在上面的这个例子里，我们需要更新 `PATH` 环境变量，
将 `<path-to-flutter-sdk>/bin` 放在 `/usr/local/bin` 之前。
修改完并使命令行窗口生效之后，再次运行 `which` 命令，
就可以发现，`flutter` 和 `dart` 位于同一目录了：

```console
$ which flutter dart
/path-to-flutter-sdk/bin/flutter
/path-to-flutter-sdk/bin/dart
```

To learn more about the `dart` command, run `dart -h`
from the command line, or see the [dart tool][] page.

了解更多关于 `dart` 命令的内容，可以在命令行运行 `dart -h`，
或者在 Dart 文档查看 [`dart` 工具][dart tool] 了解更多。

:::

[dart tool]: {{site.dart-site}}/tools/dart-tool
