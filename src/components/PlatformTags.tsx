import React from 'react'
import { ScrollView, View } from 'react-native'
import { PlatformsAccumulator, Platform } from '../types'
import { Chip, Caption } from 'react-native-paper'

const PlatformTags = ({
    platforms,
    disabled,
    selected,
    handleChip,
    horizontal
}: {
    platforms?: Array<Platform>
    disabled?: boolean
    selected?: PlatformsAccumulator
    handleChip?: Function
    horizontal?: boolean
}) => {
    return (
        <ScrollView horizontal={horizontal} showsHorizontalScrollIndicator={false}>
            {platforms && (
                <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                    {platforms.map(({ platform }) => (
                        <Chip
                            mode="flat"
                            key={platform.id}
                            selected={selected && selected[platform.slug] ? selected[platform.slug].selected : false}
                            onPress={() => (handleChip && selected ? handleChip(selected[platform.slug]) : null)}
                            disabled={disabled}
                            style={{ height: 30 }}
                        >
                            <Caption>{platform.name}</Caption>
                        </Chip>
                    ))}
                </View>
            )}
        </ScrollView>
    )
}

export default PlatformTags
