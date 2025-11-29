import React from 'react'
import Header from './Header'
import Content from './Content'
import Total from './Total'

function Course(props) {
  return (
    <>
    <Header course={props.course}/>
    <Content course={props.course} />
    <Total course={props.course} />
    </>
  )
}

export default Course