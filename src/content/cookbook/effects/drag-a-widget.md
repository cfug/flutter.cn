---
# title: Drag a UI element
title: 创建一个可拖放的 UI 组件
# description: How to implement a draggable UI element.
description: 如何实现一个可拖放的 UI 组件
js:
  - defer: true
    url: /assets/js/inject_dartpad.js
---

<?code-excerpt path-base="cookbook/effects/drag_a_widget"?>

Drag and drop is a common mobile app interaction.
As the user long presses (sometimes called _touch & hold_)
on a widget, another widget appears beneath the
user's finger, and the user drags the widget to a
final location and releases it.
In this recipe, you'll build a drag-and-drop interaction
where the user long presses on a choice of food,
and then drags that food to the picture of the customer who
is paying for it.

拖放是移动应用程序中的一种常见交互。
当用户长按（有时称为“触摸并按住”）某个 widget 时，
另一个 widget 会出现在用户的手指下方，
用户可以将该 widget 拖动到最终位置并释放。
在这个示例中，你将构建一个拖放交互，
用户可以长按一个食物选项，
然后将该食物拖动到正在为其付款的顾客图片上。

The following animation shows the app's behavior:

下面的动画展示了应用程序的行为：

![Ordering the food by dragging it to the person](/assets/images/docs/cookbook/effects/DragAUIElement.webp){:.site-mobile-screenshot}

This recipe begins with a prebuilt list of menu items and
a row of customers.
The first step is to recognize a long press
and display a draggable photo of a menu item.

本示例从一个预先构建的菜单项列表和一排顾客开始。
第一步是识别长按操作并显示一个可拖放的菜单项图片。

## Press and drag

## 按下并拖动

Flutter provides a widget called [`LongPressDraggable`][]
that provides the exact behavior that you need to begin
a drag-and-drop interaction. A `LongPressDraggable`
widget recognizes when a long press occurs and then 
displays a new widget near the user's finger.
As the user drags, the widget follows the user's finger.
`LongPressDraggable` gives you full control over the 
widget that the user drags.

Flutter 提供了一个名为 [`LongPressDraggable`][] 的 widget，
它提供了开始拖放交互所需的确切行为。
`LongPressDraggable` widget 能够识别长按操作，
然后在用户手指附近显示一个新 widget。
当用户拖动时，该 widget 会跟随用户的手指移动。
`LongPressDraggable` 让你完全控制用户拖动的 widget。

Each menu list item is displayed with a custom
`MenuListItem` widget.

每个菜单列表项都通过一个自定义的 `MenuListItem` widget 来显示。

<?code-excerpt "lib/main.dart (MenuListItem)" replace="/^child: //g;/^\),$/)/g"?>
```dart
MenuListItem(
  name: item.name,
  price: item.formattedTotalItemPrice,
  photoProvider: item.imageProvider,
)
```

Wrap the `MenuListItem` widget with a `LongPressDraggable` widget.

用 `LongPressDraggable` widget 包裹 `MenuLIstItem` widget。

<?code-excerpt "lib/main.dart (LongPressDraggable)" replace="/^return //g;/^\),$/)/g"?>
```dart
LongPressDraggable<Item>(
  data: item,
  dragAnchorStrategy: pointerDragAnchorStrategy,
  feedback: DraggingListItem(
    dragKey: _draggableKey,
    photoProvider: item.imageProvider,
  ),
  child: MenuListItem(
    name: item.name,
    price: item.formattedTotalItemPrice,
    photoProvider: item.imageProvider,
  ),
);
```

In this case, when the user long presses on the
`MenuListItem` widget, the `LongPressDraggable`
widget displays a `DraggingListItem`.
This `DraggingListItem` displays a photo of the
selected food item, centered beneath 
the user's finger.

在本例中，当用户长按 `MenuListItem` widget 时，
`LongPressDraggable` widget 会显示一个 `DraggingListItem`。
这个 `DraggingListItem` 会在用户手指下方居中显示所选的食物图片。

The `dragAnchorStrategy` property is set to
[`pointerDragAnchorStrategy`][].
This property value instructs `LongPressDraggable`
to base the `DraggableListItem`'s position on the 
user's finger. As the user moves a finger,
the `DraggableListItem` moves with it.

`dragAnchorStrategy` 属性设置为 [`pointerDragAnchorStrategy`][]。
这个属性的值指示 `LongPressDraggable` 
将 `DraggableListItem` 的位置基于用户的手指来定位。
当用户移动手指时，`DraggableListItem` 也会跟随移动。

