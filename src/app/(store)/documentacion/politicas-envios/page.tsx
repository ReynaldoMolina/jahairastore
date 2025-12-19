import { checkAuthorization } from '@/authorization/check-authorization';
import {
  TypographySection,
  TypographyH2,
  TypographyH3,
  TypographyList,
} from '@/components/documentacion/typography';
import { SiteHeader } from '@/components/site-header';
import { isDemo } from '@/middleware';
import { notFound } from 'next/navigation';

export const metadata = {
  title: 'Políticas de envío',
};

export default async function Page() {
  await checkAuthorization();

  if (isDemo) return notFound();

  return (
    <>
      <TypographySection id="politicas-envio">
        <TypographyH2>Políticas de envío</TypographyH2>
        <TypographyH3>Opciones y costos de envío</TypographyH3>

        <div className="my-6 overflow-x-auto">
          <table className="w-full border border-border text-sm">
            <thead className="bg-muted">
              <tr>
                <th className="border px-3 py-2 text-left">Lugar de Entrega</th>
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
            como para entrega a domicilio, el personal esperará un máximo de 15
            minutos en el lugar acordado.
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
            vestimenta identificable, proporcionar color de camiseta, pantalón,
            etc.
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
          <li>Los pedidos se preparan y se agendan con 1 día de antelación.</li>
          <li>
            La hora exacta de entrega se acordará previamente con el cliente.
          </li>
        </TypographyList>
      </TypographySection>
    </>
  );
}
