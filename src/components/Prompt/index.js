import React from 'react'
import PropTypes from 'prop-types'

import style from './style.css'

const Prompt = ({
  onChange,
  value,
}) => (
  <div className={style.prompt}>
    <span className={style.icon}>&gt;</span>
    <input
      className={style.input}
      type="text"
      onChange={({ target: { value } }) => onChange(value)}
      placeholder="Type your code here"
      value={value}
    />
  </div>
)

Prompt.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
}

Prompt.defaultProps = {
  value: '',
}

export default Prompt
