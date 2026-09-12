'use client';

import { QueryClient, useQuery } from '@tanstack/react-query';
import css from './ProductDetailsClient.module.css';
import {
  getProductById,
  getProductReviews,
} from '@/app/lib/api/client/products';
import Image from 'next/image';
import { useState } from 'react';
import { Button } from '@/app/components/Button/Button';
import { Icon } from '@/app/components/Icon/Icon';
import clsx from 'clsx';
import { ReviewsList } from './components/ReviewsList/ReviewList';
import { ErrorMessage } from '@/app/components/ErrorMessage/ErrorMessage';
import { Loader } from '@/app/components/Loader/Loader';

interface ProductDetailsClientProps {
  productId: string;
}

export default function ProductDetailsPage({
  productId,
}: ProductDetailsClientProps) {
  const [amount, setAmount] = useState<number>(1);
  const [mode, setMode] = useState<'description' | 'reviews'>('description');

  const {
    data: product,
    isLoading: productLoading,
    isError: productError,
  } = useQuery({
    queryKey: ['product', productId],
    queryFn: () => getProductById(Number(productId)),
  });

  const {
    data: reviews,
    isLoading: reviewsLoading,
    isError: reviewsError,
  } = useQuery({
    queryKey: ['reviews', productId],
    queryFn: () => getProductReviews(Number(productId)),
  });

  console.log(reviews);

  console.log(product);

  return (
    <>
      {productLoading ? (
        <Loader />
      ) : productError ? (
        <ErrorMessage />
      ) : (
        <section className={css.productDetails}>
          <div className={css.detailsWrapper}>
            <div className={css.imageWrapper}>
              <Image
                src={product.photo}
                alt={`${product.name}-image`}
                width={335}
                height={337}
                className={css.productImage}
              />
            </div>

            <div className={css.productInfo}>
              <div className={css.namePrice}>
                <div className={css.nameBrand}>
                  <p className={css.productNamePrice}>{product.name}</p>
                  <p className={css.brand}>Brand: {product.suppliers}</p>
                </div>
                <p className={css.productPrice}>{`£ ${product.price}`}</p>
              </div>

              <div className={css.addToCartWrapper}>
                <div className={css.amountWrapper}>
                  <button type="button" className={css.plusMinus}>
                    <Icon
                      name="icon-minus"
                      className={css.icon}
                      width={18}
                      height={20}
                    />
                  </button>
                  <p className={css.ammount}>{amount}</p>
                  <button type="button" className={css.plus}>
                    +
                  </button>
                </div>

                <Button className={css.cartButton}>Add to Cart</Button>
              </div>
            </div>
          </div>

          <div className={css.descriptionWrapper}>
            <div className={css.toggle}>
              <Button
                className={clsx(mode === 'description' ? '' : css.buttonGrey)}
                onClick={() => setMode('description')}
              >
                Description
              </Button>
              <Button
                className={clsx(mode === 'description' ? css.buttonGrey : '')}
                onClick={() => setMode('reviews')}
              >
                Reviews
              </Button>
            </div>

            {mode === 'description' ? (
              <p className={css.description}>{product.description}</p>
            ) : reviewsLoading ? (
              <Loader />
            ) : reviewsError ? (
              <ErrorMessage />
            ) : (
              <ReviewsList reviews={reviews} />
            )}
          </div>
        </section>
      )}
    </>
  );
}
