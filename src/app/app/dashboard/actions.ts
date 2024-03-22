'use server'

import { ItemCategory } from "@/common/types";
import prisma from "@/lib/database/database";

export async function getAllItems() {
  try {
    const response = await prisma.item.findMany();
    return {
      data: response,
    }
  } catch (error) {
    console.log(error);
  }
}

export async function getItemsByCategory(category: ItemCategory) {
  try {
    const response = await prisma.item.findMany({
      where: {
        category: category,
      },
    });
    return {
      data: response,
    }
  } catch (error) {
    console.log(error);
  }
  return {
    data: [],
  }
}

