import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/database/prisma";

export default async function (req: NextApiRequest, res: NextApiResponse) {
    const { name, value, quantity, weight, tags } = req.body;

    await prisma.inventory.create({
        data: {
            name: String(name),
            value: Number(value),
            quantity: Number(quantity),
            weight: Number(weight),
            tags,
        },
    });

    return res.status(201).json({});
}

