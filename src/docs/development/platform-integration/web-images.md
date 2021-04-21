---
title: Displaying images on the web
title: 在 Web 中展示图片
short-title: Web images
short-title: Web 图片
description: Learn how to load and display images on the web.
description: 学习如何在 Web 中加载和展示图片。
---

The web supports the standard [`Image`][1] widget to display images.
However, because web browsers are built to run untrusted code safely,
there are certain limitations in what you can do with images compared
to mobile and desktop platforms. This page explains these limitations
and offers ways to work around them.

Web 支持使用标准的 [`Image`][1] 组件来展示图片。
然而，Web 浏览器和手机以及桌面平台相比，在处理图片上会有一定的局限性，
因为它需要以安全的方式运行未信任的代码。
本页面内容解释了这些限制，并提供一些解决方法。

# Background

# 背景

This section summarizes the technologies available
across Flutter and the web,
on which the solutions below are based on.

本节概括了 Flutter Web 中可用的技术，下述的解决方案都基于此。

## Images in Flutter

Flutter offers the [`Image`][1] widget as well as the low-level
[`dart:ui/Image`][11] class for rendering images.
The `Image` widget has enough functionality for most use-cases.
The `dart:ui/Image` class can be used in
advanced situations where fine-grained control
of the image is needed.

Flutter 提供了 [`Image`][1] 组件以及底层的 [`dart:ui/Image`][11] 类来渲染图片。
`Image` 组件的功能足够满足大部分使用场景。
`dart:ui/Image` 类可用于需要精细控制图片的场景。

## Images on the web

## Web 中的图片

The web offers several methods for displaying images.
Below are some of the common ones:

Web 提供了多种展示图片的方式，下面是几种常见的：

- The built-in [`<img>`][2] and [`<picture>`][3] HTML elements.
  
  内置的 [`<img>`][2] 和 [`<picture>`][3] HTML 元素。
  
- The [`drawImage`][4] method on the [`<canvas>`][5] element.

  [`<canvas>`][5] 元素中的 [`drawImage`][4] 方法。

- Custom image codec that renders to a WebGL canvas.

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

## Cross-Origin Resource Sharing (CORS)

## 跨域资源共享 (CORS)

[CORS][6] is a mechanism that browsers use to control
how one site accesses the resources of another site.
It is designed such that, by default, one web-site
is not allowed to make HTTP requests to another site
using [XHR][21] or [`fetch`][22].
This prevents scripts on another site from acting on behalf
of the user and from gaining access to another
site's resources without permission.

[CORS][6] 是一种浏览器用来控制一个站点如何获取另一个站点的资源的机制。
默认情况下，一个网站不允许使用 [XHR][21] 或者 [`fetch`][22] 的
方式向另一个站点发送 HTTP 请求。
这样可以阻止另一个站点代表用户执行脚本，
以及无需权限就可以获取另一个站点的资源。

When using `<img>`, `<picture>`, or `<canvas>`,
the browser automatically blocks access to pixels
when it knows that an image is coming from another site
and the CORS policy disallows access to data.

当使用 `<img>`、`<picture>` 或者 `<canvas>` 时，
如果浏览器发现图片来源于另一个站点，且 CORS 政策不允许访问数据时，
浏览器会自动阻止信息的访问权限。

WebGL requires access to the image data in order
to be able to render the image. Therefore,
images to be rendered using WebGL must only come from servers
that have a CORS policy configured to work with
the domain that serves your application.

WebGL 需要访问图片信息以用于渲染图片。
因此要想使用 WebGL 渲染图片，该图片的来源服务所在的域名必须配置有效且可用的 CORS 策略。

## Flutter renderers on the web

## Web 中的 Flutter 渲染器

Flutter offers a choice of two renderers on the web:

Flutter 在 Web 中提供了两种可供选择的渲染器：

* **HTML**: this renderer uses a combination of HTML,
  CSS, Canvas 2D, and SVG to render UI.
  It uses the `<img>` element to render images.
  
  **HTML**：该渲染器使用了 HTML、CSS、Canvas 2D 和 SVG 组合的方式渲染 UI。
  使用 `<img>` 元素渲染图片。
  
* **CanvasKit**: this renderer uses WebGL to render UI,
  and therefore requires
  access to the pixels of the image.
  
  **CanvasKit**：该渲染器使用了 WebGL 渲染 UI，
  因此需要访问图片的像素信息。

Because the HTML renderer uses the `<img>`
element it can display images from
arbitrary sources. However,
this places the following limitations on what you
can do with them:

因为 HTML 渲染器使用了 `<img>` 元素，所以可以展示任意来源的图片。
但是，这也给你带来了以下限制：

* Limited support for [`Image.toByteData`][7].
  
  对 [`Image.toByteData`][7] 的支持有限。
  
* No support for [`OffsetLayer.toImage`][8] and
  [`Scene.toImage`][10].
  
  不支持 [`OffsetLayer.toImage`][8] 和 [`Scene.toImage`][10]。
  
* No access to frame data in animated images
  ([`Codec.getNextFrame`][9],
  `frameCount` is always 1, `repetitionCount` is always 0).
  
  无法获取动图中的帧信息（[`Codec.getNextFrame`][9]，
  `frameCount` 永远为 1，`repetitionCount` 永远为 0）。
  
