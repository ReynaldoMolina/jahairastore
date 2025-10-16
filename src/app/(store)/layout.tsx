import SideMenu from '@/components/sidemenu/side-menu';

export default function Layout({ children }) {
  return (
    <main className="flex relative flex-col md:flex-row bg-muted dark:bg-background min-h-screen">
      <SideMenu />
      <div className="flex flex-col px-2 py-4 md:px-4 gap-4 grow">
        {children}
      </div>
    </main>
  );
}
