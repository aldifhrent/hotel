"use client";

import React, { useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";

const Header = () => {
  const [nav, setNav] = useState(false);
  const pathname = usePathname();

  const routes = [
    {
      href: `/`,
      label: "Home",
      active: pathname === `/`,
    },
    {
      href: `/dashboard`,
      label: "Dashbaord",
      active: pathname === `/dashboard`,
    },
  ];
  return (
    <header className="p-6 bg-slate-300">
      <div className="flex justify-between text-center items-center">
        <div className="p-2">
          <h1 className="font-bold text-xl bg-black text-white p-1">Vahl Hotel</h1>
        </div>
        <nav className="hidden lg:flex gap-4 items-center text-center justify-center">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={
                (cn(
                  " text-sm font-bold transition-colors hover:text-primary"
                ),
                route.active
                  ? "text-black dark:text-white"
                  : "text-muted-foreground")
              }
            >
              {route.label}
            </Link>
          ))}
        </nav>
      </div>
      <nav
        className={
          nav
            ? "relative flex flex-col gap-y-1 mt-4 p-4 text-lg text-black/90 cursor-pointer items-center lg:hidden"
            : "hidden"
        }
      >
        {routes.map((route) => (
          <Link
            key={route.href}
            href={route.href}
            className={
              (cn(" text-sm font-medium transition-colors hover:text-primary"),
              route.active
                ? "text-black dark:text-white"
                : "text-muted-foreground")
            }
          >
            {route.label}
          </Link>
        ))}
        <Search />
      </nav>
    </header>
  );
};

export default Header;
