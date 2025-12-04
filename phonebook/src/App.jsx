import { useEffect, useState } from "react";
import Filter from "./components/Filter";
import AddingForm from "./components/AddingForm";
import PeopleList from "./components/PeopleList";
import peopleService from './services/persons';
import './app.css'

function App() {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: 123456789 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState(0);
  const [filterValue, setFilterValue] = useState("");
  const [showAddingSuccessMessage, setShowAddingSuccessMessage] = useState(false);
  const [showUpdateSuccessMessage, setShowUpdateSuccessMessage] = useState([false, null]);

  useEffect(() =>{
    const getAllFunc = peopleService.getAllPeople();
    getAllFunc.then(resp => setPersons(resp.data));
  }, [persons])

  const handleSubmit = (event) => {
    event.preventDefault();
    const names = persons.map((person) => person.name);
    const repeatedName = persons.find(person => person.name === newName)
    const repeatedUser = persons.find(person => (person.name === newName && person.number === newNumber))

    if (!newName || !newNumber) {
      return alert("Please fill out both name and number fields");
    }
    if (repeatedUser) {
      return alert(`${newName} is already added to phonebook`);
    }
    const newObject = { name: newName, number: newNumber };
    if (names.includes(newName)) {
      const message = `${newName} is already added to phonebook. Replace the old number with the new one?`
      if(confirm(message)) {
        const updatedUser = {...repeatedName, number: newNumber}
        peopleService.updatePerson(updatedUser.id, updatedUser);
        setShowUpdateSuccessMessage([true, updatedUser]);
        return setTimeout(()=>{setShowUpdateSuccessMessage([false, null])}, 5000)
      }
    }

    
    // setPersons(persons.concat(newObject));
    setPersons([...persons, newObject]);
    peopleService.createPerson(newObject);
    setShowAddingSuccessMessage(true);
    setTimeout(()=>{setShowAddingSuccessMessage(false)}, 5000)
  };

  const deletePerson = id => {
    const userToDelete = persons.find(person => person.id == id)
    if (confirm(`Are you sure you want to delete ${userToDelete.name}`)){
      peopleService.deletePerson(id);
    }
  }

  return (
    <>
      <h2>Phonebook</h2>
      {showAddingSuccessMessage && (<div className="success-msg">Added {persons[persons.length-1].name} successfully!</div>)}
      {showUpdateSuccessMessage[0] && (<div className="success-msg">Updated {showUpdateSuccessMessage[1].name}'s phone number successfully!</div>)}
      <Filter filterValue={filterValue} setFilterValue={setFilterValue}/>
      <h1>Add a new one</h1>
      <AddingForm handleSubmit={handleSubmit} newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber}></AddingForm>
      <h2>Numbers</h2>
      <PeopleList persons={persons} filterValue={filterValue} deletePerson={deletePerson}/>
    </>
  );
}

export default App;
