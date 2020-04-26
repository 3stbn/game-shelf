import React from 'react'
import { View } from 'react-native'
import { ActivityIndicator } from 'react-native-paper'

const Loading = () => {
    return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
            <ActivityIndicator />
        </View>
    )
}

export default Loading
