import React from 'react'

function Total(props) {
    const sum = props.course.parts.map(part => part.exercises).reduce((a, b) => a + b)
  return (
    <h3>
        Total of {sum} exercises
        </h3>
  )
}

export default Total