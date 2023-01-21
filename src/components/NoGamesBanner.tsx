import React from 'react'

import { Dimensions, Image, View } from 'react-native'
import { Button, Divider, MD2Colors as Colors, Subheading, Title } from 'react-native-paper'
import { withNavigation } from 'react-navigation'
import { NavigationStackProp } from 'react-navigation-stack'
import { getText } from '../utils/locale'

const WIDTH = Dimensions.get('window').width

function NoGamesBanner({ navigation }: { navigation: NavigationStackProp }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
      <Image
        source={require('../assets/starter-bg-video-tracker.png')}
        style={{
          width: WIDTH,
          resizeMode: 'contain',
          height: WIDTH > 360 ? undefined : 120
        }}
      />

      <Title
        style={{
          marginTop: 20,
          color: Colors.grey800
        }}
      >
        {getText('welcome')} !
      </Title>
      <Divider />

      <Subheading
        style={{
          textAlign: 'center',
          color: Colors.grey600,
          padding: 10,
          width: 250
        }}
      >
        {getText('noGamesDescription')}
      </Subheading>

      <Button icon="plus-box" mode="contained" onPress={() => navigation.navigate(getText('newGame'))}>
        {getText('addNewGame')}
      </Button>
    </View>
  )
}

export default withNavigation(NoGamesBanner)
