import React from 'react'

import { View } from 'react-native'
import { Game } from '../types'
import { Image } from 'react-native'

function GameThumb({ game }: { game: Game }) {
    const thumbCover = `https://images.igdb.com/igdb/image/upload/t_thumb/${game.coverImgId}.jpg`
    return (
        <View
            style={{
                ...imageDimensions
            }}
        >
            <Image
                source={
                    game.coverImgId ? { uri: thumbCover } : game.background_image ? { uri: game.background_image } : 0
                }
                style={{ ...imageDimensions, resizeMode: 'cover' }}
            />
        </View>
    )
}

const imageDimensions = {
    width: 75,
    height: 100,
    borderRadius: 10
}

export default GameThumb
