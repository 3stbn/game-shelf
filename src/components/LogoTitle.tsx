import * as React from 'react'
import { Card, Colors } from 'react-native-paper'
import { Image } from 'react-native'

const LeftContent = () => <Image style={{ width: 40, resizeMode: 'contain' }} source={require('../assets/logo.png')} />

const LogoTitle = ({ title }: { title: string }) => (
    <Card.Title title={title} titleStyle={{ color: Colors.grey700 }} left={LeftContent} />
)

export default LogoTitle
