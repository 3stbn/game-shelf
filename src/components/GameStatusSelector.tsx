import React from 'react'
import { ScrollView, View, StyleSheet } from 'react-native'
import { RadioButton, Caption, TouchableRipple, Colors } from 'react-native-paper'
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
    return (
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <TouchableRipple borderless onPress={() => setStatus('backlog')} style={styles.checkbox}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <RadioButton
                        disabled={disabled}
                        color={Colors.deepPurple300}
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
                        color={Colors.deepPurple300}
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
                        color={Colors.deepPurple300}
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
                        color={Colors.deepPurple300}
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

        borderColor: Colors.grey100,
        borderWidth: 1,
        marginLeft: 3
    }
})
