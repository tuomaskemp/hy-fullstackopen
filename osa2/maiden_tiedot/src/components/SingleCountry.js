import axios from 'axios'
import React, { useEffect, useState } from 'react'
import CityWeather from './CityWeather'

const SingleCountry = ({countryData}) => {
    const [Weather, setWeather] = useState(null)
    useEffect (() => {
        const api_key = process.env.REACT_APP_WEATHER_API_KEY
        const city = countryData[0].capital
        const source = axios.CancelToken.source()
        axios
            .get('http://api.weatherstack.com/current', {
                params: {
                    access_key: api_key,
                    query: city
                }, 
                cancelToken: source.token,
                
            })
            .then(response => setWeather(response.data))

            return () => {
                source.cancel()
            }
    }, [countryData])

    return (
        countryData.map(
            country =>
            <div key={country.population}>
                <h2>{country.name}</h2>
                <p>capital {country.capital}</p>
                <p>population {country.population}</p>
                <h4>languages</h4>
                {country.languages.map(
                    language => <li key={language.iso639_1}>{language.name}</li>
                )}
                <img src={country.flag} height="100" alt="flag"/>
                {
                    Weather && 
                    <CityWeather 
                        capital={country.capital} 
                        temperature={Weather.current.temperature}
                        icons={Weather.current.weather_icons}
                        wind={Weather.current.wind_speed}
                        wind_direction={Weather.current.wind_dir}
                    />
                }
            </div>
          )
    )
}

export default SingleCountry