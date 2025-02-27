import type { CartProduct } from "@/interfaces";
import { create } from "zustand";

interface State {
  cart: CartProduct[];
  addProductToCart: ( product: CartProduct ) => void;
}

export const useCartStore = create<State>()( 
  ( set, get ) => ({
    cart: [],
    addProductToCart: ( product: CartProduct ) => {
      const { cart } = get();

      //* Revisar si el producto ya existe en el carrito de compras
      const productInCart = cart.some(
        ( item ) => ( item.id === product.id && item.size === product.size  )
      )

      if( !productInCart ) {
        set( ( state ) => ({
          cart: [...state.cart, product ],
        }) );
        return;
      }

      const updateCartProducts = cart.map( (item) => {
        if( item.id === product.id && item.size === product.size ) {
          return {
            ...item,
            quantity: item.quantity + product.quantity,
          }
        }

        return item;
      });

      set({ cart: updateCartProducts })
    }
  })
)