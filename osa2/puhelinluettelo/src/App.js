import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import ContactForm from './components/ContactForm'
import ListDisplay from './components/ListDisplay'
import Notification from './components/Notification'
import contactService from './services/contacts'

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNameFilter, setNewNameFilter ] = useState('')
  const [ newNumber, setNewNumber ] = useState(0)
  const [ personsToDisplay, setPersonsToDisplay ] = useState([])
  const [ message, setMessage ] = useState({})
  
  useEffect(() => {
    contactService
      .getAll()
      .then(fetchedContacts => {
        setPersons(fetchedContacts)
        setPersonsToDisplay(fetchedContacts)
        })
  }, [])

  const nameChange = (e) => {
    e.preventDefault()
    setNewName(e.target.value)
  }
  const numberChange = (e) => {
    e.preventDefault()
    setNewNumber(e.target.value)
  }

  const setPersonsAndDisplay = (data) => {
    contactService
      .create(data)
      .then(response => {
        setPersons(persons.concat(response))
        setPersonsToDisplay(persons.concat(response))
      })
  }

  const updateContact = (contact) => {
    if (window.confirm(`${contact.name} is already added to phonebook, replace the old number with a new one?`)) {
      const updatedContact = { ...contact, number: newNumber }
      contactService
        .update(contact.id, updatedContact)
        .then(
          response => {
            let newPersons = persons.map(person => person.id !== contact.id ? person : response)
            setPersons(newPersons)
            setPersonsToDisplay(newPersons)
            setNewNumber(0)
            setMessage({body:"Contact updated successfully", type:''})
            setTimeout(() => {
              setMessage({})
            }, 3000)
          }
        )
        .catch(
          err => {
            setMessage({body:`Information of ${contact.name} has already been removed from server`, type:'error'})
            setTimeout(() => {
              setMessage({})
            }, 3000)
          }
        )
    }
  }

  const addName = (e) => {
    e.preventDefault()
    const name = {
      name: newName,
      number: newNumber
    }
    const contactExists = persons.find(
    person => person.name === name.name)

    contactExists ? updateContact(contactExists)
    : setPersonsAndDisplay(name)
    setNewName('')
    setMessage({body:"Contact added successfully", type:''})
    setTimeout(() => {
      setMessage({})
    }, 3000)
    
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
  const handleDelete = (person) => () => {
    const updatedPersonsList = persons.filter(p => p.id !== person.id)
    if (window.confirm(`Delete ${person.name}?`)) {
        contactService
            .del(person.id)
            .then(res => {
              setPersons(updatedPersonsList)
              setPersonsToDisplay(updatedPersonsList)
              setMessage({body:"Contact deleted successfully", type:''})
              setTimeout(() => {
                setMessage({})
              }, 3000)
              })
    }
    
}

  return ( // error #d9534f success #5cb85c
    <div>
      <h2>Phonebook</h2>
      <Notification msg={message.body} type={message.type} />
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
      <ListDisplay 
        list={personsToDisplay} 
        handleDelete={handleDelete}
      />
    </div>
  )

}

export default App
