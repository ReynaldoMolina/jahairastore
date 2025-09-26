import { getTotalsDashboard } from '@/fetch-data/data';
import { ListTitle } from '@/components/lists/lists';
import { Dashboard } from '@/components/reports/Dashboard';

export const metadata = {
  title: 'Informes',
};

export default async function Page(props) {
  const searchParams = await props.searchParams;
  const startParam = searchParams?.start;
  const endParam = searchParams?.end;
  const data = await getTotalsDashboard(startParam, endParam);

  return (
    <>
      <ListTitle title="Informes" />
      <Dashboard searchParams={searchParams} data={data} />
    </>
  );
}
