import React, {useState, useEffect} from 'react';
import CountryData from './CountryData';
import axios from 'axios';

const Country = ({data}) => {
    const [showDetails, setShowDetails] = useState(false);
    const [weather, setWeather] = useState({});

    useEffect(()=>{
        axios.get(`http://api.weatherapi.com/v1/current.json?key=${process.env.REACT_APP_API_KEY}&q=${data.capital}&aqi=yes`)
            .then(res => {
                console.log(`got weather for ${data.capital}`)
                setWeather(res.data)
            })
            .catch(_ => console.log(`couldn't get weather for ${data.capital}`))
    },[data.capital])

    const handleButtonClick = () =>{
        setShowDetails(!showDetails);
    }

    return (
        <React.Fragment>
            <div style={{margin:"5px"}}>
            <h4 style={{display:"inline", margin:"5px"}}>{data.name.common}</h4>
            <button onClick={handleButtonClick}>Details</button>
            </div>
            <CountryData show={showDetails} data={data} weather={weather}/>
        </React.Fragment>
    )
}

export default Country;