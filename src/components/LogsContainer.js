import React, { useState, useEffect } from 'react'
import { Console, Hook, Unhook } from 'console-feed'

/* No need to edit this file. This is a simple functional component for the log output */

const LogsContainer = () => {
  const [logs, setLogs] = useState([])

  useEffect(() => {
    Hook(
      window.console,
      (log) => setLogs((currLogs) => [...currLogs, log]),
      false
    )
    return () => Unhook(window.console)
  }, [])

  return (
    <>
      <div style={{background: '#61dafb'}}><h3>Campaigns Log Output:</h3></div>
      <Console logs={logs} />
    </>
  )
}

export { LogsContainer }
