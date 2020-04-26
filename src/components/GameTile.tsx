import React from 'react'

import { SavedGame } from '../types'
import { View, StyleSheet } from 'react-native'
import { getText } from '../utils/locale'
import GameImageTile from '../components/GameImageTile'
import { Surface, Caption, TouchableRipple } from 'react-native-paper'

import { truncate } from '../utils/string'
import { withNavigation } from 'react-navigation'
import { NavigationStackProp } from 'react-navigation-stack'
import GameProgress from './GameProgress'

function GameTile({
    game,
    width,
    navigation
}: {
    game: SavedGame
    width?: number | string
    navigation: NavigationStackProp
}) {
    return (
        <View style={{ width: width ? width : '100%', alignItems: 'center' }}>
            <Surface style={styles.surface}>
                <TouchableRipple
                    borderless
                    onPress={() => {
                        navigation.navigate(getText('game'), { game })
                    }}
                    style={{ minHeight: 135, borderRadius: 10 }}
                >
                    <View>
                        <GameImageTile game={game} noMargin />
                        <Caption
                            style={{
                                paddingLeft: 3,
                                paddingRight: 3,
                                paddingTop: 5,
                                textAlign: 'center',
                                lineHeight: 11,
                                fontSize: 10
                            }}
                        >
                            {truncate(game.name, 15)}
                        </Caption>
                        <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                            <GameProgress game={game} />
                        </View>
                    </View>
                </TouchableRipple>
            </Surface>
        </View>
    )
}

const styles = StyleSheet.create({
    surface: {
        alignItems: 'center',
        justifyContent: 'flex-start',
        elevation: 12,
        borderRadius: 10,
        marginTop: 10,
        width: 75,
        minHeight: 135,
        maxHeight: 135
    }
})

export default withNavigation(GameTile)
