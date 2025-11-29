import Part from "./Part"
function Content(props) {
  return (
    <div>
        {props.course.parts.map(part => (
            <Part part={part} key={part.id} />
        ))}
  </div>
  )
}

export default Content