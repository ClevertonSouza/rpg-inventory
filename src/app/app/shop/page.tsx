"use client";

import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { buyShopItem, getShopGeneralItems } from "./actions";
import { ShopItem } from "@/common/types";
import { usePlayerToken } from "@/contexts/UserTokensContext";
import { toast } from "@/components/ui/use-toast";
import { DataTableShopItems } from "./_components/DataTableShopItems";

export default function ShopPage() {
  const [shopItems, setShopItems] = useState<ShopItem[]>([]);
  const { playerToken, tibars, setTibars } = usePlayerToken();

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
              <DataTableShopItems data={shopItems} onBuyShopItem={buyItem} />
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}
