import type { CartProduct } from "@/interfaces";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
  cart: CartProduct[];
  getTotalItems: () => number;
  addProductToCart: ( product: CartProduct ) => void;
  updateProductQuantity: ( product: CartProduct, quantity: number ) => void;
  removeProduct: ( product: CartProduct ) => void;
}

export const useCartStore = create<State>()( 

  persist(
    ( set, get ) => ({
      cart: [],
      getTotalItems: () => {
        const { cart } = get();
        return cart.reduce( ( total, item ) => total + item.quantity, 0 );
      },
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
      },
      updateProductQuantity: ( product: CartProduct, quantity: number ) => {
        const { cart } = get();

        const updateCartProducts = cart.map( item => {
          if( item.id === product.id && item.size === product.size ) {
            return {
              ...item,
              quantity: quantity,
            }
          }

          return item;
        })

        set({cart: updateCartProducts })

      },
      removeProduct: ( product: CartProduct ) => {
        const { cart } = get();

        const deleteProductFromCart = cart.filter( 
          item => ( item.id !== product.id || item.size !== product.size ) 
        )

        set({ cart: deleteProductFromCart });
      }
    })
    ,
    {
      name: 'shopping-cart'
    }
  )

)