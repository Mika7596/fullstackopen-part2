import { useEffect, useState } from "react";
import Filter from "./components/Filter";
import AddingForm from "./components/AddingForm";
import PeopleList from "./components/PeopleList";
import peopleService from './services/persons';
import axios from 'axios'

function App() {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: 123456789 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState(0);
  const [filterValue, setFilterValue] = useState("");

  useEffect(() =>{
    const getAllFunc = peopleService.getAllPeople();
    getAllFunc.then(resp => setPersons(resp.data));
  }, [persons])
  const handleSubmit = (event) => {
    event.preventDefault();
    const names = persons.map((person) => person.name);

    if (!newName || !newNumber) {
      return alert("Please fill out both name and number fields");
    }
    if (names.includes(newName)) {
      return alert(`${newName} is already added to phonebook`);
    }

    const newObject = { name: newName, number: newNumber, id: toString(persons.length+1) };
    // setPersons(persons.concat(newObject));
    setPersons([...persons, newObject]);
    peopleService.createPerson(newObject)
  };

  const deletePerson = id => {
    peopleService.deletePerson(id);
  }

  return (
    <>
      <h2>Phonebook</h2>
      <Filter filterValue={filterValue} setFilterValue={setFilterValue}/>
      <h1>Add a new one</h1>
      <AddingForm handleSubmit={handleSubmit} newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber}></AddingForm>
      <h2>Numbers</h2>
      <PeopleList persons={persons} filterValue={filterValue} deletePerson={deletePerson}/>
    </>
  );
}

export default App;
