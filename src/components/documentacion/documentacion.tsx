'use client';

import { Copy } from 'lucide-react';
import {
  TypographyBlockquote,
  TypographyH2,
  TypographyList,
  TypographySection,
} from './typography';
import { Button } from '../ui/button';
import { toast } from 'sonner';

export function Documentacion() {
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
        <div className="my-6 overflow-auto">
          <table className="w-full border border-border text-sm">
            <thead className="bg-muted">
              <tr>
                <th className="border px-3 py-2 text-left max-w-fit">Método</th>
                <th className="border px-3 py-2 text-left">Detalle</th>
                <th className="border px-3 py-2 text-left"></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border px-3 py-2">Billetera Móvil</td>
                <td className="px-3 py-2 border">
                  7867 9884 <br /> Reynaldo Molina
                </td>
                <td className="p-2 border">
                  <Button
                    variant="outline"
                    size="icon-sm"
                    onClick={async () => {
                      await navigator.clipboard.writeText(
                        `_Billetera móvil_\n\n` +
                          `*Número:* 7867 9884\n` +
                          `*A nombre de:* Reynaldo Molina\n\n` +
                          `Me envías el comprobante y listo ✨`
                      );
                      toast.info('Se copió al portapapeles');
                    }}
                  >
                    <Copy />
                  </Button>
                </td>
              </tr>
              <tr>
                <td className="border px-3 py-2">Lafise córdobas</td>
                <td className="px-3 py-2 border">
                  131 003 549
                  <br /> Jahaira Sevilla
                </td>
                <td className="p-2 border">
                  <Button
                    variant="outline"
                    size="icon-sm"
                    onClick={async () => {
                      await navigator.clipboard.writeText(
                        `_Lafise Córdobas_\n\n` +
                          `*Titular:* Jahaira del Socorro Picado Sevilla\n` +
                          `*Cuenta:* 131 003 549`
                      );
                      toast.info('Se copió al portapapeles');
                    }}
                  >
                    <Copy />
                  </Button>
                </td>
              </tr>
              <tr>
                <td className="border px-3 py-2">Lafise dólares</td>
                <td className="px-3 py-2 border">
                  131 235 650
                  <br /> Jahaira Sevilla
                </td>
                <td className="p-2 border">
                  <Button
                    variant="outline"
                    size="icon-sm"
                    onClick={async () => {
                      await navigator.clipboard.writeText(
                        `_Lafise Dólares_\n\n` +
                          `*Titular:* Jahaira del Socorro Picado Sevilla\n` +
                          `*Cuenta:* 131 235 650`
                      );
                      toast.info('Se copió al portapapeles');
                    }}
                  >
                    <Copy />
                  </Button>
                </td>
              </tr>
              <tr>
                <td className="border px-3 py-2">Banpro dólares</td>
                <td className="px-3 py-2 border">
                  1002 0210 2138 35
                  <br /> Reynaldo Molina
                </td>
                <td className="p-2 border">
                  <Button
                    variant="outline"
                    size="icon-sm"
                    onClick={async () => {
                      await navigator.clipboard.writeText(
                        `_Banpro Dólares_\n\n` +
                          `*Titular:* Reynaldo Antonio Molina Castillo\n` +
                          `*Cuenta:* 1002 0210 2138 35`
                      );
                      toast.info('Se copió al portapapeles');
                    }}
                  >
                    <Copy />
                  </Button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
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
