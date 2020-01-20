import Phaser from 'phaser'

class Pacman extends Phaser.GameObjects.Sprite {
  constructor (scene, x, y) {
    super(scene, x, y, 'pacman')

    this.state = {
      cursors: scene.input.keyboard.createCursorKeys(),
    }

    scene.anims.create({
      key: 'walk',
      frames: scene.anims.generateFrameNumbers('pacman'),
      frameRate: 15,
      repeat: -1,
      yoyo: true,
    })

    this.play('walk')
    scene.add.existing(this)
    scene.physics.add.existing(this)

    scene.subscribeToUpdate(this.update.bind(this))
  }

  update () {
    const {
      cursors,
    } = this.state
    this.body.setVelocity(0)

    if (cursors.left.isDown) {
      this.body.setVelocityX(-100)
      this.setAngle(180)
    } else if (cursors.right.isDown) {
      this.body.setVelocityX(100)
      this.setAngle(0)
    }

    if (cursors.up.isDown) {
      this.body.setVelocityY(-100)
      this.setAngle(-90)
    } else if (cursors.down.isDown) {
      this.body.setVelocityY(100)
      this.setAngle(90)
    }
  }
}

export default Pacman
