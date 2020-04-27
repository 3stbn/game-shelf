import React, { useState } from 'react'
import { View } from 'react-native'
import { Colors, TextInput, IconButton, Subheading } from 'react-native-paper'
import { NavigationStackProp } from 'react-navigation-stack'
import GamesList from '../components/GamesList'
import { SavedGame } from '../types'
import { getText } from '../utils/locale'

const SearchGame = ({ navigation }: { navigation: NavigationStackProp }) => {
    const games: Array<SavedGame> = navigation.getParam('games', [])
    const [search, setSearch] = useState('')
    const [filteredGames, setFilteredGames] = useState<Array<SavedGame>>(games)

    function handleSearch(text: string) {
        setSearch(text)
        const searchResult = games.filter(({ name }) => {
            return !search || name.toLowerCase().includes(search.toLowerCase())
        })
        setFilteredGames(searchResult)
    }

    return (
        <View style={{ flex: 1 }}>
            <View
                style={{
                    paddingTop: 15,
                    paddingBottom: 15,
                    paddingLeft: 15,
                    flexDirection: 'row'
                }}
            >
                <TextInput style={{ flex: 1 }} autoFocus value={search} onChangeText={handleSearch} />

                <IconButton
                    icon={'close'}
                    color={Colors.teal400}
                    size={24}
                    style={{ marginTop: 10 }}
                    onPress={() => {
                        navigation.goBack()
                    }}
                />
            </View>
            <View style={{ flex: 1 }}>
                {filteredGames.length === 0 && (
                    <Subheading style={{ padding: 15 }}>{getText('noSearchResults')}</Subheading>
                )}
                <GamesList games={filteredGames} viewType="list" />
            </View>
        </View>
    )
}

export default SearchGame
