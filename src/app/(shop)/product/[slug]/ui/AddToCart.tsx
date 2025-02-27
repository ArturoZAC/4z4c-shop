'use client';

import { useState } from "react";
import { QuantitySelector, SizeSelector } from "@/components";
import { Product, Size } from "@/interfaces";

interface Props {
  product: Product;
}

export const AddToCart = ( { product }: Props) => {

  const [size, setSize] = useState< Size | undefined >();
  const [quantity, setQuantity] = useState(1); 
  const [posted, setPosted] = useState(false);
  

  const addToCart = () => {

    setPosted(true);

    if( !size ) return;

    console.log({ size, quantity });
  };

  return (
    <>
      {
        posted && !size && (
        <span className="mt-2 text-red-500 fade-in">
          Debe seleccionar una talla
        </span>
        )
      }

      <SizeSelector 
      onSizeChanged={ setSize }
      selectedSize={ size }
      availableSizes={ product.sizes }
      />

      <QuantitySelector 
        quantity={ quantity }
        onQuantityChanged={ setQuantity }
      />


      <button 
        onClick={ addToCart }
        className="btn-primary my-5">
        Agregar al carrito
      </button>
    </>
  )
};
