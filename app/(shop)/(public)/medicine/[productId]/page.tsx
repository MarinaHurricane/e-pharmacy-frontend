import { getServerProductById } from "@/app/lib/api/server/serverProducts";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import ProductDetailsPage from "./ProductDetails.client";

interface ProductDetailsProps {
    params: Promise<{ productId: string} >;
}

export default async function ProductDetails({ params}: ProductDetailsProps) {
const { productId } = await params;

console.log(productId);

const queryClient = new QueryClient();

await queryClient.query({
    queryKey: ['product', productId],
    queryFn: ()=> getServerProductById(Number(productId)),
});

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProductDetailsPage productId={productId} />
    </HydrationBoundary>
  );
}