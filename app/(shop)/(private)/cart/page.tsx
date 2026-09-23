// 'use client'

// import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
// import css from './page.module.css';
// import { addCartItem, getCart } from '@/app/lib/api/client/cartApi';
// import toast from 'react-hot-toast';
// import axios from 'axios';
// import { createOrder } from '@/app/lib/api/client/ordersApi';

// export default function CartPage() {
//     const { data: cart } = useQuery({
//   queryKey: ['cart'],
//   queryFn: getCart,
// });

// console.log(cart);

// // const queryClient = useQueryClient();

// // const addToCartMutation = useMutation({
// //   mutationFn: addCartItem,

// //   onSuccess: () => {
// //     queryClient.invalidateQueries({
// //       queryKey: ['cart'],
// //     });
// //   },
// // });


// // const queryClient = useQueryClient();

// // const createOrderMutation = useMutation({
// //   mutationFn: createOrder,

// //   onSuccess: () => {
// //     queryClient.invalidateQueries({
// //       queryKey: ['cart'],
// //     });

// //     toast.success('Order placed successfully');
// //   },

// //   onError: (error) => {
// //     if (axios.isAxiosError(error)) {
// //       toast.error(
// //         error.response?.data?.message || 'Failed to place order',
// //       );

// //       return;
// //     }

// //     toast.error('Failed to place order');
// //   },
// // });

// // createOrderMutation.mutate({
// //   name,
// //   email,
// //   phone,
// //   address,
// //   paymentMethod: 'CASH_ON_DELIVERY',
// // });
//     return <p>Cart</p>
// }

'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import toast from 'react-hot-toast';

import { getCart, updateCartItem, deleteCartItem } from '@/app/lib/api/client/cartApi';

import {
  createOrder,
  CreateOrderPayload,
} from '@/app/lib/api/client/ordersApi';

type Product = {
  id: number;
  photo: string;
  name: string;
  price: string;
  discount: number;
  stock: number;
};

type CartItem = {
  id: string;
  productId: number;
  quantity: number;
  product: Product;
};

type Cart = {
  id: string;
  userId: number;
  items: CartItem[];
};

type OrderFormValues = {
  name: string;
  email: string;
  phone: string;
  address: string;
  paymentMethod: 'CASH_ON_DELIVERY';
};

export default function CartPage() {
  const queryClient = useQueryClient();

  // -------------------------
  // GET CART
  // -------------------------

  const {
    data: cart,
    isLoading,
    isError,
  } = useQuery<Cart>({
    queryKey: ['cart'],
    queryFn: getCart,
  });

  // -------------------------
  // UPDATE QUANTITY
  // -------------------------

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

  // -------------------------
  // DELETE PRODUCT
  // -------------------------

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

  // -------------------------
  // CHECKOUT FORM
  // -------------------------

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

  // -------------------------
  // CREATE ORDER
  // -------------------------

  const createOrderMutation = useMutation({
    mutationFn: (values: CreateOrderPayload) =>
      createOrder(values),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['cart'],
      });

      reset();

      toast.success('Order placed successfully');
    },

    onError: (error) => {
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.message ||
            'Could not place order',
        );

        return;
      }

      toast.error('Could not place order');
    },
  });

  // -------------------------
  // QUANTITY HANDLERS
  // -------------------------

  const handleIncrease = (item: CartItem) => {
    if (item.quantity >= item.product.stock) {
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

  // -------------------------
  // PLACE ORDER
  // -------------------------

  const onSubmit = (values: OrderFormValues) => {
    if (!cart?.items.length) {
      toast.error('Your cart is empty');
      return;
    }

    createOrderMutation.mutate(values);
  };

  // -------------------------
  // TOTAL
  // -------------------------

  const total =
    cart?.items.reduce((sum, item) => {
      const price = Number(item.product.price);

      const finalPrice =
        price -
        (price * item.product.discount) / 100;

      return sum + finalPrice * item.quantity;
    }, 0) ?? 0;

  // -------------------------
  // PAGE STATES
  // -------------------------

  if (isLoading) {
    return <p>Loading cart...</p>;
  }

  if (isError) {
    return <p>Could not load cart.</p>;
  }

  // -------------------------
  // JSX
  // -------------------------

  return (
    <main>
      <h1>Cart</h1>

      <section>
        <h2>Your products</h2>

        {!cart?.items.length ? (
          <p>Your cart is empty.</p>
        ) : (
          <ul>
            {cart.items.map((item) => {
              const price = Number(item.product.price);

              const finalPrice =
                price -
                (price * item.product.discount) / 100;

              return (
                <li key={item.id}>
                  <img
                    src={item.product.photo}
                    alt={item.product.name}
                    width={100}
                    height={100}
                  />

                  <h3>{item.product.name}</h3>

                  <p>
                    £{finalPrice.toFixed(2)}
                  </p>

                  <div>
                    <button
                      type="button"
                      onClick={() =>
                        handleDecrease(item)
                      }
                      disabled={
                        item.quantity <= 1 ||
                        updateCartMutation.isPending
                      }
                    >
                      −
                    </button>

                    <span>{item.quantity}</span>

                    <button
                      type="button"
                      onClick={() =>
                        handleIncrease(item)
                      }
                      disabled={
                        item.quantity >=
                          item.product.stock ||
                        updateCartMutation.isPending
                      }
                    >
                      +
                    </button>
                  </div>

                  <p>
                    Subtotal: £
                    {(
                      finalPrice * item.quantity
                    ).toFixed(2)}
                  </p>

                  <button
                    type="button"
                    onClick={() =>
                      deleteCartMutation.mutate(
                        item.productId,
                      )
                    }
                    disabled={
                      deleteCartMutation.isPending
                    }
                  >
                    Remove
                  </button>
                </li>
              );
            })}
          </ul>
        )}

        <h2>Total: £{total.toFixed(2)}</h2>
      </section>

      <section>
        <h2>Shipping information</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="name">Name</label>

            <input
              id="name"
              {...register('name', {
                required: 'Name is required',
              })}
            />

            {errors.name && (
              <p>{errors.name.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="email">Email</label>

            <input
              id="email"
              type="email"
              {...register('email', {
                required: 'Email is required',
              })}
            />

            {errors.email && (
              <p>{errors.email.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="phone">Phone</label>

            <input
              id="phone"
              type="tel"
              {...register('phone', {
                required: 'Phone is required',
              })}
            />

            {errors.phone && (
              <p>{errors.phone.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="address">
              Address
            </label>

            <input
              id="address"
              {...register('address', {
                required: 'Address is required',
              })}
            />

            {errors.address && (
              <p>{errors.address.message}</p>
            )}
          </div>

          <fieldset>
            <legend>Payment method</legend>

            <label>
              <input
                type="radio"
                value="CASH_ON_DELIVERY"
                {...register('paymentMethod')}
              />

              Cash on delivery
            </label>

            <label>
              <input
                type="radio"
                disabled
              />

              Bank payment
            </label>
          </fieldset>

          <button
            type="submit"
            disabled={
              !cart?.items.length ||
              createOrderMutation.isPending
            }
          >
            {createOrderMutation.isPending
              ? 'Placing order...'
              : 'Place order'}
          </button>
        </form>
      </section>
    </main>
  );
}