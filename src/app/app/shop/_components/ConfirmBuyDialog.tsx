import React, { useState } from "react";
import { Dialog, DialogTrigger, DialogContent, DialogFooter, DialogClose, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { GiTwoCoins } from "react-icons/gi";

type RemoveItemDialogProps = {
  onConfirm: () => void;
};

const ConfirmBuyDialog: React.FC<RemoveItemDialogProps> = ({ onConfirm }) => {
  const [open, setOpen] = useState(false);

  const handleConfirm = () => {
    setOpen(false);
    onConfirm();
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button variant="outline">
          <GiTwoCoins className="w-4 h-4 text-yellow-500 hover:text-yellow-400" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Comprar Item</DialogTitle>
        <p>Tem certeza que deseja comprar este item?</p>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancelar</Button>
          </DialogClose>
          <Button  onClick={handleConfirm}>Confirmar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmBuyDialog;
