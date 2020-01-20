import Phaser from 'phaser'

import config from './config'
import { Main } from './scenes'

const factory = () => {

  const start = ({ parent }) => {
    const localConfig = {
      ...config,
      parent,
      scene: Main,
    }

    new Phaser.Game(localConfig)
  }

  return {
    start,
  }
}

export default factory
