import React from 'react'

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

const Header = props => (
  <h1>{props.course}</h1>
)

const Part = props => (
  <div>
    <h3>{props.exercise}</h3>
    <p>Parts: {props.num}</p>
  </div>
)

const Content = () => (
  <div>
    <Part exercise={part1} num={exercises1}/>
    <Part exercise={part2} num={exercises2}/>
    <Part exercise={part3} num={exercises3}/>
  </div>
)

const Total = props => (
  <div>
    <h2> Total Parts: {props.totals.reduce((a,c)=>a+c)}</h2>
  </div>
)
  return (
    <div>
      <Header course={course}/>
      <Content/>
      <Total totals={[exercises1, exercises2, exercises3]}/>
    </div>
  )
}

export default App
