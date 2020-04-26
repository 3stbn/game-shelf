import React, { ReactNode } from 'react'
import { View, StyleSheet } from 'react-native'

const Container = ({ children }: { children: ReactNode }) => <View style={styles.container}>{children}</View>

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15
    }
})

export default Container
