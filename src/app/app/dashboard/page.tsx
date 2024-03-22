"use client";

import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from "@/components/ui/card";
import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "@/components/ui/table";
import { useEffect, useState } from "react";

import { useForm } from "react-hook-form";
import ItemDialog from "./_components/ItemDialog";
import { Armor, GeneralItems, Weapons } from "@/common/types";
import NewItemForm from "@/app/app/dashboard/_components/newItemForm";
import { getItemsByCategory } from "./actions";
import { Item } from "@prisma/client";

export default function Dashboard() {
  const [weaponsList, setWeaponsList] = useState<Item[]>([] as Item[]);
  const [armorList, setArmorList] = useState<Item[]>([] as Item[]);
  const [generalItemsList, setGeneralItemsList] = useState<Item[]>(
    [] as Item[],
  );
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [totalItems, setTotalItems] = useState(0);
  const [totalValue, setTotalValue] = useState(0);
  const [totalSpaces, setTotalSpaces] = useState(0);

  const [update, setUpdate] = useState(false);

  useEffect(() => {
    const fetchItems = async () => {
      const weapons = await getItemsByCategory("weapons");
      const armor = await getItemsByCategory("armor");
      const general = await getItemsByCategory("general");

      setWeaponsList(weapons?.data);
      setArmorList(armor?.data);
      setGeneralItemsList(general?.data);
    }

    fetchItems();
  }, [update]);

  useEffect(() => {
    const weaponValue = weaponsList.reduce((acc, item) => Number(acc) + Number(item.price), 0);
    const armorValue = armorList.reduce((acc, item) => Number(acc) + Number(item.price), 0);
    const generalItemsValue = generalItemsList.reduce(
      (acc, item) => Number(acc) + Number(item.price),
      0,
    );
    setTotalValue(weaponValue + armorValue + generalItemsValue);

    const weaponSpaces = weaponsList.reduce(
      (acc, item) => Number(acc) + Number(item.spaces),
      0,
    );
    const armorSpaces = armorList.reduce((acc, item) => Number(acc) + Number(item.spaces), 0);
    const generalItemsSpaces = generalItemsList.reduce(
      (acc, item) => Number(acc) + Number(item.spaces),
      0,
    );
    setTotalSpaces(weaponSpaces + armorSpaces + generalItemsSpaces);

    const weaponQuantity = weaponsList.reduce(
      (acc, item) => Number(acc) + Number(item.quantity),
      0,
    );
    const armorQuantity = armorList.reduce(
      (acc, item) => Number(acc) + Number(item.quantity),
      0,
    );
    const generalItemsQuantity = generalItemsList.reduce(
      (acc, item) => Number(acc) + Number(item.quantity),
      0,
    );
    setTotalItems(weaponQuantity + armorQuantity + generalItemsQuantity);
  }, [weaponsList, armorList, generalItemsList]);

  const onSubmit = async (data: any) => {
    // submite
  };

  return (
    <div className="flex min-h-screen w-full">
      <div className="flex flex-col w-full">
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
          <div className="flex-wrap grid gap-4 sm:grid-cols-1 md:grid-cols-3">
            <Card className="flex items-center justify-center p-6">
              <div className="space-y-2 text-center">
                <CardTitle className="text-2xl font-bold">
                  {totalItems > 0 ? totalItems : 0}
                </CardTitle>
                <CardDescription className="text-sm font-medium shrink-0/100">
                  Total Items
                </CardDescription>
              </div>
            </Card>
            <Card className="flex items-center justify-center p-6">
              <div className="space-y-2 text-center">
                <CardTitle className="text-2xl font-bold">
                  {"T$ " +
                    (totalValue > 0
                      ? totalValue.toFixed(2).replace(".", ",")
                      : "0,00")}
                </CardTitle>
                <CardDescription className="text-sm font-medium shrink-0/100">
                  Items Value
                </CardDescription>
              </div>
            </Card>
            <Card className="flex items-center justify-center p-6">
              <div className="space-y-2 text-center">
                <CardTitle className="text-2xl font-bold">
                  {totalSpaces > 0 ? totalSpaces : 0}
                </CardTitle>
                <CardDescription className="text-sm font-medium shrink-0/100">
                  Spaces
                </CardDescription>
              </div>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="grid col-span-2 gap-4">
              <Card className="flex flex-col">
                <CardHeader className="pb-4">
                  <CardTitle>General Items</CardTitle>
                  <CardDescription>Items from inventory player</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>#</TableHead>
                        <TableHead>Item</TableHead>
                        <TableHead>Value</TableHead>
                        <TableHead>Weight</TableHead>
                        <TableHead>Quantity</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {generalItemsList.length > 0 &&
                        generalItemsList?.map((item, index) => (
                          <TableRow key={index}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>{item.name}</TableCell>
                            <TableCell>
                              {"T$ " +
                                (item.price != null
                                  ? Number(item.price).toFixed(2).replace(".", ",")
                                  : "0,00")}
                            </TableCell>
                            <TableCell>{item.spaces}</TableCell>
                            <TableCell>{item.quantity}</TableCell>
                            <TableCell className="flex justify-center items-center">
                              <ItemDialog item={item} />
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
              <Card className="flex flex-col">
                <CardHeader className="pb-4">
                  <CardTitle>Weapons</CardTitle>
                  <CardDescription>Items from inventory player</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>#</TableHead>
                        <TableHead>Item</TableHead>
                        <TableHead>Value</TableHead>
                        <TableHead>Weight</TableHead>
                        <TableHead>Quantity</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {weaponsList.length > 0 &&
                        weaponsList?.map((item, index) => (
                          <TableRow key={index}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>{item.name}</TableCell>
                            <TableCell>
                              {"T$ " +
                                (item.price != null
                                  ? Number(item.price).toFixed(2).replace(".", ",")
                                  : "0,00")}
                            </TableCell>
                            <TableCell>{item.spaces}</TableCell>
                            <TableCell>{item.quantity}</TableCell>
                            <TableCell className="flex justify-center items-center">
                              <ItemDialog item={item} />
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
              <Card className="flex flex-col">
                <CardHeader className="pb-4">
                  <CardTitle>Armor</CardTitle>
                  <CardDescription>Items from inventory player</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>#</TableHead>
                        <TableHead>Item</TableHead>
                        <TableHead>Value</TableHead>
                        <TableHead>Weight</TableHead>
                        <TableHead>Quantity</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {armorList.length > 0 &&
                        armorList?.map((item, index) => (
                          <TableRow key={index}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>{item.name}</TableCell>
                            <TableCell>
                              {"T$ " +
                                (item.price != null
                                  ? Number(item.price).toFixed(2).replace(".", ",")
                                  : "0,00")}
                            </TableCell>
                            <TableCell>{item.spaces}</TableCell>
                            <TableCell>{item.quantity}</TableCell>
                            <TableCell className="flex justify-center items-center">
                              <ItemDialog item={item} />
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
            <NewItemForm
              onSubmit={onSubmit}
              handleSubmit={handleSubmit}
              register={register}
              errors={errors}
            />
          </div>
        </main>
      </div>
    </div>
  );
}
