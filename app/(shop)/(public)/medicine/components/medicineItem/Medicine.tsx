import { Product } from '@/app/types/product';
import css from './Medicine.module.css';
import Image from 'next/image';
import { Button } from '@/app/components/Button/Button';
import Link from 'next/link';


export const optimizeCloudinaryImage = (url: string) => {
  return url.replace(
    "/upload/",
    "/upload/f_auto,q_auto,w_350/"
  );
};

interface MedicineProps {
  product: Product;
}

export const Medicine = ({ product }: MedicineProps) => {

  console.log('PRODUCT ID:', product.id);
  return (
    <li>
      <div className={css.medicineItem}>
        <div className={css.imageWrapper}>
          <Image
            src={optimizeCloudinaryImage(product.photo)}

            alt={`${product.name}-picture`}
             sizes="(max-width: 768px) 50vw, (max-width: 1440px) 33vw, 25vw"
            width={350}
            height={337}
            loading='eager'
            className={css.image}
          />
        </div>
        
        <div className={css.productInfo}>
          <div className={css.info}>
            <p className={css.namePrice}>{product.name}</p>
            <p className={css.namePrice}>{`£ ${product.price}`}</p>
          </div>

          <p className={css.suppliers}>{product.suppliers}</p>

          <div className={css.info}>
            <Button className={css.cartButton}>Add to cart</Button>

            <Link href={`/medicine/${product.id}`} className={css.details} >
              Details
            </Link>
          </div>
        </div>
      </div>
    </li>
  );
};
