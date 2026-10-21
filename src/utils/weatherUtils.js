export const getWeatherInfo = (code) => {
  if (code === 0) return { description: 'Trời quang', icon: '☀️' };
  if (code >= 1 && code <= 3) return { description: 'Nhiều mây', icon: '⛅' };
  if (code >= 45 && code <= 48) return { description: 'Có sương mù', icon: '🌫️' };
  if (code >= 51 && code <= 57) return { description: 'Mưa phun', icon: '🌧️' };
  if (code >= 61 && code <= 67) return { description: 'Mưa', icon: '🌧️' };
  if (code >= 71 && code <= 77) return { description: 'Tuyết rơi', icon: '❄️' };
  if (code >= 80 && code <= 82) return { description: 'Mưa rào', icon: '🌦️' };
  if (code >= 95) return { description: 'Dông', icon: '⛈️' };
  return { description: 'Không xác định', icon: '🌡️' };
};

// Chuyển đổi độ C sang độ F (chỉ dùng cho hiển thị)
export const convertTemp = (tempC, unit) => {
  if (unit === 'F') {
    return Math.round((tempC * 9) / 5 + 32);
  }
  return Math.round(tempC);
};