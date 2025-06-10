## Manage your Flutter SDK

## 管理 Flutter SDK

To learn more about managing your Flutter SDK installation,
consult the following resources.

想要了解管理 Flutter SDK 安装的更多信息，
请查阅以下内容。

* [Upgrade Flutter][upgrade]

  [升级 Flutter][upgrade]
{%- if include.target != 'Web' %}
* [Add web as a build target](/platform-integration/web/setup)

  [将 Web 添加为构建目标](/platform-integration/web/setup)
{%- endif %}
{%- if include.target != 'Android' %}
* [Add Android compilation tools](/platform-integration/android/setup)

  [添加 Android 编译工具](/platform-integration/android/setup)
{%- endif %}
{%- if include.devos == 'macOS' %}
{%- if include.target != 'iOS' %}
* [Add iOS compilation tools](/platform-integration/ios/setup)

  [添加 iOS 编译工具](/platform-integration/ios/setup)
{%- endif %}
{%- if include.target != 'desktop' %}
* [Add macOS compilation tools](/platform-integration/macos/setup)

  [添加 macOS 编译工具](/platform-integration/macos/setup)
{%- endif %}
{%- endif %}
{%- if include.devos == 'Windows' and include.target != 'desktop' %}
* [Add Windows desktop compilation tools](/platform-integration/windows/setup)

  [添加 Windows 桌面端编译工具](/platform-integration/windows/setup)
{%- endif %}
{%- if include.devos == 'Linux' and include.target != 'desktop' %}
* [Add Linux compilation tools](/platform-integration/linux/setup)

  [添加 Linux 编译工具](/platform-integration/linux/setup)
{%- endif %}
* [Uninstall Flutter][uninstall]

  [卸载 Flutter][uninstall]

[upgrade]: /install/upgrade
[uninstall]: /install/uninstall
