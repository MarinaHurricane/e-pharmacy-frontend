'use client';

import { Button } from '@/app/components/Button/Button';
import css from './page.module.css';
import { Icon } from '@/app/components/Icon/Icon';
import { registerUser } from '@/app/lib/api/authApi';
import { Input } from '../components/Input';
import { useForm, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Link from 'next/link';

export default function LoginPage() {
  const handleTest = async () => {
    try {
      const result = await registerUser({
        name: 'Asya',
        email: 'asya@example.com',
        phone: '+441234567892',
        password: '12345678',
      });

      console.log('REGISTER SUCCESS:', result);
    } catch (error) {
      console.error('REGISTER ERROR:', error);
    }
  };

  return (
    <>
      <form className={css.form}>
        <Input id="email" label="email" placeholder="Email address" className={css.input}/>

        <Input id="password" label="password" placeholder="Password" className={css.input}/>

            <div className={css.buttonWrapper}>
        <Button className={css.authButton}>Log in</Button>
      
     
        <p className={css.notice}>
         Don't have an account? {''}
          <Link href="/register" className={css.link}>
            Register
          </Link>
        </p>
         </div>
        </form>
    </>
  );
}
