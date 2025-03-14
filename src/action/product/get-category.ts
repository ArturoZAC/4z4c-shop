'use server';

import { prisma } from "@/lib/prisma";

export const getCategory = async() => {

  try {
  
    const categoryArray = await prisma.category.findMany({
      orderBy: {
        name: 'asc'
      }
    })

    return categoryArray;
    
  } catch (error) {
    throw new Error('Error getting category');
  }

};