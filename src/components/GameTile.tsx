import React from 'react'

import { StyleSheet, View, ViewStyle } from 'react-native'
import { Caption, Surface, TouchableRipple } from 'react-native-paper'
import GameImageTile from '../components/GameImageTile'
import { SavedGame } from '../types'
import { getText } from '../utils/locale'

import { StyleProp } from 'react-native'
import { withNavigation } from 'react-navigation'
import { NavigationStackProp } from 'react-navigation-stack'
import { truncate } from '../utils/string'
import GameProgress from './GameProgress'

function GameTile({
  game,
  width,
  navigation,
  style = {}
}: {
  game: SavedGame
  width?: number | string
  navigation: NavigationStackProp
  style?: StyleProp<ViewStyle>
}) {
  return (
    <View style={[{ width: width ? width : '100%', alignItems: 'center' }, style]}>
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
