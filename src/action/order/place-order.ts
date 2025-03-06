'use server';

import { auth } from "@/auth.config";
import type{ Address, Size } from "@/interfaces";

interface ProductToOrder {
  productId: string;
  quantity: number;
  size: Size;
}


export const placeOrder = async( productIds: ProductToOrder[], address: Address) => {

  const session = await auth();
  const userId = session?.user.id;

  if ( !userId ){
    return {
      ok: false,
      message: 'No hay sessión de usuario'
    }
  }

  console.log({ productIds, address, userId  });
  

};