--- 
# title: Get started with the GenUI SDK for Flutter
title: GenUI SDK 入门
# sidenav: ai
sidenav: ai
# shortTitle: Get started with the GenUI SDK
shortTitle: GenUI SDK 入门
# breadcrumb: Get started
breadcrumb: 入门
# description: >-
#   Learn how to use GenUI SDK for Flutter and add it
#   to your existing Flutter app.
description: >-
  了解如何使用 GenUI SDK for Flutter，并将其添加到你现有的 Flutter 应用。
next:
  # title: Input and events
  title: 输入与事件
  path: /ai/genui/input-events
prev:
  # title: GenUI SDK main components & concepts
  title: GenUI SDK 主要组件与概念
  path: /ai/genui/components
ai-translated: true
---

This guide explains how to get started with
GenUI SDK for Flutter and its series of packages.
The SDK's key components
are described in the [main components][] page.

本指南说明如何开始使用 GenUI SDK for Flutter 及其系列包。SDK 的关键组件见[主要组件][main components] 页面。

:::experimental
The `genui` package is in
alpha and is likely to change.
:::

:::experimental
`genui` 包处于 alpha 阶段，可能会变更。
:::

Use the following instructions to add [`genui`][] to your Flutter app.
The code examples show how to perform the instructions on a brand new
app created by running [`flutter create`][], but you can follow the same
steps for your existing Flutter app.

按以下说明将 [`genui`][] 添加到你的 Flutter 应用。代码示例展示如何在运行 [`flutter create`][] 创建的全新应用上操作，现有 Flutter 应用也可遵循相同步骤。

[`genui`]: {{site.pub-pkg}}/genui
[main components]: /ai/genui/components
[`flutter create`]: /reference/create-new-app

## Configure your agent provider

## 配置智能体提供方

The `genui` package can connect to a variety of agent providers.
Available providers include the following:

`genui` 包可连接多种智能体提供方，包括：

**Firebase AI Logic**
: Useful for production apps where interactions with the LLM are
  all in your Flutter client, without requiring a server.
  Firebase also makes it easier to ship your
  AI features securely since Firebase handles the
  management of your Gemini API key.

**Firebase AI Logic**
: 适用于与 LLM 的交互全部在 Flutter 客户端、无需服务器的生产应用。Firebase 还便于安全交付 AI 功能，因为它负责管理 Gemini API 密钥。

**GenUI A2UI**
: Useful for client/server architectures where your
  agent is running on the server.

**GenUI A2UI**
: 适用于智能体运行在服务器上的客户端/服务器架构。

**Build your own**
: You can also build your own adapter
  to connect to your preferred LLM provider.
  Expect more from us and the community soon.

**自行构建**
: 你也可以构建自己的适配器以连接首选 LLM 提供方。我们与社区很快会有更多方案。

<Tabs key="agent-provider" wrapped="true">

<Tab name="Firebase AI Logic">

To connect to Gemini using the Vertex AI for Firebase SDK, follow these instructions:

