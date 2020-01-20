import config from '../config'

const mapUI = ({
  mapKey,
  parent,
  scene,
}) => {
  const map = scene.make.tilemap({
    key: mapKey,
  })

  const tileset = map.addTilesetImage('map', 'map-tiles')

  const centerX = Phaser.Display.Bounds.GetCenterX(parent)
  const centerY = Phaser.Display.Bounds.GetCenterY(parent)

  const walls = map.createStaticLayer(
    'walls',
    tileset,
  ).setCollisionByProperty({ collides: true })

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

  if (config.physics.arcade.debug) {
    const debugGraphics = scene.add.graphics().setAlpha(0.45)
    walls.renderDebug(debugGraphics, {
      tileColor: new Phaser.Display.Color(40, 255, 48, 255),
      collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255),
      faceColor: new Phaser.Display.Color(40, 39, 37, 255),
    })
  }

  return walls
}

export default mapUI
