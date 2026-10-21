import React from 'react';
import { getWeatherInfo, convertTemp } from '../utils/weatherUtils';

const CurrentWeather = ({ weatherData, cityName, unit }) => {
  if (!weatherData) return null;

  const { temperature_2m, relative_humidity_2m, wind_speed_10m, weather_code, time } = weatherData;
  const { description, icon } = getWeatherInfo(weather_code);
  const formattedTime = new Date(time).toLocaleString('vi-VN');

  return (
    <div className="current-weather-card">
      <h2>{cityName}</h2>
      <div className="weather-main">
        <span className="weather-icon">{icon}</span>
        <span className="temperature">
          {convertTemp(temperature_2m, unit)}°{unit}
        </span>
      </div>
      <p className="description">{description}</p>
      
      <div className="weather-details">
        <p><strong>Độ ẩm:</strong> {relative_humidity_2m}%</p>
        <p><strong>Tốc độ gió:</strong> {wind_speed_10m} km/h</p>
        <p><strong>Cập nhật lúc:</strong> {formattedTime}</p>
      </div>
    </div>
  );
};

export default CurrentWeather;