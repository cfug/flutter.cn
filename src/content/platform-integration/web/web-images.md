---
# title: Display images on the web
title: 在 Web 中展示图片
# short-title: Web images
short-title: Web 图片
# description: Learn how to load and display images on the web.
description: 学习如何在 Web 中加载和展示图片。
---

The web supports the standard [`Image`][] widget and the more 
advanced [`dart:ui/Image`][] class (where more fine-grained control 
is needed to display images).
However, because web browsers are built to run untrusted code safely,
there are certain limitations in what you can do with images compared
to mobile and desktop platforms. This page explains these limitations
and offers ways to work around them.

Web 支持使用标准的 [`Image`][] widget 和
更高级的 [`dart:ui/Image`][] 类
（需要更精细的控制来显示图像）。
然而，Web 浏览器和手机以及桌面平台相比，在处理图片上会有一定的局限性，
因为它需要以安全的方式运行未信任的代码。
本页面内容解释了这些限制，并提供一些解决方法。

[`Image`]: {{site.api}}/flutter/widgets/Image-class.html
[`dart:ui/Image`]: {{site.api}}/flutter/dart-ui/Image-class.html

:::note
For information on how to optimize web loading speed,
check out the (free) article on Medium,
[Best practices for optimizing Flutter web loading speed][article].

[article]: {{site.flutter-medium}}/best-practices-for-optimizing-flutter-web-loading-speed-7cc0df14ce5c
:::

## Background

## 背景

The web offers several methods for displaying images:

Web 提供了多种展示图片的方式：

- The built-in [`<img>`][] and [`<picture>`][] HTML elements

  内置的 [`<img>`][] 和 [`<picture>`][] HTML 元素

- The [`drawImage`][] method on the [`<canvas>`][] element

  [`<canvas>`][] 元素中的 [`drawImage`][] 方法

- Custom image codec that renders to a WebGL canvas

  可渲染至 WebGL 画布的自定义图片编解码器。

Each option has its own benefits and drawbacks.
For example, the built-in elements fit nicely among
other HTML elements, and they automatically take
advantage of browser caching, and built-in image
optimization and memory management.
They allow you to safely display images from arbitrary sources
(more on than in the CORS section below).
`drawImage` is great when the image must fit within
other content rendered using the `<canvas>` element.
You also gain control over image sizing and,
when the CORS policy allows it, read the pixels
of the image back for further processing.
Finally, WebGL gives you the highest degree of
control over the image. Not only can you read the pixels and
apply custom image algorithms, but you can also use GLSL for
hardware-acceleration.

每种方式都有各自的优缺点。例如：内置的元素和其他 HTML 元素完美契合，
并且自带浏览器缓存、内置图片优化和内存管理的优势。
这使得你可以安全地展示任意来源的图片（超越了下节中的 CORS）。
当图片必须和 `<canvas>` 元素中渲染的其他内容适配时，`drawImage` 更合适。
当 CORS 政策允许时，你也可以获取图片尺寸的控制权，读取像素信息用于进一步处理。
最后，WebGL 给予了你最大限度的图片控制权。
你不仅可以读取像素信息、应用自定义的图片算法，还可以使用 GLSL 实现硬件加速。

[`<img>`]: https://developer.mozilla.org/docs/Web/HTML/Element/img
[`<picture>`]: https://developer.mozilla.org/docs/Web/HTML/Element/picture
[`drawImage`]: https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/drawImage
[`<canvas>`]: https://developer.mozilla.org/docs/Web/HTML/Element/canvas

## Cross-Origin Resource Sharing (CORS)

## 跨域资源共享 (CORS)

[CORS][] is a mechanism that browsers use to control how
one site accesses the resources of another site. It is
designed such that, by default, one web-site is not
allowed to make HTTP requests to another site using
[XHR][] or [`fetch`][].  
This prevents scripts on another site from acting on
behalf of the user and from gaining access to another
site's resources without permission.

[CORS][] 是一种浏览器用来控制一个站点如何获取另一个站点的资源的机制。
默认情况下，一个网站不允许使用 [XHR][] 或者 [`fetch`][] 的
方式向另一个站点发送 HTTP 请求。
这样可以阻止另一个站点代表用户执行脚本，
以及无需权限就可以获取另一个站点的资源。

