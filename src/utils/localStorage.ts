import { AsyncStorage } from 'react-native'
import { SavedGame } from '../types'

export const storeGame = async (id: string, game: SavedGame) => {
    try {
        await AsyncStorage.setItem(`game:${id}`, JSON.stringify(game))
    } catch (error) {
        return Promise.reject(error)
    }
}
export const getGames = async () => {
    try {
        const keys = await AsyncStorage.getAllKeys()
        const gameKeys = keys.filter(k => {
            const type = k.split(':')[0]
            return type === 'game'
        })
        const stores = await AsyncStorage.multiGet(gameKeys)

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        return stores.map(([key, value]) => {
            const storedGame: SavedGame = JSON.parse(value)
            return storedGame
        })
    } catch (error) {
        return error
    }
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

export const migrateGames = async () => {
    try {
        let games = await getGames()
        let promises: Array<Promise<void>> = []
        games.forEach(g => {
            if (g.ownerShip) {
                g.ownership = g.ownerShip
                delete g.ownerShip
                promises.push(storeGame(g.id, g))
            }
        })

        await Promise.all(promises)
    } catch (err) {
        console.log('Game Migration failed', err)
    }
}
