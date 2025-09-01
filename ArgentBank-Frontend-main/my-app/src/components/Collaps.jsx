import {useState} from "react";
import "../assets/CollapsCss/collaps.css"

export default function Collaps({content, description, date, balance, amount, className = ""}) {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  // const content = text !== undefined ? text : children;

  return ( 
    <div className={`position-collaps ${isOpen ? "open" : ""} ${className}`}>
      <div className={`collaps ${className}`} onClick={toggle}>
        <h2 className={`collapsTitle`}>{date}</h2>
        <p className="Money">{description}</p>
        <p className="Balance">{amount}</p>
        <h3 className={`collapsTitle`}>{balance}</h3>
        <span className={`arrow ${isOpen ? "open" : ""}`}>
          <i className="fa-solid fa-chevron-up"></i>
        </span>
      </div>
      <div className={`collapsContent ${isOpen ? "open" : ""}${className}`}>
        <div className={`collapsText${className}`}>{content}{balance}{amount}{description}</div>
      </div>
    </div>
  );
}
