'use client';

import { useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image"
import HeaderProfile from "@/app/ui/header/HeaderProfile";
import { menuOptions } from "@/app/lib/menuOptions";

export default function Header({ children, user }) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const pathname = usePathname();
  const activeOption = menuOptions.find((option) => option.url === pathname);

  return (
    <header className="flex justify-between border-b-1 border-b-neutral-200 dark:border-b-neutral-700 py-1 mx-2 bg-transparent relative">
      {children}
      <h1 className="flex items-center font-semibold text-sm">{activeOption.name}</h1>
      <Image
        src={user.pictureUrl}
        alt="User"
        width={200}
        height={200}
        className="flex justify-center items-center cursor-pointer size-10 p-2 rounded-full hover:bg-sky-100 dark:hover:bg-neutral-700 text-xs"
        onClick={() => setIsProfileOpen(state => !state)}
      ></Image>
      <HeaderProfile user={user} isProfileOpen={isProfileOpen} setIsProfileOpen={setIsProfileOpen} />
    </header>
  )
}