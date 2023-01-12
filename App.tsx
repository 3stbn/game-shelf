import React from 'react'
import Home from './src/Home'
import 'react-native-gesture-handler'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { getText } from './src/utils/locale'
import NewGame from './src/screens/NewGameSearch'
import Game from './src/screens/Game'
import SearchGame from './src/screens/SearchGame'
import LogoTitle from './src/components/LogoTitle'
import { Provider as PaperProvider } from 'react-native-paper'
const AppNavigator = createStackNavigator({
    [getText('home')]: {
        screen: Home,
        navigationOptions: {
            headerTitle: () => <LogoTitle title={getText('home')} />
        }
    },
    [getText('newGame')]: {
        screen: NewGame,
        navigationOptions: {
            headerTitle: () => <LogoTitle title={getText('newGame')} />
        }
    },
    [getText('game')]: {
        screen: Game,
        navigationOptions: {
            headerTitle: () => <LogoTitle title={getText('game')} />
        }
    },
    [getText('searchGame')]: {
        screen: SearchGame,
        navigationOptions: {
            headerTitle: () => <LogoTitle title={getText('searchGame')} />
        }
    }
})

const AppContainer = createAppContainer(AppNavigator)

const App = () => {
    return (
        <PaperProvider>
            <AppContainer />
        </PaperProvider>
    )
}

export default App
