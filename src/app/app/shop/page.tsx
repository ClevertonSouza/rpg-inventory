'use client'

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import axios from '@/lib/api/axios';

type ItemProps = {
    item: Item;
}

type Item = {
    id: number;
    name: string;
    value: number;
    weight: number;
    quantity: number;
}

export default function ShopPage({ item }: ItemProps) {
    const [items, setItems] = useState<Item[]>([]);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await axios.get('/shop/items');
                setItems(response.data);
            } catch (error) {
                console.error('Erro ao buscar itens:', error);
            }
        };

        fetchItems();
    }, []);

    return (
        <div className="flex min-h-screen w-full">
            <div className="flex flex-col w-full">
                <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
                    <Card className="flex flex-col">
                        <CardHeader className="pb-4">
                            <CardTitle>Shop Items</CardTitle>
                            <CardDescription>Items available for purchase</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>#</TableHead>
                                        <TableHead>Item</TableHead>
                                        <TableHead>Value</TableHead>
                                        <TableHead>Weight</TableHead>
                                        <TableHead>Quantity</TableHead>
                                        <TableHead>Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    <TableRow>
                                        <TableCell>Item</TableCell>
                                        <TableCell>Teste</TableCell>
                                        <TableCell>Teste</TableCell>
                                        <TableCell>Teste</TableCell>
                                        <TableCell>Teste</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </main>
            </div>
        </div>
    );
}
