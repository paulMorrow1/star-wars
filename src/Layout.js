import { Link, Outlet } from "react-router-dom";
import "./Layout.css";

export default function Layout() {
  return (
    <div className="links-container">
      <nav className="links">
        <Link to="/search-autocomplete">Search Autcomplete</Link>
        <Link to="/statistics">Stastics</Link>
      </nav>
      <Outlet />
    </div>
  );
}
