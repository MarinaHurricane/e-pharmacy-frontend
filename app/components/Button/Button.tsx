import css from "./Button.module.css";
import clsx from "clsx";

type ButtonProps = {
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({
  children,
  className,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={clsx(css.button, className)}
      {...props}
    >
      {children}
    </button>
  );
};
