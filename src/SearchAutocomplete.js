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
  const onClickHandlerNameThisWhateverYouWant = async (person) => {
    try {
      const response = await (
        await fetch(`${BASE_URL}/people?search=${person}`)
      ).json();
      setSearch(person);
      setPeople(response.results);
      setShowAutocompleteResults(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {results.map(({ name }) => {
        return (
          <p
            key={name}
            onClick={() => onClickHandlerNameThisWhateverYouWant(name)}
          >
            {name}
          </p>
        );
      })}
    </>
  );
}

export default function SearchAutocomplete() {
  const [search, setSearch] = React.useState("");
  const [searchResults, setSearchResults] = React.useState([]);
  const [autocompleteResults, setAutocompleteResults] = React.useState([]);
  const [showAutocompleteResults, setShowAutocompleteResults] =
    React.useState(false);
  const [people, setPeople] = React.useState([]);
  console.log({ people });

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
    console.log({ response });
    setAutocompleteResults(response.results);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
  };
  return (
    <div className="container">
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
        <button type="submit">Search</button>
      </form>
      {people.length > 0 ? <pre>{JSON.stringify(people, null, 2)}</pre> : null}
    </div>
  );
}
