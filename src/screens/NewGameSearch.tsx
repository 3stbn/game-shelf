import React, { useRef, useState } from 'react'
import { FlatList, TextInput as ReactTextInput, View } from 'react-native'
import {
  ActivityIndicator,
  Chip,
  Divider,
  IconButton,
  List,
  MD2Colors as Colors,
  Provider,
  Text,
  TextInput
} from 'react-native-paper'
import { withNavigation } from 'react-navigation'
import { NavigationStackProp } from 'react-navigation-stack'
import Container from '../components/Container'
import GameImageTile from '../components/GameImageTile'
import PlatformTags from '../components/PlatformTags'
import { Game, GameRoute } from '../types'
import { searchGames } from '../utils/client'
import { getText } from '../utils/locale'
import { retrieveGame } from '../utils/localStorage'

function NewGame({ navigation }: { navigation: NavigationStackProp }) {
  const route: GameRoute = navigation.getParam('route')

  const [search, setSearch] = useState('')
  const [timer, setTimer] = useState<NodeJS.Timeout>()
  const [games, setGames] = useState<Array<Game>>([])
  const [loading, setLoading] = useState(false)

  const searchRef = useRef<ReactTextInput>(null)

  async function queryGames(query: string) {
    const gamesApi = await searchGames(query)

    setLoading(false)
    setGames(gamesApi)
  }

  const handleSearch = (text: string) => {
    setSearch(text)
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

  async function handleGameSearch(selectedGame: Game) {
    const storageGame = await retrieveGame(selectedGame.id.toString())

    if (storageGame) {
      navigation.navigate(getText('game'), { game: storageGame, mode: 'storedGame', route })
    } else {
      navigation.navigate(getText('game'), { game: selectedGame, mode: 'newGame', route })
    }
  }

  return (
    <Provider>
      <Container>
        <View>
          <TextInput
            mode="outlined"
            label={getText('newGameName')}
            value={search}
            onChangeText={handleSearch}
            autoFocus
            ref={searchRef}
          />
          {loading && <ActivityIndicator style={{ marginLeft: -35, position: 'absolute', right: 15, top: 22 }} />}
          {search !== '' && !loading && (
            <IconButton
              style={{ position: 'absolute', right: 4, top: 9, zIndex: 99 }}
              icon="close"
              iconColor={Colors.deepPurple300}
              onPress={() => setSearch('')}
            />
          )}
        </View>

        <FlatList
          keyboardShouldPersistTaps={'handled'}
          data={games}
          keyExtractor={item => item.slug}
          renderItem={({ item: game }) => (
            <View>
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
                        <Chip style={{ marginTop: 2 }} disabled>
                          <Text
                            style={{
                              color: Colors.deepPurple300,
                              fontSize: 10
                            }}
                          >
                            {getText('released')} : {new Date(game.released).getFullYear()}
                          </Text>
                        </Chip>
                      )}
                    </View>
                  </View>
                )}
                left={() => <GameImageTile game={game} />}
              />
              <Divider />
            </View>
          )}
        />
      </Container>
    </Provider>
  )
}

export default withNavigation(NewGame)
