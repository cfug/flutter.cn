---
title: Preparing an Android App for Release
title: 打包和发布到 Android 平台
short-title: Android
---

During a typical development cycle, you test an app using
`flutter run` at the command line, the **Run** and **Debug**
toolbar buttons in IntelliJ. By default,
Flutter builds a *debug* version of your app.

When you're ready to prepare a *release* version for Android, for example to
[publish to the Google Play Store][play], follow the steps on this page.

## Review the App Manifest

Review the default [App Manifest][manifest] file `AndroidManifest.xml` located
in `<app dir>/android/app/src/main` and verify the values are correct,
especially:

* `application`: Edit the `android:label` in the
  [`application`][applicationtag] tag to reflect the final name of the app.

* `uses-permission`: Remove the `android.permission.INTERNET`
  [permission][permissiontag] if your application code does not need Internet
  access. The standard template includes this tag to enable communication
  between Flutter tools and a running app.

## Review the build configuration

Review the default [Gradle build file][gradlebuild] file `build.gradle`
located in `<app dir>/android/app` and verify the values are correct,
especially:

* `defaultConfig`:

  * `applicationId`: Specify the final, unique (Application Id)[appid]

  * `versionCode` & `versionName`: Specify the internal app version number,
     and the version number display string. You can do this by setting
     the `version` property in the pubspec.yaml file. Consult the version
     information guidance in the [versions documentation][versions].

  * `minSdkVersion` & `targetSdkVersion`: Specify the minimum API level,
     and the API level on which the app is designed to run. Consult the API
     level section in the [versions documentation][versions] for details.

## Adding a Launcher icon

When a new Flutter app is created, it has a default Launcher icon. To
customize this icon you might want to check out the [Flutter Launcher
Icons]({{site.pub}}/packages/flutter_launcher_icons) package.

Alternatively, if you want to do it manually, here's how:

1. Review the [Material Design Product Icons][launchericons] guidelines for icon
   design.

1. In the `<app dir>/android/app/src/main/res/` directory, place your icon files
   in folders named using [configuration qualifiers][].
   The default `mipmap-` folders demonstrate the correct naming convention.

1. In `AndroidManifest.xml`, update the [`application`][applicationtag] tag's
   `android:icon` attribute to reference icons from the previous step (for
   example, `<application android:icon="@mipmap/ic_launcher" ...`).

1. To verify the icon has been replaced, run your app using `flutter run`
   and inspect the app icon in the Launcher.

## Signing the app

To publish on the Play store, you need to give your app a digital
signature. Use the following instructions to sign your app.

### Create a keystore
If you have an existing keystore, skip to the next step. If not, create one
by running the following at the command line:
`keytool -genkey -v -keystore ~/key.jks -keyalg RSA -keysize 2048 -validity 10000 -alias key`

*Note:* Keep this file private; do not check it into public source control.

*Note:* `keytool` might not be in your path. It is part of the Java JDK,
which is installed as part of Android Studio. For the concrete path,
run `flutter doctor -v` and see the path printed after 'Java binary at:',
and then use that fully qualified path replacing `java` with `keytool`.

### Reference the keystore from the app

Create a file named `<app dir>/android/key.properties` that contains a
reference to your keystore:

```
storePassword=<password from previous step>
keyPassword=<password from previous step>
keyAlias=key
storeFile=<location of the key store file, e.g. /Users/<user name>/key.jks>
```

*Note:* Keep this file private; do not check it into public source control.

### Configure signing in gradle

Configure signing for your app by editing the
`<app dir>/android/app/build.gradle` file.

1. Replace:
```
   android {
```
   with the keystore information from your properties file:
```
   def keystoreProperties = new Properties()
   def keystorePropertiesFile = rootProject.file('key.properties')
   if (keystorePropertiesFile.exists()) {
       keystoreProperties.load(new FileInputStream(keystorePropertiesFile))
   }

   android {
```

1. Replace:
```
   buildTypes {
       release {
           // TODO: Add your own signing config for the release build.
           // Signing with the debug keys for now, so `flutter run --release` works.
           signingConfig signingConfigs.debug
       }
   }
```
   with:
```
   signingConfigs {
       release {
           keyAlias keystoreProperties['keyAlias']
           keyPassword keystoreProperties['keyPassword']
           storeFile file(keystoreProperties['storeFile'])
           storePassword keystoreProperties['storePassword']
       }
   }
   buildTypes {
       release {
           signingConfig signingConfigs.release
       }
   }
```

Release builds of your app will now be signed automatically.


## Enabling Proguard

By default, Flutter does not obfuscate or minify the Android host.
If you intend to use third-party Java or Android libraries,
you may want to reduce the size of the APK or protect that code from
reverse engineering.

