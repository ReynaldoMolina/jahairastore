'use client';

import { Copy } from 'lucide-react';
import {
  TypographyBlockquote,
  TypographyH1,
  TypographyH2,
  TypographyH3,
  TypographyList,
  TypographyP,
  TypographySection,
} from './typography';
import { Button } from '../ui/button';
import { toast } from 'sonner';
import Link from 'next/link';
import { useRef } from 'react';
import { GoToTop } from './go-to-top';

export function Documentacion() {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={scrollRef}
      className="flex relative flex-1 p-3 overflow-auto gap-3"
    >
      <div className="max-w-2xl mx-auto">
        <TypographyH1>Documentación de la tienda</TypographyH1>
        <TypographyP className="text-muted-foreground">
          Modificado el 16 diciembre 2025
        </TypographyP>

        <div className="flex flex-col gap-2 my-6">
          <span className="text-sm text-muted-foreground border-b pb-1">
            Menú
          </span>
          <div>
            <MenuButton
              title="Políticas de pedidos de Shein"
              href="#politicas-pedidos-shein"
            />
            <MenuButton title="Políticas de envío" href="#politicas-envio" />
            <MenuButton
              title="Políticas de crédito"
              href="#politicas-credito"
            />
            <MenuButton
              title="Políticas de recibimiento de productos"
              href="#politicas-recibimiento-proveedores"
            />
          </div>
        </div>

        <TypographySection id="politicas-pedidos-shein">
          <TypographyH2>Políticas de pedidos de Shein</TypographyH2>
          <TypographyList>
            <li>
              <strong>Publicidad:</strong> anunciar al menos una vez a la semana
              que estamos aceptando pedidos. Usar WhatsApp (grupos y estados),
              TikTok y Facebook.
            </li>
            <li>
              <strong>Atención al cliente:</strong> estar atento al WhatsApp
              Business y al personal por si alguien escribe cotizando productos.
            </li>
            <li>
              <strong>Cotización:</strong> solicitar link o captura de los
              productos (es más fácil el link si estás en la compu), luego
              comparar los 2 precios, el de Shein Nicaragua y el de USA. Se
              cotiza con el precio más alto.
            </li>
            <li>
              <strong>Confirmación: </strong>se procede a decirle al cliente si
              desea quitar o añadir productos o si se le manda su total. El
              formato del total es el siguiente:
              <TypographyBlockquote className="my-6">
                En total serían $25.09 <br /> La mitad es $12.55 en córdobas
                464😊
              </TypographyBlockquote>
            </li>
            <li>
              <strong>Opciones de pago:</strong>
            </li>
            <div className="my-6 overflow-auto">
              <table className="w-full border border-border text-sm">
                <thead className="bg-muted">
                  <tr>
                    <th className="border px-3 py-2 text-left max-w-fit">
                      Método
                    </th>
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
              cuando el cliente ya envía su comprobante de pago se pide tallas
              (si es que no se la han brindado) y se ingresa al carrito de
              Shein.{' '}
            </li>
            <li>
              <strong>Recibo:</strong> una vez realizada la compra se procede a
              realizar el respectivo recibo que debe coincidir el total con el
              que se le brindó al cliente y en el cual escribiremos también el
              abono realizado por el cliente.
            </li>
            <li>
              <strong>Recibimiento de pedido: </strong>
              cuando el pedido viene se procede a seleccionar y ordenar los
              paquetes de cada persona, se pesa, se ingresa el peso al sistema y
              a la persona se le envía su total.
            </li>
            <li>
              <strong>Entrega: </strong>se empaca el pedido con su regalía y
              tarjeta de agradecimiento. Se coordina el día de la entrega, se
              consulta si necesitan vuelto o pagarán vía transferencia y listo,
              hemos concluido el proceso.
            </li>
          </TypographyList>
        </TypographySection>

        <TypographySection id="politicas-envio">
          <TypographyH2>Políticas de envío</TypographyH2>
          <TypographyH3>Opciones y costos de envío</TypographyH3>

          <div className="my-6 overflow-x-auto">
            <table className="w-full border border-border text-sm">
              <thead className="bg-muted">
                <tr>
                  <th className="border px-3 py-2 text-left">
                    Lugar de Entrega
                  </th>
                  <th className="border px-3 py-2 text-left">Descripción</th>
                  <th className="border px-3 py-2 text-left">Costo</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border px-3 py-2">Punto céntrico</td>
                  <td className="border px-3 py-2">
                    Centros comerciales, plazas, parques, etc.
                  </td>
                  <td className="border px-3 py-2">Gratis</td>
                </tr>
                <tr>
                  <td className="border px-3 py-2">Entrega a domicilio</td>
                  <td className="border px-3 py-2">
                    Envío directo a la dirección proporcionada por el cliente.
                  </td>
                  <td className="border px-3 py-2">
                    Costo adicional C$50 o según distancia
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <TypographyH3>
            Responsabilidades del cliente para la entrega
          </TypographyH3>

          <TypographyList>
            <li>
              <strong>Entrega a domicilio:</strong>
              <TypographyList>
                <li>
                  Proporcionar la dirección completa y exacta (calle, número de
                  casa, barrio).
                </li>
                <li>
                  Incluir referencias visuales (color de la casa, frente a qué
                  negocio, etc.).
                </li>
                <li>
                  Si se autoriza a un tercero (familiar, portero, compañero de
                  trabajo), debe notificarse con antelación.
                </li>
              </TypographyList>
            </li>
            <li>
              <strong>Punto céntrico:</strong>
              <TypographyList>
                <li>
                  El cliente debe estar presente a la hora acordada y no debe
                  moverse del lugar hasta recibir el pedido.
                </li>
              </TypographyList>
            </li>
            <li>
              <strong>Tolerancia de espera:</strong> tanto para punto céntrico
              como para entrega a domicilio, el personal esperará un máximo de
              15 minutos en el lugar acordado.
            </li>
          </TypographyList>

          <TypographyH3>Responsabilidades del personal de entrega</TypographyH3>

          <TypographyList>
            <li>
              <strong>Identificación:</strong> el repartidor proporcionará su
              nombre y un número de contacto.
            </li>
            <li>
              <strong>Vestimenta:</strong> el personal se presentará con
              vestimenta identificable, proporcionar color de camiseta,
              pantalón, etc.
            </li>
            <li>
              <strong>Comunicación:</strong> el repartidor contactará al cliente
              con aproximadamente 20 minutos de antelación para confirmar su
              llegada.
            </li>
            <li>
              <strong>Atención: </strong>tratar al cliente con la mayor
              amabilidad, poniendo siempre a la persona en primer lugar.
            </li>
          </TypographyList>

          <TypographyH3>Tiempos de entrega</TypographyH3>

          <TypographyList>
            <li>
              Los pedidos se preparan y se agendan con 1 día de antelación.
            </li>
            <li>
              La hora exacta de entrega se acordará previamente con el cliente.
            </li>
          </TypographyList>
        </TypographySection>

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
              <strong>Antigüedad:</strong> Ha realizado al menos 2 pedidos
              previos y los ha completado exitosamente.
            </li>
            <li>
              <strong>Cumplimiento:</strong> Ha realizado el pago total de
              dichos pedidos dentro del tiempo estipulado (sin retrasos) y sin
              cancelaciones no justificadas.
            </li>
          </TypographyList>

          <TypographyH3>Proceso del pedido al crédito</TypographyH3>

          <TypographyList>
            <li>
              <strong>Verificación:</strong> se verificará el récord de compras
              y se confirmará el perfil de crédito del cliente.
            </li>
            <li>
              <strong>Pago inicial:</strong> una vez aprobado el crédito, el
              cliente deberá realizar el pago inicial acordado antes de la fecha
              acordada de ingreso del pedido.
            </li>
            <li>
              <strong>Compromiso de pago final:</strong> el cliente se
              compromete a liquidar el monto restante al momento de recibir la
              notificación de que el pedido ha llegado y está listo para ser
              entregado.
            </li>
            <li>
              <strong>Plazo límite de liquidación:</strong> el saldo restante
              debe ser pagado en su totalidad a más tardar 7 días después de
              haber sido notificado de la llegada del pedido.
            </li>
          </TypographyList>

          <TypographyH3>Consecuencias por incumplimiento</TypographyH3>

          <TypographyP>
            Si el cliente no liquida el saldo restante en el plazo límite
            estipulado, se aplicará lo siguiente:
          </TypographyP>

          <TypographyList>
            <li>
              <strong>Pérdida del apartado:</strong> el monto del pago inicial
              no será reembolsado y se retendrá como penalización por
              incumplimiento del compromiso.
            </li>
            <li>
              <strong>Disposición de la mercancía:</strong> los artículos serán
              puestos a la venta para el público general.
            </li>
            <li>
              <strong>Pérdida de beneficio:</strong> El incumplimiento de pago
              resultará en la revocación inmediata del beneficio de crédito, y
              todos los futuros pedidos requerirán el pago del 50% por
              adelantado.
            </li>
          </TypographyList>
        </TypographySection>

        <TypographySection id="politicas-recibimiento-proveedores">
          <TypographyH2>
            Políticas de recibimiento de productos con proveedores
          </TypographyH2>

          <TypographyH3>Recepción inicial del pedido</TypographyH3>

          <TypographyList>
            <li>
              <strong>Notificación de llegada:</strong> una vez que el proveedor
              notifica que el pedido está listo, se debe coordinar el día y hora
              para su recepción.
            </li>
          </TypographyList>

          <TypographyH3>Verificación de productos</TypographyH3>

          <TypographyList>
            <li>
              <strong>Conteo:</strong> se debe verificar que la cantidad de
              productos recibidos coincida con lo indicado por el proveedor.
            </li>
            <li>
              <strong>Revisión de productos:</strong> abrir los paquetes y
              confirmar que los artículos correspondan a los pedidos realizados
              (modelo, color, buen estado).
            </li>
          </TypographyList>

          <TypographyH3>Registro en el sistema</TypographyH3>

          <TypographyList>
            <li>
              Se deben ingresar los productos al sistema interno junto con la
              cantidad recibida y precios de compra y venta.
            </li>
          </TypographyList>

          <TypographyH3>Manejo de incidencias</TypographyH3>

          <TypographyList>
            <li>
              <strong>Producto faltante:</strong> si falta algún artículo, se
              debe documentar de inmediato y notificar al proveedor.
            </li>
            <li>
              <strong>Producto incorrecto o dañado:</strong> se debe tomar
              evidencia (fotos/videos) y reportar el caso al proveedor.
            </li>
            <li>
              <strong>No entrega al cliente:</strong> ningún producto con
              incidencia debe entregarse al cliente sin una solución definida.
            </li>
          </TypographyList>

          <TypographyH3>Custodia y almacenamiento</TypographyH3>

          <TypographyList>
            <li>
              <strong>Resguardo:</strong> los productos deben almacenarse en un
              lugar limpio, seguro y organizado.
            </li>
          </TypographyList>
        </TypographySection>
        <div className="h-15"></div>
      </div>

      <GoToTop scrollRef={scrollRef} />
    </div>
  );
}

interface MenuButtonProps {
  title: string;
  href: string;
}

function MenuButton({ title, href }: MenuButtonProps) {
  return (
    <Button variant="link" size="sm" className="w-full justify-start" asChild>
      <Link href={href} className="block w-full truncate">
        {title}
      </Link>
    </Button>
  );
}
