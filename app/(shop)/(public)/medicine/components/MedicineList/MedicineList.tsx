import { Product } from '@/app/types/product';
import css from './MedicineList.module.css';
import { Medicine } from '../MedicineItem/Medicine';

interface MedicineListProps {
  products: Product[];
  onAddToCart: (productId: number) => void;
}

export const MedicineList = ({ products, onAddToCart }: MedicineListProps) => {
  return (
    <ul className={css.medicineList}>
      {products?.map((product) => (
        <Medicine key={product.id} product={product} onAddToCart={onAddToCart}/>
      ))}
    </ul>
  );
};
