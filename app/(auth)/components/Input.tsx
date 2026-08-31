import css from './Input.module.css';

import type { InputHTMLAttributes } from 'react';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  className?: string;
};

export const Input = ({ label, id, ...props }: InputProps) => {
  return (
    <div className={css.fieldWrapper}>
      <label htmlFor={id} className={css.visuallyHidden}>
        {label}
      </label>

      <div className={css.inputWrapper}>
        <input id={id} className={css.input} {...props} />
      </div>
    </div>
  );
};
