import { values } from 'ramda'

import pacman from '../../assets/tiles/pacman.png'
import mapTiles from '../../assets/tiles/map.png'
import mapScheme from '../../assets/maps/map.json'
import {
  gamepadUI,
  layoutUI,
} from '../ui'

import {
  Map,
  Player,
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
      frameWidth: 30,
      frameHeight: 30,
    })
  }

  create () {
    const map = new Map(this, 'basic')
    const pacman = new Player(this, 400, 50, map)

    this.physics.add.collider(pacman, map.state.walls)

    map.mount()
    map.addPlayer(pacman)
  }
}

export default Main
