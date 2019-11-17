import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import {
  AiOutlineMenuFold,
  AiOutlineMenuUnfold,
} from 'react-icons/ai'

import SidebarItem from './SidebarItem'

import style from './style.css'

const Sidebar = ({
  collapsed,
  onMenuClick,
  options,
}) => (
  <div
    className={classnames(style.sidebar, {
      [style.collapsed]: collapsed,
    })}
  >
    <div className={style.head}>
      <span
        className={style.menuButton}
        onClick={onMenuClick}
      >
        {collapsed
          ? <AiOutlineMenuUnfold color="#fff" size="24px" />
          : <AiOutlineMenuFold color="#fff" size="24px" />
        }
      </span>
    </div>
    <div>
      {options.map(({ icon, onClick, title }) => (
        <SidebarItem
          icon={icon}
          onClick={onClick}
          title={title}
        />
      ))}
    </div>
  </div>
)

Sidebar.propTypes = {
  collapsed: PropTypes.bool,
  onMenuClick: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      icon: PropTypes.node.isRequired,
      onClick: PropTypes.func.isRequired,
    }),
  ),
}

Sidebar.defaultProps = {
  collapsed: true,
}

export default Sidebar