On the web, Flutter renders apps using the CanvasKit
or skwasm (when using Wasm) renderers. These both rely
on WebGL. WebGL requires access to the raw image data
(bytes) in order to be able to render the image.
Therefore, images must only come from servers that
have a CORS policy configured to work with the domain
that serves your application.

在 Web 上，Flutter 使用 CanvasKit 或 
skwasm（使用 Wasm 时）渲染器来渲染应用。
这两种渲染器都依赖于 WebGL。
WebGL 需要访问原始图像数据（字节）才能渲染图像。
因此，图像只能来自配置了 CORS 策略的服务器，
且该策略允许与应用所在的域进行通信。

:::note

For more information about web renderers, see
[Web renderers][].

关于更多 Web 渲染器的信息，
请参考 [Web 渲染器][Web renderers]。

:::

[CORS]: https://developer.mozilla.org/docs/Web/HTTP/CORS
[XHR]: https://developer.mozilla.org/docs/Web/API/XMLHttpRequest
[`fetch`]: https://developer.mozilla.org/docs/Web/API/Fetch_API/Using_Fetch
[Web renderers]: /platform-integration/web/renderers

## Solutions

## 解决方案

There are multiple solutions to workaround CORS restrictions
in Flutter.

有多种方案可以解决 Flutter 中的 CORS 限制。

### In-memory, asset, and same-origin network images

### 内存、asset 和同源网络图片

If the app has the bytes of the encoded image in memory,
provided as an [asset][], or stored on the
same server that serves the application
(also known as _same-origin_), no extra effort is necessary.
The image can be displayed using
[`Image.memory`][], [`Image.asset`][], or [`Image.network`][].

如果图片在应用内存中有编码后的字节信息、或者以 [asset][] 的方式提供、
或者和应用存储在同一服务器上（也就是**同源**），则不需要做额外工作。
图片可以使用 
[`Image.memory`][]、[`Image.asset`][] 或 [`Image.network`][] 来展示。

[asset]: /ui/assets/assets-and-images
[`Image.memory`]: {{site.api}}/flutter/widgets/Image/Image.memory.html
[`Image.asset`]: {{site.api}}/flutter/widgets/Image/Image.asset.html
[`Image.network`]: {{site.api}}/flutter/widgets/Image/Image.network.html

### Host images in a CORS-enabled CDN

### 在支持 CORS 的 CDN 中托管图片

Typically, content delivery networks (CDN)
can be configured to customize what domains
are allowed to access your content.
For example, Firebase site hosting allows
[specifying a custom][custom-header] `Access-Control-Allow-Origin`
header in the `firebase.json` file.

通常，可以配置内容分发网络 (CDN) 来自定义哪些域名可以访问你的内容。
例如：Firebase 站点托管允许在 `firebase.json` 文件中，
[指定一个自定义的][custom-header] `Access-Control-Allow-Origin` 头。

[custom-header]: {{site.firebase}}/docs/hosting/full-config#headers

### Use a CORS proxy if you have no control over the origin server

### 如果无法控制源服务器，则使用 CORS 代理

If the image server cannot be configured to allow CORS
requests from your application,
you might still be able to load images by proxying
the requests through another server. This requires that the
intermediate server has sufficient access to load the images.

如果无法从你的应用层面去配置图片服务器的 CORS，
你依然可以通过另一个服务器代理请求，从而加载图片。
这要求中转服务器对图片加载有充分的访问权。

This method can be used in situations when the original
image server serves images publicly,
but is not configured with the correct CORS headers.

此方法适用于源图片服务器公开提供了图片，却没有正确配置 CORS 头的情况。

Examples:

例子：

* Using [CloudFlare Workers][].

  使用 [CloudFlare Workers][]。
  
* Using [Firebase Functions][].

  使用 [Firebase Functions][]。

[CloudFlare Workers]: https://developers.cloudflare.com/workers/examples/cors-header-proxy
[Firebase Functions]: {{site.github}}/7kfpun/cors-proxy

### Use a HTML platform view

### 使用 HTML 原生平台视图

If none of the other solutions work for your app, Flutter
supports embedding raw HTML inside the app using
[`HtmlElementView`][].  Use it to create an `<img>`
element to render the image from another domain.

如果其他解决方案都不适合你的应用，
Flutter 还支持在应用中使用 [`HtmlElementView`][] 嵌入原始的 HTML。
通过它可以创建一个 `<img>` 元素来渲染另一个域名的图片。

[`HtmlElementView`]: {{site.api}}/flutter/widgets/HtmlElementView-class.html
