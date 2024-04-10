import React, { FormEvent, FormEventHandler, useEffect, useState } from "react";
import { ShopItem, Weapons, Armor, GeneralItems, Improvement } from "@/common/types";
import { Drawer, DrawerClose, DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { FiMoreVertical, FiPlus, FiX } from "react-icons/fi";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { getImprovements } from "./actions";
import { toast } from "@/components/ui/use-toast";
import { Row, Table } from "@tanstack/react-table";
import { resolveMaterialsName } from "@/common/helpers";

type ItemDialogProps = {
  item: ShopItem;
  row: Row<ShopItem>;
  table: Table<ShopItem>;
};

type MaterialType = 'none' | 'ruby' | 'adamant' | 'ice' | 'wood' | 'red' | 'mithril';
type ItemType = 'weapon' | 'light' | 'heavy' | 'shield' | 'esoteric';

const materialPrices: Record<MaterialType, Record<ItemType, number | null>> = {
  'none': {
    'weapon': 0,
    'light': 0,
    'heavy': 0,
    'shield': 0,
    'esoteric': 0
  },
  'ruby': {
    'weapon': 6000,
    'light': 3000,
    'heavy': 6000,
    'shield': 3000,
    'esoteric': 6000
  },
  'adamant': {
    'weapon': 3000,
    'light': 6000,
    'heavy': 18000,
    'shield': 6000,
    'esoteric': 3000
  },
  'ice': {
    'weapon': 600,
    'light': 1500,
    'heavy': 3000,
    'shield': 1500,
    'esoteric': 3000
  },
  'wood': {
    'weapon': 1500,
    'light': null, // Madeira Tollon não é aplicável para armaduras leves
    'heavy': null, // Madeira Tollon não é aplicável para armaduras pesadas
    'shield': 1500,
    'esoteric': 1500
  },
  'red': {
    'weapon': 1500,
    'light': 6000,
    'heavy': 18000,
    'shield': 6000,
    'esoteric': 3000
  },
  'mithril': {
    'weapon': 1500,
    'light': 1500,
    'heavy': 12000,
    'shield': 1500,
    'esoteric': 3000
  }
};

const CardDetailsEquipments: React.FC<ItemDialogProps> = ({ item, row, table }) => {
  const [generalImprovements, setGeneralImprovements] = useState<Improvement[]>([]);
  const [materials, setMaterials] = useState<MaterialType>('none');
  const [upgrades, setUpgrades] = useState<string[]>([]);
  const [maxUpgrades, setMaxUpgrades] = useState(4);

  useEffect(() => {
    const getData = async () => {
      const dataImprovements = await getImprovements(item);
      setGeneralImprovements(dataImprovements);
    }

    getData();
  }, [])

  const handleCheck = (checkState: boolean | string, id: string) => {
    if (checkState && upgrades.length >= maxUpgrades) {
      toast({
        title: "Limite de melhorias atingido",
        description: "Você so pode selecionar no maximo 4 melhorias, incluindo um material.",
      });
      return false;
    }

    if (checkState) {
      setUpgrades([...upgrades, id]);
    } else {
      setUpgrades(upgrades.filter((upgrade) => upgrade !== id));
    }
  }

  const handleChangeRadioGroup = (value: string) => {
    if (value === 'none') {
      setMaxUpgrades(4);
      setMaterials(value);
    } else {
      if (upgrades.length === maxUpgrades) {
        setMaxUpgrades(4);
        setMaterials('none');
        toast({
          title: "Limite de melhorias atingido",
          description: "Você so pode selecionar no maximo 4 melhorias, incluindo um material.",
        });
      } else {
        setMaxUpgrades(3);
        setMaterials(value as MaterialType);
      }
    }
  }

  const calculateImprovementsPrice = (item: ItemDialogProps['item']) => {
    let materialPrice = 0;
    let itemType: ItemType = 'esoteric'; // Valor inicial padrão, ajuste conforme necessário
    if ('damage' in item) {
      itemType = 'weapon';
    } else if ('defenseBonus' in item) {
      itemType = item.type as ItemType;
    } else {
      itemType = 'esoteric';
    }

    materialPrice = materialPrices[materials][itemType] || 0;

    switch (upgrades.length + (materials !== 'none' ? 1 : 0)) {
      case 1:
        return materialPrice + 300;
      case 2:
        return materialPrice + 3000;
      case 3:
        return materialPrice + 9000;
      case 4:
        return materialPrice + 18000;
      default:
        return materialPrice;
    }
  } 

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if ('damage' in item || 'defenseBonus' in item) {
      item.upgrades = upgrades.concat(resolveMaterialsName(materials));
      item.totalPrice = calculateImprovementsPrice(item) + item.price;
    }
    if (row.getIsSelected() && 'totalPrice' in item) {
      table.options.meta?.updateData(row.index, 'totalPrice', item.totalPrice);
    }
  }

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline" className="hover:text-green-200 text-green-500">
          <FiPlus className="w-4 h-4" />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <form onSubmit={handleSubmit}>
          <div className="mx-auto w-full max-w-lg space-y-4">
            <DrawerHeader className="flex justify-center">
              <DrawerTitle>{item.name}</DrawerTitle>
            </DrawerHeader>
            <div className="flex space-x-4">
              <div className="w-full">
                <Card>
                  <CardContent className="p-4">
                    <Label>Melhorias</Label>
                    <Separator className="my-4" />
                    <div className="flex flex-col space-y-2">
                      {generalImprovements.map((improvement) => (
                        <div key={improvement.name} className="flex items-center space-x-2">
                          <Checkbox id={improvement.name} checked={upgrades.includes(improvement.name)} onCheckedChange={(checked) => handleCheck(checked, improvement.name)} />
                          <Label>{improvement.name}</Label>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
              <div className="w-full">
                <Card>
                  <CardContent className="p-4">
                    <Label>Materiais</Label>
                    <Separator className="my-4" />
                    <div className="flex flex-col space-y-2">
                      <RadioGroup value={materials} onValueChange={handleChangeRadioGroup} className="flex flex-col">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="none" />
                          <Label>Nenhum</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="ruby" />
                          <Label>Aço rubi</Label>
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
                  </CardContent>
                </Card>
                <div className="flex flex-col mt-4 space-y-4">
                  <Label>Preço do item: T$ {item.price.toFixed(2).replace('.', ',')}</Label>
                  <Label>Preço das melhorias: T$ {calculateImprovementsPrice(item).toFixed(2).replace('.', ',')}</Label>
                  <Label>Preço total: T$ {(item.price + calculateImprovementsPrice(item)).toFixed(2).replace('.', ',')}</Label>
                </div>
              </div>
            </div>
            <DrawerFooter>
              <DrawerClose asChild>
                <Button type="submit">Salvar</Button>
              </DrawerClose>
            </DrawerFooter>
          </div>
        </form>
      </DrawerContent>
    </Drawer>
  );
};

export default CardDetailsEquipments;
