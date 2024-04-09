'use server'

import { Improvement, ShopItem } from '@/common/types';
import axios from '@/lib/api/axios-vercel';


export async function getImprovements(item: ShopItem): Promise<Improvement[]> {
  try {
    const improvements = await axios.get('/improvements');

    if ('damage' in item) {
      return [...improvements.data.weapons, ...improvements.data.any];
    } else if ('armor' in item) { 
      return [...improvements.data.armor, ...improvements.data.any];
    } else {
      return [...improvements.data.esoteric, ...improvements.data.tools, ...improvements.data.any];
    }
  } catch (error) {
    return [];
  }
}

