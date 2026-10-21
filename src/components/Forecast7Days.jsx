import React from 'react';
import { getWeatherInfo, convertTemp } from '../utils/weatherUtils';

const Forecast7Days = ({ dailyData, unit }) => {
  if (!dailyData) return null;

  const { time, weather_code, temperature_2m_max, temperature_2m_min } = dailyData;

  const getDayName = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('vi-VN', { weekday: 'long', day: '2-digit', month: '2-digit' });
  };

  return (
    <div className="forecast-container">
      <h3>Dự báo 7 ngày tới</h3>
      <div className="forecast-grid">
        {time.map((date, index) => {
          const { description, icon } = getWeatherInfo(weather_code[index]);
          const maxTemp = convertTemp(temperature_2m_max[index], unit);
          const minTemp = convertTemp(temperature_2m_min[index], unit);

          return (
            <div key={date} className="forecast-card">
              <div className="forecast-date">{getDayName(date)}</div>
              <div className="forecast-icon">{icon}</div>
              <div className="forecast-desc">{description}</div>
              <div className="forecast-temp">
                <span className="max-temp">{maxTemp}°{unit}</span> / <span className="min-temp">{minTemp}°{unit}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Forecast7Days;