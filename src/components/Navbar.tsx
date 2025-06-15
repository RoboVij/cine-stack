import { Link, NavLink } from "react-router-dom";
import "../styles/Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        CineStack
      </Link>
      <ul className="nav-links">
        {/* <li>
          <Searchbar />
        </li> */}
        <li>
          <NavLink
            to="/watchlist"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Watchlist
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
export default Navbar;
