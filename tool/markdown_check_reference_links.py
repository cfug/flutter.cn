import re
import sys
from pathlib import Path
from pprint import pprint
from subprocess import check_output
from sys import argv

from tqdm import tqdm


def check_path(path):
    bad_files = {}

    with tqdm(tuple(Path(path).rglob("*.md"))) as files:
        for file in files:
            file: Path

            if file.name.startswith("_"):
                continue

            filename = file.relative_to(path).as_posix()

            files.set_postfix(file=filename)

            with file.open() as f:
                html = check_output("pandoc", stdin=f, encoding="utf8")

            # remove code blocks
            html = re.sub(r"<pre.*?</pre>", "", html, flags=re.DOTALL)

            # remove such lines:
            # [foo][bar] Pull request title
            html = re.sub(
                r'<p><a href="https://github.com/.*?/pull/\d+">\d+</a> .*?</p>',
                "",
                html,
            )

            # https://github.github.com/gfm/#reference-link
            if m := re.findall(r"\[[^\[\]]+]\[[^\[\]]*]", html):
                bad_files[filename] = m

    return bad_files


if __name__ == "__main__":
    res = check_path(argv[1] if len(argv) == 2 else input())
    print(f"{len(res)=}")
    pprint(res)
    if res:
        sys.exit(-1)
