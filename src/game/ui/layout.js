import Phaser from 'phaser'

const layoutUI = ({
  scene,
  primary,
  bottom,
}) => {
  const {
    scale: {
      height: canvasHeight,
      width: canvasWidth,
    },
  } = scene

  const centerW = canvasWidth / 2
  const centerH = canvasHeight / 2
  const canvasZone = scene.add.zone(centerW, centerH, canvasWidth, canvasHeight)

  const primaryZone = scene.add.zone(
    0,
    0,
    canvasWidth,
    canvasHeight - bottom.props.height
  )

  const bottomZone = scene.add.zone(
    0,
    0,
    canvasWidth,
    bottom.props.height
  )

  Phaser.Display.Align.In.TopCenter(primaryZone, canvasZone)
  Phaser.Display.Align.In.BottomCenter(bottomZone, canvasZone)

  bottom.ui({
    scene,
    parent: bottomZone,
    ...bottom.props
  })
}

export default layoutUI
