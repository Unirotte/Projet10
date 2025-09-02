import {useState} from "react";
import "../assets/CollapsCss/collaps.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPen} from "@fortawesome/free-solid-svg-icons";
export default function Collaps({
  typeContents1,
  typeContents2,
  typeContents3,
  descriptionContents1,
  descriptionContents2,
  descriptionContents3,
  description,
  date,
  balance,
  amount,
  className = "",
}) {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  // const content = text !== undefined ? text : children;

  return (
    <div className={`position-collaps ${isOpen ? "open" : ""} ${className}`}>
      <div className={`collaps ${className}`} onClick={toggle}>
        <div className="test">
          <ul className="position-title-collaps">
            <li className={`collapsTitle`}>{date}</li>
            <li className="Money">{description}</li>
          </ul>
          <ul className="position-title-collaps">
            <li className="Balance">{amount}</li>
            <li className={`collapsTitle`}>{balance}</li>
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
          <li className="CollapsDescrip">{descriptionContents1}</li>
          <li className="CollapsDescrip">
            {descriptionContents2}
            <span className="pen">
              <FontAwesomeIcon icon={faPen} />
            </span>
          </li>
          <li className="CollapsDescrip">{descriptionContents3}
            <span className="pen">
              <FontAwesomeIcon icon={faPen} />
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}
