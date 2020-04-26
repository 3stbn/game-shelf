import Home from './src/Home'
import 'react-native-gesture-handler'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { getText } from './src/utils/locale'
import NewGame from './src/screens/NewGameSearch'
import Game from './src/screens/Game'

const AppNavigator = createStackNavigator({
    [getText('home')]: {
        screen: Home
    },
    [getText('newGame')]: {
        screen: NewGame
    },
    [getText('game')]: {
        screen: Game
    }
})

export default createAppContainer(AppNavigator)
