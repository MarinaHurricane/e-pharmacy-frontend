import { Icon } from '@/app/components/Icon/Icon';
import css from './Input.module.css';

import type { InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
  valid?: boolean;
};

export const Input = ({ label, error, valid, id, ...props }: InputProps) => {
  return (
    <div className={css.fieldWrapper}>
      <label htmlFor={id} className={css.visuallyHidden}>
        {label}
      </label>

<div className={css.inputWrapper}>
      <input
        id={id}
        className={css.input}
        {...props}
      />
      {valid && <Icon name='icon-check'/>}
      </div>

      {error && <p className={css.error}>{error}</p>}
    </div>
  );
};