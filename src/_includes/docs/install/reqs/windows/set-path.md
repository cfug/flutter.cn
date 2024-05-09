{% assign terminal=include.terminal %}

### Update your Windows PATH variable {:.no_toc}

### 更新 Windows PATH 环境变量
{:.no_toc}

{% include docs/help-link.md location='win-path' section='#unable-to-find-the-flutter-command' %}

To run Flutter commands in {{terminal}},
add Flutter to the `PATH` environment variable.
This section presumes that you installed the Flutter SDK in
`%USERPROFILE%\dev\flutter`.

将 Flutter 添加到 `PATH` 环境变量后，
才能在 {{terminal}} 中运行 Flutter 指令。
本节假定你在 `%USERPROFILE%\dev\flutter` 中
安装了 Flutter SDK。

{% include docs/install/reqs/windows/open-envvars.md %}

1. In the **User variables for (username)** section,
   look for the **Path** entry.

   在 **username 用户变量** 的部分中，
   找到 **Path** 条目。

   {:type="a"}
   1. If the entry exists, double-click on it.

      如果存在该条目，请双击它。

      The **Edit Environment Variable** dialog displays.

      这将会显示 **编辑环境变量** 的窗口。

      {:type="i"}

      1. Double-click in an empty row.

         双击空白行。

      1. Type `%USERPROFILE%\dev\flutter\bin`.

         输入 `%USERPROFILE%\dev\flutter\bin`。

      1. Click the **%USERPROFILE%\dev\flutter\bin** entry.

         单击选中 **%USERPROFILE%\dev\flutter\bin** 条目。

      1. Click **Move Up** until the Flutter entry sits at the top of the list.

         单击 **上移**，直到 Flutter 条目位于列表顶部。

      1. Click **OK** three times.

         顺着打开的窗口依次点击 **确认**（三次）。

   1. If the entry doesn't exist, click **New...**.

      如果条目不存在，请单击 **新建…**。

      The **Edit Environment Variable** dialog displays.

      这将会显示 **新建用户变量** 的窗口。

      {:type="i"}
      1. In the **Variable Name** box, type `Path`.

         在 **变量名** 框中，输入 `Path`。

      1. In the **Variable Value** box,
         type `%USERPROFILE%\dev\flutter\bin`

         在 **变量值** 框中，
         输入 `%USERPROFILE%\dev\flutter\bin`。

      1. Click **OK** three times.

         顺着打开的窗口依次点击 **确认**（三次）。

1. To enable these changes,
   close and reopen any existing command prompts and {{terminal}} instances.

   为了启用这些更改，
   请关闭并重新打开任何现有命令提示符和 {{terminal}} 实例。
