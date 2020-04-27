/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import { ScrollView, View, ToastAndroid, Platform } from 'react-native'
import { SavedGame, GameStatus, PlatformsAccumulator, SelectedPlatform, Ownership, GameRoute } from '../types'
import { withNavigation, StackActions, NavigationActions } from 'react-navigation'
import { NavigationStackProp } from 'react-navigation-stack'
import Container from '../components/Container'
import { Card, Divider, Button, Colors } from 'react-native-paper'
import GameCard from '../components/GameCard'
import GameStatusSelector from '../components/GameStatusSelector'
import { getText } from '../utils/locale'
import PlatformTags from '../components/PlatformTags'
import { arrayCompare } from '../utils/array'
import GameProgressSlider from '../components/GameProgressSlider'
import { storeGame, removeGame } from '../utils/localStorage'
import GameOwnerShipSelector from '../components/GameOwnershipSelector'
import { filterGameProperties } from '../utils/filterGameProperties'
import { IGDB_USER_KEY } from '../../.env.json'
import Loading from '../components/Loading'

const Game = ({ navigation }: { navigation: NavigationStackProp }) => {
    const gameParam: SavedGame = navigation.getParam('game')
    const mode: 'storedGame' | 'newGame' = navigation.getParam('mode', 'storedGame')
    const route: GameRoute = navigation.getParam('route')

    const [game, setGame] = useState(gameParam)

    const [loading, setLoading] = useState(false)

    const [ownership, setOwnership] = useState<Ownership>(
        mode === 'storedGame' ? game.ownership : route && route.key === 'wishList' ? 'wishList' : 'owned'
    )
    const [status, setStatus] = useState<GameStatus>(
        mode === 'storedGame' && game.status ? game.status : route && route.key !== 'wishList' ? route.key : 'backlog'
    )
    const [canUpdate, setCanUpdate] = useState(false)
    const [progress, setProgress] = useState(mode === 'storedGame' && game.progress ? game.progress : 0)

    const accumulator: PlatformsAccumulator = {}
    const defaultSelected = game.platforms
        ? game.platforms.reduce((obj, acc) => {
              const owned = game.ownedPlatforms && game.ownedPlatforms.find(g => g.platform.slug === acc.platform.slug)
              obj[acc.platform.slug] = owned
                  ? { ...owned.platform, selected: true }
                  : game.platforms && game.platforms.length === 1
                  ? { ...acc.platform, selected: true }
                  : { ...acc.platform, selected: false }
              return obj
          }, accumulator)
        : {}

    const [selectedPlatForms, setSelectedPlatForms] = useState(defaultSelected)

    useEffect(() => {
        const currSelectedPlatforms = Object.values(selectedPlatForms)
            .filter(p => p.selected)
            .map(p => p.slug)
        const ownedPlatforms = game.ownedPlatforms ? game.ownedPlatforms.map(p => p.platform.slug) : []
        const hasEqualPlatforms = arrayCompare(currSelectedPlatforms, ownedPlatforms)
        const hasEqualStatus = game.status === status || !game.status
        const hasEqualProgress = game.progress === progress || !game.progress
        const hasEqualOwnership = game.ownership === ownership

        const itCanUpdate =
            (!hasEqualPlatforms || !hasEqualStatus || !hasEqualProgress || !hasEqualOwnership) &&
            (currSelectedPlatforms.length > 0 || ownership === 'wishList')

        setCanUpdate(itCanUpdate)
    }, [
        selectedPlatForms,
        status,
        progress,
        game.ownedPlatforms,
        game.status,
        game.progress,
        game.ownership,
        ownership,
        mode
    ])

    useEffect(() => {
        if (mode === 'newGame') {
            loadGame()
        }
    }, [])

    async function loadGame() {
        const detailedGame: SavedGame = await loadGameDetails(gameParam.id.toString())
        setGame(detailedGame)
    }

    async function loadGameDetails(id: string) {
        setLoading(true)
        const url = `https://api.rawg.io/api/games/${id}`
        const response = await fetch(url, {
            headers: {
                'User-Agent': 'game-backlog-idea'
            }
        })
        const gameApi: SavedGame = await response.json()
        const coverImgId = await loadGameCover(gameApi)

        setLoading(false)
        return coverImgId ? { ...gameApi, coverImgId } : gameApi
    }

    async function loadGameCover(gameRawg: SavedGame) {
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

    function handleSelectedPlatforms(selected: SelectedPlatform) {
        setSelectedPlatForms({
            ...selectedPlatForms,
            [selected.slug]: { ...selected, selected: !selected.selected }
        })
    }
    async function saveGame() {
        const now = new Date().getTime()
        const ownedPlatforms = Object.values(selectedPlatForms)
            .filter(p => p.selected)
            .map(({ id, name, slug }) => ({
                platform: { id, name, slug }
            }))

        let gameToSave: SavedGame

        if (mode === 'newGame') {
            const filteredGame = filterGameProperties(game)

            gameToSave = {
                ...filteredGame,
                ownership
            }
            if (game.coverImgId) {
                gameToSave.coverImgId = game.coverImgId
            }
        } else {
            gameToSave = {
                ...game,
                ownership
            }
        }

        if (ownership === 'owned') {
            gameToSave.status = status
            gameToSave.progress = progress
            gameToSave.ownedPlatforms = ownedPlatforms
        }
        if (ownership === 'wishList') {
            gameToSave.ownedPlatforms = []
        }

        if (mode === 'newGame') {
            gameToSave.savedTs = now
        }
        if (mode === 'storedGame') {
            gameToSave.updatedTs = now
        }

        await storeGame(game.id.toString(), gameToSave)
        if (Platform.OS === 'android') {
            ToastAndroid.show(getText('gameSaved'), ToastAndroid.SHORT)
        }

        if (mode === 'newGame') {
            navigation.dispatch(
                StackActions.reset({
                    index: 1,
                    actions: [
                        NavigationActions.navigate({ routeName: getText('home') }),
                        NavigationActions.navigate({ routeName: getText('newGame') })
                    ]
                })
            )
        } else {
            const tabRoute = ownership === 'owned' ? status : ownership

            navigation.dispatch(
                StackActions.reset({
                    index: 1,
                    actions: [
                        NavigationActions.navigate({ routeName: getText('home'), params: { tabKey: tabRoute } }),
                        NavigationActions.navigate({
                            routeName: getText('game'),
                            params: { game: gameToSave, mode, route }
                        })
                    ]
                })
            )
        }
    }
    let gameCardProps: any = {}

    if (mode === 'newGame') {
        gameCardProps.collapsed = true
    }

    async function deleteGame() {
        await removeGame(game.id.toString())
        if (Platform.OS === 'android') {
            ToastAndroid.show(getText('gameRemoved'), ToastAndroid.SHORT)
        }

        const tabRoute = ownership === 'owned' ? status : ownership
        navigation.dispatch(
            StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({ routeName: getText('home'), params: { tabKey: tabRoute } })]
            })
        )
    }

    if (loading) {
        return <Loading />
    }

    return (
        <ScrollView>
            <Container>
                <GameCard game={game} cover extraInfo {...gameCardProps} />
                <Divider />
                <Card style={{ padding: 20 }}>
                    <GameOwnerShipSelector ownership={ownership} setOwnership={setOwnership} />
                </Card>
                <Divider />

                <Card style={{ padding: 20 }}>
                    {ownership === 'owned' && (
                        <View>
                            <View style={{ marginBottom: 10 }}>
                                <PlatformTags
                                    platforms={game.platforms || []}
                                    selected={selectedPlatForms}
                                    handleChip={handleSelectedPlatforms}
                                    disabled={game.platforms ? game.platforms.length === 1 : false}
                                />
                            </View>
                            <View style={{ marginBottom: 10 }}>
                                <GameStatusSelector status={status} setStatus={setStatus} />
                            </View>

                            {(status === 'inProgress' || status === 'played') && (
                                <View style={{ marginBottom: 10 }}>
                                    <GameProgressSlider game={game} progress={progress} setProgress={setProgress} />
                                </View>
                            )}
                        </View>
                    )}
                    <View style={{ flexDirection: 'row' }}>
                        {mode === 'storedGame' && (
                            <Button mode="outlined" onPress={deleteGame} style={{ flex: 1 }} color={Colors.red300}>
                                {getText('delete')}
                            </Button>
                        )}

                        <Button mode="outlined" onPress={saveGame} disabled={!canUpdate} style={{ flex: 1 }}>
                            {mode === 'storedGame' ? getText('update') : getText('save')}
                        </Button>
                    </View>
                </Card>
            </Container>
        </ScrollView>
    )
}

export default withNavigation(Game)
