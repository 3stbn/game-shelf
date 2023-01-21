import React from 'react'

import { IconButton } from 'react-native-paper'
import { MD2Colors as Colors } from 'react-native-paper'
//TODO: feature sort games
const SetListView = () => {
  return (
    <IconButton
      style={{ margin: 0 }}
      icon="sort-descending"
      iconColor={Colors.deepPurple400}
      size={22}
      onPress={() => null}
    />
  )
}

export default SetListView
