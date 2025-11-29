import React from 'react'
import Header from './Header'
import Content from './Content'

function Course(props) {
  return (
    <>
    <Header course={props.course}/>
    <Content course={props.course} />
    </>
  )
}

export default Course