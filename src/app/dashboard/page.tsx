'use client'

import Link from "next/link"
import { CardTitle, CardDescription, CardHeader, CardContent, Card } from "@/components/ui/card"
import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "@/components/ui/table"
import { FiShoppingCart, FiHome, FiPackage, FiX, FiMenu, FiFileText } from "react-icons/fi";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { Inventory } from "@prisma/client";

import axios from '@/lib/database/axios';
import { useForm } from "react-hook-form";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";


export default function Dashboard() {
  const [inventoryList, setInventoryList] = useState<Inventory[]>([] as Inventory[]);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const [update, setUpdate] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(true); // Estado para controlar a visibilidade da gaveta

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const response = await axios.get('/inventory/list');
        setInventoryList(response.data);
      } catch (error) {
        console.error('Erro ao buscar inventário:', error);
      }
    };

    fetchInventory();
  }, [update]);

  const onSubmit = async (data: any) => {
    try {
      const response = await axios.post('/inventory/create', data);
      console.log('response', response);
      setUpdate(!update);
      reset(); // Limpa os campos do formulário após o envio
    } catch (error) {
      console.error('Erro ao adicionar item:', error);
    }
  }

  // Função para fechar a gaveta
  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  }

  return (
    <div className="flex min-h-screen w-full">
      <div className={`relative ${isDrawerOpen ? 'block' : 'hidden'} border-r bg-gray-100/40 lg:block dark:bg-gray-800/40`}>
        <button
          className="absolute top-0 right-0 m-4 text-gray-800 dark:text-gray-200"
          onClick={toggleDrawer} // Usando a função closeDrawer aqui
        >
          <FiX className="h-6 w-6" />
        </button>
        <div className={`${isDrawerOpen ? 'block' : 'hidden'} flex h-full max-h-screen flex-col gap-2`}>
          <div className="flex h-[60px] items-center border-b px-6">
            <Link className="flex items-center gap-2 font-semibold" href="#">
              <FiPackage className="h-6 w-6" />
              <span className="w-56">RPG inventory</span>
            </Link>
          </div>
          <div className="flex-1 overflow-auto py-2">
            <nav className="grid items-start px-4 text-sm font-medium">
              <Link
                className="flex items-center gap-6 rounded-lg bg-gray-100 px-3 py-2 text-gray-900  transition-all hover:text-gray-900 dark:bg-gray-800 dark:text-gray-50 dark:hover:text-gray-50"
                href="#"
              >
                <FiHome className="h-4 w-4" />
                Home
              </Link>
              <Link
                className="flex items-center gap-6 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                href="#"
              >
                <FiShoppingCart className="h-4 w-4" />
                Store
              </Link>
            </nav>
          </div>
        </div>
      </div>
      <div className="flex flex-col w-full">
        <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-gray-100/40 px-6 dark:bg-gray-800/40">
          <Link className="lg:hidden" href="#">
            <FiPackage className="h-6 w-6" />
            <span className="sr-only">Home</span>
          </Link>
          <button
            className={`relative ${isDrawerOpen ? 'hidden' : 'block'} text-gray-800 dark:text-gray-200`}
            onClick={toggleDrawer} // Usando a função closeDrawer aqui
          >
            <FiMenu className="h-6 w-6" />
          </button>
          <div className="w-full flex-1">
            <h1 className="font-semibold text-sm md:text-base lg:text-xl">Home</h1>
          </div>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
          <div className="flex-wrap grid gap-4 sm:grid-cols-1 md:grid-cols-3">
            <Card className="flex items-center justify-center p-6">
              <div className="space-y-2 text-center">
                <CardTitle className="text-2xl font-bold">{inventoryList?.reduce((acc, item) => acc + item.quantity, 0)}</CardTitle>
                <CardDescription className="text-sm font-medium shrink-0/100">Total Items</CardDescription>
              </div>
            </Card>
            <Card className="flex items-center justify-center p-6">
              <div className="space-y-2 text-center">

                <CardTitle className="text-2xl font-bold">{'T$ ' + inventoryList?.reduce((acc, item) => acc + item.value, 0).toFixed(2).replace('.', ',')}</CardTitle>
                <CardDescription className="text-sm font-medium shrink-0/100">Items Value</CardDescription>
              </div>
            </Card>
            <Card className="flex items-center justify-center p-6">
              <div className="space-y-2 text-center">
                <CardTitle className="text-2xl font-bold">{inventoryList?.reduce((acc, item) => acc + item.weight, 0)}</CardTitle>
                <CardDescription className="text-sm font-medium shrink-0/100">Weight</CardDescription>
              </div>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="col-span-2">
              <Card className="flex flex-col">
                <CardHeader className="pb-4">
                  <CardTitle>Inventory</CardTitle>
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
                      {inventoryList?.map((item, index) => (
                        <TableRow key={index}>
                          <TableCell>{index + 1}</TableCell>
                          <TableCell>{item.name}</TableCell>
                          <TableCell>{'T$ ' + item.value.toFixed(2).replace('.', ',')}</TableCell>
                          <TableCell>{item.weight}</TableCell>
                          <TableCell>{item.quantity}</TableCell>
                          <TableCell className="flex justify-center items-center">
                            <Dialog>
                              <DialogTrigger>
                                <button className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"><FiFileText  className="h-4 w-4" /></button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Detalhes do Item</DialogTitle>
                                </DialogHeader>
                                <div>
                                  <p>Nome: {item.name}</p>
                                  <p>Valor: {'T$ ' + item.value.toFixed(2).replace('.', ',')}</p>
                                  <p>Peso: {item.weight}</p>
                                  <p>Quantidade: {item.quantity}</p>
                                </div>
                                <DialogFooter>
                                  <DialogClose asChild>
                                    <Button>Fechar</Button>
                                  </DialogClose>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
            <Card className="flex flex-col">
              <CardHeader className="pb-4">
                <CardTitle>Add Items</CardTitle>
                <CardDescription>Items to add to inventory</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="flex flex-row gap-4 flex-wrap">
                    <div className="w-full">
                      <Label htmlFor="itemName" className="mt-4">Nome do Item</Label>
                      <Input id="itemName" {...register("name", { required: true })} placeholder="Digite o nome do item" />
                      {errors.itemName && <span>Este campo é obrigatório</span>}
                    </div>
                    <div className="w-auto">
                      <Label htmlFor="itemValue" className="mt-4">Valor do Item (T$)</Label>
                      <Input id="itemValue" {...register("value", { required: true })} type="text" placeholder="Ex: 1.000,00" />
                      {errors.itemValue && <span>Este campo é obrigatório e deve seguir o formato R$ 1.000,00</span>}
                    </div>
                    <div className="w-auto">
                      <Label htmlFor="itemWeight" className="mt-4">Peso do Item</Label>
                      <Input id="itemWeight" {...register("weight", { required: true })} type="number" placeholder="Digite o peso do item" />
                      {errors.itemWeight && <span>Este campo é obrigatório</span>}
                    </div>
                    <div className="w-auto">
                      <Label htmlFor="itemQuantity" className="mt-4">Quantidade do Item</Label>
                      <Input id="itemQuantity" {...register("quantity", { required: true })} type="number" placeholder="Digite a quantidade do item" />
                      {errors.itemQuantity && <span>Este campo é obrigatório</span>}
                    </div>
                    <div className="w-full">
                      <Label htmlFor="itemTag" className="mt-4">Tag do Item</Label>
                      <Input id="itemTag" {...register("tags")} placeholder="Digite a tag do item" />
                    </div>
                  </div>
                  <Button type="submit" className="w-full mt-4">Adicionar Item</Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}