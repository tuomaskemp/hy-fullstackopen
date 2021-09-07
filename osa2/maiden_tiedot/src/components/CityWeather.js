import React from 'react'

const CityWeather = ({
    capital, 
    temperature, 
    icons, 
    wind, 
    wind_direction }) => {
    return (
        <div>
            <h4>Weather in {capital}</h4>
            <p>Temperature: {temperature} Celsius</p>
            {icons.map(
                icon => <img key={icon} src={icon} height="50" alt="Weather icon" />
            )}
            <p>Wind: {wind} mph Direction {wind_direction}</p>
        </div>
    )
}

export default CityWeather