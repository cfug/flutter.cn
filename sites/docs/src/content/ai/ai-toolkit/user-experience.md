---
# title: User experience
title: 用户体验
# sidenav: ai
sidenav: ai
# description: >
#   How the user will experience the AI Toolkit in your app.
description: >
  用户在你的应用中如何体验 AI 工具包。
# prev:
#   title: AI Toolkit overview
#   path: /ai/ai-toolkit/
# next:
#   title: Feature integration
#   path: /ai/ai-toolkit/feature-integration
prev:
  title: AI 工具包概览
  path: /ai/ai-toolkit/
next:
  title: 功能集成
  path: /ai/ai-toolkit/feature-integration
ai-translated: true
---

The [`LlmChatView`][] widget is the entry point for the interactive chat
experience that AI Toolkit provides. Hosting an instance of the `LlmChatView`
enables a number of user experience features that don't require any additional
code to use:

[`LlmChatView`][] widget 是 AI 工具包提供的交互式聊天体验的入口。
托管 `LlmChatView` 实例即可启用多项无需额外代码的用户体验功能：

* **Multiline text input**: Allows users to paste long text input or insert new
  lines into their text as they enter it.

  **多行文本输入**：允许用户粘贴长文本或在输入时插入换行。

* **Voice input**: Allows users to input prompts using speech for ease of use.

  **语音输入**：允许用户通过语音输入提示词，便于使用。

* **Multimedia input**: Enables users to take pictures, send images and other
  file types and attach URLs as link to online resources.

  **多媒体输入**：支持拍照、发送图片与其他文件类型，并将 URL 作为在线资源链接附加。

* **Image zoom**: Enables users to zoom into image thumbnails.

  **图片缩放**：支持放大图片缩略图。

* **Copy to clipboard**: Allows the  user to copy the text of a message or a LLM
  response to the clipboard.

  **复制到剪贴板**：允许用户将消息或 LLM 回复文本复制到剪贴板。

* **Message editing**: Allows the user to edit the most recent message for
  resubmission to the LLM.

  **消息编辑**：允许用户编辑最近一条消息并重新提交给 LLM。

* **Material and Cupertino**: Adapts to the best practices of both design
  languages.

  **Material 与 Cupertino**：适配两种设计语言的最佳实践。

[`LlmChatView`]:
    {{site.pub-api}}/flutter_ai_toolkit/latest/flutter_ai_toolkit/LlmChatView-class.html

## Multiline text input

## 多行文本输入

The user has  options when it comes to submitting their prompt once they've
finished composing it, which again differs depending on their platform:

用户完成输入后提交提示词的方式因平台而异：

* **Mobile**: Tap the **Submit** button

  **移动端**：点击 **Submit** 按钮

* **Web**: Press **Enter** or tap the **Submit** button

  **Web**：按 **Enter** 或点击 **Submit** 按钮

* **Desktop**: Press **Enter** or tap the **Submit** button

  **桌面端**：按 **Enter** 或点击 **Submit** 按钮

In addition, the chat view supports text prompts with embedded newlines in them.
If the user has existing text with newlines, they can paste them into the prompt
text field as normal.

此外，聊天视图支持包含嵌入换行的文本提示词。
若用户已有带换行的文本，可照常粘贴到提示词文本框。

If they'd like to embed newlines into their prompt manually as they enter it,
they can do so. The gesture for that activity differs based on the platform
they're using:

若要在输入时手动插入换行，也可操作；手势因平台而异：

* **Mobile**: Tap Return key on the virtual keyboard

  **移动端**：点按虚拟键盘上的 Return 键

* **Web**: Press `Shift+Enter`

  **Web**：按 `Shift+Enter`

* **Desktop**: Press `Shift+Enter`

  **桌面端**：按 `Shift+Enter`

These options look like the following:

各平台效果如下：

**Web and Desktop**:

**Web 与桌面端**：

![Screenshot of entering text on
desktop](/assets/images/docs/ai-toolkit/desktop-enter-text.png)

**Mobile**:

**移动端**：

![Screenshot of entering text on
mobile](/assets/images/docs/ai-toolkit/mobile-enter-text.png)

## Voice input

## 语音输入

In addition to text input the chat view can take an audio recording as input by
tapping the Mic button, which is visible when no text has yet been entered.

除文本输入外，在未输入文字时可见 **Mic** 按钮，点按即可录音作为输入。

Tap the **Mic** button to start the recording:

点按 **Mic** 开始录音：

![Screenshot of entering
text](/assets/images/docs/ai-toolkit/enter-textfield.png)

Select the **Stop** button to translate the user's voice input into text:

选择 **Stop** 将语音转为文本：

This text can then be edited, augmented and submitted as normal.

随后可照常编辑、补充并提交该文本。

![Screenshot of entered
voice](/assets/images/docs/ai-toolkit/enter-voice-into-textfield.png)

## Multimedia input

## 多媒体输入

