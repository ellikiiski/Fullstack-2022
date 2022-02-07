import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Contact = ({ name, number }) => {
  return (
    <div>
      <p>{name} {number}</p>
    </div>
  )
}

const AllContacts = ({ persons }) => {
  return (
    <div>
      {persons.map(person => <Contact key={person.name} name={person.name} number={person.number} />)}
    </div>
  )
}

const Filter = ({ value, onChange }) => {
  return (
    <div>
      filter: <input value={value} onChange={onChange}></input>
    </div>
  )
}

const Form = ({ addFunc, nameVariable, nameFunc, numberVariable, numberFunc}) => {
  return (
    <form onSubmit={addFunc}>
      <div>name: <input value={nameVariable} onChange={nameFunc} /></div>
      <div>number: <input value={numberVariable} onChange={numberFunc}/></div>
      <div><button type="submit">add</button></div>
    </form>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])  
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const addNew = (event) => {
    event.preventDefault()
    const names = persons.map(person => person.name)
    if (names.includes(newName)) {
      window.alert(`${newName} is already added to phonebook`);
    } else {
      const newPerson = { name: newName , number: newNumber}
      setPersons(persons.concat(newPerson))
      setNewNumber('')
      setNewName('')
    }
  }

  const handleNewName = (event) => {
    setNewName(event.target.value)
  }

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFiltering = (event) => {
    setFilter(event.target.value)
  }

  const filteredPersons =  persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter value={filter} onChange={handleFiltering} />
      <h2>Add new</h2>
      <Form addFunc={addNew} nameVariable={newName} numberVariable={newNumber}
        nameFunc={handleNewName} numberFunc={handleNewNumber} />
      <h2>Numbers</h2>
      <AllContacts persons={filteredPersons} />
    </div>
  )

}

export default App