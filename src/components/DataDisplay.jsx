//Libarys
import styled from "styled-components";
import { useRef, useEffect, useState } from "react";

//Components
import HoursPreview from "./HoursPreview.jsx";
import DaysPreview from "./DaysPreview.jsx";
import Switch from "./Switch.jsx";

import DropIcon from "./DropIcon.jsx";
import WindIcon from "./WindIcon.jsx";

//Assets
import clearDay from "../assets/clear-day.svg";
import clearNight from "../assets/clear-night.svg";
import cloudy from "../assets/cloudy.svg";
import partlyCloudyDay from "../assets/partly-cloudy-day.svg";
import partlyCloudyNight from "../assets/partly-cloudy-night.svg";
import fog from "../assets/fog.svg";
import rain from "../assets/rain.svg";
import showersDay from "../assets/showers-day.svg";
import showersNight from "../assets/showers-night.svg";
import snow from "../assets/snow.svg";
import snowShowersDay from "../assets/snow-showers-day.svg";
import snowShowersNight from "../assets/snow-showers-night.svg";
import sleet from "../assets/sleet.svg";
import hail from "../assets/hail.svg";
import rainSnow from "../assets/rain-snow.svg";
import rainSnowShowersDay from "../assets/rain-snow-showers-day.svg";
import rainSnowShowersNight from "../assets/rain-snow-showers-night.svg";
import thunder from "../assets/thunder.svg";
import thunderRain from "../assets/thunder-rain.svg";
import thunderShowersDay from "../assets/thunder-showers-day.svg";
import thunderShowersNight from "../assets/thunder-showers-night.svg";
import wind from "../assets/wind.svg";

const weatherIcons = {
  "clear-day": clearDay,
  "clear-night": clearNight,
  cloudy: cloudy,
  "partly-cloudy-day": partlyCloudyDay,
  "partly-cloudy-night": partlyCloudyNight,
  fog: fog,
  rain: rain,
  "showers-day": showersDay,
  "showers-night": showersNight,
  snow: snow,
  "snow-showers-day": snowShowersDay,
  "snow-showers-night": snowShowersNight,
  sleet: sleet,
  hail: hail,
  "rain-snow": rainSnow,
  "rain-snow-showers-day": rainSnowShowersDay,
  "rain-snow-showers-night": rainSnowShowersNight,
  thunder: thunder,
  "thunder-rain": thunderRain,
  "thunder-showers-day": thunderShowersDay,
  "thunder-showers-night": thunderShowersNight,
  wind: wind,
};

export default function DataDisplay({ weatherData }) {
  const [unit, setUnit] = useState("celsius");

  const hoursContainerRef = useRef(null);

  useEffect(() => {
    if (!hoursContainerRef.current || !weatherData) return;
    const hoursSlotsWidth = 135;
    const currentDayTime = weatherData.currentConditions.datetime;
    hoursContainerRef.current.scrollTo({
      left: hoursSlotsWidth * currentDayTime.slice(0, 2) - 25,
      behavior: "smooth",
    });
  }, [weatherData]);

  if (!weatherData) return null;

  const currentDayTime = weatherData.currentConditions.datetime;

  const todaysWeatherIcon = weatherIcons[weatherData.days[0].icon];

  function roundTimeOf(zeitString) {
    const stunde = zeitString.split(":")[0];
    return `${stunde}:00:00`;
  }

  function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  function convertToCelsius(temp) {
    return (((temp - 32) * 5) / 9).toFixed(1);
  }

  function convertToKMH(speed) {
    return (speed * 1.60934).toFixed(1);
  }
  return (
    <StyledContainer $unit={unit}>
      <div className="switch-container">
        <span>°C</span>
        <Switch unit={unit} setUnit={setUnit} />
        <span>°F</span>
      </div>

      <div className="today-container">
        <h2>{capitalize(weatherData.address)}</h2>
        <div>
          <img src={todaysWeatherIcon} />
          <p className="today-tempature">
            {unit === "fahrenheit"
              ? weatherData.days[0].temp
              : convertToCelsius(weatherData.days[0].temp)}
            <span className="unit-symbol">
              {unit === "fahrenheit" ? "°F" : "°C"}
            </span>
          </p>
        </div>
        <p className="today-description">{weatherData.days[0].conditions}</p>
        <div>
          <DropIcon className="drop-icon" />
          <p className="rain-prob">
            {weatherData.days[0].precipprob}
            <span>%</span>
          </p>
        </div>
        <div>
          <WindIcon className="wind-icon" />
          <p className="wind-speed">
            {unit === "fahrenheit"
              ? weatherData.days[0].windspeed
              : convertToKMH(weatherData.days[0].windspeed)}
          </p>
          <span>{unit === "fahrenheit" ? "mph" : "kmh"}</span>
        </div>
      </div>

      <div className="hours-container" ref={hoursContainerRef}>
        {weatherData.days[0].hours.map((hour) => (
          <HoursPreview
            hour={hour}
            key={hour.datetimeEpoch}
            weatherIcons={weatherIcons}
            unit={unit}
            convertToCelsius={convertToCelsius}
            convertToKMH={convertToKMH}
            className={
              roundTimeOf(currentDayTime) === hour.datetime
                ? "active-hour"
                : "inactive-hour"
            }
          />
        ))}
      </div>

      <div className="next-days-container">
        {weatherData.days.slice(1).map((day) => (
          <DaysPreview
            day={day}
            weatherIcons={weatherIcons}
            key={day.datetimeEpoch}
            unit={unit}
            convertToCelsius={convertToCelsius}
            convertToKMH={convertToKMH}
          />
        ))}
      </div>
    </StyledContainer>
  );
}

