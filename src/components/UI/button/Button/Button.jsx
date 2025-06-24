import classes from "./Button.module.css";

export default function Button({
  children,
  isActive,
  dataClipboardTarget,
  ...props
}) {
  return (
    <button
      {...props}
      data-clipboard-target={dataClipboardTarget}
      className={isActive ? classes.active : null}
    >
      {children}
    </button>
  );
}
