import SideMenu from "@/app/ui/sidemenu/Sidemenu";
import Header from "@/app/ui/header/Header";
import ToggleMenuButton from "@/app/ui/header/ToggleMenuButton";
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
    <main className="flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 h-screen">
      <SideMenu />
      <div className="flex flex-col grow">
        <Header user={user}>
          <ToggleMenuButton />
        </Header>
        <div className="flex flex-col p-2 gap-2 grow">
          {children}
        </div>
      </div>
    </main>
  );
}