import React from 'react'

const Button = ({handleClick, text, value}) => {
    return (
        <button onClick={handleClick}>{text}</button>
    )
}

export default Button