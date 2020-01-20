import Phaser from 'phaser'

class Scene extends Phaser.Scene {
  constructor(sceneName) {
    super(sceneName)

    this.listeners = []
  }

  subscribeToUpdate (callback) {
    this.listeners.push(callback)
  }

  update () {
    this.listeners.map(callback => callback(this))
  }
}

export default Scene
