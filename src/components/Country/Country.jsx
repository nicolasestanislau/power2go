import React from "react";
import "./Country.css";
import * as MUITable from "@mui/material/Table"; // Importando componentes da tabela
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const Country = ({ cardData, setData, setExhibition }) => {
  //console.log("cardData: ", cardData);
  return (
    <>
      {setExhibition ? (
        <TableContainer component={Paper} onClick={(e) => setData(cardData)}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>País</TableCell>
                <TableCell align="right">Capital</TableCell>
                <TableCell align="right">População</TableCell>
                <TableCell align="right">Moedas</TableCell>
                <TableCell align="right">Idiomas</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow key={cardData.name}>
                <TableCell component="th" scope="row">
                  {cardData.name}
                </TableCell>
                <TableCell align="right">{cardData.capital}</TableCell>
                <TableCell align="right">{cardData.population}</TableCell>
                <TableCell align="right">
                  {cardData?.currencies?.length > 0 && (
                    <p>
                      <span>Nome da moeda:</span>
                      {cardData.currencies
                        .map((currency) => currency.name)
                        .join(", ")}
                    </p>
                  )}
                </TableCell>
                <TableCell align="right">
                  {cardData.languages
                    .map((language) => language.name)
                    .join(", ")}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <div className="Country" onClick={(e) => setData(cardData)}>
          <div className="card__image">
            <img src={cardData.flag} alt="country image" />
          </div>
          <div className="card__data">
            <h2 className="country__name">{cardData.name}</h2>
            <p className="country__capital">
              <span className="data__heading">Capital: </span>
              {cardData.capital}
            </p>
            <p className="country__population">
              <span className="data__heading">População: </span>
              {cardData.population}
            </p>
            {cardData?.currencies?.length > 0 && (
              <p>
                <span className="data__name">Nome da moeda: </span>
                {cardData.currencies.map((currency) => currency.name).join(",")}
              </p>
            )}
            {cardData?.languages?.length > 0 && (
              <p className="wrap-letter">
                <span className="data__name">Idioma: </span>
                {cardData.languages.map((language) => language.name).join(",")}
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Country;
