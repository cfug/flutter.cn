import t from 'tap'
import { getRedirect } from '../src/index.js'

const mockRedirects = [
  { regex: '^/(flutter(/.*)?)', destination: 'https://api.flutter-io.cn/:1' },
  { regex: '(.*)\\.html$', destination: ':1' },
  { source: '/ads', destination: 'https://flutter.cn/monetization' },
  { source: '/community', destination: 'https://flutter.cn/community' },
  { source: '/docs/:rest*', destination: '/:rest*' },
  { source: '/ai-toolkit/:rest*', destination: '/ai/ai-toolkit/:rest*' },
  { source: '/subscribe/**', destination: 'https://flutter.cn#newsletter' },
];

t.test('should match regex: /flutter/abc', t => {
  t.equal(getRedirect('/flutter/abc', mockRedirects), 'https://api.flutter-io.cn/flutter/abc');
  t.end();
});

t.test('should match regex: /foo.html', t => {
  t.equal(getRedirect('/foo.html', mockRedirects), '/foo');
  t.end();
});

t.test('should match static source: /ads', t => {
  t.equal(getRedirect('/ads', mockRedirects), 'https://flutter.cn/monetization');
  t.end();
});

t.test('should match static source: /community', t => {
  t.equal(getRedirect('/community', mockRedirects), 'https://flutter.cn/community');
  t.end();
});

t.test('should match path-to-regexp: /docs/abc', t => {
  t.equal(getRedirect('/docs/abc', mockRedirects), '/abc');
  t.end();
});

t.test('should match path-to-regexp: /ai-toolkit/xyz', t => {
  t.equal(getRedirect('/ai-toolkit/xyz', mockRedirects), '/ai/ai-toolkit/xyz');
  t.end();
});

t.test('should match glob: /subscribe/any', t => {
  t.equal(getRedirect('/subscribe/any', mockRedirects), 'https://flutter.cn#newsletter');
  t.end();
});

t.test('should return null if no match', t => {
  t.equal(getRedirect('/notfound', mockRedirects), null);
  t.end();
});