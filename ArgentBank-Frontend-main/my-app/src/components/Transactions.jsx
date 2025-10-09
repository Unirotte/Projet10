import accountsData from "../data/accounts.json";
import {useSelector} from "react-redux";
import {useParams, useNavigate} from "react-router-dom";
import {Collaps, CloseButton} from "../components/Index";

export default function Transactions() {
  const {id} = useParams();
  const {user} = useSelector((state) => state.auth);
  const navigate = useNavigate();

  // Récupère les comptes de l'utilisateur
  const userAccounts = user
    ? accountsData.find((u) => u.email === user.email)?.accounts || []
    : [];
 
  // Sélectionne le compte correspondant à l'id de la route
  const account = userAccounts.find((acc) => acc.id.toString() === id);

  // Prépare contents si besoin
  const accountContents = account
    ? account.contents || account.content || []
    : [];

  if (!user || !account) {
    return (
      <p className="Error black">
        Account not found or not connected, please log in or call your own bank
      </p>
    );
  }

  return (
    <main className="main bg-white">
      <section className="account gray" key={account.id}>
        <div className="account-content-wrapper white">
          <h3 className="account-title white">{account.title}</h3>
          <p className="account-amount white">{account.money}</p>
          <p className="account-amount-description white">{account.text}</p>
        </div>
        <div className="account-content-wrapper cta">
          <CloseButton type="button" onClick={() => navigate(-1)} />
        </div>
      </section>

      <div className="position-collaps">
        <div className="position-all-transaction">
          <ul className="name-transaction-one">
            <li className="position-transaction">Date</li>
            <li className="position-transaction">Description</li>
          </ul>
          <ul className="name-transaction">
            <li className="position-transaction">Amount</li>
            <li className="position-transaction">Balance</li>
          </ul>
        </div>
        {account.transactions?.map((transaction) => {
          return (
            <Collaps
              key={transaction.id}
              transaction={transaction}
            />
          );
        })}
      </div>
    </main>
  );
}
