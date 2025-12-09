---
title: User experience
title: 用户体验
description: >
  How the user will experience the AI Toolkit in your app.
description: >
  用户将如何在你的应用中体验 AI 工具包。
prev:
  title: AI Toolkit overview
  title: AI 工具包概览
  path: /ai-toolkit/
next:
  title: Feature integration
  title: 功能集成
  path: /ai-toolkit/feature-integration
---

The [`LlmChatView`][] widget is the entry point for the
interactive chat experience that AI Toolkit provides.
Hosting an instance of the `LlmChatView` enables a
number of user experience features that don't require
any additional code to use:

[`LlmChatView`][] widget 是 AI 工具包提供的交互式聊天体验的入口点。
托管一个 `LlmChatView` 实例可以启用许多用户体验功能，无需编写任何额外代码即可使用：

* **Multi-line text input**: Allows users to paste long text
  input or insert new lines into their text as they enter it.
  **多行文本输入**：允许用户粘贴长文本输入，或在输入文本时插入新行。
* **Voice input**: Allows users to input prompts using speech
  for ease of use.
  **语音输入**：允许用户使用语音输入提示，以便于使用。
* **Multimedia input**: Enables users to take pictures and
  send images and other file types.
  **多媒体输入**：使用户能够拍照并发送图像和其他文件类型。
* **Image zoom**: Enables users to zoom into image thumbnails.
  **图像缩放**：使用户能够放大图像缩略图。
* **Copy to clipboard**: Allows the  user to copy the text of
  a message or a LLM response to the clipboard.
  **复制到剪贴板**：允许用户将消息或 LLM 响应的文本复制到剪贴板。
* **Message editing**: Allows the user to edit the most recent
  message for resubmission to the LLM.
  **消息编辑**：允许用户编辑最近的消息以重新提交给 LLM。
* **Material and Cupertino**: Adapts to the best practices of
  both design languages.
  **Material 和 Cupertino**：适应两种设计语言的最佳实践。

[`LlmChatView`]: {{site.pub-api}}/flutter_ai_toolkit/latest/flutter_ai_toolkit/LlmChatView-class.html

## Multi-line text input

## 多行文本输入

The user has  options when it comes to submitting
their prompt once they've finished composing it,
which again differs depending on their platform:

用户在完成提示的编写后，有多种选项来提交提示，这同样取决于他们的平台：

* **Mobile**: Tap the **Submit** button
  **移动端**：点击 **提交** 按钮
* **Web**: Press **Enter** or tap the **Submit** button
  **Web 端**：按 **Enter** 或点击 **提交** 按钮
* **Desktop**: Press **Enter** or tap the **Submit** button
  **桌面端**：按 **Enter** 或点击 **提交** 按钮

In addition, the chat view supports text prompts
with embedded newlines in them. If the user has existing
text with newlines, they can paste them into the
prompt text field as normal.

此外，聊天视图支持包含换行符的文本提示。
如果用户有包含换行符的现有文本，他们可以像平常一样将其粘贴到提示文本字段中。

If they'd like to embed newlines into their prompt
manually as they enter it, they can do so.
The gesture for that activity differs based on the
platform they're using:

如果他们想在输入提示时手动嵌入换行符，他们可以这样做。
该操作的手势因所使用的平台而异：

* **Mobile**: Tap Return key on the virtual keyboard
  **移动端**：在虚拟键盘上点击回车键
* **Web**: Unsupported
  **Web 端**：不支持
* **Desktop**: Press `Ctrl+Enter` or `Opt/Alt+Enter`
  **桌面端**：按 `Ctrl+Enter` 或 `Opt/Alt+Enter`

These options look like the following:

这些选项如下所示：

**Desktop**:

**桌面端**：

![Screenshot of entering text on desktop](/assets/images/docs/ai-toolkit/desktop-enter-text.png)

**Mobile**:

**移动端**：

![Screenshot of entering text on mobile](/assets/images/docs/ai-toolkit/mobile-enter-text.png)

## Voice input

## 语音输入

In addition to text input the chat view can take an
audio recording as input by tapping the Mic button,
which is visible when no text has yet been entered.

除了文本输入，聊天视图还可以通过点击麦克风按钮来接受音频录制作为输入，
该按钮在尚未输入任何文本时可见。

Tapping the **Mic** button starts the recording:

点击 **麦克风** 按钮开始录音：

![Screenshot of entering text](/assets/images/docs/ai-toolkit/enter-textfield.png)

Pressing the **Stop** button translates the user's voice input into text:

按 **停止** 按钮将用户的语音输入转换为文本：

This text can then be edited, augmented and submitted as normal.

然后可以像平常一样编辑、增强和提交此文本。

![Screenshot of entered voice](/assets/images/docs/ai-toolkit/enter-voice-into-textfield.png)

## Multi-media Input

## 多媒体输入

![Textfield containing "Testing, testing, one, two, three"](/assets/images/docs/ai-toolkit/multi-media-testing-testing.png)

The chat view can also take images and files as input to pass along
to the underlying LLM. The user can press the **Plus** button to the
left of the text input and choose from the **Take Photo**, **Image Gallery**,
and **Attach File** icons:

聊天视图还可以接受图像和文件作为输入，传递给底层 LLM。
用户可以按文本输入左侧的 **加号** 按钮，并从 **拍照**、**图库** 和 **附加文件** 图标中进行选择：

![Screenshot of the 4 icons](/assets/images/docs/ai-toolkit/multi-media-icons.png)

The **Take Photo** button allows the user to use their device's camera to take a photo:

**拍照** 按钮允许用户使用设备的相机拍照：

![Selfie image](/assets/images/docs/ai-toolkit/selfie.png)

Pressing the **Image Gallery** button lets the user upload
from their device's image gallery:

