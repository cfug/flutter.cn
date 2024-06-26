
{% assign xcode = '[Xcode][] ' | append: site.appnow.xcode | append: ' 调试和编译原生 Swift 或 ObjectiveC 代码。' %}
{% assign cocoapods = '[CocoaPods][] ' | append: site.appnow.cocoapods | append: ' 将 Flutter 插件应用于原生应用。' %}
{% capture android -%}
[Android Studio][] {{site.appmin.android_studio}} or later to
debug and compile Java or Kotlin code for Android.
Flutter requires the full version of Android Studio.

[Android Studio][] {{site.appmin.android_studio}} 或更高版本
来调试和编译 Android 的 Java 或 Kotlin 代码。
Flutter 需要完整版本的 Android Studio。
{% endcapture %}
{% assign chrome = "[Google Chrome][] 调试 Web 应用的 JavaScript 代码。" %}
{% assign git-main = '[Git][] ' | append: site.appmin.git_mac | append: ' 或更高版本来管理源代码。' %}
{% assign git-xcode = "Xcode 的安装包括 " %}
{% capture git-other -%}
To check if you have `git` installed,
type `git version` in your Terminal.
If you need to install `git`, type `brew install git`.

如果需要检查是否安装了 `git`，
请在终端中输入 `git version`。
如果需要安装 `git`，
请输入 `brew install git`。
{% endcapture %}

{% case include.target %}
{% when 'desktop','iOS' %}

* {{xcode}} {{git-xcode}} {{git-main}}
* {{cocoapods}}

{% when 'Android' %}

* {{android}}
* {{git-main}}
  {{- git-other}}

{% when 'web' -%}

* {{chrome}}
* {{git-main}}
  {{- git-other}}

{% endcase %}

[Git]: https://formulae.brew.sh/formula/git
[Android Studio]: https://developer.android.com/studio/install#mac
[Xcode]: {{site.apple-dev}}xcode/
[CocoaPods]: https://cocoapods.org/
[Google Chrome]: https://www.google.com/chrome/dr/download/
