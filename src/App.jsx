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
        <div className="content-wrapper">
          {searchValue === "" && (
            <>
              <img src={logo} className="logo" />
              <h1 className="slogan">YOUR WEATHER.COM</h1>
            </>
          )}
          <SearchBar setSearchValue={setSearchValue} className="search-bar" />
          {searchValue === "" && (
            <p className="enter-location">Enter a location.</p>
          )}
          <DataDisplay weatherData={weatherData} />
        </div>
      </div>
      <BackgroundImage weatherData={weatherData} className="background-image" />
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
    position: relative;
    z-index: 3;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
  }

  .content-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    max-width: 1200px;
    width: 100%;
    height: auto;
    min-height: 100vh;
  }

  .logo {
    width: 150px;
    margin-bottom: 10px;
  }

  .slogan {
    margin: 10px 20px 20px 20px;
    text-align: center;
  }

  .search-bar {
    padding: 0 20px;
    margin-bottom: 20px;
  }

  .enter-location {
    margin-bottom: 100px;
  }

  .background-image {
    position: fixed;
    top: 0;
    left: 0;
  }

  @media (max-width: 700px) {
    .search-bar {
      padding: 0;
    }

    .slogan {
      font-size: 1.5rem;
    }

    .content-container {
      padding: 0px;
    }
  }
`;
