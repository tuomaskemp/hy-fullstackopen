import React from 'react'

const Country = ({ country }) => {
    if (!country) {
      return null
    }

    if (!country.found) {
      return (
        <div>
          not found...
        </div>
      )
    }
  
    return (
      <div>
      {country.data.map(d => {
        return ( 
          <div key={d.name.common}>
            <h3>{d.name.common} </h3>
            <div>capital {d.capital} </div>
            <div>population {d.population}</div> 
            <img src={d.flags.png} height='100' alt={`flag of ${d.name.common}`}/>
        </div>
        )
      })}
        
      </div>
    )
}

export default Country