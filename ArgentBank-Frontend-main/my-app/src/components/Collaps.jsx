import {useState} from "react";
import "../assets/CollapsCss/collaps.css";
import "../assets/ButtonCSS/button.css"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPen} from "@fortawesome/free-solid-svg-icons";

export default function Collaps({
  transaction,
  className = "",
}) {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  // Les 3 descriptions, vides au départ
  const [descriptions, setDescriptions] = useState(["", "", ""]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [tempText, setTempText] = useState("");

  const handleEdit = (index) => {
    setEditingIndex(index);
    setTempText(descriptions[index] || "");
  };

  const handleSave = () => {
    const updated = [...descriptions];
    updated[editingIndex] = tempText;
    setDescriptions(updated);
    setEditingIndex(null);
  };

  const handleCancel = () => {
    setTempText("");
    setEditingIndex(null);
  };
  const {date, description, amount, balance, type, category, note} = transaction;
  return (
    <div className={`position-collaps ${isOpen ? "open" : ""} ${className}`}>
      <div className={`collaps ${className}`} onClick={toggle}>
        <div className="test">
          <ul className="position-title-collaps">
            <li className="collapsTitle">{date}</li>
            <li className="Money">{description}</li>
          </ul>
          <ul className="position-title-collaps">
            <li className="Balance">{amount}</li>
            <li className="collapsTitle">{balance}</li>
          </ul>
        </div>
        <span className={`arrow ${isOpen ? "open" : ""}`}>
          <i className="fa-solid fa-chevron-up"></i>
        </span>
      </div>

      <div className={`collapsContent ${isOpen ? "open" : ""}${className}`}>
        <ul className={`collapsText${className}`}>
          <li className="CollapsDescrip">Transaction type</li>
          <li className="CollapsDescrip">Category</li>
          <li className="CollapsDescrip">Note</li>
        </ul>

        <ul className={`collapsText${className}`}>
          {[type, category, note].map((desc, index) => (
            <li key={index} className="CollapsDescrip">
              {editingIndex === index ? (
                <>
                  <input className="input-collaps"
                    type="text"
                    value={tempText}
                    onChange={(e) => setTempText(e.target.value)}
                  />
                  <button className="editTrans" onClick={handleSave}>Save</button>
                  <button className="editTrans" onClick={handleCancel}>Cancel</button>
                </>
              ) : (
                <>
                 {desc}
                  <button className="pen" onClick={() => handleEdit(index)}>
                    <FontAwesomeIcon icon={faPen} />
                  </button>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
