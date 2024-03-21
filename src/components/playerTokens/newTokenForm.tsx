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

const NewTokenForm = ({ onSubmit, handleSubmit, register, errors }: any) => {
  return (
    <Card className="flex flex-col">
      <CardHeader className="pb-4">
        <CardTitle>Add Tokens</CardTitle>
        <CardDescription>Tokens to add to token list</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-row gap-4 flex-wrap">
            <div className="w-full">
              <Label htmlFor="tokenName" className="mt-4">
                Nome do Item
              </Label>
              <Input
                id="tokenName"
                {...register("token", { required: true })}
                placeholder="Digite o nome do Personagem"
              />
              {errors.tokenName && <span>Este campo é obrigatório</span>}
            </div>
          </div>
          <Button type="submit" className="w-full mt-4">
            Adicionar Token
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default NewTokenForm;
