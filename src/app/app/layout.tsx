"use client";

import Link from "next/link";
import React, { PropsWithChildren, useEffect, useState } from "react";
import { FiBox, FiHome, FiLogOut, FiMenu, FiPackage, FiShoppingCart, FiX } from "react-icons/fi";
import { GiSwordsPower } from "react-icons/gi";
import { usePathname } from "next/navigation";
import SidebarLink from "@/app/app/_components/SidebarLink";
import ComboToken from "@/components/shared/ComboToken";

import { usePlayerToken } from "@/contexts/UserTokensContext";
import { signOut } from "next-auth/react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { getPlayerTokenTibars, updatePlayerTibars } from "./playerTokens/actions";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";

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
        return "Loja";
      case "/app/playerTokens":
        return "Tokens";
      default:
        return "Inventário";
    }
  }

  return (
    <div className="flex min-h-screen w-full">
      <div
        className={`${isDrawerOpen ? "fixed" : "hidden"} border-r flex flex-col`}
      >
        <div
          className={cn(
            `flex fixed h-[100vh] min-h-screen flex-col gap-2 flex-end bg-gray-100/40 dark:bg-gray-800/40 border-r w-[20rem]`,
            isDrawerOpen ? "fixed" : "hidden"
          )}
        >
          <div className="flex h-[60px] items-center border-b px-6 justify-between bg-gray-100 dark:bg-gray-800 border-r border-gray-100/40 dark:border-gray-700/40">
            <Link className="flex items-center gap-2 font-semibold text-sm md:text-base lg:text-xl" href="#">
              <FiPackage className="h-6 w-6" />
              <span>RPG inventory</span>
            </Link>
            <button
              className="text-gray-800 dark:text-gray-200"
              onClick={toggleDrawer}
            >
              <FiX className="h-6 w-6" />
            </button>
          </div>
          <div className="flex-1 overflow-auto py-2">
            <nav className="grid items-start px-4 text-sm font-medium gap-2">
              <div className="mx-4 text-sm text-gray-600 dark:text-gray-400 flex flex-col gap-2 mt-2">
                <Label>Personagem</Label>
                <Separator />
              </div>
              <SidebarLink
                path={{
                  href: "/app/dashboard",
                  icon: FiPackage,
                  label: "Inventário",
                }}
                active={isActive("/app/dashboard")}
              />
              <SidebarLink
                path={{
                  href: "/app/shop",
                  icon: FiShoppingCart,
                  label: "Loja",
                }}
                active={isActive("/app/shop")}
              />
              <div className="mx-4 text-sm text-gray-600 dark:text-gray-400 flex flex-col gap-2 mt-2">
                <Label>Jogador</Label>
                <Separator />
              </div>
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
          <div className="mx-4 text-sm text-gray-600 dark:text-gray-400 flex flex-col gap-2">
            <Separator />
          </div>
          <div className="flex flex-col gap-2 m-4">
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
          </div>
        </div>
      </div>
      <div className="flex flex-col w-full">
        <header className={cn("flex fixed h-[60px] items-center gap-4 border bg-gray-100 px-6 dark:bg-gray-800 z-10 border-b-gray-700",
          isDrawerOpen ? "left-[20rem] right-0" : "w-full"
        )}>
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
          <button onClick={() => signOut()} className="text-gray-800 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400"><FiLogOut className="h-6 w-6" /></button>
        </header>
        <div className={cn("mt-14", isDrawerOpen ? "ml-[20rem]" : "ml-0")}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
