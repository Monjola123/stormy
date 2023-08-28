import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function Home() {
    const [data, setData] = useState({
        celcius: 0,
        name: 'location',
        humidity: 0,
        speed: 0,
        image: '',
        weatherIconClass: '',
    });
    const [cityName, setCityName] = useState('');
    const [cityNotFound, setCityNotFound] = useState(false);
    const [currentTime, setCurrentTime] = useState(new Date());
    const [loading, setLoading] = useState(false);

    const updateCurrentTime = () => {
        setCurrentTime(new Date());
    };

    useEffect(() => {
        const interval = setInterval(updateCurrentTime, 1000);
        return () => clearInterval(interval);
    }, []);

    const handleClick = () => {
        if (cityName !== '') {
            setLoading(true);
            setTimeout(() => {
                const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=bed6f4e637565132d5aecf6fa1f3297f&units=metric`;
                axios
                    .get(apiUrl)
                    .then((res) => {
                        setData({
                            celcius: res.data.main.temp,
                            name: res.data.name,
                            humidity: res.data.main.humidity,
                            speed: res.data.wind.speed,
                            weatherIconClass: res.data.weather[0].icon,
                        });
                        setCityNotFound(false);
                        setLoading(false);
                    })
                    .catch((err) => {
                        console.log(err);
                        setCityNotFound(true);
                        setLoading(false);
                    });
            }, 2000); 
        }
    };

    return (
        <div className='container'>
            <div className='weather'>
                <div className='search'>
                    <input
                        type='text'
                        placeholder='weather where you are'
                        value={cityName}
                        onChange={(e) => setCityName(e.target.value)}
                    />
                    <button onClick={handleClick}>
                        <img
                            src='https://www.pngmart.com/files/8/Search-Button-PNG-HD-Quality.png'
                            alt=''
                        />
                    </button>
                </div>
                <div className='weather-info'>
                    {loading ? (
                        <div className='loading-animation '>
                        <i className='wi wi-rain loading-icon ' /> 
                    </div>
                    
                    ) : cityNotFound ? (
                        <p className='not-found-message'>Location not found. Please try another location.</p>
                    ) : (
                        <>
                            <i className={`wi ${data.weatherIconClass}`} />
                            <h1>{data.celcius}°C</h1>
                            <h2>{data.name}</h2>
                            <div className='details'>
                                <div className='col'>
                                    <i className='wi wi-humidity' />
                                    <div className='humidity'>
                                        <p>{data.humidity}%</p>
                                        <p>Humidity</p>
                                    </div>
                                </div>
                                <div className='col'>
                                    <i className='wi wi-strong-wind' />
                                    <div className='wind'>
                                        <p>{data.speed} km/h</p>
                                        <p>Wind</p>
                                    </div>
                                </div>
                            </div>
                            <p className='current-time'>{currentTime.toLocaleTimeString()}</p>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Home;
