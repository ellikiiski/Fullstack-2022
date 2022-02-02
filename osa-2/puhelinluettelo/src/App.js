import React, { useState } from 'react'

const Contact = ({ name }) => {
  return (
    <div>
      <p>{name}</p>
    </div>
  )
}

const AllContacts = ({ persons }) => {
  return (
    <div>
      {persons.map(person => <Contact key={person.name} name={person.name} />)}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Elli Kiiski' }
  ]) 
  const [newName, setNewName] = useState('')

  const addNew = (event) => {
    event.preventDefault()
    const newPerson = { name: newName }
    setPersons(persons.concat(newPerson))
    setNewName('')
  }

  const handleNewName = (event) => {
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addNew}>
        <div>
          name: <input value={newName} onChange={handleNewName} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <AllContacts persons={persons} />
    </div>
  )

}

export default App