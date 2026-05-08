<hr>

### {{group}}

[{{group}}][] maintains the `{{url}}` mirror.
It includes the Flutter SDK and pub packages.

[{{group}}][] 维护着 `{{url}}` 镜像。
它包括 Flutter SDK 和 pub package。

#### Configure your machine to use this mirror

#### 配置你的机器使用镜像

To set your machine to use this mirror, use these commands.

请使用以下指令，设置你的机器使用该镜像。

On macOS, Linux, or ChromeOS:

在 macOS、Linux 或 ChromeOS 上：

```console
export PUB_HOSTED_URL={{pubHosted}}
export FLUTTER_STORAGE_BASE_URL={{flutterStorage}}
```

On Windows:

在 Windows 上：

```console
$env:PUB_HOSTED_URL="{{pubHosted}}"
$env:FLUTTER_STORAGE_BASE_URL="{{flutterStorage}}"
```

#### Get support for this mirror

#### 向镜像反馈

If you're running into issues that only occur when
using the `{{url}}` mirror, report the issue to their
[issue tracker]({{issueLink}}).

如果你的问题仅在使用 `{{url}}` 镜像时才会出现，
请向他们的 [反馈]({{issueLink}})。

[{{group}}]: {{groupLink}}
