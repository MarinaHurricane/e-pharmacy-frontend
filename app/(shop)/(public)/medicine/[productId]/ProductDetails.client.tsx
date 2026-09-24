'use client';

import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import css from './ProductDetailsClient.module.css';
import {
  getProductById,
  getProductReviews,
} from '@/app/lib/api/client/products';
import { addCartItem } from '@/app/lib/api/client/cartApi';
import Image from 'next/image';
import { useState } from 'react';
import { Button } from '@/app/components/Button/Button';
import { Icon } from '@/app/components/Icon/Icon';
import clsx from 'clsx';
import { ReviewsList } from './components/ReviewsList/ReviewList';
import { ErrorMessage } from '@/app/components/ErrorMessage/ErrorMessage';
import { Loader } from '@/app/components/Loader/Loader';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/lib/store/store';
import { Modal } from '@/app/components/Modal/Modal';
import { LoginModal } from '@/app/components/LoginModal/LoginModal';
import { AddToCartModal } from '@/app/components/AddToCartModal/AddToCartModal';

interface ProductDetailsClientProps {
  productId: string;
}

export default function ProductDetailsPage({
  productId,
}: ProductDetailsClientProps) {
  const user = useSelector((state: RootState) => state.auth.user);
  const [quantity, setQuantity] = useState(1);
  const [mode, setMode] = useState<'description' | 'reviews'>('description');
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isAddToCartModalOpen, setIsAddToCartModalOpen] = useState(false);

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

  const queryClient = useQueryClient();

  const addToCartMutation = useMutation({
    mutationFn: ({
      productId,
      quantity,
    }: {
      productId: number;
      quantity: number;
    }) => addCartItem(productId, quantity),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['cart'],
      });

      toast.success('Product added to cart');

      setQuantity(1);
    },

    onError: () => {
      toast.error('Could not add product to cart');
    },
  });

  const handleIncrease = () => {
    if (quantity >= product.stock) {
      return;
    }

    setQuantity((prev) => prev + 1);
  };

  const handleDecrease = () => {
    if (quantity <= 1) {
      return;
    }

    setQuantity((prev) => prev - 1);
  };

  const handleAddToCart = () => {
    if (!user) {
      setIsLoginModalOpen(true);
      return;
    }
    addToCartMutation.mutate({
      productId: product.id,
      quantity,
    });
    setIsAddToCartModalOpen(true);
  };

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
                  <button
                    type="button"
                    className={css.plusMinus}
                    onClick={handleDecrease}
                    disabled={quantity === 1}
                  >
                    <Icon
                      name="icon-minus"
                      className={css.icon}
                      width={18}
                      height={20}
                    />
                  </button>
                  <p className={css.ammount}>{quantity}</p>
                  <button
                    type="button"
                    className={css.plus}
                    onClick={handleIncrease}
                    disabled={quantity >= product.stock}
                  >
                    +
                  </button>
                </div>

                <Button
                  className={css.cartButton}
                  onClick={handleAddToCart}
                  disabled={addToCartMutation.isPending || product.stock === 0}
                >
                  Add to Cart
                </Button>
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

          {isLoginModalOpen && (
            <Modal onClose={() => setIsLoginModalOpen(false)}>
              <LoginModal />
            </Modal>
          )}

          {isAddToCartModalOpen && (
            <Modal onClose={() => setIsAddToCartModalOpen(false)}>
              <AddToCartModal />
            </Modal>
          )}
        </section>
      )}
    </>
  );
}
