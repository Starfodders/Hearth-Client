import "./ForgotPassword.scss";

const ForgotPassword = ({toggle}) => {
  return (
    <>
      <div className="forgot__return">
        <span className="material-symbols-outlined">arrow_back</span>
        <p onClick = {() => toggle(false)}>Return to Login</p>
      </div>
      <p className="forgot__message">Enter the email associated with your account and you'll receive a link to reset your password.</p>
      <form className="forgot__container">
        <label className="forgot__label">Email Address</label>
        <input className="forgot__input"></input>
        <button className="forgot__button">Request Change</button>
      </form>
      <p>This does not work currently</p>
    </>
  );
};

export default ForgotPassword;
