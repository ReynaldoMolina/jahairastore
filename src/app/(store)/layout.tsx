import { AppSideBar } from '@/components/side-bar/app-side-bar';
import { SidebarProvider } from '@/components/ui/sidebar';
import { getBusinessInfo } from '@/fetch-data/settings';
import { cookies } from 'next/headers';

export default async function Layout({ children }) {
  const cookieStore = await cookies();
  const sidebarState = cookieStore.get('sidebar_state')?.value;
  const defaultOpen = sidebarState ? sidebarState === 'true' : true;

  const businessInfo = await getBusinessInfo();

  return (
    <SidebarProvider
      defaultOpen={defaultOpen}
      className="flex flex-col md:flex-row"
    >
      <AppSideBar businessInfo={businessInfo} />
      <div className="flex relative flex-col flex-1">{children}</div>
    </SidebarProvider>
  );
}
