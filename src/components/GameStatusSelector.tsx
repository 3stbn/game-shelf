import React from 'react'
import { ScrollView, View, StyleSheet } from 'react-native'
import { RadioButton, Caption, TouchableRipple, useTheme } from 'react-native-paper'
import { getText } from '../utils/locale'
import { GameStatus } from '../types'

export default function GameTypeSelector({
  status,
  setStatus,
  disabled
}: {
  status: GameStatus
  setStatus: Function
  disabled?: boolean
}) {
  const {
    colors: { primary: primaryColor }
  } = useTheme()
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <TouchableRipple borderless onPress={() => setStatus('backlog')} style={styles.checkbox}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <RadioButton
            disabled={disabled}
            color={primaryColor}
            value="backlog"
            status={status === 'backlog' ? 'checked' : 'unchecked'}
            onPress={() => {
              setStatus('backlog')
            }}
          />

          <Caption>{getText('backlog')}</Caption>
        </View>
      </TouchableRipple>
      <TouchableRipple borderless onPress={() => setStatus('inProgress')} style={styles.checkbox}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <RadioButton
            disabled={disabled}
            color={primaryColor}
            value="inProgress"
            status={status === 'inProgress' ? 'checked' : 'unchecked'}
            onPress={() => {
              setStatus('inProgress')
            }}
          />
          <Caption>{getText('inProgress')}</Caption>
        </View>
      </TouchableRipple>
      <TouchableRipple borderless onPress={() => setStatus('completed')} style={styles.checkbox}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <RadioButton
            disabled={disabled}
            value="completed"
            color={primaryColor}
            status={status === 'completed' ? 'checked' : 'unchecked'}
            onPress={() => {
              setStatus('completed')
            }}
          />
          <Caption>{getText('completed')}</Caption>
        </View>
      </TouchableRipple>
      <TouchableRipple borderless onPress={() => setStatus('played')} style={styles.checkbox}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <RadioButton
            disabled={disabled}
            value="played"
            color={primaryColor}
            status={status === 'played' ? 'checked' : 'unchecked'}
            onPress={() => {
              setStatus('played')
            }}
          />
          <Caption>{getText('played')}</Caption>
        </View>
      </TouchableRipple>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  checkbox: {
    flex: 1,
    borderRadius: 25,
    paddingRight: 8,
    borderWidth: 1,
    marginLeft: 3
  }
})
