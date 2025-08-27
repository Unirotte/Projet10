import "../ButtonCSS/button.css"

const Button = ({text}) => {
    return (
        <button className="sign-in-button">{text}</button>
    );
}

export default Button;