import 'package:jaspr/dom.dart';
import 'package:jaspr/jaspr.dart';
import 'package:jaspr_content/jaspr_content.dart';

import '../../../utils/page_source_info.dart';

/// A notice displayed at the top of pages whose Chinese translation
/// was produced (in whole or in part) by AI.
///
/// It invites readers to review the translation and
/// contribute improvements on GitHub.
final class AiTranslationNotice extends StatelessComponent {
  const AiTranslationNotice({super.key});

  @override
  Component build(BuildContext context) {
    final page = context.page;
    final sourceInfo = page.sourceInfo;
    final issueUrl = sourceInfo.issueUrl;
    final pageSource = sourceInfo.sourceUrl;

    return aside(
      classes: 'alert alert-ai-translation',
      attributes: {'role': 'note', 'data-nosnippet': 'true'},
      [
        const span(
          classes: 'ai-translation-glyph',
          attributes: {'aria-hidden': 'true', 'translate': 'no'},
          [
            span(classes: 'material-symbols', [.text('auto_awesome')]),
          ],
        ),
        div(classes: 'ai-translation-body', [
          const p(classes: 'ai-translation-title', [
            .text('本页内容由 AI 翻译'),
          ]),
          p(classes: 'ai-translation-desc', [
            const .text('本页译文在人工校订的基础上借助 AI 完成。'),
            const .text('如果你发现任何不准确或可以改进的地方，'),
            if (pageSource case final pageSource?)
              a(
                href: pageSource,
                target: Target.blank,
                attributes: {
                  'rel': 'noopener',
                  'title': '在 GitHub 上查看并校阅本页译文',
                },
                [const .text('欢迎到 GitHub 参与校阅')],
              )
            else
              const a(
                href: 'https://github.com/cfug/flutter.cn',
                target: Target.blank,
                attributes: {
                  'rel': 'noopener',
                  'title': '在 GitHub 上参与文档校阅',
                },
                [.text('欢迎到 GitHub 参与校阅')],
              ),
            const .text(' 或者 '),
            a(
              href: issueUrl,
              attributes: {
                'title': '为本页面内容提出建议',
                'target': '_blank',
                'rel': 'noopener',
              },
              [.text(pageSource == null ? '为本页面内容提出建议' : '为本页面内容提出建议')],
            ),
            const .text('，与大家一起把它完善得更好。'),
          ]),
        ]),
      ],
    );
  }
}
