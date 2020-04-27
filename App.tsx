import Home from './src/Home'
import 'react-native-gesture-handler'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { getText } from './src/utils/locale'
import NewGame from './src/screens/NewGameSearch'
import Game from './src/screens/Game'
import SearchGame from './src/screens/SearchGame'

const AppNavigator = createStackNavigator({
    [getText('home')]: {
        screen: Home
    },
    [getText('newGame')]: {
        screen: NewGame
    },
    [getText('game')]: {
        screen: Game
    },
    [getText('searchGame')]: {
        screen: SearchGame
    }
})

export default createAppContainer(AppNavigator)
