Flutter plugins might produce [static or dynamic frameworks][].
Link static frameworks, [_never_ embed them][static-framework].

Flutter plugin 可能生成[静态或动态 framework][static or dynamic frameworks]。
请链接静态 framework，[_切勿_嵌入它们][static-framework]。

If you embed a static framework into your iOS app,
you can't publish that app to the App Store.
Publishing fails with a
`Found an unexpected Mach-O header code` archive error.

若将静态 framework 嵌入 iOS app，则无法将该 app 发布到 App Store。
发布时会因 `Found an unexpected Mach-O header code` 归档错误而失败。

##### Link all frameworks

##### 链接所有 framework

To link the necessary frameworks, follow this procedure.

要链接所需 framework，请按以下步骤操作。

1. Choose the frameworks to link.

   1. 选择要链接的 framework。

   1. In the **Project Navigator**, click on your project.

      1. 在 **Project Navigator** 中点击你的项目。

   1. Click the **Build Phases** tab.

      1. 点击 **Build Phases** 标签页。

   1. Expand **Link Binary With Libraries**.

      1. 展开 **Link Binary With Libraries**。

      <DashImage image="development/add-to-app/ios/project-setup/linked-libraries.png" caption="Expand the **Link Binary With Libraries** build phase in Xcode" />

      <DashImage image="development/add-to-app/ios/project-setup/linked-libraries.png" caption="在 Xcode 中展开 **Link Binary With Libraries** 构建阶段" />

   1. Click **+** (plus sign).

      1. 点击 **+**（加号）。

   1. Click **Add Other...** then **Add Files...**.

      1. 点击 **Add Other...**，然后点击 **Add Files...**。

   1. From the **Choose frameworks and libraries to add:** dialog box,
      navigate to the `/path/to/MyApp/Flutter/Release/` directory.

      1. 在 **Choose frameworks and libraries to add:** 对话框中，导航到 `/path/to/MyApp/Flutter/Release/` 目录。

   1. Command-click the frameworks in that directory then click **Open**.

      1. 按住 Command 键点击该目录中的 framework，然后点击 **Open**。

      <DashImage image="development/add-to-app/ios/project-setup/choose-libraries.png" caption="Choose frameworks to link from the **Choose frameworks and libraries to add:** dialog box in Xcode" />

      <DashImage image="development/add-to-app/ios/project-setup/choose-libraries.png" caption="在 Xcode 的 **Choose frameworks and libraries to add:** 对话框中选择要链接的 framework" />

