Some Flutter components require the 
[Rosetta 2 translation process][need-rosetta]
on Macs running [Apple silicon][].
To run all Flutter components on Apple silicon,
install [Rosetta 2][rosetta].

如果你的 Mac 是 [Apple silicon][] 处理器，
那么有些 Flutter 组件就需要通过 Rosetta 2 来转换适配（[详情][need-rosetta]）。
要在 Apple silicon 处理器上运行所有 Flutter 组件，
请运行以下指令来安装 [Rosetta 2][rosetta]。

```console
$ sudo softwareupdate --install-rosetta --agree-to-license
```

[Apple silicon]: https://support.apple.com/en-us/HT211814
[rosetta]: https://support.apple.com/en-us/HT211861
[need-rosetta]: {{site.repo.this}}pull/7119#issuecomment-1124537969
