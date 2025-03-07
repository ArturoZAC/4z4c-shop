'use client';

import { placeOrder } from "@/action";
import { useAddressStore, useCartStore } from "@/store";
import { currencyFormat } from "@/utils";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useShallow } from "zustand/shallow";

export const PlaceOrder = () => {

  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  const address = useAddressStore( state => state.address );
  const { itemsCart ,subTotal ,tax , total} = useCartStore( useShallow((state) => state.getSummaryInformation()));
  const cart = useCartStore( state => state.cart );
  const clearCart = useCartStore( state => state.clearCart );

  useEffect(() => {
    setIsLoading(false);
  }, []);

  // const onPlaceOrder = async() => {
  //   setIsPlacingOrder(true);

  //   const productsToOrder = cart.map( product => ({
  //     productId: product.id,
  //     quantity: product.quantity,
  //     size: product.size,
  //   }))

  //   const resp = await placeOrder( productsToOrder, address );

  //   if( !resp.ok ){
  //     setIsPlacingOrder(false);
  //     setErrorMessage(resp.message);
  //     return;
  //   }

  //   router.replace('/orders/' + resp.order?.id!);

  //   clearCart();
  // };

  const onPlaceOrder = async () => {
    setIsPlacingOrder(true);
    setErrorMessage(''); // Limpiar mensajes de error anteriores
  
    try {
      // Preparar los productos para la orden
      const productsToOrder = cart.map((product) => ({
        productId: product.id,
        quantity: product.quantity,
        size: product.size,
      }));
  
      // Intentar crear la orden
      const resp = await placeOrder(productsToOrder, address);
  
      // Si la orden no se creó correctamente
      if (!resp.ok) {
        setIsPlacingOrder(false);
        setErrorMessage(resp.message);
        return;
      }
  
      // Redirigir a la página de confirmación de la orden
      router.replace('/orders/' + resp.order?.id);
  
      // Borrar el carrito después de la redirección
      clearCart();
    } catch (error) {
      // Manejar cualquier error inesperado
      setIsPlacingOrder(false);
      setErrorMessage('Ocurrió un error al procesar la orden. Por favor, inténtalo de nuevo.');
      console.error(error);
    }
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

          {
            errorMessage && (
              <p className="text-red-500">{ errorMessage }</p>
            )
          }
          
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
