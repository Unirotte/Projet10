import accountsData from "../data/accounts.json";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import Collaps from "../components/Collaps.jsx";
import CloseButton from "../components/CloseButton.jsx";

export default function Transactions() {
  const { id } = useParams();
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  // Récupère les comptes de l'utilisateur
  const userAccounts = user
    ? accountsData.find((u) => u.userId === user.id)?.accounts || []
    : [];

  // Sélectionne le compte correspondant à l'id de la route
  const account = userAccounts.find((acc) => acc.id.toString() === id);

  // Prépare contents si besoin (pour futur affichage)
  const accountContents = account ? (account.contents || account.content || []) : [];

  if (!user || !account) {
    return <p>Compte introuvable</p>;
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
        {account.transactions?.map((transaction) => (
          <Collaps
            key={transaction.id}
            id={transaction.id}
            date={transaction.date}
            amount={transaction.amount}
            balance={transaction.balance}
            title={account.title}
            description={transaction.description}
            content={transaction.date} // à remplacer plus tard si nécessaire
          />
        ))}
      </div>
    </main>
  );
}
