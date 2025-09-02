import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import accountsData from "../data/accounts.json";
import "../assets/DashboardCSS/dashboard.css";
import "../assets/ButtonCSS/button.css";
import "../assets/EditNameCSS/EditName.css";
import Button from "../components/Button";
import {logout, getUserProfile, updateUserName} from "../store/authSlice";

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
    return user ? (
      <div className="header">
        <h1 className="title-name">
          Welcome back
          <br />
          {user.firstName} {user.lastName}!
        </h1>

        <Button
          className="edit-button"
          onClick={() => setIsEditing(true)}
          text="Edit Name"
          type="button"
        />
      </div>
    ) : null;
  }

  // const handleUpdateUserName = async () => {
  //   try {
  //     const res = await fetch("/user/profile", {
  //       method: "PUT",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${token}`, // si nécessaire
  //       },
  //       body: JSON.stringify({userName: newUserName}),
  //     });
  //     const data = await res.json();
  //     if (res.ok) {
  //       // Mettre à jour ton state global si tu utilises Redux ou Context
  //       console.log("Pseudo modifié :", data);
  //     } else {
  //       console.error("Erreur :", data);
  //     }
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  return user ? (
    <>
      <div className="header">
        <h1 className="title-name">Edit user info</h1>

        <div className="champs">
          <div className="position-champs">
            <label htmlFor="UserName">User Name:</label>
            <input
              type="text"
              value={newUserName}
              onChange={(e) => setNewUserName(e.target.value)}
            />
          </div>
          <div className="position-champs">
            <label htmlFor="UserName">First Name:</label>
            <input type="text" value={user.firstName} disabled />
          </div>
          <div className="position-champs">
            <label htmlfor="UserName">Last Name:</label>
            <input type="text" value={user.lastName} disabled />
          </div>
        </div>
        <div className="button-position">
          <Button
            text="Save"
            className="button-pseudo"
            onClick={handleSave}
          ></Button>
          <Button
            text="Cancel"
            className="button-pseudo"
            onClick={handleCancel}
          ></Button>
        </div>
      </div>
    </>
  ) : null;
}
