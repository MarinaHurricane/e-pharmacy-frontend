import css from './CartItem.module.css';
import type { CartItem as CartItemType } from '@/app/types/cart';
import { Button } from '@/app/components/Button/Button';
import Image from 'next/image';


interface CartProps {
  cartItem: CartItemType;
  onIncrease: (item: CartItemType) => void;
  onDecrease: (item: CartItemType) => void;
  onDelete: (productId: number) => void;
}

export default function CartItem({
  cartItem,
  onIncrease,
  onDecrease,
  onDelete,
}: CartProps) {
  const price = Number(cartItem.product.price);

  const itemTotal = price * cartItem.quantity;

  return (
    <li className={css.itemWrapper}>
      <div className={css.imageWrapper}>
        <Image
          src={cartItem.product.photo}
          alt={`${cartItem.product.name}-image`}
          width={120}
          height={120}
          className={css.productImage}
        />
      </div>

      <div className={css.productInfo}>
        <div className={css.namePrice}>
          <div className={css.nameBrand}>
            <p className={css.productName}>{cartItem.product.name}</p>
            <p className={css.brand}>Brand: {cartItem.product.suppliers}</p>
          </div>
          <p className={css.productPrice}>{`£ ${itemTotal.toFixed(2)}`}</p>
        </div>

        <div className={css.addToCartWrapper}>
          <div className={css.amountWrapper}>
            <button
              type="button"
              className={css.minus}
              onClick={() => onDecrease(cartItem)}
              disabled={cartItem.quantity <= 1}
            >
              -
            </button>
            <span className={css.ammount}>{cartItem.quantity}</span>
            <button
              type="button"
              className={css.plus}
              onClick={() => onIncrease(cartItem)}
              disabled={cartItem.quantity >= cartItem.product.stock}
            >
              +
            </button>
          </div>

          <Button
            className={css.removeButton}
            onClick={() => onDelete(cartItem.product.id)}
          >
            Remove
          </Button>
        </div>
      </div>
    </li>
  );
}
