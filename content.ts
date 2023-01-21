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

const itContent: ExtendedContent = {
  home: 'Home',
  newGame: 'Nuovo gioco',
  released: 'Pubblicato',
  game: 'Gioco',
  searchGame: 'Cerca gioco',
  backlog: 'In libreria',
  inProgress: 'In corso',
  played: 'Giocato',
  completed: 'Completato',
  wishList: 'Lista dei desideri',
  summary: 'Riassunto',
  metaScore: 'Metascore',
  owned: 'Posseduto',
  hours: 'Ore',
  addNewGame: 'Aggiungi gioco nuovo',
  close: 'Chiudi',
  delete: 'Elimina',
  update: 'Aggiorna',
  save: 'Salva',
  noSearchResults: 'Nessun risultato di ricerca',
  newGameName: 'Nome del gioco',
  noGamesDescription: 'Inizia ad aggiungere alcuni giochi alla tua collezione',
  gameSaved: 'Gioco salvato',
  gameRemoved: 'Gioco rimosso',
  welcome: 'Benvenuto',
  platformsDescription: 'Seleziona le piattaforme che possiedi',
  addGame: 'Aggiungi giochi'
}

const content = {
  es: esContent,
  en: engContent,
  it: itContent
}

export default content
