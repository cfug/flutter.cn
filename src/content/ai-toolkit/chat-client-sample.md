---
# title: Chat client sample
title: Chat client sample
# description: >
#   Learn about the chat client sample included in the AI Toolkit.
description: >
  Learn about the chat client sample included in the AI Toolkit.
prev:
  title: Custom LLM providers
  path: /ai-toolkit/custom-llm-providers
---

The AI Chat sample is meant to be a full-fledged chat app
built using the Flutter AI Toolkit and Vertex AI for Firebase.
In addition to all of the multi-shot, multi-media,
streaming features that it gets from the AI Toolkit,
the AI Chat sample shows how to store and manage
multiple chats at once in your own apps.
On desktop form-factors, the AI Chat sample looks like the following:



AI Chat 示例是一个使用 Flutter AI Toolkit 和 Firebase Vertex AI 构建的完整聊天应用。
除了从 AI Toolkit 获得的所有多轮、多媒体、流式功能外，
AI Chat 示例还展示了如何在你自己的应用中同时存储和管理多个聊天。
在桌面端外形因素上，AI Chat 示例如下所示：

![Desktop app UI](/assets/images/docs/ai-toolkit/desktop-pluto-convo.png)



![桌面应用 UI](/assets/images/docs/ai-toolkit/desktop-pluto-convo.png)

On mobile form-factors, it looks like this:



在移动端外形因素上，它看起来像这样：

![Mobile app UI](/assets/images/docs/ai-toolkit/mobile-pluto-convo.png)



![移动应用 UI](/assets/images/docs/ai-toolkit/mobile-pluto-convo.png)

The chats are stored in an authenticated
Cloud Firestore database; any authenticated
user can have as many chats as they like.



聊天存储在经过身份验证的 Cloud Firestore 数据库中；
任何经过身份验证的用户都可以拥有任意数量的聊天。

In addition, for each new chat, while the user can
manually title it whatever they like,
the initial prompt and response is used to ask
the LLM what an appropriate title should be.
In fact, the titles of the chats in the
screenshots in this page were set automatically.



此外，对于每个新聊天，虽然用户可以手动将其命名为任何他们喜欢的名称，
但初始提示词和响应用于询问 LLM 什么标题是合适的。
实际上，此页面截图中聊天的标题都是自动设置的。

To build and run the sample,
follow the instructions in the [AI Chat README][].



要构建和运行示例，请按照 [AI Chat README][] 中的说明操作。

{% comment %}
TODO: If Mit agrees, move this to an official Flutter repo
  Chris didn't want to do it so close to release
{% endcomment %}

[AI Chat README]: {{site.github}}/csells/flutter_ai_chat
