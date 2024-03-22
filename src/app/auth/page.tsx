"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { LoginButton } from "@/app/auth/_components/loginButton";
import { login } from "@/actions/auth/login";
import { FiGithub, FiLogIn, FiPackage } from "react-icons/fi";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

const LoginScreen = () => {
  const { register, handleSubmit } = useForm();
  const { toast } = useToast();
  const router = useRouter();

  const handleLogin = async (values: any) => {
    const res = await login(values);
    toast({
      title: res.error ? "Erro ao realizar login" : "Login realizado com sucesso",
      description: res.error ?? "Você foi cadastrado com sucesso",
    });
    console.log(res);
    if (res.success) {
      router.push("/app/dashboard");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="flex flex-row items-center">
            <FiPackage className="text-4xl mr-2" />
            Login
          </CardTitle>
          <CardDescription>A login screen for a RPG inventory</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center flex-col items-center gap-4">
          <form
            className="w-full flex flex-col"
            onSubmit={handleSubmit(handleLogin)}
          >
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
            <div className="flex justify-center items-center flex-col">
              <LoginButton className="flex justify-center items-center flex-col">
                <Button className="mt-4 w-[250px] gap-3" onClick={handleLogin}>
                  <FiLogIn className="text-2xl mr-2" />
                  Entrar
                </Button>
              </LoginButton>
              <Button
                className="mt-4 w-[250px] gap-3"
                variant="secondary"
                color="secondary"
                size="lg"
                onClick={handleLogin}
              >
                <FiGithub className="text-2xl mr-2" />
                Entrar com GitHub
              </Button>
            </div>
          </form>
          <a href="/auth/register" className="text-center text-blue-500">
            Cadastrar
          </a>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginScreen;
