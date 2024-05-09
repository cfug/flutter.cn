{% assign terminal=include.terminal %}

### Download then install Flutter {:.no_toc}

### 下载并安装 Flutter
{:.no_toc}

{% assign os = include.os %}
{% assign osl = os | downcase | replace: "chromeos","linux" %}
{% assign target = include.target %}
{% case os %}
{% when 'Windows' -%}
   {% assign unzip='Expand-Archive .\\' %}
   {% assign path='C:\\user\\{username}\\dev' %}
   {% assign flutter-path='C:\\user\\{username}\\dev\\flutter' %}
   {% assign terminal='PowerShell' %}
   {% assign prompt='C:>' %}
   {% assign prompt2=path | append: '>' %}
   {% assign diroptions='`%USERPROFILE%` (`C:\\Users\\{username}`) 或者 `%LOCALAPPDATA%` (`C:\\Users\\{username}\\AppData\\Local`)' %}
   {% assign dirinstall='`%USERPROFILE%\\dev\\`' %}
   {% assign dirdl='%USERPROFILE%\\Downloads' %}
   {% assign ps-dir-dl='$env:USERPROFILE\\Downloads\\' %}
   {% assign ps-dir-target='$env:USERPROFILE\\dev\\' %}
   {% capture uz -%}
   {{prompt}} Expand-Archive `
       –Path {{ps-dir-dl}}flutter_sdk_v1.0.0.zip `
       -Destination {{ps-dir-target}}
   {%- endcapture %}
{% when "macOS" -%}
   {% assign diroptions='`~/development/`' %}
   {% assign dirinstall='`~/development/`' %}
   {% assign unzip='unzip' %}
   {% assign path='~/development/' %}
   {% assign flutter-path='~/development/flutter' %}
   {% assign terminal='Terminal' %}
   {% assign prompt='$' %}
   {% assign dirdl='~/Downloads/' %}
   {% capture uz -%}
   {{prompt}} {{unzip}} {{dirdl}}flutter_sdk_v1.0.0.zip -d {{path}}
   {%- endcapture %}
{% else -%}
   {% assign diroptions='`/usr/bin/`' %}
   {% assign dirinstall='`/usr/bin/`' %}
   {% assign unzip='unzip' %}
   {% assign path='/usr/bin/' %}
   {% assign flutter-path='/usr/bin/flutter' %}
   {% assign terminal='shell' %}
   {% assign prompt='$' %}
   {% assign dirdl='~/Downloads/' %}
   {% capture uz -%}
   {{prompt}} {{dirdl}}flutter_sdk_v1.0.0.zip {{path}}
   {%- endcapture %}
{% endcase -%}

To install Flutter,
download the Flutter SDK bundle from its archive,
move the bundle to where you want it stored,
then extract the SDK.

从归档列表中下载 Flutter SDK 压缩包，
将压缩包移动到你想要的位置，
然后解压 SDK，
以此来安装 Flutter。

1. Download the following installation bundle to get the latest
   {{site.sdk.channel}} release of the Flutter SDK.

   下载以下 Flutter SDK 最新 {{site.sdk.channel}} 版本的
   压缩包。

   {% if os=='macOS' %}

   | <t>Intel Processor</t><t>Intel 处理器</t> | <t>Apple Silicon</t><t>Apple Silicon 处理器</t> |
   |-----------------|---------------|
   | [(loading...)](#){:.download-latest-link-{{osl}} .btn .btn-primary} | [(loading...)](#){:.download-latest-link-{{osl}}-arm64 .apple-silicon .btn .btn-primary}  |

   {% else %}

   [(loading...)](#){:.download-latest-link-{{osl}} .btn .btn-primary}

   {% endif -%}

   For other release channels, and older builds, check out the [SDK archive][].

   关于其他发布渠道和旧版本，
   请查阅 [Flutter SDK 归档列表][SDK archive]。

   The Flutter SDK should download to the {{os}} default download directory:
   `{{dirdl}}`.

   Flutter SDK 应该会下载至 {{os}} 默认下载目录：
   `{{dirdl}}`。

   {% if os=='Windows' %}

   If you changed the location of the Downloads directory,
   replace this path with that path.
   To find your Downloads directory location,
   check out this [Microsoft Community post][move-dl].

   如果你自行更改了下载目录的位置，
   那么请将之后步骤中解压指令 (Expand-Archive) 的
   路径 (-Path) 改为你更改后的路径。
   如果你需要查找当前计算机下载目录的位置，
   请查阅 [Microsoft Community post][move-dl]

   {% endif %}

1. Create a folder where you can install Flutter.

   创建一个文件夹，用于安装 Flutter。

   Consider creating a directory at {{diroptions}}.

   可以考虑在 {{diroptions}} 中创建一个目录。

   {% if os == "Windows" -%}
   {% include docs/install/admonitions/install-paths.md %}
   {% endif %}

1. Extract the zip file into the directory you want to store the Flutter SDK.

   将 Flutter SDK 压缩文件 (zip) 解压到你想要存储的目录中。
   可以使用以下指令进行解压。

   ```console
   {{uz}}
   ```

   When finished, the Flutter SDK should be in the `{{flutter-path}}` directory.

   完成后，Flutter SDK 应该会位于 `{{flutter-path}}` 目录中。

[SDK archive]: /release/archive
[move-dl]: https://answers.microsoft.com/en-us/windows/forum/all/move-download-folder-to-other-drive-in-windows-10/67d58118-4ccd-473e-a3da-4e79fdb4c878

{% case os %}
{% when 'Windows' %}
{% include docs/install/reqs/windows/set-path.md terminal=terminal target=target %}
{% when 'macOS' %}
{% include docs/install/reqs/macos/set-path.md terminal=terminal
target=target dir=dirinstall %}
{% else %}
{% include docs/install/reqs/linux/set-path.md terminal=terminal target=target %}
{% endcase %}
