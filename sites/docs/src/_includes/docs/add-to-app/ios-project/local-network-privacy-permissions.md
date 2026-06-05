On iOS 14 and later, enable the Dart multicast DNS service in the
**Debug** version of your iOS app.
This adds [debugging functionalities such as hot-reload and DevTools][]
using `flutter attach`.

在 iOS 14 及更高版本上，请在 iOS app 的 **Debug** 版本中启用 Dart 多播 DNS 服务。
这样可通过 `flutter attach` 使用[热重载和 DevTools 等调试功能][debugging functionalities such as hot-reload and DevTools]。

:::warning
Never enable this service in the **Release** version of your app.
The Apple App Store might reject your app.

切勿在 app 的 **Release** 版本中启用此服务。
Apple App Store 可能会拒绝你的 app。
:::

To set local network privacy permissions only in the Debug version of your app,
create a separate `Info.plist` per build configuration.
SwiftUI projects start without an `Info.plist` file.
If you need to create a property list,
you can do so through Xcode or text editor.
The following instructions assume the default **Debug** and **Release**.
Adjust the names as needed depending on your app's build configurations.

若仅在 app 的 Debug 版本中设置本地网络隐私权限，请为每个构建配置创建单独的 `Info.plist`。
SwiftUI 项目一开始可能没有 `Info.plist` 文件。
如需创建属性列表，可通过 Xcode 或文本编辑器完成。
以下说明假定使用默认的 **Debug** 和 **Release**。
请根据 app 的构建配置按需调整名称。

1. Create a new property list.

   1. 创建新的属性列表。

   1. Open your project in Xcode.

      1. 在 Xcode 中打开项目。

   1. In the **Project Navigator**, click on the project name.

      1. 在 **Project Navigator** 中点击项目名称。

   1. From the **Targets** list in the Editor pane, click on your app.

      1. 在编辑器窗格的 **Targets** 列表中点击你的 app。

   1. Click the **Info** tab.

      1. 点击 **Info** 标签页。

   1. Expand **Custom iOS Target Properties**.

      1. 展开 **Custom iOS Target Properties**。

   1. Right-click on the list and select **Add Row**.

      1. 右键点击列表，选择 **Add Row**。

   1. From the dropdown menu, select **Bonjour Services**.
      This creates a new property list in the project directory
      called `Info`. This displays as `Info.plist` in the Finder.

      1. 在下拉菜单中选择 **Bonjour Services**。
         这会在项目目录中创建一个名为 `Info` 的新属性列表。在 Finder 中显示为 `Info.plist`。

1. Rename the `Info.plist` to `Info-Debug.plist`

   1. 将 `Info.plist` 重命名为 `Info-Debug.plist`

   1. Click on **Info** file in the project list at the left.

      1. 在左侧项目列表中点击 **Info** 文件。

   1. In the **Identity and Type** panel at the right,
      change the **Name** from `Info.plist` to `Info-Debug.plist`.

      1. 在右侧 **Identity and Type** 面板中，将 **Name** 从 `Info.plist` 改为 `Info-Debug.plist`。

1. Create a Release property list.

   1. 创建 Release 属性列表。

   1. In the **Project Navigator**, click on `Info-Debug.plist`.

      1. 在 **Project Navigator** 中点击 `Info-Debug.plist`。

   1. Select **File** > **Duplicate...**.
      You can also press <kbd>Cmd</kbd> + <kbd>Shift</kbd> + <kbd>S</kbd>.

      1. 选择 **File** > **Duplicate...**。
         也可按 <kbd>Cmd</kbd> + <kbd>Shift</kbd> + <kbd>S</kbd>。

   1. In the dialog box, set the **Save As:** field to
      `Info-Release.plist` and click **Save**.

      1. 在对话框中将 **Save As:** 设为 `Info-Release.plist`，然后点击 **Save**。

