import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import './App.css';

const App = () => {
  const [city, setCity] = useState("");
  const [cityName, setCityName] = useState("");
  const [temp, setTemp] = useState(0);
  const [desc, setDesc] = useState("");
  const [weatherImg, setWeatherImg] = useState("");
  const [humidity, setHumidity] = useState(0);
  const [wind, setWind] = useState(0);
  const getData = () => {
    Axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=2cbb02872cc7e2a1ee53454e4b98b7db&lang=hu&units=metric`).then((response) => {
      setCityName(city);
      setTemp(response.data.main.temp);
      setDesc(response.data.weather[0].description);
      setHumidity(response.data.main.humidity);
      setWind(Math.round(response.data.wind.speed * 3.6, 0));
    })
  }
  useEffect(() => {
    switch (desc) {
      case "tiszta égbolt":
        setWeatherImg("https://i.postimg.cc/XYWxrv6s/sunny.png");
        break;
      case "kevés felhő":
        setWeatherImg("https://i.postimg.cc/Hkw2C8jp/cloudy.png");
        break;
      case "erős felhőzet":
        setWeatherImg("https://i.postimg.cc/Hkw2C8jp/cloudy.png");
        break;
      case "borús égbolt":
        setWeatherImg("https://i.postimg.cc/Hkw2C8jp/cloudy.png");
        break;
      case "köd":
        setWeatherImg("https://i.postimg.cc/HWr9khjv/fog.png");
        break;
      case "enyhe eső":
        setWeatherImg("https://i.postimg.cc/s2P5bk61/rain-s-cloudy.png");
        break;
      default:
        setWeatherImg("https://i.postimg.cc/XYWxrv6s/sunny.png");
        break;
    }
  }, [desc])
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
        <button type="button" onClick={() => getData()}>Search</button>
      </div>
      <div className="weather">
        <h1 className="name" id="name">
          {cityName}
        </h1>
        <img src={weatherImg} alt="" className="weather-image" />
        <p className="temp">
          {temp} &deg;C
        </p>
        <p className="humidity">
          Páratartalom: {humidity} %
        </p>
        <p className="wind">
          Szél: {wind} km/h
        </p>
        <p className="desc">
          {desc.charAt(0).toUpperCase() + desc.slice(1)}
        </p>
      </div>
    </div>
  );
}

export default App;
