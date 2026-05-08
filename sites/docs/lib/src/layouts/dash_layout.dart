// Copyright 2025 The Flutter Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

import 'dart:convert';

import 'package:jaspr/dom.dart';
import 'package:jaspr/jaspr.dart';
import 'package:jaspr_content/jaspr_content.dart';

// import '../components/common/client/cookie_notice.dart';
import '../components/layout/footer.dart';
import '../components/layout/header.dart';
import '../components/layout/sidenav.dart';
import '../models/sidenav_model.dart';
import '../style_hash.dart';
import '../util.dart';

/// The base Jaspr Content layout for wrapping site content.
abstract class FlutterDocsLayout extends PageLayoutBase {
  const FlutterDocsLayout();

  @override
  String get name;

  List<String> get defaultBodyClasses => [];

  String get defaultSidenav => 'default';

  /// Returns page-specific URLs to eagerly speculate on, in addition to
  /// the document-level rules that match all internal links.
  ///
  /// Override in subclasses to provide page-specific URLs for
  /// eager prerendering and prefetching.
  ({Set<String> prerender, Set<String> prefetch}) speculationUrls(Page page) =>
      const (prerender: {}, prefetch: {});

  @override
  @mustCallSuper
  Iterable<Component> buildHead(Page page) {
    final pageData = page.data.page;
    final siteData = page.data.site;
    final pageTitle = (pageData['title'] ?? siteData['title']) as String;
    final pageDescription = pageData['description'] as String? ?? '';

    return [
      ...super.buildHead(page),
      // docs.flutter.cn
      const meta(httpEquiv: 'Content-Language', content: 'zh'),
      if (pageData['noindex'] case final noIndex?
          when noIndex == true || noIndex == 'true')
        const meta(name: 'robots', content: 'noindex'),
      if (pageData['canonical'] case final String canonicalUrl
          when canonicalUrl.isNotEmpty)
        link(rel: 'canonical', href: canonicalUrl),
      if (pageData['redirectTo'] case final String redirectTo
          when redirectTo.isNotEmpty)
        RawText('<script>window.location.replace("$redirectTo");</script>'),
      const link(
        rel: 'icon',
        href: '/assets/images/cn/flutter-icon.png',
        attributes: {'sizes': '64x64'},
      ),
      const link(
        rel: 'apple-touch-icon',
        href: '/assets/images/cn/flutter-320px.png',
      ),
      const meta(name: 'twitter:card', content: 'summary'),
      // docs.flutter.cn
      const meta(name: 'twitter:site', content: '@flutterchina'),
      meta(name: 'twitter:title', content: pageTitle),
      meta(
        name: 'twitter:description',
        content: pageDescription,
      ),

      meta(attributes: {'property': 'og:title', 'content': pageTitle}),
      meta(
        attributes: {
          'property': 'og:description',
          'content': pageDescription,
        },
      ),
      meta(attributes: {'property': 'og:url', 'content': page.path}),
      const meta(
        attributes: {
          'property': 'og:image',
          'content': '/assets/images/cn/flutter-cn-logo.png',
        },
      ),

      const link(rel: 'preconnect', href: 'https://fonts.googleapis.cn'),
      const link(
        rel: 'preconnect',
        href: 'https://fonts.gstatic.cn',
        attributes: {'crossorigin': ''},
      ),
      // docs.flutter.cn
      const link(rel: 'preconnect', href: 'https://files.flutter-io.cn'),
      // docs.flutter.cn
      const link(
        rel: 'stylesheet',
        href: 'https://files.flutter-io.cn/fonts/flutter/fonts.css',
      ),
      // docs.flutter.cn
      const link(
        rel: 'stylesheet',
        href:
            'https://files.flutter-io.cn/fonts/material-icons/material-icons-symbols-outlined.css',
      ),
      // const link(
      //   rel: 'stylesheet',
      //   href:
      //       'https://fonts.googleapis.com/css2?family=Google+Sans:wght@400;500;700&display=swap',
      // ),
      // const link(
      //   rel: 'stylesheet',
      //   href:
      //       'https://fonts.googleapis.com/css2?family=Google+Sans+Mono:wght@400;500;700&display=swap',
      // ),
      // const link(
      //   rel: 'stylesheet',
      //   href:
      //       'https://fonts.googleapis.com/css2?family=Google+Sans+Text:wght@400;500;700&display=swap',
      // ),
      // const link(
      //   rel: 'stylesheet',
      //   href:
      //       'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0..1,0',
      // ),
      const link(
        rel: 'stylesheet',
        href: '/assets/css/main.css?hash=$generatedStylesHash',
      ),

      if (pageData['js'] case final List<Object?> jsList)
        for (final js in jsList)
          if (js case {'url': final String jsUrl, 'defer': final Object? defer})
            script(
              src: jsUrl,
              attributes: {if (defer == 'true' || defer == true) 'defer': ''},
            ),
      // docs.flutter.cn
      const script(
        src:
            'https://files.flutter-io.cn/static/deps/lite-youtube/1.8.1/lite-youtube.js',
        attributes: {
          'type': 'module',
          'integrity': 'sha256-dSKwIYLvKdlkLGLp9ZRLJilBuGFSM5beizYOSvK1LeQ',
          'crossorigin': 'anonymous',
          'referrerpolicy': 'no-referrer',
        },
      ),

      // Set up tag manager and analytics.
      //       if (productionBuild)
      //         raw('''
      // ...
      // '''),

      // docs.flutter.cn
      // Google tag (gtag.js)
      if (productionBuild)
        const RawText('''
<script async src="https://www.googletagmanager.com/gtag/js?id=G-HPSFTRXK91"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-HPSFTRXK91');
</script>
<script>
  var _hmt = _hmt || [];
  (function() {
    var hm = document.createElement("script");
    hm.src = "https://hm.baidu.com/hm.js?c50919183c6e001b47301f55de682929";
    var s = document.getElementsByTagName("script")[0]; 
    s.parentNode.insertBefore(hm, s);
  })();
</script>
'''),
      // Add speculation rules and prefetch fallback links for
      // URLs provided by subclass overrides of speculationUrls.
      ..._buildSpeculationRulesHead(page),
    ];
  }

