import React from 'react'

const Header = (props) => {
    return (
        <div>
        <h2>
            {props.title}
        </h2>
        </div>
    )}

const Part = (props) => (
    <div>
        <p>
        {props.part} {props.exercise}
        </p>
    </div>
    )

const Content = ({parts}) => (
    <div>
        {parts.map(part => <Part part={part.name} exercise={part.exercises} key={part.id}/>)}
    </div>
    )

const Total = ({total}) => (
    <div>
        <b>
        Number of exercises {total.reduce((s, p) => (s + p.exercises), 0)}
        </b>
    </div>
    )


const Course = ({courses}) => {
    return (
      <div>
      {courses.map(
        course =>  
        <div key={course.id} >
          <Header title={course.name} />
          <Content parts={course.parts}/>      
          <Total total={course.parts}/>
        </div>
      )}
        
      </div>
    )
  }

export default Course