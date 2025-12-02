import React, { useEffect, useState } from "react";

const Weather = () => {
  const [city, setCity] = useState("Pune");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  const API_KEY = "eab274e3f8eefd1f6b68f24f84b8945d";

  useEffect(() => {
    if (!city) return;

    const controller = new AbortController();
    const { signal } = controller;

    const fetchWeather = async () => {
      try {
        setError(null);
        setWeather(null);

        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`,
          { signal }
        );

        if (!res.ok) {
          throw new Error("City Not Found!!");
        }

        const data = await res.json();
        setWeather(data);
      } catch (err) {
        if (err.name !== "AbortError") {
          setWeather(null);
          setError(err.message);
        }
      }
    };

    fetchWeather();

    return () => {
      controller.abort();
    };
  }, [city]);

  return (
    <div className="weather">
      <label>
        <h2>
          <b>Enter City Name</b>
        </h2>
      </label>

      <input
        type="text"
        id="city"
        placeholder="Enter City here"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />

      {error && <p style={{ color: "red" }}>{error}</p>}

      {weather ? (
        <div>
          <h2>{weather.name}</h2>
          <p>Temperature: {weather.main.temp} °C</p>
          <p>Condition: {weather.weather[0].description}</p>
          <p>Wind Speed: {weather.wind.speed} m/s</p>
        </div>
      ) : (
        !error && <p>Loading Weather...</p>
      )}
    </div>
  );
};

export default Weather;
