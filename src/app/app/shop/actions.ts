'use server'

import { ShopItem } from "@/common/types";
import axios from "@/lib/api/axios-vercel";
import prisma from "@/lib/database/database";
import { PlayerToken } from "@prisma/client";

export async function getShopGeneralItems() {
  try {
    const response = await axios.get('/itensGerais');

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

      
  
      return {
        success: "Item bought successfully",
      }
    } catch (error) {
      console.log(error);
    }

  } catch (error) {
    console.log(error);
  }
}

