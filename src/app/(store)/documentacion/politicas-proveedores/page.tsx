import { checkAuthorization } from '@/authorization/check-authorization';
import {
  TypographySection,
  TypographyH2,
  TypographyH3,
  TypographyList,
} from '@/components/documentacion/typography';
import { isDemo } from '@/middleware';
import { notFound } from 'next/navigation';

export const metadata = {
  title: 'Políticas de recibimiento de productos',
};

export default async function Page() {
  await checkAuthorization();

  if (isDemo) return notFound();

  return (
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
          <strong>Revisión de productos:</strong> abrir los paquetes y confirmar
          que los artículos correspondan a los pedidos realizados (modelo,
          color, buen estado).
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
          <strong>Producto faltante:</strong> si falta algún artículo, se debe
          documentar de inmediato y notificar al proveedor.
        </li>
        <li>
          <strong>Producto incorrecto o dañado:</strong> se debe tomar evidencia
          (fotos/videos) y reportar el caso al proveedor.
        </li>
        <li>
          <strong>No entrega al cliente:</strong> ningún producto con incidencia
          debe entregarse al cliente sin una solución definida.
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
  );
}
