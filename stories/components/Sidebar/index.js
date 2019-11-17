import React, { useState } from 'react'

import Sidebar from '../../../src/components/Sidebar'

import mocks from './mocks'

const SidebarExample = () => {
  const [collapsed, setCollapsed] = useState(true)

  const toggleCollapsed = () => setCollapsed(!collapsed)

  return (
    <Sidebar
      collapsed={collapsed}
      onMenuClick={toggleCollapsed}
      options={mocks.options}
    />
  )
}

export default SidebarExample