1. Update the paths to the libraries to account for build modes.

   1. 更新库路径以适配构建模式。

   1. Launch the Finder.

      1. 打开 Finder。

   1. Navigate to the `/path/to/MyApp/` directory.

      1. 导航到 `/path/to/MyApp/` 目录。

   1. Right-click on `MyApp.xcodeproj` and select **Show Package
      Contents**.

      1. 右键点击 `MyApp.xcodeproj`，选择 **Show Package Contents**。

   1. Open `project.pbxproj` with Xcode. The file opens in Xcode's text
      editor. This also locks **Project Navigator** until you close the text editor.

      1. 用 Xcode 打开 `project.pbxproj`。文件会在 Xcode 文本编辑器中打开。在关闭文本编辑器之前，**Project Navigator** 也会被锁定。

      <DashImage image="development/add-to-app/ios/project-setup/project-pbxproj.png" caption="The `project-pbxproj` file open in the Xcode text editor" />

      <DashImage image="development/add-to-app/ios/project-setup/project-pbxproj.png" caption="在 Xcode 文本编辑器中打开的 `project-pbxproj` 文件" />

   1. Find the lines that resemble the following text in the
      `/* Begin PBXFileReference section */`.

      1. 在 `/* Begin PBXFileReference section */` 中查找类似以下内容的行。

      ```text
      312885572C1A441C009F74FF /* Flutter.xcframework */ = {
        isa = PBXFileReference;
        expectedSignature = "AppleDeveloperProgram:S8QB4VV633:FLUTTER.IO LLC";
        lastKnownFileType = wrapper.xcframework;
        name = Flutter.xcframework;
        path = Flutter/[!Release!]/Flutter.xcframework;
        sourceTree = "<group>";
      };
      312885582C1A441C009F74FF /* App.xcframework */ = {
        isa = PBXFileReference;
        lastKnownFileType = wrapper.xcframework;
        name = App.xcframework;
        path = Flutter/[!Release!]/App.xcframework;
        sourceTree = "<group>";
      };
      ```

   1. Change the `Release` text highlighted in the prior step
      and change it to `$(CONFIGURATION)`. Also wrap the path in
      quotation marks.

      1. 将上一步中高亮的 `Release` 文本改为 `$(CONFIGURATION)`，并用引号包裹路径。

      ```text
      312885572C1A441C009F74FF /* Flutter.xcframework */ = {
        isa = PBXFileReference;
        expectedSignature = "AppleDeveloperProgram:S8QB4VV633:FLUTTER.IO LLC";
        lastKnownFileType = wrapper.xcframework;
        name = Flutter.xcframework;
        path = [!"!]Flutter/[!$(CONFIGURATION)!]/Flutter.xcframework[!"!];
        sourceTree = "<group>";
      };
      312885582C1A441C009F74FF /* App.xcframework */ = {
        isa = PBXFileReference;
        lastKnownFileType = wrapper.xcframework;
        name = App.xcframework;
        path = [!"!]Flutter/[!$(CONFIGURATION)!]/App.xcframework[!"!];
        sourceTree = "<group>";
      };
      ```

1. Update the search paths.

   1. 更新搜索路径。

   1. Click the **Build Settings** tab.

      1. 点击 **Build Settings** 标签页。

   1. Navigate to **Search Paths**

      1. 导航到 **Search Paths**

   1. Double-click to the right of **Framework Search Paths**.

      1. 双击 **Framework Search Paths** 右侧。

   1. In the combo box, click **+** (plus sign).

      1. 在组合框中点击 **+**（加号）。

   1. Type `$(inherited)`.
      and press <kbd>Enter</kbd>.

      1. 输入 `$(inherited)`，然后按 <kbd>Enter</kbd>。

   1. Click **+** (plus sign).

      1. 点击 **+**（加号）。

   1. Type `$(PROJECT_DIR)/Flutter/$(CONFIGURATION)/`
      and press <kbd>Enter</kbd>.

      1. 输入 `$(PROJECT_DIR)/Flutter/$(CONFIGURATION)/`，然后按 <kbd>Enter</kbd>。

      <DashImage image="development/add-to-app/ios/project-setup/framework-search-paths.png" caption="Update **Framework Search Paths** in Xcode" />

      <DashImage image="development/add-to-app/ios/project-setup/framework-search-paths.png" caption="在 Xcode 中更新 **Framework Search Paths**" />

After linking the frameworks, they should display in the
**Frameworks, Libraries, and Embedded Content**
section of your target's **General** settings.

链接 framework 后，它们应显示在 target **General** 设置的 **Frameworks, Libraries, and Embedded Content** 部分。

##### Embed the dynamic frameworks

##### 嵌入动态 framework

To embed your dynamic frameworks, complete the following procedure.

要嵌入动态 framework，请完成以下步骤。

1. Navigate to **General** <span aria-label="and then">></span>
   **Frameworks, Libraries, and Embedded Content**.

   1. 导航到 **General** <span aria-label="and then">></span> **Frameworks, Libraries, and Embedded Content**。

1. Click on each of your dynamic frameworks and select **Embed & Sign**.

   1. 点击每个动态 framework，选择 **Embed & Sign**。

   <DashImage image="development/add-to-app/ios/project-setup/choose-to-embed.png" caption="Select **Embed & Sign** for each of your frameworks in Xcode" />

   <DashImage image="development/add-to-app/ios/project-setup/choose-to-embed.png" caption="在 Xcode 中为每个 framework 选择 **Embed & Sign**" />

   Don't include any static frameworks,
   including `FlutterPluginRegistrant.xcframework`.

   不要包含任何静态 framework，包括 `FlutterPluginRegistrant.xcframework`。

