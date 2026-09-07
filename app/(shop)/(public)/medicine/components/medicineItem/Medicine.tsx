import { Product } from '@/app/types/product';
import css from './Medicine.module.css';
import Image from 'next/image';
import { Button } from '@/app/components/Button/Button';
import Link from 'next/link';

interface MedicineProps {
  product: Product;
}

export const Medicine = ({ product }: MedicineProps) => {
    console.log('PRODUCT ID:', product.id);
  return (
    <li>
      <div className={css.medicineItem}>
        {/* <div className={css.imageWrapper}> */}
        {/* <Image
          src={product.photo}
          alt={`${product.name}-picture`}
          width={350}
          height={320}
          className={css.image}
        /> */}
        {/* </div> */}
        <img src={product.photo} alt="" className={css.image}/>
        <div className={css.productInfo}>
          <div className={css.info}>
            <p className={css.namePrice}>{product.name}</p>
            <p className={css.namePrice}>{`£ ${product.price}`}</p>
          </div>

          <p className={css.suppliers}>{product.suppliers}</p>

          <div className={css.info}>
            <Button className={css.cartButton}>Add to cart</Button>

            <Link href={'/product'} className={css.details}>Details</Link>
          </div>
        </div>
      </div>
    </li>
  );
};
