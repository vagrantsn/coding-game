import React from 'react'
import PropTypes from 'prop-types'

import style from './style.css'

const Entry = ({
  createdAt,
  onClick,
  text,
}) => (
  <div
    className={style.entry}
    onClick={() => onClick({ createdAt, input: text })}
  >
    <span className={style.input}>{text}</span>
    <span className={style.date}>{createdAt}</span>
  </div>
)

Entry.propTypes = {
  createdAt: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  text: PropTypes.string.isRequired,
}

Entry.defaultProps = {
  onClick: null,
}

export default Entry
