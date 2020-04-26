import React from 'react'

import { View } from 'react-native'
import { Game } from '../types'
import { Image } from 'react-native'

function GameImageTile({ game, noMargin, mode }: { game: Game; noMargin?: boolean; mode?: 'list' | 'tile' }) {
    const bigCover = `https://images.igdb.com/igdb/image/upload/t_cover_big/${game.coverImgId}.jpg`
    const thumbCover = `https://images.igdb.com/igdb/image/upload/t_thumb/${game.coverImgId}.jpg`

    const imageDimensions = {
        width: mode === 'list' ? 40 : 75,
        height: mode === 'list' ? 50 : 100,
        borderRadius: 10
    }

    return (
        <View
            style={{
                ...imageDimensions,
                marginRight: noMargin ? 0 : 10
            }}
        >
            <Image
                source={
                    game.coverImgId
                        ? { uri: mode === 'tile' ? thumbCover : bigCover }
                        : game.background_image
                        ? { uri: game.background_image }
                        : 0
                }
                style={{ ...imageDimensions, resizeMode: 'cover' }}
            />
        </View>
    )
}

export default GameImageTile
