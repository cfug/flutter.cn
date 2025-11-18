If you are deploying to Android, edit your `AndroidManifest.xml` file to
add the Internet permission.

如果你要部署 Android，
请编辑 `AndroidManifest.xml` 文件，
添加 Internet 权限。

```xml
<!-- Required to fetch data from the internet. -->
<uses-permission android:name="android.permission.INTERNET" />
```

Likewise, if you are deploying to macOS, edit your
`macos/Runner/DebugProfile.entitlements` and `macos/Runner/Release.entitlements`
files to include the network client entitlement.

同样，如果你要部署 macOS，
请编辑 `macos/Runner/DebugProfile.entitlements` 和 
`macos/Runner/Release.entitlements` 文件，
添加 network client 权限。

```xml
<!-- Required to fetch data from the internet. -->
<key>com.apple.security.network.client</key>
<true/>
```
