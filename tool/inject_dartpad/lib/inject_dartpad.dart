// Copyright (c) 2025, the Dart project authors. Please see the AUTHORS file
// for details. All rights reserved. Use of this source code is governed by a
// BSD-style license that can be found in the LICENSE file.

import 'dart:async';
import 'dart:js_interop';

import 'package:web/web.dart' as web;

/// An iframe-embedded DartPad that can be injected into a web page,
/// then have its source code updated.
///
/// Example usage:
///
/// ```dart
/// import 'package:inject_dartpad/inject_dartpad.dart';
/// import 'package:web/web.dart' as web;
///
/// void main() async {
///   final dartPad = EmbeddedDartPad.create(
///     iframeId: 'my-dartpad',
///     theme: DartPadTheme.light,
///   );
///
///   await dartPad.initialize(
///     onElementCreated: (iframe) {
///       iframe.style.height = '560';
///
///       web.document.body!.append(iframe);
///     },
///   );
///
///   dartPad.updateCode('''
/// void main() {
///   print("Hello, I'm Dash!");
/// }''');
/// }
/// ```
final class EmbeddedDartPad {
  /// The unique identifier that's used to identify the created DartPad iframe.
  ///
  /// This ID is used both as the HTML element `id` and
  /// as the iframe's `name` attribute for message targeting.
  final String iframeId;

  /// The full URL of the DartPad iframe including
  /// all path segments and query parameters.
  final String _iframeUrl;

  /// Tracks the initialization state of the embedded DartPad.
  ///
  /// Completes when the DartPad iframe has loaded and
  /// sent a 'ready' message indicating it can receive code updates.
  final Completer<void> _initializedCompleter = Completer();

  /// Creates an embedded DartPad instance with
  /// the specified [iframeId] and [iframeUrl].
  EmbeddedDartPad._({required this.iframeId, required String iframeUrl})
    : _iframeUrl = iframeUrl;

  /// Creates a new embedded DartPad element with the specified configuration.
  ///
  /// Once created, the DartPad must be initialized by
  /// calling and awaiting [initialize].
  ///
  /// The [iframeId] is used to identify the created DartPad iframe.
  /// It must be unique within the document and a valid HTML element ID.
  ///
  /// The [scheme] and [host] are used to construct the DartPad iframe URL.
  /// [scheme] defaults to 'https' and [host] defaults to 'dartpad.dev'.
  ///
  /// To control the appearance of the embedded DartPad,
  /// you can switch to the [embedLayout] and choose a specific [theme].
  factory EmbeddedDartPad.create({
    required String iframeId,
    String? scheme,
    String? host,
    bool? embedLayout,
    DartPadTheme? theme = DartPadTheme.auto,
  }) {
    final dartPadUrl = Uri(
      scheme: scheme ?? 'https',
      host: host ?? 'dartpad.cn',
      queryParameters: <String, String>{
        if (embedLayout ?? true) 'embed': '$embedLayout',
        if (theme != DartPadTheme.auto) 'theme': '$theme',
      },
    ).toString();

    return EmbeddedDartPad._(iframeId: iframeId, iframeUrl: dartPadUrl);
  }

  /// Creates and initializes the embedded DartPad iframe.
  ///
  /// Must be called and awaited before interacting with this instance,
  /// such as updating the DartPad editor's current source code.
  ///
  /// The created iframe is passed to the [onElementCreated] callback,
  /// which should be used to add the iframe to the document and
  /// further configure its attributes, such as classes and size.
  ///
  /// For example, if you want to embed the DartPad in
  /// a container with an ID of 'dartpad-container':
  ///
  /// ```dart
  /// await dartPad.initialize(
  ///   onElementCreated: (iframe) {
  ///     document.getElementById('dartpad-container')!.append(iframe);
  ///   },
  /// );
  /// ```
  Future<void> initialize({
    required void Function(web.HTMLIFrameElement iframe) onElementCreated,
  }) async {
    if (_initialized) return;

    // Start listening for the 'ready' message from the embedded DartPad.
    late final JSExportedDartFunction readyHandler;
    readyHandler = (web.MessageEvent event) {
      if (event.data case _EmbedReadyMessage(type: 'ready', :final sender?)) {
        // Verify the message is sent from the corresponding iframe,
        // in case there are multiple DartPads being embedded at the same time.
        if (sender != iframeId) {
          return;
        }

        web.window.removeEventListener('message', readyHandler);
        if (!_initialized) {
          // Signal to the caller that the DartPad is ready
          // for Dart code to be injected.
          _initializedCompleter.complete();
        }
      }
    }.toJS;

    web.window.addEventListener('message', readyHandler);

    final iframe = web.HTMLIFrameElement()
      ..src = _iframeUrl
      ..id = iframeId
      ..name = iframeId
      ..loading = 'lazy'
      ..allow = 'clipboard-write';

    // Give the caller a chance to modify other attributes of the iframe and
    // attach it to their desired location in the document.
    onElementCreated(iframe);

    await _initializedCompleter.future;
  }

