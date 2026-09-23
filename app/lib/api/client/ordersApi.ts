import { nextServer } from '../api';

export type CreateOrderPayload = {
  name: string;
  email: string;
  phone: string;
  address: string;
  paymentMethod: 'CASH_ON_DELIVERY';
};

export const createOrder = async (
  payload: CreateOrderPayload,
) => {
  const { data } = await nextServer.post('/orders', payload);

  return data;
};