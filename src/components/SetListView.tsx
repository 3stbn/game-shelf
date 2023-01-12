import React from 'react'

import { IconButton } from 'react-native-paper'
import { GamesListViewType } from '../types'

//TODO: implement when performance is improved and stored as a setting
const SetListView = ({ listView, setListView }: { listView: GamesListViewType; setListView: Function }) => {
  return (
    <IconButton
      style={{ margin: 0 }}
      icon={listView === 'list' ? 'apps' : 'format-list-bulleted'}
      //   color={Colors.deepPurple400}
      size={22}
      onPress={() => setListView(listView === 'list' ? 'grid' : 'list')}
    />
  )
}

export default SetListView
