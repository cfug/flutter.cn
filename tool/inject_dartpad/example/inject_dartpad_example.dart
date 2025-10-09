import 'package:inject_dartpad/inject_dartpad.dart';
import 'package:web/web.dart' as web;

void main() async {
  // Create the embedded DartPad instance manager.
  final dartPad = EmbeddedDartPad.create(
    iframeId: 'my-dartpad',
    theme: DartPadTheme.light,
  );

  // Initialize the embedded DartPad.
  await dartPad.initialize(
    onElementCreated: (iframe) {
      // Add any extra styles or attributes to the created iframe.
      iframe.style.height = '560';

      // Add the iframe to the document body.
      // This is necessary for the embed to load.
      web.document.body!.append(iframe);
    },
  );

  // After awaiting initialization, you can update the code in the DartPad.
  dartPad.updateCode(r'''
void main() {
  print('Hello, I am Dash!');
}''');
}
