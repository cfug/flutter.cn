// Copyright 2025 The Flutter Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// ignore_for_file: lines_longer_than_80_chars

import 'package:jaspr/jaspr.dart';
import 'package:jaspr_content/jaspr_content.dart';

import '../client/global_scripts.dart';
import '../components/common/client/cookie_notice.dart';
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
      meta(httpEquiv: 'Content-Language', content: 'zh'),
      if (pageData['noindex'] case final noIndex?
          when noIndex == true || noIndex == 'true')
        meta(name: 'robots', content: 'noindex'),
      if (pageData['canonical'] case final String canonicalUrl
          when canonicalUrl.isNotEmpty)
        link(rel: 'canonical', href: canonicalUrl),
      if (pageData['redirectTo'] case final String redirectTo
          when redirectTo.isNotEmpty)
        raw('<script>window.location.replace("$redirectTo");</script>'),
      link(
        rel: 'icon',
        href: '/assets/images/cn/flutter-icon.png',
        attributes: {'sizes': '64x64'},
      ),
      link(
        rel: 'apple-touch-icon',
        href: '/assets/images/cn/flutter-320px.png',
      ),
      meta(name: 'twitter:card', content: 'summary'),
      // docs.flutter.cn
      meta(name: 'twitter:site', content: '@flutterchina'),
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
      meta(
        attributes: {
          'property': 'og:image',
          'content': '/assets/images/cn/flutter-cn-logo.png',
        },
      ),

      link(rel: 'preconnect', href: 'https://fonts.googleapis.cn'),
      link(
        rel: 'preconnect',
        href: 'https://fonts.gstatic.cn',
        attributes: {'crossorigin': ''},
      ),
      // docs.flutter.cn
      link(rel: 'preconnect', href: 'https://files.flutter-io.cn'),
      // docs.flutter.cn
      link(
        rel: 'stylesheet',
        href: 'https://files.flutter-io.cn/fonts/flutter/fonts.css',
      ),
      // docs.flutter.cn
      link(
        rel: 'stylesheet',
        href:
            'https://files.flutter-io.cn/fonts/material-icons/material-icons-symbols-outlined.css',
      ),
      // link(
      //   rel: 'stylesheet',
      //   href:
      //       'https://fonts.googleapis.com/css2?family=Google+Sans:wght@400;500;700&display=swap',
      // ),
      // link(
      //   rel: 'stylesheet',
      //   href:
      //       'https://fonts.googleapis.com/css2?family=Google+Sans+Mono:wght@400;500;700&display=swap',
      // ),
      // link(
      //   rel: 'stylesheet',
      //   href:
      //       'https://fonts.googleapis.com/css2?family=Google+Sans+Text:wght@400;500;700&display=swap',
      // ),
      // link(
      //   rel: 'stylesheet',
      //   href:
      //       'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0..1,0',
      // ),
      link(
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
      script(
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
      // <meta name="google-site-verification" content="HFqxhSbf9YA_0rBglNLzDiWnrHiK_w4cqDh2YD2GEY4">
      // <script>
      //   window.dataLayer = window.dataLayer || [];
      // </script>
      // <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      // new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      // j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      // 'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      // })(window,document,'script','dataLayer','GTM-ND4LWWZ');</script>

      // <script>
      // (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
      // (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
      // m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
      // })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

      // ga('create', 'UA-67589403-1', 'auto');
      // ga('send', 'pageview');
      // </script>
      // '''),

      // docs.flutter.cn
      // Google tag (gtag.js)
      if (productionBuild)
        raw('''
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
    ];
  }

  @override
  Component buildBody(Page page, Component child) {
    final pageData = page.data.page;
    final bodyClass = pageData['bodyClass'] as String?;
    final pageUrl = page.url.startsWith('/') ? page.url : '/${page.url}';
    final sideNavEntries = switch (page.data['sidenav']) {
      final List<Object?> sidenavData => navEntriesFromData(sidenavData),
      _ => null,
    };
    final obsolete = pageData['obsolete'] == true;

    return Component.fragment(
      [
        const Document.html(
          attributes: {
            'lang': 'zh',
            'dir': 'ltr',
          },
        ),
        if (bodyClass != null) Document.body(attributes: {'class': bodyClass}),
        // The theme setting logic should remain before other scripts to
        // avoid a flash of the initial theme on load.
        raw('''
<script>
const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)');

const storedTheme = window.localStorage.getItem('theme') ?? 'light-mode';
if (storedTheme === 'auto-mode') {
  document.body.classList.add(
      'auto-mode',
      prefersDarkMode.matches ? 'dark-mode' : 'light-mode',
  );
} else {
  document.body.classList.add(storedTheme);
}
</script>
      '''),
        if (productionBuild)
          raw(
            '<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=G-HPSFTRXK91" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>',
          ),
        a(
          id: 'skip-to-main',
          classes: 'filled-button',
          href: '#site-content-title',
          [text('跳转至正文')],
        ),
        // const CookieNotice(),
        const DashHeader(),
        div(id: 'site-below-header', [
          div(id: 'site-main-row', [
            if (sideNavEntries != null)
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
              div(id: 'obsolete-banner', [
                div(classes: 'text-center', [
                  text('本页面的部分内容可能已经过时。'),
                ]),
              ]),
          ]),
          const DashFooter(),
        ]),
        // Scroll the sidenav to the active item before other logic
        // to avoid it jumping after page load.
        raw('''
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
        GlobalScripts(),
      ],
    );
  }
}
