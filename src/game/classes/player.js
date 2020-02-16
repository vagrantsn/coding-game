import Phaser from 'phaser'
import {
  clone,
  mergeLeft,
  path,
  values,
} from 'ramda'

import { overlaps } from '../utils/collision'
import config from '../config'

const isPhysicsDebugging = path(['physics', 'arcade', 'debug'], config)

const colliderProps = {
  color: 0xff0000,
  colorActive: 0x2340ff,
}

const createRectangle = (scene, x, y, width, height) => {
  const params = [x, y, width, height, colliderProps.color]

  if (isPhysicsDebugging) {
    return scene.add.rectangle(...params)
  } else {
    return scene.add.zone(...params)
  }
}

const setupHeadingCollider = (rectangle, x, y, color) => {
  rectangle.setPosition(x, y)

  if (isPhysicsDebugging) {
    rectangle.setFillStyle(color)
  }
}

const getNearestTile = (position) => {
  const snap = 32
  const snapped = (Math.round(position / snap) * snap)

  return snapped + snap / 2
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
      hasTested: 0,
      direction: null,
      prevDirection: null,
      speed: 80,
      headingColliders: {},
      scene,
      map,
      mounted: false,
      type: 'pacman',
    }

    scene.anims.create({
      key: 'walk',
      frames: scene.anims.generateFrameNumbers('pacman'),
      frameRate: 20,
      repeat: -1,
      yoyo: true,
    })

    this.play('walk')

    scene.subscribeToUpdate(this.update.bind(this))

    this.mount = this.mount.bind(this)
    this.initPhysics = this.initPhysics.bind(this)
    this.move = this.move.bind(this)
    this.resetVelocity = this.resetVelocity.bind(this)
    this.headTo = this.headTo.bind(this)
    this.setupHeadingColliders = this.setupHeadingColliders.bind(this)
    this.checkHeadingCollisions = this.checkHeadingCollisions.bind(this)
  }

  mount () {
    const {
      scene,
      state,
      x,
      y,
    } = this

    const colliderWidth = 30
    const colliderHeight = 10
    const headingColliders = {
      left: createRectangle(scene, x - 25, y, colliderHeight, colliderWidth),
      right: createRectangle(scene, x + 25, y, colliderHeight, colliderWidth),
      up: createRectangle(scene, x, y - 25, colliderWidth, colliderHeight),
      down: createRectangle(scene, x, y + 25, colliderWidth, colliderHeight),
    }

    const newState = mergeLeft({
      headingColliders,
      mounted: true,
    }, state)

    this.state = newState

    this.initPhysics()
    scene.add.existing(this)
  }

  initPhysics () {
    const {
      scene,
      headingColliders,
    } = this.state

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
    const { state } = this

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

    const newState = mergeLeft({
      direction: newDirection
    }, state)

    this.state = newState
  }

  async move (direction) {
    if (!direction) return
    const previousVelocity = clone(this.body.velocity)
    this.body.stop()

    const {
      headingColliders,
      direction: currentDirection,
      map,
      scene,
      speed,
    } = this.state

    const isNewDirection = direction !== currentDirection
    const isDirectionBlocked = await overlaps(scene, headingColliders[direction], map.state.walls)

    if (isNewDirection && !isDirectionBlocked) {
      const pos = clone(this.body.position)
      const snappedX = getNearestTile(pos.x)
      const snappedY = getNearestTile(pos.y)
      this.setPosition(snappedX, snappedY)

      return this.headTo(direction, speed)
    }

    this.body.setVelocity(previousVelocity.x, previousVelocity.y)
  }

  setupHeadingColliders () {
    const {
      state: {
        collidingEdges: {
          left: isLeftColliding,
          right: isRightColliding,
          up: isUpColliding,
          down: isDownColliding,
        },
        headingColliders: {
          left,
          right,
          up,
          down,
        },
      },
      x,
      y,
    } = this

    const getColor = isColliding => isColliding
      ? colliderProps.colorActive
      : colliderProps.color

    const distance = 30
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
    } = this.state

    const isOverlaping = collider =>
      overlaps(scene, collider, map.state.walls)

    const result = {
      up: await isOverlaping(up),
      down: await isOverlaping(down),
      left: await isOverlaping(left),
      right: await isOverlaping(right),
    }

    const newState = mergeLeft({
      collidingEdges: result
    }, this.state)

    this.state = newState
  }

  update () {
    const {
      cursors,
      direction,
      mounted,
    } = this.state

    if (!mounted) return

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

    if (isPhysicsDebugging) {
      this.checkHeadingCollisions()
    }

    this.setupHeadingColliders()
  }
}

export default Player
