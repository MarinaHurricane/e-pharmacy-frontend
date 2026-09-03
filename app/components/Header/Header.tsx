'use client'

import { useSelector } from 'react-redux';
import { Icon } from '../Icon/Icon';
import css from './Header.module.css';
import logo from './logo2.svg';
import Image from 'next/image';
import { RootState } from '@/app/lib/store/store';

interface HeaderProps {
  variant: 'home' | 'shop';
}

export default function Header({variant}: HeaderProps) {
  const user = useSelector((state: RootState) => state.auth.user);
  // if(!user) return;
console.log('USER:', user);
  const initial = user?.name.slice(0, 1).toUpperCase();
  console.log(initial);
  return (
    <section className={css.header}>
      <Image src="/images/logo2.svg" alt="E-Pharmacy" width={150} height={40} />

      <div className={css.cartWrapper}>
        <div className={css.iconWrapper}>
          <Icon name='icon-cart' width={16} height={16} className={css.iconCart}/>
        </div>

{user && (
     <div className={css.initialWrapper}>
          <p className={css.initial}>{initial}</p>
        </div>

) }

     
      </div>
    </section>
  );
}
