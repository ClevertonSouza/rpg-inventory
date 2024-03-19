import { NextApiRequest, NextApiResponse } from "next";
import { v4 as uuidv4 } from 'uuid';

import fs from 'fs/promises';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'src/pages/api/inventory/inventory.json');

export default async function (req: NextApiRequest, res: NextApiResponse) {
    const data = await fs.readFile(dataFilePath, 'utf8');
    const objectData = JSON.parse(data);

    // Transformando todas as propriedades de objectData
    const transformedData = Object.keys(objectData).reduce((acc: Record<string, any[]>, key: string): Record<string, any[]> => {
        const value = objectData[key];
        if (Array.isArray(value)) {
            acc[key] = value.map((item: any) => {
                const price = typeof item.price === 'string' ? item.price.replace('T$', '').trim() : item.price;
                const spaces = typeof item.spaces === 'string' ? item.spaces.replace(',', '.') : item.spaces;
                return {
                    id: uuidv4(), 
                    name: item.name,
                    price: Number(price), 
                    spaces: Number(spaces), 
                    category: item.category,
                };
            });
        }
        return acc;
    }, {});

    return res.status(200).json(transformedData);
}
