import { getPaginatedProductsWithImages } from "@/action";
import { ProductGrid, Title } from "@/components";
import { redirect } from "next/navigation";

interface Props {
  searchParams: Promise<{page: string}>
}

export default async function Home({ searchParams }: Props) {

  const { page: pageOff } = await searchParams;

  const page =  pageOff ?  +pageOff : 1;

  const { products } = await getPaginatedProductsWithImages({page});

  if( products.length === 0 ) redirect('/');

  return (
    <>
      <Title 
        title="Tienda"
        subtitle="Todos los productos"
        className="mb-2"

      />

      <ProductGrid
        products={ products }
      />
    </>
  );
}
