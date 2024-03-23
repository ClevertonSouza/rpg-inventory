"use client";

import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { buyShopItem, getShopGeneralItems } from "./actions";
import { ShopItem } from "@/common/types";
import ConfirmBuyDialog from "./_components/ConfirmBuyDialog";
import { usePlayerToken } from "@/contexts/UserTokensContext";
import { toast } from "@/components/ui/use-toast";

export default function ShopPage() {
  const [shopItems, setShopItems] = useState<ShopItem[]>([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const { data } = await getShopGeneralItems();
        setShopItems(data);
      } catch (error) {
        console.error("Erro ao buscar itens:", error);
      }
    };

    fetchItems();
  }, []);

  const buyItem = async (item: ShopItem) => {
    const { playerToken, tibars } = usePlayerToken();

    const response = await buyShopItem(item, { id: playerToken, tibars: tibars });
    toast({
      description: response?.success ?? response?.error,
      variant: response?.success ? "default" : "destructive",
    });
  }

  return (
    <div className="flex min-h-screen w-full">
      <div className="flex flex-col w-full">
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
          <Card className="flex flex-col">
            <CardHeader className="pb-4">
              <CardTitle>Shop Items</CardTitle>
              <CardDescription>Items available for purchase</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>#</TableHead>
                    <TableHead>Item</TableHead>
                    <TableHead>Value</TableHead>
                    <TableHead>Weight</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {shopItems.map((item, index) => (
                    <TableRow key={item.id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.price}</TableCell>
                      <TableCell>{item.spaces}</TableCell>
                      <TableCell>
                        <ConfirmBuyDialog onConfirm={() => buyItem(item)} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}
