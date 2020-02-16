import Phaser from 'phaser'
import {
  find,
  map,
  mergeLeft,
  pick,
  pipe,
  prop,
  propEq,
} from 'ramda'

import config from '../config'

const getPositionObjectsFromMapData = pipe(
  prop('objects'),
  find(propEq('name', 'positions')),
  prop('objects'),
  map(pick(['id', 'x', 'y', 'type']))
)

class Map extends Phaser.Tilemaps.Tilemap {
  constructor (scene, key) {
    const { data: mapConfig } = scene.cache.tilemap.get(key)

    const mapData = Phaser.Tilemaps.Parsers.Tiled.ParseJSONTiled(key, mapConfig, true)

    super(scene, mapData)

    const tileset = this.addTilesetImage('map', 'map-tiles')

    const walls = this.createStaticLayer('walls', tileset)
    const ground = this.createStaticLayer('ground', tileset)

    walls.setCollisionByProperty({ collides: true })

    if (config.physics.arcade.debug) {
      const debugGraphics = scene.add.graphics().setAlpha(0.45)

      walls.renderDebug(debugGraphics, {
        tileColor: new Phaser.Display.Color(40, 255, 48, 255),
        collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255),
        faceColor: new Phaser.Display.Color(40, 39, 37, 255),
      })
    }

    this.state = {
      scene,
      ground,
      walls,
    }

    this.mount = this.mount.bind(this)
    this.loadStartingPositions = this.loadStartingPositions.bind(this)
    this.addPlayer = this.addPlayer.bind(this)
  }

  mount () {
    const {
      scene: {
        add,
        cameras,
        scale: {
          gameSize,
        },
      },
    } = this.state

    this.loadStartingPositions()

    cameras.main.setPosition(
      gameSize.width / 4,
      50
    )

    add.existing(this)
  }

  loadStartingPositions () {
    const { state } = this

    const positions = getPositionObjectsFromMapData(this)

    const startingPositions = {
      ghost: positions.filter(propEq('type', 'ghost')),
      pacman: positions.filter(propEq('type', 'pacman')),
    }

    this.state = mergeLeft({
      startingPositions,
    }, state)
  }

  addPlayer (player) {
    const {
      startingPositions: {
        ghost: ghostStartingPositions,
        pacman: pacmanStartingPositions,
      },
    } = this.state

    const possibleStartingPositions = player.state.type === 'pacman'
      ? pacmanStartingPositions
      : ghostStartingPositions

    const { x, y } = possibleStartingPositions.shift()

    player.setPosition(x + player.width / 2, y + player.height / 2)
    player.mount()
  }
}

export default Map
