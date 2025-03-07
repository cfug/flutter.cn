## Manage your Flutter SDK

## 管理 Flutter SDK

To learn more about managing your Flutter SDK install,
consult the following resources.

想要了解管理 Flutter SDK 安装的更多信息，
请查阅以下内容。

{% assign choice = include.config %}
{% assign next-step = doctor[include.config] %}
{% assign mod-target = include.target | remove: 'mobile-' | downcase %}
{% if mod-target == 'desktop' %}
  {% assign webtarget = include.devos | append: '-desktop' | downcase %}
  {% assign andtarget = include.devos | downcase %}
  {% assign mod-target = include.devos | downcase %}
{% elsif mod-target == 'web' %}
  {% assign andtarget = 'web-on-' | append: include.devos | downcase %}
{% else %}
  {% assign webtarget = mod-target | append: '-on-' | append: include.devos | downcase %}
  {% assign andtarget = include.devos | downcase %}
{% endif %}

* [Upgrade Flutter][upgrade]

  [升级 Flutter][upgrade]
{%- case next-step.add-android %}
{%- when 'Y' %}
* [Add Android compilation tools](/platform-integration/android/install-android/install-android-from-{{andtarget}})

  [添加 Android 编译工具](/platform-integration/android/install-android/install-android-from-{{andtarget}})
{%- endcase %}
{%- case next-step.add-chrome %}
{%- when 'Y' %}
* [Add web as a build target](/platform-integration/web/install-web/)

  [将 Web 添加为构建目标](/platform-integration/web/install-web/)
{%- endcase %}
{%- case next-step.add-simulator %}
{%- when 'Y' %}
* [Add iOS simulator or device](/platform-integration/ios/install-ios/install-ios-from-{{mod-target}})

  [添加 iOS 模拟器或真机设备](/platform-integration/ios/install-ios/install-ios-from-{{mod-target}})
{%- endcase %}
{%- case next-step.add-xcode %}
{%- when 'Y' %}
* [Add macOS compilation tools](/platform-integration/macos/install-macos/install-macos-from-{{mod-target}})

  [添加 macOS 编译工具](/platform-integration/macos/install-macos/install-macos-from-{{mod-target}})
{%- endcase %}
{%- case next-step.add-linux-tools %}
{%- when 'Y' %}
* [Add Linux compilation tools](/platform-integration/linux/install-linux/install-linux-from-{{mod-target}})

  [添加 Linux 编译工具](/platform-integration/linux/install-linux/install-linux-from-{{mod-target}})
{%- endcase %}
{%- case next-step.add-visual-studio %}
{%- when 'Y' %}
* [Add Windows desktop compilation tools](/platform-integration/windows/install-windows/install-windows-from-{{mod-target}})

  [添加 Windows 桌面编译工具](/platform-integration/windows/install-windows/install-windows-from-{{mod-target}})
{%- endcase %}
* [Uninstall Flutter][uninstall]

  [卸载 Flutter][uninstall]

[upgrade]: /release/upgrade
[uninstall]: /get-started/uninstall?tab={{include.devos}}
