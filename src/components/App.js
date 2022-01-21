import "../App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import CountryList from "./CountryList";
import CountryInfo from "./CountryInfo";

function App() {
  const [names, setNames] = useState([]);
  const [filter, setFilter] = useState("");
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((promise) => {
      const { data } = promise;
      const names = data.map((element) => {
        return element.name.common;
      });
      setNames(names);
    });
  }, []);

  const handleFilter = (e) => {
    setFilter(e.target.value);
  };

  useEffect(() => {
    setCountries(
      names.filter((country) =>
        country.toLowerCase().includes(filter.toLowerCase())
      )
    );
  }, [names, filter]);

  return (
    <div>
      find countries <input value={filter} onChange={handleFilter} />
      {countries.length === 1 ? (
        <CountryInfo name={countries[0]} />
      ) : countries.length === 0 ? (
        <p>sorry, Can't found the country you search... 😔</p>
      ) : (
        <CountryList names={countries} setFilter={setFilter} />
      )}
    </div>
  );
}

export default App;
