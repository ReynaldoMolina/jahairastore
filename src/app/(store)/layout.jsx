import SideMenu from "@/app/ui/sidemenu/Sidemenu";
import Header from "@/app/ui/header/Header";
import ToggleMenuButton from "@/app/ui/header/ToggleMenuButton";
import { menuOptions } from "@/app/lib/menuOptions";
import "@/app/globals.css";

export const metadata = {
  title: "Jahaira Store",
  description: "Store management system",
};

const user = {
  username: 'Reynaldo',
  pictureUrl: 'https://lh3.googleusercontent.com/ogw/AF2bZyjG_cSPuxnR0fNtDzSndXzPIy3-GzgtoIqJcc2Z03fOpDc=s32-c-mo',
}

export default function Layout({ children }) {
  return (
    <main className="flex flex-col sm:flex-row h-screen bg-gray-100 dark:bg-neutral-800">
      <SideMenu />
      <section className="flex flex-col size-full">
        <Header user={user}>
          <ToggleMenuButton />
        </Header>
        <div className="p-2 h-full">
          {children}
        </div>
      </section>
    </main>
  );
}