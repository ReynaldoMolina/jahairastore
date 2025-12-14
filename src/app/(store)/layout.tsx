import { AppSideBar } from '@/components/side-bar/app-side-bar';
import { SidebarProvider } from '@/components/ui/sidebar';
import { cookies } from 'next/headers';

export default async function Layout({ children }) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get('sidebar_state')?.value === 'true';

  return (
    <SidebarProvider
      defaultOpen={defaultOpen}
      className="flex flex-col md:flex-row max-h-dvh min-h-dvh"
    >
      <AppSideBar />
      <div className="flex flex-col flex-1 overflow-auto">{children}</div>
    </SidebarProvider>
  );
}
