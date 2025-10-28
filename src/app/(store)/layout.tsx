import { AppSidebar } from '@/components/app-sidebar';
import SideMenu from '@/components/sidemenu/side-menu';

export default function Layout({ children }) {
  return (
    <div className="flex flex-col md:flex-row max-h-dvh min-h-dvh">
      <SideMenu />
      <div className="flex flex-col flex-1 overflow-auto">{children}</div>
    </div>
  );
}
