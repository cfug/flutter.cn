## 临时的重定向方案

由于 OSS 部分限制的问题，
无法将大量重定向逻辑在服务端直接使用（类似 Nginx、Apache 等），

所有无法访问的链接会被重定向至 404 页，
该方案利用 404 页，
将 firebase.json 内的重定向逻辑运行在 404 页面。

关于 firebase.json 内重定向的相关资料：
> https://firebase.google.cn/docs/hosting/full-config?hl=zh-cn#redirects

### 环境

- node v22.15.1
- npm v10.9.2

### 使用

```sh
npm i

npm run build # ./build/host-redirect.min.js
```
