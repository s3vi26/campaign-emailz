import './App.css'
import { LogsContainer } from './components/LogsContainer'
import { Dashboard } from './components/Dashboard'
import React from 'react'

const App = () => {
  return (
    <>
      <Dashboard />
      <div>
        <div style={{ position: 'absolute', textAlign: 'center', height: '200px', background: '#242424', width: '100%', overflowY: 'scroll', marginTop: '100px'}}>
          <LogsContainer />
        </div>
      </div>
    </>
  )
}

export default App
