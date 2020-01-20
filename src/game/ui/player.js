const Player = (scene) => {
  const char = scene.add.sprite(
    50,
    50,
    'pacman'
  )

  scene.anims.create({
    key: 'walk',
    frames: scene.anims.generateFrameNumbers('pacman'),
    frameRate: 15,
    repeat: -1,
    yoyo: true,
  })

  char.play('walk')

  return char
}

export default Player
