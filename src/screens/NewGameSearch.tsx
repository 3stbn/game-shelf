import React, { useState } from 'react'
import { TextInput, List, Provider, Chip, Divider, ActivityIndicator } from 'react-native-paper'
import Container from '../components/Container'
import { ScrollView, View } from 'react-native'
import { Game, GameRoute } from '../types'
import { IGDB_USER_KEY } from '../../.env.json'

import { NavigationStackProp } from 'react-navigation-stack'
import { withNavigation } from 'react-navigation'
import { getText } from '../utils/locale'
import PlatformTags from '../components/PlatformTags'
import GameImageTile from '../components/GameImageTile'
import { retrieveGame } from '../utils/localStorage'
import Loading from '../components/Loading'

function NewGame({ navigation }: { navigation: NavigationStackProp }) {
    const route: GameRoute = navigation.getParam('route')

    const [title, setTitle] = useState('')
    const [timer, setTimer] = useState(0)
    const [games, setGames] = useState([])
    const [loading, setLoading] = useState(false)
    const [loadingRoute, setLoadingRoute] = useState(false)

    async function queryGames(query: string) {
        const url = `https://api.rawg.io/api/games?search=${query}`
        const response = await fetch(url, {
            headers: {
                'User-Agent': 'game-backlog-idea'
            }
        })

        const { results: gamesApi } = await response.json()
        setLoading(false)
        setGames(gamesApi)
    }

    const handleSearch = (text: string) => {
        setTitle(text)
        setLoading(true)
        if (!text) {
            return
        }
        if (timer) {
            clearTimeout(timer)
        }

        setTimer(
            setTimeout(async () => {
                if (text) {
                    await queryGames(text)
                }
            }, 700)
        )
    }

    async function loadGameDetails(id: string) {
        setLoadingRoute(true)
        const url = `https://api.rawg.io/api/games/${id}`
        const response = await fetch(url, {
            headers: {
                'User-Agent': 'game-backlog-idea'
            }
        })
        const gameApi: Game = await response.json()
        const coverImgId = await loadGameCover(gameApi)

        setLoadingRoute(false)
        return coverImgId ? { ...gameApi, coverImgId } : gameApi
    }

    async function loadGameCover(gameRawg: Game) {
        const gameUrl = `https://api-v3.igdb.com/games`
        const coverUrl = `https://api-v3.igdb.com/covers`
        const responseCover = await fetch(gameUrl, {
            headers: {
                Accept: 'application/json',
                'user-key': '905b60bca60c9449509e2bcf51e65e87'
            },
            method: 'POST',
            body: `fields cover; limit 1; where slug = "${gameRawg.slug}";`
        })
        const covers = await responseCover.json()
        if (covers.length === 0 || !covers[0].cover) {
            return null
        }

        const coverResponse = await fetch(coverUrl, {
            headers: {
                Accept: 'application/json',
                'user-key': IGDB_USER_KEY
            },
            method: 'POST',
            body: `fields image_id; limit 1; where id = ${covers[0].cover};`
        })
        const imageIds = await coverResponse.json()

        return imageIds[0].image_id
    }

    async function handleGameSearch(selectedGame: Game) {
        const storageGame = await retrieveGame(selectedGame.id.toString())

        if (storageGame) {
            navigation.navigate(getText('game'), { game: storageGame, mode: 'storedGame', route })
        } else {
            const detailedGame: Game = await loadGameDetails(selectedGame.id.toString())
            navigation.navigate(getText('game'), { game: detailedGame, mode: 'newGame', route })
        }
    }

    return (
        <Provider>
            <Container>
                <View>
                    <TextInput
                        mode="outlined"
                        label={getText('newGameName')}
                        value={title}
                        onChangeText={handleSearch}
                        autoFocus
                        disabled={loadingRoute}
                    />

                    {loading && (
                        <ActivityIndicator style={{ marginLeft: -35, position: 'absolute', right: 13, top: 22 }} />
                    )}
                </View>
                {loadingRoute ? (
                    <Loading />
                ) : (
                    <View>
                        {games.length > 0 && title !== '' && (
                            <ScrollView>
                                {games.map((game: Game) => (
                                    <View key={game.id}>
                                        <List.Item
                                            onPress={() => {
                                                handleGameSearch(game)
                                            }}
                                            title={game.name}
                                            description={() => (
                                                <View style={{ paddingTop: 5 }}>
                                                    <PlatformTags platforms={game.platforms || []} disabled />
                                                    <View style={{ flexDirection: 'row' }}>
                                                        {game.released && (
                                                            <Chip mode="outlined">
                                                                {getText('released')} :{' '}
                                                                {new Date(game.released).getFullYear()}
                                                            </Chip>
                                                        )}
                                                    </View>
                                                </View>
                                            )}
                                            left={() => <GameImageTile game={game} />}
                                        />
                                        <Divider />
                                    </View>
                                ))}
                            </ScrollView>
                        )}
                    </View>
                )}
            </Container>
        </Provider>
    )
}

export default withNavigation(NewGame)
