import React from 'react'

const Dashboard = () => {
  // You can use this file as the Campaign Dashboard
  // Add the campaigns here
  // Write to the console to show what is happening in the app

  return (
    <div style={{textAlign: 'center'}}>
      <h3 style={{ paddingTop: '20px' }}>Campaigns configurations will go here</h3>
      <div style={{ paddingTop: '20px' }}>
        This "Start Campaign" button should write to the console to show us who is being sent an email and a stacktrace of what happened
      </div>
      <button
        style={{ marginTop: '20px' }}
        onClick={() => {
          // this console log will also write to the LogsContainer component for us to see
          console.info('...starting Birthday Campaign')
        }}
      >
        Start Campaign
      </button>
    </div>
  )
}

export { Dashboard }
