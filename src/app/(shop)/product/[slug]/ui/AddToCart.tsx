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

  return (
    <>
      <SizeSelector 
      onSizeChanged={ setSize }
      selectedSize={ size }
      availableSizes={ product.sizes }
      />

      <QuantitySelector 
        quantity={ quantity }
        onQuantityChanged={ setQuantity }
      />


      <button className="btn-primary my-5">
        Agregar al carrito
      </button>
    </>
  )
};
