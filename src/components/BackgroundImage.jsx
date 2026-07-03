//Libarys
import styled from "styled-components";

//Assets
import sunnyBackground from "../assets/sunny.jpg";
import sunnyWithCloudesBackground from "../assets/sunny-with-cloudes.jpg";
import cloudesBackground from "../assets/cloudes.jpg";
import rainBackground from "../assets/rain.jpg";

const weatherIcons = {
  "clear-day": sunnyBackground,
  "clear-night": sunnyBackground,
  cloudy: cloudesBackground,
  "partly-cloudy-day": sunnyWithCloudesBackground,
  "partly-cloudy-night": sunnyWithCloudesBackground,
  fog: cloudesBackground,
  rain: rainBackground,
  "showers-day": sunnyWithCloudesBackground,
  "showers-night": sunnyWithCloudesBackground,
  snow: rainBackground,
  "snow-showers-day": rainBackground,
  "snow-showers-night": rainBackground,
  sleet: rainBackground,
  hail: rainBackground,
  "rain-snow": rainBackground,
  "rain-snow-showers-day": rainBackground,
  "rain-snow-showers-night": rainBackground,
  thunder: rainBackground,
  "thunder-rain": rainBackground,
  "thunder-showers-day": rainBackground,
  "thunder-showers-night": rainBackground,
  wind: cloudesBackground,
};

export default function BackgroundImage({ weatherData }) {
  const backgourndImage = weatherData
    ? weatherIcons[weatherData.days[0].icon]
    : sunnyBackground;

  return <StyledImage src={backgourndImage} />;
}

const StyledImage = styled.img`
  width: 100%;
  height: 100vh;
  object-fit: cover;
  animation: fadeIn 0.3s ease-out forwards;
`;
