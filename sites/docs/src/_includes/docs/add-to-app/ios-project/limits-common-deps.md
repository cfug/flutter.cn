
Flutter can't handle [common dependencies with xcframeworks][common].
If both the host app and the Flutter module's plugin define the
same pod dependency and you integrate Flutter module using this option,
errors result.
These errors include issues like `Multiple commands produce
'CommonDependency.framework'`.

Flutter 无法处理[与 xcframework 的公共依赖][common]。
如果宿主 app 与 Flutter 模块的 plugin 都定义了相同的 pod 依赖，而你又通过此选项集成 Flutter 模块，就会产生错误。
这些错误包括诸如 `Multiple commands produce
'CommonDependency.framework'` 之类的问题。

To work around this issue, link every plugin source in its `podspec` file
from the Flutter module to the host app's `Podfile`.
Link the source instead of the plugins' `xcframework` framework.
The next section explains how to [produce that framework][ios-framework].

要解决此问题，请将 Flutter 模块中每个 plugin 在其 `podspec` 文件里的源码链接到宿主 app 的 `Podfile`。
应链接源码，而不是 plugin 的 `xcframework` framework。
下一节说明如何[生成该 framework][ios-framework]。

To prevent the error that occurs when common dependencies exist,
use `flutter build ios-framework` with the `--no-plugins` flag.

为防止出现公共依赖导致的错误，请使用带 `--no-plugins` 标志的 `flutter build ios-framework`。

[common]: https://github.com/flutter/flutter/issues/130220
[ios-framework]: https://github.com/flutter/flutter/issues/114692
