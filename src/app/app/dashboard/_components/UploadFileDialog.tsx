import React, { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface UploadFileDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const UploadFileDialog: React.FC<UploadFileDialogProps> = ({
  isOpen,
  setIsOpen,
}) => {
  const [file, setFile] = useState<File>();

  const handleUpload = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!file) {
      alert("Por favor, selecione um arquivo para fazer o upload.");
      return;
    }

    const formData = new FormData();
    formData.set("file", file);

    try {
      await fetch("/api/inventory", {
        method: "POST",
        body: formData,
      });
      alert("Upload realizado com sucesso!");
      setIsOpen(false);
      window.location.href = "/app/dashboard";
    } catch (error) {
      console.error("Erro ao fazer upload do arquivo:", error);
      alert("Erro ao fazer upload do arquivo.");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <form onSubmit={handleUpload} className="flex flex-col gap-4">
          <DialogTitle>Upload de Arquivo</DialogTitle>
          <DialogDescription className="text-sm">
            Selecione um arquivo para fazer o upload.
          </DialogDescription>
          <Input type="file" onChange={(e) => setFile(e.target.files?.[0])} />
          <Button type="submit">Fazer Upload</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UploadFileDialog;
