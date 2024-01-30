## Configuring web app support

## 配置 web 应用支持

On ChromeOS, you do development work in a Linux container.
However, the Chrome browser itself is part of the
parent ChromeOS operating system,
and Flutter doesn't have a means to call it with the required parameters.

在 ChromeOS 上，开发工作是在 Linux 容器中进行的。
然而，Chrome 浏览器本身是 ChromeOS 操作系统的一部分，
Flutter 无法使用必要的参数来调用它。

Track this issue at [Issue 121462: Improve the web debugging experience on Chromebooks]({{site.repo.flutter}}/issues/121462).

追踪此问题：[Issue 121462: Improve the web debugging experience on Chromebooks]({{site.github}}/flutter/flutter/issues/121462).

Instead, the best approach is to manually install a second copy of
Chrome in the Linux container. You can do that with the following steps:

最好的办法是在 Linux 容器中手动安装第二个 Chrome 浏览器副本。
具体步骤如下：

```terminal
$ wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
$ sudo apt install ./google-chrome-stable_current_amd64.deb
```
