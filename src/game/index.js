import Phaser from 'phaser'

import config from './config'
import {
  gamepadUI,
  layoutUI,
} from './ui'
import { playerEvents } from './events'

const factory = () => {
  function preload () {}

  function create () {

    layoutUI({
      scene: this,
      primary: {},
      bottom: {
        ui: gamepadUI,
        props: {
          height: 250,
          onTouch: playerEvents.move,
        },
      },
    })
  }

  function update () {}

  const start = ({ parent }) => {
    const localConfig = {
      ...config,
      parent,
      scene: {
        preload,
        create,
        update,
      },
    }

    new Phaser.Game(localConfig)
  }

  return {
    start,
  }
}

export default factory
