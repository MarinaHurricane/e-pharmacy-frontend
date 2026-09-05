import Container from '../Container/Container';
import { Icon } from '../Icon/Icon';
import css from './Footer.module.css';
import Link from 'next/link';
import Image from 'next/image';
import { NavBar } from '../NavBar/NavBar';

export default function Footer() {
  return (
    <footer className={css.footer}>
      <Container>
        <div className={css.footerContainer}>
          <div className={css.footerSection}>
            <Link href={'/'}>
              <Image
                src="/images/logo_footer.svg"
                alt="Pharmacy logo"
                width={135}
                height={32}
                className={css.footerLogo}
              />
            </Link>
            <p className={css.footerParagraph}>
              Get the medicine to help you feel better, get back to your active
              life, and enjoy every moment.
            </p>
          </div>

          <div className={css.footerSectionLinks}>
            <NavBar variant="footer" />

            <ul className={css.socialsList}>
              <li className={css.social}>
                <Link href={'https://www.facebook.com/'}>
                  <Icon name="icon-facebook" className={css.link} />
                </Link>
              </li>
              <li className={css.social}>
                <Link href={'https://www.instagram.com/'}>
                  <Icon name="icon-instagram" className={css.link} />
                </Link>
              </li>
              <li className={css.social}>
                <Link href={'https://www.youtube.com/'}>
                  <Icon name="icon-youtube" className={css.link} />
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <hr className={css.divider} />

        <ul className={css.privacy}>
          <li className={css.privacyItem}>
            © E-Pharmacy 2026. All Rights Reserved
          </li>
          <li className={css.privacyItem}>
            <Link href={'/privacy'}>Privacy Policy</Link>
          </li>
          <li className={css.privacyItem}>
            <Link href={'/terms'}>Terms & Conditions</Link>
          </li>
        </ul>
      </Container>
    </footer>
  );
}
