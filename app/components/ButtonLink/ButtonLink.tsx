import css from "./ButtonLink.module.css";
import Link from "next/link";

type ButtonLinkProps = {
  variant?: "primary" | "secondary";
  className?: string;
  children: React.ReactNode;
  href: string;
};

export const ButtonLink = ({
  children,
  className,
  href,
  variant = "primary",
}: ButtonLinkProps) => {
  return (
    <Link href={href}
      className={`${css.link} ${css[variant]} ${className || ""}`}
    >
      {children}
    </Link>
  );
};
