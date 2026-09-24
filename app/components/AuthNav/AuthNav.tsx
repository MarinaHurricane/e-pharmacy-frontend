import css from './AuthNav.module.css';
import { ButtonLink } from '../ButtonLink/ButtonLink';
import { LogoutButton } from '../LogoutButton/LogoutButton';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/lib/store/store';

export const AuthNav = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  return (
    <nav>
      <ul className={css.navList}>
        {user ? (
          <li className={css.logoutBtn}>
            <LogoutButton />
          </li>
        ) : (
          <>
            <li>
              <ButtonLink href={'/login'} className={css.navButton}>
                Log in
              </ButtonLink>
            </li>

            <li>
              <ButtonLink href={'/register'} className={css.navButton}>
                Registration
              </ButtonLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};
