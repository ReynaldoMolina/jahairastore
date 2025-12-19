import { checkAuthorization } from '@/authorization/check-authorization';
import { OpcionesDePago } from '@/components/documentacion/opciones-de-pago';
import {
  TypographySection,
  TypographyH2,
} from '@/components/documentacion/typography';
import { isDemo } from '@/middleware';
import { notFound } from 'next/navigation';

export const metadata = {
  title: 'Opciones de pago',
};

export default async function Page() {
  await checkAuthorization();

  if (isDemo) return notFound();

  return (
    <>
      <TypographySection id="opciones-de-pago">
        <TypographyH2>Opciones de pago</TypographyH2>

        <OpcionesDePago />
      </TypographySection>
    </>
  );
}
