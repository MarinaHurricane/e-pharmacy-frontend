'use client';

import { Button } from '@/app/components/Button/Button';
import css from './error.module.css';

import { ErrorMessage } from '@/app/components/ErrorMessage/ErrorMessage';

export default function Error({
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div>
      <p className={css.error}>Something went wrong. Couldn't load the nearest stores. Please try again</p>
      <Button className={css.reset} onClick={reset} >Try again</Button>
    </div>
  );
}