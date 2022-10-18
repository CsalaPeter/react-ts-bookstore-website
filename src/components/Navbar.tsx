import { Link } from "react-router-dom";
import "../styles/components/navbar.css";

export function Navbar() {
  return (
    <div className="navbar">
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/store">Store</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
