import React from "react";

const filter = ({value, onChange}) => (
    <div>
    <h3>Filter Entries:</h3>
    by name: <input value={value} onChange={onChange}/>
    </div>
)

export default filter