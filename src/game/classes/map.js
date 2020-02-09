import Phaser from 'phaser'

import config from '../config'

class Map extends Phaser.Tilemaps.Tilemap {
  constructor (scene, parent, key) {
    const { data: mapConfig } = scene.cache.tilemap.get(key)

    const mapData = Phaser.Tilemaps.Parsers.Tiled.ParseJSONTiled(key, mapConfig, true)

    super(scene, mapData)

    const tileset = this.addTilesetImage('map', 'map-tiles')

    const centerX = Phaser.Display.Bounds.GetCenterX(parent)
    const centerY = Phaser.Display.Bounds.GetCenterY(parent)

    const walls = this.createStaticLayer('walls', tileset)

    const parentAspectRatio = parent.width / parent.height
    const mapAspectRatio = walls.width / walls.height

    let mapWidth = parent.width
    let mapHeight = parent.height

    if (mapAspectRatio > parentAspectRatio) {
      mapHeight = parent.width / mapAspectRatio
    } else {
      mapWidth = parent.height * mapAspectRatio
    }

    walls.setDisplaySize(mapWidth, mapHeight)

    walls.setPosition(
      centerX - (walls.displayWidth / 2),
      centerY - (walls.displayHeight / 2)
    )

    walls.setCollisionByProperty({ collides: true })

    if (config.physics.arcade.debug) {
      const debugGraphics = scene.add.graphics().setAlpha(0.45)

      walls.renderDebug(debugGraphics, {
        tileColor: new Phaser.Display.Color(40, 255, 48, 255),
        collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255),
        faceColor: new Phaser.Display.Color(40, 39, 37, 255),
      })
    }

    this.walls = walls

    scene.add.existing(this)
  }
}

export default Map
