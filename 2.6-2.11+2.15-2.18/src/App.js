import React, { useState, useEffect } from 'react'
import Filter from './Filter'
import PersonForm from './PersonForm'
import Persons from './Persons'
import entryService from './services/entries'

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('')
  const [ filter, setNewFilter] = useState('')

  useEffect(() => {
    entryService
      .getAll()
      .then(data => setPersons(data))
      .catch(err => console.log(err))
  }, [])

  const handleNameChange = e => setNewName(e.target.value)
  const handleNumberChange = e => setNewNumber(e.target.value)
  const handleFilterChange = e => setNewFilter(e.target.value)

  
  const handleAddEntry = e => {
    e.preventDefault()
    const oldEntry = persons.find(p => p.name === newName);
    if(oldEntry && window.confirm(`${newName} is already in the phonebook. Replace the old number with a new one?`)){
      const newEntry = {...oldEntry, number: newNumber};
      entryService
        .update(oldEntry.id, newEntry)
        .then(data => 
            setPersons(persons.map(p => p.id === data.id ? newEntry : p)))
        .catch(err => console.log(err.response.data.error))
    } else {
      entryService
        .create({name: newName, number: newNumber})
        .then(data => setPersons([...persons, data]))
        .catch(err => console.log(err.response.data.error))
    }
  }

  const handleDeleteEntry = id => {
    const entryName = persons.find(e => e.id === id).name;
    if(window.confirm(`Delete ${entryName}?`)){
      entryService
        .remove(id)
        .then(setPersons(persons.filter(p => p.id !== id)))
        .catch(err => console.log(err))
    }
  }

  const displayedEntries = filter.length > 0 ? 
    persons.filter( p => 
      p.name.toLowerCase().includes(filter.toLowerCase())) 
    : 
    persons


  return (
    <div>

    <h2>Phonebook</h2>

    <Filter value={filter} onChange={handleFilterChange}/>
    
    <PersonForm 
      nameVal={newName} 
      nameChanged={handleNameChange}
      numVal={newNumber}
      numChanged={handleNumberChange}
      onSubmit={handleAddEntry}
    />
    
    <Persons entries={displayedEntries} handleDelete={handleDeleteEntry}/>
    

    </div>
  )
}

export default App