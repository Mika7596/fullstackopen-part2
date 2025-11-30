import { useState } from "react";

function App() {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: 123456789 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState(0);

  const handleSubmit = (event) => {
    event.preventDefault();
    const names = persons.map((person) => person.name);

    if (!newName || !newNumber) {
      return alert("Please fill out both name and number fields");
    }
    if (names.includes(newName)) {
      return alert(`${newName} is already added to phonebook`);
    }

    const newObject = { name: newName, number: newNumber };
    // setPersons(persons.concat(newObject));
    setPersons([...persons, newObject]);
  };
  
  return (
    <>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name:{" "}
          <input value={newName} onChange={(e) => setNewName(e.target.value)} />
        </div>
        <div>
          number:{" "}
          <input
            type="number"
            value={newNumber}
            onChange={(e) => setNewNumber(e.target.value)}
          ></input>{" "}
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map((person, index) => (
          <li key={index}>{person.name}</li>
        ))}
      </ul>
    </>
  );
}

export default App;
