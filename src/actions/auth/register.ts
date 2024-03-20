'use server'

import prisma from '@/lib/database/database';
import bcrypt from 'bcryptjs';
import * as yup from 'yup';

type RegisterValues = {
    name: string;
    email: string;
    password: string;
}


export const register = async (values: RegisterValues) => {
    const schema = yup.object().shape({
        name: yup.string().required(),
        email: yup.string().email().required(),
        password: yup.string().required()
    })

    await schema.validate(values, { abortEarly: false });

    const existingUser = await prisma.user.findUnique({ where: { email: values.email } });

    if (existingUser) {
        return { error: "User already exists" };
    }


    const hashedPassword = await bcrypt.hash(values.password, 10);

    await prisma.user.create({
        data: {
            name: values.name,
            email: values.email,
            password: hashedPassword
        }
    })

    return { success: "Email send!" };
}

