{{site.alert.warning}}

  The `flutter` tool uses Google Analytics to anonymously report
  feature usage statistics and basic [crash reports][]. This data is
  used to help improve Flutter tools over time.
  
  `flutter` 工具使用了 Google Analytics
  来对基本使用情况和 [崩溃报告][crash reports] 进行匿名的统计。
  这些数据用来帮助改善 Flutter 工具。

  Flutter tool analytics are not sent on the very first run. To disable
  reporting, type `flutter config --no-analytics`. To display the current
  setting, type `flutter config`. If you opt out of analytics, an opt-out
  event is sent, and then no further information is sent by the
  Flutter tool.
  
  在第一次运行或者任何涉及到 `flutter config` 的信息都不会进行发送，
  所以你可以在发送分析数据之前选择禁止分析数据的统计。
  要禁用这一功能，只需要输入 `flutter config --no-analytics` 即可，
  想要查看当前设置使用命令 `flutter config`。
  如果你禁用了统计信息发送，这次的禁用行为会被记录发送，
  其他任何信息，以及未来都不会再有任何数据会被记录。

  By downloading the Flutter SDK, you agree to the Google Terms of Service.
  Note: The Google [Privacy Policy][] describes how data is handled in this
  service.
  
  在下载了 Flutter SDK 的时候，意味着你同意了 Google 的 ToS，
  你可以在 [Google 隐私政策][Privacy Policy]中查看更详细的内容。

  Moreover, Flutter includes the Dart SDK, which may send usage metrics and
  crash reports to Google.
  
  另外，Flutter 包含了 Dart SDK，
  它可能会发送一些使用数据和崩溃信息给 Google。

{{site.alert.end}}

[Privacy Policy]: https://policies.google.cn/privacy
[crash reports]: https://github.com/flutter/flutter/wiki/Flutter-CLI-crash-reporting
