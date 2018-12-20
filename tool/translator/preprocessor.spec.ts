import { describe, it } from 'mocha';
import { clearHead, splitHeadAndBody } from './preprocessor';
import { expect } from 'chai';

describe('preprocessor', function () {
  it('should split to header and body', () => {
    const { head, body } = splitHeadAndBody(`
---
title: FAQ
title: 常见问答
description: Frequently asked questions and answers.
description: 常见问题与解答
prev:
  title: Install
  title: 安装和环境配置
  path: /docs/get-started/install
next:
  title: Test drive
  title: 开发体验初探
  path: /docs/get-started/test-drive
toc: false
---

## Introduction
`);
    expect(head).eql(`title: FAQ
title: 常见问答
description: Frequently asked questions and answers.
description: 常见问题与解答
prev:
  title: Install
  title: 安装和环境配置
  path: /docs/get-started/install
next:
  title: Test drive
  title: 开发体验初探
  path: /docs/get-started/test-drive
toc: false`);
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
    const { head } = splitHeadAndBody(`
---
title: FAQ
title: 常见问答
description: Frequently asked questions and answers.
description: 常见问题与解答
prev:
  title: Install
  title: 安装和环境配置
  path: /docs/get-started/install
next:
  title: Test drive
  title: 开发体验初探
  path: /docs/get-started/test-drive
toc: false
---

## Introduction
`);
    expect(clearHead(head)).eql(`title: 常见问答
description: 常见问题与解答
prev:
  title: 安装和环境配置
  path: /docs/get-started/install
next:
  title: 开发体验初探
  path: /docs/get-started/test-drive
toc: false`);
  });
});

