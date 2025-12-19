import { checkAuthorization } from '@/authorization/check-authorization';
import {
  TypographySection,
  TypographyH2,
  TypographyH3,
  TypographyList,
  TypographyP,
} from '@/components/documentacion/typography';
import { isDemo } from '@/middleware';
import { notFound } from 'next/navigation';

export const metadata = {
  title: 'Políticas de crédito',
};

export default async function Page() {
  await checkAuthorization();

  if (isDemo) return notFound();

  return (
    <>
      <TypographySection id="politicas-credito">
        <TypographyH2>Políticas de crédito</TypographyH2>

        <TypographyH3>Elegibilidad</TypographyH3>

        <TypographyP>
          El acceso a pedidos al crédito está reservado exclusivamente para
          clientes con buen récord de compras.
        </TypographyP>

        <TypographyP>
          <strong>Buen récord de compras:</strong> Se considera que un cliente
          tiene buen récord si cumple con los siguientes requisitos mínimos:
        </TypographyP>

        <TypographyList>
          <li>
            <strong>Antigüedad:</strong> Ha realizado al menos 2 pedidos previos
            y los ha completado exitosamente.
          </li>
          <li>
            <strong>Cumplimiento:</strong> Ha realizado el pago total de dichos
            pedidos dentro del tiempo estipulado (sin retrasos) y sin
            cancelaciones no justificadas.
          </li>
        </TypographyList>

        <TypographyH3>Proceso del pedido al crédito</TypographyH3>

        <TypographyList>
          <li>
            <strong>Verificación:</strong> se verificará el récord de compras y
            se confirmará el perfil de crédito del cliente.
          </li>
          <li>
            <strong>Pago inicial:</strong> una vez aprobado el crédito, el
            cliente deberá realizar el pago inicial acordado antes de la fecha
            acordada de ingreso del pedido.
          </li>
          <li>
            <strong>Compromiso de pago final:</strong> el cliente se compromete
            a liquidar el monto restante al momento de recibir la notificación
            de que el pedido ha llegado y está listo para ser entregado.
          </li>
          <li>
            <strong>Plazo límite de liquidación:</strong> el saldo restante debe
            ser pagado en su totalidad a más tardar 7 días después de haber sido
            notificado de la llegada del pedido.
          </li>
        </TypographyList>

        <TypographyH3>Consecuencias por incumplimiento</TypographyH3>

        <TypographyP>
          Si el cliente no liquida el saldo restante en el plazo límite
          estipulado, se aplicará lo siguiente:
        </TypographyP>

        <TypographyList>
          <li>
            <strong>Pérdida del apartado:</strong> el monto del pago inicial no
            será reembolsado y se retendrá como penalización por incumplimiento
            del compromiso.
          </li>
          <li>
            <strong>Disposición de la mercancía:</strong> los artículos serán
            puestos a la venta para el público general.
          </li>
          <li>
            <strong>Pérdida de beneficio:</strong> El incumplimiento de pago
            resultará en la revocación inmediata del beneficio de crédito, y
            todos los futuros pedidos requerirán el pago del 50% por adelantado.
          </li>
        </TypographyList>
      </TypographySection>
    </>
  );
}
