import { useState, useEffect } from 'react';

export default function Weather() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // আবহাওয়া ডেটা ফেচ করার কোর ইঞ্জিন
  const fetchWeather = async (cityName) => {
    if (!cityName) return;
    setLoading(true);
    setError('');
    setWeather(null);

    try {
      const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${cityName}&count=1&language=en&format=json`;
      const geoResponse = await fetch(geoUrl);
      const geoData = await geoResponse.json();

      if (!geoData.results || geoData.results.length === 0) {
        setError('CITY NOT FOUND! PLEASE TRY ANOTHER CITY.');
        setLoading(false);
        return;
      }

      const { latitude, longitude, name, country } = geoData.results[0];

      const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,weather_code,wind_speed_10m`;
      const weatherResponse = await fetch(weatherUrl);
      const weatherData = await weatherResponse.json();

      if (weatherResponse.ok) {
        setWeather({
          name: name,
          country: country || '',
          temp: weatherData.current.temperature_2m,
          humidity: weatherData.current.relative_humidity_2m,
          windSpeed: weatherData.current.wind_speed_10m,
          code: weatherData.current.weather_code
        });
      } else {
        setError('COULD NOT FETCH WEATHER DATA.');
      }
    } catch {
      setError('FAILED TO FETCH DATA. CHECK YOUR CONNECTION.');
    } finally {
      setLoading(false);
    }
  };

  // ✅ লিন্টার ও রিঅ্যাক্ট কম্পাইলার ফ্রেন্ডলি নিরাপদ ইনিশিয়াল লোড
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchWeather('Dhaka');
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (city.trim()) {
      fetchWeather(city.trim());
    }
  };

  const getWeatherDetails = (code) => {
    if (code === 0) return { icon: '☀️', text: 'Clear Sky' };
    if ([1, 2, 3].includes(code)) return { icon: '🌤️', text: 'Partly Cloudy' };
    if ([45, 48].includes(code)) return { icon: '🌫️', text: 'Foggy' };
    if ([51, 53, 55, 56, 57].includes(code)) return { icon: '🌦️', text: 'Drizzle' };
    if ([61, 63, 65, 66, 67, 80, 81, 82].includes(code)) return { icon: '🌧️', text: 'Rainy' };
    if ([71, 73, 75, 77, 85, 86].includes(code)) return { icon: '❄️', text: 'Snowy' };
    if ([95, 96, 99].includes(code)) return { icon: '⛈️', text: 'Thunderstorm' };
    return { icon: '🌍', text: 'Unknown' };
  };

  const weatherDetails = weather ? getWeatherDetails(weather.code) : { icon: '🌍', text: '' };

  return (
    <div style={{ maxWidth: '450px', margin: '0 auto', textAlign: 'center', animation: 'fadeIn 0.6s ease-out' }}>
      
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .search-btn:hover {
          background-color: #2980b9 !important;
          transform: scale(1.02);
        }
        .weather-card {
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.01) 100%);
          border: 1px solid rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
        }
      `}</style>

      <h2 style={{ fontSize: '26px', marginBottom: '5px' }}>🌦️ Sky Analytics</h2>
      <p style={{ color: '#aaa', marginBottom: '25px', fontSize: '14px' }}>Keyless Real-time Global Weather Updates</p>

      {/* Search Bar */}
      <form onSubmit={handleSearch} style={{ display: 'flex', gap: '10px', marginBottom: '30px' }}>
        <input
          type="text"
          placeholder="Enter city name... (e.g. Paris, Sylhet)"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          style={{
            flex: 1,
            padding: '12px 15px',
            borderRadius: '8px',
            border: '1px solid #4a4e69',
            backgroundColor: '#2a2e45',
            color: '#fff',
            fontSize: '15px',
            outline: 'none'
          }}
        />
        <button
          type="submit"
          className="search-btn"
          style={{
            padding: '12px 20px',
            backgroundColor: '#3498db',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: 'bold',
            transition: 'all 0.2s ease'
          }}
        >
          Search
        </button>
      </form>

      {/* Loading State */}
      {loading && <div style={{ fontSize: '18px', color: '#3498db', marginTop: '20px' }}>🔄 Scanning satellite logs...</div>}

      {/* Error Message */}
      {error && (
        <div style={{ padding: '15px', backgroundColor: '#ff6b6b22', border: '1px solid #ff6b6b', borderRadius: '8px', color: '#ff6b6b', fontWeight: '500' }}>
          ⚠️ {error}
        </div>
      )}

      {/* Weather Card */}
      {weather && (
        <div className="weather-card" style={{ padding: '30px', borderRadius: '16px', boxShadow: '0 10px 25px rgba(0,0,0,0.3)' }}>
          <h3 style={{ fontSize: '28px', margin: '0 0 5px 0', fontWeight: '600' }}>
            {weather.name}, <span style={{ color: '#3498db', fontSize: '20px' }}>{weather.country}</span>
          </h3>
          <p style={{ margin: '0 0 20px 0', color: '#aaa', fontSize: '14px', textTransform: 'capitalize' }}>
            {weatherDetails.text}
          </p>

          <div style={{ fontSize: '72px', margin: '15px 0', lineHeight: '1' }}>
            {weatherDetails.icon}
          </div>

          <h1 style={{ fontSize: '54px', margin: '0 0 25px 0', fontWeight: '700' }}>
            {Math.round(weather.temp)}<span style={{ color: '#3498db' }}>°C</span>
          </h1>

          {/* Sub Stats */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '20px' }}>
            <div style={{ textAlign: 'left', paddingLeft: '15px' }}>
              <p style={{ margin: '0', fontSize: '12px', color: '#aaa' }}>💧 Humidity</p>
              <h4 style={{ margin: '5px 0 0 0', fontSize: '18px' }}>{weather.humidity}%</h4>
            </div>
            <div style={{ textAlign: 'right', paddingRight: '15px' }}>
              <p style={{ margin: '0', fontSize: '12px', color: '#aaa' }}>💨 Wind Speed</p>
              <h4 style={{ margin: '5px 0 0 0', fontSize: '18px' }}>{weather.windSpeed} km/h</h4>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}