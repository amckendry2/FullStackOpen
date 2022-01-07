import React from "react"
import Header from "./Header"
import Content from "./Content/Content"
import Total from './Total'

const course = ({course}) => (
    <div>
        <Header name={course.name}/>
        <Content parts={course.parts}/>
        <Total parts={course.parts}/>
    </div>
)

export default course;