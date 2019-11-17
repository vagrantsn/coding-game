import React from 'react'
import PropTypes from 'prop-types'

import style from './style.css'

const Property = ({
  title,
  icon,
  value,
}) => (
  <div className={style.property}>
    { title &&
      <span className={style.title}>{title}</span>
    }
    <div className={style.content}>
      { icon &&
        <span className={style.icon}>{icon}</span>
      }
      <span className={style.value}>{value}</span>
    </div>
  </div>
)

Property.propTypes = {
  title: PropTypes.string,
  icon: PropTypes.node,
  value: PropTypes.node.isRequired,
}

Property.defaultProps = {
  title: null,
  icon: null,
}

export default Property