const StyledContainer = styled.div`
  width: 100%;
  backdrop-filter: blur(50px);
  -webkit-backdrop-filter: blur(10px);
  border-radius: 33px;
  padding: 20px 20px 20px 20px;

  .search-bar {
    justify-self: center;
  }

  .switch-container {
    display: flex;
    justify-content: center;
    align-items: start;
    width: min-content;
    gap: 10px;
    justify-self: end;

    span {
      user-select: none;
      color: #707070;
      font-weight: 800;
    }

    ${({ $unit }) =>
      $unit === "fahrenheit"
        ? `span:last-of-type {
        color: white;
      }`
        : `span:first-of-type {
        color: white;
      }`}
  }

  .unit-symbol {
    font-size: 3rem;
  }

  .today-container {
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;

    .today-description {
      margin: 10px 0;
    }

    div {
      display: flex;
      justify-content: end;
      align-items: end;

      img {
        margin-right: 10px;
      }

      .today-tempature {
        font-size: 4rem;
        font-weight: 700;
        filter: drop-shadow(0px 0px 18px #00000015);
        line-height: 1;
      }

      .rain-prob,
      .wind-speed {
        font-size: 1rem;
        font-weight: normal;
      }

      .drop-icon,
      .wind-icon {
        min-width: 20px;
        align-self: center;
        margin: 0 5px 0 0;
      }

      img {
        filter: drop-shadow(0px 0px 18px #00000015);
        width: 3.5rem;
        min-height: 3.5rem;
        transform: translateY(-10px);
      }
    }

    p {
      font-size: 1rem;
    }
  }

  .hours-container {
    margin-top: 40px;
    width: 100%;
    background-color: #ffffff1c;
    border-radius: 20px;
    display: flex;
    justify-content: start;
    align-items: center;
    gap: 50px;
    overflow-x: auto;
    white-space: nowrap;
    padding: 15px;
    scrollbar-color: #ffffff #e0e0e000;
    scrollbar-width: thin;

    .active-hour {
      border: solid 1px #fff;
    }
  }

  .next-days-container {
    margin-top: 20px;
    width: 100%;
    background-color: #ffffff1c;
    border-radius: 20px;
    display: flex;
    justify-content: start;
    align-items: center;
    gap: 50px;
    overflow-x: auto;
    white-space: nowrap;
    padding: 15px;
    scrollbar-color: #ffffff #e0e0e000;
    scrollbar-width: thin;
  }

  @media (max-width: 700px) {
    .hours-container {
      gap: 15px;
    }

    .next-days-container {
      gap: 15px;
    }
  }
`;
