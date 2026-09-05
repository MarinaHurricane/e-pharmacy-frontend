import { ButtonLink } from '../ButtonLink/ButtonLink';
import css from './NavBar.module.css';
import clsx from 'clsx';

interface NavBarProps {
  variant: 'header' | 'footer';
}

export const NavBar = ({ variant }: NavBarProps) => {
  return (
    <nav>
      <ul className={clsx(css.navList, variant === 'footer' && css.footerNav)}>
        <li className={css.navItemWrapper}>
          <ButtonLink
            href="/"
            className={clsx(variant === 'footer' ? css.footerButton : '')}
          >
            Home
          </ButtonLink>
        </li>
        <li className={css.navItemWrapper}>
          <ButtonLink
            href="/medicine-store"
            className={clsx(variant === 'footer' ? css.footerButton : '')}
          >
            Medicine Store
          </ButtonLink>
        </li>
        <li className={css.navItemWrapper}>
          <ButtonLink
            href="/medicine"
            className={clsx(variant === 'footer' ? css.footerButton : '')}
          >
            Medicine
          </ButtonLink>
        </li>
      </ul>
    </nav>
  );
};
