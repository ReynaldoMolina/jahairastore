import { checkAuthorization } from '@/authorization/check-authorization';
import { EditExpenseForm } from '@/components/forms/expense/edit';
import { PageWrapper } from '@/components/page-wrapper';
import { SiteHeader } from '@/components/header/site-header';
import { getExpenseById } from '@/fetch-data/expenses';
import { PageProps } from '@/types/types';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;

  return {
    title: `Gasto ${id}`,
  };
}

export default async function Page({ params }: PageProps) {
  await checkAuthorization();

  const { id } = await params;
  const expense = await getExpenseById(id);

  if (!expense) {
    notFound();
  }

  return (
    <>
      <SiteHeader title={`Gasto ${id}`} />
      <PageWrapper>
        <EditExpenseForm expense={expense} />
      </PageWrapper>
    </>
  );
}