Dragging and dropping is of little use if no information
is transmitted when the item is dropped.
For this reason, `LongPressDraggable` takes a `data` parameter. 
In this case, the type of `data` is `Item`,
which holds information about the 
food menu item that the user pressed on.

如果拖放操作在释放时没有传递任何信息，那么它几乎没有什么用处。
为此，`LongPressDraggable` 提供了一个 `data` 参数。
在本例中，`data` 的类型是 `Item`，
它包含了用户按下的菜单项的食物信息。

The `data` associated with a `LongPressDraggable`
is sent to a special widget called `DragTarget`,
where the user releases the drag gesture.
You'll implement the drop behavior next.

与 `LongPressDraggable` 相关联的 `data` 
会被传递到一个名为 `DragTarget` 的特殊 widget 上，
用户在此释放拖动手势。接下来你将实现拖放行为。

## Drop the draggable

## 放下拖动项

The user can drop a `LongPressDraggable` wherever they choose,
but dropping the draggable has no effect unless it's dropped
on top of a `DragTarget`. When the user drops a draggable on
top of a `DragTarget` widget, the `DragTarget` widget 
can either accept or reject the data from the draggable.

用户可以将 `LongPressDraggable` 放在任意位置，
但除非将其放在 `DragTarget` 之上，
否则拖放操作不会有任何效果。
当用户将一个可拖放的 widget 放在 `DragTarget` widget 上时，
`DragTarget` 可以选择接受或拒绝来自可拖放 widget 的数据。

In this recipe, the user should drop a menu item on a
`CustomerCart` widget to add the menu item to the user's cart.

在本示例中，用户应将菜单项拖放到 `CustomerCart` widget 上，
从而将菜单项添加到用户的购物车中。

<?code-excerpt "lib/main.dart (CustomerCart)" replace="/^return //g;/^\),$/)/g"?>
```dart
CustomerCart(
  hasItems: customer.items.isNotEmpty,
  highlighted: candidateItems.isNotEmpty,
  customer: customer,
);
```

Wrap the `CustomerCart` widget with a `DragTarget` widget.

用 `DragTarget` widget 包裹 `CustomCart` widget。

<?code-excerpt "lib/main.dart (DragTarget)" replace="/^child: //g;/^\),$/)/g"?>
```dart
DragTarget<Item>(
  builder: (context, candidateItems, rejectedItems) {
    return CustomerCart(
      hasItems: customer.items.isNotEmpty,
      highlighted: candidateItems.isNotEmpty,
      customer: customer,
    );
  },
  onAcceptWithDetails: (details) {
    _itemDroppedOnCustomerCart(item: details.data, customer: customer);
  },
)
```

The `DragTarget` displays your existing widget and
also coordinates with `LongPressDraggable` to recognize
when the user drags a draggable on top of the `DragTarget`.
The `DragTarget` also recognizes when the user drops
a draggable on top of the `DragTarget` widget.

`DragTarget` 显示你现有的 widget，
并与 `LongPressDraggable` 协调，
识别用户何时将可拖放的 widget 拖动到 `DragTarget` 之上。
同时，`DragTarget` 也能识别用户何时在其上方放下一个可拖放的 widget。

When the user drags a draggable on the `DragTarget` widget,
`candidateItems` contains the data items that the user is dragging.
This draggable allows you to change what your widget looks
like when the user is dragging over it. In this case,
the `Customer` widget turns red whenever any items are dragged above the 
`DragTarget` widget. The red visual appearance is configured with the 
`highlighted` property within the `CustomerCart` widget.

当用户将可一个可拖放的 widget 拖动到 `DragTarget` widget 上时，
`candidateItems` 包含用户正在拖动的数据项。
你可以根据用户拖动的情况更改 widget 的外观。
在本例中，`Customer` widget 在有项目拖动到 `DragTarget` widget 上方时会变成红色。
这个红色的外观是通过 `CustomerCart` widget 中的 `highlighted` 属性配置的。

When the user drops a draggable on the `DragTarget` widget,
the `onAcceptWithDetails` callback is invoked. This is when you get
to decide whether or not to accept the data that was dropped.
In this case, the item is always accepted and processed. 
You might choose to inspect the incoming item to make a
different decision. 

当用户将一个可拖放的 widget 放在 `DragTarget` widget 上时，
会调用 `onAcceptWithDetails` 回调。这时你可以决定是否接受拖放的数据。
在本例中，数据项总是会被接受和处理。
你也可以选择检查传入的数据项，以做出不同的决定。

