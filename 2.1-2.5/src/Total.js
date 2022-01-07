import React from "react";

const Total = ({parts}) => {
    const totalParts = parts.reduce((a, c) => a + c.exercises, 0);
    return (
        <div>
            <h2> Total Parts: {totalParts}</h2>
        </div>
    );
}

export default Total;