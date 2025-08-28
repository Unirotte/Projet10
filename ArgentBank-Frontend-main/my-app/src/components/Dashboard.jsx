import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";
import {logout} from "../store/authSlice";
import {useNavigate} from "react-router-dom";
import "../assets/DashboardCSS/dashboard.css";
import "../assets/ButtonCSS/button.css";
import Button from "../components/Button";

export default function Dashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignOut = () => {
    dispatch(logout()); // Supprime token de Redux et localStorage
    navigate("/"); // Redirige vers la home page
  };
  return (
    <>
      <a className="main-nav-item">
        <i className="fa fa-user-circle"></i>
        Tony
      </a>
      <Link className="main-nav-item" to="/SignIn" onClick={handleSignOut}>
        <i className="fa fa-sign-out"></i>
        Sign Out
      </Link>

      <main className="main bg-dark">
        <div className="header">
          <h1 className="title-name">
            Welcome back
            <br />
            Tony Jarvis!
          </h1>
          <Button className="edit-button" text="Edith Name" type="submit">Edit Name</Button>
        </div>
        <h2 className="sr-only">Accounts</h2>
        <section className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Checking (x8349)</h3>
            <p className="account-amount">$2,082.79</p>
            <p className="account-amount-description">Available Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <Button className="transaction-button" text="View transactions" type="submit"></Button>
          </div>
        </section>
        <section className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Savings (x6712)</h3>
            <p className="account-amount">$10,928.42</p>
            <p className="account-amount-description">Available Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <Button className="transaction-button" text="View transactions" type="submit"></Button>
          </div>
        </section>
        <section className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
            <p className="account-amount">$184.30</p>
            <p className="account-amount-description">Current Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <Button className="transaction-button" text="View transactions" type="submit"></Button>
          </div>
        </section>
      </main>
    </>
  );
}
