# Flutter 中文翻译术语表

> 翻译时必须参照本表，确保术语统一。
> 规则：类名/API 名保持英文不翻译，概念性术语翻译为中文。

---

## 不翻译（保持英文）

以下术语在中文语境中直接使用英文，不翻译：

### 框架与平台名
| 英文 | 说明 |
|------|------|
| Flutter | 框架名 |
| Dart | 语言名 |
| Material / Material Design / Material 3 | 设计语言 |
| Cupertino | iOS 风格设计语言 |
| Impeller | 渲染引擎名 |
| Skia | 渲染引擎名 |
| pub / pub.dev | 包管理器 |

### Widget 类名（所有类名不翻译）
| 英文 | 说明 |
|------|------|
| Widget | 核心概念，不译为"组件" |
| StatelessWidget | 无状态 widget 类 |
| StatefulWidget | 有状态 widget 类 |
| Container | widget 类名 |
| Scaffold | widget 类名 |
| AppBar | widget 类名 |
| Row / Column | widget 类名 |
| Text | widget 类名 |
| Icon | widget 类名 |
| ListView / GridView | widget 类名 |
| SizedBox | widget 类名 |
| Expanded / Flexible | widget 类名 |
| Center | widget 类名 |
| Stack / Positioned | widget 类名 |
| InheritedWidget | widget 类名 |
| AnimatedContainer | widget 类名（所有 Animated* 同理）|

### 方法与属性名
| 英文 | 说明 |
|------|------|
| build() | 构建方法 |
| setState() | 状态更新方法 |
| initState() | 生命周期方法 |
| dispose() | 生命周期方法 |
| didUpdateWidget() | 生命周期方法 |
| runApp() | 入口方法 |
| Navigator.push() / pop() | 导航方法 |

### 工具与包名
| 英文 | 说明 |
|------|------|
| DevTools | 开发者工具 |
| hot reload | 可译为"热重载" |
| hot restart | 可译为"热重启" |
| Provider | 状态管理包名 |
| Riverpod | 状态管理包名 |
| Bloc | 状态管理包名 |
| pubspec.yaml | 配置文件名 |

---

## 翻译对照表

以下术语有统一的中文翻译：

### 核心概念
| 英文 | 中文 | 备注 |
|------|------|------|
| widget | widget | **不译为"组件"**，直接用英文小写 |
| widget tree | widget 树 | |
| element tree | element 树 | |
| render tree | 渲染树 | |
| state | 状态 | |
| stateful widget | 有状态的 widget | 描述性用法 |
| stateless widget | 无状态的 widget | 描述性用法 |
| build method | build 方法 | |
| context / BuildContext | context / 上下文 | 视语境选用 |
| key | key / 键值 | 视语境选用 |
| constructor | 构造函数 | |
| callback | 回调 / 回调函数 | |
| mixin | mixin | 不翻译 |

### 布局相关
| 英文 | 中文 | 备注 |
|------|------|------|
| layout | 布局 | |
| constraints | 约束 | |
| padding | 内边距 | 或直接用 padding |
| margin | 外边距 | |
| alignment | 对齐 | |
| flex | 弹性 | |
| scrolling | 滚动 | |
| sliver | sliver | **不翻译** |
| viewport | 视口 | |
| overflow | 溢出 | |
| responsive | 响应式 | |
| adaptive | 自适应 | |

### 状态管理
| 英文 | 中文 | 备注 |
|------|------|------|
| state management | 状态管理 | |
| ephemeral state | 短时状态 / 临时状态 | |
| app state | 应用状态 | |
| declarative | 声明式 | |
| imperative | 命令式 | |
| immutable | 不可变的 | |
| reactive | 响应式的 | |

### 导航
| 英文 | 中文 | 备注 |
|------|------|------|
| navigation | 导航 | |
| route | 路由 | |
| push | push / 推入 | 视语境选用 |
| pop | pop / 弹出 | 视语境选用 |
| deep linking | 深层链接 | |
| named route | 命名路由 | |

### 动画
| 英文 | 中文 | 备注 |
|------|------|------|
| animation | 动画 | |
| implicit animation | 隐式动画 | |
| explicit animation | 显式动画 | |
| tween | 补间 | |
| curve | 曲线 | |
| animation controller | 动画控制器 | |
| staggered animation | 交织动画 | |
| hero animation | Hero 动画 | |
| transition | 过渡 / 转场 | 视语境选用 |

### 构建与工具
| 英文 | 中文 | 备注 |
|------|------|------|
| build | 构建 | |
| compile | 编译 | |
| debug mode | 调试模式 | |
| release mode | 发布模式 | |
| profile mode | 性能分析模式 | |
| hot reload | 热重载 | |
| hot restart | 热重启 | |
| tree shaking | tree shaking / 摇树优化 | |

### 性能
| 英文 | 中文 | 备注 |
|------|------|------|
| jank | 卡顿 | |
| frame | 帧 | |
| rasterization | 光栅化 | |
| rendering | 渲染 | |
| performance | 性能 | |

### 测试
| 英文 | 中文 | 备注 |
|------|------|------|
| unit test | 单元测试 | |
| widget test | widget 测试 | |
| integration test | 集成测试 | |
| golden test | 黄金测试 / golden 测试 | |

### 国际化
| 英文 | 中文 | 备注 |
|------|------|------|
| internationalization (i18n) | 国际化 | |
| localization (l10n) | 本地化 | |
| locale | 语言区域 | |

### 平台集成
| 英文 | 中文 | 备注 |
|------|------|------|
| platform channel | 平台通道 | |
| method channel | 方法通道 | |
| event channel | 事件通道 | |
| plugin | 插件 | |
| package | package / 软件包 | 视语境选用 |
| embedding | 嵌入 | |
| add-to-app | 混合开发 / add-to-app | |

### 其他常用
| 英文 | 中文 | 备注 |
|------|------|------|
| null safety | 空安全 | |
| sound null safety | 健全的空安全 | |
| type system | 类型系统 | |
| future | Future | 类名不译 |
| stream | Stream / 流 | 视语境选用 |
| async / await | async / await | 不翻译 |
| framework | 框架 | |
| library | 库 | |
| dependency | 依赖 | |

---

## 混排格式规则

1. **中英文之间加空格**：`了解 Flutter 的基本构成要素`
2. **中文与数字之间加空格**：`第 3 步`
3. **中文标点使用中文全角**：`，。！？：；（）`
4. **英文标点保持英文半角**：代码中的标点不变
5. **反引号内容不翻译**：`` `setState()` `` 保持原样
