import { faMoon, faSun } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import "./Navbar.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  height: "80%",
  bgcolor: "rgba(180, 180, 180)",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const list = {
  color: "black",
  padding: "4px 6px",
  margin: "5px",
  backgroundColor: "rgba(190, 190, 190, 0.7)",
  borderRadius: "4px",
  cursor: "pointer",
  textTransform: "lowercase",
};

const Navbar = ({ setQuery }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [historyData, setHistoryData] = useState([]);
  console.log("historyData: ", historyData);
  let historyStorage = "";
  useEffect(() => {
    historyStorage = localStorage.setItem(
      "historico",
      JSON.stringify(historyStorage)
    );
    console.log('historyStorage ', historyStorage)
    if (historyStorage) {
      setHistoryData(JSON.parse(historyStorage));
    }
  }, []);

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

  const getHistory = () => {
   // setHistoryData(JSON.parse(localStorage.getItem("historico")) ?? []);
    setOpen(true);
    console.log(historyData)
  };

  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleSearch = (item) => {
    setQuery(item);
  };

  return (
    <div className="Navbar">
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Histórico
          </Typography>

          {console.log("historyData ", typeof historyData)}
          <ul>
            {historyData
              ? historyData.map((item, index) => (
                  <li key={index}>
                    <Button
                      size="small"
                      variant="text"
                      onClick={() => {
                        handleSearch(item);
                        setOpen(false);
                        setQuery(item);
                      }}
                    >
                      <Typography sx={list}>{item}</Typography>
                    </Button>{" "}
                  </li>
                ))
              : null}
          </ul>
        </Box>
      </Modal>
      <h1 className="title">Em que país?</h1>
      <button
        className="back__btn button__model"
        style={{ cursor: "pointer" }}
        onClick={getHistory}
      >
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
