import { useState, useEffect } from 'react'
import countryService from '../services/countryService'

export const useField = (type) => {
    const [value, setValue] = useState('')
  
    const onChange = (event) => {
      setValue(event.target.value)
    }
  
    return {
      type,
      value,
      onChange
    }
  }
  
export const useCountry = (name) => {
    const [country, setCountry] = useState(null)

    useEffect(() => {
        if(name) {
          countryService
            .getByFullName(name)
            .then(data => {
                const obj = {found: true, data: data}
                setCountry(obj)
            })
            .catch(err => {
                setCountry({found: false, data: []})
            })
        }
    }, [name])
    
    return country
}