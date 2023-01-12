import React from 'react'

import { Button, Title, Subheading, Divider } from 'react-native-paper'
import { getText } from '../utils/locale'
import { withNavigation } from 'react-navigation'
import { NavigationStackProp } from 'react-navigation-stack'
import { Image, View, Dimensions } from 'react-native'

const WIDTH = Dimensions.get('window').width

function NoGamesBanner({ navigation }: { navigation: NavigationStackProp }) {
  let styleProps: any = {}
  if (WIDTH > 360) {
    styleProps.style = {
      width: WIDTH,
      resizeMode: 'contain'
    }
  } else {
    styleProps.style = {
      width: WIDTH,
      height: 120,
      resizeMode: 'contain'
    }
  }
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
      <Image source={require('../assets/starter-bg-video-tracker.png')} {...styleProps} />

      <Title
        style={{
          marginTop: 20
          //color: Colors.grey800
        }}
      >
        {getText('welcome')} !
      </Title>
      <Divider />

      <Subheading
        style={{
          textAlign: 'center',
          //   color: Colors.grey600,
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
