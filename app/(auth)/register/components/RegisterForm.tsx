'use client';

import { Button } from '@/app/components/Button/Button';
import css from './RegisterForm.module.css';
import { Icon } from '@/app/components/Icon/Icon';
import { registerUser } from '@/app/lib/api/authApi';
import { Input } from '@/app/(auth)/components/Input';
import { useForm, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Link from 'next/link';
import { registerSchema } from '@/app/lib/validation/registerSchema';
import { AppDispatch } from '@/app/lib/store/store';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { setUser } from '@/app/lib/store/slices/authSlice';
import { RegisterData } from '@/app/lib/api/authApi';
import clsx from 'clsx';

export const RegisterForm = () => {
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
  } = useForm<RegisterData>({
    mode: 'onChange',
    resolver: yupResolver(registerSchema),
  });

  const registerMutation = useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      console.log('REGISTER RESPONSE:', data);
      dispatch(setUser(data.user));
      reset();
      router.push('/medicine');
    },
    onError: (error) => {
      alert('Registration failed, please try again');
    },
  });

  const onSubmit = (data: RegisterData) => {
    console.log(data);
    registerMutation.mutate(data);
  };

  const name = useWatch({
    control,
    name: 'name',
  });

  const email = useWatch({
    control,
    name: 'email',
  });

  const phone = useWatch({
    control,
    name: 'phone',
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
            type="text"
            id="name"
            label="name"
            placeholder="User Name"
            className={clsx(css.field, {
              [css.errorField]: errors.name,
              [css.check]: dirtyFields.name && name && !errors.name,
            })}
            {...register('name')}
          />
          {errors.name && <p className={css.error}>{errors.name.message}</p>}
        </div>

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

          {errors.email && <p className={css.error}>{errors.email.message}</p>}
        </div>

        <div className={css.emailPassword}>
          <Input
            id="phone"
            type="tel"
            label="phone"
            placeholder="Phone number"
            className={clsx(css.field, {
              [css.errorField]: errors.phone,
              [css.check]: dirtyFields.phone && phone && !errors.phone,
            })}
            {...register('phone')}
          />
          {errors.phone ? (
            <button
              type="button"
              className={css.clearButton}
              onClick={() => {
                setValue('phone', '');
              }}
            >
              <Icon name="icon-x" className={css.icon} />
            </button>
          ) : (
            dirtyFields.phone &&
            phone &&
            !errors.phone && (
              <Icon
                name="icon-check"
                className={css.iconCheck}
                width={18}
                height={18}
              />
            )
          )}

          {errors.phone && <p className={css.error}>{errors.phone.message}</p>}
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
            {registerMutation.isPending ? 'Registering...' : 'Register'}
          </Button>
          <p className={css.notice}>
            Already have an account?{' '}
            <Link href="/login" className={css.link}>
              Log in
            </Link>
          </p>
        </div>
      </form>
    </>
  );
};
