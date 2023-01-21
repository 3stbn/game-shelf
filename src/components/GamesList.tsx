import React from 'react'

import { Dimensions, FlatList, SafeAreaView } from 'react-native'
import GameCard from '../components/GameCard'
import GameTile from '../components/GameTile'

import { GamesListViewType, SavedGame } from '../types'

const WIDTH = Dimensions.get('screen').width

const GamesList = ({ games, viewType }: { games: Array<SavedGame>; viewType: GamesListViewType }) => (
  <SafeAreaView style={{ flex: 1 }}>
    {viewType === 'list' && (
      <FlatList
        keyboardShouldPersistTaps={'handled'}
        data={games}
        keyExtractor={item => item.slug}
        renderItem={({ item }) => (
          <GameCard
            pressable
            game={item}
            showProgress
            style={{ marginHorizontal: 8, marginVertical: 4 }}
            mode="compact"
          />
        )}
      />
    )}
    {viewType === 'grid' && (
      <FlatList
        data={games}
        numColumns={WIDTH > 320 ? 4 : WIDTH > 250 ? 3 : 2}
        keyExtractor={item => item.slug}
        renderItem={({ item }) => <GameTile game={item} width={WIDTH > 340 ? '25%' : WIDTH > 250 ? '33%' : '50%'} />}
      />
    )}
  </SafeAreaView>
)

export default GamesList
