import React from 'react'

import PlayerStats from '../../../src/components/PlayerStats'

import mocks from './mocks'

const PlayerStatsExample = () => (
  <PlayerStats
    equips={mocks.equips}
    stats={mocks.stats}
  />
)

export default PlayerStatsExample
