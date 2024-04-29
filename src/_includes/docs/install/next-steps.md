## Manage your Flutter SDK

## 管理 Flutter SDK

To learn more about managing your Flutter SDK install,
consult the following resources.

想要了解管理 Flutter SDK 安装的更多信息，
请查阅以下内容。

{% assign doctor = doctor %}
{% assign config = doctor[include.config] %}
{% assign target = include.target | remove: 'mobile-' | downcase %}
{% assign devos = include.devos %}
{% if target == 'desktop' %}
  {% assign webtarget = devos | append: '-desktop' | downcase %}
  {% assign andtarget = devos | downcase %}
  {% assign target = devos | downcase %}
{% elsif target == 'web' %}
  {% assign andtarget = 'web-on-' | append: devos | downcase %}
{% else %}
  {% assign webtarget = target | append: '-on-' | append: devos | downcase %}
  {% assign andtarget = devos | downcase %}
{% endif %}

* [Upgrade Flutter][upgrade]

  [升级 Flutter][upgrade]
{%- case config.add-android %}
{%- when 'Y' %}
* [Add Android compilation tools](/platform-integration/android/install-android/install-android-from-{{andtarget}})

  [添加 Android 编译工具](/platform-integration/android/install-android/install-android-from-{{andtarget}})
{%- endcase %}
{%- case config.add-chrome %}
{%- when 'Y' %}
* [Add Web debugging
  tools](/platform-integration/web/install-web/install-web-from-{{webtarget}})

  [添加 Web 调试工具](/platform-integration/web/install-web/install-web-from-{{webtarget}})
{%- endcase %}
{%- case config.add-simulator %}
{%- when 'Y' %}
* [Add iOS simulator or device](/platform-integration/ios/install-ios/install-ios-from-{{target}})

  [添加 iOS 模拟器或真机设备](/platform-integration/ios/install-ios/install-ios-from-{{target}})
{%- endcase %}
{%- case config.add-xcode %}
{%- when 'Y' %}
* [Add macOS compilation tools](/platform-integration/macos/install-macos/install-macos-from-{{target}})

  [添加 macOS 编译工具](/platform-integration/macos/install-macos/install-macos-from-{{target}})
{%- endcase %}
{%- case config.add-linux-tools %}
{%- when 'Y' %}
* [Add Linux compilation tools](/platform-integration/linux/install-linux/install-linux-from-{{target}})

  [添加 Linux 编译工具](/platform-integration/linux/install-linux/install-linux-from-{{target}})
{%- endcase %}
{%- case config.add-visual-studio %}
{%- when 'Y' %}
* [Add Windows desktop compilation tools](/platform-integration/windows/install-windows/install-windows-from-{{target}})

  [添加 Windows 桌面编译工具](/platform-integration/windows/install-windows/install-windows-from-{{target}})
{%- endcase %}
* [Uninstall Flutter][uninstall]

  [卸载 Flutter][uninstall]

[upgrade]: /release/upgrade
[uninstall]: /get-started/uninstall?tab={{devos}}
