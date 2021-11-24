
import React from 'react'
import { connect } from 'react-redux'

const Notification = (props) => {

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  return (
    <div>
      {props.notification.message !== '' ?
      <div style={style}>
        {props.notification.message}
      </div>
      : ''}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification,
  }
}

const ConnectNotification = connect(mapStateToProps)(Notification)

export default ConnectNotification