import React from 'react'
import { View } from 'react-native'
import { RadioButton, Caption, TouchableRipple, Colors } from 'react-native-paper'
import { getText } from '../utils/locale'
import { Ownership } from '../types'

export default function GameTypeSelector({
    ownership,
    setOwnership
}: {
    ownership: Ownership
    setOwnership: Function
}) {
    return (
        <View style={{ flexDirection: 'row' }}>
            <TouchableRipple onPress={() => setOwnership('owned')} style={{ flex: 1, borderRadius: 25 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <RadioButton
                        value="owned"
                        status={ownership === 'owned' ? 'checked' : 'unchecked'}
                        color={Colors.deepPurple300}
                        onPress={() => {
                            setOwnership('owned')
                        }}
                    />

                    <Caption>{getText('owned')}</Caption>
                </View>
            </TouchableRipple>
            <TouchableRipple onPress={() => setOwnership('wishList')} style={{ flex: 1, borderRadius: 25 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <RadioButton
                        value="wishList"
                        status={ownership === 'wishList' ? 'checked' : 'unchecked'}
                        onPress={() => {
                            setOwnership('wishList')
                        }}
                    />
                    <Caption>{getText('wishList')}</Caption>
                </View>
            </TouchableRipple>
        </View>
    )
}
