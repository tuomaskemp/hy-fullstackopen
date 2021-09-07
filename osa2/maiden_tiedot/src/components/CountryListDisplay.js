import React, { useState } from 'react'
import Button from './Button'
import SingleCountry from './SingleCountry'

const CountryListDisplay = ({countryList}) => {
    const [ selectedCountry, setselectedCountry ] = useState()
    const btnClick = (c) => () => {
        setselectedCountry(c)
    }
    return (
        <div>
            {selectedCountry ? <SingleCountry countryData={[selectedCountry]} /> : 
                countryList.map(
                    country => 
                    <p key={country.numericCode}>
                        {country.name}
                        <Button text="show" handleClick={btnClick(country)} />
                    </p> 
                )
            }
        </div>
        
    )
}

export default CountryListDisplay