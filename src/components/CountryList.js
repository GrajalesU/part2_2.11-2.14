const CountryList = ({ names, setFilter }) => {
  const handleClick = (e) => {
    setFilter(e.target.id);
  };
  return (
    <>
      {names.length >= 10 ? (
        <p>Too many results, try with other filter</p>
      ) : (
        <ul>
          {names.map((filteredCountry) => {
            return (
              <li key={filteredCountry}>
                {filteredCountry}
                <button id={filteredCountry} onClick={handleClick}>
                  Show
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
};

export default CountryList;
