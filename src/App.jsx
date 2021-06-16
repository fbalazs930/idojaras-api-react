/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import './App.css';
import { WiStrongWind } from 'react-icons/wi';
import { WiRaindrop } from 'react-icons/wi';
import { FaSearchLocation } from 'react-icons/fa';


const App = () => {
  const [city, setCity] = useState('Budapest');
  const [cityName, setCityName] = useState('');
  const [temp, setTemp] = useState(0);
  const [desc, setDesc] = useState('');
  const [humidity, setHumidity] = useState(0);
  const [wind, setWind] = useState(0);
  const [img, setImg] = useState('01d');
  const getData = () => {
    Axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=2cbb02872cc7e2a1ee53454e4b98b7db&lang=hu&units=metric`).then((response) => {
      setCityName(city);
      setTemp(response.data.main.temp);
      setDesc(response.data.weather[0].description);
      setHumidity(response.data.main.humidity);
      setWind(Math.round(response.data.wind.speed * 3.6, 0));
      setImg(response.data.weather[0].icon);
      setCity('');
    })
  }
  useEffect(() => {
    getData();
  }, [])
  const toUppercase = (e) => {
    if (e.target.value.length === 1) {
      e.target.value = e.target.value.toUpperCase();
    }
  }

  const onFormSubmit = (e) => {
    e.preventDefault();
    getData();
    document.querySelector('input').value = '';
  }


  return (
    <div className='container'>
      <form className='input' onSubmit={onFormSubmit} action="">
        <input
          placeholder='Város'
          type='text'
          onChange={(e) => {
            toUppercase(e);
            setCity(e.target.value);
          }
          }
        />
        <button type="button" onClick={getData}><FaSearchLocation className='search' /></button>
      </form>
      <div className="weather-infos">
        <h1 className="name" id="name">
          {cityName}
        </h1>
        <img src={`http://openweathermap.org/img/wn/${img}.png`} alt="" className="image" />
        <p className="desc">
          {desc.charAt(0).toUpperCase() + desc.slice(1)}
        </p>
        <div className="deg">
          <p>{Math.round(temp, 2)} &deg;C</p>
        </div>
        <div className="hum-wind">
          <p className="humidity">
            <WiRaindrop className='react-icon' /> {humidity} %
          </p>
          <p className="wind">
            <WiStrongWind className='react-icon' /> {wind} km/h
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
