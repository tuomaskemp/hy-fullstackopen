import React from 'react'

const Notification = ({msg, type}) => {
    if (!msg) {
        return null
    }
    
    const notificationStyle = {
        backgroundColor: '#5cb85c',
        width: '400px',
        padding: '10px',
        borderRadius: '8px',
        color: 'white'
    }
    if (type === 'error') {
        notificationStyle.backgroundColor = '#d9534f'
    }
    return (
        <div style={notificationStyle}>
            <p>{msg}</p>
        </div>
    )
}

export default Notification