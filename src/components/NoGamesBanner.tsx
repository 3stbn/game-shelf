import React from 'react'
import { Image } from 'react-native'
import { Banner } from 'react-native-paper'
import { getText } from '../utils/locale'
import { withNavigation } from 'react-navigation'
import { NavigationStackProp } from 'react-navigation-stack'

function NoGamesBanner({
    navigation,
    showBanner,
    setShowBanner
}: {
    navigation: NavigationStackProp
    showBanner: boolean
    setShowBanner: Function
}) {
    return (
        <Banner
            visible={showBanner}
            actions={[
                {
                    label: getText('addNewGame'),
                    onPress: () => navigation.navigate(getText('newGame'))
                },
                {
                    label: getText('close'),
                    onPress: () => setShowBanner(true)
                }
            ]}
            icon={({ size }) => (
                <Image
                    source={{ uri: 'https://avatars3.githubusercontent.com/u/17571969?s=400&v=4' }}
                    style={{
                        width: size,
                        height: size
                    }}
                />
            )}
        >
            {getText('noGamesDescription')}
        </Banner>
    )
}

export default withNavigation(NoGamesBanner)
