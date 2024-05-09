## DartPad injection

To embed a DartPad with arbitrary Dart in to your web page, add the
JS file found at `lib/inject_dartpad.js` with a `<script>` tag,
set up to run after the DOM is ready.

This might look something like the following, depending on where
your version of the JS file is stored.

```html
<script defer src="inject_dartpad.js"></script>
```

### Declare code to inject

The script looks for each inline `<code>` element on the page
that is the only child of a `<pre>` element and
has the `data-dartpad="true"` property.

```html
<pre>
  <code class="language-dart" data-dartpad="true">
    ...Code here...
  </code>
</pre>
```

If the code is correctly formatted, the script will replace
both elements with a DartPad iframe containing your specified code.

The DartPad defaults to the embed style and dark theme. To configure
this and other behavior, add one or more of the following options:

- `data-embed="false"`
  To use the standalone UI version of DartPad.
- `data-theme="light"`
  To use the light theme in the embed.
- `data-run="true"`
  To run the included code once loaded.
- `data-width="<CSS width>"`
  To specify the initial width of the injected iframe element.
- `data-height="<CSS height>"`
  To specify the initial height of the injected iframe element.

### Developing script

To work on the script itself, modify the code within `/web/inject_dartpad.dart`.
To compile the code to JavaScript, use the latest Dart SDK,
verify you have the latest dependencies (`dart pub upgrade`), and then
run `dart run tool/compile.dart`.
The updated file will be written to `/lib/inject_dartpad.js`.
