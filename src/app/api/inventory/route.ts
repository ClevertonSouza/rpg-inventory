import fsPromises from 'fs/promises';
import path from 'path';

export const dynamic = 'force-dynamic' 


export async function POST(request: Request) {
    const data = await request.formData();
    console.log(data);

    
    const file = data.get('file');
    const filePath = path.join(process.cwd(), 'src/pages/api/inventory', 'inventory.json');
    
    if (file instanceof File) {
        const fileContent = await file.arrayBuffer();
        await fsPromises.writeFile(filePath, Buffer.from(fileContent));
        
        console.log('Arquivo salvo em', filePath);
        
        return new Response('Arquivo recebido com sucesso!', { status: 200 });
    } else {
        return new Response('Nenhum arquivo enviado.', { status: 400 });
    }
}

export async function GET(request: Request) {
    return new Response('Hello, Next.js!', { status: 200 });
}

