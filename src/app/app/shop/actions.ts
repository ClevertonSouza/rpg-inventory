'use server'

import { ShopItem } from "@/common/types";
import axios from "@/lib/api/axios-vercel";
import prisma from "@/lib/database/database";

type TokenProps = {
  id: string;
  tibars: number;
}

export async function getShopItems(category: 'itensGerais' | 'armas' | 'armor') {
  try {
    const response = await axios.get(`/${category}`);

    const itemsWithFormattedPrice = response.data.map((item: any) => {
      const price = item.price.replace(',', '.').replace('T$', '');
      item.price = parseFloat(price);
      return item;
    });

    const sortedItems = itemsWithFormattedPrice.sort((a: any, b: any) => a.name.localeCompare(b.name));

    return {
      data: sortedItems,
    }
  } catch (error) {
    console.log(error);
  }

  return {
    data: [],
  }
}

export async function buyShopItem(item: ShopItem, token: TokenProps) {
  try {
    item.price = Number(item.price) * (Number(item.quantity) ?? 1);
    item.spaces = Number(String(item.spaces).replace(',', '.')) * (Number(item.quantity) ?? 1);
    if (token.tibars < item.price) {
      return {
        error: "Not enough tibars",
      }
    }

    try {
      await prisma.playerToken.update({
        where: { id: token.id },
        data: { tibars: token.tibars - item.price },
      });
      await insertOrUpdateItem(item, token);
      return {
        success: "Item bought successfully",
        tibars: token.tibars - item.price,
      }
    } catch (error) {
      return {
        error: "Error buying item",
      }
    }

  } catch (error) {
    return {
      error: "Error buying item",
    }
  }
}

async function insertOrUpdateItem(item: Omit<ShopItem, 'tags'>, token: TokenProps) {
  let itemData = {
    name: item.name,
    price: item.price?.toString(),
    spaces: item.spaces?.toString(),
    quantity: item.quantity?.toString(),
    category: 'general',
    tags: '',
    playerTokenId: token.id,
  }

  const itemExists = await prisma.item.findFirst({
    where: {
      name: item.name,
      playerTokenId: token.id,
    }
  });

  if (itemExists) {
    itemData.quantity = String(Number(itemExists.quantity) + Number(item.quantity));
    itemData.price = String(Number(itemExists.price) + Number(item.price));
    itemData.spaces = String(Number(itemExists.spaces) + Number(item.spaces));
    await prisma.item.update({
      where: { id: itemExists.id },
      data: itemData,
    });
  } else if ('damage' in item && 'critical' in item && 'range' in item) {
    itemData.category = 'weapon';
    await prisma.item.create({
      data: itemData,
    });
  } else if ('defenseBonus' in item && 'armorPenality' in item && 'proficiency' in item) {
    itemData.category = 'armor';
    await prisma.item.create({
      data: itemData,
    });
  } else {
    await prisma.item.create({
      data: itemData,
    });
  }
}

