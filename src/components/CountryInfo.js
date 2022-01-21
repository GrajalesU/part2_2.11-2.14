import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";

const CountryInfo = ({ name = "Switzerland" }) => {
  const [info, setInfo] = useState({});
  const [weather, setWeather] = useState({});
  useEffect(() => {
    axios.get(`https://restcountries.com/v3.1/name/${name}`).then((promise) => {
      const { data } = promise;
      setInfo(...data);
    });

    axios
      .get(
        `http://api.weatherapi.com/v1/current.json?key=${process.env.REACT_APP_API_KEY}&q=${name}&aqi=no`
      )
      .then((promise) => {
        const { data } = promise;
        data.current["name"] = data.location.name;
        setWeather(data.current);
      });
  }, [name]);

  return (
    <div>
      <h1>{name}</h1>
      <p>capital {info.capital}</p>
      <p>population {info.population}</p>
      <h3>Languages</h3>
      <ul>
        {info.languages &&
          Object.keys(info.languages).map((key) => (
            <li key={key}>{info.languages[key]}</li>
          ))}
      </ul>
      {info.flags && <img src={info.flags["png"]} alt="flag" />}
      <h3>Weather in {weather.name}</h3>
      <p>
        <b>temperature:</b> {weather.temp_c}°
      </p>
      {weather.condition && (
        <>
          <p>{weather.condition["text"]}</p>
          <img src={weather.condition["icon"]} alt="weather" />
        </>
      )}
      <p>
        <b>wind:</b> {weather.wind_mph} mph direction {weather.wind_dir}
      </p>
    </div>
  );
};

export default CountryInfo;