使用 Vertex AI for Firebase SDK 连接 Gemini，请按以下说明操作：

 1. [Create a new Firebase project][] using the Firebase Console.

 使用 Firebase Console [创建新的 Firebase 项目][Create a new Firebase project]。

 2. [Enable the Gemini API][] for that project.

 2. 为该项目[启用 Gemini API][Enable the Gemini API]。

 3. Follow the first three steps in [Firebase's Flutter setup guide][]
    to add Firebase to your app.

 3. 按 [Firebase Flutter 设置指南][Firebase's Flutter setup guide] 的前三步将 Firebase 添加到应用。

 4. Use `dart pub add` to add `genui` and `firebase_vertex_ai` as
    dependencies in your `pubspec.yaml` file:

 4. 使用 `dart pub add` 在 `pubspec.yaml` 中添加 `genui` 与 `firebase_vertex_ai` 依赖：

    ```console
    $ dart pub add genui firebase_vertex_ai
    ```

 5. In your app's `main` method, ensure that the widget
    bindings are initialized and then initialize Firebase:

    ```dart
    import 'package:flutter/material.dart';
    import 'package:firebase_core/firebase_core.dart';
    import 'firebase_options.dart';

    void main() async {
      WidgetsFlutterBinding.ensureInitialized();
      await Firebase.initializeApp(
        options: DefaultFirebaseOptions.currentPlatform,
      );
      runApp(const MyApp());
    }
    ```

 6. Create an instance of the Vertex AI for Firebase generative model and wrap it
    with your `SurfaceController` and `A2uiTransportAdapter`:

    ```dart
    import 'package:genui/genui.dart';
    import 'package:firebase_vertex_ai/firebase_vertex_ai.dart';

    final catalog = Catalog(components: [
      // ...
    ]);
    final catalogs = [catalog];

    final surfaceController = SurfaceController(catalogs: catalogs);
    
    final promptBuilder = PromptBuilder.chat(
      catalog: catalog,
      systemPromptFragments: ['You are a helpful assistant.'],
    );

    final model = FirebaseVertexAI.instance.generativeModel(
      model: 'gemini-2.5-flash',
      systemInstruction: Content.system(promptBuilder.systemPromptJoined()),
    );

    // The Conversation wires transport -> controller internally.
    late final A2uiTransportAdapter transportAdapter;
    transportAdapter = A2uiTransportAdapter(onSend: (message) async {
      // final stream = model.generateContentStream(...);
      // await for (final chunk in stream) {
      //   transportAdapter.addChunk(chunk.text ?? '');
      // }
    });

    final conversation = Conversation(
      controller: surfaceController,
      transport: transportAdapter,
    );
    ```

[Create a new Firebase project]: https://support.google.com/appsheet/answer/10104995
[Enable the Gemini API]: https://firebase.google.com/docs/gemini-in-firebase/set-up-gemini
[Firebase's Flutter setup guide]: https://firebase.google.com/docs/flutter/setup
[`firebase_ai_logic`]: {{site.pub-pkg}}/firebase_ai_logic

</Tab>

<Tab name="GenUI A2UI">

An integration package for [`genui`][] and the 
[A2UI Streaming UI Protocol][]. This package allows
Flutter applications to connect to an Agent-to-Agent (A2UI)
server and render dynamic user interfaces generated by an
AI agent using the `genui` framework.

[`genui`][] 与 [A2UI 流式 UI 协议][A2UI Streaming UI Protocol] 的集成包，使 Flutter 应用可连接 Agent-to-Agent（A2UI）服务器，并用 `genui` 框架渲染 AI 智能体生成的动态用户界面。

The main components in this package include:

该包的主要组件包括：

* `A2uiAgentConnector`:
  Handles the low-level web socket communication with the
  A2A server, including sending messages and parsing stream events.
* `AgentCard`:
  A data class that holds metadata about the connected AI agent.

Follow these instructions:

 1. Set up dependencies:
    Use `dart pub add` to add `genui`, `genui_a2a`, and `a2a` as
    dependencies in your `pubspec.yaml` file.

    ```console
    $ dart pub add genui genui_a2a a2a
    ```

 2. Initialize `SurfaceController`:
    Set up `SurfaceController` with your widget `Catalog`s.

 3. Create `A2uiTransportAdapter`:
    Instantiate `A2uiTransportAdapter` to parse the messages.

 4. Create `A2uiAgentConnector`:
    Instantiate `A2uiAgentConnector`, providing the A2A server URI.

 5. Create `Conversation`:
    Pass the adapter and controller to the `Conversation`.

 6. Render with `Surface`:
    Use `Surface` widgets in your UI to display
    the agent-generated content.

 7. Send Messages:
    Use `connector.connectAndSend` or `Conversation.sendMessage` to send user input
    to the agent-generated content.

    ```dart
    import 'package:flutter/material.dart';
    import 'package:genui/genui.dart';
    import 'package:genui_a2a/genui_a2a.dart';
    import 'package:logging/logging.dart';

    void main() {
      // Setup logging.
      Logger.root.level = Level.ALL;
      Logger.root.onRecord.listen((record) {
        print('${record.level.name}: ${record.time}: ${record.message}');
        if (record.error != null) {
          print(record.error);
        }
        if (record.stackTrace != null) {
          print(record.stackTrace);
        }
      });

      runApp(const GenUIExampleApp());
    }

    class GenUIExampleApp extends StatelessWidget {
      const GenUIExampleApp({super.key});

      @override
      Widget build(BuildContext context) {
        return MaterialApp(
          title: 'A2UI Example',
          theme: ThemeData(
            primarySwatch: Colors.blue,
          ),
          home: const ChatScreen(),
        );
      }
    }

    class ChatScreen extends StatefulWidget {
      const ChatScreen({super.key});

      @override
      State<ChatScreen> createState() => _ChatScreenState();
    }

    class _ChatScreenState extends State<ChatScreen> {
      final TextEditingController _textController = TextEditingController();
      final SurfaceController _surfaceController =
          SurfaceController(catalogs: [BasicCatalogItems.asCatalog()]);
      late final A2uiTransportAdapter _transportAdapter;
      late final Conversation _uiAgent;
      late final A2uiAgentConnector _connector;
      final List<ChatMessage> _messages = [];

      @override
      void initState() {
        super.initState();
        
        // The Conversation wires transport -> controller internally.
        _transportAdapter = A2uiTransportAdapter(onSend: (message) async {
          // Implement sending to LLM if needed, or handled by connector
        });
        
        _connector = A2uiAgentConnector(
          // TODO: Replace with your A2A server URL.
          url: Uri.parse('http://localhost:8080'),
        );
        _uiAgent = Conversation(
          controller: _surfaceController,
          transport: _transportAdapter,
        );

        // Listen for messages from the remote agent.
        _connector.stream.listen(_surfaceController.handleMessage);

      }

      @override
      void dispose() {
        _textController.dispose();
        _uiAgent.dispose();
        _transportAdapter.dispose();
        _surfaceController.dispose();
        _connector.dispose();
        super.dispose();
      }

      void _handleSubmitted(String text) async {
        if (text.isEmpty) return;
        _textController.clear();
        final message = ChatMessage.user(TextPart(text));
        setState(() {
          _messages.insert(0, message);
        });
        
        final responseText = await _connector.connectAndSend(
            message,
            clientCapabilities: A2uiClientCapabilities(supportedProtocols: ['a2ui/0.9.0'])
        );
        
        // Handling response depends on your app's logic
      }

      @override
      Widget build(BuildContext context) {
        return Scaffold(
          appBar: AppBar(
            title: const Text('A2UI Example'),
          ),
          body: Column(
            children: <Widget>[
              Expanded(
                child: ListView.builder(
                  padding: const EdgeInsets.all(8.0),
                  reverse: true,
                  itemBuilder: (_, int index) =>
                      _buildMessage(_messages[index]),
                  itemCount: _messages.length,
                ),
              ),
              const Divider(height: 1.0),
              Container(
                decoration: BoxDecoration(color: Theme.of(context).cardColor),
                child: _buildTextComposer(),
              ),
              // Surface for the main AI-generated UI:
              SizedBox(
                height: 300,
                child: Surface(
                  surfaceController: _surfaceController,
                  surfaceId: 'main_surface',
                ),
              ),
            ],
          ),
        );
      }

      Widget _buildMessage(ChatMessage message) {
        return Container(
          margin: const EdgeInsets.symmetric(vertical: 10.0),
          child: Row(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: <Widget>[
              Container(
                margin: const EdgeInsets.only(right: 16.0),
                child: CircleAvatar(child: Text(message.role == Role.user ? 'U' : 'A')),
              ),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: <Widget>[
                    Text(message.role == Role.user ? 'User' : 'Agent',
                        style: const TextStyle(fontWeight: FontWeight.bold)),
                    Container(
                      margin: const EdgeInsets.only(top: 5.0),
                      child: Text(message.parts.whereType<TextPart>().map((e) => e.text).join('\n')),
                    ),
                  ],
                ),
              ),
            ],
          ),
        );
      }

      Widget _buildTextComposer() {
        return IconTheme(
          data: IconThemeData(color: Theme.of(context).colorScheme.secondary),
          child: Container(
            margin: const EdgeInsets.symmetric(horizontal: 8.0),
            child: Row(
              children: <Widget>[
                Flexible(
                  child: TextField(
                    controller: _textController,
                    onSubmitted: _handleSubmitted,
                    decoration:
                        const InputDecoration.collapsed(hintText: 'Send a message'),
                  ),
                ),
                Container(
                  margin: const EdgeInsets.symmetric(horizontal: 4.0),
                  child: IconButton(
                    icon: const Icon(Icons.send),
                    onPressed: () => _handleSubmitted(_textController.text),
                  ),
                ),
              ],
            ),
          ),
        );
      }
    }
    ```

The [example][] directory on pub.dev contains a
complete application demonstrating how to use this package.

[example]: {{site.pub-pkg}}/genui_a2a/example
[A2UI Streaming UI Protocol]: https://a2ui.org/

</Tab>

<Tab name="Build your own">

To use `genui` with another agent provider,
follow that provider's SDK documentation to implement a connection,
and stream its results into an `A2uiTransportAdapter`.

:::warning
`PromptBuilder.chat()` generates a system prompt that might be
**3,000–5,000+ tokens** long, which can
exceed the context window of on-device or small models.
If you are targeting an on-device LLM, consider:

- Writing a compact custom system prompt that covers only the
  A2UI `createSurface` to `updateComponents` flow.
- Using `systemPromptFragments` to pass only the portions of
  the schema your use case requires.

`PromptBuilder.chat()` 生成的系统提示词可能长达 **3,000–5,000+ token**，可能超出设备端或小模型的上下文窗口。若面向设备端 LLM，可考虑：

- 编写仅覆盖 A2UI `createSurface` 到 `updateComponents` 流程的紧凑自定义系统提示词。  
- 使用 `systemPromptFragments` 仅传入用例所需的 schema 部分。  
:::

</Tab>

</Tabs>

## Create the connection to an agent

## 创建与智能体的连接

If you build your Flutter project for iOS or macOS,
add this key to your `{ios,macos}/Runner/*.entitlements` file(s)
to enable outbound network requests:

若你为 iOS 或 macOS 构建 Flutter 项目，在 `{ios,macos}/Runner/*.entitlements` 文件中添加以下键以启用出站网络请求：

```xml
<dict>
...
<key>com.apple.security.network.client</key>
<true/>
</dict>
```

Next, use the following instructions to connect your app
to your chosen agent provider.

接下来，按以下说明将应用连接到所选智能体提供方。

 1. Create a `SurfaceController`, and provide it with the catalogs
    of widgets that you want to make available to the agent.
    Create an `A2uiTransportAdapter` to parse messages and connect it.

 创建 `SurfaceController`，提供你希望向智能体开放的 widget catalog，并创建 `A2uiTransportAdapter` 解析消息并连接。

 2. Create a `PromptBuilder`, and provide it with a
    system instruction and the tools (functions
    you want the agent to be able to invoke).
    You should always include the tools provided by `SurfaceController`,
    but feel free to include others. Add this to your LLM system prompt.

 2. 创建 `PromptBuilder`，提供系统指令与工具（你希望智能体能调用的函数）。应始终包含 `SurfaceController` 提供的工具，也可添加其他工具，并写入 LLM 系统提示词。

 3. Create a `Conversation` using the instances of
    `SurfaceController` and `A2uiTransportAdapter`. Your app will
    primarily interact with this object to get things done.

 3. 使用 `SurfaceController` 与 `A2uiTransportAdapter` 实例创建 `Conversation`；应用主要通过该对象完成工作。

    For example:

    ```dart
    class _MyHomePageState extends State<MyHomePage> {
      late final SurfaceController _surfaceController;
      late final A2uiTransportAdapter _transportAdapter;
      late final Conversation _conversation;

      @override
      void initState() {
        super.initState();

        // Create a SurfaceController with a widget catalog.
        // The BasicCatalogItems contain basic widgets for text, markdown, and images.
        _surfaceController = SurfaceController(catalogs: [BasicCatalogItems.asCatalog()]);

        // The Conversation wires transport -> controller internally.
        _transportAdapter = A2uiTransportAdapter(onSend: (message) async {
          // Implement sending to LLM and pipe chunks back.
        });

        final catalog = BasicCatalogItems.asCatalog();
        final promptBuilder = PromptBuilder.chat(
          catalog: catalog,
          systemPromptFragments: [
            '''
            You are an expert in creating funny riddles. Every time I give you a word,
            you should generate UI that displays one new riddle related to that word.
            Each riddle should have both a question and an answer.
            '''
          ],
        );

        // ... initialize your LLM Client of choice using promptBuilder.systemPromptJoined()

        // Create the Conversation to orchestrate everything.
        _conversation = Conversation(
          controller: _surfaceController,
          transport: _transportAdapter,
        );
        
        // Listen for surface lifecycle events:
        _conversation.events.listen((event) {
          if (event is ConversationSurfaceAdded) {
            _onSurfaceAdded(event);
          } else if (event is ConversationSurfaceRemoved) {
            _onSurfaceDeleted(event);
          }
        });
      }

      @override
      void dispose() {
        _textController.dispose();
        _conversation.dispose();
        _transportAdapter.dispose();
    
        super.dispose();
      }
    }
    ```
   
## Send messages and display the agent's responses

## 发送消息并显示智能体响应

Send a request to the agent using the `sendRequest` method
in the `Conversation` class,
or by directly streaming into your LLM Client and pumping
the result stream to the adapter by using `_transportAdapter.addChunk`.

使用 `Conversation` 类的 `sendRequest` 方法向智能体发送请求，或直接流式传输到 LLM 客户端并用 `_transportAdapter.addChunk` 将结果流传入适配器。

To receive and display generated UI:

要接收并显示生成的 UI：

  1. Listen to the `events` stream in `Conversation` to track the addition
     and removal of UI surfaces as they are generated.
     These events include a _surface ID_ for each surface.

  2. Build a `Surface` widget for each active surface using
     the surface IDs received in the previous step.

     For example:

     ```dart
     class _MyHomePageState extends State<MyHomePage> {
       // ...

       final _textController = TextEditingController();
       final _surfaceIds = <String>[];

       // Send a request containing the user's [text] to the agent.
       void _sendMessage(String text) async {
         if (text.trim().isEmpty) return;
         // await _conversation.sendRequest(ChatMessage.user(TextPart(text)));
       }

       // Invoked by the events stream listener when a new
       // UI surface is generated. Here, the ID is stored so the
       // build method can create a Surface to display it.
       void _onSurfaceAdded(ConversationSurfaceAdded update) {
         setState(() {
           _surfaceIds.add(update.surfaceId);
         });
       }

       // Invoked by the events stream listener when a UI surface is removed.
       void _onSurfaceDeleted(ConversationSurfaceRemoved update) {
         setState(() {
           _surfaceIds.remove(update.surfaceId);
         });
       }

       @override
       Widget build(BuildContext context) {
         return Scaffold(
           appBar: AppBar(
             backgroundColor: Theme.of(context).colorScheme.inversePrimary,
             title: Text(widget.title),
           ),
           body: Column(
             children: [
               Expanded(
                 child: ListView.builder(
                   itemCount: _surfaceIds.length,
                   itemBuilder: (context, index) {
                     // For each surface, create a Surface to display it.
                     final id = _surfaceIds[index];
                     return Surface(surfaceContext: _surfaceController.contextFor(id));
                   },
                 ),
               ),
               SafeArea(
                 child: Padding(
                   padding: const EdgeInsets.symmetric(horizontal: 16.0),
                   child: Row(
                     children: [
                       Expanded(
                         child: TextField(
                           controller: _textController,
                           decoration: const InputDecoration(
                             hintText: 'Enter a message',
                           ),
                         ),
                       ),
                       const SizedBox(width: 16),
                       ElevatedButton(
                         onPressed: () {
                           // Send the user's text to the agent.
                           _sendMessage(_textController.text);
                           _textController.clear();
                         },
                         child: const Text('Send'),
                       ),
                     ],
                   ),
                 ),
               ),
             ],
           ),
         );
       }
     }
     ```

## Add your own widgets to the catalog {:#custom-widgets}

## 将自定义 widget 加入 catalog {:#custom-widgets}

For your convenience, you can use the provided core catalog of widgets.
However, most production apps will want to define a custom
catalog of widgets.

为方便起见，可使用提供的核心 widget catalog。但多数生产应用会希望定义自定义 widget catalog。

To add your own widgets, use the following instructions.

要添加自定义 widget，请按以下说明操作。

 1. Depend on the `json_schema_builder` package

 依赖 `json_schema_builder` 包

    Use `dart pub add` to add `json_schema_builder` as
    a dependency in your `pubspec.yaml` file:
   
    ```console
    $ dart pub add json_schema_builder
    ```

 2. Create the new widget's schema

    Each catalog item needs a schema that defines the data required
    to populate it. Using the `json_schema_builder` package,
    define one for the new widget.

    ```dart
    import 'package:json_schema_builder/json_schema_builder.dart';
    import 'package:flutter/material.dart';
    import 'package:genui/genui.dart';

    final _schema = S.object(
      properties: {
        'question': S.string(description: 'The question part of a riddle.'),
        'answer': S.string(description: 'The answer part of a riddle.'),
      },
      required: ['question', 'answer'],
    );
    ```

 3. Create a `CatalogItem`

    Each `CatalogItem` represents a type of widget that the agent
    is allowed to generate. To do that, it combines a name,
    a schema, and a builder function that produces the widgets
    that compose the generated UI.

    ```dart
    final riddleCard = CatalogItem(
      name: 'RiddleCard',
      dataSchema: _schema,
      widgetBuilder:
          ({
            required data,
            required id,
            required buildChild,
            required dispatchEvent,
            required context,
            required dataContext,
          }) {
            final json = data as Map<String, Object?>;
            final question = json['question'] as String;
            final answer = json['answer'] as String;

            return Container(
              constraints: const BoxConstraints(maxWidth: 400),
              decoration: BoxDecoration(border: Border.all()),
              padding: const EdgeInsets.all(16),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(question, style: Theme.of(context).textTheme.headlineMedium),
                  const SizedBox(height: 8.0),
                  Text(answer, style: Theme.of(context).textTheme.headlineSmall),
                ],
              ),
            );
          },
    );
    ```

 4. Add the `CatalogItem` to the catalog

     Include your catalog items when instantiating `SurfaceController`.

    ```dart
    _surfaceController = SurfaceController(
      catalogs: [BasicCatalogItems.asCatalog().copyWith([riddleCard])],
    );
    ```

 5. Update the system instruction to use the new widget

    To make sure that the agent knows to use your new widget,
    tell the system instruction how and when to do so.
    Provide the name from the `CatalogItem` when you do.

    ```dart
    final promptBuilder = PromptBuilder.chat(
      catalog: catalog,
      systemPromptFragments: [
        '''
        You are an expert in creating funny riddles. Every time I give you a word,
        generate a RiddleCard that displays one new riddle related to that word.
        Each riddle should have both a question and an answer.
        '''
      ],
    );
    
    // Pass promptBuilder.systemPromptJoined() to your LLM Config
    ```

{:.steps}

## Data model and data binding

## 数据模型与数据绑定

A core concept in `genui` is the `DataModel`, a centralized,
observable store for all dynamic UI state. Instead of each widget
managing its own state, its state is stored in the `DataModel`.

`genui` 的核心概念是 `DataModel`——所有动态 UI 状态的集中、可观察存储。各 widget 不各自管理状态，而是将状态存入 `DataModel`。

Widgets are _bound_ to data in this model.
When data in the model changes, only the widgets that depend
on that specific piece of data are rebuilt.
This is achieved through a `DataContext` object passed to each
widget's builder function.

widget _绑定_ 到该模型中的数据；模型中的数据变化时，仅依赖该数据的 widget 会重建。这通过传给各 widget builder 函数的 `DataContext` 对象实现。

### Binding to the data model

### 绑定到数据模型

To bind a widget's property to the data model,
specify a special JSON object in the data sent from the AI.
This object can contain standard JSON primitives
(for static values) or an object with a `path` property
(to bind to a value in the data model).

要将 widget 属性绑定到数据模型，在 AI 发送的数据中指定特殊 JSON 对象。该对象可含标准 JSON 基元（静态值），或含 `path` 属性的对象（绑定到数据模型中的值）。

For example, to display a user's name in a `Text` widget,
the AI would generate:

例如，要在 `Text` widget 中显示用户名，AI 会生成：

```json
{
  "component": "Text",
  "text": "Welcome to GenUI",
  "variant": "h1"
}
```

### Image

### Image（图像）

```json
{
  "component": "Image",
  "url": "https://example.com/image.png",
  "variant": "mediumFeature"
}
```

### Updating the data model

### 更新数据模型

Input widgets, like `TextField`, update the DataModel directly.
When the user types in a text field that is bound to `/user/name`,
the `DataModel` updates, and any other widgets bound to that same
path will automatically rebuild to show the new value.

输入类 widget（如 `TextField`）直接更新 DataModel。用户在绑定到 `/user/name` 的文本字段中输入时，`DataModel` 更新，绑定同一路径的其他 widget 会自动重建以显示新值。

This reactive data flow simplifies state management and creates a powerful,
high-bandwidth interaction loop between the user, the UI, and the AI.

这种响应式数据流简化状态管理，并在用户、UI 与 AI 之间形成强大的高带宽交互循环。

## Next steps

## 后续步骤

Check out the [examples][] included in the `genui` repo.
The [travel app][] shows how to define your own widget
catalog that the agent can use to generate domain-specific UI.

查看 `genui` 仓库中的[示例][examples]。[旅行应用][travel app] 展示如何定义智能体可用于生成领域特定 UI 的自定义 widget catalog。

If something is unclear or missing, please [create an issue][].

若有不清楚或缺失之处，请[提交 issue][create an issue]。

[examples]: {{site.repo.organization}}/genui/blob/main/examples
[travel app]: {{site.repo.organization}}/genui/blob/main/examples/travel_app
[create an issue]: {{site.repo.organization}}/genui/issues/new/choose

## System instructions

## 系统指令

The `genui` package gives the LLM a set of tools it can use to generate UI.
To get the LLM to use these tools,
the system instructions provided through `PromptBuilder` must
explicitly tell it to do so.

`genui` 包为 LLM 提供一组可用于生成 UI 的工具。要让 LLM 使用这些工具，通过 `PromptBuilder` 提供的系统指令必须明确告知其这样做。

This is why the [earlier example][instruction-example] includes
a system instruction for the agent with the line
"Every time I give you a word, you should generate UI that...":

因此[先前的示例][instruction-example] 为智能体包含系统指令，其中有「每次我给你一个词，你应生成 UI……」这样的表述：

```dart highlightLines=4-5
final promptBuilder = PromptBuilder.chat(
  catalog: catalog,
  instructions: '''
    You are an expert in creating funny riddles.
    Every time I give you a word, you should generate UI that
    displays one new riddle related to that word.
    Each riddle should have both a question and an answer.
    ''',
);
```

[instruction-example]: /ai/genui/get-started#create-the-connection-to-an-agent

## Troubleshooting/FAQ {:#troubleshoot}

## 故障排除 / 常见问题 {:#troubleshoot}

### How can I configure logging?

### 如何配置日志？

To observe communication between your app and the agent,
enable logging in your `main` method.

要在 `main` 方法中观察应用与智能体之间的通信，请启用日志。

```dart
import 'package:logging/logging.dart';
import 'package:genui/genui.dart';

final logger = configureGenUiLogging(level: Level.ALL);

void main() async {
  logger.onRecord.listen((record) {
    debugPrint('${record.loggerName}: ${record.message}');
  });

  // Additional initialization of bindings and Firebase.
}
```

### I'm getting errors about my minimum macOS/iOS version.

### 我遇到关于 macOS/iOS 最低版本的错误。

Firebase has a [minimum version requirement][] for Apple's platforms,
which might be higher than Flutter's default.
Check your `Podfile` (for iOS) and `CMakeLists.txt` (for macOS)
to ensure that you're targeting a version that meets or exceeds
Firebase's requirements.

Firebase 对 Apple 平台有[最低版本要求][minimum version requirement]，可能高于 Flutter 默认值。请检查 `Podfile`（iOS）和 `CMakeLists.txt`（macOS），确保目标版本满足或超过 Firebase 要求。

[Create a new Firebase project]: https://support.google.com/appsheet/answer/10104995
[create an issue]: {{site.repo.organization}}/genui/issues/new/choose
[Enable the Gemini API]: https://firebase.google.com/docs/gemini-in-firebase/set-up-gemini
[examples]: {{site.repo.organization}}/genui/blob/main/examples
[Firebase's Flutter setup guide]: https://firebase.google.com/docs/flutter/setup
[`genui`]: {{site.pub-pkg}}/genui
[Key components]: /ai/genui/components
[minimum version requirement]: https://firebase.google.com/support/release-notes/ios
