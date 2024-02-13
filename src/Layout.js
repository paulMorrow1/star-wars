import { Link, Outlet } from "react-router-dom";
import "./Layout.css";

export default function Layout() {
  return (
    <div className="links-container">
      <nav className="links">
        <Link to="/" className="search-autocomplete-styling">
          Search Autcomplete
        </Link>
        <Link to="/statistics" className="statistics-styling">
          Stastics
        </Link>
      </nav>
      <Outlet />
    </div>
  );
}
