import React from "react";

const persons = ({entries, handleDelete}) => (
    <div>
    <h3>Numbers</h3>
    <ul>
        {entries.map( p => 
            <li key={p.name}>
                {p.name + ": " + p.number}
                <button onClick={() => handleDelete(p.id)}>delete</button>
            </li>
        )}
    </ul>
    </div>
)

export default persons;