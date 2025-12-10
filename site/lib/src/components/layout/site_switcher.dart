// Copyright 2025 The Flutter Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

import 'package:jaspr/jaspr.dart';

import '../../util.dart';
import '../common/button.dart';
import '../common/dropdown.dart';

@client
final class SiteSwitcher extends StatelessComponent {
  const SiteSwitcher();

  @override
  Component build(BuildContext _) {
    return Dropdown(
      id: 'site-switcher',
      toggle: const Button(icon: 'apps', title: 'Visit related sites.'),
      content: nav(
        classes: 'dropdown-menu',
        attributes: {'role': 'menu'},
        [
          ul(
            const [
              _SiteWordMarkListEntry(
                name: 'Flutter',
                href: 'https://flutter.cn',
              ),
              _SiteWordMarkListEntry(
                name: 'Flutter',
                subtype: 'Docs',
                href: '/',
                current: true,
              ),
              _SiteWordMarkListEntry(
                name: 'Flutter',
                subtype: 'API',
                href: 'https://api.flutter-io.cn',
              ),
              _SiteWordMarkListEntry(
                name: 'Flutter',
                subtype: 'Blog',
                href: 'https://blog.flutter.dev',
              ),
              Component.element(
                tag: 'li',
                classes: 'dropdown-divider',
                attributes: {'aria-hidden': 'true', 'role': 'separator'},
              ),
              _SiteWordMarkListEntry(
                name: 'Dart',
                href: 'https://dart.cn',
                dart: true,
              ),
              _SiteWordMarkListEntry(
                name: 'DartPad',
                href: 'https://dartpad.cn',
                dart: true,
              ),
              _SiteWordMarkListEntry(
                name: 'pub.dev',
                href: 'https://pub-web.flutter-io.cn',
                dart: true,
              ),
            ],
          ),
        ],
      ),
    );
  }
}

class _SiteWordMarkListEntry extends StatelessComponent {
  const _SiteWordMarkListEntry({
    required this.href,
    required this.name,
    this.subtype,
    this.current = false,
    this.dart = false,
  });

  final bool dart;
  final String href;
  final String name;
  final String? subtype;
  final bool current;

  String get _combinedName => '$name${subtype != null ? ' $subtype' : ''}';

  @override
  Component build(BuildContext _) {
    return li(
      attributes: {'role': 'presentation'},
      [
        a(
          href: href,
          classes: ['site-wordmark', if (current) 'current-site'].toClasses,
          attributes: {
            'role': 'menuitem',
            'title': '导航至 $_combinedName 网站',
            'aria-label': '导航至 $_combinedName 网站',
          },
          [
            if (dart)
              img(
                src: '/assets/images/branding/dart/logo.svg',
                alt: 'Dart logo',
                width: 28,
                height: 28,
              )
            else
              img(
                src: '/assets/images/cn/flutter-cn-logo-default.svg',
                alt: 'Flutter logo',
                width: 28,
              ),
            span(
              classes: 'name',
              attributes: {
                'translate': 'no',
              },
              [text(name)],
            ),
            if (subtype case final subtype?)
              span(
                classes: 'subtype',
                [text(subtype)],
              ),
          ],
        ),
      ],
    );
  }
}
