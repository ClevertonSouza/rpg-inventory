
import React from "react";
import { Label } from "@radix-ui/react-label";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Input } from "../../../../components/ui/input";
import { Button } from "../../../../components/ui/button";
import ComboBox from "@/components/shared/ComboBox";
import { categoryOptions } from "../categoryOptions";
import { Controller, SubmitHandler, UseFormHandleSubmit, UseFormRegister } from "react-hook-form";

type NewItemFormProps = {
  onSubmit: SubmitHandler<any>,
  handleSubmit: UseFormHandleSubmit<any>,
  register: UseFormRegister<any>,
  errors: any,
  control: any,
}

const NewItemForm: React.FC<NewItemFormProps> = ({ onSubmit, handleSubmit, register, errors, control }) => {
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
              <Label htmlFor="itemName">
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
              <Label htmlFor="itemPrice">
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
              <Label htmlFor="itemSpaces">
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
              <Label htmlFor="itemQuantity">
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
            <div className="flex flex-col gap-1 w-full">
              <Label htmlFor="itemCategory">
                Category
              </Label>
              <Controller
                name="category"
                control={control}
                render={({ field }) => (
                  <ComboBox
                    {...field}
                    value={field.value}
                    setValue={field.onChange}
                    options={categoryOptions}
                  />
                )}
              />
              {errors.itemCategory && <span>Este campo é obrigatório</span>}
            </div>
            <div className="w-full">
              <Label htmlFor="itemTag">
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
