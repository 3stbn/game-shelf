/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'

import { View, Dimensions } from 'react-native'
import NewGameFab from './components/NewGameFab'
import { getGames } from './utils/localStorage'
import { SavedGame, GameRoute, Platform, PlatformsAccumulator, SelectedPlatform } from './types'
import { withNavigation } from 'react-navigation'
import { NavigationStackProp } from 'react-navigation-stack'
import { TabView, TabBar } from 'react-native-tab-view'
import { getText } from './utils/locale'
import GamesList from './components/GamesList'
import { Colors, IconButton } from 'react-native-paper'
import NoGamesBanner from './components/NoGamesBanner'
import PlatformTags from './components/PlatformTags'

import _ from 'lodash'

const initialLayout = { width: Dimensions.get('window').width, flex: 1 }

const defaultRoutes: Array<GameRoute> = [
    { key: 'backlog', title: getText('backlog') },
    { key: 'inProgress', title: getText('inProgress') },
    { key: 'played', title: getText('played') },
    { key: 'completed', title: getText('completed') },
    { key: 'wishList', title: getText('wishList') }
]

function Home({ navigation }: { navigation: NavigationStackProp }) {
    const tabKey = navigation.getParam('tabKey')

    //TODO.. fix loading issue
    const [games, setGames] = useState<Array<SavedGame>>([])

    const [platforms, setPlatforms] = useState<Array<Platform>>([])

    const [filteredGames, setFilteredGames] = useState<Array<SavedGame>>([])

    const accumulator: PlatformsAccumulator = {}

    const [selectedPlatForms, setSelectedPlatForms] = useState(accumulator)

    function handleSelectedPlatforms(selected: SelectedPlatform) {
        setSelectedPlatForms({
            ...selectedPlatForms,
            [selected.slug]: { ...selected, selected: !selected.selected }
        })
    }

    const [index, setIndex] = useState(0)
    const [routes, setRoutes] = useState(defaultRoutes)

    const [backlogGames, setBacklogGames] = useState<Array<SavedGame>>([])
    const [inProgressGames, setInProgressGames] = useState<Array<SavedGame>>([])
    const [playedGames, setPlayedGames] = useState<Array<SavedGame>>([])
    const [completedGames, setCompletedGames] = useState<Array<SavedGame>>([])
    const [wishListGames, setWishlistGames] = useState<Array<SavedGame>>([])

    useEffect(() => {
        const navigationFocusListener = navigation.addListener('didFocus', () => {
            loadGames()
        })
        return () => navigationFocusListener.remove()
    }, [])

    useEffect(() => {
        setBacklogGames(filteredGames.filter(g => g.ownership === 'owned' && g.status === 'backlog'))
        setInProgressGames(filteredGames.filter(g => g.ownership === 'owned' && g.status === 'inProgress'))
        setPlayedGames(filteredGames.filter(g => g.ownership === 'owned' && g.status === 'played'))
        setCompletedGames(filteredGames.filter(g => g.ownership === 'owned' && g.status === 'completed'))
        setWishlistGames(filteredGames.filter(g => g.ownership === 'wishList'))
    }, [filteredGames])

    useEffect(() => {
        setRoutes(
            defaultRoutes.filter(r => {
                switch (r.key) {
                    case 'backlog':
                        return backlogGames.length > 0
                    case 'inProgress':
                        return inProgressGames.length > 0
                    case 'played':
                        return playedGames.length > 0
                    case 'completed':
                        return completedGames.length > 0
                    case 'wishList':
                        return wishListGames.length > 0
                }
            })
        )
    }, [backlogGames, inProgressGames, playedGames, completedGames, wishListGames])

    const renderScene = ({ route }: { route: GameRoute }) => {
        switch (route.key) {
            case 'backlog':
                return <GamesList games={backlogGames} viewType="grid" />
            case 'inProgress':
                return <GamesList games={inProgressGames} viewType="grid" />
            case 'played':
                return <GamesList games={playedGames} viewType="grid" />
            case 'completed':
                return <GamesList games={completedGames} viewType="grid" />
            case 'wishList':
                return <GamesList games={wishListGames} viewType="grid" />

            default:
                return null
        }
    }

    function tabRedirect() {
        if (tabKey) {
            const idx = defaultRoutes.findIndex(r => r.key === tabKey)
            setIndex(idx)
        }
    }
    useEffect(() => {
        tabRedirect()
        loadGames()
    }, [])

    useEffect(() => {
        const selectedP = Object.values(selectedPlatForms)
            .filter(p => p.selected)
            .map(p => p.slug)

        const filtered =
            selectedP.length > 0
                ? games.filter(g => g.ownedPlatforms.some(p => selectedP.includes(p.platform.slug)))
                : games

        setFilteredGames(filtered)
    }, [selectedPlatForms, games])

    async function loadGames() {
        const storageGames: Array<SavedGame> = await getGames()

        const ownedPlatforms = _.uniqBy(
            _.flatten(storageGames.filter(g => g.ownedPlatforms.length > 0).map(g => g.ownedPlatforms)),
            platform => platform && platform.platform.slug
        )

        const defaultSelected = ownedPlatforms.reduce((obj, acc) => {
            obj[acc.platform.slug] = { ...acc.platform, selected: false }
            return obj
        }, accumulator)

        setPlatforms(ownedPlatforms)
        setSelectedPlatForms(defaultSelected)

        setGames(storageGames)
    }

    if (games.length === 0) {
        return <NoGamesBanner />
    }

    return (
        <View style={{ flex: 1 }}>
            <TabView
                tabBarPosition="top"
                renderTabBar={props => (
                    <View>
                        <View>
                            <TabBar
                                {...props}
                                style={{
                                    backgroundColor: Colors.white,
                                    borderBottomColor: Colors.deepPurple300,
                                    borderBottomWidth: 1,
                                    borderTopColor: Colors.deepPurple200,
                                    borderTopWidth: 1
                                }}
                                scrollEnabled
                                tabStyle={{ backgroundColor: Colors.white }}
                                activeColor={Colors.deepPurple600}
                                inactiveColor={Colors.deepPurple100}
                                pressColor={Colors.deepPurple200}
                                renderIcon={({ route, color }) => (
                                    <IconButton
                                        style={{ margin: 0 }}
                                        icon={
                                            route.key === 'backlog'
                                                ? 'library-shelves'
                                                : route.key === 'inProgress'
                                                ? 'gamepad-variant'
                                                : route.key === 'played'
                                                ? 'gamepad'
                                                : route.key === 'completed'
                                                ? 'checkbox-marked-circle-outline'
                                                : 'heart'
                                        }
                                        color={color}
                                        size={20}
                                    />
                                )}
                            />
                        </View>

                        <View
                            style={{
                                paddingTop: 15,
                                paddingBottom: 15,
                                paddingLeft: 15,
                                flexDirection: 'row'
                            }}
                        >
                            <PlatformTags
                                platforms={platforms}
                                horizontal
                                selected={selectedPlatForms}
                                handleChip={handleSelectedPlatforms}
                            />

                            <IconButton
                                icon="magnify"
                                color={Colors.deepPurple400}
                                size={24}
                                style={{ marginTop: -3 }}
                                onPress={() => {
                                    navigation.navigate(getText('searchGame'), { games })
                                }}
                            />
                        </View>
                    </View>
                )}
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                initialLayout={initialLayout}
            />

            <NewGameFab currentRoute={routes.find((r, idx) => idx === index) || routes[0]} />
        </View>
    )
}

export default withNavigation(Home)
