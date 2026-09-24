// import css from "./ButtonLink.module.css";
// import Link from "next/link";

// type ButtonLinkProps = {
//   variant?: "primary" | "secondary";
//   className?: string;
//   children: React.ReactNode;
//   href: string;
// };

// export const ButtonLink = ({
//   children,
//   className,
//   href,
//   variant = "primary",
//   ...props
// }: ButtonLinkProps) => {
//   return (
//     <Link href={href}
//     {...props}
//       className={`${css.link} ${css[variant]} ${className || ""}`}
//     >
//       {children}
//     </Link>
//   );
// };

import Link from 'next/link';
import type { ComponentProps } from 'react';
import css from './ButtonLink.module.css';

type ButtonLinkProps = ComponentProps<typeof Link> & {
  variant?: 'primary' | 'secondary';
};

export const ButtonLink = ({
  children,
  className,
  variant = 'primary',
  ...props
}: ButtonLinkProps) => {
  return (
    <Link
      {...props}
      className={`${css.link} ${css[variant]} ${className || ''}`}
    >
      {children}
    </Link>
  );
};
