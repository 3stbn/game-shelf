import { NativeModules, Platform } from 'react-native'
import content, { LocalizedKeys, supportedLangs, SupportedLangs } from '../../content'

const deviceLanguage =
  Platform.OS === 'ios'
    ? NativeModules.SettingsManager.settings.AppleLocale || NativeModules.SettingsManager.settings.AppleLanguages[0] //iOS 13
    : NativeModules.I18nManager.localeIdentifier

const device_lang = deviceLanguage.slice(0, 2)

const lang: SupportedLangs = supportedLangs.includes(device_lang) ? device_lang : 'en'

export function getText(text: LocalizedKeys): string {
  return content[lang][text]
}
