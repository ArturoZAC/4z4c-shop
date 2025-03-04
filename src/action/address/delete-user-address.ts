'use server';

import { prisma } from "@/lib/prisma";

export const deleteUserAddress = async( userId: string ) => {

  try {
    
    const userDeleted = await prisma.userAddress.delete(
      {
        where: { userId: userId },
      }
    )

    console.log(userDeleted);
    

    return { ok: true };    

  } catch (error) {
    console.log(error);
    
    return {
      ok: false,
      message: 'No se pudo eliminar la dirección'
    }
  }

};