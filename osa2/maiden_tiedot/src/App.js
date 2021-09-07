import React, { useEffect, useState } from 'react'
import axios from 'axios'
import SingleCountry from './components/SingleCountry'
import CountryListDisplay from "./components/CountryListDisplay";
import Filter from './components/Filter'

const App = () => {
  const [allCountries, setAllCountries] = useState([])
  const [searchKey, setSearchKey] = useState('')
  const [filteredResults, setFilteredResults] = useState([])

  useEffect (() => {
    axios
        .get('https://restcountries.eu/rest/v2/all')
        .then(response => (setAllCountries(response.data)))
  }, [])

  const searchCountries = (e) => {
    e.preventDefault()
    const result = allCountries.filter(
      country => country.name.toLowerCase().includes(searchKey.toLowerCase())
    )
    const finalResult = result.length <= 10 ? result : []
    setFilteredResults(finalResult)
  }

  const searchChangeHandler = (e) => {
    e.preventDefault()
    setSearchKey(e.target.value)
  }
  return (
    <div>
      <Filter 
        submitHandler={searchCountries} 
        filterValue={searchKey} 
        inputChangeHandler={searchChangeHandler}
      />
      
      {filteredResults.length === 0 ? <p>Too many matches, specify another filter</p> : false}

      { filteredResults.length === 1 ? 
        <SingleCountry countryData={filteredResults} />
        : false 
      }

      { filteredResults.length > 1 ? 
        <CountryListDisplay countryList={filteredResults} /> 
        : false 
      }
    </div>
  );
}

export default App;

