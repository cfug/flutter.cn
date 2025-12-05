---
# title: AI Toolkit
title: AI Toolkit
# description: >
#   Learn how to add the AI Toolkit chatbot
#   to your Flutter application.
description: >
  Learn how to add the AI Toolkit chatbot
  to your Flutter application.
next:
  title: User experience
  path: /ai-toolkit/user-experience
---

Hello and welcome to the Flutter AI Toolkit!



欢迎使用 Flutter AI Toolkit！

:::note
These pages are now out of date. They will be
updated soon but, in the meantime, be aware that the
`google_generative_ai` and `vertexai_firebase` packages
are deprecated and replaced with [`package:firebase_ai`][].
:::

[`package:firebase_ai`]: {{site.pub-pkg}}/firebase_ai

The AI Toolkit is a set of AI chat-related widgets that make
it easy to add an AI chat window to your Flutter app.
The AI Toolkit is organized around an abstract
LLM provider API to make it easy to swap out the
LLM provider that you'd like your chat provider to use.
Out of the box, it comes with support for two LLM provider
integrations: Google Gemini AI and Firebase Vertex AI.



AI Toolkit 是一组与 AI 聊天相关的 widget，
可让你轻松地将 AI 聊天窗口添加到 Flutter 应用中。
AI Toolkit 围绕抽象的 LLM provider API 构建，
可以轻松更换你希望聊天 provider 使用的 LLM provider。
它开箱即支持两个 LLM provider 集成：
Google Gemini AI 和 Firebase Vertex AI。

## Key features



## 主要功能

* **Multi-turn chat**: Maintains context across multiple interactions.
* **Streaming responses**: Displays AI responses in
  real-time as they are generated.
* **Rich text display**: Supports formatted text in chat messages.
* **Voice input**: Allows users to input prompts using speech.
* **Multimedia attachments**: Enables sending and
  receiving various media types.
* **Custom styling**: Offers extensive customization to
  match your app's design.
* **Chat serialization/deserialization**: Store and retrieve conversations
  between app sessions.
* **Custom response widgets**: Introduce specialized UI components
  to present LLM responses.
* **Pluggable LLM support**: Implement a simple interface to plug
  in your own LLM.
* **Cross-platform support**: Compatible with Android, iOS, web,
  and macOS platforms.



* **多轮对话**：在多次交互中保持上下文。
* **流式响应**：在生成 AI 响应时实时显示。
* **富文本显示**：支持聊天消息中的格式化文本。
* **语音输入**：允许用户使用语音输入提示词。
* **多媒体附件**：支持发送和接收各种媒体类型。
* **自定义样式**：提供丰富的自定义选项以匹配你的应用设计。
* **聊天序列化/反序列化**：在应用会话之间存储和检索对话。
* **自定义响应 widget**：引入专门的 UI 组件来展示 LLM 响应。
* **可插拔 LLM 支持**：实现简单接口即可接入你自己的 LLM。
* **跨平台支持**：兼容 Android、iOS、Web 和 macOS 平台。

## Online Demo



## 在线演示

Here's the online demo hosting the AI Toolkit:



以下是托管 AI Toolkit 的在线演示：

<a href="https://flutter-ai-toolkit-examp-60bad.web.app/">
<img src="/assets/images/docs/ai-toolkit/ai-toolkit-app.png" alt="AI demo app">
</a>

The [source code for this demo][src-code] is available in the repo on GitHub.



该演示的[源代码][src-code]可在 GitHub 仓库中找到。

Or, you can open it in [Firebase Studio][],
Google's full-stack AI workspace and IDE that runs in the cloud:



或者，你可以在 [Firebase Studio][] 中打开它，
这是 Google 在云端运行的全栈 AI 工作空间和 IDE：

<a href="https://studio.firebase.google.com/new?template=https%3A%2F%2Fgithub.com%2Fflutter%2Fai">
  <picture>
    <source
      media="(prefers-color-scheme: dark)"
      srcset="https://cdn.firebasestudio.dev/btn/try_light_32.svg">
    <source
      media="(prefers-color-scheme: light)"
      srcset="https://cdn.firebasestudio.dev/btn/try_dark_32.svg">
    <img
      height="32"
      alt="Try in Firebase Studio"
      src="https://cdn.firebasestudio.dev/btn/try_blue_32.svg">
  </picture>
