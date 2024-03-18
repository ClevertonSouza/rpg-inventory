import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/database/prisma";


export default async function (req: NextApiRequest, res: NextApiResponse) {
    const inventories = await prisma.inventory.findMany();

    return res.status(200).json(inventories);
}

