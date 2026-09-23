'use client';

import { useSelector } from 'react-redux';
import { Icon } from '../Icon/Icon';
import css from './Header.module.css';
import logo from './logo2.svg';
import Image from 'next/image';
import { RootState } from '@/app/lib/store/store';
import { NavBar } from '../NavBar/NavBar';
import { AuthNav } from '../AuthNav/AuthNav';
import Container from '../Container/Container';
import clsx from 'clsx';
import Link from 'next/link';

interface HeaderProps {
  variant: 'home' | 'shop';
}

export default function Header({ variant }: HeaderProps) {
  const user = useSelector((state: RootState) => state.auth.user);
  // if(!user) return;
  console.log('USER:', user);
  const initial = user?.name.slice(0, 1).toUpperCase();
  console.log(initial);
  return (
    <section>
      <Container>
        <div className={clsx(variant === 'home' ? css.home : css.header)}>
          <Link href={'/'}>
            {variant === 'home' ? (
              <Image
                src="/images/logo1.svg"
                alt="E-Pharmacy"
                width={135}
                height={32}
                className={css.logo}
              />
            ) : (
              <Image
                src="/images/logo2.svg"
                alt="E-Pharmacy"
                width={135}
                height={32}
                className={css.logo}
              />
            )}
          </Link>

          <NavBar />



          <div className={css.cartWrapper}>
            <Link href={'/cart'}>
            <div
              className={clsx(
                css.iconWrapper,
                variant === 'home' && css.homeIconWrapper,
              )}
            >
              <Icon
                name="icon-cart"
                width={16}
                height={16}
                className={css.iconCart}
              />
            </div>
            </Link>

            {user && (
              <div
                className={clsx(
                  css.initialWrapper,
                  variant === 'home' && css.homeInitialWrapper,
                )}
              >
                <p
                  className={clsx(
                    css.initial,
                    variant === 'home' && css.homeInitial,
                  )}
                >
                  {initial}
                </p>
              </div>
            )}

            <button
              type="button"
              className={css.iconWrap}
              aria-label="Open menu"
            >
              <Icon
                name="icon-menu-01"
                className={clsx(variant === 'home' ? css.homeMenu : css.menu)}
              />
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
}
