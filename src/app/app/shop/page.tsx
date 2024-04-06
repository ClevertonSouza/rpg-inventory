"use client";

import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { buyShopItem, getShopItems } from "./actions";
import { ShopItem } from "@/common/types";
import { usePlayerToken } from "@/contexts/UserTokensContext";
import { toast } from "@/components/ui/use-toast";
import { DataTableShopItems } from "./_components/DataTableShopItems";
import { useShopItemsTable } from "@/contexts/ShopItemsTableContext";
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function ShopPage() {
  const [generalShopItems, setGeneralShopItems] = useState<ShopItem[]>([]);
  const [weaponsShopItems, setWeaponsShopItems] = useState<ShopItem[]>([]);
  const [armorShopItems, setArmorShopItems] = useState<ShopItem[]>([]);
  const { playerToken, tibars, setTibars } = usePlayerToken();
  const { selectedGeneralItems, selectedWeaponItems, selectedArmorItems } = useShopItemsTable();

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const [generalItems, weaponsItems, armorItems] = await Promise.all([
          getShopItems('itensGerais'),
          getShopItems('armas'),
          getShopItems('armor'),
        ]);
        setGeneralShopItems(generalItems.data);
        setWeaponsShopItems(weaponsItems.data);
        setArmorShopItems(armorItems.data);
      } catch (error) {
        console.error("Erro ao buscar itens:", error);
      }
    };

    fetchItems();
  }, []);

  const buyItem = async (item: ShopItem) => {
    const response = await buyShopItem(item, { id: playerToken, tibars: tibars });
    toast({
      description: response?.success ?? response?.error,
      variant: response?.success ? "default" : "destructive",
    });

    if (response?.success) {
      setTibars(response.tibars);
    }
  }

  return (
    <div className="flex min-h-screen w-full">
      <div className="flex flex-col w-full">
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
          <Card className="flex flex-col">
            <CardHeader className="pb-4">
              <CardTitle>General Items</CardTitle>
              <CardDescription>Items available for purchase</CardDescription>
            </CardHeader>
            <CardContent>
              <DataTableShopItems id="general" data={generalShopItems} setData={setGeneralShopItems} onBuyShopItem={buyItem} />
            </CardContent>
          </Card>
          <Card className="flex flex-col">
            <CardHeader className="pb-4">
              <CardTitle>Weapons</CardTitle>
              <CardDescription>Weapons available for purchase</CardDescription>
            </CardHeader>
            <CardContent>
              <DataTableShopItems id="weapons" data={weaponsShopItems} setData={setWeaponsShopItems} onBuyShopItem={buyItem} />
            </CardContent>
          </Card>
          <Card className="flex flex-col">
            <CardHeader className="pb-4">
              <CardTitle>Armor</CardTitle>
              <CardDescription>Armor available for purchase</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <DataTableShopItems id="armor" data={armorShopItems} setData={setArmorShopItems} onBuyShopItem={buyItem} />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Selected Items</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Items</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead className="text-right">Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {selectedGeneralItems && selectedGeneralItems.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.name}</TableCell>
                      <TableCell>{item.price}</TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell className="text-right">{item.price * item.quantity}</TableCell>
                    </TableRow>
                  ))}
                  {selectedWeaponItems && selectedWeaponItems.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.name}</TableCell>
                      <TableCell>{item.price}</TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell className="text-right">{item.price * item.quantity}</TableCell>
                    </TableRow>
                  ))}
                  {selectedArmorItems && selectedArmorItems.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.name}</TableCell>
                      <TableCell>{item.price}</TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell className="text-right">{item.price * item.quantity}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TableCell colSpan={3}>Total</TableCell>
                    <TableCell className="text-right">$2,500.00</TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}
