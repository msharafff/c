export default function Button({ children, textOnly, className, ...Props }) {
  let cssClasses = textOnly ? "text-button" : "button";
  cssClasses += " " + className;
  return (
    <button className={cssClasses} {...Props}>
      {children}
    </button>
  );
}
