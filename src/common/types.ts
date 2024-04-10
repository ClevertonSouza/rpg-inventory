export type Weapons = {
  id: string;
  name: string;
  price: number;
  totalPrice: number;
  damage: string;
  critical: number;
  range: string;
  damageType: string;
  spaces: number;
  proficiency: string;
  properties: string;
  grip: string;
  quantity: number;
  type: ArmorTypes;
  upgrades?: string[];
};

export type GeneralItems = {
  id: string;
  name: string;
  price: number;
  spaces: number;
  category: string;
  quantity: number;
};

export type Armor = {
  id: string;
  name: string;
  price: number;
  totalPrice: number;
  defenseBonus: string;
  armorPenality: string;
  spaces: number;
  proficiency: string;
  quantity: number;
  type: 'light' | 'heavy' | 'shield';
  upgrades?: string[];
};

type ArmorTypes = 'weapon' | 'esoteric';

export type ShopItem = Weapons | GeneralItems | Armor;

export type PlayerToken = {
  id: string;
  token: string;
  tibars: number;
  userId: string;
};
 
export type ItemCategory = "weapons" | "general" | "armor";

export type Improvement = {
  name: string;
  effect: string;
}