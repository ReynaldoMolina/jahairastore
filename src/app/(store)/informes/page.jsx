import { getTotalsDashboard } from '@/app/lib/data';
import { Dashboard } from '@/app/ui/reports/Dashboard';

export default async function Page(props) {
  const searchParams = await props.searchParams;
  const startParam = searchParams?.start;
  const endParam = searchParams?.end;
  const data = await getTotalsDashboard(startParam, endParam);

  return <Dashboard searchParams={searchParams} data={data} />;
}
