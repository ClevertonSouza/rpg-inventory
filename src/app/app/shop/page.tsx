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
import { Armor, GeneralItems, ShopItem, Weapons } from "@/common/types";
import { usePlayerToken } from "@/contexts/UserTokensContext";
import { toast } from "@/components/ui/use-toast";
import { DataTableShopItems } from "./_components/DataTableShopItems";
import { useShopItemsTable } from "@/contexts/ShopItemsTableContext";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";

import generalItemsColumns from "./_components/shopTableColumns/GeneralItemsColumns"
import equipmentItemsColumns from "./_components/shopTableColumns/EquipmentsColumns"
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

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

  const buyItems = async () => {
    const response = await buyShopItem([...selectedGeneralItems, ...selectedWeaponItems, ...selectedArmorItems], { id: playerToken, tibars: tibars });
    toast({
      description: response?.success ?? response?.error,
      variant: response?.success ? "default" : "destructive",
    });

    if (response?.tibars) {
      setTibars(response.tibars);
    }
  }

  const calculateItemTotalPrice = (item: Armor | Weapons) => {
    let totalPrice = 0;
    if (item.totalPrice > 0) {
      totalPrice = item.totalPrice * item.quantity;
    } else {
      totalPrice = item.price * item.quantity;
    }
    return "T$ " + totalPrice.toFixed(2).replace('.', ',');
  }

  const calculateTotalPrice = () => {
    const generalItemsPrice = selectedGeneralItems.reduce((total, item) => total + item.price, 0);
    const weaponsItemsPrice = selectedWeaponItems.reduce((total, item) => {
      item = item as Weapons;
      return (item.totalPrice > 0) ? total + (item.totalPrice * item.quantity) : total + (item.price * item.quantity);
    }, 0);
    const armorItemsPrice = selectedArmorItems.reduce((total, item) => {
      item = item as Armor;
      return (item.totalPrice > 0) ? total + (item.totalPrice * item.quantity) : total + (item.price * item.quantity);
    }, 0);
    const totalPrice = generalItemsPrice + weaponsItemsPrice + armorItemsPrice;
    return totalPrice;
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
              <DataTableShopItems id="general" data={generalShopItems} setData={setGeneralShopItems} columns={generalItemsColumns} />
            </CardContent>
          </Card>
          <Card className="flex flex-col">
            <CardHeader className="pb-4">
              <CardTitle>Equipments</CardTitle>
              <CardDescription>Equipments available for purchase</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4 md:grid-cols-1 lg:grid-cols-2">
              <div className="w-full">
                <CardTitle>Weapons</CardTitle>
                <DataTableShopItems id="weapons" data={weaponsShopItems} setData={setWeaponsShopItems} columns={equipmentItemsColumns} />
              </div>
              <div className="w-full">
                <CardTitle>Armor</CardTitle>
                <DataTableShopItems id="armor" data={armorShopItems} setData={setArmorShopItems} columns={equipmentItemsColumns} />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Carrinho de itens</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Itens</TableHead>
                    <TableHead>Preço</TableHead>
                    <TableHead>Quantidade</TableHead>
                    <TableHead>Melhorias</TableHead>
                    <TableHead className="text-right">Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {selectedGeneralItems && selectedGeneralItems.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.name}</TableCell>
                      <TableCell>{item.price}</TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell>—</TableCell>
                      <TableCell className="text-right">{item.price * item.quantity}</TableCell>
                    </TableRow>
                  ))}
                  {selectedWeaponItems && selectedWeaponItems.map((item) => {
                    item = item as Weapons;
                    return (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">{item.name}</TableCell>
                        {item.totalPrice > 0 ? (
                          <TableCell>{"T$ " + item.totalPrice.toFixed(2).replace('.', ',')}</TableCell>
                        ) : (
                          <TableCell>{"T$ " + item.price.toFixed(2).replace('.', ',')}</TableCell>
                        )}
                        <TableCell>{item.quantity}</TableCell>
                        <TableCell>{item.upgrades?.map((upgrade) => upgrade).join(', ')}</TableCell>
                        <TableCell className="text-right">{calculateItemTotalPrice(item)}</TableCell>
                      </TableRow>
                    )
                  })}
                  {selectedArmorItems && selectedArmorItems.map((item) => {
                    item = item as Armor;
                    return (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">{item.name}</TableCell>
                        {item.totalPrice > 0 ? (
                          <TableCell>{"T$ " + item.totalPrice.toFixed(2).replace('.', ',')}</TableCell>
                        ) : (
                          <TableCell>{"T$ " + item.price.toFixed(2).replace('.', ',')}</TableCell>
                        )}
                        <TableCell>{item.quantity}</TableCell>
                        <TableCell>{item.upgrades?.map((upgrade) => upgrade).join(', ')}</TableCell>
                        <TableCell className="text-right">{calculateItemTotalPrice(item)}</TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TableCell colSpan={4}>Total</TableCell>
                    <TableCell className={cn("text-right",
                      tibars < calculateTotalPrice() ? "text-red-500" : "text-green-500"
                    )}>{"T$ " + calculateTotalPrice().toFixed(2).replace('.', ',')}</TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
              <div className="fixed bottom-6 right-6">
                <Button disabled={tibars < calculateTotalPrice()} className={cn("",
                  tibars >= calculateTotalPrice() ? "bg-green-500" : "bg-red-500"
                )} onClick={buyItems}>Comprar</Button>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}
