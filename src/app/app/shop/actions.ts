'use server'

import { ShopItem } from "@/common/types";
import axios from "@/lib/api/axios-vercel";
import prisma from "@/lib/database/database";

export async function getShopGeneralItems() {
  try {
    const response = await axios.get('/itensGerais');

    response.data.map((item: any) => {
      const price = item.price.replace(',', '.').replace('T$', '');
      return item.price = parseFloat(price);
    });
    return {
      data: response.data,
    }
  } catch (error) {
    console.log(error);
  }

  return {
    data: [],
  }
}

type TokenProps = {
  id: string;
  tibars: number;
}

export async function buyShopItem(item: ShopItem, token: TokenProps) {
  try {
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

      if ('damage' in item && 'critical' in item && 'range' in item) {
        await prisma.item.create({
          data: {
            name: item.name,
            price: item.price.toString(),
            spaces: item.spaces.toString(),
            quantity: item.quantity.toString(),
            category: 'weapon',
            tags: '',
            playerTokenId: token.id,
          },
        });
      } else if ('defenseBonus' in item && 'armorPenality' in item && 'proficiency' in item) {
        await prisma.item.create({
          data: {
            name: item.name,
            price: item.price.toString(),
            spaces: item.spaces.toString(),
            quantity: item.quantity.toString(),
            category: 'armor',
            tags: '',
            playerTokenId: token.id,
          },
        });
      } else {
        await prisma.item.create({
          data: {
            name: item.name,
            price: item.price.toString(),
            spaces: item.spaces.toString(),
            quantity: item.quantity?.toString() ?? '0',
            category: 'general',
            tags: '',
            playerTokenId: token.id,
          },
        });
      }
        
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

