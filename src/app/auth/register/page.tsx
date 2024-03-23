"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { FiArrowLeft, FiArrowRight, FiPackage } from "react-icons/fi";
import { useToast } from "@/components/ui/use-toast";

import { register as registerUser } from "@/actions/auth/register";
import { useRouter } from "next/navigation";

const Register = () => {
  const { register, handleSubmit } = useForm();
  const router = useRouter();
  const { toast } = useToast();

  const onSubmit = async (values: any) => {
    const res = await registerUser(values);
    console.log(res);
    toast({
      title: res.error ? "Erro ao cadastrar" : "Cadastro realizado com sucesso",
      description: res.error ?? "Você foi cadastrado com sucesso",
      variant: res.success ? "default" : "destructive",
    });
    if (res.success) {
      router.push("/auth");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="w-full max-w-md">
        <CardHeader className="flex flex-row justify-between">
          <div className="flex flex-col">
            <CardTitle className="flex flex-row items-center">
              <FiPackage className="text-4xl mr-2" />
              Register
            </CardTitle>
            <CardDescription>A register screen for a RPG inventory</CardDescription>
          </div>
          <button
            className="mt-4 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
            onClick={() => router.push("/auth")}
          >
            <FiArrowLeft className="h-6 w-6" />
          </button>
        </CardHeader>
        <CardContent className="flex justify-center flex-col items-center gap-4">
          <form
            className="w-full flex flex-col"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Label htmlFor="name" className="mb-2">
              Nome
            </Label>
            <Input
              id="name"
              {...register("name")}
              placeholder="Nome"
              className="mb-4 w-full"
            />
            <Label htmlFor="email" className="mb-2">
              Email
            </Label>
            <Input
              id="email"
              {...register("email")}
              placeholder="Email"
              className="mb-4 w-full"
            />
            <Label htmlFor="password" className="mb-2">
              Senha
            </Label>
            <Input
              id="password"
              type="password"
              {...register("password")}
              placeholder="Senha"
              className="mb-4 w-full"
            />
            <div className="flex justify-center items-center">
              <Button
                type="submit"
                className="w-[250px] flex justify-center items-center gap-3"
              >
                <FiArrowRight className="text-2xl mr-2" />
                Cadastrar
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Register;
