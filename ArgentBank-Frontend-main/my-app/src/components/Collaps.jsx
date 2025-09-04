import {useState} from "react";
import "../assets/CollapsCss/collaps.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPen} from "@fortawesome/free-solid-svg-icons";
import "../assets/ButtonCSS/button.css"

export default function Collaps({
  typeContents1,
  typeContents2,
  typeContents3,
  description,
  date,
  balance,
  amount,
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
          <li className="CollapsDescrip">{typeContents1}</li>
          <li className="CollapsDescrip">{typeContents2}</li>
          <li className="CollapsDescrip">{typeContents3}</li>
        </ul>

        <ul className={`collapsText${className}`}>
          {descriptions.map((desc, index) => (
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
                  {desc || (
                    <span> New describ</span>
                  )}
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
