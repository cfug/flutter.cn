{% if include.target == 'desktop' -%}

* [Visual Studio 2022][] to debug and compile native C++ Windows code.
  Make sure to install the **Desktop development with C++** workload.
  This enables building Windows app including all of its default components.
  **Visual Studio** is an IDE separate from **[Visual Studio _Code_][]**.

  [Visual Studio 2022][] 调试和编译原生 C++ Windows 代码。
  确保安装 **Desktop development with C++**。
  这样就可以构建 Windows 应用以及所有默认组件。
  **Visual Studio** 是独立于 **[Visual Studio _Code_][]** 的 IDE。

{% elsif include.target == 'mobile' -%}

* [Android Studio][] {{site.appmin.android_studio}} to debug and compile
  Java or Kotlin code for Android.
  Flutter requires the full version of Android Studio.

  [Android Studio][] {{site.appmin.android_studio}} 调试和编译 
  Android 的 Java 或 Kotlin 代码。
  Flutter 需要完整版本的 Android Studio.

{% elsif include.target == 'web' -%}

* [Google Chrome][] to debug JavaScript code for web apps.

  [Google Chrome][] 调试 Web 应用的 JavaScript 代码。

{% else -%}

* [Visual Studio 2022][] with the the **Desktop development with C++** workload
  or [Build Tools for Visual Studio 2022][].
  This enables building Windows app including all of its default components.
  **Visual Studio** is an IDE separate from **[Visual Studio _Code_][]**.

  [Visual Studio 2022][] 安装 **Desktop development with C++**
  或者使用 [Visual Studio 2022 生成工具][Build Tools for Visual Studio 2022]。
  这样就可以构建 Windows 应用以及所有默认组件。
  **Visual Studio** 是独立于 **[Visual Studio _Code_][]** 的 IDE。

* [Android Studio][] {{site.appmin.android_studio}} to debug and compile
  Java or Kotlin code for Android.
  Flutter requires the full version of Android Studio.

  [Android Studio][] {{site.appmin.android_studio}} 调试和编译 
  Android 的 Java 或 Kotlin 代码。
  Flutter 需要完整版本的 Android Studio.

* The latest version of [Google Chrome][] to debug JavaScript code for web apps.

  最新版本的 [Google Chrome][] 调试 Web 应用的 JavaScript 代码。

{% endif -%}

[Android Studio]: https://developer.android.com/studio/install#windows
[Visual Studio 2022]: https://learn.microsoft.com/visualstudio/install/install-visual-studio?view=vs-2022
[Build Tools for Visual Studio 2022]: https://visualstudio.microsoft.com/downloads/#build-tools-for-visual-studio-2022
[Google Chrome]: https://www.google.com/chrome/dr/download/
[Visual Studio _Code_]: https://code.visualstudio.com/
