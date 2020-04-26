import React from 'react'

import GameCard from '../components/GameCard'
import GameTile from '../components/GameTile'
import { FlatList, SafeAreaView } from 'react-native'

import { SavedGame, GamesListViewType } from '../types'

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
                numColumns={4}
                keyExtractor={item => item.slug}
                renderItem={({ item }) => <GameTile game={item} width="25%" />}
            />
        )}
    </SafeAreaView>
)

export default GamesList
