import React from 'react'

import GameCard from '../components/GameCard'
import GameTile from '../components/GameTile'
import { FlatList, SafeAreaView, Dimensions } from 'react-native'

import { SavedGame, GamesListViewType } from '../types'

const WIDTH = Dimensions.get('screen').width

const GamesList = ({ games, viewType }: { games: Array<SavedGame>; viewType: GamesListViewType }) => (
    <SafeAreaView style={{ flex: 1 }}>
        {viewType === 'list' && (
            <FlatList
                data={games}
                keyExtractor={item => item.slug}
                renderItem={({ item }) => <GameCard pressable game={item} showProgress />}
            />
        )}
        {viewType === 'grid' && (
            <FlatList
                data={games}
                numColumns={WIDTH > 320 ? 4 : WIDTH > 250 ? 3 : 2}
                keyExtractor={item => item.slug}
                renderItem={({ item }) => (
                    <GameTile game={item} width={WIDTH > 340 ? '25%' : WIDTH > 250 ? '33%' : '50%'} />
                )}
            />
        )}
    </SafeAreaView>
)

export default GamesList
