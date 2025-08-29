import accountsData from "../data/accounts.json";
import {useSelector} from "react-redux";
import Button from "../components/Button.jsx";
import {useParams} from "react-router-dom";
import Collaps from "../components/Collaps.jsx";

export default function Transactions() {
  const {id} = useParams();
  const {user} = useSelector((state) => state.auth);

  const userAccounts = user
    ? accountsData.find((u) => u.userId === user.id)?.accounts || []
    : [];

  // Vérifie en string pour éviter les soucis de type
  const account = userAccounts.find((acc) => acc.id.toString() === id);

  return user && account ? (
    <main className="main bg-dark">
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
          />
        </div>
      </section>
      <div className="position-collaps">
        {userAccounts.map((account) =>
          account.transactions.map((transaction) => ( 
            // account.contents.map((content) => (
            <Collaps
              key={transaction.id}
              id={transaction.id}
              date={transaction.date}
              amount={transaction.amount}
              balance={transaction.balance}
              title={account.title}
              description={transaction.description}
// content={content.date}
            />
          ))
        )}
      </div>
    </main>
  ) : (
    <p>Compte introuvable</p>
  );
}