Notice that the type of item dropped on `DragTarget`
must match the type of the item dragged from `LongPressDraggable`.
If the types are not compatible, then 
the `onAcceptWithDetails` method isn't invoked.

注意，拖放到 `DragTarget` 上的数据项类型必须与从 `LongPressDraggable` 拖出的数据项类型匹配。
如果类型不兼容，`onAcceptWithDetails` 方法将不会被调用。

With a `DragTarget` widget configured to accept your
desired data, you can now transmit data from one part
of your UI to another by dragging and dropping.

通过配置 `DragTarget` widget 来接受你所需的数据，
现在你可以通过拖放在 UI 的不同部分之间传递数据。

In the next step,
you update the customer's cart with the dropped menu item.

在下一步中，你将更新顾客的购物车，将放下的菜单项添加进去。

## Add a menu item to a cart

## 将菜单项添加到购物车

Each customer is represented by a `Customer` object,
which maintains a cart of items and a price total.

每位顾客由一个 `Customer` 对象表示，该对象维护一个物品购物车和总价格。

<?code-excerpt "lib/main.dart (CustomerClass)"?>
```dart
class Customer {
  Customer({required this.name, required this.imageProvider, List<Item>? items})
    : items = items ?? [];

  final String name;
  final ImageProvider imageProvider;
  final List<Item> items;

  String get formattedTotalItemPrice {
    final totalPriceCents = items.fold<int>(
      0,
      (prev, item) => prev + item.totalPriceCents,
    );
    return '\$${(totalPriceCents / 100.0).toStringAsFixed(2)}';
  }
}
```

The `CustomerCart` widget displays the customer's photo,
name, total, and item count based on a `Customer` instance.

`CustomerCart` widget 根据一个 `Customer` 实例显示顾客的照片、姓名、总价和物品数量。

To update a customer's cart when a menu item is dropped,
add the dropped item to the associated `Customer` object.

要在菜单项被拖放时更新顾客的购物车，需要将放下的物品添加到关联的 `Customer` 对象中。

<?code-excerpt "lib/main.dart (AddCart)"?>
```dart
void _itemDroppedOnCustomerCart({
  required Item item,
  required Customer customer,
}) {
  setState(() {
    customer.items.add(item);
  });
}
```

The `_itemDroppedOnCustomerCart` method is invoked in
`onAcceptWithDetails()` when the user drops a menu item on a
`CustomerCart` widget. By adding the dropped item to the 
`customer` object, and invoking `setState()` to cause a
layout update, the UI refreshes with the new customer's
price total and item count.

当用户将菜单项拖放到 `CustomerCart` widget 上时，
`onAcceptWithDetails()` 中会调用 `_itemDroppedOnCustomerCart` 方法。
通过将放下的物品添加到 `customer` 对象中，
并调用 `setState()` 来触发布局更新，
UI 将会刷新，显示新的顾客总价和物品数量。

Congratulations! You have a drag-and-drop interaction
that adds food items to a customer's shopping cart.

恭喜！你现在已经实现了一个将食物项添加到顾客购物车的拖放交互。

## Interactive example

## 交互示例

Run the app:

运行应用程序

* Scroll through the food items.

  浏览食物项列表。

* Press and hold on one with your
  finger or click and hold with the
  mouse.

  用手指长按其中一个食物项，或用鼠标点击并按住。

* While holding, the food item's image
  will appear above the list.

  按住时，食物项的图片将出现在列表上方。

* Drag the image and drop it on one of the
  people at the bottom of the screen.
  The text under the image updates to
  reflect the charge for that person.
  You can continue to add food items
  and watch the charges accumulate.

  将图片拖动并放到屏幕底部的某个人身上。
  图片下方的文本会更新，显示该人的费用。
  你可以继续添加食物项，观察费用的累计情况。

<!-- Start DartPad -->

