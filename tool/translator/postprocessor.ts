import { JSDOM } from 'jsdom';

export function postprocess(content: string): string {
  const dom = new JSDOM(content);
  const body = dom.window.document.body;
  mark(body, 'p,h1,h2,h3,h4,h5,h6,header');
  mark(body, 't,span,a');
  mark(body, 'table>tbody>tr');
  swap(body);
  return dom.serialize();
}

function mark(body: HTMLElement, selector: string): void {
  const elements = body.querySelectorAll(selector);
  elements.forEach(node => {
    if (containsChinese(node.textContent)) {
      node.setAttribute('translation-result', 'on');
      const prev = node.previousElementSibling;
      if (prev && !containsChinese(prev.textContent)) {
        prev.setAttribute('translation-origin', 'off');
        // 交换 id，中文内容应该占用原文的 id
        const id = prev.getAttribute('id');
        prev.removeAttribute('id');
        node.setAttribute('id', id);
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

