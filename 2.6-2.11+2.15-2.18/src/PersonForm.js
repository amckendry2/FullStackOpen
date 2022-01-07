import React from "react";

const personForm = ({nameVal, nameChanged, numVal, numChanged, onSubmit}) => (
    <div>
    <h3>Add New Entry: </h3>
    <form onSubmit={onSubmit}>    
        <div>
            name: <input value={nameVal} onChange={nameChanged}/>
        </div>
        <div>
            number: <input value={numVal} onChange={numChanged}/>
        </div>
        <div>
            <button type="submit">add</button>
        </div>
    </form>
    </div>
)

export default personForm