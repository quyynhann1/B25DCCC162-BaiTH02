import React from 'react';

const CityList = ({ cities, selectedCity, onSelectCity }) => {
  return (
    <div className="city-list">
      <h3>Danh sách thành phố</h3>
      <div className="city-buttons">
        {cities.map((city) => {
          const isSelected = selectedCity && selectedCity.id === city.id;
          return (
            <button
              key={city.id}
              className={`city-btn ${isSelected ? 'active' : ''}`}
              onClick={() => onSelectCity(city)}
            >
              {city.name}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CityList;