<?code-excerpt "lib/main.dart"?>
```dartpad title="Flutter drag a widget hands-on example in DartPad" run="true"
import 'package:flutter/material.dart';

void main() {
  runApp(
    const MaterialApp(
      home: ExampleDragAndDrop(),
      debugShowCheckedModeBanner: false,
    ),
  );
}

const List<Item> _items = [
  Item(
    name: 'Spinach Pizza',
    totalPriceCents: 1299,
    uid: '1',
    imageProvider: NetworkImage(
      'https://docs.flutter.dev'
      '/cookbook/img-files/effects/split-check/Food1.jpg',
    ),
  ),
  Item(
    name: 'Veggie Delight',
    totalPriceCents: 799,
    uid: '2',
    imageProvider: NetworkImage(
      'https://docs.flutter.dev'
      '/cookbook/img-files/effects/split-check/Food2.jpg',
    ),
  ),
  Item(
    name: 'Chicken Parmesan',
    totalPriceCents: 1499,
    uid: '3',
    imageProvider: NetworkImage(
      'https://docs.flutter.dev'
      '/cookbook/img-files/effects/split-check/Food3.jpg',
    ),
  ),
];

@immutable
class ExampleDragAndDrop extends StatefulWidget {
  const ExampleDragAndDrop({super.key});

  @override
  State<ExampleDragAndDrop> createState() => _ExampleDragAndDropState();
}

class _ExampleDragAndDropState extends State<ExampleDragAndDrop>
    with TickerProviderStateMixin {
  final List<Customer> _people = [
    Customer(
      name: 'Makayla',
      imageProvider: const NetworkImage(
        'https://docs.flutter.dev'
        '/cookbook/img-files/effects/split-check/Avatar1.jpg',
      ),
    ),
    Customer(
      name: 'Nathan',
      imageProvider: const NetworkImage(
        'https://docs.flutter.dev'
        '/cookbook/img-files/effects/split-check/Avatar2.jpg',
      ),
    ),
    Customer(
      name: 'Emilio',
      imageProvider: const NetworkImage(
        'https://docs.flutter.dev'
        '/cookbook/img-files/effects/split-check/Avatar3.jpg',
      ),
    ),
  ];

  final GlobalKey _draggableKey = GlobalKey();

  void _itemDroppedOnCustomerCart({
    required Item item,
    required Customer customer,
  }) {
    setState(() {
      customer.items.add(item);
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFFF7F7F7),
      appBar: _buildAppBar(),
      body: _buildContent(),
    );
  }

  PreferredSizeWidget _buildAppBar() {
    return AppBar(
      iconTheme: const IconThemeData(color: Color(0xFFF64209)),
      title: Text(
        'Order Food',
        style: Theme.of(context).textTheme.headlineMedium?.copyWith(
          fontSize: 36,
          color: const Color(0xFFF64209),
          fontWeight: FontWeight.bold,
        ),
      ),
      backgroundColor: const Color(0xFFF7F7F7),
      elevation: 0,
    );
  }

  Widget _buildContent() {
    return Stack(
      children: [
        SafeArea(
          child: Column(
            children: [
              Expanded(child: _buildMenuList()),
              _buildPeopleRow(),
            ],
          ),
        ),
      ],
    );
  }

  Widget _buildMenuList() {
    return ListView.separated(
      padding: const EdgeInsets.all(16),
      itemCount: _items.length,
      separatorBuilder: (context, index) {
        return const SizedBox(height: 12);
      },
      itemBuilder: (context, index) {
        final item = _items[index];
        return _buildMenuItem(item: item);
      },
    );
  }

  Widget _buildMenuItem({required Item item}) {
    return LongPressDraggable<Item>(
      data: item,
      dragAnchorStrategy: pointerDragAnchorStrategy,
      feedback: DraggingListItem(
        dragKey: _draggableKey,
        photoProvider: item.imageProvider,
      ),
      child: MenuListItem(
        name: item.name,
        price: item.formattedTotalItemPrice,
        photoProvider: item.imageProvider,
      ),
    );
  }

  Widget _buildPeopleRow() {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 20),
      child: Row(children: _people.map(_buildPersonWithDropZone).toList()),
    );
  }

  Widget _buildPersonWithDropZone(Customer customer) {
    return Expanded(
      child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 6),
        child: DragTarget<Item>(
          builder: (context, candidateItems, rejectedItems) {
            return CustomerCart(
              hasItems: customer.items.isNotEmpty,
              highlighted: candidateItems.isNotEmpty,
              customer: customer,
            );
          },
          onAcceptWithDetails: (details) {
            _itemDroppedOnCustomerCart(item: details.data, customer: customer);
          },
        ),
      ),
    );
  }
}

class CustomerCart extends StatelessWidget {
  const CustomerCart({
    super.key,
    required this.customer,
    this.highlighted = false,
    this.hasItems = false,
  });

  final Customer customer;
  final bool highlighted;
  final bool hasItems;

  @override
  Widget build(BuildContext context) {
    final textColor = highlighted ? Colors.white : Colors.black;

    return Transform.scale(
      scale: highlighted ? 1.075 : 1.0,
      child: Material(
        elevation: highlighted ? 8 : 4,
        borderRadius: BorderRadius.circular(22),
        color: highlighted ? const Color(0xFFF64209) : Colors.white,
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 24),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              ClipOval(
                child: SizedBox(
                  width: 46,
                  height: 46,
                  child: Image(
                    image: customer.imageProvider,
                    fit: BoxFit.cover,
                  ),
                ),
              ),
              const SizedBox(height: 8),
              Text(
                customer.name,
                style: Theme.of(context).textTheme.titleMedium?.copyWith(
                  color: textColor,
                  fontWeight: hasItems ? FontWeight.normal : FontWeight.bold,
                ),
              ),
              Visibility(
                visible: hasItems,
                maintainState: true,
                maintainAnimation: true,
                maintainSize: true,
                child: Column(
                  children: [
                    const SizedBox(height: 4),
                    Text(
                      customer.formattedTotalItemPrice,
                      style: Theme.of(context).textTheme.bodySmall!.copyWith(
                        color: textColor,
                        fontSize: 16,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    const SizedBox(height: 4),
                    Text(
                      '${customer.items.length} item${customer.items.length != 1 ? 's' : ''}',
                      style: Theme.of(context).textTheme.titleMedium!.copyWith(
                        color: textColor,
                        fontSize: 12,
                      ),
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class MenuListItem extends StatelessWidget {
  const MenuListItem({
    super.key,
    this.name = '',
    this.price = '',
    required this.photoProvider,
    this.isDepressed = false,
  });

  final String name;
  final String price;
  final ImageProvider photoProvider;
  final bool isDepressed;

  @override
  Widget build(BuildContext context) {
    return Material(
      elevation: 12,
      borderRadius: BorderRadius.circular(20),
      child: Padding(
        padding: const EdgeInsets.all(12),
        child: Row(
          mainAxisSize: MainAxisSize.max,
          children: [
            ClipRRect(
              borderRadius: BorderRadius.circular(12),
              child: SizedBox(
                width: 120,
                height: 120,
                child: Center(
                  child: AnimatedContainer(
                    duration: const Duration(milliseconds: 100),
                    curve: Curves.easeInOut,
                    height: isDepressed ? 115 : 120,
                    width: isDepressed ? 115 : 120,
                    child: Image(image: photoProvider, fit: BoxFit.cover),
                  ),
                ),
              ),
            ),
            const SizedBox(width: 30),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    name,
                    style: Theme.of(
                      context,
                    ).textTheme.titleMedium?.copyWith(fontSize: 18),
                  ),
                  const SizedBox(height: 10),
                  Text(
                    price,
                    style: Theme.of(context).textTheme.titleMedium?.copyWith(
                      fontWeight: FontWeight.bold,
                      fontSize: 18,
                    ),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class DraggingListItem extends StatelessWidget {
  const DraggingListItem({
    super.key,
    required this.dragKey,
    required this.photoProvider,
  });

  final GlobalKey dragKey;
  final ImageProvider photoProvider;

  @override
  Widget build(BuildContext context) {
    return FractionalTranslation(
      translation: const Offset(-0.5, -0.5),
      child: ClipRRect(
        key: dragKey,
        borderRadius: BorderRadius.circular(12),
        child: SizedBox(
          height: 150,
          width: 150,
          child: Opacity(
            opacity: 0.85,
            child: Image(image: photoProvider, fit: BoxFit.cover),
          ),
        ),
      ),
    );
  }
}

@immutable
class Item {
  const Item({
    required this.totalPriceCents,
    required this.name,
    required this.uid,
    required this.imageProvider,
  });
  final int totalPriceCents;
  final String name;
  final String uid;
  final ImageProvider imageProvider;
  String get formattedTotalItemPrice =>
      '\$${(totalPriceCents / 100.0).toStringAsFixed(2)}';
}

class Customer {
  Customer({required this.name, required this.imageProvider, List<Item>? items})
    : items = items ?? [];

  final String name;
  final ImageProvider imageProvider;
  final List<Item> items;

  String get formattedTotalItemPrice {
    final totalPriceCents = items.fold<int>(
      0,
      (prev, item) => prev + item.totalPriceCents,
    );
    return '\$${(totalPriceCents / 100.0).toStringAsFixed(2)}';
  }
}
```

[`pointerDragAnchorStrategy`]: {{site.api}}/flutter/widgets/pointerDragAnchorStrategy.html
[`LongPressDraggable`]: {{site.api}}/flutter/widgets/LongPressDraggable-class.html
