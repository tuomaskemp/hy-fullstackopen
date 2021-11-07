import React, { useState, useEffect } from 'react'

const Notification = ({ type, message }) => {
  const [display, setDisplay] = useState(false)

  useEffect(() => {
    if (!message) {
      setDisplay(false)
      return
    }
    setDisplay(true)
    const timeOut = setTimeout(() => {
      setDisplay(false)
    }, 3000)
    return () => {
      clearTimeout(timeOut)
    }
  }, [message])

  if (!display || !message) {
    return null
  }
  const notificationStyle = {
    backgroundColor: '#5cb85c',
    width: '300px',
    padding: '10px',
    borderRadius: '8px',
    color: 'white',
    position: 'absolute',
    top: '0',
    right: '0',
    marginTop: '20px',
    marginRight: '20px'
  }
  if (type === 'error') {
    notificationStyle.backgroundColor = '#d9534f'
  }

  return (
    <div style={notificationStyle}>
      {message}
    </div>
  )
}

export default Notification