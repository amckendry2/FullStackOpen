import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Country from './Country';

function App() {

  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all")
      .then(res => {
        console.log(res.data)
        setCountries(res.data)
      })
      .catch(err => console.log(err))
  }, [])
  

  const handleFilterChange = e => setFilter(e.target.value.toLowerCase())

  const countryComps = countries
    .filter( c => {
      return c.name.common.toLowerCase().includes(filter)})
    .map(c => 
      <Country key={c.cca2} data={c}/>
  )

  return (
    <React.Fragment>
      <input value={filter} onChange={handleFilterChange}></input>
      {/* <p>{process.env.REACT_APP_API_KEY}</p> */}
      {countryComps}
    </React.Fragment>
  );
}

export default App;
