import React from 'react'

function Filter({filterValue, setFilterValue}) {
  return (
    <div>
        Filter shown with <input value={filterValue} onChange={(e) => setFilterValue(e.target.value)}></input>
      </div>
  )
}

export default Filter