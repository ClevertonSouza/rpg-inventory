'use client'

import Link from 'next/link';
import React, { PropsWithChildren, useState } from 'react';
import { FiHome, FiMenu, FiPackage, FiShoppingCart, FiX } from 'react-icons/fi';
import { usePathname } from 'next/navigation';
import SidebarLink from '@/components/Layout/SidebarLink';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { downloadFile } from '@/common/helpers';

import axios from '@/lib/api/axios';
import UploadFileDialog from '@/components/dashboard/UploadFileDialog';

const Layout: React.FC = ({ children }: PropsWithChildren) => {
    const pathname = usePathname();
    const [isDrawerOpen, setIsDrawerOpen] = useState(true);
    const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);

    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen);
    }

    const isActive = (path: string) => {
        return path === pathname;
    }

    const handleDownloadJson = async () => {
        const response = await axios.get('/inventory/list');

        downloadFile({
            data: JSON.stringify(response.data),
            fileName: "inventory.json",
            fileType: "application/json",
        })
    }

    return (
        <div className="flex min-h-screen w-full">
            <div className={`relative ${isDrawerOpen ? 'block' : 'hidden'} border-r bg-gray-100/40 lg:block dark:bg-gray-800/40 flex flex-col `}>
                <button
                    className="absolute top-0 right-0 m-4 text-gray-800 dark:text-gray-200"
                    onClick={toggleDrawer}
                >
                    <FiX className="h-6 w-6" />
                </button>
                <div className={`${isDrawerOpen ? 'block' : 'hidden'} flex h-full min-h-screen flex-col gap-2 flex-end`}>
                    <div className="flex h-[60px] items-center border-b px-6">
                        <Link className="flex items-center gap-2 font-semibold" href="#">
                            <FiPackage className="h-6 w-6" />
                            <span className="w-56">RPG inventory</span>
                        </Link>
                    </div>
                    <div className="flex-1 overflow-auto py-2">
                        <nav className="grid items-start px-4 text-sm font-medium gap-2">
                            <SidebarLink
                                path={{ href: '/app/dashboard', icon: FiHome, label: 'Dashboard' }}
                                active={isActive('/app/dashboard')}
                            />
                            <SidebarLink
                                path={{ href: '/app/shop', icon: FiShoppingCart, label: 'Store' }}
                                active={isActive('/app/shop')}
                            />
                        </nav>
                    </div>
                    <footer className='flex items-center justify-center justify-between h-14 lg:h-[60px] border-t bg-gray-100/40 px-6 dark:bg-gray-800/40'>
                        <p className="text-sm font-medium">© 2024 RPG Inventory</p>
                        <UploadFileDialog isOpen={isUploadDialogOpen} setIsOpen={setIsUploadDialogOpen} />
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <button className='text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 p-3'>
                                    <FiMenu className='w-6 h-6' />
                                </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuItem onSelect={handleDownloadJson}>
                                    Exportar JSON
                                </DropdownMenuItem>
                                <DropdownMenuItem onSelect={() => setIsUploadDialogOpen(true)}>
                                    Importar JSON
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </footer>
                </div>
            </div>
            <div className="flex flex-col w-full">
                <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-gray-100/40 px-6 dark:bg-gray-800/40">
                    <Link className="lg:hidden" href="#">
                        <FiPackage className="h-6 w-6" />
                        <span className="sr-only">Home</span>
                    </Link>
                    <button
                        className={`relative ${isDrawerOpen ? 'hidden' : 'block'} text-gray-800 dark:text-gray-200`}
                        onClick={toggleDrawer}
                    >
                        <FiMenu className="h-6 w-6" />
                    </button>
                    <div className="w-full flex-1">
                        <h1 className="font-semibold text-sm md:text-base lg:text-xl">Home</h1>
                    </div>
                </header>
                {children}
            </div>
        </div>
    );
};

export default Layout;
