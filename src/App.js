import './App.css';
import React, { useState } from 'react';
const api = {
  key: "1fd7203b42d668d7c5754ab3d32488e4",
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {

  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = evt => {
    if(evt.key === "Enter"){
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setQuery('');
          setWeather(result);
          console.log(result);
        });
    }
  }

  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }

  return (
    <div className={
      (typeof weather.main != "undefined") 
      ? ((weather.main.temp > 16) 
         ? 'app warm' : 
         'App') : 
         'App'}>

         <h1>Weather App</h1>
      
      <main>
        <div className="search-box">
          <input 
            type="text" 
            className="search-bar" 
            placeholder="Enter City"
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        {(typeof weather.main != "undefined") ? (
          <div>
             <div className="location-box">
          <div className="location">{weather.name}, {weather.sys.country}</div>
          <div className="date">{dateBuilder(new Date())}</div>
        </div>
        <div className="weather-box">
          <div className="temp">{Math.round(weather.main.temp)}°c</div>
          
          <div className="maxmin">
            <span className="mami">Min: {Math.round(weather.main.temp_min)}°c</span> <span className="mami">Max: {Math.round(weather.main.temp_max)}°c</span>
          </div>
          <div className="humidity">Humidity: {Math.round(weather.main.humidity)}%</div>
          <div className="windspeed">Wind Speed: {Math.round(weather.wind.speed)} kmph</div>
          <br />
          <div className="weather">{weather.weather[0].main}</div>
        </div>
          </div>
       
        ) : ('')}
      </main>
    </div>
  );
}

export default App;
