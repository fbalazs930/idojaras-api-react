import React, { useState } from 'react';
import Axios from 'axios';
import './App.css';

const App = () => {
  const [city, setCity] = useState("");
  const [cityName, setCityName] = useState("");
  const [temp, setTemp] = useState(0);
  const [desc, setDesc] = useState("");
  const [humidity, setHumidity] = useState(0);
  const [wind, setWind] = useState(0);
  const [img, setImg] = useState('01d');
  const getData = () => {
    Axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=2cbb02872cc7e2a1ee53454e4b98b7db&lang=hu&units=metric`).then((response) => {
      setCityName(city);
      setTemp(response.data.main.temp);
      console.log(response.data);
      setDesc(response.data.weather[0].description);
      setHumidity(response.data.main.humidity);
      setWind(Math.round(response.data.wind.speed * 3.6, 0));
      setImg(response.data.weather[0].icon);
    })
  }
  return (
    <div className='container'>
      <div className="input">
        <input
          placeholder='Város'
          type='text'
          onChange={(e) => {
            if (e.target.value.length === 1) {
              e.target.value = e.target.value.toUpperCase();
            }
            setCity(e.target.value)
          }
          }
        />
        <button type="button" onClick={getData}>Search</button>
      </div>
      <div style={cityName.length > 0 ? { opacity: '1' } : { opacity: '0' }} className="weather-infos">
        <div className="left">
          <img src={`http://openweathermap.org/img/wn/${img}.png`} alt="" className="image" />
          <div className="units">
            <p>{Math.round(temp, 2)}</p>
            <p>&deg;C</p>
            <p>&deg;F</p>
          </div>
      </div>
      <div className="mid">
        <p className="humidity">
          Páratartalom: {humidity} %
        </p>
        <p className="wind">
          Szél: {wind} km/h
        </p>
      </div>
      <div className="right">
        <h1 className="name" id="name">
          {cityName}
        </h1>
        <div className="time">
          time
        </div>
        <p className="desc">
          {desc.charAt(0).toUpperCase() + desc.slice(1)}
        </p>
      </div>
    </div>
    </div >
  );
}

export default App;
