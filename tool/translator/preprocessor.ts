import { lexer, parser, Renderer, Token } from 'marked';
import * as unescape from 'unescape';
import Table = marked.Tokens.Table;

export function preprocess(text: string): string {
  const { head, body } = splitHeadAndBody(text);

  return `---
${clearHead(head)}
---

${clearBody(body)}`;
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
  body = body.replace(/^({[{%].*[%}]})$/gm, '\n$1\n');
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
  return parser(tokens, { renderer: new MarkdownRenderer() }).replace(/<t>(.*?)<\/t><t>(.*?)<\/t>/g, '$2');
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
    return '```' + language + '\n' + code + '\n' + '```\n\n';
  }

  blockquote(quote: string): string {
    const lines = quote.trim().split('\n');
    return ['', ...lines, ''].map(line => '> ' + line).join('\n') + '\n\n';
  }

  html(html: string): string {
    return html + '\n\n';
  }

  heading(text: string, level: number, raw: string): string {
    return repeat('#', level) + ' ' + text + '\n\n';
  }

  hr(): string {
    return '---\n\n';
  }

  list(body, ordered, start) {
    const prefix = ordered ? '1.' : '-';
    return body.replace(/^__prefix__/gm, prefix);
  };

  listitem(text) {
    return '__prefix__ ' + text.replace(/^(1.|-)/gm, '  $1');
  };

  paragraph(text: string): string {
    return unescape(text) + '\n\n';
  }

  private tableHeader = '';

  table(header: string, body: string): string {
    const result = header /*+ '\n'*/ + '|' + this.tableHeader + '\n' + body + '\n';
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
    return `**${text}**`;
  }

  em(text: string): string {
    return `*${text}*`;
  }

  codespan(code: string): string {
    return '`' + code + '`';
  }

  br(): string {
    return '  \n';
  }

  del(text: string): string {
    return `~~${text}~~`;
  }

  link(href: string, title: string, text: string): string {
    if (title) {
      return `[${text}](${href} "${title}")`;
    } else {
      return `[${text}](${href})`;
    }
  }

  image(href: string, title: string, text: string): string {
    if (title) {
      return `![${text}](${href} "${title}")`;
    } else {
      return `![${text}](${href})`;
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