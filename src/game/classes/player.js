import Phaser from 'phaser'
import {
  values,
} from 'ramda'

import { overlaps } from '../utils/collision'
import config from '../config'

const colliderProps = {
  color: 0xff0000,
  colorActive: 0x2340ff,
}

const createRectangle = (scene, x, y, width, height) => {
  const params = [x, y, width, height, colliderProps.color]

  if (config.physics.arcade.debug) {
    return scene.add.rectangle(...params)
  } else {
    return scene.add.zone(...params)
  }
}

const setupHeadingCollider = (rectangle, x, y, color) => {
  rectangle.setPosition(x, y)

  if (config.physics.arcade.debug) {
    rectangle.setFillStyle(color)
  }
}

class Player extends Phaser.GameObjects.Sprite {
  constructor (scene, x, y, map) {
    super(scene, x, y, 'pacman')

    this.state = {
      cursors: scene.input.keyboard.createCursorKeys(),
      collidingEdges: {
        up: false,
        down: false,
        left: false,
        right: false,
      },
      hasTested: false,
      direction: null,
      prevDirection: null,
      speed: 100,
    }

    scene.anims.create({
      key: 'walk',
      frames: scene.anims.generateFrameNumbers('pacman'),
      frameRate: 15,
      repeat: -1,
      yoyo: true,
    })

    this.play('walk')

    scene.subscribeToUpdate(this.update.bind(this))

    this.map = map
    this.scene = scene

    const colliderWidth = this.width
    const colliderHeight = 10
    this.headingColliders = {
      left: createRectangle(scene, x - 25, y, colliderHeight, colliderWidth),
      right: createRectangle(scene, x + 25, y, colliderHeight, colliderWidth),
      up: createRectangle(scene, x, y - 25, colliderWidth, colliderHeight),
      down: createRectangle(scene, x, y + 25, colliderWidth, colliderHeight),
    }

    this.initPhysics = this.initPhysics.bind(this)
    this.move = this.move.bind(this)
    this.resetVelocity = this.resetVelocity.bind(this)
    this.headTo = this.headTo.bind(this)
    this.setupHeadingColliders = this.setupHeadingColliders.bind(this)
    this.checkHeadingCollisions = this.checkHeadingCollisions.bind(this)

    scene.add.existing(this)
    this.initPhysics()
  }

  initPhysics () {
    const {
      scene,
      headingColliders,
    } = this

    scene.physics.add.existing(this)
    this.body.setCollideWorldBounds(true)

    values(headingColliders).map(headingCollider => (
      scene.physics.add.existing(headingCollider)
    ))
  }

  resetVelocity () {
    this.body.setVelocityX(0)
    this.body.setVelocityY(0)
  }

  headTo (newDirection, speed) {
    switch (newDirection) {
      case 'left':
        this.setAngle(180)
        this.body.setVelocity(-speed, 0)
        break
      case 'right':
        this.setAngle(0)
        this.body.setVelocity(speed, 0)
        break
      case 'up':
        this.setAngle(-90)
        this.body.setVelocity(0, -speed)
        break
      case 'down':
        this.setAngle(90)
        this.body.setVelocity(0, speed)
        break
    }

    this.state.direction = newDirection
  }

  async move (direction) {
    if (!direction) return

    const { speed } = this.state

    const target = this.headingColliders[direction]
    const isDirectionBlocked = await overlaps(this.scene, target, this.map.walls)

    if (!isDirectionBlocked && direction) {
      this.body.setVelocity(0, 0)
      this.headTo(direction, speed)
    }
  }

  setupHeadingColliders () {
    const {
      headingColliders: {
        left,
        right,
        up,
        down,
      },
      state: {
        collidingEdges: {
          left: isLeftColliding,
          right: isRightColliding,
          up: isUpColliding,
          down: isDownColliding,
        },
      },
      x,
      y,
    } = this

    const getColor = isColliding => isColliding
      ? colliderProps.colorActive
      : colliderProps.color

    const distance = 25
    setupHeadingCollider(left, x - distance, y, getColor(isLeftColliding))
    setupHeadingCollider(right, x + distance, y, getColor(isRightColliding))
    setupHeadingCollider(up, x, y - distance, getColor(isUpColliding))
    setupHeadingCollider(down, x, y + distance, getColor(isDownColliding))
  }

  async checkHeadingCollisions () {
    const {
      headingColliders: {
        down,
        left,
        right,
        up,
      },
      map,
      scene,
    } = this

    const result = {
      up: await overlaps(scene, up, map.walls),
      down: await overlaps(scene, down, map.walls),
      left: await overlaps(scene, left, map.walls),
      right: await overlaps(scene, right, map.walls.layer.tilemapLayer),
    }

    this.state.collidingEdges = result
  }

  update () {
    const {
      cursors,
      direction,
    } = this.state
    let newDirection = null

    if (cursors.left.isDown) {
      newDirection = 'left'
    } else if (cursors.right.isDown) {
      newDirection = 'right'
    } else if (cursors.up.isDown) {
      newDirection = 'up'
    } else if (cursors.down.isDown) {
      newDirection = 'down'
    }

    this.move(newDirection || direction)
    this.checkHeadingCollisions()
    this.setupHeadingColliders()
  }
}

export default Player
