import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import "../assets/ButtonCSS/button.css"

export default function CloseButton ({ onClick, type }) {;
  return <button className="close-button"  onClick={onClick} type={type} > 
  <FontAwesomeIcon icon={faXmark}/>
   </button>
}