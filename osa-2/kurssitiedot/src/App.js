import React from 'react'
import Course from './Course'

const Header = ({ name }) => {
  return (
    <div>
      <h1>{name}</h1>
    </div>
  )
}

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 8,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Paskapostauksen abc',
          exercises: 666,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 8,
          id: 2
        }
      ]
    }
  ]
  
  return (
    <div>
      <Header name={'Webbidevauksen lukujärkkä'} />
      {courses.map(course => <Course key={course.id} course={course} />)}
    </div>
  )
}

export default App