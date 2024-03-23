import React, { useState } from "react";
import { Dialog, DialogTrigger, DialogContent, DialogFooter, DialogClose, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FiTrash2 } from "react-icons/fi";

type RemoveItemDialogProps = {
  onConfirm: () => void;
};

const RemoveItemDialog: React.FC<RemoveItemDialogProps> = ({ onConfirm }) => {
  const [open, setOpen] = useState(false);

  const handleConfirm = () => {
    setOpen(false);
    onConfirm();
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button>
          <FiTrash2 className="text-red-500 hover:text-red-800 dark:text-red-500 dark:hover:text-red-400" />
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Remover Item</DialogTitle>
        <p>Tem certeza que deseja remover este item?</p>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancelar</Button>
          </DialogClose>
          <Button variant="destructive" onClick={handleConfirm}>Confirmar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RemoveItemDialog;
