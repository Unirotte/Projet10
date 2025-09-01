import "../assets/ButtonCSS/button.css"

export default function Button({ text, className, onClick, type }) {
  return <button className={className} onClick={onClick} type={type}>{text}</button>;
}

