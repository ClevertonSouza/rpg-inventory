import { NextApiRequest, NextApiResponse } from 'next';	
import path from 'path';
import fsPromises from 'fs/promises';

export const config = {
    api: {
        bodyParser: false,
    },
};

export default async function (req: NextApiRequest, res: NextApiResponse) {

}

