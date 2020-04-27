import React from 'react'

import { Banner } from 'react-native-paper'
import { getText } from '../utils/locale'
import { withNavigation } from 'react-navigation'
import { NavigationStackProp } from 'react-navigation-stack'

function NoGamesBanner({ navigation }: { navigation: NavigationStackProp }) {
    return (
        <Banner
            visible={true}
            actions={[
                {
                    label: getText('addNewGame'),
                    onPress: () => navigation.navigate(getText('newGame'))
                }
            ]}
            icon="gamepad"
        >
            {getText('noGamesDescription')}
        </Banner>
    )
}

export default withNavigation(NoGamesBanner)
