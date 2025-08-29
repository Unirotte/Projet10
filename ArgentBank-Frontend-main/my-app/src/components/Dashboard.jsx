import { useDispatch, useSelector } from "react-redux";
import { logout, getUserProfile } from "../store/authSlice";
import { useEffect } from "react";
import "../assets/DashboardCSS/dashboard.css";
import "../assets/ButtonCSS/button.css";
import Button from "../components/Button";

export default function Dashboard() {
  const dispatch = useDispatch();
  const { user, token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (token && !user) {
      dispatch(getUserProfile());
    }
  }, [token, user, dispatch]);

  if (!token) {
    return <p>Veuillez vous connecter pour accéder au dashboard.</p>;
  }
  return user ? (
    <>
      <main className="main bg-dark">
        <div className="header">
          <h1 className="title-name">
            Welcome back
            <br />
            {user.firstName} {user.lastName}!
          </h1>
          <Button className="edit-button" text="Edit Name" type="button" />
        </div>
        <section className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Checking (x8349)</h3>
            <p className="account-amount">$2,082.79</p>
            <p className="account-amount-description">Available Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <Button
              className="transaction-button"
              text="View transactions"
              type="button"
            />
          </div>
        </section>

        <section className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Savings (x6712)</h3>
            <p className="account-amount">$10,928.42</p>
            <p className="account-amount-description">Available Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <Button
              className="transaction-button"
              text="View transactions"
              type="button"
            />
          </div>
        </section>

        <section className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
            <p className="account-amount">$184.30</p>
            <p className="account-amount-description">Current Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <Button
              className="transaction-button"
              text="View transactions"
              type="button"
            />
          </div>
        </section>
      </main>
    </>
  ) : (
    <p>Chargement du profil...</p>
  );
}
