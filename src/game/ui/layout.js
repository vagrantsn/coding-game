import Phaser from 'phaser'

const layoutUI = (scene) => {
  const {
    scale: {
      height: canvasHeight,
      width: canvasWidth,
    },
  } = scene
  const bottomHeight = 250

  const canvasZone = scene.add.rectangle(
    0,
    0,
    canvasWidth,
    canvasHeight,
    0xffffff
  ).setOrigin(0, 0)

  const topZone = scene.add.rectangle(
    0,
    0,
    canvasWidth,
    canvasHeight - bottomHeight,
    0xfff000
  ).setOrigin(0, 0)

  const bottomZone = scene.add.rectangle(
    0,
    0,
    canvasWidth,
    bottomHeight,
    0xaaf000
  ).setOrigin(0, 0)

  Phaser.Display.Align.In.TopCenter(topZone, canvasZone)
  Phaser.Display.Align.In.BottomCenter(bottomZone, canvasZone)

  return {
    topZone,
    bottomZone,
  }

  // primary.ui({
  //   scene,
  //   parent: primaryZone,
  //   ...primary.props,
  // })

  // bottom.ui({
  //   scene,
  //   parent: bottomZone,
  //   ...bottom.props,
  // })
}

export default layoutUI
