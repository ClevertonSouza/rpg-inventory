"use client";

import Link from "next/link";
import React, { PropsWithChildren, useEffect, useState } from "react";
import { FiHome, FiLogOut, FiMenu, FiPackage, FiShoppingCart, FiX } from "react-icons/fi";
import { GiSwordsPower } from "react-icons/gi";
import { usePathname } from "next/navigation";
import SidebarLink from "@/app/app/_components/SidebarLink";
import ComboToken from "@/components/shared/ComboToken";

import { usePlayerToken } from "@/contexts/UserTokensContext";
import { signOut } from "next-auth/react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { getPlayerTokenTibars, updatePlayerTibars } from "./playerTokens/actions";

const Layout: React.FC = ({ children }: PropsWithChildren) => {
  const pathname = usePathname();
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);
  const { playerToken, setPlayerToken, tibars, setTibars } = usePlayerToken();
  const [showTibarsInput, setShowTibarsInput] = useState(false);

  useEffect(() => {
    const fetchTibars = async () => {
      if (playerToken) {
        const tibars = await getPlayerTokenTibars(playerToken);
        setTibars(Number(tibars));
      }
    };

    fetchTibars();
  }, [playerToken]);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const toggleTibarsInput = () => {
    if (playerToken) {
      setShowTibarsInput(!showTibarsInput);
    }
  };

  const isActive = (path: string) => {
    return path === pathname;
  };

  const changeTibars = async (tibars: number) => {
    if (playerToken) {
      await updatePlayerTibars(playerToken, tibars);
      toggleTibarsInput();
    }
  };

  const normalizeHeaderName = () => {
    switch (pathname) {
      case "/app/shop":
        return "Shop Items";
      case "/app/playerTokens":
        return "Tokens";
      default:
        return "Dashboard";
    }
  }

  return (
    <div className="flex min-h-screen w-full">
      <div
        className={`relative ${isDrawerOpen ? "block" : "hidden"} border-r bg-gray-100/40 lg:block dark:bg-gray-800/40 flex flex-col `}
      >
        <button
          className="absolute top-0 right-0 m-4 text-gray-800 dark:text-gray-200"
          onClick={toggleDrawer}
        >
          <FiX className="h-6 w-6" />
        </button>
        <div
          className={`${isDrawerOpen ? "block" : "hidden"} flex h-full min-h-screen flex-col gap-2 flex-end`}
        >
          <div className="flex h-[60px] items-center border-b px-6">
            <Link className="flex items-center gap-2 font-semibold" href="#">
              <FiPackage className="h-6 w-6" />
              <span className="w-56">RPG inventory</span>
            </Link>
          </div>
          <div className="flex-1 overflow-auto py-2">
            <nav className="grid items-start px-4 text-sm font-medium gap-2">
              <SidebarLink
                path={{
                  href: "/app/dashboard",
                  icon: FiHome,
                  label: "Dashboard",
                }}
                active={isActive("/app/dashboard")}
              />
              <SidebarLink
                path={{
                  href: "/app/shop",
                  icon: FiShoppingCart,
                  label: "Store",
                }}
                active={isActive("/app/shop")}
              />
              <SidebarLink
                path={{
                  href: "/app/playerTokens",
                  icon: GiSwordsPower,
                  label: "Tokens",
                }}
                active={isActive("/app/playerTokens")}
              />
            </nav>
          </div>
          <footer className="flex items-center justify-center justify-between h-14 lg:h-[60px] border-t bg-gray-100/40 px-6 dark:bg-gray-800/40">
            <p className="text-sm font-medium">© 2024 RPG Inventory</p>
            <button onClick={() => signOut()} className="text-gray-800 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400"><FiLogOut className="h-6 w-6" /></button>
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
            className={`relative ${isDrawerOpen ? "hidden" : "block"} text-gray-800 dark:text-gray-200`}
            onClick={toggleDrawer}
          >
            <FiMenu className="h-6 w-6" />
          </button>
          <div className="w-full flex-1">
            <h1 className="font-semibold text-sm md:text-base lg:text-xl">
              {normalizeHeaderName()}
            </h1>
          </div>
          <a onClick={() => toggleTibarsInput()}>
            <Label hidden={showTibarsInput}>
              Tibars: T$ {tibars.toFixed(2).replace(".", ",")}
            </Label>
          </a>
          <div hidden={!showTibarsInput}>
            <Input
              type="number"
              value={tibars}
              min={0}
              onChange={(e) => setTibars(Number(e.target.value))}
              onBlur={() => changeTibars(tibars)}
            />
          </div>
          <ComboToken value={playerToken} setValue={setPlayerToken} />
        </header>
        {children}
      </div>
    </div>
  );
};

export default Layout;
