import React, { useState, useEffect } from 'react';
import { CITIES } from './data/cities';
import CityList from './components/CityList';
import CurrentWeather from './components/CurrentWeather';
import Forecast7Days from './components/Forecast7Days';
import './App.css';

function App() {
  const [selectedCity, setSelectedCity] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [unit, setUnit] = useState('C'); // 'C' hoặc 'F'

  // Fetch dữ liệu thời tiết từ Open-Meteo API
  const fetchWeather = async (city) => {
    if (!city) return;
    setLoading(true);
    setError(null);

    const url = `https://api.open-meteo.com/v1/forecast?latitude=${city.lat}&longitude=${city.lng}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Không thể tải dữ liệu thời tiết từ server.');
      }
      const data = await response.json();
      setWeatherData(data);
    } catch (err) {
      setError(err.message || 'Đã có lỗi xảy ra.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedCity) {
      fetchWeather(selectedCity);
    }
  }, [selectedCity]);

  // Chuyển đổi độ C / F (YC5: Không gọi lại API)
  const toggleUnit = () => {
    setUnit((prev) => (prev === 'C' ? 'F' : 'C'));
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Ứng Dụng Thời Tiết Việt Nam</h1>
        <button className="unit-toggle-btn" onClick={toggleUnit}>
          Đổi sang °{unit === 'C' ? 'F' : 'C'}
        </button>
      </header>

      <main className="app-content">
        {/* YC1: Danh sách thành phố */}
        <CityList
          cities={CITIES}
          selectedCity={selectedCity}
          onSelectCity={(city) => setSelectedCity(city)}
        />

        {/* YC4: Các trạng thái chưa chọn, đang tải, lỗi */}
        {!selectedCity && (
          <div className="status-message info">
            👈 Vui lòng chọn một thành phố để xem thông tin thời tiết.
          </div>
        )}

        {loading && (
          <div className="status-message loading">
            ⏳ Đang tải dữ liệu thời tiết...
          </div>
        )}

        {error && (
          <div className="status-message error">
            ⚠️ {error}
            <br />
            <button className="retry-btn" onClick={() => fetchWeather(selectedCity)}>
              Thử lại
            </button>
          </div>
        )}

        {/* YC2 & YC3: Hiển thị thời tiết hiện tại và dự báo 7 ngày */}
        {!loading && !error && weatherData && selectedCity && (
          <div className="weather-display-grid">
            <CurrentWeather
              weatherData={weatherData.current}
              cityName={selectedCity.name}
              unit={unit}
            />
            <Forecast7Days
              dailyData={weatherData.daily}
              unit={unit}
            />
          </div>
        )}
      </main>
    </div>
  );
}

export default App;