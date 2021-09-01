import React, { useState } from 'react'
import Filter from './components/Filter'
import ContactForm from './components/ContactForm'
import ListDisplay from './components/ListDisplay'

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNameFilter, setNewNameFilter ] = useState('')
  const [ newNumber, setNewNumber ] = useState(0)
  const [ personsToDisplay, setPersonsToDisplay ] = useState([...persons])

  const nameChange = (e) => {
    e.preventDefault()
    setNewName(e.target.value)
  }
  const numberChange = (e) => {
    e.preventDefault()
    setNewNumber(e.target.value)
  }

  const setPersonsAndDisplay = (data) => {
    setPersonsToDisplay(data)
    setPersons(data)
  }
  const addName = (e) => {
    e.preventDefault()
    const name = {
      name: newName,
      number: newNumber
    }
    persons.find(
      person => person.name === name.name) 
      ? alert(`${name.name} is already added to phonebook`) 
      : setPersonsAndDisplay(persons.concat(name))
    setNewName('')
  }
  const setContactsToDisplay = (e) => {
    e.preventDefault()
    setNewNameFilter(e.target.value)
  }
  const filterResults = (e) => {
    e.preventDefault()
    const personsToDisplay = persons.filter(
      person => person.name.toLowerCase().includes(
        newNameFilter.toLowerCase()
      )
    )
    setPersonsToDisplay(personsToDisplay)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      
      <Filter 
        submitHandler={filterResults} 
        filterValue={newNameFilter} 
        contactsToDisplay={setContactsToDisplay} 
      />

      <ContactForm 
        submitHandler={addName}
        name={newName}
        number={newNumber}
        nameChangeHandler={nameChange}
        numberChangeHandler={numberChange}
      />
      <h2>Numbers</h2>
      <ListDisplay list={personsToDisplay} />
    </div>
  )

}

export default App
