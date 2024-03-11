import { faMoon, faSun } from "@fortawesome/free-regular-svg-icons";
import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import "./Navbar.css";

const Navbar = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const getTheme = () => {
    setIsDarkTheme(JSON.parse(localStorage.getItem("darkTheme")) ?? false);
  };

  const setTheme = (theme) => {
    localStorage.setItem("darkTheme", JSON.stringify(theme));
  };

  useEffect(() => {
    window.addEventListener("load", getTheme);
    () => window.addEventListener("load", getTheme);
  }, []);

  useEffect(() => {
    if (isDarkTheme) {
      document.body.classList.add("theme__dark");
    } else {
      document.body.classList.remove("theme__dark");
    }
  }, [isDarkTheme]);

  return (
    <div className="Navbar">
      <h1 className="title">Em que país?</h1>
      <button className="back__btn button__model" style={{ cursor: "pointer"}} onClick={() => {
        const history = localStorage.getItem("historico");
        console.log(history);
      }}>
        <FontAwesomeIcon icon={faArrowLeftLong} />
        Histórico
      </button>
      <div
        className="theme__container"
        onClick={(e) => {
          setTheme(!isDarkTheme);
          setIsDarkTheme(!isDarkTheme);
        }}
      >
        {isDarkTheme ? (
          <FontAwesomeIcon icon={faSun} className="theme__icon" />
        ) : (
          <FontAwesomeIcon icon={faMoon} className="theme__icon" />
        )}
        <p>{isDarkTheme ? "Light Mode" : "Dark Mode"}</p>
      </div>
    </div>
  );
};

export default Navbar;
