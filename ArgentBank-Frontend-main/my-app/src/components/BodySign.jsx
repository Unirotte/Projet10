import {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {login} from "../store/authSlice";
import Button from "./Button.jsx";
import {useNavigate} from "react-router-dom";
import RememberButton from "./RememberButton";

export default function BodySign() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {error, token} = useSelector((state) => state.auth);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({email: username, password}));
  };

  useEffect(() => {
    if (token) {
      if (remember) {
        localStorage.setItem("savedEmail", username);
      } else {
        localStorage.removeItem("savedEmail");
      }
      navigate("/User");
    }
  }, [token, remember, navigate, username]);
  useEffect(() => {
    const savedEmail = localStorage.getItem("savedEmail");
    if (savedEmail) {
      setUsername(savedEmail);
      setRemember(true);
    }
  }, []);

  return (
    <main className="main bg-dark sign-in">
      <section className="sign-in-content">
        <i className="fa fa-user-circle"></i>
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
            <RememberButton checked={remember} setChecked={setRemember} />
          </div>
          <Button
            text="Sign In"
            className="sign-in-button"
            type="submit"
          ></Button>
        </form>
        {error && <p style={{color: "red"}}>{error.message}</p>}
      </section>
    </main>
  );
}
