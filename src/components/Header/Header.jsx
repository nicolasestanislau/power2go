import React, { useState } from "react";
import "./Header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faAngleDown } from "@fortawesome/free-solid-svg-icons";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";

const Header = ({ setQuery, onFilterChange }) => {
  //console.log("setQuery: ", setQuery);

  const [showOption, setShowOption] = useState(false);
  const [value, setValue] = useState([]);
  const [history, setHistory] = useState([]);

  const handleSearch = () => {
    // Perform search using searchTerm here
    console.log(`Searching for: ${value}`);
    history.push(value);
    // Include value in history only if it wasn't added in onChange
    // Adicionar valor ao histórico se não estiver presente
    if (!history.includes(value)) {
      setHistory((history) => [...history, value]);
    }
    setQuery(value);
    localStorage.setItem("historico", history);
  };

  const onFilterClick = (event) => {
    const selectedView = event.currentTarget.textContent.toLowerCase(); // Get selected view (table or card)
    //setFilter(false); // Reset filter (optional, depending on desired behavior)
    onFilterChange(selectedView === "tabela" ? true : false); // Update exhibition state in App.js
    console.log("selectedView: ", selectedView);
  };

  const onFilter = (event) => {
    console.log(
      "event.currentTarget.textContent: ",
      event.currentTarget.textContent
    );
    //setFilter(event.currentTarget.textContent);
  };

  return (
    <div className="Header">
      <div className="input__container">
        <input
          type="text"
          name="input"
          className="country__input"
          placeholder="Procure um país..."
          onChange={(e) => {
            setValue(e.target.value);
          }}
          value={value}
        />
        <Button
          variant="contained"
          onClick={() => {
            handleSearch();
            setQuery(value);
          }}
        >
          <FontAwesomeIcon icon={faSearch} className="icon" />
        </Button>
      </div>
      <div className="filter" onClick={(e) => setShowOption(!showOption)}>
        <p>Tipo de exibição</p>
        <FontAwesomeIcon icon={faAngleDown} />
        {showOption && (
          <div className="filter__options">
            <ul className="filter__list">
              <li className="list__item" onClick={(e) => onFilterClick(e)}>
                tabela
              </li>
              <li className="list__item" onClick={(e) => onFilterClick(e)}>
                card
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
