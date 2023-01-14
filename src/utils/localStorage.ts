import { AsyncStorage } from 'react-native'
import { SavedGame } from '../types'

export const storeGame = async (id: string, game: SavedGame) => {
  try {
    await AsyncStorage.setItem(`game:${id}`, JSON.stringify(game))
  } catch (error) {
    return Promise.reject(error)
  }
}
export const getGames = async (): Promise<SavedGame[]> => {
  const keys = await AsyncStorage.getAllKeys()
  const gameKeys = keys.filter(k => {
    const type = k.split(':')[0]
    return type === 'game'
  })
  const stores = await AsyncStorage.multiGet(gameKeys)

  return stores.map(([, value]) => {
    const storedGame = JSON.parse(value)
    return storedGame
  })
}

export const removeAllGames = async () => {
  try {
    const keys = await AsyncStorage.getAllKeys()
    const gameKeys = keys.filter(k => {
      const type = k.split(':')[0]
      return type === 'game'
    })
    await AsyncStorage.multiRemove(gameKeys)
  } catch (error) {
    return error
  }
}

export const retrieveGame = async (id: string) => {
  try {
    const value: string | null = await AsyncStorage.getItem(`game:${id}`)

    return value ? JSON.parse(value) : null
  } catch (error) {
    return Promise.resolve(error)
  }
}

export const removeGame = async (id: string) => {
  try {
    await AsyncStorage.removeItem(`game:${id}`)
  } catch (error) {
    return Promise.resolve(error)
  }
}
