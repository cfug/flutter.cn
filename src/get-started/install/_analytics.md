{{site.alert.warning}}

  The Flutter tool might occasionally download resources
  from Google servers. By downloading or using the
  Flutter SDK you agree to the [Google Terms of Service][].

  Flutter 工具可能会偶尔从 Google 的服务器上下载资源，
  下载了或使用 Flutter SDK 代表你同意了
  [Google 服务条款][Google Terms of Service]。

  For example, when installed from GitHub
  (as opposed to from a prepackaged archive),
  the Flutter tool downloads the Dart SDK from
  Google servers immediately when first run,
  as it is used to execute the `flutter` tool itself.
  This also occurs when Flutter is upgraded
  (for example, by running the `flutter upgrade` command).

  举个例子，当开发者们从 GitHub 安装（而不是从预打包的归档文件中安装），
  为了要执行 `flutter` 命令，Flutter 工具将会在首次运行时从谷歌服务器下载 Dart SDK。
  升级 Flutter 时亦会发生 (比如运行 `flutter upgrade` 命令) 。

  The `flutter` tool uses Google Analytics
  to report feature usage statistics and send [crash reports][].
  This data is used to help improve Flutter tools over time.

  `flutter` 工具使用了 Google Analytics
  来对基本使用情况和 [崩溃报告][crash reports] 进行匿名的统计。
  这些数据用来帮助改善 Flutter 工具。

  Flutter tool analytics are not sent on the very first run.
  To disable reporting, run `flutter config --no-analytics`.
  To display the current setting, use `flutter config`.
  If you opt out of analytics, an opt-out event is sent,
  and then no further information is sent by the Flutter tool.

  在第一次运行或者任何涉及到 `flutter config` 的信息都不会进行发送，
  所以你可以在发送分析数据之前选择禁止分析数据的统计。
  要禁用这一功能，只需要输入 `flutter config --no-analytics` 即可，
  想要查看当前设置使用命令 `flutter config`。
  如果你禁用了统计信息发送，这次的禁用行为会被记录发送，
  其他任何信息，以及未来都不会再有任何数据会被记录。

  Dart tools might also send usage metrics and crash
  reports to Google.
  To control the submission of these metrics,
  use the following options on the [`dart` tool][]:

  Dart 工具同样可能会发送使用指标数据和崩溃报告给 Google。
  控制这些发送的数据，请参考下面的 [`dart` 命令行][[`dart` tool] 参数：

   * `--enable-analytics`: Enables anonymous analytics.

     `--enable-analytics`: 启用匿名分析；

   * `--disable-analytics`: Disables anonymous analytics.

     `--disable-analytics`: 禁用匿名分析。

  The Google [Privacy Policy][] describes
  how data is handled by these services.

  [Google 的隐私权政策][Privacy Policy] 里详细描述了这些服务会如何控制这些数据。

  [Google Terms of Service]: https://policies.google.com/terms
  [Privacy Policy]: https://policies.google.com/privacy
  [crash reports]: {{site.repo.flutter}}/wiki/Flutter-CLI-crash-reporting
  [`dart` tool]: {{site.dart-site}}/tools/dart-tool

{{site.alert.end}}
