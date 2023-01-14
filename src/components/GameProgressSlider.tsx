import React from 'react'

import Slider from '@react-native-community/slider'
import { View } from 'react-native'
import { Caption, MD2Colors as Colors } from 'react-native-paper'
import { Game, SavedGame } from '../types'
import { getText } from '../utils/locale'
const GameProgressSlider = ({
  progress,
  setProgress,
  disabled,
  game
}: {
  progress: number
  setProgress: (progress: number) => void
  disabled?: boolean
  game: Game | SavedGame
}) => {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
      {game.playtime !== 0 && (
        <Caption>
          {((game.playtime * progress) / 100).toFixed(2)} - {getText('hours')}
        </Caption>
      )}
      <Slider
        disabled={disabled}
        style={{ flex: 1, marginRight: 10, marginLeft: 10 }}
        minimumValue={0}
        maximumValue={100}
        value={progress}
        minimumTrackTintColor={Colors.deepPurple500}
        maximumTrackTintColor={Colors.deepPurple100}
        thumbTintColor={Colors.deepPurple500}
        onSlidingComplete={setProgress}
      />
      <Caption>{progress.toFixed(0)} %</Caption>
    </View>
  )
}

export default GameProgressSlider
