import SideMenu from '@/components/sidemenu/Sidemenu';
import '@/app/globals.css';

export default function Layout({ children }) {
  return (
    <main className="flex relative flex-col md:flex-row bg-gray-100 dark:bg-black min-h-screen">
      <SideMenu />
      <div className="flex flex-col px-2 py-4 md:px-4 gap-4 grow">
        {children}
      </div>
    </main>
  );
}
