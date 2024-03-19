import axios from "@/lib/api/axios-vercel";
import { NextApiRequest, NextApiResponse } from "next";
import { v4 as uuidv4 } from 'uuid';


export default async function (req: NextApiRequest, res: NextApiResponse) {
    const data = await axios.get('/itensGerais');
    

    const items = data.data.map((item: any) => {
        return {
            id: uuidv4(),
            name: item.name,
            price: Number(item.price.replace('T$', '').trim()),
            spaces: Number(item.spaces.replace(',', '.')),
            category: item.category,
        };
    });

    return res.status(200).json(items);
}

