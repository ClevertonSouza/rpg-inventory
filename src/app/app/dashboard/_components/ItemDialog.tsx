import React from "react";
import { FiFileText } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Item } from "@prisma/client";

type ItemDialogProps = {
  item: Item;
};

const ItemDialog: React.FC<ItemDialogProps> = ({ item }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="hover:text-white">
          <FiFileText className="w-4 h-4 text-gray-500" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Detalhes do Item</DialogTitle>
        </DialogHeader>
        <div>
          <p>Nome: {item.name}</p>
          <p>
            Valor:{" "}
            {"T$ " +
              (item.price != null
                ? Number(item.price).toFixed(2).replace(".", ",")
                : "0,00")}
          </p>
          <p>Espaços: {item.spaces}</p>
          <p>Quantidade: {item.quantity}</p>
          <p>Tags: {item.tags}</p>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button>Fechar</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ItemDialog;
