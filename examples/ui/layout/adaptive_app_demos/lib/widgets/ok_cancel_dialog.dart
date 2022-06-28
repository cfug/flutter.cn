import 'package:flutter/material.dart';

import '../global/device_type.dart';

class OkCancelDialog extends StatelessWidget {
  const OkCancelDialog({super.key, required this.message});
  final String message;

  @override
  Widget build(BuildContext context) {
    return Dialog(
      child: ConstrainedBox(
        constraints: BoxConstraints(maxWidth: 400),
        child: Padding(
          padding: EdgeInsets.all(Insets.large),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              Text(message),
              SizedBox(height: Insets.large),
              _OkCancelButtons(),
            ],
          ),
        ),
      ),
    );
  }
}

class _OkCancelButtons extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    // #docregion RowTextDirection
    TextDirection btnDirection =
        DeviceType.isWindows ? TextDirection.rtl : TextDirection.ltr;
    return Row(
      children: [
        Spacer(),
        Row(
          textDirection: btnDirection,
          children: [
            DialogButton(
                label: 'Cancel',
                onPressed: () => Navigator.pop(context, false)),
            DialogButton(
                label: 'Ok', onPressed: () => Navigator.pop(context, true)),
          ],
        ),
      ],
    );
    // #enddocregion RowTextDirection
  }
}

class DialogButton extends StatelessWidget {
  const DialogButton({super.key, required this.onPressed, required this.label});
  final VoidCallback onPressed;
  final String label;

  @override
  Widget build(BuildContext context) {
    return TextButton(
        onPressed: onPressed,
        child: Padding(
          padding: EdgeInsets.symmetric(horizontal: 16, vertical: 8),
          child: Text(label),
        ));
  }
}
