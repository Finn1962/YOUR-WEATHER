import styled from "styled-components";
import { useState } from "react";

export default function SearchBar({ setSearchValue, className }) {
  const [value, setValue] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    setSearchValue(value);
  };

  return (
    <StyledContainer className={className}>
      <form onSubmit={handleSubmit} className="group">
        <button
          type="submit"
          className="icon-button"
          aria-label="Suche starten"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true" className="icon">
            <g>
              <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z" />
            </g>
          </svg>
        </button>
        <input
          className="input"
          type="text"
          placeholder="Search"
          value={value}
          onChange={(event) => setValue(event.target.value)}
        />
      </form>
    </StyledContainer>
  );
}

const StyledContainer = styled.div`
  width: 100%;
  max-width: 400px;

  .group {
    display: flex;
    line-height: 28px;
    align-items: center;
    position: relative;
  }

  .input {
    width: 100%;
    height: 40px;
    line-height: 28px;
    padding: 0 1rem;
    padding-left: 2.5rem;
    border: 1px solid transparent;
    border-radius: 15px;
    outline: none;
    background-color: #f3f3f4;
    color: #0d0c22;
    transition: 0.3s ease;
  }

  .input::placeholder {
    color: #9e9ea7;
  }

  .input:focus,
  .input:hover {
    /* Tippfehler korrigiert: vorher stand hier 'input:hover' statt '.input:hover' */
    outline: none;
    border-color: rgba(0, 0, 0, 0.4);
    background-color: #fff;
    box-shadow: 0 0 0 4px rgb(0 48 73 / 10%);
  }

  /* Neu: Styling für den unsichtbaren Button, der das Icon umschließt */
  .icon-button {
    position: absolute;
    left: 1rem;
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1; /* Damit der Button über dem Input liegt */
  }

  .icon {
    fill: #9e9ea7;
    width: 1rem;
    height: 1rem;
    transition: fill 0.2s ease;
  }

  .icon-button:hover .icon {
    fill: #0d0c22; /* Kleines visuelles Feedback beim Hovern des Icons */
  }
`;
