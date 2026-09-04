import { ButtonLink } from '../ButtonLink/ButtonLink';
import css from './NavBar.module.css';

export const NavBar = () => {
    return (
        <nav>
            <ul className={css.navList}>
                <li className={css.navItemWrapper}>
                    <ButtonLink href='/'>Home</ButtonLink></li>
                <li className={css.navItemWrapper}>
                    <ButtonLink href='/medicine-store'>Medicine Store</ButtonLink></li>
                <li className={css.navItemWrapper}>
                     <ButtonLink href='/medicine'>Medicine</ButtonLink></li>
            </ul>
        </nav>
    )
}