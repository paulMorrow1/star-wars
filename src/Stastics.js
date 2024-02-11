import * as React from "react";
import "./Stastics.css";
const BASE_URL = "https://swapi.dev/api";

function isNum(value) {
  return !isNaN(value);
}

export default function Stastics() {
  const [data, setData] = React.useState(null);
  const [amountOfPages, setAmountOfPages] = React.useState(0);
  const [page, setPage] = React.useState(1);
  const [sortBy, setSortBy] = React.useState({ column: "", direction: "" });
  const [visibleColumns, setVisibleColumns] = React.useState([
    "name",
    "height",
    "gender",
  ]);

  React.useEffect(() => {
    document
      .querySelector(":root")
      .style.setProperty("--columns", visibleColumns.length);
  }, [visibleColumns]);

  function handleSort({ column, direction }) {
    setSortBy({ column, direction });
    const sortedData = data?.sort((a, b) => {
      if (isNum(a[column]) && isNum(b[column])) {
        if (direction === "asc") return Number(a[column]) - Number(b[column]);
        if (direction === "desc") return Number(b[column]) - Number(a[column]);
      } else {
        if (direction === "asc") {
          if (a[column] > b[column]) {
            return 1;
          } else if (a[column] < b[column]) {
            return -1;
          }
          return 0;
        }

        if (direction === "desc") {
          if (a[column] < b[column]) {
            return 1;
          } else if (a[column] > b[column]) {
            return -1;
          }
          return 0;
        }
      }
    });
    setData(sortedData);
  }

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const { results, count } = await (
          await fetch(`${BASE_URL}/people?page=${page}`)
        ).json();
        setAmountOfPages(Math.ceil(count / 10));
        setSortBy({ column: "", direction: "" });
        setData(
          results.map((item) => {
            for (const key in item) {
              if (typeof item[key] === "object") {
                delete item[key];
              }
            }
            return item;
          })
        );
        console.log("Success");
      } catch (error) {
        console.log("Unsuccessful retrieving data");
      }
    };
    fetchData();
  }, [page]);

  return (
    <div className="container-stastics">
      {data ? (
        <>
          <div
            className="columns-container"
            data-columns={visibleColumns.length}
          >
            {Object.keys(data[0]).map((column) => (
              <label htmlFor={column} key={column}>
                <input
                  type="checkbox"
                  defaultChecked={visibleColumns.includes(column)}
                  onChange={({ target }) => {
                    if (target.checked) {
                      setVisibleColumns((prevColumns) => [
                        ...prevColumns,
                        column,
                      ]);
                    } else {
                      const columns = visibleColumns.filter(
                        (col) => col !== column
                      );
                      setVisibleColumns(columns);
                    }
                  }}
                  value={column}
                  id={column}
                  name={column}
                />
                {column}
              </label>
            ))}
          </div>
          <div className="data-container">
            {Object.keys(data[0])
              .filter((key) => visibleColumns.includes(key))
              .map((key) => (
                <div
                  key={key}
                  className="cell"
                  onClick={() =>
                    handleSort({
                      column: key,
                      direction:
                        sortBy.column === key
                          ? sortBy.direction === "asc"
                            ? "desc"
                            : "asc"
                          : "asc",
                    })
                  }
                >
                  {key.replace(/_/g, " ")}{" "}
                  {sortBy.column === key
                    ? sortBy.direction === "asc"
                      ? "↓"
                      : "↑"
                    : null}
                </div>
              ))}
            {data.map((peopleRow) => {
              return Object.entries(peopleRow)
                .filter(([key]) => visibleColumns.includes(key))
                .map(([key, value]) => (
                  <div className="cell" key={key}>
                    {value}
                  </div>
                ));
            })}
          </div>
          <div className="pagination-container">
            {page !== 1 ? (
              <button onClick={() => setPage(page - 1)}>Previous</button>
            ) : null}
            {Array.from({ length: amountOfPages }, (_, i) => i + 1).map(
              (pageNum) => (
                <button key={pageNum} onClick={() => setPage(pageNum)}>
                  {page === pageNum ? <strong>{pageNum}</strong> : pageNum}
                </button>
              )
            )}
            <button
              disabled={page === amountOfPages}
              onClick={() => setPage(page + 1)}
            >
              Next
            </button>
          </div>
          {/* <div className="per-page-container">page dropdown</div> */}
        </>
      ) : (
        <p>No data</p>
      )}
    </div>
  );
}
