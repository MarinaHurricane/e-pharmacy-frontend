import css from './AddToCartModal.module.css';
import { ButtonLink } from '../ButtonLink/ButtonLink';

export const AddToCartModal = () => {
  return (
    <div className={css.modalWrapper}>
      <p className={css.comment}>The item is in your cart now.</p>

      <ButtonLink href={'/cart'} className={css.button} variant="secondary">
        Go to checkout
      </ButtonLink>
    </div>
  );
};
