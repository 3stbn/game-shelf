import Constants from 'expo-constants'
import { Alert } from 'react-native'
import { Game, SavedGame } from '../types'

export async function makeRequest(pathAndSearch: string) {
  const headers = {
    'api-key': Constants.manifest?.extra?.API_KEY
  }
  const url = `${Constants.manifest?.extra?.WORKER_URL}/${pathAndSearch}`

  const response = await fetch(url, { headers })

  if (!response.ok) {
    const message =
      response.status === 429 ? 'Daily request limit exceeded please try tomorrow' : 'Something went wrong'
    Alert.alert(message)
    return {}
  }
  return await response.json()
}

export function getGame(id: string): Promise<SavedGame> {
  return makeRequest(`games/${id}`)
}

export async function searchGames(query: string): Promise<Game[]> {
  const response = await makeRequest(`games?search=${query}`)
  if (response?.results) {
    return response.results as Game[]
  } else {
    return []
  }
}