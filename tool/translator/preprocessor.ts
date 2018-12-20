import { lexer, parser, Renderer, Token } from 'marked';
import * as unescape from 'unescape';
import Table = marked.Tokens.Table;

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
  const tokens = head.split('\n');
  const result: string[] = [];
  let i = 0;
  while (i < tokens.length) {
    const token = tokens[i];
    const nextToken = tokens[i + 1];
    if (!containsChinese(nextToken) || containsChinese(token)) {
      result.push(token);
    }
    ++i;
  }
  return result.join('\n');
}

function isNotTranslated(token: Token, nextToken: Token) {
  return token.type === nextToken.type && !containsChinese(nextToken['text']) ||
      token.type !== nextToken.type && !containsChinese(token['text']);
}

function shouldKeep(token: Token, nextToken: Token) {
  if (token.type !== 'paragraph' && token.type !== 'heading' && token.type !== 'text') {
    return true;
  }
  return containsChinese(token.text) || isNotTranslated(token, nextToken);
}

export function clearBody(body: string): string {
  body = wrap(body);
  const tokens = lexer(body);
  for (let i = tokens.length - 1; i >= 0; --i) {
    if (tokens[i].type === 'space') {
      tokens.splice(i, 1);
    }
  }
  let i = 0;
  while (i < tokens.length) {
    const token = tokens[i];
    const nextToken = tokens[i + 1] || { type: 'space' };
    if (token.type === 'table') {
      clearTable(token);
    }
    if (!shouldKeep(token, nextToken)) {
      tokens.splice(i, 1);
      continue;
    }
    ++i;
  }
  return unwrap(parser(tokens, { renderer: new MarkdownRenderer() }).replace(/<t>(.*?)<\/t><t>(.*?)<\/t>/g, '$2'));
}

export function wrap(text: string): string {
  return text.replace(/^ *({% diff .*?%}[\s\S]*?{% enddiff %})$/gm, '```keep\n_$1_\n```')
      .replace(/^({[{%].*[%}]})$/gm, '\n`$1`\n');
}

export function unwrap(text: string): string {
  return text
      .replace(/^`({[{%].*[%}]})`$/gm, '$1')
      .replace(/^```keep\n_({% diff .*?%}[\s\S]*?{% enddiff %})_\n```$/gm, '$1');
}

export function clearTable(token: Table): void {
  let i = 0;
  const cells = token.cells;
  while (i < cells.length) {
    const row = cells[i].join('\n');
    const nextRow = (cells[i + 1] || ['占位']).join('\n');
    if (containsChinese(nextRow) && !containsChinese(row)) {
      cells.splice(i, 1);
      continue;
    }
    ++i;
  }
}

function containsChinese(text: string): boolean {
  return text && text.search(/[\u4e00-\u9fa5]/gm) !== -1;
}

class MarkdownRenderer implements Renderer {
  code(code: string, language: string = '', isEscaped: boolean = false): string {
    return '```' + language + '\n' + unescape(code) + '\n' + '```\n\n';
  }

  blockquote(quote: string): string {
    const lines = unescape(quote).trim().split('\n');
    return ['', ...lines, ''].map(line => '> ' + line).join('\n') + '\n\n';
  }

  html(html: string): string {
    return html + '\n\n';
  }

  heading(text: string, level: number, raw: string): string {
    return repeat('#', level) + ' ' + unescape(text) + '\n\n';
  }

  hr(): string {
    return '---\n\n';
  }

  list(body, ordered, start) {
    const prefix = ordered ? '1.' : '-';
    return body.replace(/^__prefix__/gm, prefix).replace(/\n+/g, '\n') + '\n\n';
  };

  listitem(text) {
    return '__prefix__ ' + unescape(text).replace(/^(1.|-)/gm, '  $1') + '\n';
  };

  paragraph(text: string): string {
    return unescape(text) + '\n\n';
  }

  private tableHeader = '';

  table(header: string, body: string): string {
    const result = unescape(header) /*+ '\n'*/ + '|' + this.tableHeader + '\n' + unescape(body) + '\n';
    this.tableHeader = '';
    return result;
  }

  tablerow(content: string): string {
    return '| ' + content + '\n';
  }

  tablecell(content: string, flags: {
    header: boolean;
    align: 'center' | 'left' | 'right' | null;
  }): string {
    if (flags.header) {
      this.tableHeader += (flags.align === 'center' ? ':' : '') + '--' + (['center', 'right'].indexOf(flags.align) !== -1 ? ':' : '') + '|';
    }
    return ' ' + content + ' | ';
  }

  strong(text: string): string {
    return `**${unescape(text)}**`;
  }

  em(text: string): string {
    return `*${unescape(text)}*`;
  }

  codespan(code: string): string {
    return '`' + unescape(code) + '`';
  }

  br(): string {
    return '  \n';
  }

  del(text: string): string {
    return `~~${unescape(text)}~~`;
  }

  link(href: string, title: string, text: string): string {
    if (title) {
      return `[${unescape(text)}](${href} "${unescape(title)}")`;
    } else {
      return `[${unescape(text)}](${href})`;
    }
  }

  image(href: string, title: string, text: string): string {
    if (title) {
      return `![${unescape(text)}](${href} "${unescape(title)}")`;
    } else {
      return `![${unescape(text)}](${href})`;
    }
  }

  text(text: string): string {
    return unescape(text);
  }

}

function repeat(char: string, times: number): string {
  let result = '';
  for (let i = 0; i < times; ++i) {
    result += char;
  }
  return result;
}