![Textfield containing "Testing, testing, one, two,
three"](/assets/images/docs/ai-toolkit/multi-media-testing-testing.png)

The chat view can also take images and files as input to pass along to the
underlying LLM. The user can select the **Plus** button to the left of the text
input and choose from the **Take Photo**, **Image Gallery**, **Attach File** and
**Attach Link** icons:

聊天视图还可接收图片与文件并传给底层 LLM。
用户可点按文本输入左侧的 **Plus** 按钮，
选择 **Take Photo**、**Image Gallery**、**Attach File** 与 **Attach Link** 图标：

![Screenshot of the 4
icons](/assets/images/docs/ai-toolkit/multi-media-icons.png)

The **Take Photo** button allows the user to use their device's camera to take a
photo:

**Take Photo** 允许用户使用设备相机拍照：

![Selfie image](/assets/images/docs/ai-toolkit/selfie.png)

Select the **Image Gallery** button to let the user upload from their device's
image gallery:

选择 **Image Gallery** 可从设备图库上传：

![Download image from
gallery](/assets/images/docs/ai-toolkit/download-from-gallery.png)

Select the **Attach File** button to let the user select a file of any type
available on their device, like a PDF or TXT file.

选择 **Attach File** 可选择设备上任意类型文件，如 PDF 或 TXT。

Select the **Attach Link** button to let the user enter a link to a web page or
an online file.

选择 **Attach Link** 可输入网页或在线文件链接。

Once a photo, image, file, or link has been selected, it becomes an attachment
and shows up as a thumbnail associated with the currently active prompt:

选定照片、图片、文件或链接后成为附件，
并以缩略图显示在当前提示词旁：

![Thumbnails of images](/assets/images/docs/ai-toolkit/image-thumbnails.png)

The user can remove an attachment by clicking the **X** button on the thumbnail.

用户可点按缩略图上的 **X** 移除附件。

## Image zoom

## 图片缩放

The user can zoom into an image thumbnail by tapping it:

用户可点按图片缩略图放大查看：

![Zoomed image](/assets/images/docs/ai-toolkit/image-zoom.png)

Pressing the **Esc** key or tapping anywhere outside the image dismisses the
zoomed image.

按 **Esc** 或在图片外任意处点按可关闭放大视图。

## Copy to clipboard

## 复制到剪贴板

The user can copy any text prompt or LLM response in their current chat in a
variety of ways. On the desktop or the web, the user can mouse to select the
text on their screen and copy it to the clipboard as normal:

用户可通过多种方式复制当前聊天中的文本提示词或 LLM 回复。
在桌面或 Web 上，可用鼠标选中文本并照常复制到剪贴板：

![Copy to clipboard](/assets/images/docs/ai-toolkit/copy-to-clipboard.png)

In addition, at the bottom of each prompt or response, the user can select the
**Copy** button that pops up when they hover their mouse:

此外，每条提示词或回复底部在鼠标悬停时会显示 **Copy** 按钮：

![Select the copy button](/assets/images/docs/ai-toolkit/chatbot-prompt.png)

On mobile platforms, the user can long-tap a prompt or response and choose the
Copy option:

在移动平台上，可长按提示词或回复并选择 Copy：

![Long tap to see the copy
button](/assets/images/docs/ai-toolkit/long-tap-choose-copy.png)

## Message editing

## 消息编辑

If the user would like to edit their last prompt and cause the LLM to take
another run at it, they can do so. On the desktop, the user can tap the **Edit**
button alongside the **Copy** button for their most recent prompt:

若用户想编辑最近一条提示词并让 LLM 重新生成回复，可以这样做。
在桌面上，可在最近一条提示词旁点按 **Edit**（与 **Copy** 并列）：

![How to edit prompt](/assets/images/docs/ai-toolkit/how-to-edit-prompt.png)

On a mobile device, the user can long-tap and get access to the **Edit** option
on their most recent prompt:

在移动设备上，可长按最近一条提示词以访问 **Edit**：

![How to access edit
menu](/assets/images/docs/ai-toolkit/accessing-edit-menu.png)

Once the user taps the **Edit** button, they enter Editing mode, which removes
both the user's last prompt and the LLM's last response from the chat history,
puts the text of the prompt into the text field, and provides an Editing
indicator:

点按 **Edit** 后进入编辑模式：从聊天历史中移除用户最近提示词与 LLM 最近回复，
将提示词文本放入文本框，并显示编辑指示器：

![How to exit editing
mode](/assets/images/docs/ai-toolkit/how-to-exit-editing-mode.png)

In Editing mode, the user can edit the prompt as they choose and submit it to
have the LLM produce a response as normal. Or, if they change their mind, they
can tap the **X** near the Editing indicator to cancel their edit and restore
their previous LLM response.

编辑模式下，用户可修改提示词并提交以让 LLM 正常生成回复。
若改变主意，可点按编辑指示器旁的 **X** 取消编辑并恢复先前的 LLM 回复。

## Material and Cupertino

## Material 与 Cupertino

When the `LlmChatView` widget is hosted in a [Material app][], it uses
facilities provided by the Material design language, such as Material's
[`TextField`][]. Likewise, when hosted in a [Cupertino app][], it uses those
facilities, such as [`CupertinoTextField`][].

当 `LlmChatView` 托管于 [Material app][] 时，会使用 Material 设计语言提供的设施，如 Material 的 [`TextField`][]。
同样，托管于 [Cupertino app][] 时使用 [`CupertinoTextField`][] 等设施。

![Cupertino example app](/assets/images/docs/ai-toolkit/cupertino-chat-app.png)

However, while the chat view supports both the Material and Cupertino app types,
it doesn't automatically adopt the associated themes. Instead, that's set by the
`style` property of the `LlmChatView` as described in the [Custom styling][]
documentation.

聊天视图虽支持 Material 与 Cupertino 应用类型，但不会自动采用关联主题。
主题由 `LlmChatView` 的 `style` 属性设置，详见 [自定义样式][Custom styling] 文档。

[Cupertino app]: {{site.api}}/flutter/cupertino/CupertinoApp-class.html
[`CupertinoTextField`]:
    {{site.api}}/flutter/cupertino/CupertinoTextField-class.html
[Custom styling]: /ai/ai-toolkit/feature-integration#custom-styling
[Material app]: {{site.api}}/flutter/material/MaterialApp-class.html
[`TextField`]: {{site.api}}/flutter/material/TextField-class.html
