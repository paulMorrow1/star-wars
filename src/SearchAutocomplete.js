import * as React from "react";
import "./SearchAutocomplete.css";

const BASE_URL = "https://swapi.dev/api";
// AutocompleteSearchResults.js (separate file);
// const AutocompleteSearchResults = () => {} <- another way to write component
// function AutocompleteSearchResults({ results }) { <- destructure props directly in parameter

function AutocompleteSearchResults(props) {
  // props.results
  // const { results = [] <- setting default value } = props;
  const { results, setPeople, setSearch, setShowAutocompleteResults } = props;
  const generatePromise = (url, key) => {
    return fetch(url)
      .then((data) => data.json())
      .then((data) => data[key]);
  };
  const onClickCharacterSelect = async (person) => {
    try {
      const response = await (
        await fetch(`${BASE_URL}/people?search=${person}`)
      ).json();
      // films = [], homeworld = '', species = [], starships = [], vehicles = []
      const fieldObjArrays = Object.keys(response.results[0])
        .filter((key) => {
          if (
            key === "films" ||
            key === "homeworld" ||
            key === "species" ||
            key === "starships" ||
            key === "vehicles"
          ) {
            return key;
          }
          return null;
        })
        .toSorted()
        .reduce((accum, key) => {
          accum[key] =
            typeof response.results[0][key] === "string"
              ? [response.results[0][key]]
              : response.results[0][key];
          return accum;
        }, {});
      // const fieldArrayArrays = Object.values(fieldObjArrays);
      const fieldKeyArrays = Object.entries(fieldObjArrays);
      const fieldObjValuesPromises = Object.entries(fieldObjArrays).reduce(
        (accum, [key, urls]) => {
          const aryPromises = urls.map((url) =>
            generatePromise(url, key === "films" ? "title" : "name")
          );
          accum.push(...aryPromises);
          return accum;
        },
        []
      );
      const values = await Promise.all(fieldObjValuesPromises);

      let start = 0;
      let end = 0;
      const enhancedPayload = response.results.map((person) => {
        return {
          ...person,
          ...fieldKeyArrays.reduce((accum, [key, value]) => {
            start = end;
            end = start + value.length;
            accum[key] = values.slice(start, end);
            return accum;
          }, {}),
        };
      });
      setSearch(person);
      setPeople(enhancedPayload);
      setShowAutocompleteResults(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {results.map(({ name }) => {
        return (
          <p key={name} onClick={() => onClickCharacterSelect(name)}>
            {name}
          </p>
        );
      })}
    </>
  );
}

export default function SearchAutocomplete() {
  const [search, setSearch] = React.useState("");
  const [autocompleteResults, setAutocompleteResults] = React.useState([]);
  const [showAutocompleteResults, setShowAutocompleteResults] =
    React.useState(false);
  const [people, setPeople] = React.useState([]);

  const onSearchHandler = async ({ target }) => {
    setSearch(target.value);

    if (target.value !== "") {
      setShowAutocompleteResults(true);
    } else {
      setShowAutocompleteResults(false);
    }
    if (target.value === "") return setAutocompleteResults([]);

    const response = await (
      await fetch(`${BASE_URL}/people?search=${target.value}`)
    ).json();
    setAutocompleteResults(response.results);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
  };
  return (
    <div className="container">
      <p className="form-header">Enter a Star Wars character</p>
      <form onSubmit={onSubmitHandler}>
        <div className="search-container">
          <input
            type="text"
            name="search"
            value={search}
            onChange={onSearchHandler}
            autoComplete="off"
            // onFocus={() => setShowAutocompleteResults(true)}
            // onBlur={() => setShowAutocompleteResults(false)}
          />
          {autocompleteResults.length > 0 && showAutocompleteResults ? (
            <div className="search-results">
              <AutocompleteSearchResults
                results={autocompleteResults}
                setPeople={setPeople}
                setSearch={setSearch}
                setShowAutocompleteResults={setShowAutocompleteResults}
              />
            </div>
          ) : null}
          {/* <div
            className={`search-results search-results2 ${
              autocompleteResults.length > 0 && showAutocompleteResults
                ? "visible"
                : ""
            }`}
          >
            <AutocompleteSearchResults
              results={autocompleteResults}
              setPeople={setPeople}
              setSearch={setSearch}
              setShowAutocompleteResults={setShowAutocompleteResults}
            />
          </div> */}
        </div>
        {/* <button className="submit-btn" type="submit">
          Search
        </button> */}
      </form>
      {people.length > 0 ? <pre>{JSON.stringify(people, null, 2)}</pre> : null}
    </div>
  );
}
