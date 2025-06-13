import SideMenu from "@/app/ui/sidemenu/Sidemenu";
import "@/app/globals.css";
import Header from "../ui/header/Header";

export default function Layout({ children }) {
  return (
    <main className="flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-900 h-[100dvh]">
      <SideMenu />
      <div className="flex flex-col p-2 gap-2 grow">
        <Header />
        {children}
      </div>
    </main>
  );
}