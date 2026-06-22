// Copyright 2026 The Flutter Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

import 'dart:convert';

import 'package:jaspr/dom.dart';
import 'package:jaspr/server.dart';
import 'package:jaspr_content/jaspr_content.dart';

// import '../../components/common/client/cookie_notice.dart';
import '../../components/layout/banner.dart';
import '../../util.dart';

/// The base Jaspr Content layout for all sites.
abstract class DashLayout implements PageLayout {
  const DashLayout();

  @override
  String get name;

  List<String> get defaultBodyClasses => [];

  String? get titleBase => null;
  String get siteHost;
  bool get cookieNoticeDarkMode => false;

  String get iconUrl;
  String get iconUrlApple;
  String? get iconUrlApple152 => null;
  String? get iconUrlApple167 => null;
  String? get iconUrlApple180 => null;
  String get twitterSiteTag;
  String get twitterDefaultImageUrl;

  String get tagManagerId;
  String get analyticsId;

  /// Returns page-specific URLs to eagerly speculate on, in addition to
  /// the document-level rules that match all internal links.
  ///
  /// Override in subclasses to provide page-specific URLs for
  /// eager prerendering and prefetching.
  ({Set<String> prerender, Set<String> prefetch}) speculationUrls(Page page) =>
      const (prerender: {}, prefetch: {});

  /// Font stylesheet URLs to load in the document head before site styles.
  ///
  /// Override this to add, remove, or replace site-level font resources.
  List<String> get fontUrls => const [
    'https://files.flutter-io.cn/fonts/flutter/fonts.css',
    'https://files.flutter-io.cn/fonts/material-icons/material-icons-symbols-outlined.css',
  ];

  String get stylesHash;

  Iterable<Component> buildExtraHead(Page page) => const [];

  Iterable<Component> _buildHead(Page page) {
    final pageData = page.data.page;
    final siteData = page.data.site;

    final pageTitle = (pageData['title'] ?? siteData['title']) as String;
    final pageDescription = pageData['description'] as String?;
    final pageImage = pageData['image'] as String?;

    final windowTitle = titleBase != null
        ? '$pageTitle | $titleBase'
        : pageTitle;

    final canonicalUrl = pageData['canonical'] as String?;

    return [
      // docs.flutter.cn
      const meta(httpEquiv: 'Content-Language', content: 'zh'),
      Component.element(tag: 'title', children: [.text(windowTitle)]),
      if (pageDescription case final String desc)
        meta(name: 'description', content: desc),

      // Set indexing and canonical URL configuration.
      if (pageData['noindex'] case final noIndex?
          when noIndex == true || noIndex == 'true')
        const meta(name: 'robots', content: 'noindex'),
      if (canonicalUrl case final canonicalUrl? when canonicalUrl.isNotEmpty)
        link(rel: 'canonical', href: canonicalUrl),
      if (pageData['redirectTo'] case final String redirectTo
          when redirectTo.isNotEmpty)
        RawText('<script>window.location.replace("$redirectTo");</script>'),

      // Set site icons.
      link(rel: 'icon', href: iconUrl, attributes: {'sizes': '64x64'}),
      link(rel: 'apple-touch-icon', href: iconUrlApple),
      if (iconUrlApple152 case final url?)
        link(
          rel: 'apple-touch-icon',
          href: url,
          attributes: {'sizes': '152x152'},
        ),
      if (iconUrlApple180 case final url?)
        link(
          rel: 'apple-touch-icon',
          href: url,
          attributes: {'sizes': '180x180'},
        ),
      if (iconUrlApple167 case final url?)
        link(
          rel: 'apple-touch-icon',
          href: url,
          attributes: {'sizes': '167x167'},
        ),

      // Set social media metadata.
      meta(
        name: 'twitter:card',
        content: pageImage != null ? 'summary_large_image' : 'summary',
      ),
      meta(name: 'twitter:site', content: twitterSiteTag),
      meta(name: 'twitter:title', content: pageTitle),
      if (pageDescription case final String desc)
        meta(name: 'twitter:description', content: desc),
      if (pageImage case final String img)
        meta(name: 'twitter:image', content: img),

      meta(attributes: {'property': 'og:title', 'content': pageTitle}),
      if (pageDescription case final String desc)
        meta(attributes: {'property': 'og:description', 'content': desc}),
      meta(
        attributes: {
          'property': 'og:url',
          'content': canonicalUrl ?? page.path,
        },
      ),
      meta(
        attributes: {
          'property': 'og:image',
          'content': pageImage ?? twitterDefaultImageUrl,
        },
      ),

      // Set site fonts and related preconnection information.
      const link(rel: 'preconnect', href: 'https://fonts.googleapis.cn'),
      const link(
        rel: 'preconnect',
        href: 'https://fonts.gstatic.cn',
        attributes: {'crossorigin': ''},
      ),
      // docs.flutter.cn
      const link(rel: 'preconnect', href: 'https://files.flutter-io.cn'),
      for (final font in fontUrls) link(rel: 'stylesheet', href: font),

      // Set site styles.
      link(
        rel: 'stylesheet',
        href: '/assets/css/main.css?hash=$stylesHash',
      ),

      // Set site scripts.
      if (pageData['js'] case final List<Object?> jsList)
        for (final js in jsList)
          if (js case {'url': final String jsUrl, 'defer': final Object? defer})
            script(
              src: jsUrl,
              attributes: {if (defer == 'true' || defer == true) 'defer': ''},
            ),
      ...buildExtraHead(page),

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
      //       if (productionBuild) ...[
      //         ......
      //       ],
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

  Component buildBody(Page page, Component child);

  @override
  Component buildLayout(Page page, Component child) {
    final pageData = page.data.page;
    final bodyClass = pageData['bodyClass'] as String?;

    return Component.element(
      tag: 'html',
      attributes: {'lang': 'zh', 'dir': 'ltr'},
      children: [
        Component.element(
          tag: 'head',
          children: [
            const meta(charset: 'utf-8'),
            const meta(
              name: 'viewport',
              content: 'width=device-width, initial-scale=1',
            ),
            ..._buildHead(page),
          ],
        ),
        Component.element(
          tag: 'body',
          classes: [?bodyClass, ...defaultBodyClasses].toClasses,
          children: [
            // The theme setting logic should remain before other scripts to
            // avoid a flash of the initial theme on load.
            const script(
              content: '''
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
      ''',
            ),
            if (productionBuild)
              const RawText(
                '<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=G-HPSFTRXK91" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>',
              ),
            const a(
              id: 'skip-to-main',
              classes: 'filled-button',
              href: '#site-content-title',
              attributes: {'tabindex': '1'},
              [.text('跳转至正文')],
            ),
            // CookieNotice(host: siteHost,
            // alwaysDarkMode: cookieNoticeDarkMode),
            buildBody(page, child),
          ],
        ),
      ],
    );
  }

  /// Builds the banner component for the given [page].
  Component? buildBanner(Page page) {
    final showBanner =
        (page.data.page['showBanner'] as bool?) ??
        (page.data.site['showBanner'] as bool?) ??
        false;
    if (showBanner) {
      if (page.data['banner'] case final List<Object?> bannerData) {
        return DashBanner(BannerContent.fromList(bannerData));
      }
    }

    return null;
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
