import { useState } from "react";
import weatherIcons from "@/content/weatherIcons";

export default function WeatherData() {
  const [weather, setWeather] = useState<React.ReactNode>();

  if (!navigator.geolocation) return;
  const apiKey = process.env.WEATHER_API_KEY;

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const { latitude, longitude } = position.coords;
      fetchWeather(latitude, longitude);
    },
    () => {
      console.log("Unable to fetch your position");
    }
  );

  const fetchWeather = async (lat, lon) => {
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
      );
      const data = await res.json();
      const weather = data.weather[0];

      if (weather.main === "Clouds") {
        setWeather(weatherIcons.clouds);
      }

      if (weather.main === "Clear") {
        setWeather(weatherIcons.clear);
      }

      if (weather.main === "Rain") {
        setWeather(weatherIcons.rain);
      }
    } catch {
      console.log("Unable to fetch the weather");
    }
  };

  return <div>{weather}</div>;
}
