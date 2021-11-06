import React from 'react'

const Button = ({clickAction, text}) => (
  <div>
    <button onClick={clickAction}>{text}</button>
  </div>  
)

export default Button