{% assign terminal=include.terminal %}
{% assign target = include.target %}
{% assign dir = include.dir %}

### Add Flutter to your `PATH` {:.no_toc}

To run Flutter commands in {{terminal}},
add Flutter to the `PATH` environment variable.

1. Check which shell starts when you open a new console window.
   This would be your _default shell_.

   ```console
   $ echo $SHELL
   ```

   This differs from another command that tells you which shell runs
   in your current console.

   ```console
   $ echo $0
   ```

1. To add Flutter to your `PATH`, expand the entry for your default shell, then
   choose the command.

{% for shell in shells %}

   <details {% if shell.name == 'bash' %}open{% endif %}>
   <summary>Show <tt>{{shell.name}}</tt> command</summary>

   ```console
   $ {{shell.set-path}}
   ```

   </details>

{% endfor %}

1. To apply this change, restart all open terminal sessions.
