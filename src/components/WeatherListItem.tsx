import { useState } from "react";
import styles from "./WeatherListItem.module.css";

type WeatherListItemProps = {
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

export default function WeatherListItem({
  date,
  dayOfWeek,
  high,
  low,
  description,
  nightDescription,
  precipitation,
  recommendations,
  rawData,
}: WeatherListItemProps) {
  const [expanded, setExpanded] = useState(false);

  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    month: "numeric",
    day: "numeric",
  });

  // Weather icon based on description
  const getWeatherIcon = () => {
    const desc = description.toLowerCase();
    if (desc.includes("clear") || desc.includes("sunny")) {
      return "☀️";
    } else if (desc.includes("cloud")) {
      return "⛅";
    } else if (desc.includes("rain") || desc.includes("drizzle")) {
      return "🌧️";
    } else if (desc.includes("thunderstorm")) {
      return "⛈️";
    } else if (desc.includes("snow")) {
      return "❄️";
    } else if (desc.includes("mist") || desc.includes("fog")) {
      return "🌫️";
    } else {
      return "🌤️";
    }
  };

  const handleToggleExpand = (e: React.MouseEvent) => {
    e.stopPropagation();
    setExpanded(!expanded);
  };

  return (
    <>
      <div className={`${styles.listItem} ${expanded ? styles.expanded : ""}`}>
        {/* Day info column */}
        <div className={styles.dayColumn}>
          <div className={styles.dayTitle}>{dayOfWeek}</div>
          <div className={styles.dayDate}>{formattedDate}</div>
        </div>

        {/* Weather icon column */}
        <div className={styles.iconColumn}>{getWeatherIcon()}</div>

        {/* Temperature column */}
        <div className={styles.tempColumn}>
          <span className={styles.highTemp}>{Math.round(high)}°</span>
          <span className={styles.lowTemp}>{Math.round(low)}°</span>
        </div>

        {/* Description column */}
        <div className={styles.descColumn}>
          <div className={styles.mainDescription}>
            {description.charAt(0).toUpperCase() + description.slice(1)}
          </div>
          <div className={styles.nightInfo}>
            <span className={styles.moonIcon}>🌙</span>
            <span>{nightDescription || "Night: Clear"}</span>
          </div>
        </div>

        {/* Precipitation column */}
        <div className={styles.precipColumn}>
          <span className={styles.dropIcon}>💧</span>
          <span className={styles.precipValue}>{precipitation}%</span>
        </div>

        {/* Recommendations column */}
        <div className={styles.recColumn}>
          {recommendations.map((rec, index) => (
            <div key={index} className={styles.recommendationItem}>
              {rec}
            </div>
          ))}
        </div>

        <div className={styles.expandToggle} onClick={handleToggleExpand}>
          {expanded ? "▲" : "▼"}
        </div>
      </div>

      {/* Detailed expanded view */}
      {expanded && (
        <div className={styles.detailedView}>
          <div className={styles.detailsGrid}>
            <div className={styles.detailCard}>
              <h3>Temperatures</h3>
              <div className={styles.detailItem}>
                <span>Feels Like:</span>
                <span>
                  {rawData?.main?.feels_like !== undefined
                    ? `${Math.round(rawData.main.feels_like)}°C`
                    : "N/A"}
                </span>
              </div>
              <div className={styles.detailItem}>
                <span>Min Temp:</span>
                <span>
                  {rawData?.main?.temp_min !== undefined
                    ? `${Math.round(rawData.main.temp_min)}°C`
                    : "N/A"}
                </span>
              </div>
              <div className={styles.detailItem}>
                <span>Max Temp:</span>
                <span>
                  {rawData?.main?.temp_max !== undefined
                    ? `${Math.round(rawData.main.temp_max)}°C`
                    : "N/A"}
                </span>
              </div>
            </div>

            <div className={styles.detailCard}>
              <h3>Wind</h3>
              <div className={styles.detailItem}>
                <span>Speed:</span>
                <span>
                  {rawData?.wind?.speed !== undefined
                    ? `${rawData.wind.speed} m/s`
                    : "N/A"}
                </span>
              </div>
              <div className={styles.detailItem}>
                <span>Direction:</span>
                <span>
                  {rawData?.wind?.deg !== undefined
                    ? `${rawData.wind.deg}°`
                    : "N/A"}
                </span>
              </div>
              <div className={styles.detailItem}>
                <span>Gust:</span>
                <span>
                  {rawData?.wind?.gust !== undefined
                    ? `${rawData.wind.gust} m/s`
                    : "N/A"}
                </span>
              </div>
            </div>

            <div className={styles.detailCard}>
              <h3>Pressure & Humidity</h3>
              <div className={styles.detailItem}>
                <span>Pressure:</span>
                <span>
                  {rawData?.main?.pressure !== undefined
                    ? `${rawData.main.pressure} hPa`
                    : "N/A"}
                </span>
              </div>
              <div className={styles.detailItem}>
                <span>Sea Level:</span>
                <span>
                  {rawData?.main?.sea_level !== undefined
                    ? `${rawData.main.sea_level} hPa`
                    : "N/A"}
                </span>
              </div>
              <div className={styles.detailItem}>
                <span>Humidity:</span>
                <span>
                  {rawData?.main?.humidity !== undefined
                    ? `${rawData.main.humidity}%`
                    : "N/A"}
                </span>
              </div>
            </div>

            <div className={styles.detailCard}>
              <h3>Visibility & Clouds</h3>
              <div className={styles.detailItem}>
                <span>Visibility:</span>
                <span>
                  {rawData?.visibility
                    ? `${rawData.visibility / 1000} km`
                    : "N/A"}
                </span>
              </div>
              <div className={styles.detailItem}>
                <span>Cloud Coverage:</span>
                <span>
                  {rawData?.clouds?.all !== undefined
                    ? `${rawData.clouds.all}%`
                    : "N/A"}
                </span>
              </div>
              <div className={styles.detailItem}>
                <span>Precipitation:</span>
                <span>
                  {rawData?.pop !== undefined
                    ? `${Math.round(rawData.pop * 100)}%`
                    : "N/A"}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
