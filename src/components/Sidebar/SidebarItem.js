import React from 'react'
import PropTypes from 'prop-types'

import style from './style.css'

const SidebarItem = ({
  icon,
  onClick,
  title,
}) => (
  <div
    className={style.item}
    onClick={onClick}
  >
    <span className={style.icon}>{icon}</span>
    <span className={style.title}>{title}</span>
  </div>
)

SidebarItem.propTypes = {
  icon: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
}

export default SidebarItem