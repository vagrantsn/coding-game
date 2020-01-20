import Phaser from 'phaser'

import pacman from '../assets/tiles/pacman.png'
import mapTiles from '../assets/tiles/map.png'
import mapScheme from '../assets/maps/map.json'
import config from './config'
import {
  gamepadUI,
  layoutUI,
  mapUI,
  Player,
} from './ui'
import { playerEvents } from './events'

const factory = () => {
  let player
  let cursors

  function preload () {
    this.load.image('map-tiles', mapTiles)
    this.load.tilemapTiledJSON('basic', mapScheme)
    this.load.spritesheet('pacman', pacman, {
      frameWidth: 32,
      frameHeight: 32,
    })
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

    const pacman = Player(this)

    player = this.physics.add.existing(pacman)

    cursors = this.input.keyboard.createCursorKeys()

    this.physics.add.collider(player, walls)
  }

  function update () {
    player.body.setVelocity(0)

    if (cursors.left.isDown) {
      player.body.setVelocityX(-100)
      player.setAngle(180)
    } else if (cursors.right.isDown) {
      player.body.setVelocityX(100)
      player.setAngle(0)
    }

    if (cursors.up.isDown) {
      player.body.setVelocityY(-100)
      player.setAngle(-90)
    } else if (cursors.down.isDown) {
      player.body.setVelocityY(100)
      player.setAngle(90)
    }
  }

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
