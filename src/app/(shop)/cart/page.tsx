'use client';

import { Title } from "@/components";
import Link from "next/link";
import { ProductsInCart } from "./ui/ProductsInCart";
import { OrderSummary } from "./ui/OrderSummary";
import { useEffect, useState } from "react";
import { useCartStore } from "@/store";
import { redirect, useRouter } from "next/navigation";

export default function CartPage() {
  const getTotalItems = useCartStore( state => state.getTotalItems());
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    try {
      setIsLoading(true);

      if (getTotalItems === 0) {
        router.push('/empty'); 
      } else {
        setIsLoading(false); 
      }
    } catch (error) {
      setIsLoading(false);
    }
  }, [getTotalItems, router]);

  if (isLoading) {
    return (
      <p className="text-6xl">Cargando...</p>
    );
  }

  return (
    <>
      <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
        <div className="flex flex-col w-[1000px]">
          <Title title="Carrito"/>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">

            <div className="flex flex-col mt-5">
              <span className="text-xl">Agregar más items</span>
              <Link href='/' className="underline mb-5">
                Continúa comprando
              </Link>

              <ProductsInCart />
            </div>

            <div className="bg-white rounded-xl shadow-xl p-7 h-fit">
              <h2 className="text-2xl mb-2">Resumen de orden</h2>

              <OrderSummary />

              <div className="mt-5 mb-2 w-full">
                <Link
                  className="flex btn-primary justify-center"
                  href='/checkout/address'
                >
                  Checkout
                </Link>
              </div>
            </div>  
          </div>
        </div>
      </div>
    </>
  );
}