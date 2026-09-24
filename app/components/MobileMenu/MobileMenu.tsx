import css from './MobileMenu.module.css';
import { Icon } from '../Icon/Icon';
import { LogoutButton } from '../LogoutButton/LogoutButton';
import { ButtonLink } from '../ButtonLink/ButtonLink';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/lib/store/store';

type MobileMenuProps = {
  variant?: 'default' | 'home';
  onClose: () => void;
};

export const MobileMenu = ({
  onClose,
  variant = 'default',
}: MobileMenuProps) => {
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <div className={variant === 'default' ? css.menu : css.menuHome}>
      <div className={css.menuContainer}>
        <button
          type="button"
          aria-label="Close menu"
          onClick={onClose}
          className={css.iconWrap}
        >
          <Icon
            name="icon-cross-small"
            className={variant === 'default' ? css.icon : css.iconHome}
          />
        </button>

        <nav className={css.nav} aria-label="Main navigation">
          <ul className={css.navList}>
            <li>
              <ButtonLink href={'/'} onClick={onClose}>
                Home
              </ButtonLink>
            </li>
            <li>
              <ButtonLink href={'/location'} onClick={onClose}>
                Find a store
              </ButtonLink>
            </li>
            <li>
              <ButtonLink href={'/medicine'} onClick={onClose}>
                Products
              </ButtonLink>
            </li>
          </ul>
        </nav>

        {user ? (
          <LogoutButton />
        ) : (
          <nav aria-label="Authentication">
            <ul className={css.authList}>
              <li>
                <ButtonLink
                  href={'/login'}
                  onClick={onClose}
                  className={css.navButton}
                >
                  Log in
                </ButtonLink>
              </li>
              <li>
                <ButtonLink
                  href={'/register'}
                  onClick={onClose}
                  className={css.navButton}
                >
                  Registration
                </ButtonLink>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </div>
  );
};
