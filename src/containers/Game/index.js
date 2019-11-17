import React, { useEffect } from 'react'

import GameFactory from '../../game'

const GameContainer = () => {
  useEffect(() => {
    const game = GameFactory()

    game.start({
      parent: 'game-container',
    })
  }, [])

  return (
    <div id="game-container"></div>
  )
}

export default GameContainer
