import React, { useState } from "react";
import { Dialog, DialogTrigger, DialogContent, DialogFooter, DialogClose, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ShopItem } from "@/common/types";
import { FiFileText } from "react-icons/fi";

type ShopItemsDialogProps = {
  item: ShopItem;
  onConfirm: () => void;
};

const ShopItemsDialog: React.FC<ShopItemsDialogProps> = ({ item, onConfirm }) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="hover:text-white"> 
          <FiFileText className="w-4 h-4 text-gray-500" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Detalhes do Item</DialogTitle>
        <div className="space-y-2">
          <p><strong>Nome:</strong> {item.name}</p>
          <p><strong>Preço:</strong> T$ {item.price.toFixed(2).replace('.', ',')}</p>
          <p><strong>Quantidade:</strong> {item.quantity}</p>
          <p><strong>Espaço:</strong> {item.spaces}</p>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancelar</Button>
          </DialogClose>
          <Button onClick={onConfirm}>Comprar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ShopItemsDialog;
