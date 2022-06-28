// #docregion InitializeSDK
import 'package:flutter/widgets.dart';
import 'package:sentry_flutter/sentry_flutter.dart';

Future<void> main() async {
  await SentryFlutter.init(
    (options) => options.dsn = 'https://example@sentry.io/example',
    appRunner: () => runApp(const MyApp()),
  );
}
// #enddocregion InitializeSDK

Future<void> captureErrors() async {
  try {
    // Do something
  } catch (exception, stackTrace) {
    // #docregion CaptureException
    await Sentry.captureException(exception, stackTrace: stackTrace);
    // #enddocregion CaptureException
  }
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return Container();
  }
}
