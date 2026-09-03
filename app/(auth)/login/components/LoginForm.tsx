'use client';

import { Button } from '@/app/components/Button/Button';
import css from './LoginForm.module.css';
import { Icon } from '@/app/components/Icon/Icon';
import { LoginData, loginUser, registerUser } from '@/app/lib/api/client/authApi';
import { Input } from '../../components/Input';
import { useForm, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Link from 'next/link';
import clsx from 'clsx';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/app/lib/store/store';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { loginSchema } from '@/app/lib/validation/loginSchema';
import { useMutation } from '@tanstack/react-query';
import { setUser } from '@/app/lib/store/slices/authSlice';

export const LoginForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [passwordInputType, setPasswordInputType] = useState<
    'password' | 'text'
  >('password');
  const router = useRouter();

  const passwordVisibilityHandler = () => {
    setPasswordInputType((prev) => (prev === 'password' ? 'text' : 'password'));
  };

  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors, dirtyFields },
  } = useForm<LoginData>({
    mode: 'onChange',
    resolver: yupResolver(loginSchema),
  });

  const loginMutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      console.log('LOGIN RESPONSE:', data);
      console.log("BEFORE DISPATCH", data);
      dispatch(setUser(data));
      console.log("AFTER DISPATCH", data);
console.log(data);
      reset();
      router.push('/medicine');
    },
    onError: (error) => {
      alert('Login failed, please try again');
    },
  });

  const onSubmit = (data: LoginData) => {
    console.log(data);
    loginMutation.mutate(data);
  };

  const email = useWatch({
    control,
    name: 'email',
  });

  const password = useWatch({
    control,
    name: 'password',
  });

  return (
    <>
      <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={css.emailPassword}>
          <Input
            id="email"
            type="email"
            label="email"
            placeholder="Email"
            className={clsx(css.field, {
              [css.errorField]: errors.email,
              [css.check]: dirtyFields.email && email && !errors.email,
            })}
            {...register('email')}
          />
          {errors.email ? (
            <button
              type="button"
              className={css.clearButton}
              onClick={() => setValue('email', '')}
            >
              <Icon name="icon-x" className={css.icon} />
            </button>
          ) : (
            dirtyFields.email &&
            email &&
            !errors.email && (
              <Icon
                name="icon-check"
                className={css.iconCheck}
                width={18}
                height={18}
              />
            )
          )}
        </div>

        <div className={css.emailPassword}>
          <Input
            id="password"
            type={passwordInputType}
            label="password"
            placeholder="Password"
            className={clsx(css.field, {
              [css.errorField]: errors.password,
              [css.check]: dirtyFields.password && password && !errors.password,
            })}
            {...register('password')}
          />
          <button
            type="button"
            className={css.passwordVisibility}
            onClick={passwordVisibilityHandler}
            aria-label={
              passwordInputType === 'password'
                ? 'Show password'
                : 'Hide password'
            }
          >
            {passwordInputType === 'password' ? (
              <Icon name="icon-eye-off" className={css.iconEye} />
            ) : (
              <Icon name="icon-eye" className={css.iconEye} />
            )}
          </button>

          {errors.password ? (
            <p className={css.error}>{errors.password.message}</p>
          ) : (
            dirtyFields.password &&
            !errors.password &&
            password && (
              <>
                <p className={css.passwordCorrect}>Password is secure</p>{' '}
                <Icon name="icon-check" className={css.iconPasswordCheck} />
              </>
            )
          )}
        </div>

        <div className={css.buttonWrapper}>
          <Button type="submit" className={css.authButton}>
            {loginMutation.isPending ? 'Logging...' : 'Log in'}
          </Button>

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
};
