import SideMenu from "@/app/ui/sidemenu/Sidemenu";
import Header from "@/app/ui/header/Header";
import HeaderProfile from "../ui/header/HeaderProfile";
import "@/app/globals.css";

export default function Layout({ children }) {
  return (
    <main className="flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-900 h-[100dvh]">
      <SideMenu />
      <div className="flex flex-col grow">
          <Header>
            <HeaderProfile />
          </Header>
        <div className="flex flex-col p-2 gap-2 grow">
          {children}
        </div>
      </div>
    </main>
  );
}