1. Click the **Build Phases** tab.

   1. 点击 **Build Phases** 标签页。

1. Expand **Embed Frameworks**.
   Your dynamic frameworks should display in that section.

   1. 展开 **Embed Frameworks**。动态 framework 应显示在该部分。

   <DashImage image="development/add-to-app/ios/project-setup/embed-xcode.png" caption="The expanded **Embed Frameworks** build phase in Xcode" />

   <DashImage image="development/add-to-app/ios/project-setup/embed-xcode.png" caption="在 Xcode 中展开的 **Embed Frameworks** 构建阶段" />

1. Build the project.

   1. 构建项目。

   1. Open `MyApp.xcworkspace` in Xcode.

      1. 在 Xcode 中打开 `MyApp.xcworkspace`。

      Verify that you're opening `MyApp.xcworkspace` and
      not opening `MyApp.xcodeproj`.
      The `.xcworkspace` file has the CocoaPod dependencies,
      the `.xcodeproj` doesn't.

      请确认打开的是 `MyApp.xcworkspace`，而不是 `MyApp.xcodeproj`。
      `.xcworkspace` 文件包含 CocoaPods 依赖，`.xcodeproj` 则没有。

   1. Select **Product** <span aria-label="and then">></span>
      **Build** or press <kbd>Cmd</kbd> + <kbd>B</kbd>.

      1. 选择 **Product** <span aria-label="and then">></span> **Build**，或按 <kbd>Cmd</kbd> + <kbd>B</kbd>。

#### Set LLDB Init File

#### 设置 LLDB Init File

:::warning
Set your scheme to use Flutter's LLDB Init File. Without this file, debugging
on an iOS 26 or later device may crash.
:::

:::warning
请将 scheme 设置为使用 Flutter 的 LLDB Init File。没有此文件时，在 iOS 26 及更高版本设备上调试可能会崩溃。
:::

1. Generate Flutter LLDB files.

   1. 生成 Flutter LLDB 文件。

   1. Within your flutter application, re-run `flutter build ios-framework` if
      you haven't already:

      1. 在 Flutter 应用中，若尚未运行，请重新执行 `flutter build ios-framework`：

   ```console
   $ flutter build ios-framework --output=/path/to/MyApp/Flutter/
   ```

   This will generate the LLDB files in the `/path/to/MyApp/Flutter/` directory.

   这会在 `/path/to/MyApp/Flutter/` 目录中生成 LLDB 文件。

1. Set the LLDB Init File.

   1. 设置 LLDB Init File。

   1. Go to **Product > Scheme > Edit Scheme**.

      1. 前往 **Product > Scheme > Edit Scheme**。

   1. Select the **Run** section in the left side bar.

      1. 在左侧边栏选择 **Run** 部分。

   1. Set the **LLDB Init File** to the following:

      1. 将 **LLDB Init File** 设置为以下内容：

      ```console
      $(PROJECT_DIR)/Flutter/flutter_lldbinit
      ```

      If your scheme already has an **LLDB Init File**, you can add Flutter's
      LLDB file to it. The path to Flutter's LLDB Init File must be relative
      to the location of your project's LLDB Init File.

      若 scheme 已有 **LLDB Init File**，可将 Flutter 的 LLDB 文件加入其中。Flutter LLDB Init File 的路径必须相对于项目 LLDB Init File 的位置。

      For example, if your LLDB file is located at `/path/to/MyApp/.lldbinit`,
      you would add the following:

      例如，若 LLDB 文件位于 `/path/to/MyApp/.lldbinit`，可添加以下内容：

      ```console
      command source --relative-to-command-file "Flutter/flutter_lldbinit"
      ```

[static or dynamic frameworks]: https://stackoverflow.com/questions/32591878/ios-is-it-a-static-or-a-dynamic-framework
[static-framework]: https://developer.apple.com/library/archive/technotes/tn2435/_index.html
