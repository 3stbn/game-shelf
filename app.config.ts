import * as dotenv from 'dotenv'
import { ExpoConfig } from 'expo/config'
dotenv.config()
const config: ExpoConfig = {
  name: 'Game shelf',
  slug: 'game-shelf',
  platforms: ['ios', 'android', 'web'],
  version: '1.1.0',
  sdkVersion: '47.0.0',
  privacy: 'unlisted',
  orientation: 'portrait',
  icon: './assets/icon.png',
  splash: {
    image: './assets/splash.png',
    resizeMode: 'contain',
    backgroundColor: '#3B3940'
  },
  updates: {
    fallbackToCacheTimeout: 1000
  },
  assetBundlePatterns: ['**/*'],
  ios: {
    supportsTablet: true,
    bundleIdentifier: 'com.gameshelfcollection.gameshelfcollection',
    icon: './assets/icon.png'
  },
  android: {
    versionCode: 6,
    package: 'com.gameshelfcollection.gameshelfcollection',
    icon: './assets/icon.png',
    adaptiveIcon: {
      foregroundImage: './assets/adaptative-icon.png',
      backgroundColor: '#3B3940'
    },
    permissions: []
  },
  extra: {
    WORKER_URL: process.env.WORKER_URL,
    API_KEY: process.env.API_KEY,
    eas: {
      projectId: process.env.PROJECT_ID
    }
  }
}

export default config
