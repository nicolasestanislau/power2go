import React, { useState, useEffect } from "react";
import "./Header.css";
import { faAngleDown, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "@mui/material/Button";

const Header = ({ setQuery, onFilterChange }) => {
  const [showOption, setShowOption] = useState(false);
  const [value, setValue] = useState([]);
  const [history, setHistory] = useState([]);

  /*   const history = usesetCountry();
  const add = (product) => () => {
    history.addToCountry(product);
    setQuery(value);
  }; */

  //localStorage.setItem("historico", JSON.stringify(history));
  const handleSearch = () => {
    //setHistory(window.localStorage.getItem("historico", JSON.stringify(history)));
    // Perform search using searchTerm here
    // mesma sendo array não posso manipular a variavel do useState
    //history.push(value);
    // Include value in history only if it wasn't added in onChange
    // Adicionar valor ao histórico se não estiver presente
    // Add this line before the `if` statement
    //const prevHistory = history.length > 0 ? history : null;
    if (!history.includes(value)) {
      setHistory((prevHistory) => [...prevHistory, value]);
    }
    setQuery(value);
  };
  localStorage.setItem("historico", history);
  
  const onFilterClick = (event) => {
    const selectedView = event.currentTarget.textContent.toLowerCase(); // Get selected view (table or card)
    //setFilter(false); // Reset filter (optional, depending on desired behavior)
    onFilterChange(selectedView === "tabela" ? true : false); // Update exhibition state in App.js
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
