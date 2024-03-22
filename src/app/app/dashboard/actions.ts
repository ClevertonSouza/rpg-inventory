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

