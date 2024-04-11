'use server'

import { ItemCategory } from "@/common/types";
import prisma from "@/lib/database/database";
import { Item } from "@prisma/client";

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

export async function getItemsByCategoryAndToken(category: ItemCategory, playerToken: string) {
  try {
    const response = await prisma.item.findMany({
      where: {
        category: category,
        playerTokenId: playerToken,
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

export async function createItem(item: Item) {
  try {
    await prisma.item.create({
      data: item,
    });
    return {
      success: "Item created successfully",
    }
  } catch (error) {
    console.log(error);
  }
}

export async function deleteItem(id: string) {
  try {
    await prisma.item.delete({
      where: { id },
    });
    return {
      success: "Item removed successfully",
    }
  } catch (error) {
    console.log(error);
  }
}

export async function updateItemQuantity(id: string, quantity: string) {
  try {
    await prisma.item.update({
      where: { id },
      data: { quantity },
    });
  } catch (error) {
    console.log(error);
  }
}
