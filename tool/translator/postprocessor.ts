import { JSDOM } from 'jsdom';

export function postprocess(content: string): string {
  const dom = new JSDOM(content);
  mark(dom.window.document.body);
  swap(dom.window.document.body);
  return dom.serialize();
}

function mark(body: HTMLElement): void {
  const chinese = body.querySelectorAll('p,h1,h2,h3,h4,h5,h6');
  chinese.forEach(it => {
    if (containsChinese(it.textContent)) {
      it.setAttribute('translation-result', 'on');
      const prev = it.previousElementSibling;
      if (prev && !containsChinese(prev.textContent)) {
        prev.setAttribute('translation-origin', 'off');
      }
    }
  });
}

function swap(body: HTMLElement): void {
  const pairList = body.querySelectorAll('[translation-origin]+[translation-result]');
  pairList.forEach(it => {
    const prev = it.previousElementSibling;
    it.parentElement.insertBefore(it, prev);
  });
}

function containsChinese(text: string): boolean {
  return text && text.search(/[\u4e00-\u9fa5]/gm) !== -1;
}

