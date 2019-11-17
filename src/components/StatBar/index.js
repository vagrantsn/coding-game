import React from 'react'
import PropTypes from 'prop-types'

import style from './style.css'

const StatBar = ({
  max,
  showLabels,
  value,
}) => (
  <div className={style.statbar}>
    <span
      className={style.bar}
      style={{
        width: `${Math.trunc((value/max) * 100)}%`
      }}
    >
      { showLabels && (
        <span className={style.label}>
          {`${value}/${max}`}
        </span>
      )}
    </span>
  </div>
)

StatBar.propTypes = {
  max: PropTypes.number.isRequired,
  showLabels: PropTypes.bool,
  value: PropTypes.number.isRequired,
}

StatBar.defaultProps = {
  showLabels: false,
}

export default StatBar
