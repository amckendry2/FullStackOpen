import React from "react";
import Part from "./Part";

const Content = props => {
    const parts = props.parts.map( p => 
        <Part name={p.name} num={p.exercises}/>
    );
    return parts;
}

export default Content;