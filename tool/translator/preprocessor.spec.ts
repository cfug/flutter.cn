import { describe, it } from 'mocha';
import { clearBody, clearHead, preprocess, splitHeadAndBody } from './preprocessor';
import { expect } from 'chai';

describe('preprocessor', function () {
  it('should split to header and body', () => {
    const { head, body } = splitHeadAndBody(src);
    expect(head).eql(`title: FAQ
title: 常见问答
description: Frequently asked questions and answers.
description: 常见问题与解答
comment: abc
comment: abc`);
    expect(body).match(/^#[\s\S]*$/);
  });
  it('should split to header and body when no body', () => {
    const { head, body } = splitHeadAndBody(`---
title: abc
---`);
    expect(head).eql(`title: abc`);
    expect(body).eql('');
  });

  it('should remove translated english from header', () => {
    const { head } = splitHeadAndBody(src);
    expect(clearHead(head)).eql(`title: 常见问答
description: 常见问题与解答
comment: abc
comment: abc`);
  });

  it('should remove translated english from body', () => {
    const { body } = splitHeadAndBody(src);
    expect(clearBody(body)).eql(`## 简介

### 什么是 Flutter？

Flutter 是 Google 的一个移动 UI 框架，用于在 iOS 和 Android 上创造高质量的绝妙原生体验。
Flutter 可以和世界上的开发人员和开发组织广泛使用的那些现存代码一起使用，并且是开源的、免费的。

### Flutter 是干什么的？<div></div>

对于用户来说，Flutter 让漂亮的\`<br/>\`应用 UI 变得生动有趣。

> 
> 测试
> 

1. 标题<div></div>
1. 名称
  - 姓名1<div></div>
  - 姓名2
  - name 3
  - name 4
  1. a
  1. b
  1. c

{% include catalogpage.html category="Accessibility" %}

For developers, Flutter lowers the bar to entry
for building mobile apps. It speeds up development of
mobile apps and reduces the cost and complexity
of app production across iOS and Android.

For designers, Flutter helps deliver the original design vision,
without loss of fidelity or compromises. It also
acts as a productive prototyping tool.

|   |  单位 |  控件 |  集成 | 
|--|--|--|--|
|  **置信度<div></div>** |  低 |  较高 |  最高 | 
|  **维护成本** |  低 |  较高 |  最高 | 
|  **Dependencies** |  Few |  More |  Lots | 

![测试<div></div>](./a.jpg)

[测试<div></div>](./a)

abc

`);
  });

  it('should clear whole markdown', function () {
    const result = preprocess(src);
    expect(result).to.eql(`---
title: 常见问答
description: 常见问题与解答
comment: abc
comment: abc
---

## 简介

### 什么是 Flutter？

Flutter 是 Google 的一个移动 UI 框架，用于在 iOS 和 Android 上创造高质量的绝妙原生体验。
Flutter 可以和世界上的开发人员和开发组织广泛使用的那些现存代码一起使用，并且是开源的、免费的。

### Flutter 是干什么的？<div></div>

对于用户来说，Flutter 让漂亮的\`<br/>\`应用 UI 变得生动有趣。

> 
> 测试
> 

1. 标题<div></div>
1. 名称
  - 姓名1<div></div>
  - 姓名2
  - name 3
  - name 4
  1. a
  1. b
  1. c

{% include catalogpage.html category="Accessibility" %}

For developers, Flutter lowers the bar to entry
for building mobile apps. It speeds up development of
mobile apps and reduces the cost and complexity
of app production across iOS and Android.

For designers, Flutter helps deliver the original design vision,
without loss of fidelity or compromises. It also
acts as a productive prototyping tool.

|   |  单位 |  控件 |  集成 | 
|--|--|--|--|
|  **置信度<div></div>** |  低 |  较高 |  最高 | 
|  **维护成本** |  低 |  较高 |  最高 | 
|  **Dependencies** |  Few |  More |  Lots | 

![测试<div></div>](./a.jpg)

[测试<div></div>](./a)

abc

`);
  });
});

const src = `
---
title: FAQ
title: 常见问答
description: Frequently asked questions and answers.
description: 常见问题与解答
comment: abc
comment: abc
---

## Introduction

## 简介

### What is Flutter?

### 什么是 Flutter？

Flutter is Google’s mobile app SDK for crafting high-quality
native experiences on iOS and Android in record time.
Flutter works with existing code, is used by developers
and organizations around the world, and is free and open source.

Flutter 是 Google 的一个移动 UI 框架，用于在 iOS 和 Android 上创造高质量的绝妙原生体验。
Flutter 可以和世界上的开发人员和开发组织广泛使用的那些现存代码一起使用，并且是开源的、免费的。

### What does Flutter do?

### Flutter 是干什么的？<div></div>

For users, Flutter makes beautiful app UIs come to life.

对于用户来说，Flutter 让漂亮的\`<br/>\`应用 UI 变得生动有趣。

> Test
> 
> 测试
> 

1. title

   标题<div></div>
   
1. name

   名称
   
    - name 1
    
      姓名1<div></div>
      
    - name 2
    
      姓名2
      
    - name 3
    - name 4

 1. a
 1. b
 1. c

{% include catalogpage.html category="Accessibility" %}

For developers, Flutter lowers the bar to entry
for building mobile apps. It speeds up development of
mobile apps and reduces the cost and complexity
of app production across iOS and Android.

For designers, Flutter helps deliver the original design vision,
without loss of fidelity or compromises. It also
acts as a productive prototyping tool.

|                      | <t>Unit</t><t>单位</t>   | <t>Widget</t><t>控件</t> | <t>Integration</t><t>集成</t> |
|----------------------|--------|--------|-------------|
| **Confidence**       | Low    | Higher | Highest     |
| **置信度<div></div>**       | 低    | 较高 | 最高     |
| **Maintenance cost** | Low    | Higher | Highest     |
| **维护成本** | 低    | 较高 | 最高     |
| **Dependencies**     | Few    | More   | Lots        |
| **Execution speed**  | Quick  | Slower | Slowest     |

{:.table.table-striped}

![测试<div></div>](./a.jpg)

[测试<div></div>](./a)

abc
`;