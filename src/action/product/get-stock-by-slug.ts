'use server';

import { prisma } from "@/lib/prisma";

export const getStockBySlug = async( slug: string): Promise<number> => {

  try {

    // await sleep(2);

    const stock = await prisma.product.findFirst({
      where: { slug },
      select: { inStock: true },
    })

    return stock?.inStock ?? 0;

  } catch {
    return 0;
  }
};