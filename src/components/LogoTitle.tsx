import * as React from 'react'
import { Title } from 'react-native-paper'
import { Image, View } from 'react-native'

const LogoTitle = ({ title }: { title: string }) => (
  <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
    <Image style={{ width: 35, resizeMode: 'contain' }} source={require('../assets/logo.png')} />
    <Title
      style={{
        // color: Colors.grey700,
        marginLeft: 10
      }}
    >
      {title}
    </Title>
  </View>
)

export default LogoTitle
