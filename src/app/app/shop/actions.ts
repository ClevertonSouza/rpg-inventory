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

export async function buyShopItem(selectedItems: ShopItem[], token: TokenProps): Promise<{ success?: string, error?: string, tibars?: number }> {
  const totalPrice = selectedItems.reduce((total, item) => {
    const price = Number(item.price) * (Number(item.quantity) ?? 1);
    const spaces = Number(String(item.spaces).replace(',', '.')) * (Number(item.quantity) ?? 1);
    return total + price + spaces;
  }, 0);

  if (token.tibars < totalPrice) {
    return {
      error: "Você não possui tibares suficientes",
    }
  }

  try {
    await Promise.all(selectedItems.map(async (item) => {
      item.price = Number(item.price) * (Number(item.quantity) ?? 1);
      item.spaces = Number(String(item.spaces).replace(',', '.')) * (Number(item.quantity) ?? 1);

      await prisma.playerToken.update({
        where: { id: token.id },
        data: { tibars: token.tibars - item.price },
      });
      await insertOrUpdateItem(item, token);
    }));
    return {
      success: "Itens comprados com sucesso!",
      tibars: token.tibars - totalPrice,
    }
  } catch (error) {
    return {
      error: "Erro ao comprar itens",
    }
  }
}

async function insertOrUpdateItem(item: Omit<ShopItem, 'tags'>, token: TokenProps) {
  const itemPrice = 'totalPrice' in item ? Number(item.totalPrice) : 'price' in item ? Number(item.price) : 0;
  const tags = 'upgrades' in item ? String(item.upgrades) : '';
  let itemData = {
    name: item.name,
    price: itemPrice?.toString(),
    spaces: item.spaces?.toString(),
    quantity: item.quantity?.toString(),
    category: 'general',
    tags: tags,
    playerTokenId: token.id,
  }

  const itemExists = await prisma.item.findFirst({
    where: {
      name: item.name,
      playerTokenId: token.id,
    }
  });

  if (itemExists && !('totalPrice' in item)) {
    itemData.quantity = String(Number(itemExists.quantity) + Number(item.quantity));
    itemData.price = String(Number(itemExists.price) + itemPrice);
    itemData.spaces = String(Number(itemExists.spaces) + Number(item.spaces));
    await prisma.item.update({
      where: { id: itemExists.id },
      data: itemData,
    });
  } else if ('damage' in item) {
    itemData.category = 'weapons';
    await prisma.item.create({
      data: itemData,
    });
  } else if ('defenseBonus' in item) {
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

