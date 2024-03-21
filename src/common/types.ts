export type Weapons = {
  id: string;
  name: string;
  price: number;
  damage: string;
  critical: number;
  range: string;
  damageType: string;
  spaces: number;
  proficiency: string;
  properties: string;
  grip: string;
  quantity: number;
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
  defenseBonus: string;
  armorPenality: string;
  spaces: number;
  proficiency: string;
  quantity: number;
};

export type InventoryItem = Weapons | GeneralItems | Armor;

export type PlayerToken = {
  id: string;
  token: string;
};

