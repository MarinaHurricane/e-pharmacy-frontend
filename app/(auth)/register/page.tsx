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

export default function RegisterPage() {
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
        <Input id="name" label="name" placeholder="User Name" />
        <Input id="email" label="email" placeholder="Email address" />
        <Input id="phone" label="phone" placeholder="Phone number" />
        <Input id="password" label="password" placeholder="Password" />

        <div className={css.buttonWrapper}>
        <Button className={css.authButton}>Register</Button>
         <p className={css.notice}>
          Already have an account? <Link href="/login" className={css.link}>Log in</Link>
        </p>
        </div>
       
      </form>
      
    </>
  );
}
