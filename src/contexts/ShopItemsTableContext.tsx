'use client'
import { createContext, useContext, useState, ReactNode } from 'react';
import { ShopItem } from "@/common/types";

interface ShopItemsTableContextType {
  selectedGeneralItems: ShopItem[];
  setSelectedGeneralItems: (items: ShopItem[]) => void;
  selectedWeaponItems: ShopItem[];
  setSelectedWeaponItems: (items: ShopItem[]) => void;
  selectedArmorItems: ShopItem[];
  setSelectedArmorItems: (items: ShopItem[]) => void;
}

const ShopItemsTableContext = createContext<ShopItemsTableContextType | undefined>(undefined);

export const ShopItemsTableProvider = ({ children }: { children: ReactNode }) => {
  const [selectedGeneralItems, setSelectedGeneralItems] = useState<ShopItem[]>([]);
  const [selectedWeaponItems, setSelectedWeaponItems] = useState<ShopItem[]>([]);
  const [selectedArmorItems, setSelectedArmorItems] = useState<ShopItem[]>([]);

  return (
    <ShopItemsTableContext.Provider value={{ selectedGeneralItems, setSelectedGeneralItems, selectedWeaponItems, setSelectedWeaponItems, selectedArmorItems, setSelectedArmorItems }}>
      {children}
    </ShopItemsTableContext.Provider>
  );
};

export const useShopItemsTable = () => {
  const context = useContext(ShopItemsTableContext);
  if (context === undefined) {
    throw new Error('useShopItemsTable must be used within a ShopItemsTableProvider');
  }
  return context;
};
