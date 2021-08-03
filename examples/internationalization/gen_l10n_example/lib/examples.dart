import 'package:flutter/material.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';
// ignore_for_file: unused_local_variable

void examples(BuildContext context) {
// #docregion MaterialAppExample
  const MaterialApp(
    title: 'Localizations Sample App',
    localizationsDelegates: AppLocalizations.localizationsDelegates,
    supportedLocales: AppLocalizations.supportedLocales,
  );
// #enddocregion MaterialAppExample

// #docregion LocaleResolution
  MaterialApp(
    localeResolutionCallback: (
      Locale? locale,
      Iterable<Locale> supportedLocales,
    ) {
      return locale;
    },
  );
// #enddocregion LocaleResolution

// #docregion Example
  Text(AppLocalizations.of(context)!.helloWorld);
// #enddocregion Example

// #docregion MyLocale
  Locale myLocale = Localizations.localeOf(context);
// #enddocregion MyLocale

  const MaterialApp(
// #docregion SupportedLocales
    supportedLocales: [
      Locale.fromSubtags(languageCode: 'zh'), // generic Chinese 'zh'
      Locale.fromSubtags(
          languageCode: 'zh',
          scriptCode: 'Hans'), // generic simplified Chinese 'zh_Hans'
      Locale.fromSubtags(
          languageCode: 'zh',
          scriptCode: 'Hant'), // generic traditional Chinese 'zh_Hant'
      Locale.fromSubtags(
          languageCode: 'zh',
          scriptCode: 'Hans',
          countryCode: 'CN'), // 'zh_Hans_CN'
      Locale.fromSubtags(
          languageCode: 'zh',
          scriptCode: 'Hant',
          countryCode: 'TW'), // 'zh_Hant_TW'
      Locale.fromSubtags(
          languageCode: 'zh',
          scriptCode: 'Hant',
          countryCode: 'HK'), // 'zh_Hant_HK'
    ],
// #enddocregion SupportedLocales
  );
}
