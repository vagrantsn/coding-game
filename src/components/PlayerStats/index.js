import React from 'react'
import PropTypes from 'prop-types'
import { FaHeart } from 'react-icons/fa'
import {
  GiBroadsword,
  GiCrackedHelm,
  GiChestArmor,
  GiArmoredPants,
  GiSpikedShoulderArmor,
  GiLegArmor,
  GiShield,
} from 'react-icons/gi'

import Property from '../Property'
import StatBar from '../StatBar'

import style from './style.css'

const PlayerStats = ({
  equips: {
    helm,
    mail,
    vambraces,
    faulds,
    greaves,
  },
  stats: {
    health,
    attack,
    defense,
  },
}) => (
  <div className={style.playerStats}>
    <div className={style.stats}>
      <Property
        icon={<FaHeart size={16} />}
        value={
          <StatBar
            max={health}
            showLabels
            value={health}
          />
        }
      />
      <Property
        icon={<GiBroadsword size={16} />}
        value={attack}
      />
      <Property
        icon={<GiShield size={16} />}
        value={defense}
      />
    </div>
    <div className={style.equips}>
      <Property
        icon={<GiCrackedHelm size={16} />}
        value={helm}
      />
      <Property
        icon={<GiChestArmor size={16} />}
        value={mail}
      />
      <Property
        icon={<GiSpikedShoulderArmor size={16} />}
        value={vambraces}
      />
      <Property
        icon={<GiArmoredPants size={16} />}
        value={faulds}
      />
      <Property
        icon={<GiLegArmor size={16} />}
        value={greaves}
      />
    </div>
  </div>
)

PlayerStats.propTypes = {
  equips: PropTypes.shape({
    helm: PropTypes.string,
    mail: PropTypes.string,
    vambraces: PropTypes.string,
    faulds: PropTypes.string,
    greaves: PropTypes.string,
  }),
  stats: PropTypes.shape({
    health: PropTypes.number.isRequired,
    attack: PropTypes.number.isRequired,
    defense: PropTypes.number.isRequired,
  })
}

export default PlayerStats
