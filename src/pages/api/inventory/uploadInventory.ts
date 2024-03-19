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
        const form = new IncomingForm({
            keepExtensions: true,
            uploadDir: "./public/temp",
        });

        form.parse(req, async (err: any, fields: any, files: any) => {
            if (err) {
                return res.status(500).json({ message: 'Erro ao processar o formulário!' });
            }
            if (!files.file) {
                return res.status(400).json({ message: 'Nenhum arquivo foi enviado!' });
            }

            const file = files.file;
            const savedFilePath = file[0].filepath;
            const fileContent = await fsPromises.readFile(savedFilePath, 'utf8');
            const filePath = path.join(process.cwd(), 'src/pages/api/inventory', 'inventory.json');
            await fsPromises.writeFile(filePath, fileContent);

            console.log('Arquivo salvo em', filePath);

            return res.status(200).json({ message: 'Arquivo recebido com sucesso!' });
        });
    } catch (err) {
        return res.status(500).json({ message: 'Erro ao processar o formulário!' });
    }
}

