import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

// Day of week mapping
const getDayOfWeek = (date: Date): string => {
  const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  return days[date.getDay()];
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { city } = req.query;

  if (!city) {
    return res.status(400).json({ error: "City is required" });
  }

  const apiKey = process.env.OPENWEATHER_API_KEY || "REPLACE_WITH_YOUR_API_KEY";
  const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&cnt=24&units=metric`;

  try {
    const response = await axios.get(apiUrl);

    // Group forecast by day (taking the max temp for day and min for night)
    const dailyForecasts = new Map();

    // Extract city info first
    const cityInfo = response.data.city;

    response.data.list.forEach((item: any) => {
      const date = new Date(item.dt * 1000);
      const day = date.toISOString().split("T")[0];
      const temp = item.main.temp;
      const isDay = date.getHours() >= 6 && date.getHours() <= 18;

      // Store the first forecast for each day to use as raw data
      if (!dailyForecasts.has(day)) {
        const rawData = {
          ...item,
          name: cityInfo.name,
          coord: cityInfo.coord,
          sys: {
            ...item.sys,
            country: cityInfo.country,
            sunrise: cityInfo.sunrise,
            sunset: cityInfo.sunset,
          },
        };

        dailyForecasts.set(day, {
          date: day,
          dayOfWeek: getDayOfWeek(date),
          high: temp,
          low: temp,
          description: item.weather[0].description,
          nightDescription: "",
          precipitation: Math.round(item.pop * 100) || 0,
          recommendations: [],
          rawData,
        });
      } else {
        const forecast = dailyForecasts.get(day);

        // Update high/low temps
        if (temp > forecast.high) forecast.high = temp;
        if (temp < forecast.low) forecast.low = temp;

        // Update descriptions based on time of day
        if (!isDay && !forecast.nightDescription) {
          forecast.nightDescription = item.weather[0].description;
        }

        // Update precipitation to the highest probability
        const pop = Math.round(item.pop * 100) || 0;
        if (pop > forecast.precipitation) {
          forecast.precipitation = pop;
        }
      }
    });

    // Process recommendations and prepare final data
    const weatherData = Array.from(dailyForecasts.values())
      .slice(0, 5)
      .map((day) => {
        const recommendations = [];

        if (day.description.includes("rain") || day.precipitation > 50) {
          recommendations.push("Carry an umbrella");
        }

        if (day.high > 30) {
          recommendations.push("Use sunscreen lotion");
        }

        if (day.rawData.wind.speed > 5) {
          recommendations.push("It's too windy, watch out!");
        }

        if (day.description.includes("thunderstorm")) {
          recommendations.push("Don't step out! A Storm is brewing!");
        }

        return {
          date: day.date,
          dayOfWeek: day.dayOfWeek,
          high: day.high,
          low: day.low,
          description: day.description || "No data",
          nightDescription: day.nightDescription || "Clear",
          precipitation: day.precipitation,
          recommendations,
          rawData: day.rawData,
        };
      });

    res.status(200).json(weatherData);
  } catch (error) {
    console.error("API Error:", error);
    // Fallback to mock data on error
    res.status(200).json(mockWeatherData(city as string));
  }
};

export default handler;
