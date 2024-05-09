:::note

The Flutter SDK contains the `dart` command alongside the `flutter` command 
so that you can more easily run Dart command-line programs. 
Downloading the Flutter SDK also downloads the compatible version of Dart,
but if you've downloaded the Dart SDK separately,
make sure that the Flutter version of `dart` is
first in your path, as the two versions might not be compatible.
The following command tells you whether the `flutter` and `dart`
commands originate from the same `bin` directory and are
therefore compatible.

Flutter SDK 在 `flutter` 命令脚本的同级目录下增加了 `dart` 命令，
你可以更方便地运行 Dart 命令行程序。
下载 Flutter SDK 时也会下载对应版本的 Dart SDK，但如果你单独下载了 Dart SDK，
请确保 Flutter SDK 内的 `dart` 在你的环境变量中排在首位，因为单独的 SDK 可能并不兼容 Flutter SDK。
下面的命令展示了 `flutter` 和 `dart` 是否来自相同的 `bin` 目录，并且是否可以兼容使用。

```console
C:\>where flutter dart
C:\path-to-flutter-sdk\bin\flutter
C:\path-to-flutter-sdk\bin\flutter.bat
C:\path-to-dart-sdk\bin\dart.exe        :: this should go after `C:\path-to-flutter-sdk\bin\` commands
C:\path-to-flutter-sdk\bin\dart
C:\path-to-flutter-sdk\bin\dart.bat
```

As shown above, the command `dart` from the Flutter SDK doesn't come first.
Update your path to use commands from `C:\path-to-flutter-sdk\bin\` before
commands from `C:\path-to-dart-sdk\bin\` (in this case).
After restarting your shell for the change to take effect,
running the `where` command again
should show that the `flutter` and `dart` commands
from the same directory now come first.

如上所示，Flutter SDK 内的 `dart` 命令不在首位。
你需要更新 PATH，将 `C:\path-to-flutter-sdk\bin\` 放在 `C:\path-to-dart-sdk\bin\` 前面（当前场景）。
接着重启命令行使修改生效，再次运行 `where`，此时来自相同目录的 `flutter` 和 `dart` 已经排在前面。

```console
C:\>where flutter dart
C:\dev\src\flutter\bin\flutter
C:\dev\src\flutter\bin\flutter.bat
C:\dev\src\flutter\bin\dart
C:\dev\src\flutter\bin\dart.bat
C:\dev\src\dart-sdk\bin\dart.exe
```

However, if you are using `PowerShell`, in it `where` is
an alias of `Where-Object` command, so you need to use `where.exe` instead.

然而，如果你在使用 `PowerShell`，`where` 其实是 `Where-Object` 命令的别名，
所以实际上你需要运行 `where.exe`。

```console
PS C:\> where.exe flutter dart
```

To learn more about the `dart` command, run `dart -h`
from the command line, or see the [dart tool][] page.

了解更多 `dart` 命令的用法，可以在命令行中运行 `dart -h` 查看，
也可以访问 [DartVM 运行环境][dart tool]。

:::

[dart tool]: {{site.dart-site}}/tools/dart-tool
