import content from '../../content'
import { Platform, NativeModules } from 'react-native'

const supportedLangs = ['en', 'es']

const deviceLanguage =
    Platform.OS === 'ios'
        ? NativeModules.SettingsManager.settings.AppleLocale || NativeModules.SettingsManager.settings.AppleLanguages[0] //iOS 13
        : NativeModules.I18nManager.localeIdentifier

const device_lang = deviceLanguage.slice(0, 2)

const lang = supportedLangs.includes(device_lang) ? device_lang : 'en'

export function getText(text: string): string {
    return content[lang][text] ? content[lang][text] : text
}
