'use client';

import { useAddressStore, useCartStore } from "@/store";
import { currencyFormat } from "@/utils";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { useShallow } from "zustand/shallow";

export const PlaceOrder = () => {

  const [isLoading, setIsLoading] = useState(true);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  const address = useAddressStore( state => state.address );
  const { itemsCart ,subTotal ,tax , total} = useCartStore( useShallow((state) => state.getSummaryInformation()));
  const cart = useCartStore( state => state.cart );

  useEffect(() => {
    setIsLoading(false);
  }, []);

  const onPlaceOrder = async() => {
    setIsPlacingOrder(true);

    const productsToOrder = cart.map( product => ({
      productId: product.id,
      quantity: product.quantity,
      size: product.size,
    }))

    setIsPlacingOrder(false);
  };
  

  if ( isLoading ) {
    return ( 
      <p>Cargando....</p>
    )
  }

  return (
    <>
      <div className="bg-white rounded-xl shadow-xl p-7">

        <h2 className="text-2xl mb-2">Dirección de entrega</h2>
        <div className="mb-10">
          <p className="text-xl">{address.firstName} {address.lastName}</p>
          <p>{address.address}</p>
          { address.address2 && (<p>{address.address2}</p>) }
          <p>{address.postalCode}</p>
          <p>{address.city} {address.country}</p>
          <p>{address.phone}</p>
        </div>

        <div className="w-full h-0.5 rounded bg-gray-200 mb-10" />

        <h2 className="text-2xl mb-2">Resumen de orden</h2>

        <div className="grid grid-cols-2">

          <span>No. Productos</span>
          <span className="text-right">{ itemsCart === 1 ? '1 artículo' : `${itemsCart} artículos`}</span>

          <span>Subtotal</span>
          <span className="text-right">{ currencyFormat(subTotal) }</span>

          <span>Impuestos (15%)</span>
          <span className="text-right">{ currencyFormat(tax) }</span>

          <span className="mt-5 text-2xl">Total:</span>
          <span className="mt-5 text-2xl text-right">{ currencyFormat(total) }</span>

        </div>

        <div className="mt-5 mb-2 w-full">

          <p className="mb-5 text-center font-normal">
            <span>
              Al Hacer click en "Colocar orden", aceptas nuestros <a href="#" className="underline">términos y condiciones</a> y <a href="#" className="underline">política de privacidad</a>
            </span>
          </p>


          {/* <p className="text-red-500">Error de creación</p> */}

          <button
            onClick={ onPlaceOrder }
            className={
              clsx({
                'btn-primary':!isPlacingOrder,
                'btn-disabled':isPlacingOrder,
              })
            }
          >
            Colocar Orden
          </button>
        </div>

      </div>
    </>
  )
};
