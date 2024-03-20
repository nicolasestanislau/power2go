import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar/Navbar";
import Header from "./components/Header/Header";
import Countries from "./components/Countries/Countries";
import CountryDetails from "./components/CountryDetails/CountryDetails";

function App() {
  const [countryData, setCountryData] = useState([]);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState(false);
  const [filterData, setFilterData] = useState([]);
  const [data, setData] = useState({});
  const [isDetailPage, setIsDetailPage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [exhibition, setExhibition] = useState(false);

  const handleFilterChange = (newView) => {
    // Callback function for view mode changes
    console.log(`Searching for: ${query}`);

    setExhibition(newView);
  };
  // Fetching countries data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        let data = await fetch("https://restcountries.com/v2/all").then(
          (response) => response.json()
        );
        setCountryData(data);
        setLoading(false);
      } catch {
        console.log("Error");
        setError(true);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Filtering countries data when user search query
  useEffect(() => {
    if (query.length <= 0) {
      return;
    }
    setFilter(true)
    let filterData = countryData.filter((data) =>
      data.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilterData(filterData);
    console.log(filterData, "heloloolo ");
  }, [query]);

  // Filtering data when user choose region or change
  useEffect(() => {
    if (exhibition) {
      setExhibition(true);
    } else {
      setExhibition(false);
    }
    console.log('cala a boca sandro')
    setQuery("");
  }, [exhibition]);

  // Putting page data based on data
  useEffect(() => {
    if (Object.keys(data).length > 0) {
      setIsDetailPage(true);
    } else {
      setIsDetailPage(false);
    }
  }, [data]);

  return (
    <>
      {/* Showing Components based on conditions */}
      <Navbar setQuery={setQuery} />
      {isDetailPage ? (
        Object.keys(data)?.length > 0 && (
          <CountryDetails countryData={data} setData={setData} />
        )
      ) : (
        <>
          <Header setQuery={setQuery} onFilterChange={handleFilterChange} />
          {
            <Countries
              key={query}
              query={query}
              filter={filter}
              countryData={countryData}
              exhibition={exhibition} // Pass exhibition state to Countries.js
              filterData={filterData}
              setData={setData}
              loading={loading}
              error={error}
            />
          }
        </>
      )}
    </>
  );
}

export default App;
