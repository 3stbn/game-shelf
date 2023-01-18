import React, { ReactNode } from 'react'

import { Card, List } from 'react-native-paper'

import { Animated, StyleProp, ViewStyle } from 'react-native'
import { MD2Colors as Colors } from 'react-native-paper'
import { withNavigation } from 'react-navigation'
import { NavigationStackProp } from 'react-navigation-stack'
import { SavedGame } from '../types'
import { getText } from '../utils/locale'
import { truncate } from '../utils/string'
import GameImageTile from './GameImageTile'
import GameProgress from './GameProgress'

function GameCard({
  game,
  children,
  cover,
  navigation,
  pressable,
  elevation,
  showProgress,
  style = {},
  mode = 'full'
}: {
  game: SavedGame
  children?: ReactNode
  cover?: boolean
  navigation: NavigationStackProp
  pressable?: boolean
  elevation?: 0 | 3 | 2 | 1 | 4 | 5 | (number & Animated.Value) | undefined
  showProgress?: boolean
  style?: StyleProp<ViewStyle>
  mode?: 'full' | 'compact'
}) {
  return (
    <Card
      style={[
        {
          padding: 12
        },
        style
      ]}
      onPress={pressable ? () => navigation.navigate(getText('game'), { game }) : undefined}
      elevation={elevation}
    >
      <Card.Title
        title={truncate(game.name, 25)}
        subtitle={`${getText('released')}: ${game.released}`}
        left={() => <GameImageTile game={game} mode="list" noMargin />}
      />
      {cover && (
        <Card.Cover
          source={
            game.coverImgId && game.background_image
              ? { uri: game.background_image }
              : game.background_image_additional
              ? { uri: game.background_image_additional }
              : game.background_image
              ? { uri: game.background_image }
              : 0
          }
        />
      )}
      {mode === 'full' && (
        <Card.Content style={{ paddingLeft: 0, paddingRight: 0 }}>
          {game.description_raw !== '' && (
            <List.Accordion
              title={getText('summary')}
              left={props => <List.Icon {...props} color={Colors.deepPurple300} icon="comment" />}
              /** @todo: workaround, either make it transparent or find the const color */
              style={{ backgroundColor: 'rgba(247,243,249,1)' }}
            >
              <List.Item
                style={{ marginTop: -25, paddingLeft: 20, paddingRight: 20 }}
                title={null}
                description={game.description_raw}
                descriptionNumberOfLines={150}
                left={() => null}
              />
            </List.Accordion>
          )}

          {game.metacritic && (
            <List.Item
              style={{ paddingTop: 0, paddingBottom: 0 }}
              title={`${getText('metaScore')} : ${game.metacritic}`}
              left={() => <List.Icon color={Colors.deepPurple300} icon="star" />}
            />
          )}
          {game.genres && game.genres?.length > 0 && (
            <List.Item
              style={{ paddingTop: 0, paddingBottom: 0 }}
              title={game.genres?.map((g, idx) => (idx + 1 === game.genres?.length ? g.name : `${g.name}  |  `))}
              left={() => <List.Icon color={Colors.deepPurple300} icon="dice-4" />}
              titleNumberOfLines={2}
            />
          )}
        </Card.Content>
      )}

      {showProgress && <GameProgress game={game} />}

      {children}
    </Card>
  )
}

export default withNavigation(GameCard)
