import React from "react";
import Part from "./Part";

const content = ({parts}) => {
    const mapped = parts.map( p => 
        <Part name={p.name} num={p.exercises}/>
    );
    return mapped;
}

export default content;