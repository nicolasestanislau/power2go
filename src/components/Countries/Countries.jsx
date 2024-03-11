import React from "react";
import "./Countries.css";
import Country from "../Country/Country";

const Countries = ({
  filter,
  countryData,
  exhibition,
  filterData,
  setData,
  loading,
  error,
}) => {
  console.log(filterData, "Countries");
  console.log(countryData, "countryData");
  console.log(filter, "filter");
  return (
    <div className="Countries">
      {/* Checking Condition to show and hide components */}
      {loading ? (
        <h1 className="loading">Loading...</h1>
      ) : error ? (
        <h1 className="loading">Error</h1> // Render error message when error is true
      ) : filter ? (
        filterData.length > 0 ? (
          filterData?.map((data, index) => (
            <Country
              cardData={data}
              key={index}
              setData={setData}
              setExhibition={exhibition}
            />
          ))
        ) : (
          <h1 className="result__msg">Países não encontrados.</h1>
        )
      ) : (
      countryData?.map((data, index) => (
        <Country
          cardData={data}
          key={index}
          setData={setData}
          setExhibition={exhibition}
        />
      ))
    )} 
    </div>
  );
};

export default Countries;
