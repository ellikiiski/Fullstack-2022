import React from 'react'

const SmallHeader = ({ name }) => {
    return (
      <div>
        <h2>{name}</h2>
      </div>
    )
  }
  
  const Part = ({ part, exercises }) => {
    return (
      <div>
        <p>{part} {exercises}</p>
      </div>
    )
  }
  
  const Content = ({ parts }) => {
    return (
      <div>
        {parts.map(part => <Part key={part.id} part={part.name} exercises={part.exercises} />)}
      </div>
    )
  }
  
  const Total = ({ parts }) => {
    let exersices = parts.map(part => part.exercises)
    const sum = exersices.reduce((partial, next) => partial + next, 0)
    return (
      <div>
        <h4>Number of exercises {sum}</h4>
      </div>
    )
  }
  
  const Course = ({ course }) => {
    return (
      <div>
        <SmallHeader name={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
      </div>
    )
  }

  export default Course