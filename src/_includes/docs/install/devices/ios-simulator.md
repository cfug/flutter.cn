#### Configure your iOS simulator

#### 配置 iOS 模拟器

To prepare to run and test your Flutter app on the iOS simulator,
follow this procedure.

请按照以下步骤操作，
来准备在 iOS 模拟器上运行和测试 Flutter 应用。

1. To install the iOS Simulator, run the following command.

   请运行以下命令，来安装 iOS 模拟器。

    ```console
    {{prompt1}} xcodebuild -downloadPlatform iOS
    ```

1. To start the Simulator, run the following command:

   请运行以下命令，来启动模拟器：

    ```console
    $ open -a Simulator
    ```

1. Set your Simulator to use a 64-bit device.
   This covers the iPhone 5s or later.

   使用 64 位模拟器设备（涵盖 iPhone 5s 或更高版本）。

   * From **Xcode**, choose a simulator device type.

     从 **Xcode** 中选择模拟器设备类型。

     1. Go to **Window** <span aria-label="and then">></span>
        **Devices and Simulators**.

        打开 **Window** <span aria-label="and then">></span>
        **Devices and Simulators**。

        You can also press <kbd>Cmd</kbd> + <kbd>Shift</kbd> + <kbd>2</kbd>.

        你还可以使用快捷键：<kbd>Cmd</kbd> + <kbd>Shift</kbd> + <kbd>2</kbd>

     2. Once the **Devices and Simulators** dialog opens,
        click **Simulators**.

        打开 **Devices and Simulators** 对话框后，
        单击 **Simulators**。

     3. Choose a **Simulator** from the left-hand list or press **+** to
        create a new simulator.

        从左侧列表中选择一个 **Simulator**，
        或按 **+** 创建一个新的模拟器。

   * From the **Simulator** app, go to
     **File** <span aria-label="and then">></span>
     **Open Simulator** <span aria-label="and then">></span>
     Choose your target iOS device.

     从 **Simulator** 应用中，
     打开 **File** <span aria-label="and then">></span>
     **Open Simulator** <span aria-label="and then">></span>
     选择目标 iOS 设备。

   * To check the device version in the Simulator,
     open the **Settings** app <span aria-label="and then">></span>
     **General** <span aria-label="and then">></span>
     **About**.

     在模拟器中检查设备版本，
     打开 **Settings** 应用 <span aria-label="and then">></span>
     **General** <span aria-label="and then">></span>
     **About**。

1. The simulated high-screen density iOS devices might overflow your screen.
   If that appears true on your Mac, change the presented size in the
   **Simulator** app.

   模拟的高分辨率 iOS 设备可能会溢出你的屏幕。
   如果在你的 Mac 上出现这种情况，
   请在 **Simulator** 应用中更改显示尺寸。

    | <t>**Display Size**</t><t>显示尺寸</t> | <t>**Menu command**</t><t>菜单项</t> | <t>**Keyboard shortcut**</t><t>快捷键</t> |
    |:-----------------:|:------------------------------------------------------------------:|:-----------------------------:|
    | Small             | **Window** <span aria-label="and then">></span> **Physical Size**  | <kbd>Cmd</kbd> + <kbd>1</kbd> |
    | 小尺寸（与真机相同的物理尺寸） | **Window** <span aria-label="and then">></span> **Physical Size**  | <kbd>Cmd</kbd> + <kbd>1</kbd> |
    | Moderate          | **Window** <span aria-label="and then">></span> **Point Accurate** | <kbd>Cmd</kbd> + <kbd>2</kbd> |
    | 适中              | **Window** <span aria-label="and then">></span> **Point Accurate** | <kbd>Cmd</kbd> + <kbd>2</kbd> |
    | HD accurate       | **Window** <span aria-label="and then">></span> **Pixel Accurate** | <kbd>Cmd</kbd> + <kbd>3</kbd> |
    | HD 高分辨率（与真机相同的像素尺寸） | **Window** <span aria-label="and then">></span> **Pixel Accurate** | <kbd>Cmd</kbd> + <kbd>3</kbd> |
    | Fit to screen     | **Window** <span aria-label="and then">></span> **Fit Screen**     | <kbd>Cmd</kbd> + <kbd>4</kbd> |
    | 适应屏幕          | **Window** <span aria-label="and then">></span> **Fit Screen**     | <kbd>Cmd</kbd> + <kbd>4</kbd> |

    {:.table .table-striped}
