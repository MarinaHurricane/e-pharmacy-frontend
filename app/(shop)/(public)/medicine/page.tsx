import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from '@tanstack/react-query';
import MedicinePage from './MedicinePage.client.tsx';
import {
  getServerCategories,
  getServerProducts,
} from '@/app/lib/api/server/serverProducts.ts';

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{
    page?: string;
    perPage?: string;
    search?: string;
    category?: string;
  }>;
}) {
  const queryClient = new QueryClient();

  const params = await searchParams;

  const page = Number(params.page) || 1;
  const search = params.search || '';
  const category = params.category || '';

  await Promise.all([
    queryClient.query({
      queryKey: ['products', search, page, category],
      queryFn: () => getServerProducts({ search, page, category }),
    }),
    queryClient.query({
      queryKey: ['categories'],
      queryFn: getServerCategories,
    }),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <MedicinePage />
    </HydrationBoundary>
  );
}