</a>

[src-code]: {{site.github}}/flutter/ai/blob/main/example/lib/demo/demo.dart
[Firebase Studio]: https://firebase.studio/

## Get started



## 入门指南

<ol>
<li><b>Installation</b>

Add the following dependencies to your `pubspec.yaml` file:



<ol>
<li><b>安装</b>

```yaml
dependencies:
  flutter_ai_toolkit: ^latest_version
  google_generative_ai: ^latest_version # you might choose to use Gemini,
  firebase_core: ^latest_version        # or Vertex AI or both
```
</li>

<li><b>Gemini AI configuration</b>

The toolkit supports both Google Gemini AI and
Firebase Vertex AI as LLM providers.
To use Google Gemini AI,
[obtain an API key][] from Gemini AI Studio.
Be careful not to check this key into your source code
repository to prevent unauthorized access.



将以下依赖项添加到你的 `pubspec.yaml` 文件中：

[obtain an API key]: https://aistudio.google.com/app/apikey

You'll also need to choose a specific Gemini model name
to use in creating an instance of the Gemini model.
The following example uses `gemini-2.0-flash`,
but you can choose from an [ever-expanding set of models][models].



<li><b>Gemini AI 配置</b>

[models]: https://ai.google.dev/gemini-api/docs/models/gemini

```dart
import 'package:google_generative_ai/google_generative_ai.dart';
import 'package:flutter_ai_toolkit/flutter_ai_toolkit.dart';

// ... app stuff here



该工具包支持 Google Gemini AI 和 Firebase Vertex AI 作为 LLM provider。
要使用 Google Gemini AI，
请从 Gemini AI Studio [获取 API 密钥][obtain an API key]。
请注意不要将此密钥提交到源代码仓库中，以防止未经授权的访问。

class ChatPage extends StatelessWidget {
  const ChatPage({super.key});



你还需要选择特定的 Gemini 模型名称来创建 Gemini 模型实例。
以下示例使用 `gemini-2.0-flash`，
但你可以从[不断扩展的模型列表][models]中选择。

@override
  Widget build(BuildContext context) => Scaffold(
        appBar: AppBar(title: const Text(App.title)),
        body: LlmChatView(
          provider: GeminiProvider(
            model: GenerativeModel(
              model: 'gemini-2.0-flash',
              apiKey: 'GEMINI-API-KEY',
            ),
          ),
        ),
      );
}
```



`GenerativeModel` 类来自 `google_generative_ai` package。
AI Toolkit 在此 package 基础上构建了 `GeminiProvider`，
它将 Gemini AI 接入 `LlmChatView`，
这是一个与用户进行基于 LLM 的聊天对话的顶级 widget。

The `GenerativeModel` class comes from the
`google_generative_ai` package.
The AI Toolkit builds on top of this package with
the `GeminiProvider`, which plugs Gemini AI into the
`LlmChatView`, the top-level widget that provides an
LLM-based chat conversation with your users.



有关完整示例，请查看 GitHub 上的 [`gemini.dart`][]。

For a complete example, check out [`gemini.dart`][] on GitHub.



<li><b>Vertex AI 配置</b>

[`gemini.dart`]: {{site.github}}/flutter/ai/blob/main/example/lib/gemini/gemini.dart
</li>

<li><b>Vertex AI configuration</b>

While Gemini AI is useful for quick prototyping,
the recommended solution for production apps is
Vertex AI in Firebase. This eliminates the need
for an API key in your client app and replaces it
with a more secure Firebase project.
To use Vertex AI in your project,
follow the steps described in the
[Get started with the Gemini API using the Vertex AI in Firebase SDKs][vertex] docs.



