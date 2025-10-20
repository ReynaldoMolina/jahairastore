import SideMenu from '@/components/sidemenu/side-menu';

export default function Layout({ children }) {
  return (
    <main className="flex flex-col md:flex-row bg-muted dark:bg-background min-h-screen max-h-screen">
      <SideMenu />
      <div className="flex flex-col px-2 py-4 md:px-4 gap-4 flex-1 overflow-auto">
        {children}
      </div>
    </main>
  );
}
