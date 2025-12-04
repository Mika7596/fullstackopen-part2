import React from 'react'

function PeopleList({persons, filterValue, deletePerson}) {
  return (
    <ul>
        {persons.filter(person => person.name.toLowerCase().startsWith(filterValue.toLowerCase()))
        .map((person, index) => (
          <li key={index}>{person.name} : {person.number} <button onClick={() => deletePerson(person.id)}>Delete entry</button></li>
        ))}
      </ul>
  )
}

export default PeopleList