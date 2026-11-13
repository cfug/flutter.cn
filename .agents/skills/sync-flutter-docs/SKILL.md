---
name: sync-flutter-docs
description: >-
  Sync upstream flutter/website edits into the cfug/flutter.cn Chinese
  site and repair the bilingual docs plus China-only overlays. Use when
  merging flutter/website, opening a [sync] pull request, updating
  Chinese text after an English doc change, or when the user mentions
  issue 374, sync-flutter-docs, host-redirect, or 同步上游文档.
---

# Sync Flutter docs

Bring `flutter/website` `main` into this repo, then repair the
Chinese layer and the China-only site behavior that the merge
overwrites. Record the result on
[issue 374](https://github.com/cfug/flutter.cn/issues/374).

Upstream English is the anchor. Chinese is a paired layer under it.
Build tooling folds the English away for readers. A sync updates the
English to match upstream, then updates the Chinese so it still
matches that English.

Read [tool/translator/AGENT_TRANSLATION_GUIDE.md](../../../tool/translator/AGENT_TRANSLATION_GUIDE.md)
before editing Markdown. Use the `format-markdown` skill for markup.
For prose judgment, use `write-technical-docs`, then apply the
Chinese rules in the translator guide (「你」 not 「您」, spacing,
terms).

## Pull request

- Branch: `sync-YYYYMMDD`
- Title: `[sync] yyyy/mm/dd` (the sync date, not the merge date)
- Body starts with `ref https://github.com/cfug/flutter.cn/issues/374`
- Add `#### 主要更新` only for changes a reviewer must notice:
  Flutter version, new site or directory layout, CI split, analytics,
  and docs that landed in English and still need a follow-up translation.

## Workflow

```
Task Progress:
- [ ] 1. Range: commits on flutter/website since the last [sync] merge
- [ ] 2. Merge upstream main into sync-YYYYMMDD
- [ ] 3. Restore China-only overlays the merge clobbered
- [ ] 4. Update Chinese pairs for changed English
- [ ] 5. Translate new docs pages; leave deferred www/blog noted
- [ ] 6. Fix links, excerpts, and anchors the English edit broke
- [ ] 7. Open the [sync] PR linked to issue 374
```

### 1. Find the range

The last merged sync is the latest `main` commit whose subject is
`[sync] yyyy/mm/dd (#NNNN)`. Its second parent is the tip of the
previous sync branch and already contains upstream commits.

```bash
git fetch https://github.com/flutter/website.git main
git log --oneline -1 --grep='^\[sync\] '
```

New upstream commits are those on `FETCH_HEAD` that are not in `HEAD`.

### 2. Merge

```bash
git switch -c sync-YYYYMMDD
git merge FETCH_HEAD
```

Expect hundreds of files. Most of the diff is upstream and should
land as-is: examples, skills under `.agents/skills/`, release notes,
workflow files that are not in the overlay list.

Resolve conflicts file by file:

| Conflict | Keep |
| --- | --- |
| English prose or code changed upstream | Upstream English. Then edit the Chinese pair so it matches the new English. |
| Chinese pair, `site.yml` mirror URLs, analytics, logo, host-redirect, `community/china` | The Chinese-site side, then re-apply any new upstream English above the existing Chinese. |
| A file deleted upstream | Delete it, including its Chinese pair, unless it is China-only (see [overlays.md](overlays.md)). |
| A file added upstream under `sites/docs/src/content/` | Keep the English and add a Chinese pair in the same change. |
| A file added under `sites/www/` or a new English blog import | Keep the English. If it is not translated in this PR, say so under `主要更新`. |

`sites/www` first arrived untranslated in `[sync] 2026/06/22` (#1625).
Do not block a sync on localizing the whole marketing site.
Do not leave an already-bilingual docs page with stale Chinese.

### 3. Restore overlays

After the merge, diff the paths in [overlays.md](overlays.md)
against `HEAD^` (the pre-merge Chinese site). Put back any China-only
behavior upstream replaced. Upstream regularly resets:

- `sites/docs/firebase.json` location (repo-root `firebase.json` is wrong)
- `tool/host-redirect/src/generate_firebase_data.js` reading that file
- `sites/docs/src/data/site.yml` mirror URLs
- docs header logo and search copy
- analytics in `packages/site_shared`
- `<?code-excerpt` paths and fenced samples

### 4. Update Chinese to match the new English

For each hunk that changes prose under `sites/docs/src/content/`
or `sites/docs/src/_includes/`:

- English paragraph, heading, or list item changed: rewrite the
  Chinese directly under it. Do not leave a translation of the
  previous sentence.
- English inserted: add Chinese in the same pattern under the new English.
- English deleted: delete the paired Chinese.
- Code, `<?code-excerpt` tags, URLs in link definitions, and API names
  stay as upstream wrote them.
- A heading whose visible text is only a product or API name
  (`iOS`, `` `HtmlElementView` ``) needs a distinct Chinese heading
  (`iOS 平台`, `` `HtmlElementView` 组件 ``) so anchors do not collide.

Highest-frequency mistakes from past syncs:

- Chinese list items became their own `-` / `1.` items.
- A `:::note` / `:::tip` was split into two blocks.
- The Chinese still described the old file, widget, or path
  (for example an iOS page whose Chinese still said `build.gradle`).
- Link labels were translated but the reference id was not preserved:
  `[译文][Original id]`, definition line unchanged.
- Front matter `title` / `description`: comment the English line and
  set the Chinese line. Add `ai-translated: true` on pages translated
  in this change.
- Component YAML (`<Quiz>`, `<SummaryCard>`) is Chinese only.

### 5. Check the mechanical fallout

```bash
dart run dash_site --site=docs refresh-excerpts
dart run dash_site --site=docs format-dart
dart run dash_site --site=docs check-link-references
```

Then search the diff for stale targets:

- `docs.flutter.dev`, `flutter.dev`, `api.flutter.dev`, `pub.dev`,
  `dartpad.dev` inside docs content that should use the mirror
  keys in `site.yml` (`api`, `pub`, `dartpad`, `main-url`)
- `codelabs.flutter-io.cn` (removed; do not bring it back)
- `m3.material-io.cn` (the live target is `https://m3.material.io`)
- SDK archive names. Upstream dropped the extra `v` in
  `flutter_windows_3.x.x-stable.zip`. China download snippets must
  match.
- Heading slug logic must keep Unicode letters, or Chinese heading
  links point at an English-only id.

`dart run dash_site --site=docs build` when the content or layout
change is large enough that excerpts and link checks would miss it.

## What to leave alone

- Do not rewrite upstream commits. Add follow-up commits on the
  sync branch (`sync: yyyy/mm/dd`, then small `fix:` commits).
- Do not translate `.agents/skills/` or English code comments.
- Do not translate `sites/docs/src/content/release/release-notes/`
  unless that page is already bilingual.
- Do not commit or push unless the user asks.

## Studied history

The procedure above is the common shape of the 30 newest PRs linked
to issue 374, plus 10 older ones. Dates, titles, and the follow-up
repairs those PRs kept repeating are in
[studied-prs.md](studied-prs.md). China-only files are in
[overlays.md](overlays.md).
