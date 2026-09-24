import css from "./LoginModal.module.css";
import { ButtonLink } from "../ButtonLink/ButtonLink";

export const LoginModal = () => {
  return (
    <div className={css.modalWrapper}>

      <h2 className={css.paragraph}>Attention</h2>
      <p className={css.notice}>
       To add items to the cart please log in with your
        credentials. If you do not already have an account, you must register to
        access these features.
      </p>
      <div className={css.buttons}>
        <ButtonLink href={'/login'} className={css.link}>
          Log in
        </ButtonLink>
        <ButtonLink href={'/register'} variant="secondary" className={css.link}>
          Registration
        </ButtonLink>
      </div>
    </div>
  );
};
