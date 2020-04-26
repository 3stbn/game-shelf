import React from 'react'

import { IconButton, Colors } from 'react-native-paper'
import { GamesListViewType } from '../types'

const SetListView = ({ listView, setListView }: { listView: GamesListViewType; setListView: Function }) => {
    return (
        <IconButton
            style={{ margin: 0 }}
            icon={listView === 'list' ? 'apps' : 'format-list-bulleted'}
            color={Colors.deepPurple800}
            size={22}
            onPress={() => setListView(listView === 'list' ? 'grid' : 'list')}
        />
    )
}

export default SetListView
