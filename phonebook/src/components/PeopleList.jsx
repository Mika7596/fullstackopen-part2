import React from 'react'

function PeopleList({persons, filterValue}) {
  return (
    <ul>
        {persons.filter(person => person.name.toLowerCase().startsWith(filterValue.toLowerCase()))
        .map((person, index) => (
          <li key={index}>{person.name}</li>
        ))}
      </ul>
  )
}

export default PeopleList