import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/authSlice";
import Button from "./Button.jsx";
import { useNavigate } from "react-router-dom";

export default function BodySign() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, token } = useSelector((state) => state.auth);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ email: username, password }));
  };

  // Redirection dès que le token est présent
  useEffect(() => {
    if (token) {
      navigate("/dashboard"); // <- tu créeras cette page plus tard
    }
  }, [token, navigate]);

  return (
    <main className="main bg-dark">
      <section className="sign-in-content">
        <h1>Sign In</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button type="submit" disabled={loading}>Sign In</Button>
        </form>
        {error && <p style={{ color: "red" }}>{error.message || "Erreur de connexion"}</p>}
      </section>
    </main>
  );
}