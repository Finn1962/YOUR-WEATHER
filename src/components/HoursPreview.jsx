//Libarys
import styled from "styled-components";

//Components
import DropIcon from "./DropIcon.jsx";
import WindIcon from "./WindIcon.jsx";

export default function HoursPreview({
  hour,
  className,
  weatherIcons,
  unit,
  convertToCelsius,
  convertToKMH,
}) {
  const hourWeatherIcon = weatherIcons[hour.icon];

  return (
    <StyledContainer className={className}>
      <p className="time">{hour.datetime.slice(0, 5)}</p>
      <p>
        {unit === "fahrenheit" ? hour.temp : convertToCelsius(hour.temp)}
        <span>{unit === "fahrenheit" ? "°F" : "°C"}</span>
      </p>

      <img src={hourWeatherIcon} />
      <div>
        <DropIcon className="drop-icon" />
        <p>
          {hour.precipprob}
          <span>%</span>
        </p>
      </div>
      <div>
        <WindIcon className="wind-icon" />
        <p>
          {unit === "fahrenheit"
            ? hour.windspeed
            : convertToKMH(hour.windspeed)}
          <span>{unit === "fahrenheit" ? "mph" : "kmh"}</span>
        </p>
      </div>
    </StyledContainer>
  );
}

const StyledContainer = styled.div`
  height: 100%;
  width: 85px;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  gap: 5px;
  padding: 10px;
  border-radius: 10px;

  p {
    font-size: 0.8rem;
  }

  div {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 3px;
  }

  .time {
    font-weight: 900;
    font-size: 1rem;
    margin-bottom: 5px;
  }

  img {
    width: 2.5rem;
    min-height: 2.5rem;
  }

  .drop-icon {
    width: 13px;
    min-width: 13px;
  }

  .wind-icon {
    width: 15px;
    min-width: 15px;
  }
`;
