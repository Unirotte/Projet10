import logo from "../img/argentBankLogo.webp";
import { Link } from 'react-router-dom';

export default function Header() {
  return (
<nav className="main-nav">
      <a className="main-nav-logo"><Link to="/LinkIn">
        <img
          className="main-nav-logo-image"
          src={logo}
          alt="Argent Bank Logo"
        />
        </Link>
        <h1 className="sr-only"><Link to="/">Argent Bank</Link></h1>
      </a>
      <div>
        <a className="main-nav-item" href="./sign-in.html">
          <i className="fa fa-user-circle"></i>
          Sign In
        </a>
      </div>
    </nav>
    )
}