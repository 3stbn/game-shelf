import { Route } from 'react-native-tab-view'

export interface Game {
    id: number
    name: string
    platforms: Array<Platform> | null
    coverImgId?: string
    released?: string
    background_image: string | null
    background_image_additional?: string | null
    genres?: Array<Genre>
    publishers: Array<Publisher>
    metacritic?: number | null
    slug: string
    playtime: number
    description_raw?: string
    metacritic_url?: string
    website?: string
}

export interface SavedGame extends Game {
    ownership: Ownership
    ownedPlatforms: Array<Platform>
    status?: GameStatus
    progress?: number
    savedTs: number
    updatedTs?: number
}

export type Ownership = 'owned' | 'wishList'

export type GameStatus = 'backlog' | 'inProgress' | 'played' | 'completed'

export type GamesListViewType = 'list' | 'grid'
export interface GameRoute extends Route {
    key: 'backlog' | 'inProgress' | 'completed' | 'wishList' | 'played'
}

export interface Platform {
    platform: PlatformItem
}

export interface PlatformsAccumulator {
    [key: string]: SelectedPlatform
}

export interface SelectedPlatform extends PlatformItem {
    selected: boolean
}

export interface PlatformItem {
    id: number
    name: string
    slug: string
}

export interface Genre {
    id: number
    name: string
    slug: string
    image_background: string
}

export interface Publisher {
    id: number
    name: string
    slug: string
    image_background: string
}

export interface LocalizationContent {
    [key: string]: {
        [key: string]: string
    }
}
