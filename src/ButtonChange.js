import * as React from "react";
import "./ButtonChange.css";
// import { generateRandomColor } from './utilities/generateRandomColor';

function App() {
  const buttonRef = React.useRef(null);
  // const changeColorOnClickHandler = ({ target }) => {
  const changeColorOnClickHandler = () => {
    console.log("this being clicked?");
    // target.style.backgroundColor = `rgb(${generateRandomColor()}, ${generateRandomColor()}, ${generateRandomColor()})`;

    // target.classList.add('red');
    // target.classList.remove('red');
    // target.classList.toggle('red');

    // buttonRef.current.classList.toggle('red');
    // buttonRef.current.style.backgroundColor = `rgb(${generateRandomColor()}, ${generateRandomColor()}, ${generateRandomColor()})`;

    // do code here
    // const rootElement = document.querySelector('#root')
    // rootElement.classList.add('blue');

    // NEVER DO THIS PLEASE
    // buttonRef.current.parentElement.parentElement.parentElement.parentElement.classList.toggle('blue');
  };

  return (
    <div className="container">
      <div className="grandparent">
        <div className="parent">
          <button
            className="child"
            ref={buttonRef}
            onClick={changeColorOnClickHandler}
            // onMouseEnter={({ target }) => target.classList.add("red")}
            // onMouseLeave={({ target }) => target.classList.remove("red")}
          >
            Click Me
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
