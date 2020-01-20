import Phaser from 'phaser'

import mapTiles from '../assets/tiles/map.png'
import mapScheme from '../assets/maps/map.json'
import config from './config'
import {
  gamepadUI,
  layoutUI,
  mapUI,
} from './ui'
import { playerEvents } from './events'

const factory = () => {

  function preload () {
    this.load.image('map-tiles', mapTiles)
    this.load.tilemapTiledJSON('basic', mapScheme)
  }

  function create () {
    const {
      topZone,
      bottomZone,
    } = layoutUI(this)

    gamepadUI({
      scene: this,
      parent: bottomZone,
      height: bottomZone.height
    })

    const walls = mapUI({
      mapKey: 'basic',
      parent: topZone,
      scene: this,
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