  /// Updates the source code displayed in the embedded DartPad's editor
  /// with the specified Dart [code].
  ///
  /// The [code] should generally be valid Dart code for
  /// the latest stable versions of Dart and Flutter.
  ///
  /// Should only be called after [initialize] has completed,
  /// otherwise throws.
  void updateCode(String code) {
    if (!_initialized) {
      throw StateError(
        'EmbeddedDartPad.initialize must be called and awaited '
        'before updating the embedded source code.',
      );
    }

    _underlyingIframe.contentWindowCrossOrigin?.postMessage(
      _MessageToDartPad.updateSource(code),
      _anyTargetOrigin,
    );
  }

  /// Whether the DartPad instance has been successfully initialized.
  ///
  /// Returns `true` if [initialize] has been called and awaited,
  /// and the embedded DartPad has signaled that it's ready to receive messages.
  bool get _initialized => _initializedCompleter.isCompleted;

  /// Retrieves the iframe element from the current page by
  /// searching with its ID of [iframeId].
  ///
  /// If the iframe can't be found, the method throws.
  /// The often means it wasn't added to the DOM or was removed.
  web.HTMLIFrameElement get _underlyingIframe {
    final frame =
        web.document.getElementById(iframeId) as web.HTMLIFrameElement?;
    if (frame == null) {
      throw StateError(
        'Failed to find iframe with an '
        'id of $iframeId in the document. '
        'Have you added the iframe to the document?',
      );
    }
    return frame;
  }
}

/// The themes available for an embedded DartPad instance.
enum DartPadTheme {
  /// Light theme with a bright background.
  light,

  /// Dark theme with a dark background.
  dark,

  /// Theme that relies on DartPad's built-in theme handling.
  auto,
}

/// The target origin to be used for cross-frame messages sent to
/// the DartPad iframe's content window.
///
/// Uses '*' to enable communication with DartPad instances
/// regardless of their actual origin.
final JSString _anyTargetOrigin = '*'.toJS;

/// Represents a ready message received from the DartPad iframe.
///
/// Sent by DartPad when it has finished loading and is ready to
/// receive code updates by sending it a cross-frame message.
extension type _EmbedReadyMessage._(JSObject _) {
  /// The message type, which should be 'ready' for initialization messages.
  external String? get type;

  /// The sender ID to identify which DartPad instance sent the message.
  external String? get sender;
}

/// Represents DartPad's expected format for receiving cross-frame messages
/// from its parent window, usually the [EmbeddedDartPad] host.
@anonymous
extension type _MessageToDartPad._(JSObject _) implements JSObject {
  /// Creates a JavaScript object with the expected structure for
  /// updating the source code in an embedded DartPad's editor.
  external factory _MessageToDartPad._updateSource({
    required String sourceCode,
    String type,
  });

  /// Creates a message to update that can be sent to
  /// update the source code in an embedded DartPad instance.
  ///
  /// The [sourceCode] should generally be valid Dart code for
  /// the latest stable versions of Dart and Flutter.
  factory _MessageToDartPad.updateSource(String sourceCode) =>
      _MessageToDartPad._updateSource(
        sourceCode: sourceCode,
        type: 'sourceCode',
      );
}
