import Link from "next/link";
import SideMenuIcon from "@/app/ui/sidemenu/SideMenuIcon/sidemenuicon";
import { usePathname } from "next/navigation";

export function MenuItem({ option }) {
  const pathname = usePathname();
  const isActive = option.path === "/"
  ? pathname === "/"
  : pathname.includes(option.path);

  return (
    <Link
      href={option.url}
      className={`flex flex-col md:flex-row md:w-8/10 md:min-h-11 justify-center md:justify-start items-center cursor-pointer rounded-xl mx-auto hover:bg-sky-100 dark:hover:bg-neutral-600 gap-1 md:gap-3 py-2 md:py-0 px-3 md:px-3 text-xs md:text-md text-center transition ${isActive ? "bg-sky-100 dark:bg-neutral-600" : ""}`}
    >
      <SideMenuIcon name={option.name} />
      {option.name}
    </Link>
  );
}