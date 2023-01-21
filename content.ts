export type LocalizedKeys = keyof typeof engContent

type ExtendedContent = {
  [key in keyof typeof engContent]: string
}

const engContent = {
  home: 'Home',
  newGame: 'New Game',
  addGame: 'Add Games',
  released: 'Released',
  game: 'Game',
  searchGame: 'Search Game',
  backlog: 'Backlog',
  inProgress: 'In Progress',
  played: 'Played',
  completed: 'Completed',
  wishList: 'Wishlist',
  summary: 'Summary',
  metaScore: 'Metascore',
  owned: 'Owned',
  hours: 'Hours',
  addNewGame: 'Add New Game',
  close: 'Close',
  delete: 'Delete',
  update: 'Update',
  save: 'Save',
  noSearchResults: 'No search results',
  newGameName: 'Game name',
  noGamesDescription: 'Get started adding some games to your collection',
  gameSaved: 'Game Saved',
  gameRemoved: 'Game Removed',
  welcome: 'Welcome',
  platformsDescription: 'Please select the platforms that you own'
}

const esContent: ExtendedContent = {
  home: 'Inicio',
  newGame: 'Nuevo Juego',
  released: 'Lanzamiento',
  game: 'Juego',
  searchGame: 'Buscar Juego',
  backlog: 'No jugado',
  inProgress: 'Jugando',
  played: 'Lo jugué',
  completed: 'Completado',
  wishList: 'Lista Deseos',
  summary: 'Resumen',
  metaScore: 'Puntuación',
  owned: 'Adquirido',
  hours: 'Horas',
  addNewGame: 'Agregar nuevo juego',
  close: 'Cerrar',
  delete: 'Borrar',
  update: 'Actualizar',
  save: 'Guardar',
  noSearchResults: 'No hay resultados',
  newGameName: 'Nombre del juego',
  noGamesDescription: 'Empieza añadiendo juegos a tu collección',
  gameSaved: 'Juego guardado',
  gameRemoved: 'Juego eliminado',
  welcome: 'Bienvenido',
  platformsDescription: 'Selecciona las plataformas que tienes',
  addGame: 'Añadir Juegos'
}

const content = {
  es: esContent,
  en: engContent
}

export default content
