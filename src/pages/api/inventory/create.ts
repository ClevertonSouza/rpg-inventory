import prisma from "@/lib/database/database";
import { NextApiRequest, NextApiResponse } from "next";
import * as yup from 'yup';

const schema = yup.object().shape({
    name: yup.string().required('O nome é obrigatório'),
    price: yup.number().positive('O valor deve ser positivo').required('O valor é obrigatório'),
    spaces: yup.number().positive('O espaço deve ser positivo').required('O espaço é obrigatório'),
    category: yup.string().required('A categoria deve ser positiva'),
});

export default async function (req: NextApiRequest, res: NextApiResponse) {
    try {
        await schema.validate(req.body, { abortEarly: false });

        const result = await prisma.item.create({
            data: req.body,
        });

        console.log(result);

        return res.status(201).json({});
    } catch (error) {
        if (error instanceof yup.ValidationError) {
            return res.status(400).json({ errors: error.errors });
        }
        return res.status(500).json({ error: 'Erro interno do servidor' });
    }
}
