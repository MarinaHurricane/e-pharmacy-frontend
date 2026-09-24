import css from './CartItemsList.module.css';
import CartItem from '../../CartItem/CartItem';
import type { CartItem as CartItemType } from '@/app/types/cart';

interface CartItemsListProps {
  cartItems: CartItemType[];
  onIncrease: (item: CartItemType) => void;
  onDecrease: (item: CartItemType) => void;
  onDelete: (productId: number) => void;
}

export default function CartItemsList({ cartItems, onIncrease, onDecrease, onDelete }: CartItemsListProps) {
  return (
    <ul className={css.cartList}>
      {cartItems.map((item) => (
        <CartItem key={item.product.id} cartItem={item} 
          onIncrease={onIncrease}
          onDecrease={onDecrease}
          onDelete={onDelete}/>
      ))}
    </ul>
  );
}