虽然 Gemini AI 适用于快速原型开发，
但对于生产应用，推荐使用 Firebase 中的 Vertex AI。
这消除了在客户端应用中使用 API 密钥的需要，
取而代之的是更安全的 Firebase 项目。
要在项目中使用 Vertex AI，
请按照[使用 Vertex AI in Firebase SDK 开始使用 Gemini API][vertex] 文档中描述的步骤操作。

[vertex]: https://firebase.google.com/docs/vertex-ai/get-started?platform=flutter

Once that's complete, integrate the new Firebase project
into your Flutter app using the `flutterfire CLI` tool,
as described in the [Add Firebase to your Flutter app][firebase] docs.



完成后，使用 `flutterfire CLI` 工具将新的 Firebase 项目集成到你的 Flutter 应用中，
如[将 Firebase 添加到你的 Flutter 应用][firebase]文档中所述。

[firebase]: https://firebase.google.com/docs/flutter/setup

After following these instructions,
you're ready to use Firebase Vertex AI in your Flutter app.
Start by initializing Firebase:



按照这些说明操作后，
你就可以在 Flutter 应用中使用 Firebase Vertex AI 了。
首先初始化 Firebase：

```dart
import 'package:firebase_core/firebase_core.dart';
import 'package:firebase_vertexai/firebase_vertexai.dart';
import 'package:flutter_ai_toolkit/flutter_ai_toolkit.dart';

// ... other imports



在 Flutter 应用中正确初始化 Firebase 后，
你现在可以创建 Vertex provider 的实例：

import 'firebase_options.dart'; // from `flutterfire config`



`FirebaseVertexAI` 类来自 `firebase_vertexai` package。
AI Toolkit 构建了 `VertexProvider` 类来向 `LlmChatView` 暴露 Vertex AI。
请注意，你需要提供模型名称（[你有多个选项][options]可供选择），
但不需要提供 API 密钥。
所有这些都作为 Firebase 项目的一部分处理。

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await Firebase.initializeApp(options: DefaultFirebaseOptions.currentPlatform);
  runApp(const App());
}



有关完整示例，请查看 GitHub 上的 [vertex.dart][]。

// ...app stuff here
```



<li><b>设置设备权限</b>

With Firebase properly initialized in your Flutter app,
you're now ready to create an instance of the Vertex provider:



要让用户能够使用语音输入和媒体附件等功能，
请确保你的应用具有必要的权限：

```dart
class ChatPage extends StatelessWidget {
  const ChatPage({super.key});

@override
  Widget build(BuildContext context) => Scaffold(
        appBar: AppBar(title: const Text(App.title)),
        // create the chat view, passing in the Vertex provider
        body: LlmChatView(
          provider: VertexProvider(
            chatModel: FirebaseVertexAI.instance.generativeModel(
              model: 'gemini-2.0-flash',
            ),
          ),
        ),
      );
}
```



* **网络访问：**
  要在 macOS 上启用网络访问，
  请将以下内容添加到你的 `*.entitlements` 文件中：

The `FirebaseVertexAI` class comes from the
`firebase_vertexai` package. The AI Toolkit
builds the `VertexProvider` class to expose
Vertex AI to the `LlmChatView`.
Note that you provide a model name
([you have several options][options] from which to choose),
but you do not provide an API key.
All of that is handled as part of the Firebase project.



要在 Android 上启用网络访问，
  请确保你的 `AndroidManifest.xml` 文件包含以下内容：

For a complete example, check out [vertex.dart][] on GitHub.



* **麦克风访问**：按照
  [record package 的权限设置说明][record]进行配置。
* **文件选择**：按照 [file_selector 插件的说明][file]操作。
* **图片选择**：要在设备上拍照_或_从设备中选择图片，
  请参阅 [image_picker 插件的安装说明][image_picker]。
* **Web 拍照**：要在 Web 上拍照，
  请按照 [camera 插件的设置说明][camera]配置应用。

[options]: https://firebase.google.com/docs/vertex-ai/gemini-models#available-model-names
[vertex.dart]: {{site.github}}/flutter/ai/blob/main/example/lib/vertex/vertex.dart
</li>

<li><b>Set up device permissions</b>

To enable your users to take advantage of features like voice input and media
attachments, ensure that your app has the necessary permissions:



