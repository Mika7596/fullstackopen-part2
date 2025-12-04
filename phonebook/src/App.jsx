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
  const [showDeleteSuccessMessage, setShowDeleteSuccessMessage] = useState([false, null]);
  const [showErrorMessage, setShowErrorMessage] = useState([false, null])

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
        peopleService.updatePerson(updatedUser.id, updatedUser)
        .then(resp =>{
          setShowUpdateSuccessMessage([true, updatedUser]);
          return setTimeout(()=>{setShowUpdateSuccessMessage([false, null])}, 4000)
        })
        .catch(err => {
          setShowErrorMessage([true, updatedUser.name]);
          return setTimeout(()=>{setShowErrorMessage([false, null])}, 4000)
        });
      }
    }

    
    // setPersons(persons.concat(newObject));
    setPersons([...persons, newObject]);
    peopleService.createPerson(newObject);
    setShowAddingSuccessMessage(true);
    setTimeout(()=>{setShowAddingSuccessMessage(false)}, 4000)
  };

  const deletePerson = id => {
    const userToDelete = persons.find(person => person.id == id)
    if (confirm(`Are you sure you want to delete ${userToDelete.name}`)){
      peopleService.deletePerson(id)
      .then(resp => {
        console.log(resp.data.name)
        setShowDeleteSuccessMessage([true, resp.data.name])
        setTimeout(()=>{setShowDeleteSuccessMessage([false, null])}, 4000)
      })
      .catch(err => {
        console.log(err, userToDelete);
        setShowErrorMessage([true, userToDelete.name]);
        setTimeout(() => {setShowErrorMessage([false, null])}, 4000)
      });
    }
  }

  return (
    <>
      <h2>Phonebook</h2>
      {showAddingSuccessMessage && (<div className="success-msg">Added {persons[persons.length-1].name} successfully!</div>)}
      {showUpdateSuccessMessage[0] && (<div className="success-msg">Updated {showUpdateSuccessMessage[1].name}'s phone number successfully!</div>)}
      {showDeleteSuccessMessage[0] && (<div className="success-msg">Deleted {showDeleteSuccessMessage[1]} from phonebook successfully!</div>)}
      {showErrorMessage[0] && (<div className="error-msg">Cannot find {showErrorMessage[1]} on the phonebook, seems like it's been already deleted.</div>)}
      <Filter filterValue={filterValue} setFilterValue={setFilterValue}/>
      <h1>Add a new one</h1>
      <AddingForm handleSubmit={handleSubmit} newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber}></AddingForm>
      <h2>Numbers</h2>
      <PeopleList persons={persons} filterValue={filterValue} deletePerson={deletePerson}/>
    </>
  );
}

export default App;
