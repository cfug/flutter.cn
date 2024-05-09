// Copyright (c) 2024, the Dart project authors. Please see the AUTHORS file
// for details. All rights reserved. Use of this source code is governed by a
// BSD-style license that can be found in the LICENSE file.

import 'dart:io';

import 'package:path/path.dart' as path;

void main() {
  Process.runSync(
    Platform.resolvedExecutable,
    const ['run', 'webdev', 'build'],
  );

  final builtFile = File(path.join('build', 'inject_dartpad.dart.js'));
  builtFile.copySync(path.join('lib', 'inject_dartpad.js'));
}
