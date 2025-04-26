import { useState } from "react";
import axios from "axios";
import WeatherListItem from "../components/WeatherListItem";
import styles from "../styles/Home.module.css";

type WeatherData = {
  date: string;
  dayOfWeek: string;
  high: number;
  low: number;
  description: string;
  nightDescription?: string;
  precipitation: number;
  recommendations: string[];
  rawData?: any;
};

export default function Home() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState<WeatherData[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const fetchWeather = async () => {
    if (!city.trim()) {
      setError("Please enter a city name");
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.get(
        `/api/weather?city=${encodeURIComponent(city)}`
      );
      setWeatherData(response.data);
      setError("");
    } catch (err: any) {
      setError(err.response?.data?.error || "Something went wrong");
      setWeatherData([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Weather Forecast App</h1>

      <div className={styles.controls}>
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className={styles.input}
          onKeyPress={(e) => e.key === "Enter" && fetchWeather()}
        />
        <button
          onClick={fetchWeather}
          disabled={isLoading}
          className={styles.button}
        >
          {isLoading ? "Loading..." : "Get Weather"}
        </button>
      </div>

      {error && <p className={styles.error}>{error}</p>}

      {weatherData.length > 0 && (
        <div className={styles.weatherListContainer}>
          <h2 className={styles.forecastTitle}>
            {weatherData.length}-Day Weather Forecast for {city}
          </h2>
          <div className={styles.weatherList}>
            {weatherData.map((day, index) => (
              <WeatherListItem key={index} {...day} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
