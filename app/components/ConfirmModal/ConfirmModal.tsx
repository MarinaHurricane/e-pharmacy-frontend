import { Icon } from '../Icon/Icon';
import css from './ConfirmModal.module.css';

export default function ConfirmModal() {
  return (
    <div className={css.modalWrapper}>
      <Icon name="icon-check-2" width={52} height={52} className={css.icon} />
      <p className={css.comment}>Your order has been placed</p>
    </div>
  );
}
