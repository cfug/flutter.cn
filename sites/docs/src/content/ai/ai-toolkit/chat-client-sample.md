---
# title: Chat client sample
title: 聊天客户端示例
# sidenav: ai
sidenav: ai
# description: >
#   Learn about the chat client sample included in the AI Toolkit.
description: >
  了解 AI 工具包中包含的聊天客户端示例。
# prev:
#   title: Custom LLM providers
#   path: /ai/ai-toolkit/custom-llm-providers
prev:
  title: 自定义 LLM 提供商
  path: /ai/ai-toolkit/custom-llm-providers
ai-translated: true
---

The AI Chat sample is meant to be a full-fledged chat app built using the
Flutter AI Toolkit and the Firebase AI Logic SDK. In addition to all of the
multi-shot, multi-media, streaming features that it gets from the AI Toolkit,
the AI Chat sample shows how to store and manage multiple chats at once in your
own apps. On desktop form-factors, the AI Chat sample looks like the following:

AI Chat 示例旨在成为使用 Flutter AI 工具包与 Firebase AI Logic SDK 构建的完整聊天应用。
除从 AI 工具包获得的多轮、多媒体、流式传输等能力外，
AI Chat 示例还展示如何在你自己的应用中同时存储并管理多个聊天。
在桌面形态下，AI Chat 示例外观如下：

![Desktop app UI](/assets/images/docs/ai-toolkit/desktop-pluto-convo.png)


On mobile form-factors, it looks like this:

在移动形态下，外观如下：

![Mobile app UI](/assets/images/docs/ai-toolkit/mobile-pluto-convo.png)

The chats are stored in an authenticated Cloud Firestore database; any
authenticated user can have as many chats as they like.

聊天存储在已认证的 Cloud Firestore 数据库中；任何已认证用户可拥有任意数量的聊天。

In addition, for each new chat, while the user can manually title it whatever
they like, the initial prompt and response is used to ask the LLM what an
appropriate title should be. In fact, the titles of the chats in the screenshots
in this page were set automatically.

此外，每个新聊天虽可由用户手动命名，
初始提示词与回复会用于向 LLM 询问合适标题。
事实上，本页截图中聊天标题均为自动设置。

To build and run the sample, follow the instructions in the [AI Chat README][].

要构建并运行示例，请遵循 [AI Chat README][] 中的说明。

{% comment %} TODO: If Mit agrees, move this to an official Flutter repo Chris
didn't want to do it so close to release {% endcomment %}

[AI Chat README]: {{site.github}}/csells/flutter_ai_chat
