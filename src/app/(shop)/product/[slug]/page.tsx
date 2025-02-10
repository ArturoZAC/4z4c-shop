import { initialData } from "@/seed/seed";
import { notFound } from "next/navigation";


interface Props {
  params: Promise<{slug: string}>
}

export default async function ProductPage({ params }: Props) {

  const { slug } = await params;  
  const product = initialData.products.find( product => product.slug === slug );

  if( !product ) {
    notFound();
  }

  return (
    <div>
      <h1>Product Page</h1>
    </div>
  );
}