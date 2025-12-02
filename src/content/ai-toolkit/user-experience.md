---
title: 用户体验
description: >
  How the user will experience the AI Toolkit in your app.
prev:
  title: AI Toolkit overview
  path: /ai-toolkit/
next:
  title: Feature integration
  path: /ai-toolkit/feature-integration
---

[`LlmChatView`][] widget 是 AI Toolkit 提供的交互式聊天体验的入口点。
托管 `LlmChatView` 实例可以启用许多用户体验功能，
这些功能无需任何额外代码即可使用：

* **多行文本输入**：允许用户粘贴长文本输入或在输入时插入新行。
* **语音输入**：允许用户使用语音输入提示词，方便使用。
* **多媒体输入**：允许用户拍照并发送图片和其他文件类型。
* **图片缩放**：允许用户放大查看图片缩略图。
* **复制到剪贴板**：允许用户将消息或 LLM 响应的文本复制到剪贴板。
* **消息编辑**：允许用户编辑最近的消息以重新提交给 LLM。
* **Material 和 Cupertino**：适配两种设计语言的最佳实践。

[`LlmChatView`]: {{site.pub-api}}/flutter_ai_toolkit/latest/flutter_ai_toolkit/LlmChatView-class.html

## 多行文本输入

用户在完成提示词撰写后有多种提交选项，
具体取决于他们使用的平台：

* **移动端**：点击**提交**按钮
* **Web**：按 **Enter** 键或点击**提交**按钮
* **桌面端**：按 **Enter** 键或点击**提交**按钮

此外，聊天视图支持包含嵌入换行符的文本提示词。
如果用户有包含换行符的现有文本，
可以像往常一样将其粘贴到提示词文本字段中。

如果他们想在输入时手动嵌入换行符，也可以这样做。
具体手势取决于他们使用的平台：

* **移动端**：点击虚拟键盘上的 Return 键
* **Web**：不支持
* **桌面端**：按 `Ctrl+Enter` 或 `Opt/Alt+Enter`

这些选项如下所示：

**桌面端**：

![在桌面端输入文本的截图](/assets/images/docs/ai-toolkit/desktop-enter-text.png)

**移动端**：

![在移动端输入文本的截图](/assets/images/docs/ai-toolkit/mobile-enter-text.png)

## 语音输入

除了文本输入外，聊天视图还可以通过点击麦克风按钮接收录音作为输入，
该按钮在未输入任何文本时可见。

点击**麦克风**按钮开始录音：

![输入文本的截图](/assets/images/docs/ai-toolkit/enter-textfield.png)

按下**停止**按钮将用户的语音输入转换为文本：

然后可以像正常一样编辑、补充和提交此文本。

![语音输入的截图](/assets/images/docs/ai-toolkit/enter-voice-into-textfield.png)

## 多媒体输入

![包含 "Testing, testing, one, two, three" 的文本字段](/assets/images/docs/ai-toolkit/multi-media-testing-testing.png)

聊天视图还可以接收图片和文件作为输入传递给底层 LLM。
用户可以按下文本输入左侧的**加号**按钮，
然后从**拍照**、**图库**和**附加文件**图标中选择：

![4 个图标的截图](/assets/images/docs/ai-toolkit/multi-media-icons.png)

**拍照**按钮允许用户使用设备的相机拍照：

![自拍图片](/assets/images/docs/ai-toolkit/selfie.png)

按下**图库**按钮可让用户从设备的图库中上传：

![从图库下载图片](/assets/images/docs/ai-toolkit/download-from-gallery.png)

按下**附加文件**按钮可让用户选择设备上任何可用类型的文件，
如 PDF 或 TXT 文件。

选择照片、图片或文件后，它将成为附件，
并显示为与当前活动提示词相关联的缩略图：

![图片缩略图](/assets/images/docs/ai-toolkit/image-thumbnails.png)

用户可以通过点击缩略图上的 **X** 按钮来移除附件。

## 图片缩放

用户可以通过点击图片缩略图来放大查看：

![放大的图片](/assets/images/docs/ai-toolkit/image-zoom.png)

按 **ESC** 键或点击图片外的任何位置可关闭放大的图片。

## 复制到剪贴板

用户可以通过多种方式复制当前聊天中的任何文本提示词或 LLM 响应。
在桌面端或 Web 端，用户可以用鼠标选择屏幕上的文本，
然后像往常一样复制到剪贴板：

![复制到剪贴板](/assets/images/docs/ai-toolkit/copy-to-clipboard.png)

此外，在每个提示词或响应的底部，
用户可以按下鼠标悬停时弹出的**复制**按钮：

![按下复制按钮](/assets/images/docs/ai-toolkit/chatbot-prompt.png)

在移动平台上，用户可以长按提示词或响应，然后选择复制选项：

![长按查看复制按钮](/assets/images/docs/ai-toolkit/long-tap-choose-copy.png)

## 消息编辑

如果用户想编辑他们的上一条提示词并让 LLM 重新处理，
可以这样做。在桌面端，
用户可以点击最近提示词旁边的**编辑**按钮
（与**复制**按钮并列）：

![如何编辑提示词](/assets/images/docs/ai-toolkit/how-to-edit-prompt.png)

在移动设备上，用户可以长按来访问最近提示词的**编辑**选项：

![如何访问编辑菜单](/assets/images/docs/ai-toolkit/accessing-edit-menu.png)

用户点击**编辑**按钮后，将进入编辑模式，
该模式会从聊天历史中移除用户的上一条提示词和 LLM 的上一条响应，
将提示词的文本放入文本字段中，
并提供一个编辑指示器：

![如何退出编辑模式](/assets/images/docs/ai-toolkit/how-to-exit-editing-mode.png)

在编辑模式下，用户可以随意编辑提示词并提交，
让 LLM 像正常一样生成响应。
或者，如果用户改变主意，可以点击编辑指示器旁边的 **X**
来取消编辑并恢复之前的 LLM 响应。

## Material 和 Cupertino

当 `LlmChatView` widget 托管在 [Material 应用][Material app]中时，
它使用 Material 设计语言提供的功能，
例如 Material 的 [`TextField`][]。
同样，当托管在 [Cupertino 应用][Cupertino app]中时，
它使用这些功能，例如 [`CupertinoTextField`][]。

![Cupertino 示例应用](/assets/images/docs/ai-toolkit/cupertino-chat-app.png)

但是，虽然聊天视图支持 Material 和 Cupertino 两种应用类型，
它并不会自动采用关联的主题。
相反，这是由 `LlmChatView` 的 `style` 属性设置的，
如[自定义样式][Custom styling]文档中所述。

[Cupertino app]: {{site.api}}/flutter/cupertino/CupertinoApp-class.html
[`CupertinoTextField`]: {{site.api}}/flutter/cupertino/CupertinoTextField-class.html
[Custom styling]: /ai-toolkit/feature-integration#custom-styling
[Material app]: {{site.api}}/flutter/material/MaterialApp-class.html
[`TextField`]: {{site.api}}/flutter/material/TextField-class.html
