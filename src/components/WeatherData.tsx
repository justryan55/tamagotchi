import { useEffect, useState } from "react";
import weatherIcons from "@/content/weatherIcons";
import Image from "next/image";

export default function WeatherData() {
  const [weather, setWeather] = useState<React.ReactNode>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const apiKey = process.env.WEATHER_API_KEY;

  useEffect(() => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        fetchWeather(latitude, longitude);
      },
      () => {
        console.log("Unable to fetch your position");
      }
    );

    const fetchWeather = async (lat: number, lon: number) => {
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

        setIsLoading(false);
      } catch {
        console.log("Unable to fetch the weather");
      }
    };
  }, []);

  return (
    <div>
      {isLoading ? (
        <Image
          src="/images/spinner.svg"
          width={40}
          height={40}
          alt="loading-spinner"
        />
      ) : (
        weather
      )}
    </div>
  );
}
