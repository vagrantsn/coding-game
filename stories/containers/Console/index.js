import React, { useState } from 'react'
import moment from 'moment'

import Console from '../../../src/containers/Console'

const ConsoleExample = () => {
  const [entries, setEntries] = useState([])

  const handleConfirm = (input) => {
    const createdAt = moment()

    setEntries([
      ...entries,
      {
        createdAt,
        input,
      }
    ])
  }

  return (
    <Console
      entries={entries}
      onConfirm={handleConfirm}
    />
  )
}

export default ConsoleExample
