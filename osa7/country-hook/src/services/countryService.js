import axios from 'axios'

const baseUrl = 'https://restcountries.com/v3.1/'

const getByFullName = async (name) => {
    const response = await axios.get(`${baseUrl}name/${name}?fullText=true`)
    return response.data
}

const services = { getByFullName }

export default services