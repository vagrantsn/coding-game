import React from 'react'
import { action } from '@storybook/addon-actions'

import Prompt from '../../../src/components/Prompt'

const PromptExample = () => (
  <Prompt
    onChange={action('onChange')}
  />
)

export default PromptExample
