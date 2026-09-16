import { nextServer } from '../api';
import { Location } from '@/app/types/location';

export const getLocations = async () => {
  const { data } = await nextServer.get<Location[]>('/locations');
  return data;
};
