import React from 'react'
import { FaHeart } from 'react-icons/fa'

import Property from '../../../src/components/Property'

const PropertyExample = () => (
  <Property
    title="Health"
    icon={<FaHeart size="16px" />}
    value={100}
  />
)

export default PropertyExample
