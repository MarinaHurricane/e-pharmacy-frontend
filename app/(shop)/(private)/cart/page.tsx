'use client';

import css from './page.module.css';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import toast from 'react-hot-toast';
import {
  getCart,
  updateCartItem,
  deleteCartItem,
} from '@/app/lib/api/client/cartApi';
import {
  createOrder,
  CreateOrderPayload,
} from '@/app/lib/api/client/ordersApi';
import { Title } from '../../(public)/medicine-store/components/Title/Title';
import { Button } from '@/app/components/Button/Button';
import CartItemsList from './CartItemsList/CartItemsList';
import { Cart, CartItem } from '@/app/types/cart';
import { Suspense } from 'react';
import { Loader } from '@/app/components/Loader/Loader';

type OrderFormValues = {
  name: string;
  email: string;
  phone: string;
  address: string;
  paymentMethod: 'CASH_ON_DELIVERY';
};

export default function CartPage() {
  const queryClient = useQueryClient();

  // Getting cart

  const {
    data: cart,
    isLoading,
    isError,
  } = useQuery<Cart>({
    queryKey: ['cart'],
    queryFn: getCart,
  });

  // Changing quantity of cart items

  const updateCartMutation = useMutation({
    mutationFn: ({
      productId,
      quantity,
    }: {
      productId: number;
      quantity: number;
    }) => updateCartItem(productId, quantity),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['cart'],
      });
    },

    onError: () => {
      toast.error('Could not update cart');
    },
  });

  // Removing product from cart

  const deleteCartMutation = useMutation({
    mutationFn: deleteCartItem,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['cart'],
      });

      toast.success('Product removed from cart');
    },

    onError: () => {
      toast.error('Could not remove product');
    },
  });

  const handleDelete = (productId: number) => {
    deleteCartMutation.mutate(productId);
  };

  // Checkout form

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<OrderFormValues>({
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      address: '',
      paymentMethod: 'CASH_ON_DELIVERY',
    },
  });

  // Creating order

  const createOrderMutation = useMutation({
    mutationFn: (values: CreateOrderPayload) => createOrder(values),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['cart'],
      });

      reset();

      toast.success('Order placed successfully');
    },

    onError: (error) => {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || 'Could not place order');

        return;
      }

      toast.error('Could not place order');
    },
  });

  // Incrementing/decrementing the quantity of cart item

  const handleIncrease = (item: CartItem) => {
    if (item.quantity >= item?.product?.stock) {
      toast.error('No more products available');
      return;
    }

    updateCartMutation.mutate({
      productId: item.productId,
      quantity: item.quantity + 1,
    });
  };

  const handleDecrease = (item: CartItem) => {
    if (item.quantity <= 1) {
      return;
    }

    updateCartMutation.mutate({
      productId: item.productId,
      quantity: item.quantity - 1,
    });
  };

  // Placing the order

  const onSubmit = (values: OrderFormValues) => {
    if (!cart?.items.length) {
      toast.error('Your cart is empty');
      return;
    }

    createOrderMutation.mutate(values);
  };

  // Calculating total

  const total =
    cart?.items.reduce((sum, item) => {
      const price = Number(item.product.price);

      return sum + price * item.quantity;
    }, 0) ?? 0;

  if (isLoading) {
    return <p>Loading cart...</p>;
  }

  if (isError) {
    return <p>Could not load cart.</p>;
  }

  return (
    <section className={css.cartPage}>
      <Title>Cart</Title>

      <div className={css.cartPageWrapper}>
        <div className={css.shipping}>
          <h2 className={css.subtitle}>Enter Shipping information</h2>

          <p className={css.formText}>Please fill in all the fields below</p>

          <form onSubmit={handleSubmit(onSubmit)} className={css.form}>
            <div className={css.inputsWrapper}>
              <div className={css.formInput}>
                <label htmlFor="name" className={css.label}>
                  Name
                </label>

                <input
                  id="name"
                  placeholder="Enter name"
                  className={css.input}
                  {...register('name', {
                    required: 'Name is required',
                  })}
                />

                {errors.name && <p>{errors.name.message}</p>}
              </div>

              <div className={css.formInput}>
                <label htmlFor="email" className={css.label}>
                  Email
                </label>

                <input
                  id="email"
                  type="email"
                  placeholder="Enter email"
                  className={css.input}
                  {...register('email', {
                    required: 'Email is required',
                  })}
                />

                {errors.email && <p>{errors.email.message}</p>}
              </div>

              <div className={css.formInput}>
                <label htmlFor="phone" className={css.label}>
                  Phone
                </label>

                <input
                  id="phone"
                  type="tel"
                  placeholder="Enter phone number"
                  className={css.input}
                  {...register('phone', {
                    required: 'Phone is required',
                  })}
                />

                {errors.phone && <p>{errors.phone.message}</p>}
              </div>

              <div className={css.formInput}>
                <label htmlFor="address" className={css.label}>
                  Address
                </label>

                <input
                  id="address"
                  placeholder="Enter address"
                  className={css.input}
                  {...register('address', {
                    required: 'Address is required',
                  })}
                />

                {errors.address && <p>{errors.address.message}</p>}
              </div>
            </div>

            <div className={css.divider} aria-hidden="true" />

            <fieldset className={css.payment}>
              <legend className={css.paymentLabel}>Payment method</legend>

              <p className={css.formText}>
                Please choose one of the available options
              </p>

              <div className={css.paymentOptions}>
                <label className={css.paymentType}>
                  <input
                    type="radio"
                    value="CASH_ON_DELIVERY"
                    className={css.radio}
                    {...register('paymentMethod')}
                  />
                  Cash on delivery
                </label>

                <label className={css.paymentType}>
                  <input type="radio" disabled className={css.radio} />
                  Bank payment
                </label>
              </div>
            </fieldset>

            <div className={css.divider} aria-hidden="true" />

            <h2 className={css.paymentLabel}>Order details</h2>

            <p className={css.totalText}>
              Shipping and additionnal costs are calculated based on values you
              have entered.
            </p>

            <div className={css.total}>
              <span className={css.sum}>Total</span>
              <span className={css.sum}>£ {total.toFixed(2)}</span>
            </div>

            <Button
              type="submit"
              className={css.button}
              disabled={!cart?.items.length || createOrderMutation.isPending}
            >
              {createOrderMutation.isPending
                ? 'Placing order...'
                : 'Place order'}
            </Button>
          </form>
        </div>

        <Suspense fallback={<Loader />}>
          <CartItemsList
            cartItems={cart?.items ?? []}
            onIncrease={handleIncrease}
            onDecrease={handleDecrease}
            onDelete={handleDelete}
          />
        </Suspense>
        
      </div>
    </section>
  );
}
