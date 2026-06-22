// Copyright 2025 The Flutter Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

import 'package:jaspr/dom.dart';
import 'package:jaspr/jaspr.dart';
import 'package:jaspr_content/jaspr_content.dart';
import 'package:site_shared/components/common/button.dart';
import 'package:site_shared/components/common/material_icon.dart';
import 'package:site_shared/components/layout/menu_toggle.dart';
import 'package:site_shared/components/layout/site_switcher.dart';
import 'package:site_shared/components/layout/theme_switcher.dart';
import 'package:site_shared/util.dart';

import '../../utils/active_nav.dart';

/// The site-wide top navigation bar.
class DashHeader extends StatelessComponent {
  const DashHeader({super.key});

  @override
  Component build(BuildContext context) {
    final pageUrlPath = context.page.url;
    final activeEntry = activeNavEntry(pageUrlPath);

    return header(id: 'site-header', [
      nav(classes: 'navbar', [
        const a(
          id: 'site-primary-logo',
          classes: 'site-wordmark',
          href: '/',
          attributes: {
            'aria-label': 'Go to the Flutter docs homepage.',
            'title': 'Go to the Flutter docs homepage.',
          },
          [
            img(
              src: '/assets/images/cn/flutter-cn-logo-default.svg',
              alt: 'Flutter CN logo',
              attributes: {'width': '28'},
            ),
            span(
              classes: 'name',
              attributes: {'translate': 'no'},
              [.text('Flutter')],
            ),
            span(
              classes: 'subtype',
              [.text('Docs')],
            ),
          ],
        ),

        ul(classes: 'nav-items', [
          _NavItem(
            href: '/',
            label: '指南',
            isActive: activeEntry == ActiveNavEntry.home,
          ),
          _NavItem(
            href: '/learn/pathway',
            label: '学习',
            isActive: activeEntry == ActiveNavEntry.learn,
          ),
          _NavItem(
            href: '/ai/create-with-ai',
            label: 'AI',
            isActive: activeEntry == ActiveNavEntry.ai,
          ),
          const _NavItem(
            href: 'https://api.flutter-io.cn',
            label: 'API 参考',
            openInNewTab: true,
          ),
          // docs.flutter.cn
          const _NavItem(
            href: '/about',
            label: '关于中文文档',
          ),
        ]),

        div(
          classes: 'navbar-contents',
          [
            const form(
              action: '/search/',
              id: 'header-search',
              [
                input(
                  classes: 'search-field',
                  type: InputType.search,
                  name: 'q',
                  id: 'q',
                  attributes: {
                    'autocomplete': 'off',
                    'placeholder': '搜索',
                    'aria-label': '搜索',
                  },
                ),
              ],
            ),
            const a(
              id: 'fallback-search-button',
              classes: 'icon-button',
              href: '/search',
              attributes: {
                'aria-label': '导航至 docs.flutter.cn 搜索页。',
                'title': '导航至 docs.flutter.cn 搜索页。',
              },
              [
                MaterialIcon('search'),
              ],
            ),
            const ThemeSwitcher(),
            const SiteSwitcher(),

            if (activeEntry != ActiveNavEntry.learn)
              const Button(
                id: 'call-to-action',
                style: ButtonStyle.filled,
                content: '开始使用',
                href: '/learn/pathway',
              ),
            if (context.page.data['sidenav'] != null) const MenuToggle(),
          ],
        ),
      ]),
    ]);
  }
}

class _NavItem extends StatelessComponent {
  const _NavItem({
    required this.href,
    required this.label,
    this.isActive = false,
    this.openInNewTab = false,
  });

  final String href;
  final String label;
  final bool isActive;
  final bool openInNewTab;

  @override
  Component build(BuildContext _) => li([
    a(
      href: href,
      classes: ['nav-link', 'text-button', if (isActive) 'active'].toClasses,
      attributes: openInNewTab ? {'target': '_blank', 'rel': 'noopener'} : null,
      [.text(label)],
    ),
  ]);
}
