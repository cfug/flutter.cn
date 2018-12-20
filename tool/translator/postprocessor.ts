import { JSDOM } from 'jsdom';

export function postprocess(content: string): string {
  const dom = new JSDOM(content);
  const body = dom.window.document.body;
  mark(body, 'p,h1,h2,h3,h4,h5,h6,header');
  mark(body, 't,span,a');
  mark(body, 'table>tbody>tr');
  mark(body, 'li.toc-entry');
  markToc(body);
  swap(body);
  return dom.serialize();
}

function mark(body: HTMLElement, selector: string): void {
  const elements = body.querySelectorAll(selector);
  elements.forEach(node => {
    if (containsChinese(node.textContent)) {
      const prev = node.previousElementSibling;
      if (prev && prev.tagName === node.tagName && !containsChinese(prev.textContent)) {
        node.setAttribute('translation-result', 'on');
        prev.setAttribute('translation-origin', 'off');
        // 交换 id，中文内容应该占用原文的 id
        const id = prev.getAttribute('id');
        if (id) {
          prev.removeAttribute('id');
          node.setAttribute('id', id);
        }
        const href = prev.getAttribute('href');
        if (href) {
          node.setAttribute('href', href);
        }
      }
    }
  });
}

function markToc(body: HTMLElement): void {
  const items = body.querySelectorAll('li.toc-entry[translation-result]');
  items.forEach(li => {
    if (containsChinese(li.textContent)) {
      const prev = li.previousElementSibling;
      if (prev && prev.tagName === li.tagName && !containsChinese(prev.textContent)) {
        const prevAnchor = prev.querySelector('a');
        const anchor = li.querySelector('a');
        const href = prevAnchor.getAttribute('href');
        if (href) {
          anchor.setAttribute('href', href);
        }
      }
    }
  });
}

function swap(body: HTMLElement): void {
  const pairList = body.querySelectorAll('[translation-origin]+[translation-result]');
  pairList.forEach(node => {
    const prev = node.previousElementSibling;
    node.parentElement.insertBefore(node, prev);
  });
}

function containsChinese(text: string): boolean {
  return text && text.search(/[\u4e00-\u9fa5]/gm) !== -1;
}

