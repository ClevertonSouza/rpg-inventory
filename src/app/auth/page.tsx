'use client'

import React, { useState } from 'react'; // Adicione useState ao import do React
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

import { LoginButton } from '@/components/auth/loginButton';
import { login } from '@/actions/auth/login';
import { FiGithub, FiLogIn, FiPackage } from 'react-icons/fi';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { Label } from '@/components/ui/label';


const LoginScreen = () => {
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false); // Estado para controle de carregamento

  const handleLogin = async (values: any) => {
    setLoading(true); // Inicia o carregamento
    const res = await login(values);
    console.log(res);
    setLoading(false); // Finaliza o carregamento
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className='flex flex-row items-center'><FiPackage className="text-4xl mr-2" />Login</CardTitle>
          <CardDescription>A login screen for a RPG inventory</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center flex-col items-center gap-4">
          <form className="w-full flex flex-col" onSubmit={handleSubmit(handleLogin)}>
            <Label htmlFor="email" className='mb-2'>Email</Label>
            <Input id="email" {...register('email')} placeholder='Email' className='mb-4 w-full' />
            <Label htmlFor="password" className='mb-2'>Senha</Label>
            <Input id="password" type="password" {...register('password')} placeholder='Senha' className='mb-4 w-full' />
            <LoginButton className='flex justify-center items-center flex-col'>
              <Button className="mt-4 w-[250px]" onClick={handleLogin}>
                {loading ? ( // Altera o conteúdo do botão baseado no estado de carregamento
                  <span>Carregando...</span>
                ) : (
                  <span><FiLogIn className="text-2xl mr-2" />Entrar</span>
                )}
              </Button>
              <Button className="mt-4 w-[250px]" variant='secondary' color='secondary' size='lg' onClick={handleLogin}><FiGithub className="text-2xl mr-2" />Entrar com GitHub</Button>
            </LoginButton>
          </form>
          <a href="/auth/register" className="text-center text-blue-500">Cadastrar</a>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginScreen;
