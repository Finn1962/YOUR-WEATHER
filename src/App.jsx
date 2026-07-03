//Libarys
import { useState, useEffect } from "react";
import styled from "styled-components";

//Components
import BackgroundImage from "./components/BackgroundImage.jsx";
import DataDisplay from "./components/DataDisplay.jsx";
import SearchBar from "./components/SearchBar.jsx";

//Services
import { fetchData } from "./services/fetchData.js";

//Assets
import logo from "./assets/partly-cloudy-day.svg";
import Loader from "./components/Loader.jsx";

export default function App() {
  const [searchValue, setSearchValue] = useState("");
  const [weatherData, setWeaterData] = useState(null);
  const [loaderIsVisible, setLoaderIsVisible] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line
    setLoaderIsVisible(true);
    fetchData(searchValue)
      .then((data) => setWeaterData(data))
      .catch(() => setWeaterData(null))
      .finally(() => setLoaderIsVisible(false));
  }, [searchValue]);

  return (
    <StyledAppContainer>
      {loaderIsVisible && <Loader className="loader" />}
      <div className="content-container">
        {searchValue === "" && (
          <>
            <img src={logo} className="logo" />
            <h1 className="slogan">YOUR WEATHER.COM</h1>{" "}
          </>
        )}
        <SearchBar setSearchValue={setSearchValue} className="search-bar" />
        {searchValue === "" && <p>Enter a location.</p>}
        <DataDisplay weatherData={weatherData} />
      </div>
      <BackgroundImage weatherData={weatherData} />
    </StyledAppContainer>
  );
}

const StyledAppContainer = styled.div`
  .loader {
    position: fixed;
    z-index: 10;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  .content-container {
    padding: 0 20px;
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 3;
    transform: translate(-50%, -50%);
    width: 100%;
    max-width: 1200px;
    height: auto;
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;

    .logo {
      width: 150px;
    }

    .slogan {
      margin: 10px 0 30px 0;
    }

    .search-bar {
      margin-bottom: 40px;
    }
  }
`;
