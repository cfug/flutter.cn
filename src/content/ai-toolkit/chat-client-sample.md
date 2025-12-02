---
title: 聊天客户端示例
description: >
  Learn about the chat client sample included in the AI Toolkit.
prev:
  title: Custom LLM providers
  path: /ai-toolkit/custom-llm-providers
---

AI Chat 示例是一个使用 Flutter AI Toolkit 和 Firebase Vertex AI 构建的完整聊天应用。
除了从 AI Toolkit 获得的所有多轮、多媒体、流式功能外，
AI Chat 示例还展示了如何在你自己的应用中同时存储和管理多个聊天。
在桌面端外形因素上，AI Chat 示例如下所示：

![桌面应用 UI](/assets/images/docs/ai-toolkit/desktop-pluto-convo.png)


在移动端外形因素上，它看起来像这样：

![移动应用 UI](/assets/images/docs/ai-toolkit/mobile-pluto-convo.png)

聊天存储在经过身份验证的 Cloud Firestore 数据库中；
任何经过身份验证的用户都可以拥有任意数量的聊天。

此外，对于每个新聊天，虽然用户可以手动将其命名为任何他们喜欢的名称，
但初始提示词和响应用于询问 LLM 什么标题是合适的。
实际上，此页面截图中聊天的标题都是自动设置的。

要构建和运行示例，请按照 [AI Chat README][] 中的说明操作。

{% comment %}
TODO: If Mit agrees, move this to an official Flutter repo
  Chris didn't want to do it so close to release
{% endcomment %}

[AI Chat README]: {{site.github}}/csells/flutter_ai_chat
