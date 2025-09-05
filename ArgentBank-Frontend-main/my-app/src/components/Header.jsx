import logo from "../assets/img/argentBankLogo.webp";
import {useDispatch, useSelector} from "react-redux";
import {logout, getUserProfile} from "../store/authSlice";
import {useNavigate, Link} from "react-router-dom";
import { useEffect } from "react";
import "../assets/HeaderCSS/header.css";
 

export default function Header() {
  const { token, user } = useSelector((state) => state.auth);
   
  const dispatch = useDispatch();
  const navigate = useNavigate();
 

  useEffect(() => {
    if (token && !user) {
      dispatch(getUserProfile());
    }
  }, [token, user, dispatch]);

  const handleSignOut = () => {
    dispatch(logout()); // vide token + localStorage
    navigate("/SignIn"); // redirige vers la home (ou login)
  };

  return (
    <header>
      <nav className="main-nav">
        <Link className="main-nav-logo" to="/">
          <img
            className="main-nav-logo-image"
            src={logo}
            alt="Argent Bank Logo"
          />
          <h1 className="sr-only">Argent Bank</h1>
        </Link>
        <div className="position-name">
          {token ? (
            <>
            <Link className="main-nav-item" to="/User">
                <i className="fa fa-user-circle"></i>
                {user?.userName}
              </Link>

              <button onClick={handleSignOut} className="main-nav-item">
                <i className="fa fa-user-circle"></i>
                Sign out
              </button>
            </>
          ) : (
            <Link className="main-nav-item" to="/SignIn">
              <i className="fa fa-user-circle"></i>
              Sign In
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}
