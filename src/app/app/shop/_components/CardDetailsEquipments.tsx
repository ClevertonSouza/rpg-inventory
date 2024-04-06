import React from "react";
import { ShopItem } from "@/common/types";
import { Drawer, DrawerClose, DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { FiMoreVertical, FiPlus, FiX } from "react-icons/fi";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

type ItemDialogProps = {
  item: ShopItem;
};

const CardDetailsEquipments: React.FC<ItemDialogProps> = ({ item }) => {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline" className="hover:text-green-200 text-green-500">
          <FiPlus className="w-4 h-4" />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-lg space-y-4">
          <DrawerHeader className="flex justify-center">
            <DrawerTitle>{item.name}</DrawerTitle>
          </DrawerHeader>
          <div className="flex">
            <div className="w-full">
              <p>Preço: {"T$ " + (item.price != null ? Number(item.price).toFixed(2).replace(".", ",") : "0,00")}</p>
              <p>Espaços: {item.spaces}</p>
              <p>Quantidade: {item.quantity}</p>
            </div>
            <div className="w-full">
              <Card>
                <CardContent className="p-4">
                  <form>
                    <Label>Melhorias</Label>
                    <Separator className="my-4"/>
                    <div className="flex flex-col space-y-2">
                      
                    </div>
                    <Label>Materiais</Label>
                    <Separator className="my-4"/>
                    <div className="flex flex-col space-y-2">
                      <RadioGroup className="flex flex-col">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="ruby" />
                          <Label>Aço ruby</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="adamant" />
                          <Label>Adamante</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="ice" />
                          <Label>Gelo eterno</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="wood" />
                          <Label>Madeira tollon</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="red" />
                          <Label>Matéria vermelha</Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
          <DrawerFooter>
            <Button>Submit</Button>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default CardDetailsEquipments;
