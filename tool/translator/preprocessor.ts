export function preprocess(text: string): string {
  const { head, body } = splitHeadAndBody(text);

  const cleanHead = clearHead(head);
  const cleanBody = clearBody(body);
  if (!cleanHead) {
    return cleanBody;
  }
  return `---
${cleanHead}
---

${cleanBody}`;
}

export function splitHeadAndBody(text: string): { head: string, body: string } {
  const matches = text.trim().match(/^-{3,}\s+([\s\S]*?)\n-{3,}\s*\n?([\s\S]*)$/i);

  if (matches) {
    return { head: matches[1], body: matches[2] };
  } else {
    return { head: '', body: text };
  }
}

export function clearHead(head: string): string {
  // 倒序，以便处理
  const lines = head.split('\n')
      .reverse();
  const result: string[] = [];
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    const nextLine = lines[i + 1];
    if (containsChinese(line) && !containsChinese(nextLine)) {
      // 跳过英文行
      ++i;
    }
    result.push(line);
    ++i;
  }
  return result
      .reverse()
      .join('\n');
}

export function clearBody(body: string): string {
  return addBlankLines(body);
}

// 在一些语句前后添加额外的空行，以便让翻译文本生成与原文对称的 html 结构
export function addBlankLines(text: string): string {
  return text.replace(/^({[{%].*[%}]})$/gm, '\n$1\n');
}

function containsChinese(text: string): boolean {
  return text && text.search(/[\u4e00-\u9fa5]/gm) !== -1;
}
