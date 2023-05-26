## Configuring web app support

On ChromeOS, you do development work in a Linux container.
However, the Chrome browser itself is part of the
parent ChromeOS operating system,
and Flutter doesn't have a means to call it with the required parameters.

Track this issue at [Issue 121462: Improve the web debugging experience on Chromebooks]({{site.github}}/flutter/flutter/issues/121462).

Instead, the best approach is to manually install a second copy of
Chrome in the Linux container. You can do that with the following steps:

```terminal
$ wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
$ sudo apt install ./google-chrome-stable_current_amd64.deb
```
