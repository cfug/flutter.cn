# China-only overlays

Upstream `flutter/website` does not have these. A merge will delete
them or replace them with the global-site version. After every sync,
check this list and put the Chinese-site behavior back.

## Docs identity

| Path | Keep |
| --- | --- |
| `sites/docs/src/data/site.yml` | `url: https://docs.flutter.cn`, `main-url: https://flutter.cn`, `name` / `title` / `description` in Chinese |
| `sites/docs/lib/src/components/layout/header.dart` | Logo `/assets/images/cn/flutter-cn-logo-default.svg`, alt `Flutter CN logo`, search control pointing at docs.flutter.cn |
| `sites/docs/src/content/community/china/index.md` | Bilingual "Using Flutter in China". English from upstream, Chinese underneath. Include `{% render "docs/china-notice-cn.md" %}`. |
| `sites/docs/lib/src/layouts/doc_layout.dart` | `AiTranslationNotice` when `ai-translated` is set. The comment marks this as the docs.flutter.cn layout. |

## Mirror URLs (`sites/docs/src/data/site.yml`)

Use these keys instead of hard-coding the global hosts in body copy
when the page already uses them:

| Key | Value |
| --- | --- |
| `api` | `https://api.flutter-io.cn` |
| `main-api` | `https://main-api.flutter-io.cn` |
| `pub` / `pub-api` / `pub-pkg` | `https://pub-web.flutter-io.cn` and its `/documentation`, `/packages` paths |
| `dart-site` | `https://dart.cn` |
| `dart.api` | `https://api.dart.cn` |
| `dartpad` | `https://dartpad.cn` |
| `flutter-files-cn` | `https://files.flutter-io.cn` |
| `developers` | `https://developers.google.cn` |
| `codelabs` | `https://codelabs.developers.google.cn` |
| `firebase` | `https://firebase.google.cn` |
| `android-dev` | `https://developer.android.google.cn` |
| `material` | `https://m3.material.io` |
| `bili.*` | Bilibili embed URLs. Upstream will not have this block. |

API class links in prose look like
`https://api.flutter.cn/flutter/...` or the `api.flutter-io.cn` mirror.
Do not "fix" them to `api.flutter.dev`.

`files.flutter-io.cn` is also the host for the lite-youtube script in
`packages/site_shared/lib/src/layouts/dash_layout.dart`.

## Analytics

`packages/site_shared/lib/src/layouts/dash_layout.dart` loads both:

- Google tag `G-HPSFTRXK91`
- Open Analytics: `https://c.getopen.so/oa.js`

Baidu (`hm.baidu.com` / `_hmt`) was removed in the 2026/09/03 sync.
Do not restore it. Do not drop the Open Analytics snippet when
upstream edits this layout.

## Host redirect

OSS cannot apply the `firebase.json` redirect list. The 404 page runs
`tool/host-redirect` output instead.

- Source of redirects: `sites/docs/firebase.json`
- Reader: `tool/host-redirect/src/generate_firebase_data.js`
  (`READ_FILE_FIREBASE_JSON` is `../../sites/docs/firebase.json`)
- Built asset: `sites/docs/web/assets/js/host-redirect.min.js`
- Workflows that compile it must trigger on `sites/docs/firebase.json`,
  not a repo-root `firebase.json`
- Node 24

Rebuild after `firebase.json` changes:

```bash
cd tool/host-redirect && npm i && npm run build
```

API redirects in that tool send `/flutter/...` to `api.flutter-io.cn`.

## Paths that moved

Before 2026/05/08 the site lived at the repo root (`src/content/`).
It now lives at `sites/docs/`. New syncs edit `sites/docs/`.
When an old patch mentions `src/content/` or `src/data/site.yml`,
apply it under `sites/docs/src/`.

CI for the docs site is `docs.yml` (and `dart.yml` for Dart checks).
The marketing site is `www.yml`. A sync that only touches one site
should not retarget the other site's workflow paths.

## Removed on purpose

Do not revive these if they reappear in a conflict:

- `codelabs.flutter-io.cn`
- `m3.material-io.cn` (use `https://m3.material.io`)
- Baidu analytics snippet
- Repo-root `firebase.json` as the docs hosting config
