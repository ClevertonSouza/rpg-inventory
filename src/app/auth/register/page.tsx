'use client'

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { FiArrowRight, FiPackage } from "react-icons/fi";

import { register as registerUser } from '@/actions/auth/register';	
import { useRouter } from "next/navigation";


const register = () => {
    const router = useRouter();
    const { register, handleSubmit } = useForm();

    const onSubmit = async (values: any) => {
        const res = await registerUser(values);
        console.log(res);
        router.push('/auth');
    }

    return (
        <div className="flex justify-center items-center h-screen">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle className='flex flex-row items-center'><FiPackage className="text-4xl mr-2" />Login</CardTitle>
                    <CardDescription>A login screen for a RPG inventory</CardDescription>
                </CardHeader>
                <CardContent className="flex justify-center flex-col items-center gap-4">
                    <form className="w-full flex flex-col" onSubmit={handleSubmit(onSubmit)}>
                        <Label htmlFor="name" className='mb-2'>Nome</Label>
                        <Input id="name" {...register('name')} placeholder='Nome' className='mb-4 w-full' />
                        <Label htmlFor="email" className='mb-2'>Email</Label>
                        <Input id="email" {...register('email')} placeholder='Email' className='mb-4 w-full' />
                        <Label htmlFor="password" className='mb-2'>Senha</Label>
                        <Input id="password" type="password" {...register('password')} placeholder='Senha' className='mb-4 w-full' />
                        <Button type="submit" className="w-full flex justify-center items-center gap-2"><FiArrowRight className="text-2xl mr-2" />Cadastrar</Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}

export default register;
