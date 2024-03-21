"use client";

import { Label } from "@radix-ui/react-label";
import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const NewItemForm = ({ onSubmit, handleSubmit, register, errors }: any) => {
  return (
    <Card className="flex flex-col">
      <CardHeader className="pb-4">
        <CardTitle>Add Items</CardTitle>
        <CardDescription>Items to add to inventory</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-row gap-4 flex-wrap">
            <div className="w-full">
              <Label htmlFor="itemName" className="mt-4">
                Nome do Item
              </Label>
              <Input
                id="itemName"
                {...register("name", { required: true })}
                placeholder="Digite o nome do item"
              />
              {errors.itemName && <span>Este campo é obrigatório</span>}
            </div>
            <div className="w-auto">
              <Label htmlFor="itemPrice" className="mt-4">
                Preço do Item (T$)
              </Label>
              <Input
                id="itemPrice"
                {...register("price", { required: true })}
                type="text"
                placeholder="Ex: 1.000,00"
              />
              {errors.itemValue && (
                <span>
                  Este campo é obrigatório e deve seguir o formato R$ 1.000,00
                </span>
              )}
            </div>
            <div className="w-auto">
              <Label htmlFor="itemSpaces" className="mt-4">
                Peso do Item
              </Label>
              <Input
                id="itemSpaces"
                {...register("spaces", { required: true })}
                type="number"
                placeholder="Digite os espaços do item"
              />
              {errors.itemWeight && <span>Este campo é obrigatório</span>}
            </div>
            <div className="w-auto">
              <Label htmlFor="itemQuantity" className="mt-4">
                Quantidade do Item
              </Label>
              <Input
                id="itemQuantity"
                {...register("quantity", { required: true })}
                type="number"
                placeholder="Digite a quantidade do item"
              />
              {errors.itemQuantity && <span>Este campo é obrigatório</span>}
            </div>
            <div className="w-auto">
              <Label htmlFor="itemCategory" className="mt-4">
                Category
              </Label>
              <Input
                id="itemCategory"
                {...register("category", { required: true })}
                type="text"
                placeholder="Digite a categoria do item"
              />
              {errors.itemCategory && <span>Este campo é obrigatório</span>}
            </div>
            <div className="w-full">
              <Label htmlFor="itemTag" className="mt-4">
                Tag do Item
              </Label>
              <Input
                id="itemTag"
                {...register("tags")}
                placeholder="Digite a tag do item"
              />
            </div>
          </div>
          <Button type="submit" className="w-full mt-4">
            Adicionar Item
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default NewItemForm;
