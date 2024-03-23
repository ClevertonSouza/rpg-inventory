import React, { useState } from "react";
import { Dialog, DialogTrigger, DialogContent, DialogFooter, DialogClose, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FiDollarSign } from "react-icons/fi";

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
      <DialogTrigger asChild>
        <button>
          <FiDollarSign className="w-4 h-4 text-gray-200 hover:text-gray-400" />
        </button>
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
