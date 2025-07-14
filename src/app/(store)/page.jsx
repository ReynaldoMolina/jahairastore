export const dynamic = 'force-dynamic';

import { getBusinessInfo, getTotalsDashboard } from '../lib/data';
import { Dashboard } from '../ui/dashboard/Dashboard';

export default async function Page(props) {
  const searchParams = await props.searchParams;
  const startParam = searchParams?.start;
  const endParam = searchParams?.end;
  const businessInfo = await getBusinessInfo();
  const data = await getTotalsDashboard(startParam, endParam);

  return (
    <Dashboard
      businessInfo={businessInfo}
      searchParams={searchParams}
      data={data}
    />
  );
}
