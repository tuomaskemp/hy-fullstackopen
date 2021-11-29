import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notification)

  if (!notification.message) {
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
  if (notification.type === 'error') {
    notificationStyle.backgroundColor = '#d9534f'
  }

  return (
    <div style={notificationStyle} className="notification-banner">
      {notification.message}
    </div>
  )
}

export default Notification