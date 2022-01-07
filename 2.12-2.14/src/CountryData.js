import React from "react";

const CountryData = ({data, show, weather}) => {

    let weatherData = null
    if('current' in weather){
        weatherData = (
            <div>
                <p>Current temp: {weather.current.temp_f}</p>
                <p>Condition: {weather.current.condition.text}</p>
                <img src={weather.current.condition.icon}/>
            </div>
        )
    }

    return (
        show ? 
        (
            <div>
                <p>{'capital: ' + data.capital}</p>
                <p>{'subregion: ' + data.subregion}</p>
                <h4>languages</h4>
                <ul>
                    {Object.values(data.languages).map( (l, i) => 
                    <li key={i}>{l}</li>
                    )}
                </ul>
                <img src={data.flags.png} alt="alt"/>
                {weatherData}
            </div>
        )
        :
        null
    )
}

export default CountryData;