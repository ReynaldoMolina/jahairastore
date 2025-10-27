export const dynamic = 'force-dynamic';

import { checkAuthorization } from '@/authorization/check-authorization';
import { ExpenseForm } from '@/components/forms/expense';
import { PageWrapper } from '@/components/page-wrapper';
import { SiteHeader } from '@/components/site-header';
import { getExpenseById, getProvidersSelect } from '@/fetch-data/data';
import { notFound } from 'next/navigation';

export async function generateMetadata(props) {
  const { id } = await props.params;

  return {
    title: `Gasto ${id}`,
  };
}

export default async function Page(props) {
  await checkAuthorization();

  const params = await props.params;
  const id = params.id;
  const expense = await getExpenseById(id);
  const selectData = await getProvidersSelect();

  if (!expense) {
    notFound();
  }

  return (
    <>
      <SiteHeader title={`Gasto ${id}`} />
      <PageWrapper>
        <ExpenseForm isNew={false} expense={expense} selectData={selectData} />
      </PageWrapper>
    </>
  );
}
