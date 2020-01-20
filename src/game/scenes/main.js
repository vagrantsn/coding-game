import pacman from '../../assets/tiles/pacman.png'
import mapTiles from '../../assets/tiles/map.png'
import mapScheme from '../../assets/maps/map.json'
import {
  gamepadUI,
  layoutUI,
} from '../ui'

import {
  Map,
  Pacman,
} from '../classes'


import Factory from './factory'

class Main extends Factory {
  constructor () {
    super('Main')

    this.state = {
      cursors: null,
      player: null,
    }
  }

  preload () {
    this.load.image('map-tiles', mapTiles)
    this.load.tilemapTiledJSON('basic', mapScheme)
    this.load.spritesheet('pacman', pacman, {
      frameWidth: 32,
      frameHeight: 32,
    })
  }

  create () {
    const {
      topZone,
      bottomZone,
    } = layoutUI(this)

    gamepadUI({
      scene: this,
      parent: bottomZone,
      height: bottomZone.height
    })

    const map = new Map(this, topZone, 'basic')

    const pacman = new Pacman(this, 50, 50)

    this.physics.add.collider(pacman, map.walls)
  }
}

export default Main
