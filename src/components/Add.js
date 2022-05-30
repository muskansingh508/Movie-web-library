import React, { useState } from "react";
import { ResultCard } from "./ResultCard";
import { Header } from "./Header";
export const Add = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const onChange = (e) => {
    e.preventDefault();
    setQuery(e.target.value);

    fetch(
      ` http://www.omdbapi.com/?s=${e.target.value}&apikey=d21922f3`)
      .then((res) =>res.json())
      .then((data) => {
        if (!data?.errors) {
          setResults(data.Search);
        } else {
          setResults([]);
        }
      });
  };

  return (
     <>
    <Header />
    <div className="add-page">
      <div className="container">
        <div className="add-content">
          <div className="input-wrapper">
            <input
              type="text"
              placeholder="Search for a movie"
              value={query}
              onChange={onChange}
            />
          </div>

          {results?.length > 0 && (
            <ul className="results">
              {results.map((movie) => (
                <li key={movie.imdbID}>
                  <ResultCard movie={movie} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div></>
  );
};