按 **图库** 按钮可让用户从设备的图库中上传：

![Download image from gallery](/assets/images/docs/ai-toolkit/download-from-gallery.png)

Pressing the **Attach File** button lets the user select
a file of any type available on their device, like a PDF or TXT file.

按 **附加文件** 按钮可让用户选择设备上可用的任何类型的文件，例如 PDF 或 TXT 文件。

Once a photo, image, or file has been selected, it becomes an attachment and shows up as a thumbnail associated with the currently active prompt:

一旦选择了照片、图像或文件，它就会成为附件，并显示为与当前活动提示关联的缩略图：

![Thumbnails of images](/assets/images/docs/ai-toolkit/image-thumbnails.png)

The user can remove an attachment by clicking the
**X** button on the thumbnail.

用户可以通过点击缩略图上的 **X** 按钮来删除附件。

## Image zoom

## 图像缩放

The user can zoom into an image thumbnail by tapping it:

用户可以通过点击图像缩略图来放大它：

![Zoomed image](/assets/images/docs/ai-toolkit/image-zoom.png)

Pressing the **ESC** key or tapping anywhere outside the
image dismisses the zoomed image.

按 **ESC** 键或点击图像外的任何地方都会关闭放大的图像。

## Copy to clipboard

## 复制到剪贴板

The user can copy any text prompt or LLM response
in their current chat in a variety of ways.
On the desktop or the web, the user can mouse
to select the text on their screen and
copy it to the clipboard as normal:

用户可以通过多种方式复制当前聊天中的任何文本提示或 LLM 响应。
在桌面端或 Web 端，用户可以使用鼠标选择屏幕上的文本，
并像平常一样将其复制到剪贴板：

![Copy to clipboard](/assets/images/docs/ai-toolkit/copy-to-clipboard.png)

In addition, at the bottom of each prompt or response,
the user can press the **Copy** button that pops up
when they hover their mouse:

此外，在每个提示或响应的底部，
用户可以按鼠标悬停时弹出的 **复制** 按钮：

![Press the copy button](/assets/images/docs/ai-toolkit/chatbot-prompt.png)

On mobile platforms, the user can long-tap a prompt or response and choose the Copy option:

在移动平台上，用户可以长按提示或响应并选择复制选项：

![Long tap to see the copy button](/assets/images/docs/ai-toolkit/long-tap-choose-copy.png)

## Message editing

## 消息编辑

If the user would like to edit their last prompt
and cause the LLM to take another run at it,
they can do so. On the desktop,
the user can tap the **Edit** button alongside the
**Copy** button for their most recent prompt:

如果用户想要编辑他们的最后一条提示，
并让 LLM 重新处理它，他们可以这样做。
在桌面端，用户可以点击最近提示旁边的 **编辑** 按钮，
该按钮与 **复制** 按钮并列：

![How to edit prompt](/assets/images/docs/ai-toolkit/how-to-edit-prompt.png)

On a mobile device, the user can long-tap and get access
to the **Edit** option on their most recent prompt:

在移动设备上，用户可以长按并访问最近提示上的 **编辑** 选项：

![How to access edit menu](/assets/images/docs/ai-toolkit/accessing-edit-menu.png)

Once the user taps the **Edit** button, they enter Editing mode,
which removes both the user's last prompt and the LLM's
last response from the chat history,
puts the text of the prompt into the text field, and
provides an Editing indicator:

一旦用户点击 **编辑** 按钮，他们就会进入编辑模式，
该模式会从聊天历史记录中删除用户的最后一条提示和 LLM 的最后一个响应，
将提示的文本放入文本字段，并提供一个编辑指示器：

![How to exit editing mode](/assets/images/docs/ai-toolkit/how-to-exit-editing-mode.png)

In Editing mode, the user can edit the prompt as they choose
and submit it to have the LLM produce a response as normal.
Or, if they change their mind, they can tap the **X**
near the Editing indicator to cancel their edit and restore
their previous LLM response.

在编辑模式下，用户可以根据需要编辑提示并提交它，
让 LLM 像平常一样生成响应。
或者，如果他们改变主意，他们可以点击编辑指示器旁边的 **X** 来取消编辑，
并恢复之前的 LLM 响应。

## Material and Cupertino

## Material 和 Cupertino

When the `LlmChatView` widget is hosted in a [Material app][],
it uses facilities provided by the Material design language,
such as Material's [`TextField`][].
Likewise, when hosted in a [Cupertino app][],
it uses those facilities, such as [`CupertinoTextField`][].

当 `LlmChatView` widget 托管在 [Material app][] 中时，
它使用 Material 设计语言提供的工具，例如 Material 的 [`TextField`][]。
同样，当托管在 [Cupertino app][] 中时，
它使用这些工具，例如 [`CupertinoTextField`][]。

![Cupertino example app](/assets/images/docs/ai-toolkit/cupertino-chat-app.png)

However, while the chat view supports both the Material and
Cupertino app types, it doesn't automatically adopt the associated themes.
Instead, that's set by the `style` property of the `LlmChatView`
as described in the [Custom styling][] documentation.

然而，虽然聊天视图支持 Material 和 Cupertino 两种应用类型，
但它不会自动采用关联的主题。
相反，这是通过 `LlmChatView` 的 `style` 属性设置的，
如 [自定义样式][Custom styling] 文档中所述。

[Cupertino app]: {{site.api}}/flutter/cupertino/CupertinoApp-class.html
[`CupertinoTextField`]: {{site.api}}/flutter/cupertino/CupertinoTextField-class.html
[Custom styling]: /ai-toolkit/feature-integration#custom-styling
[Material app]: {{site.api}}/flutter/material/MaterialApp-class.html
[`TextField`]: {{site.api}}/flutter/material/TextField-class.html
