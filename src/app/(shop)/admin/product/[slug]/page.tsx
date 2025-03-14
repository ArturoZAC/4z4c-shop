import { getCategory, getProductBySlug } from "@/action";
import { Title } from "@/components";
import { redirect } from "next/navigation";
import { ProductForm } from "./ui/ProductForm";

interface Props {
  params: Promise<{slug: string}>
}


export default async function ProductPage({ params }: Props) {

  const { slug } = await params;

  const product = await getProductBySlug( slug );
  const categories = await getCategory();

  if(!product ) {
    redirect('/admin/products');
  }

  const title = slug === 'new' ? 'Nuevo Producto' : 'Editar Producto';

  return (
    <>
      <Title title={ title }  />

      <ProductForm 
        product={ product } 
        categories={ categories }
      />
    </>
  );
}