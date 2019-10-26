import React, { createRef, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import {
  isEmpty,
  last,
} from 'ramda'

import Prompt from '../../components/Prompt'

import Entry from './Entry'

import style from './style.css'

const scrollToBottom = element => element.scrollTo({
  top: element.scrollHeight,
  behavior: 'smooth',
})

const Console = ({
  entries,
  onConfirm,
}) => {
  const [command, setCommand] = useState('')
  const entriesRef = createRef()

  useEffect(() => scrollToBottom(entriesRef.current), [entries])

  const handlePromptChange = input => setCommand(input)

  const handleKeyUp = ({ key }) => {
    if (key === 'ArrowUp') {
      const { input: latestEntry } = last(entries)

      setCommand(latestEntry)
    }
  }

  const handleEntryClick = ({ input }) => (
    setCommand(input)
  )

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!isEmpty(command.trim())) {
      onConfirm(command)
    }

    setCommand('')
  }

  return (
    <form
      className={style.console}
      onKeyUp={handleKeyUp}
      onSubmit={handleSubmit}
    >
      <div
        ref={entriesRef}
        className={style.entries}
      >
        {entries.map(({ createdAt, input }) => (
          <Entry
            key={createdAt.valueOf()}
            createdAt={createdAt.format('L H:mm:ssa')}
            onClick={handleEntryClick}
            text={input}
          />
        ))}
      </div>
      <Prompt
        onChange={handlePromptChange}
        value={command}
      />
    </form>
  )
}

Console.propTypes = {
  entries: PropTypes.arrayOf(
    PropTypes.shape({
      createdAt: PropTypes.object,
      input: PropTypes.string,
    }),
  ),
  onConfirm: PropTypes.func.isRequired,
}

Console.defaultProps = {
  entries: [],
}

export default Console
