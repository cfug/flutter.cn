# Sync PRs this skill is based on

All 204 pull requests linked to
[issue 374](https://github.com/cfug/flutter.cn/issues/374)
use the title `[sync] yyyy/mm/dd` and a body that references that issue.
The skill's procedure is the shared shape of the 30 newest, plus 10
older PRs drawn from the rest (`random.Random(374).sample`).

Each merged PR is a merge of `flutter/website` plus a short series of
local commits (`sync: yyyy/mm/dd`, then `fix:`). The local commits are
the work this skill exists to repeat.

## Newest 30

| PR | Title | What the local commits were for |
| --- | --- | --- |
| [#1643](https://github.com/cfug/flutter.cn/pull/1643) | [sync] 2026/10/12 | Open. Not in `main` yet. Next sync starts from here once it merges, otherwise from #1641. |
| [#1641](https://github.com/cfug/flutter.cn/pull/1641) | [sync] 2026/09/03 | Flutter 3.47. Baidu analytics replaced with Open Analytics. `firebase.json` path moved to `sites/docs/firebase.json` in host-redirect and docs workflows. |
| [#1638](https://github.com/cfug/flutter.cn/pull/1638) | [sync] 2026/08/04 | Medium posts imported into the local Flutter blog. |
| [#1636](https://github.com/cfug/flutter.cn/pull/1636) | [sync] 2026/07/09 | Upstream import and conflict repair. |
| [#1625](https://github.com/cfug/flutter.cn/pull/1625) | [sync] 2026/06/22 | Marketing site (`sites/www`) joined this repo, still English. Localization was explicitly deferred to a later PR. Also fixed the Dot shorthands link (`/language/dot-shorthand` to `/language/dot-shorthands`). |
| [#1620](https://github.com/cfug/flutter.cn/pull/1620) | [sync] 2026/06/03 | Docs CI split into `docs.yml` and `dart.yml` so `sites/www` could have its own workflow. Fixed a diff code fence in the Kotlin migration page. |
| [#1616](https://github.com/cfug/flutter.cn/pull/1616) | [sync] 2026/05/20 | Flutter 3.44. |
| [#1612](https://github.com/cfug/flutter.cn/pull/1612) | [sync] 2026/05/08 | `dash_site` became multi-site. `src/` moved to `sites/docs/`. Host-redirect bumped to Node 24. Flutter CN logo restored on the docs header. |
| [#1609](https://github.com/cfug/flutter.cn/pull/1609) | [sync] 2026/04/03 | Upstream import and conflict repair. |
| [#1607](https://github.com/cfug/flutter.cn/pull/1607) | [sync] 2026/03/24 | Upstream import and conflict repair. |
| [#1603](https://github.com/cfug/flutter.cn/pull/1603) | [sync] 2026/02/16 | Upstream import and conflict repair. |
| [#1598](https://github.com/cfug/flutter.cn/pull/1598) | [sync] 2026/02/06 | Chinese on the Flutter Favorite page updated to the new English. `material` site key pointed at `https://m3.material.io` (`m3.material-io.cn` removed from posts and `site.yml`). |
| [#1594](https://github.com/cfug/flutter.cn/pull/1594) | [sync] 2026/01/12 | Upstream import and conflict repair. |
| [#1591](https://github.com/cfug/flutter.cn/pull/1591) | [sync] 2025/12/10 | Upstream import. Separate fix so devtools release JSON generation works on Windows. |
| [#1585](https://github.com/cfug/flutter.cn/pull/1585) | [sync] 2025/11/18 | Upstream import and conflict repair. |
| [#1582](https://github.com/cfug/flutter.cn/pull/1582) | [sync] 2025/10/09 | Upstream import and conflict repair. |
| [#1579](https://github.com/cfug/flutter.cn/pull/1579) | [sync] 2025/09/02 | Upstream import and conflict repair. |
| [#1577](https://github.com/cfug/flutter.cn/pull/1577) | [sync] 2025/08/04 | Upstream import and conflict repair. |
| [#1575](https://github.com/cfug/flutter.cn/pull/1575) | [sync] 2025/07/02 | Upstream import and conflict repair. |
| [#1572](https://github.com/cfug/flutter.cn/pull/1572) | [sync] 2025/06/10 | Upstream import and conflict repair. |
| [#1566](https://github.com/cfug/flutter.cn/pull/1566) | [sync] 2025/05/13 | China download snippet: drop the extra `v` in `flutter_opsys_v3.13.0-stable` so it matches upstream archive names. |
| [#1552](https://github.com/cfug/flutter.cn/pull/1552) | [sync] 2025/04/04 | Upstream import, including a merge back from `main` into `sync-20250404`. |
| [#1549](https://github.com/cfug/flutter.cn/pull/1549) | [sync] 2025/03/03 | Upstream import and conflict repair. |
| [#1544](https://github.com/cfug/flutter.cn/pull/1544) | [sync] 2025/02/13 | Includes the 2025/02/04 sync. Chinese on the iOS C-interop page corrected from `android/build.gradle` to `ios/native_add.podspec`. |
| [#1542](https://github.com/cfug/flutter.cn/pull/1542) | [sync] 2025/02/04 | Folded into #1544 as `Sync: 2025/02/04` commits. No separate merge commit on current `main`. |
| [#1537](https://github.com/cfug/flutter.cn/pull/1537) | [sync] 2024/12/24 | Dropped `.github/workflows/codeql-analysis.yml` on the Chinese site. |
| [#1523](https://github.com/cfug/flutter.cn/pull/1523) | [sync] 2024/12/02 | Upstream import and conflict repair. |
| [#1519](https://github.com/cfug/flutter.cn/pull/1519) | [sync] 2024/11/02 | Heading slugify changed to keep Unicode letters (`\p{L}\p{N}`) so Chinese anchors survive. Removed `codelabs.flutter-io.cn`. Link-reference matcher updated so translated link text still resolves. China OS-setup snippet uses `Expand-Archive`. |
| [#1502](https://github.com/cfug/flutter.cn/pull/1502) | [sync] 2024/10/01 | Upstream import and conflict repair. |
| [#1489](https://github.com/cfug/flutter.cn/pull/1489) | [sync] 2024/09/02 | Web renderers page cleaned up after the upstream edit. Examples/codelabs pin bumped with upstream. |

PRs with an empty "local commits" note in the table still follow the
same merge. Their `主要更新` section was only `ref` plus the issue link,
so the user-visible delta was the upstream doc update itself plus
conflict repair.

## 10 older PRs

Same job, on the pre-`sites/docs` tree (`src/content/`, Eleventy).

| PR | Title | Noted in the PR |
| --- | --- | --- |
| [#1076](https://github.com/cfug/flutter.cn/pull/1076) | [sync] 2022/5/15 | New pages after I/O: desktop stable support, and the Happy Path project. Those pages needed translation. |
| [#1036](https://github.com/cfug/flutter.cn/pull/1036) | [sync] 2022/3/3 | Windows desktop docs. |
| [#1024](https://github.com/cfug/flutter.cn/pull/1024) | [sync] 2022/1/17 | Standard sync. Commit subject `[sync] 2022/1/17`. |
| [#905](https://github.com/cfug/flutter.cn/pull/905) | [sync] 2021/6/27 | Standard sync against issue 374. |
| [#864](https://github.com/cfug/flutter.cn/pull/864) | [sync] 2021/5/4 | Commit subject `[sync] 2021/5/4`. |
| [#743](https://github.com/cfug/flutter.cn/pull/743) | [sync] 2020/10/30 | Commit subject `[sync] 2020/10/30`. |
| [#619](https://github.com/cfug/flutter.cn/pull/619) | [sync] 2020/3/6 | Commit subject `[sync] 2020/3/6`. |
| [#599](https://github.com/cfug/flutter.cn/pull/599) | [sync] 2020/1/30 | Commit subject `[sync] 2020/1/30`. |
| [#591](https://github.com/cfug/flutter.cn/pull/591) | [sync] 2020/1/8 | Commit subject `[sync] 2020/1/8`. |
| [#524](https://github.com/cfug/flutter.cn/pull/524) | [sync] 2019/12/4 | Commit subject `[sync] 2019/12/4`. Early sidenav-era site. |

## Repairs that keep coming back

Treat these as expected follow-ups, not one-off bugs:

1. Mirror URLs and `site.yml` keys revert to `flutter.dev` / `pub.dev` / `api.flutter.dev`.
2. `firebase.json` is referenced from the repo root after a layout move.
3. Chinese sentences still describe the previous English file, API, or version.
4. New docs pages arrive in English only.
5. Translated link text no longer matches the reference id, or a renamed Dart/Flutter URL 404s.
6. Heading ids drop non-Latin characters, so the Chinese heading link is wrong.
7. China download snippets keep an outdated archive filename.
8. Analytics, the CN logo, and host-redirect are overwritten by the shared layout.
