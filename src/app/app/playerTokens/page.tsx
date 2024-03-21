"use client";

import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from "@/components/ui/card";
import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "@/components/ui/table";
import { useEffect, useState } from "react";

import axios from "@/lib/api/axios";
import { useForm } from "react-hook-form";

import { PlayerToken } from "@/common/types";
import NewTokenForm from "@/components/playerTokens/newTokenForm";
import { useToast } from "@/components/ui/use-toast";

export default function PlayerTokens() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { toast } = useToast();

  const [playerTokens, setPlayerTokens] = useState<PlayerToken[]>([]);
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    const fetchTokens = async () => {
      try {
        const response = await axios.get("/api/playerTokens/list");
        setPlayerTokens(response.data);
      } catch (error) {
        console.error("Erro ao buscar inventário:", error);
      }
    };

    fetchTokens();
  }, [update]);

  const onSubmit = async (PlayerToken: Omit<PlayerToken, "id">) => {
    try {
      const response = await axios.post("/api/playerTokens/create", PlayerToken);
      console.log("response", response);
      setUpdate(!update);
      reset();
      toast({
        title: "Token criado",
        description: response.status === 200 ? "Token criado com sucesso" : "Erro ao criar token",
      });
    } catch (error) {
      console.error("Erro ao adicionar item:", error);
    }
  };

  return (
    <div className="flex min-h-screen w-full">
      <div className="flex flex-col w-full">
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="grid col-span-2 gap-4">
              <Card className="flex flex-col">
                <CardHeader className="pb-4">
                  <CardTitle>Tokens</CardTitle>
                  <CardDescription>Tokens from player</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-10">#</TableHead>
                        <TableHead>name</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {playerTokens?.length > 0 &&
                        playerTokens?.map((token, index) => (
                          <TableRow key={index}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>{token.token}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
            <NewTokenForm
              onSubmit={onSubmit}
              handleSubmit={handleSubmit}
              register={register}
              errors={errors}
            />
          </div>
        </main>
      </div>
    </div>
  );
}