  @override
  Component buildBody(Page page, Component child) {
    final pageData = page.data.page;
    final bodyClass = pageData['bodyClass'] as String?;
    final pageUrl = page.url.startsWith('/') ? page.url : '/${page.url}';

    final sidenavs = page.data['sidenav'] as Map<String, Object?>;
    final pageSidenavKey = pageData['sidenav'] as String? ?? defaultSidenav;
    final sideNavEntries = navEntriesFromData(
      sidenavs[pageSidenavKey] as List<Object?>,
    );

    final obsolete = pageData['obsolete'] == true;

    return .fragment(
      [
        const Document.html(
          attributes: {
            'lang': 'zh',
            'dir': 'ltr',
          },
        ),
        if ([?bodyClass, ...defaultBodyClasses] case final bodyClasses
            when bodyClasses.isNotEmpty)
          Document.body(
            attributes: {
              'class': bodyClasses.toClasses,
            },
          ),
        // The theme setting logic should remain before other scripts to
        // avoid a flash of the initial theme on load.
        const RawText('''
<script>
try {
  const storedTheme = window.localStorage.getItem('theme') ?? 'light-mode';
  if (storedTheme === 'auto-mode') {
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)');
    document.body.classList.add(
        'auto-mode',
        prefersDarkMode.matches ? 'dark-mode' : 'light-mode',
    );
  } else {
    document.body.classList.add(storedTheme);
  }
} catch (e) {
  // localStorage is not available, do nothing and fall back to default.
}
</script>
      '''),
        if (productionBuild)
          const RawText(
            '<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=G-HPSFTRXK91" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>',
          ),
        const a(
          id: 'skip-to-main',
          classes: 'filled-button',
          href: '#site-content-title',
          [.text('跳转至正文')],
        ),
        // const CookieNotice(),
        const DashHeader(),
        div(id: 'site-below-header', [
          div(id: 'site-main-row', [
            DashSideNav(
              navEntries: sideNavEntries,
              currentPageUrl: pageUrl,
            ),
            main_(
              id: 'page-content',
              classes: [
                if (pageData['focusedLayout'] == true) 'focused',
              ].toClasses,
              [child],
            ),
            if (obsolete)
              const div(id: 'obsolete-banner', [
                div(classes: 'text-center', [
                  .text(
                    '本页面的部分内容可能已经过时。',
                  ),
                ]),
              ]),
          ]),
          const DashFooter(),
        ]),
        // Scroll the sidenav to the active item before other logic
        // to avoid it jumping after page load.
        const RawText('''
<script>
const sidenav = document.getElementById('sidenav');
if (sidenav) {
  const activeEntries = sidenav.querySelectorAll('.nav-link.active');
  if (activeEntries.length > 0) {
    const activeEntry = activeEntries[activeEntries.length - 1];

    sidenav.scrollTo({
      top: activeEntry.offsetTop - window.innerHeight / 3,
    });
  }
}
</script>
      '''),
      ],
    );
  }

  /// Builds the speculation rules `<script>` and `<link rel="prefetch">`
  /// fallback tags for the given [page].
  ///
  /// Includes page-specific list rules from [speculationUrls] and
  /// document rules that prefetch internal links on hover (`moderate`)
  /// and prerender them on click (`conservative`).
  ///
  /// Add the `no-prerender` class to a link to
  /// exclude it from document-level prerendering.
  List<Component> _buildSpeculationRulesHead(Page page) {
    final (:prerender, :prefetch) = speculationUrls(page);

    // Exclude prerendered URLs from the prefetch list since
    // prerendering is a superset of prefetching.
    final prefetchOnly = prefetch.difference(prerender);

    // Document rules to match same-origin links across the page.
    const internalLink = {'href_matches': '/*'};
    const notNoPrerender = {
      'not': {'selector_matches': '.no-prerender'},
    };

    final rules = jsonEncode({
      'prefetch': [
        // Prefetch internal links on hover.
        {
          'where': internalLink,
          'eagerness': 'moderate',
        },
        // Prefetch specific URLs from the page eagerly.
        if (prefetchOnly.isNotEmpty)
          {
            'urls': [...prefetchOnly],
          },
      ],
      'prerender': [
        // Prerender internal links on click,
        // unless the link has the 'no-prerender' class.
        {
          'where': {
            'and': [internalLink, notNoPrerender],
          },
          'eagerness': 'conservative',
        },
        // Prerender specific URLs from the page eagerly.
        if (prerender.isNotEmpty)
          {
            'urls': [...prerender],
            'eagerness': 'eager',
          },
      ],
    }).replaceAll('</', r'<\/');

    return [
      RawText('<script type="speculationrules">$rules</script>'),
      // Fall back to prefetch link tags for browsers without
      // Speculation Rules API support.
      for (final url in {...prerender, ...prefetch})
        link(rel: 'prefetch', href: url),
    ];
  }
}
