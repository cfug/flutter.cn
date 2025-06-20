{% assign id = include.ref-os | downcase -%}
{% assign jsonurl = 'https://storage.googleapis.com/flutter_infra_release/releases/releases_{{id}}.json' %}
{% assign os = include.ref-os -%}
{% assign sdk = include.sdk -%}

{% if id == 'windows' -%}
   {% assign shell = 'Powershell' -%}
   {% assign prompt = 'C:\>' -%}
   {% assign comtoset = '$env:' -%}
   {% assign installdirsuggestion = '`%USERPROFILE%\dev`' %}
   {% capture envvarset -%}{{prompt}} {{comtoset}}{% endcapture -%}
   {% capture setpath -%}{{envvarset}}PATH = $pwd.PATH + "/flutter/bin",$env:PATH -join ";"{% endcapture -%}
   {% capture newdir -%}{{prompt}} New-Item -Path '{{installdirsuggestion}}' -ItemType Directory{% endcapture -%}
   {% capture unzip -%} {{prompt}} Expand-Archive .\{% endcapture -%}
   {% capture permaddexample -%}   
# cd to flutter dir
$currentDirectory = Get-Location   
$newPath = "$currentDirectory\bin;$env:PATH"
[System.Environment]::SetEnvironmentVariable('Path', $newPath, 'User')
[System.Environment]::SetEnvironmentVariable('PUB_HOSTED_URL', 'https://pub.flutter-io.cn', 'User')
[System.Environment]::SetEnvironmentVariable('FLUTTER_STORAGE_BASE_URL', 'https://storage.flutter-io.cn', 'User')

Write-Host ". $PROFILE"
   {% endcapture -%}
{% else -%}
   {% assign shell = 'terminal' -%}
   {% assign prompt = '$' -%}
   {% assign comtoset = 'export ' -%}
   {% assign installdirsuggestion = '`~/dev`' %}
   {% capture envvarset -%}{{prompt}} {{comtoset}}{% endcapture -%}
   {% capture setpath -%}{{envvarset}}PATH="$PWD/flutter/bin:$PATH"{% endcapture -%}
   {% capture newdir -%}{{prompt}} mkdir ~/dev{% endcapture -%}
   {% if id == 'macos' %}
      {% capture unzip -%} {{prompt}} unzip {% endcapture -%}
   {% else %}
      {% capture unzip -%} {{prompt}} tar -xf {% endcapture -%}
   {% endif %}
   {% capture permaddexample -%}
cat <<EOT >> ~/.zprofile
{{envvarset}}PUB_HOSTED_URL="https://pub.flutter-io.cn"
{{envvarset}}FLUTTER_STORAGE_BASE_URL="https://storage.flutter-io.cn"
{{setpath}}
EOT
   {% endcapture -%}
{% endif -%}
{%- case id %}
   {% when 'windows','macos' %}
      {%- assign fileFormat = 'zip' %}
      {%- assign downloadOs = id %}
   {% when 'linux','chromeos' %}
      {%- assign fileFormat = 'tar.xz' %}
      {%- assign downloadOs = 'linux' %}
{% endcase %}

This procedure requires using {{shell}}.

此过程需要使用 {{shell}}。

1. Open a new window in {{shell}} to prepare running scripts.

   在 {{shell}} 中打开新窗口，准备运行脚本。

1. Set `PUB_HOSTED_URL` to your mirror site.

   将 `PUB_HOSTED_URL` 设置为镜像站点。

   ```console
   {{envvarset}}PUB_HOSTED_URL="https://pub.flutter-io.cn"
   ```

1. Set `FLUTTER_STORAGE_BASE_URL` to your mirror site.

   将 `FLUTTER_STORAGE_BASE_URL` 设置为镜像站点。

   ```console
   {{envvarset}}FLUTTER_STORAGE_BASE_URL="https://storage.flutter-io.cn"
   ```

1. Download the Flutter archive from your mirror site.
   In your preferred browser, go to
   [Flutter SDK archive](https://docs.flutter.cn/release/archive?tab={{id}}).

   从镜像站点下载 Flutter 压缩包。
   在你常用的浏览器中访问并下载 
   [Flutter SDK 压缩包](https://docs.flutter.cn/release/archive?tab={{id}})。

1. Create a folder where you can install Flutter. then change into it.

   创建一个可以安装 Flutter 的文件夹，
   然后将文件夹命名为 Flutter。

   Consider a path like {{installdirsuggestion}}.

   请参考使用这样的路径：{{installdirsuggestion}}。 

   ```console
   {{newdir}}; cd {{installdirsuggestion}}
   ```

1. Extract the SDK from the {{fileFormat}} archive file.

   从 {{fileFormat}} 压缩文件中解压提取 SDK。

   This example assumes you downloaded the {{os}} version of the Flutter SDK.

   本示例假定你下载了 {{os}} 版本的 Flutter SDK。

   ```console
   {{unzip}}{{sdk | replace: "opsys", downloadOs}}{{fileFormat}}
   ```

1. Add Flutter to your `PATH` environment variable.

   将 Flutter 添加到你的 `PATH` 环境变量中。

   ```console
   {{setpath}}
   ```

1. Run Flutter Doctor to verify your installation.

   运行 Flutter doctor 来验证安装。

   ```console
   {{prompt}} flutter doctor
   ```

From this example, `flutter pub get` fetches packages from `flutter-io.cn`,
in any terminal where you set `PUB_HOSTED_URL` and `FLUTTER_STORAGE_BASE_URL`.

在本例中，`flutter pub get` 会在任何设置了 `PUB_HOSTED_URL` 和 `FLUTTER_STORAGE_BASE_URL` 
的终端中去获取 `flutter-io.cn` 上的 package。

Any environment variables set using `{{comtoset}}` in this procedure
only apply to the current window.

在此过程中使用 `{{comtoset}}` 设置的环境变量仅适用于当前会话窗口。

To set these values on a permanent basis,

要永久设置这些值，

{% if id == 'windows' -%}

set the environment variables as in the following example:

按照下面的示例设置环境变量：

{% else -%}

append those three `export` commands to the `*rc` or `*profile`
file that your preferred shell uses. This would resemble the following:

将这三条 `export` 指令附加到首选 shell 使用的 `*rc` 或 `*profile` 文件中。
类似于下面这样：

{% endif -%}

```console
{{permaddexample}}
```
