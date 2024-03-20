import { NextApiRequest, NextApiResponse } from 'next';	
import path from 'path';
import fsPromises from 'fs/promises';
import { IncomingForm } from 'formidable';

export const config = {
    api: {
        bodyParser: false,
    },
};

export default async function (req: NextApiRequest, res: NextApiResponse) {
    try {
        
        return res.status(200).json({ message: 'Arquivo recebido com sucesso!' });
    } catch (err) {
        return res.status(500).json({ message: 'Erro ao processar o formulário!' });
    }
}

