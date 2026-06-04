// Copyright 2025 The Flutter Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

import 'package:jaspr/dom.dart';
import 'package:jaspr/jaspr.dart';

/// A notice displayed at the top of pages whose Chinese translation
/// was produced (in whole or in part) by AI.
///
/// It invites readers to review the translation and contribute
/// improvements on GitHub. The [sourceUrl] points to the page's
/// Markdown source so reviewers can jump straight to the file.
final class AiTranslationNotice extends StatelessComponent {
  const AiTranslationNotice({super.key, this.sourceUrl});

  /// The URL to view (and review) the page's source on GitHub.
  ///
  /// When `null`, the review call-to-action link is omitted.
  final String? sourceUrl;

  @override
  Component build(BuildContext context) {
    return aside(
      classes: 'alert alert-ai-translation',
      attributes: {'role': 'note', 'data-nosnippet': 'true'},
      [
        span(
          classes: 'ai-translation-glyph',
          attributes: {'aria-hidden': 'true', 'translate': 'no'},
          [const span(classes: 'material-symbols', [.text('auto_awesome')])],
        ),
        div(classes: 'ai-translation-body', [
          p(classes: 'ai-translation-title', [
            .text('本页内容由 AI 翻译'),
          ]),
          p(classes: 'ai-translation-desc', [
            .text('为了让你更快读到中文文档，本页译文在人工校订的基础上借助 AI 完成。'),
            .text('如果你发现任何不准确或可以改进的地方，'),
            if (sourceUrl case final sourceUrl?)
              a(
                href: sourceUrl,
                target: Target.blank,
                attributes: {
                  'rel': 'noopener',
                  'title': '在 GitHub 上查看并校阅本页译文',
                },
                [.text('欢迎到 GitHub 参与校阅')],
              )
            else
              a(
                href: 'https://github.com/cfug/flutter.cn',
                target: Target.blank,
                attributes: {
                  'rel': 'noopener',
                  'title': '在 GitHub 上参与文档校阅',
                },
                [.text('欢迎到 GitHub 参与校阅')],
              ),
            .text('，与大家一起把它打磨得更好。'),
          ]),
        ]),
      ],
    );
  }
}
