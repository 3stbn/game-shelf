import { Game } from '../types'

export function filterGameProperties(game: Game): Game {
  const {
    id,
    name,
    platforms,
    released,
    background_image,
    background_image_additional,
    genres,
    publishers,
    metacritic,
    slug,
    playtime,
    description_raw,
    metacritic_url,
    website
  } = game

  return {
    id,
    name,
    platforms,
    released,
    background_image,
    background_image_additional,
    genres,
    publishers,
    metacritic,
    slug,
    playtime,
    description_raw,
    metacritic_url,
    website
  }
}
