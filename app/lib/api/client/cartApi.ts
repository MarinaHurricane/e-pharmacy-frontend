import { nextServer } from '../api';

export const getCart = async () => {
  const { data } = await nextServer.get('/cart');
  console.log(data);
  return data;
};

export const addCartItem = async (productId: number, quantity: number,
) => {
  const { data } = await nextServer.post('/cart/items', {
    productId,
    quantity
  });

  return data;
};

export const updateCartItem = async (
  productId: number,
  quantity: number
) => {
  const { data } = await nextServer.patch(`/cart/items/${productId}`, {
    quantity,
  });

  return data;
};

export const deleteCartItem = async (productId: number) => {
  const { data } = await nextServer.delete(`/cart/items/${productId}`);
  return data;
};