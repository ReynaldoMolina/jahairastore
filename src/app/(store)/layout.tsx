import { AppSideBar } from '@/components/side-bar/app-side-bar';
import { SidebarProvider } from '@/components/ui/sidebar';

export default function Layout({ children }) {
  return (
    <SidebarProvider className="flex flex-col md:flex-row max-h-dvh min-h-dvh">
      <AppSideBar />
      <div className="flex flex-col flex-1 overflow-auto">{children}</div>
    </SidebarProvider>
  );
}
