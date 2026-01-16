import { checkAuthorization } from '@/authorization/check-authorization';
import {
  TypographySection,
  TypographyH2,
  TypographyList,
  TypographyBlockquote,
} from '@/components/documentation/typography';
import { Button } from '@/components/ui/button';
import { isDemo } from '@/middleware';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export const metadata = {
  title: 'Política de pedidos de Shein',
};

export default async function Page() {
  await checkAuthorization();

  if (isDemo) return notFound();

  return (
    <TypographySection id="politicas-pedidos-shein">
      <TypographyH2>Políticas de pedidos de Shein</TypographyH2>
      <TypographyList>
        <li>
          <strong>Publicidad:</strong> anunciar al menos una vez a la semana que
          estamos aceptando pedidos. Usar WhatsApp (grupos y estados), TikTok y
          Facebook.
        </li>
        <li>
          <strong>Atención al cliente:</strong> estar atento al WhatsApp
          Business y al personal por si alguien escribe cotizando productos.
        </li>
        <li>
          <strong>Cotización:</strong> solicitar link o captura de los productos
          (es más fácil el link si estás en la compu), luego comparar los 2
          precios, el de Shein Nicaragua y el de USA. Se cotiza con el precio
          más alto.
        </li>
        <li>
          <strong>Confirmación: </strong>se procede a decirle al cliente si
          desea quitar o añadir productos o si se le manda su total. El formato
          del total es el siguiente:
          <TypographyBlockquote className="my-6">
            En total serían $25.09 <br /> La mitad es $12.55 en córdobas 464😊
          </TypographyBlockquote>
        </li>
        <li>
          <strong>Opciones de pago:</strong>
        </li>
        <Button
          variant="link"
          asChild
          className="w-full bg-secondary justify-start my-3"
        >
          <Link href="/documentacion/opciones-de-pago">
            Ver opciones de pago
            <ChevronRight className="ml-auto" />
          </Link>
        </Button>
        <li>
          <strong>Tallas: </strong>
          cuando el cliente ya envía su comprobante de pago se pide tallas (si
          es que no se la han brindado) y se ingresa al carrito de Shein.{' '}
        </li>
        <li>
          <strong>Recibo:</strong> una vez realizada la compra se procede a
          realizar el respectivo recibo que debe coincidir el total con el que
          se le brindó al cliente y en el cual escribiremos también el abono
          realizado por el cliente.
        </li>
        <li>
          <strong>Recibimiento de pedido: </strong>
          cuando el pedido viene se procede a seleccionar y ordenar los paquetes
          de cada persona, se pesa, se ingresa el peso al sistema y a la persona
          se le envía su total.
        </li>
        <li>
          <strong>Entrega: </strong>se empaca el pedido con su regalía y tarjeta
          de agradecimiento. Se coordina el día de la entrega, se consulta si
          necesitan vuelto o pagarán vía transferencia y listo, hemos concluido
          el proceso.
        </li>
      </TypographyList>
    </TypographySection>
  );
}
