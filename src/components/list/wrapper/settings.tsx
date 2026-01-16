import { getSettings } from '@/fetch-data/settings';
import { AppSettingsForm } from '@/components/form/settings/app-settings';

export async function Wrapper() {
  const data = await getSettings();

  return <AppSettingsForm data={data} />;
}
