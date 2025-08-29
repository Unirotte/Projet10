import {useDispatch, useSelector} from "react-redux";
import {logout, getUserProfile} from "../store/authSlice";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import accountsData from "../data/accounts.json";
import "../assets/DashboardCSS/dashboard.css";
import "../assets/ButtonCSS/button.css";
import Button from "../components/Button";

export default function Dashboard() {
  const navigate = useNavigate();

  const handleViewTransactions = (accountId) => {
    // Redirige vers la page Transaction en passant l'id dans l'URL
    navigate(`/accountsId/${accountId}`);
  };

  const dispatch = useDispatch();
  const {user, token} = useSelector((state) => state.auth);
  const userAccounts = user
    ? accountsData.find((u) => u.userId === user.id)?.accounts || []
    : [];

  useEffect(() => {
    if (token && !user) {
      dispatch(getUserProfile());
    }
  }, [token, user, dispatch]);

  if (!token) {
    console.log("user:", user);
    console.log("userAccounts:", userAccounts);
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
        {userAccounts.map((account) => (
          <section className="account" key={account.id}>
            <div className="account-content-wrapper">
              <h3 className="account-title">{account.title}</h3>
              <p className="account-amount">{account.money}</p>
              <p className="account-amount-description">{account.text}</p>
            </div>
            <div className="account-content-wrapper cta">
              <Button
                className="transaction-button"
                text="View transactions"
                type="button"
                onClick={() => {
                  console.log("clicked!"); // 👈 test
                  handleViewTransactions(account.id);
                }}
              />
            </div>
          </section>
        ))}
      </main>
    </>
  ) : (
    <p>Chargement du profil...</p>
  );
}
