// Copyright 2025 The Flutter Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

import 'package:jaspr/dom.dart';
import 'package:jaspr/jaspr.dart';
import 'package:jaspr_content/jaspr_content.dart';

import '../../utils/page_source_info.dart';
import '../common/client/feedback.dart';

/// The trailing content of a content documentation page, such as
/// its last updated information, report an issue links, and similar.
class TrailingContent extends StatelessComponent {
  const TrailingContent({super.key});

  @override
  Component build(BuildContext context) {
    final page = context.page;
    final pageData = page.data.page;
    final siteData = page.data.site;
    final pageDate = pageData['date'] as String?;

    final currentFlutterVersion =
        siteData['currentFlutterVersion'] as String? ?? '';

    final sourceInfo = page.sourceInfo;
    final issueUrl = sourceInfo.issueUrl;
    final pageSource = sourceInfo.sourceUrl;

    return div(
      id: 'trailing-content',
      attributes: {'data-nosnippet': 'true'},
      [
        FeedbackComponent(issueUrl: issueUrl),

        p(id: 'page-github-links', [
          span([
            .text(
              '除非另有说明，'
              '本文档之所提及适用于 Flutter $currentFlutterVersion 版本。',
            ),
            if (pageDate != null)
              .text(
                '本页面最后更新时间：$pageDate。',
              ),
          ]),
          if (pageSource != null) ...[
            a(
              href: pageSource,
              attributes: {'target': '_blank', 'rel': 'noopener'},
              [const .text('查看文档源码')],
            ),
            const span([.text(' 或者 ')]),
          ],
          a(
            href: issueUrl,
            attributes: {
              'title': '为本页面内容提出建议',
              'target': '_blank',
              'rel': 'noopener',
            },
            [.text(pageSource == null ? '为本页面内容提出建议' : '为本页面内容提出建议')],
          ),
          const .text('。'),
        ]),
      ],
    );
  }
}
