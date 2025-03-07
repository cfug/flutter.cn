// Copyright (c) 2024, the Dart project authors. Please see the AUTHORS file
// for details. All rights reserved. Use of this source code is governed by a
// BSD-style license that can be found in the LICENSE file.

import 'dart:js_interop';

import 'package:html_unescape/html_unescape_small.dart';
import 'package:web/web.dart' as web;

void main() {
  // Select all `code` elements with the `dartpad` attribute that are
  // the only child of a `pre` element.
  final codeElements =
      web.document.querySelectorAll('pre > code[data-dartpad]:only-child');

  final embeds = <String, String>{};
  web.window.addEventListener(
    'message',
    (web.MessageEvent event) {
      if (event.data case _EmbedReadyMessage(:final type?, :final sender?)
          when type == 'ready') {
        if (embeds[sender] case final code?) {
          final iframe =
              web.document.getElementById(sender) as web.HTMLIFrameElement;
          iframe.contentWindowCrossOrigin?.postMessage(
            {'sourceCode': code, 'type': 'sourceCode'}.jsify(),
            '*'.toJS,
          );
          embeds.remove(sender);
        }
      }
    }.toJS,
  );

  for (var index = 0; index < codeElements.length; index += 1) {
    final codeElement = codeElements.item(index) as web.HTMLElement;
    if (_injectEmbed(codeElement) case final injectedEmbed?) {
      final (:id, :code) = injectedEmbed;
      embeds[id] = code;
    }
  }
}

final _htmlUnescape = HtmlUnescape();

int _currentEmbed = 0;

({String id, String code})? _injectEmbed(web.HTMLElement codeElement) {
  final parent = codeElement.parentElement;
  if (parent == null) return null;

  final urlAuthority = switch (codeElement.getAttribute('data-url')) {
    final specifiedHost? when specifiedHost.isNotEmpty => specifiedHost,
    _ => 'dartpad.cn',
  };

  final iframeUrl = Uri.https(urlAuthority, '', {
    if (codeElement.getAttribute('data-embed') != 'false') 'embed': 'true',
    if (codeElement.getAttribute('data-theme') == 'light') 'theme': 'light',
    if (codeElement.getAttribute('data-run') == 'true') 'run': 'true',
  }).toString();

  final host = web.HTMLDivElement();
  final iframe = web.HTMLIFrameElement();

  iframe.setAttribute('src', iframeUrl);
  if (codeElement.getAttribute('title') case final title?
      when title.isNotEmpty) {
    iframe.setAttribute('title', title);
  }

  iframe.classList.add('embedded-dartpad');
  final currentId = 'embedded-dartpad-${_currentEmbed++}';
  iframe.id = currentId;
  iframe.name = currentId;

  if (codeElement.getAttribute('data-width') case final width?
      when width.isNotEmpty) {
    iframe.style.width = width;
  }

  if (codeElement.getAttribute('data-height') case final height?
      when height.isNotEmpty) {
    iframe.style.height = height;
  }

  final content =
      _htmlUnescape.convert(codeElement.innerHTML.toString().trimRight());

  host.appendChild(iframe);
  parent.replaceWith(host);

  final contentWindow = iframe.contentWindow;
  if (contentWindow == null) return null;

  return (id: currentId, code: content);
}

extension type _EmbedReadyMessage._(JSObject _) {
  external String? get type;
  external String? get sender;
}
