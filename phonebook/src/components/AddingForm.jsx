import React from 'react'

function AddingForm({handleSubmit, newName, setNewName, newNumber, setNewNumber}) {
  return (
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
  )
}

export default AddingForm