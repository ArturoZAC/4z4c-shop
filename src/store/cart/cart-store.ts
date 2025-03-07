import type { CartProduct } from "@/interfaces";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
  cart: CartProduct[];
  getTotalItems: () => number;
  getSummaryInformation: () => {
    subTotal: number;
    tax: number;
    total: number;
    itemsCart: number;
  };
  addProductToCart: ( product: CartProduct ) => void;
  updateProductQuantity: ( product: CartProduct, quantity: number ) => void;
  removeProduct: ( product: CartProduct ) => void;
  clearCart: () => void;
}

export const useCartStore = create<State>()( 

  persist(
    ( set, get ) => ({
      cart: [],
      getTotalItems: () => {
        const { cart } = get();
        return cart.reduce( ( total, item ) => total + item.quantity, 0 );
      },
      getSummaryInformation: () => {
        const { cart } = get();

        const subTotal = cart.reduce( ( subTotal, product ) => ( product.price * product.quantity ) + subTotal, 0 );
        const tax = subTotal * 0.15;
        const total = subTotal + tax;
        const itemsCart = cart.reduce( ( total, item ) => total + item.quantity, 0 );

        return {
          subTotal,
          tax,
          total,
          itemsCart,
        }

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
      },
      clearCart: () => {
        set({ cart: [] });
      }
    })
    ,
    {
      name: 'shopping-cart'
    }
  )

)