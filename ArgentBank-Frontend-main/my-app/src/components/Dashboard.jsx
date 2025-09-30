import {useDispatch, useSelector} from "react-redux";
import {getUserProfile} from "../store/authSlice";
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

    return <p className="Error">Please log in to access the dashboard.</p>;
  }

  return user ? (
    <>
        {userAccounts.map((account) => (
          <section className="account white" key={account.id}>
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
                  handleViewTransactions(account.id);
                }}
              />
            </div>
          </section>
        ))}
    
    </>
  ) : (
    <p className="Error">Loading profile...</p>
  );
}
