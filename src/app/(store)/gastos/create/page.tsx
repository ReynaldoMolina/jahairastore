import { checkAuthorization } from '@/authorization/check-authorization';
import { ExpenseForm } from '@/components/forms/expense';
import { PageWrapper } from '@/components/page-wrapper';
import { SiteHeader } from '@/components/site-header';
import { getProvidersSelect } from '@/fetch-data/data';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Crear gasto',
};

export default async function Page(props) {
  await checkAuthorization();

  const searchParams = await props.searchParams;
  const selectData = await getProvidersSelect();

  return (
    <>
      <SiteHeader title="Crear gasto" />
      <PageWrapper>
        <ExpenseForm
          isNew={true}
          searchParams={searchParams}
          selectData={selectData}
        />
      </PageWrapper>
    </>
  );
}
