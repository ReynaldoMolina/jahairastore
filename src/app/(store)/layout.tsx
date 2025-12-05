import { getServerSession } from '@/authorization/get-server-session';
import { SettingsProvider } from '@/components/settings-provider';
import { AppSideBar } from '@/components/side-bar/app-side-bar';
import { SidebarProvider } from '@/components/ui/sidebar';
import { getUserSettings } from '@/fetch-data/settings';

export default async function Layout({ children }) {
  const { user } = await getServerSession();
  const fetchedSettings = await getUserSettings(user.id);

  const userSettings = fetchedSettings || {
    menuPosition: 'left',
  };

  return (
    <SettingsProvider userSettings={userSettings}>
      <SidebarProvider className="flex flex-col md:flex-row max-h-dvh min-h-dvh">
        <AppSideBar />
        <div className="flex flex-col flex-1 overflow-auto">{children}</div>
      </SidebarProvider>
    </SettingsProvider>
  );
}
