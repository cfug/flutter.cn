import 'package:flextras/flextras.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

import '../global/device_type.dart';

class FocusExamplesPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: EdgeInsets.all(Insets.extraLarge),
      child: Center(
        child: SeparatedColumn(
          separatorBuilder: () => SizedBox(height: 5),
          mainAxisSize: MainAxisSize.min,
          children: [
            // Basic widget that can accept traversal, built with FocusableActionDetector
            Text('BasicActionDetector:'),
            BasicActionDetector(),
            SizedBox(height: 10),

            // Clickable widget that can accept traversal, built with FocusableActionDetector
            Text('AdvancedActionDetector:'),
            ClickableActionDetector(),
            SizedBox(height: 10),

            // A totally custom control, built by stacking together various widgets
            Text('CustomControl:'),
            ClickableControl(),
            _TextListener(),
          ],
        ),
      ),
    );
  }
}

class _TextListener extends StatefulWidget {
  @override
  State<_TextListener> createState() => __TextListenerState();
}

class __TextListenerState extends State<_TextListener> {
  FocusNode focusNode = FocusNode();

  // #docregion FocusRawKeyboardListener
  @override
  Widget build(BuildContext context) {
    return Focus(
      onKey: (node, event) {
        if (event is RawKeyDownEvent) {
          print(event.logicalKey);
        }
        return KeyEventResult.ignored;
      },
      child: ConstrainedBox(
        constraints: BoxConstraints(maxWidth: 400),
        child: TextField(
          decoration: InputDecoration(
            border: OutlineInputBorder(),
          ),
        ),
      ),
    );
  }
}
// #enddocregion FocusRawKeyboardListener

class BasicActionDetector extends StatefulWidget {
  @override
  State<BasicActionDetector> createState() => _BasicActionDetectorState();
}

// #docregion _BasicActionDetectorState
class _BasicActionDetectorState extends State<BasicActionDetector> {
  bool _hasFocus = false;
  @override
  Widget build(BuildContext context) {
    return FocusableActionDetector(
      onFocusChange: (value) => setState(() => _hasFocus = value),
      actions: <Type, Action<Intent>>{
        ActivateIntent: CallbackAction<Intent>(onInvoke: (intent) {
          print('Enter or Space was pressed!');
          return null;
        }),
      },
      child: Stack(
        clipBehavior: Clip.none,
        children: [
          FlutterLogo(size: 100),
          // Position focus in the negative margin for a cool effect
          if (_hasFocus)
            Positioned(
                left: -4,
                top: -4,
                bottom: -4,
                right: -4,
                child: _roundedBorder())
        ],
      ),
    );
  }
}
// #enddocregion _BasicActionDetectorState

/// Uses [FocusableActionDetector]
class ClickableActionDetector extends StatefulWidget {
  @override
  _ClickableActionDetectorState createState() =>
      _ClickableActionDetectorState();
}

class _ClickableActionDetectorState extends State<ClickableActionDetector> {
  bool _hasFocus = false;
  late FocusNode _focusNode = FocusNode();

  @override
  Widget build(BuildContext context) {
    return FocusableActionDetector(
      focusNode: _focusNode,
      mouseCursor: SystemMouseCursors.click,
      onFocusChange: (value) => setState(() => _hasFocus = value),
      actions: <Type, Action<Intent>>{
        ActivateIntent: CallbackAction<Intent>(onInvoke: (intent) {
          _submit();
          return null;
        }),
      },
      child: GestureDetector(
        onTap: () {
          _focusNode.requestFocus();
          _submit();
        },
        child: Logo(showBorder: _hasFocus),
      ),
    );
  }

  void _submit() => print('Submit!');
}

// Example of a custom focus widget from scratch
class ClickableControl extends StatelessWidget {
  @override
  Widget build(BuildContext _) {
    return Focus(
      // Process keyboard event
      onKey: _handleKeyDown,
      child: Builder(
        builder: (context) {
          // Check whether we have focus
          bool hasFocus = Focus.of(context).hasFocus;
          // #docregion MouseRegion
          // Show hand cursor
          return MouseRegion(
            cursor: SystemMouseCursors.click,
            // Request focus when clicked
            child: GestureDetector(
              onTap: () {
                Focus.of(context).requestFocus();
                _submit();
              },
              child: Logo(showBorder: hasFocus),
            ),
          );
          // #enddocregion MouseRegion
        },
      ),
    );
  }

  void _submit() => print('Submit!');

  KeyEventResult _handleKeyDown(FocusNode node, RawKeyEvent event) {
    if (event is RawKeyDownEvent &&
        [LogicalKeyboardKey.enter, LogicalKeyboardKey.space]
            .contains(event.logicalKey)) {
      _submit();
      return KeyEventResult.handled;
    }
    return KeyEventResult.ignored;
  }
}

class Logo extends StatelessWidget {
  const Logo({super.key, required this.showBorder});
  final bool showBorder;

  @override
  Widget build(BuildContext context) {
    return Stack(
      clipBehavior: Clip.none,
      children: [
        // Content
        FlutterLogo(size: 100),
        // Focus effect:
        if (showBorder)
          Positioned(
              left: 0, top: -4, bottom: -4, right: -4, child: _roundedBorder())
      ],
    );
  }
}

Widget _roundedBorder() => Container(
    decoration: BoxDecoration(
        border: Border.all(color: Colors.orange),
        borderRadius: BorderRadius.circular(6)));

class MyFocusTraversalWidget extends StatelessWidget {
  Widget MyFormWithMultipleColumnsAndRows() {
    return Form(
      child: Container(),
    );
  }

  Widget SubmitButton() {
    return ElevatedButton(
      onPressed: () => {DoNothingAction /* Submit */},
      child: Text('Submit'),
    );
  }

  @override
  build(BuildContext context) {
    // #docregion FocusTraversalGroup
    return Column(children: [
      FocusTraversalGroup(
        child: MyFormWithMultipleColumnsAndRows(),
      ),
      SubmitButton(),
    ]);
    // #enddocregion FocusTraversalGroup
  }
}

class MyHoverWidget extends StatefulWidget {
  MyHoverWidget({super.key, required this.title});

  final String title;

  @override
  _MyHoverWidgetState createState() => _MyHoverWidgetState();
}

class _MyHoverWidgetState extends State<MyHoverWidget> {
  bool _isMouseOver = false;

  @override
  Widget build(BuildContext context) {
    // #docregion MouseOver
    return MouseRegion(
      onEnter: (_) => setState(() => _isMouseOver = true),
      onExit: (_) => setState(() => _isMouseOver = false),
      onHover: (e) => print(e.localPosition),
      child: Container(
        height: 500,
        color: _isMouseOver ? Colors.blue : Colors.black,
      ),
    );
    // #enddocregion MouseOver
  }
}