1. Add the necessary properties to the **Debug** property list.

   1. 向 **Debug** 属性列表添加必要属性。

   1. In the **Project Navigator**, click on `Info-Debug.plist`.

      1. 在 **Project Navigator** 中点击 `Info-Debug.plist`。

   1. Add the String value `_dartVmService._tcp`
      to the **Bonjour Services** array.

      1. 向 **Bonjour Services** 数组添加字符串值 `_dartVmService._tcp`。

   1. _(Optional)_ To set your desired customized permission dialog text,
      add the key **Privacy - Local Network Usage Description**.

      1. _（可选）_ 若要设置自定义权限对话框文案，请添加键 **Privacy - Local Network Usage Description**。

      <DashImage image="development/add-to-app/ios/project-setup/debug-plist.png" caption="The `Info-Debug` property list with the **Bonjour Services** and **Privacy - Local Network Usage Description** keys added" />

      <DashImage image="development/add-to-app/ios/project-setup/debug-plist.png" caption="已添加 **Bonjour Services** 与 **Privacy - Local Network Usage Description** 键的 `Info-Debug` 属性列表" />

1. Set the target to use different property lists for different build modes.

   1. 设置 target 在不同构建模式下使用不同属性列表。

   1. In the **Project Navigator**, click on your project.

      1. 在 **Project Navigator** 中点击你的项目。

   1. Click the **Build Settings** tab.

      1. 点击 **Build Settings** 标签页。

   1. Click **All** and **Combined** sub-tabs.

      1. 点击 **All** 和 **Combined** 子标签页。

   1. In the Search box, type `plist`.
      This limits the settings to those that include property lists.

      1. 在搜索框中输入 `plist`，将设置限定为与属性列表相关的项。

   1. Scroll through the list until you see **Packaging**.

      1. 滚动列表直至看到 **Packaging**。

   1. Click on the **Info.plist File** setting.

      1. 点击 **Info.plist File** 设置。

   1. Change the **Info.plist File** value
      from `path/to/Info.plist` to `path/to/Info-$(CONFIGURATION).plist`.

      1. 将 **Info.plist File** 的值从 `path/to/Info.plist` 改为 `path/to/Info-$(CONFIGURATION).plist`。

      <DashImage image="development/add-to-app/ios/project-setup/set-plist-build-setting.png" caption="Updating the `Info.plist` build setting to use build mode-specific property lists" />

      <DashImage image="development/add-to-app/ios/project-setup/set-plist-build-setting.png" caption="更新 `Info.plist` 构建设置以使用按构建模式区分的属性列表" />

      This resolves to the path **Info-Debug.plist** in **Debug** and
      **Info-Release.plist** in **Release**.

      在 **Debug** 中解析为 **Info-Debug.plist**，在 **Release** 中解析为 **Info-Release.plist**。

      <DashImage image="development/add-to-app/ios/project-setup/plist-build-setting.png" caption="The updated **Info.plist File** build setting displaying the configuration variations" />

      <DashImage image="development/add-to-app/ios/project-setup/plist-build-setting.png" caption="更新后的 **Info.plist File** 构建设置，显示各配置差异" />

1. Remove the **Release** property list from the **Build Phases**.

   1. 从 **Build Phases** 中移除 **Release** 属性列表。

   1. In the **Project Navigator**, click on your project.

      1. 在 **Project Navigator** 中点击你的项目。

   1. Click the **Build Phases** tab.

      1. 点击 **Build Phases** 标签页。

   1. Expand **Copy Bundle Resources**.

      1. 展开 **Copy Bundle Resources**。

   1. If this list includes `Info-Release.plist`,
      click on it and then click the **-** (minus sign) under it
      to remove the property list from the resources list.

      1. 若列表包含 `Info-Release.plist`，请点击它，再点击下方 **-**（减号）将其从资源列表中移除。

      <DashImage image="development/add-to-app/ios/project-setup/copy-bundle.png" caption="The **Copy Bundle** build phase displaying the **Info-Release.plist** setting. Remove this setting." />

      <DashImage image="development/add-to-app/ios/project-setup/copy-bundle.png" caption="**Copy Bundle** 构建阶段显示 **Info-Release.plist** 设置。请移除此设置。" />

1. The first Flutter screen your Debug app loads prompts
   for local network permission.

   1. Debug app 加载的第一个 Flutter 界面会提示本地网络权限。

   Click **OK**.

   点击 **OK**。

   _(Optional)_ To grant permission before the app loads, enable
   **Settings > Privacy > Local Network > Your App**.

   _（可选）_ 若要在 app 加载前授予权限，请启用 **Settings > Privacy > Local Network > Your App**。

[debugging functionalities such as hot-reload and DevTools]: /add-to-app/debugging