## 示例

* **Network access:**
  To enable network access on macOS,
  add the following to your `*.entitlements` files:



要执行仓库中的[示例应用][example apps]，
你需要替换 `example/lib/gemini_api_key.dart`
和 `example/lib/firebase_options.dart` 文件，
这两个文件都只是占位符。它们是启用 `example/lib` 文件夹中示例项目所必需的。

```xml
  <plist version="1.0">
    <dict>
      ...
      <key>com.apple.security.network.client</key>
      <true/>
    </dict>
  </plist>
  ```

To enable network access on Android,
  ensure that your `AndroidManifest.xml` file contains the following:



大多数示例应用依赖于 Gemini API 密钥，
因此要使它们正常工作，你需要在
`example/lib/gemini_api_key.dart` 文件中填入你的 API 密钥。
你可以在 [Gemini AI Studio][] 中获取 API 密钥。

```xml
  <manifest xmlns:android="http://schemas.android.com/apk/res/android">
      ...
      <uses-permission android:name="android.permission.INTERNET"/>
  </manifest>
  ```

* **Microphone access**: Configure according to the
  [record package's permission setup instructions][record].
* **File selection**: Follow the [file_selector plugin's instructions][file].
* **Image selection**: To take a picture on _or_ select a picture from their
  device, refer to the
  [image_picker plugin's installation instructions][image_picker].
* **Web photo**: To take a picture on the web, configure the app
  according to the [camera plugin's setup instructions][camera].



要使用 [Vertex AI 示例应用][vertex-ex]，
请将你的 Firebase 配置详情放入
`example/lib/firebase_options.dart` 文件中。
你可以使用 `flutterfire CLI` 工具完成此操作，
如[将 Firebase 添加到你的 Flutter 应用][add-fb]文档中所述，
**需要在 `example` 目录内执行**。

[camera]: {{site.pub-pkg}}/camera#setup
[file]: {{site.pub-pkg}}/file_selector#usage
[image_picker]: {{site.pub-pkg}}/image_picker#installation
[record]: {{site.pub-pkg}}/record#setup-permissions-and-others
</li>
</ol>

## Examples



## 反馈！

To execute the [example apps][] in the repo,
you'll need to replace the `example/lib/gemini_api_key.dart`
and `example/lib/firebase_options.dart` files,
both of which are just placeholders. They're needed
to enable the example projects in the `example/lib` folder.



在使用此 package 的过程中，
请[记录问题和功能请求][file-issues]，
并提交你希望[贡献的代码][submit]。
我们需要你的反馈和贡献，
以确保 AI Toolkit 对你的实际应用尽可能强大和有用。

**gemini_api_key.dart**

Most of the example apps rely on a Gemini API key,
so for those to work, you'll need to plug your API key
in the `example/lib/gemini_api_key.dart` file.
You can get an API key in [Gemini AI Studio][].

:::note
**Be careful not to check the `gemini_api_key.dart` file into your git repo.**
:::

**firebase_options.dart**

To use the [Vertex AI example app][vertex-ex],
place your Firebase configuration details
into the `example/lib/firebase_options.dart` file.
You can do this with the `flutterfire CLI` tool as described
in the [Add Firebase to your Flutter app][add-fb] docs
**from within the `example` directory**.

:::note
**Be careful not to check the `firebase_options.dart`
file into your git repo.**
:::

## Feedback!

Along the way, as you use this package,
please [log issues and feature requests][file-issues] as well as
submit any [code you'd like to contribute][submit].
We want your feedback and your contributions
to ensure that the AI Toolkit is just as robust and useful
as it can be for your real-world apps.

[add-fb]: https://firebase.google.com/docs/flutter/setup
[example apps]: {{site.github}}/flutter/ai/tree/main/example/lib
[file-issues]: {{site.github}}/flutter/ai/issues
[Gemini AI Studio]: https://aistudio.google.com/app/apikey
[submit]: {{site.github}}/flutter/ai/pulls
[vertex-ex]: {{site.github}}/flutter/ai/blob/main/example/lib/vertex/vertex.dart
