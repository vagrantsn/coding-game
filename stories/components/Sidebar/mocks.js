import React from 'react'
import { action } from '@storybook/addon-actions'

import {
  FaDungeon,
  FaHome,
} from 'react-icons/fa'

const mocks = {
  options: [
    {
      title: 'Home',
      icon: <FaHome size="24px" />,
      onClick: action('item click'),
    },
    {
      title: 'Dungeon',
      icon: <FaDungeon size="24px" />,
      onClick: action('item click'),
    }
  ]
}

export default mocks
