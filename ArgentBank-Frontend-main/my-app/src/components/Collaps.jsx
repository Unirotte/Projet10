import {useState} from "react";
import "../assets/CollapsCss/collaps.css";

export default function Collaps({
  descriptionTransaction,
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
        <tr className={`collapsText${className}`}>
          <th className="CollapsDescrip">{descriptionTransaction}</th>
          <td className="CollapsDescrip">{balance}</td>
        </tr>
        {/* <tr className={`collapsText${className}`}>
          <th className="CollapsDescrip">{amount}</th>
          <td className="CollapsDescrip">{description}</td>
        </tr> */}
      </div>
    </div>
  );
}
