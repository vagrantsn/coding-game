import Phaser from 'phaser'

const buttonBuilder = scene => ({
  fill,
  fillAlpha,
  height,
  name,
  width,
  x,
  y,
}) => (
  scene.add.ellipse(x, y, width, height, fill, fillAlpha).setName(name)
)

const gamepadInit = ({ scene, height, parent, onTouch }) => {
  const bottomOffset = 50

  const arrowsZone = scene.add.zone(
    0,
    0,
    parent.width,
    parent.height - bottomOffset
  )

  Phaser.Display.Align.In.Center(
    arrowsZone,
    parent
  )

  const buttonProps = {
    fill: 0xbfb64d,
    fillAlpha: .7,
    height: height * .25,
    width: height * .25,
  }

  const buildButton = buttonBuilder(scene)

  const left = buildButton({
    ...buttonProps,
    name: 'leftArrow',
  })

  Phaser.Display.Align.In.BottomCenter(
    left,
    arrowsZone,
    -buttonProps.width,
    -buttonProps.height
  )

  const right = buildButton({
    ...buttonProps,
    name: 'rightArrow',
  })

  Phaser.Display.Align.In.BottomCenter(
    right,
    arrowsZone,
    buttonProps.width,
    -buttonProps.height
  )

  const up = buildButton({
    ...buttonProps,
    name: 'upArrow',
  })

  Phaser.Display.Align.In.BottomCenter(
    up,
    arrowsZone,
    0,
    2 * -buttonProps.height
  )

  const down = buildButton({
    ...buttonProps,
    name: 'downArrow',
  })

  Phaser.Display.Align.In.BottomCenter(
    down,
    arrowsZone,
  )

  const arrows = new Phaser.GameObjects.Group(scene, [
    left,
    right,
    up,
    down,
  ])

  arrows.children.iterate(arrow => (
    arrow.setInteractive().on('pointerdown', () => onTouch(scene, arrow.name))
  ))
}

export default gamepadInit
