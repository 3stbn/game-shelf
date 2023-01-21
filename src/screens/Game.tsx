/* eslint-disable react-hooks/exhaustive-deps */
import _ from 'lodash'
import React, { useEffect, useState } from 'react'
import { Platform, ScrollView, ToastAndroid, View } from 'react-native'
import { Button, Caption, Card, Divider, MD2Colors as Colors } from 'react-native-paper'
import { NavigationActions, StackActions, withNavigation } from 'react-navigation'
import { NavigationStackProp } from 'react-navigation-stack'
import Container from '../components/Container'
import GameCard from '../components/GameCard'
import GameOwnerShipSelector from '../components/GameOwnershipSelector'
import GameProgressSlider from '../components/GameProgressSlider'
import GameStatusSelector from '../components/GameStatusSelector'
import Loading from '../components/Loading'
import PlatformTags from '../components/PlatformTags'
import { GameRoute, GameStatus, Ownership, PlatformsAccumulator, SavedGame, SelectedPlatform } from '../types'
import { arrayCompare } from '../utils/array'
import { getGame } from '../utils/client'
import { filterGameProperties } from '../utils/filterGameProperties'
import { getText } from '../utils/locale'
import { removeGame, storeGame } from '../utils/localStorage'

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
    ? game.platforms.reduce((obj, curr, idx) => {
        const owned = game.ownedPlatforms && game.ownedPlatforms.find(g => g.platform.slug === curr.platform.slug)
        obj[curr.platform.slug] = owned
          ? { ...owned.platform, selected: true }
          : mode === 'newGame' && game.platforms && game.platforms.length > 0 && idx === 0
          ? { ...curr.platform, selected: true }
          : { ...curr.platform, selected: false }
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
    const hasEqualProgress = game.progress === progress || _.isNil(game.progress)
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
    const gameApi = await getGame(id)

    setLoading(false)
    return gameApi
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

    const gameContent = mode === 'newGame' ? filterGameProperties(game) : game

    let gameToSave: SavedGame = {
      ...gameContent,
      ownership,
      ownedPlatforms: ownership === 'owned' ? ownedPlatforms : [],
      savedTs: mode === 'newGame' ? now : game.savedTs,
      updatedTs: now
    }

    if (mode === 'newGame') {
      if (game.coverImgId) {
        gameToSave.coverImgId = game.coverImgId
      }
    }

    if (ownership === 'owned') {
      gameToSave.status = status
      gameToSave.progress = progress
    }

    await storeGame(game.id.toString(), gameToSave)
    if (Platform.OS === 'android') {
      ToastAndroid.show(getText('gameSaved'), ToastAndroid.SHORT)
    }

    const tabRoute = ownership === 'owned' ? status : ownership

    if (mode === 'newGame') {
      navigation.dispatch(
        StackActions.reset({
          index: 1,
          actions: [
            NavigationActions.navigate({ routeName: getText('home'), params: { tabKey: tabRoute, route } }),
            NavigationActions.navigate({ routeName: getText('newGame') })
          ]
        })
      )
    } else {
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
        <GameCard
          game={game}
          cover
          style={{
            marginVertical: 10
          }}
        />
        <Divider />
        <Card style={{ padding: 20, marginVertical: 10 }}>
          <GameOwnerShipSelector ownership={ownership} setOwnership={setOwnership} />
        </Card>
        <Divider />

        <Card style={{ padding: 20, marginVertical: 10 }}>
          {ownership === 'owned' && (
            <View>
              <View style={{ marginBottom: 10 }}>
                {mode === 'newGame' && <Caption style={{ marginLeft: 8 }}>{getText('platformsDescription')}</Caption>}
                <PlatformTags
                  platforms={game.platforms || []}
                  selected={selectedPlatForms}
                  handleChip={handleSelectedPlatforms}
                  disabled={(game.platforms && game.platforms.length === 1) || null}
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
