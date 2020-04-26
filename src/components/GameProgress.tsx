import React from 'react'
import { ProgressBar, Colors, Card } from 'react-native-paper'
import { SavedGame } from '../types'

const GameProgress = ({ game, card }: { game: SavedGame; card?: boolean }) => {
    if (game.progress && game.ownership === 'owned' && (game.status === 'inProgress' || game.status === 'played')) {
        return card ? (
            <Card
                style={{
                    marginLeft: 10,
                    marginRight: 10,
                    marginBottom: 5,
                    marginTop: -5,
                    padding: 10,
                    paddingLeft: 25,
                    paddingRight: 25
                }}
            >
                <ProgressBar progress={game.progress / 100} color={Colors.teal400} />
            </Card>
        ) : (
            <ProgressBar progress={game.progress / 100} color={Colors.teal400} />
        )
    } else {
        return null
    }
}

export default GameProgress
