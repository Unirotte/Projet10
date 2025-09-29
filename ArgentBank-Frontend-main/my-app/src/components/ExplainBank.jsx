import {Chat, Money, Security} from "../components/Index";
import "../assets/ExplainCss/explain.css";

export default function ExplainBank({title,title2,title3,text,text2,text3,}) {
  return (
    <section className="features">
      <div className="feature-item">
        <img src={Chat} alt="Chat Icon" className="feature-icon" />
        <h3 className="feature-item-title">{title}</h3>
        <p>{text}</p>
      </div>
      <div className="feature-item">
        <img src={Money} alt="Money Icon" className="feature-icon" />
        <h3 className="feature-item-title">{title2}</h3>
        <p>{text2}</p>
      </div>
      <div className="feature-item">
        <img src={Security} alt="Security Icon" className="feature-icon" />
        <h3 className="feature-item-title">{title3}</h3>
        <p>{text3}</p>
      </div>
    </section>
 );
}
