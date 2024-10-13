function Button({ icon, text, style }) {
  return (
    <button className={style}>
      <span>{icon}</span>
      <span className={text ? "px-2" : "px-0"}>{text ? text : ""}</span>
    </button>
  );
}

export default Button;
