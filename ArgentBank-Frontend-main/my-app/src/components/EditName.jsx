import {useDispatch, useSelector} from "react-redux";
import {logout, getUserProfile} from "../store/authSlice";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import accountsData from "../data/accounts.json";
import "../assets/DashboardCSS/dashboard.css";
import "../assets/ButtonCSS/button.css";
import "../assets/EditNameCSS/EditName.css";
import Button from "../components/Button";

export default function EditName() {
  const {user} = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [isEditing, setIsEditing] = useState(false);
  const [newUserName, setNewUserName] = useState("");
  const userAccounts = user
    ? accountsData.find((u) => u.userId === user.id)?.accounts || []
    : [];

  useEffect(() => {
    if (user) {
      setNewUserName(user.userName);
    }
  }, [user]);

  const handleSave = () => {
    dispatch(updateUserName(newUserName));
    setIsEditing(false);
  };

  const handleCancel = () => {
    setNewUserName(user.userName); // revenir à l’ancien
    setIsEditing(false);
  };

  if (!isEditing) {
    return (
      <span>
        <Button
          className="edit-button"
          onClick={() => setIsEditing(true)}
          text="Edit Name"
          type="button"
        />
        {user?.userName}
      </span>
    );
  }

  const handleUpdateUserName = async () => {
    try {
      const res = await fetch("/user/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // si nécessaire
        },
        body: JSON.stringify({userName: newUserName}),
      });
      const data = await res.json();
      if (res.ok) {
        // Mettre à jour ton state global si tu utilises Redux ou Context
        console.log("Pseudo modifié :", data);
      } else {
        console.error("Erreur :", data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return user ? (
    <>
      <div className="header">
        <h1 className="title-name">
          Welcome back
          <br />
          {user.firstName} {user.lastName}!
        </h1>
        <div className="champs">
          <label for="UserName">User Name:</label>
          <input
            type="text"
            value={newUserName}
            onChange={(e) => setNewUserName(e.target.value)}
          /> 
          <label for="UserName">First Name:</label>
          <input
            type="text"
            value={user.firstName}
            onChange={(e) => setNewUserName(e.target.value)}
          />
          <label for="UserName">Last Name:</label>
          <input
            type="text"
            value={user.lastName}
            onChange={(e) => setNewUserName(e.target.value)}
          />
         
        </div>
        <div className="button-position">
          <Button
            text="Save"
            className="edit-button"
            onClick={handleSave}
          ></Button>
          <Button
            text="Cancel"
            className="edit-button"
            onClick={handleCancel}
          ></Button>
        </div>
      </div>
    </>
  ) : null;
}
