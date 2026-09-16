import { cookies } from 'next/headers';
import { serverApi } from './serverApi';
import { Location } from '@/app/types/location';

export const getServerLocations = async () => {
      const cookieStore = await cookies();
  const { data } = await serverApi.get<Location[]>('/locations', {
    headers: {
        Cookie: cookieStore.toString(),
    }
  });
  return data;
};