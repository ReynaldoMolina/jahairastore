'use client';

import Image from "next/image";
import LogoMinimal from "@/app/ui/icons/logominimal.svg";

export default function Header() {
  const user = {
    username: 'Jahaira',
    pictureUrl: '/default-avatar.jpg',
  };

  return (
    <header className="flex justify-between items-center border-b-1 border-b-neutral-200 dark:border-b-neutral-700 py-1 mx-2 bg-transparent relative">
      <LogoMinimal className="size-9 p-2" />
      <h1 className="text-sm font-semibold">Jahaira Store</h1>
      <Image
        src={user.pictureUrl}
        alt="User"
        width={200}
        height={200}
        className="flex justify-center items-center cursor-pointer size-10 p-2 rounded-full hover:bg-sky-100 dark:hover:bg-neutral-700 text-xs"
        onClick={() => alert('¡Hola Jahaira!')}
      ></Image>
    </header>
  )
}