* No support for `ImageShader`.

  不支持 `ImageShader`。
  
* Limited support for shader effects that can be applied to images.

  应用于图片的着色器效果的支持有限。

* No control over image memory (`Image.dispose` has no effect).
  The memory is managed by the browser behind-the-scenes.
  
  不可控制图片内存（`Image.dispose` 无效）。内存由浏览器自行控制。

The CanvasKit renderer implements Flutter's image API fully.
However, it requires access to image pixels to do so,
and is therefore subject to the CORS policy.

CanvasKit 完全实现了 Flutter 中的图片 API。
但它需要访问图片的像素信息，因此受制于 CORS 政策。

# Solutions

# 解决方案

## In-memory, asset, and same-origin network images

## 内存、asset 和同源网络图片

If the app has the bytes of the encoded image in memory,
provided as an [asset][12], or stored on the
same server that serves the application
(also known as _same-origin_), no extra effort is necessary.
The image can be displayed using
[`Image.memory`][13], [`Image.asset`][14], and [`Image.network`][15]
in both HTML and CanvasKit modes.

如果图片在应用内存中有编码后的字节信息、或者以 [asset][12] 的方式提供、
或者和应用存储在同一服务器上（也就是同源），则不需要做额外工作。
图片既可以在 HTML 也可以在 CanvasKit 模式下，使用 [`Image.memory`][13]、
[`Image.asset`][14] 和 [`Image.network`][15] 来展示。

## Cross-origin images

## 跨域图片

The HTML renderer can load cross-origin images
without extra configuration.

HTML 渲染器可以加载跨域图片，无需额外配置。

CanvasKit requires that the app gets the bytes of the encoded image.
There are several ways to do this, discussed below.

CanvasKit 需要应用获取编码后的图片的字节信息。
有多种获取方式，如下文所述。

### Host your images in a CORS-enabled CDN.

### 在支持 CORS 的 CDN 中部署你的图片

Typically, content delivery networks (CDN)
can be configured to customize what domains
are allowed to access your content.
For example, Firebase site hosting allows
[specifying a custom][16] `Access-Control-Allow-Origin`
header in the `firebase.json` file.

通常，可以配置内容分发网络 (CDN) 来自定义哪些域名可以访问你的内容。
例如：Firebase 站点托管允许在 `firebase.json` 文件中，
[指定一个自定义的][16] `Access-Control-Allow-Origin` 头。

### Lack control over the image server? Use a CORS proxy.

### 没有图片服务器控制权？使用一个 CORS 代理

If the image server cannot be configured to allow CORS
requests from your application,
you may still be able to load images by proxying the requests
through another server. This requires that the
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

* Using [CloudFlare Workers][18].

  使用 [CloudFlare Workers][18]。
  
* Using [Firebase Functions][19].

  使用 [Firebase Functions][19]。

### Use <img> in a platform view.

### 在平台视图中使用 <img>

Flutter supports embedding HTML inside the app using
[`HtmlElementView`][17].  Use it to create an `<img>`
element to render the image from another domain.
However, do keep in mind that this comes with the
limitations explained in the section
"Flutter renderers on the web" above.

Flutter 支持在应用中使用 [`HtmlElementView`][17] 嵌入 HTML。
通过它可以创建一个 `<img>` 元素来渲染另一个域名的图片。
但是，一定要记住，此方法也附带了
「Web 中的 Flutter 渲染器」一节中提到的限制。

[As of today][20], using too many HTML elements
with the CanvasKit renderer may hurt performance.
If images interleave non-image content Flutter needs to
create extra WebGL contexts between the `<img>` elements.
If your application needs to display a lot of images
on the same screen all at once, consider using
the HTML renderer instead of CanvasKit.

[就目前而言][20]，在 CanvasKit 渲染器中过多地使用 HTML 元素，
可能较为影响性能。如果图片和非图片内容交替出现，
Flutter 需要在 `<img>` 元素之间创建额外的 WebGL 上下文。
如果你的应用需要一次性在同一屏幕中展示大量的图片，
请考虑使用 HTML 渲染器替代 CanvasKit。


[1]: {{site.api}}/flutter/widgets/Image-class.html
[2]: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img
[3]: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/picture
[4]: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage
[5]: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/canvas
[6]: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
[7]: {{site.api}}/flutter/dart-ui/Image/toByteData.html
[8]: {{site.api}}/flutter/rendering/OffsetLayer/toImage.html
[9]: {{site.api}}/flutter/dart-ui/Codec/getNextFrame.html
[10]: {{site.api}}/flutter/dart-ui/Scene/toImage.html
[11]: {{site.api}}/flutter/dart-ui/Image-class.html
[12]: /docs/development/ui/assets-and-images
[13]: {{site.api}}/flutter/widgets/Image/Image.memory.html
[14]: {{site.api}}/flutter/widgets/Image/Image.asset.html
[15]: {{site.api}}/flutter/widgets/Image/Image.network.html
[16]: https://firebase.google.com/docs/hosting/full-config#headers
[17]: {{site.api}}/flutter/widgets/HtmlElementView-class.html
[18]: https://developers.cloudflare.com/workers/examples/cors-header-proxy
[19]: {{site.github}}/7kfpun/cors-proxy
[20]: {{site.github}}/flutter/flutter/issues/71884
[21]: https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest
[22]: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
