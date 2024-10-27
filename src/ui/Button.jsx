function Button({ icon, text, style, buttonContainer }) {
  return (
    <div className={buttonContainer}>
      <button className={style}>
        <span>{icon}</span>
        <span className={text ? "px-2" : "px-0"}>{text ? text : ""}</span>
      </button>
    </div>
  );
}

export default Button;