For information on obfuscating Dart code, see [Obfuscating Dart
Code]({{site.github}}/flutter/flutter/wiki/Obfuscating-Dart-Code)
in the [Flutter wiki]({{site.github}}/flutter/flutter/wiki).

### Step 1 - Configure Proguard

Create `/android/app/proguard-rules.pro` file and add rules listed below.

```
#Flutter Wrapper
-keep class io.flutter.app.** { *; }
-keep class io.flutter.plugin.**  { *; }
-keep class io.flutter.util.**  { *; }
-keep class io.flutter.view.**  { *; }
-keep class io.flutter.**  { *; }
-keep class io.flutter.plugins.**  { *; }
```

The configuration above only protects Flutter engine libraries.
Any additional libraries (for example, Firebase) require their own
rules to be added.

### Step 2 - Enable obfuscation and/or minification

Open `/android/app/build.gradle` file and locate `buildTypes` definition.
Inside `release` configuration set `minifiyEnabled` and `useProguard` flags
to true. You have to also point ProGuard to the file you have created in step 1.

```
android {

    ...

    buildTypes {

        release {

            signingConfig signingConfigs.release

            minifyEnabled true
            useProguard true

            proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'

        }
    }
}
```

Note: Obfuscation and minification can considerably extend compile time
of the Android application.

## Building a release APK

This section describes how to build a release APK. If you completed the
signing steps in the previous section, the release APK will be signed.

Using the command line:

1. `cd <app dir>` (replace `<app dir>` with your application's directory).
1. Run `flutter build apk` (`flutter build` defaults to `--release`).

The release APK for your app is created at
`<app dir>/build/app/outputs/apk/release/app-release.apk`.

## Installing a release APK on a device

Follow these steps to install the APK built in the previous step on a
connected Android device.

Using the command line:

1. Connect your Android device to your computer with a USB cable.
1. `cd <app dir>` where `<app dir>` is your application directory.
1. Run `flutter install` .

## Publishing an APK to the Google Play Store

For detailed instructions on publishing the release version of an app to the
Google Play Store, see the [Google Play publishing documentation][play].

## Building a release app bundle

This section describes how to build a release app bundle. If you completed
the signing steps in the previous section, the release bundle will be signed.

From the command line:

1. Enter `cd <app dir>`. (Replace `<app, dir>` with your application's directory.)
1. Run `flutter build appbundle`. (Running `flutter build` defaults to a release build.)
1. To generate a different variant of bundle, you can enter
   <nobr>`flutter build appbundle --release --target-platform=android-arm`.</nobr>
   This generates a bundle for android-arm.

The release bundle for your app is created at
`<app dir>/build/app/outputs/bundle/release/app.aab`.

{{site.alert.note}}
  As of this writing, the app bundle command only generates **armeabi-v7a**
  compatible libs. Follow [Issue 18494][Issue 18494] for more information.
{{site.alert.end}} 

## Testing an app Bundle

An app bundle can be tested in multiple ways. This section describes a couple
ways in which to test an app bundle.

### Offline using the bundle tool

1. If you have done so already, download `bundletool` from the
[GitHub repository](https://github.com/google/bundletool).
1. [Generate a set of
APKs](https://developer.android.com/studio/command-line/bundletool#generate_apks)
from your app bundle.
1. [Deploy the
APKs](https://developer.android.com/studio/command-line/bundletool#deploy_with_bundletool)
to connected devices.

### Online using Google Play

1. Upload your bundle to Google Play to test it. You can use the internal
test track, or the alpha or beta channels to test the bundle before releasing
it in production.
2. Follow [these steps to upload your
bundle](https://developer.android.com/studio/publish/upload-bundle)
to the Play Store.

[manifest]: {{site.android-dev}}/guide/topics/manifest/manifest-intro
[manifesttag]: {{site.android-dev}}/guide/topics/manifest/manifest-element
[appid]: {{site.android-dev}}/studio/build/application-id
[permissiontag]: {{site.android-dev}}/guide/topics/manifest/uses-permission-element
[applicationtag]: {{site.android-dev}}/guide/topics/manifest/application-element
[gradlebuild]: {{site.android-dev}}/studio/build/#module-level
[versions]: {{site.android-dev}}/studio/publish/versioning
[launchericons]: https://material.io/design/iconography/
[configuration qualifiers]: {{site.android-dev}}/guide/topics/resources/providing-resources#AlternativeResources
[play]: {{site.android-dev}}/distribute/googleplay/start
[Issue 18494]: https://github.com/flutter/flutter/issues/18494
