import { SettingsForm } from '@/app/ui/settings/SettingsForm';
import { ListTitle } from '@/app/ui/lists/lists';
import { getBusinessInfo } from '@/app/lib/data';

export const metadata = {
  title: 'Configuración',
};

export default async function Page() {
  const data = await getBusinessInfo();

  return (
    <>
      <SettingsForm data={data} />
    </>
  );
}
