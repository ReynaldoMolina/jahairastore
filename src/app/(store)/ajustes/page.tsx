import { Header } from '@/components/header';
import { PageWrapper } from '@/components/page-wrapper';
import { Settings } from '@/components/settings/settings';

export const metadata = {
  title: 'Ajustes',
};

export default async function Page() {
  return (
    <>
      <Header title="Ajustes" />
      <PageWrapper>
        <Settings />
      </PageWrapper>
    </>
  );
}
