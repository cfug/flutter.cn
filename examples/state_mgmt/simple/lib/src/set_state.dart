import 'package:flutter/material.dart';

/// This is here so we don't need to show Scaffold and AppBar in the snippet.
/// We need Scaffold+AppBar so that the smoke test can get out of this page.
class HelperScaffoldWrapper extends StatelessWidget {
  const HelperScaffoldWrapper({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(),
      body: const MyHomepage(),
    );
  }
}

// #docregion Ephemeral
class MyHomepage extends StatefulWidget {
  const MyHomepage({Key? key}) : super(key: key);

  @override
  _MyHomepageState createState() => _MyHomepageState();
}

class _MyHomepageState extends State<MyHomepage> {
  int _index = 0;

  @override
  Widget build(BuildContext context) {
    return BottomNavigationBar(
      currentIndex: _index,
      onTap: (newIndex) {
        setState(() {
          _index = newIndex;
        });
      },
      // #enddocregion Ephemeral
      items: const [
        BottomNavigationBarItem(label: 'abc', icon: Icon(Icons.title)),
        BottomNavigationBarItem(label: 'def', icon: Icon(Icons.map)),
      ],
      // #docregion Ephemeral
    );
  }
}
// #enddocregion Ephemeral
