import { Product } from '@/app/types/product';
import css from './MedicineList.module.css';
import { Medicine } from '../MedicineItem/Medicine';

interface MedicineListProps {
  products: Product[];
}

export const MedicineList = ({ products }: MedicineListProps) => {
  return (
    <ul className={css.medicineList}>
      {products?.map((product) => (
        <Medicine key={product.id} product={product} />
      ))}
    </ul>
  );
};
