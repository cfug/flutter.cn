---
title: Chat client sample
title: 聊天客户端示例
description: >
  Learn about the chat client sample included in the AI Toolkit.
description: >
  了解 AI Toolkit 中包含的聊天客户端示例。
prev:
  title: Custom LLM providers
  title: 自定义 LLM 提供者
  path: /ai-toolkit/custom-llm-providers
---

The AI Chat sample is meant to be a full-fledged chat app
built using the Flutter AI Toolkit and Vertex AI for Firebase.
In addition to all of the multi-shot, multi-media,
streaming features that it gets from the AI Toolkit,
the AI Chat sample shows how to store and manage
multiple chats at once in your own apps.
On desktop form-factors, the AI Chat sample looks like the following:

AI Chat 示例是一个功能齐全的聊天应用，
使用 Flutter AI Toolkit 和 Firebase 的 Vertex AI 构建。
除了从 AI Toolkit 获得的多轮对话、多媒体、
流式传输等功能外，
AI Chat 示例还展示了如何在你的应用中
同时存储和管理多个聊天会话。
在桌面设备上，AI Chat 示例如下所示：

![Desktop app UI](/assets/images/docs/ai-toolkit/desktop-pluto-convo.png)


On mobile form-factors, it looks like this:

在移动设备上，它如下所示：

![Mobile app UI](/assets/images/docs/ai-toolkit/mobile-pluto-convo.png)

The chats are stored in an authenticated
Cloud Firestore database; any authenticated
user can have as many chats as they like.

聊天记录存储在经过身份验证的 Cloud Firestore 数据库中；
任何经过身份验证的用户都可以拥有任意数量的聊天会话。

In addition, for each new chat, while the user can
manually title it whatever they like,
the initial prompt and response is used to ask
the LLM what an appropriate title should be.
In fact, the titles of the chats in the
screenshots in this page were set automatically.

此外，对于每个新的聊天会话，虽然用户可以
手动设置任何喜欢的标题，
但初始提示和响应会用于询问 LLM 应该使用什么合适的标题。
实际上，本页截图中的聊天标题都是自动设置的。

To build and run the sample,
follow the instructions in the [AI Chat README][].

要构建和运行示例，
请按照 [AI Chat README][] 中的说明进行操作。

{% comment %}
TODO: If Mit agrees, move this to an official Flutter repo
  Chris didn't want to do it so close to release
{% endcomment %}

[AI Chat README]: {{site.github}}/csells/flutter_ai_chat
