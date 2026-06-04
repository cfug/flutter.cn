---
# title: Set up a web development configuration file
title: 配置 Web 开发配置文件
# shortTitle: Web development configuration
shortTitle: Web 开发配置
# description: >-
#   Centralize web development settings including a development proxy
description: >-
  集中管理 Web 开发设置，包括开发代理
ai-translated: true
---

Flutter web includes a development server that defaults to
serving your application in the `localhost` domain using HTTP
on a randomly assigned port. While command-line arguments offer
a quick way to modify the server's behavior,
this document focuses on a more structured approach:
defining your server's behavior through a centralized `web_dev_config.yaml` file.
This configuration file allows you to
customize server settings—host, port, HTTPS settings, and
proxy rules—ensuring a consistent development environment.

Flutter Web 包含开发服务器，默认在 `localhost` 域通过 HTTP 在随机分配的端口上提供应用。命令行参数可快速修改服务器行为，本文档侧重更结构化的方式：通过集中的 `web_dev_config.yaml` 文件定义服务器行为。该配置文件可自定义主机、端口、HTTPS 设置与代理规则，确保开发环境一致。

:::version-note
Support for the `web_dev_config.yaml` file was added in Flutter 3.38.
:::

:::version-note
对 `web_dev_config.yaml` 文件的支持在 Flutter 3.38 中添加。
:::

## Create a configuration file
## 创建配置文件

Add a `web_dev_config.yaml` file to the root directory of your Flutter project.
If you haven't set up a Flutter project,
visit [Building a web application with Flutter][] to get started.

在 Flutter 项目根目录添加 `web_dev_config.yaml` 文件。若尚未创建 Flutter 项目，请参阅[使用 Flutter 构建 Web 应用][]入门。

[Building a web application with Flutter]: /platform-integration/web/building
[使用 Flutter 构建 Web 应用]: /platform-integration/web/building

## Add configuration settings
## 添加配置项

### Basic server configuration
### 基本服务器配置

You can define the host, port, and HTTPS settings for your development server.

你可以为开发服务器定义主机、端口与 HTTPS 设置。

```yaml title="web_dev_config.yaml"
server:
  host: "0.0.0.0" # Defines the binding address <string>
  port: 8080 # Specifies the port <int> for the development server
  https:
    cert-path: "/path/to/cert.pem" # Path <string> to your TLS certificate
    cert-key-path: "/path/to/key.pem" # Path <string> to TLS certificate key
```

### Custom headers
### 自定义标头

You can also inject custom HTTP headers into the development server's responses.

你还可以向开发服务器的响应注入自定义 HTTP 标头。

```yaml title="web_dev_config.yaml"
server:
  headers:
    - name: "X-Custom-Header" # Name <string> of the HTTP header
      value: "MyValue" # Value <string> of the HTTP header
    - name: "Cache-Control"
      value: "no-cache, no-store, must-revalidate"
```

### Proxy configuration
### 代理配置

Requests are matched in order from the `web_dev_config.yaml` file.

请求按 `web_dev_config.yaml` 文件中的顺序进行匹配。

#### Basic string proxy
#### 基本字符串代理

Use the `prefix` field for simple path prefix matching.

使用 `prefix` 字段进行简单路径前缀匹配。

```yaml title="web_dev_config.yaml"
server:
  proxy:
    - target: "http://localhost:5000/" # Base URL <string> of your backend
      prefix: "/users/" # Path <string>
    - target: "http://localhost:3000/"
      prefix: "/data/"
      replace: "/report/" # Replacement <string> of path in redirected URL (optional)
    - target: "http://localhost:4000/"
      prefix: "/products/"
      replace: ""
```

**Explanation:**

**说明：**

*   A request to `/users/names` is
    forwarded to `http://localhost:5000/users/names`.

    对 `/users/names` 的请求会转发到 `http://localhost:5000/users/names`。

*   A request to `/data/2023/` is
    forwarded to `http://localhost:3000/report/2023`
    because `replace: "/report/"` replaces the `/data/` prefix.

    对 `/data/2023/` 的请求会转发到 `http://localhost:3000/report/2023`，因为 `replace: "/report/"` 会替换 `/data/` 前缀。

*   A request to `/products/item/123` is
    forwarded to `http://localhost:4000/item/123` because `replace: ""`
    removes the `/products/` prefix by replacing it with an empty string.

    对 `/products/item/123` 的请求会转发到 `http://localhost:4000/item/123`，因为 `replace: ""` 会用空字符串替换 `/products/` 前缀从而将其移除。

#### Advanced regex proxy
#### 高级正则代理

You can also use the `regex` field for more flexible and complex matching.

你还可以使用 `regex` 字段进行更灵活、复杂的匹配。

```yaml title="web_dev_config.yaml"
server:
  proxy:
    - target: "http://localhost:5000/"
      regex: "/users/(\d+)/$" # Path <string> matches requests like /users/123/
    - target: "http://localhost:4000/"
      regex: "^/api/(v\d+)/(.*)" # Matches requests like /api/v1/users
      replace: "/$2?apiVersion=$1" # Allows capture groups (optional)
```

**Explanation:**

**说明：**

*   A request to `/users/123/` matches the first rule exactly,
    so it is forwarded to `http://localhost:5000/users/123/`.

    对 `/users/123/` 的请求完全匹配第一条规则，因此转发到 `http://localhost:5000/users/123/`。

*   A request to `/api/v1/users/profile/` starts with the second rule path
    so it is forwarded to `http://localhost:4000/users/profile/?apiVersion=v1`.

    对 `/api/v1/users/profile/` 的请求匹配第二条规则，因此转发到 `http://localhost:4000/users/profile/?apiVersion=v1`。

## Configuration precedence
## 配置优先级

Remember the order of precedence for settings:

请记住设置的优先级顺序：

1. **Command-line arguments** (such as `--web-hostname`, `--web-port`)

   **命令行参数**（如 `--web-hostname`、`--web-port`）

2. **`web_dev_config.yaml` settings**

   **`web_dev_config.yaml` 中的设置**

3. **Built-in default values**

   **内置默认值**
