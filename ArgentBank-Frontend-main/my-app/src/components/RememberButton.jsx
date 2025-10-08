import "../assets/RememberCss/RememberButton.css";

function RememberButton({checked, setChecked}) {
  const handleClick = () => setChecked(!checked);

  return (
    <div className="input-remember">
      <input
        type="checkbox"
        id="remember"
        checked={checked}
        onChange={handleClick}
      />
      <label htmlFor="remember" className="button-radio" style={{fontWeight: "100"}}>
        Remember me
      </label>
    </div>
  );
}

export default RememberButton;
