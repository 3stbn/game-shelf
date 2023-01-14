import React from 'react'
import { StyleSheet } from 'react-native'
import { FAB, MD2Colors as Colors } from 'react-native-paper'
import { withNavigation } from 'react-navigation'
import { NavigationStackProp } from 'react-navigation-stack'
import { getText } from '../utils/locale'
import { GameRoute } from '../types'

const NewGameFab = ({ navigation, currentRoute }: { navigation: NavigationStackProp; currentRoute: GameRoute }) => {
  return (
    <FAB
      small
      style={styles.fab}
      icon="plus"
      onPress={() => navigation.navigate(getText('newGame'), { route: currentRoute })}
    />
  )
}

const styles = StyleSheet.create({
  fab: {
    backgroundColor: Colors.deepPurple400,
    color: Colors.white,
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0
  }
})
export default withNavigation(NewGameFab)
