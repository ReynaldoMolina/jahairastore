import SideMenu from '@/components/sidemenu/side-menu';

export default function Layout({ children }) {
  return (
    <main className="flex flex-col md:flex-row bg-background min-h-screen max-h-screen">
      <SideMenu />
      <div className="flex flex-col p-3 gap-3 flex-1 overflow-auto">
        {children}
      </div>
    </main>
  );
}
