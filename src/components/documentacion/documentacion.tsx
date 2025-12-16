import {
  TypographyBlockquote,
  TypographyH1,
  TypographyH2,
  TypographyOl,
  TypographyP,
} from './typography';

export function Documentacion() {
  return (
    <main>
      <TypographyH1>Política de realización de pedidos en Shein</TypographyH1>
      <TypographyOl>
        <li>
          Realizar publicidad que estamos aceptando pedidos en grupos de
          WhatsApp y estados, al menos una vez a la semana.
        </li>
        <li>
          Estar atento al WhatsApp business y al personal por si alguien escribe
          cotizando productos.
        </li>
        <li>
          Al momento de cotizar solicitar link o captura (es más fácil el link
          si estás en la compu) comparar los 2 precios, el shein Nic y el que yo
          tengo que es de Usa.
        </li>
        <li>
          Cuando ya se tenga el precio se le envía al cliente, siempre es el
          precio más caro.
        </li>
        <li>
          Una vez enviado se procede a decirle al cliente si desea quitar o
          añadir algo o si le mando su total, el formato del total es el
          siguiente:
          <TypographyBlockquote className="mt-2">
            En total serían $25.09 <br /> La mitad es $12.55 en córdobas 464😊
          </TypographyBlockquote>
        </li>
        <li>
          Al cliente se le da las opciones de pago si es nuevo e igual si uno
          viejo pide de nuevo el número, detallo a continuación las cuentas:
          <ol className="list-disc ml-3 mt-3">
            <li className="mb-3">
              Billetera móvil:
              <TypographyBlockquote className="mt-2">
                78679884 <br /> Reynaldo Molina <br /> Solo me envías el
                comprobante y listo. ✨
              </TypographyBlockquote>
            </li>
            <li>Cuenta lafise córdobas: 131003549</li>
            <li>Cuenta lafise dólares: 131235650</li>
          </ol>
        </li>
        <li>
          Cuando el cliente ya envía su comprobante de pago se pide tallas (si
          es que no se la han brindado) y se ingresa al carrito de shein.{' '}
        </li>
        <li>
          Una vez realizada la compra se procede a realizar el respectivo recibo
          que debe coincidir el total con el que se le brindó al cliente y en el
          cual escribiremos también el abono realizado por el cliente.
        </li>
        <li>
          Posteriormente cuando el pedido viene se procede a seleccionar y
          ordenar los paquetes de cada persona y pesar.
        </li>
        <li>
          Se ingresa el peso al sistema y a la persona se le envía su total
        </li>
        <li>Se empaca el pedido con su regalía y tarjeta de agradecimiento.</li>
        <li>
          Se coordina entrega y el día de la entrega se consulta si necesitan
          vuelto o pagarán vía transferencia y listo, hemos concluido el
          proceso.
        </li>
      </TypographyOl>

      <TypographyH1>Políticas de envío</TypographyH1>

      <TypographyH2>I. Opciones y Costos de Envío</TypographyH2>

      <div className="my-6 overflow-x-auto">
        <table className="w-full border border-border text-sm">
          <thead className="bg-muted">
            <tr>
              <th className="border px-3 py-2 text-left">Opción de Entrega</th>
              <th className="border px-3 py-2 text-left">Descripción</th>
              <th className="border px-3 py-2 text-left">Costo</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border px-3 py-2 font-medium">Punto Céntrico</td>
              <td className="border px-3 py-2">
                Recolección del paquete en un lugar céntrico predefinido (ej.
                centros comerciales, plazas).
              </td>
              <td className="border px-3 py-2">Gratis</td>
            </tr>
            <tr>
              <td className="border px-3 py-2 font-medium">
                Entrega a Domicilio
              </td>
              <td className="border px-3 py-2">
                Envío directo a la dirección proporcionada por el cliente.
              </td>
              <td className="border px-3 py-2">
                Costo adicional C$50 o calculado según zona/distancia
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <TypographyH2>
        II. Responsabilidades del Cliente para la Entrega
      </TypographyH2>

      <TypographyP>
        Para garantizar una entrega exitosa, el cliente debe proporcionar la
        siguiente información al momento de la compra:
      </TypographyP>

      <TypographyOl>
        <li>
          <strong>Información de Contacto:</strong> Nombre completo, número de
          teléfono activo (de preferencia con WhatsApp) y correo electrónico.
        </li>
        <li>
          <strong>Dirección Exacta (Solo Entrega a Domicilio):</strong>
          <ol className="list-disc ml-5 mt-2">
            <li>
              Proporcionar la dirección completa y exacta (calle, número de
              casa/apto, colonia/barrio).
            </li>
            <li>
              Incluir referencias claras (color de la casa, frente a qué
              negocio, referencias visuales, etc.).
            </li>
          </ol>
        </li>
        <li>
          <strong>Disponibilidad y Presencia:</strong>
          <ol className="list-disc ml-5 mt-2">
            <li>
              <strong>Punto Céntrico:</strong> El cliente debe estar presente a
              la hora acordada y no debe moverse del lugar hasta recibir el
              pedido.
            </li>
            <li>
              <strong>Entrega a Domicilio:</strong> Debe haber una persona
              responsable disponible para recibir el paquete.
            </li>
            <li>
              Si se autoriza a un tercero (familiar, portero, compañero de
              trabajo), debe notificarse con antelación.
            </li>
          </ol>
        </li>
        <li>
          <strong>Tolerancia de Espera:</strong> Tanto para Punto Céntrico como
          para Entrega a Domicilio, el personal esperará un máximo de 10 minutos
          en el lugar acordado.
        </li>
      </TypographyOl>

      <TypographyH2>
        III. Compromiso y Protocolo del Personal de Entrega
      </TypographyH2>

      <TypographyP>
        Para la tranquilidad y seguridad del cliente, nuestro personal de
        entrega se compromete a:
      </TypographyP>

      <TypographyOl>
        <li>
          <strong>Identificación:</strong> El repartidor proporcionará su nombre
          completo y un número de contacto (solo para emergencias de la
          entrega).
        </li>
        <li>
          <strong>Vestimenta:</strong> El personal se presentará con vestimenta
          identificable o profesional (uniforme, chaleco, prenda con logo o
          camiseta de color específico).
        </li>
        <li>
          <strong>Comunicación:</strong> El repartidor contactará al cliente con
          aproximadamente 10 minutos de antelación para confirmar su llegada.
        </li>
        <li>
          Tratar al cliente con la mayor amabilidad, poniendo siempre a la
          persona en primer lugar.
        </li>
      </TypographyOl>

      <TypographyH2>IV. Tiempos de Entrega</TypographyH2>

      <TypographyOl>
        <li>Los pedidos se preparan y se agendan con 1 día de antelación.</li>
        <li>
          La hora exacta de entrega se acordará previamente con el cliente vía
          WhatsApp o llamada.
        </li>
      </TypographyOl>

      <TypographyH2>V. Políticas por Entrega Fallida</TypographyH2>

      <TypographyP>Una entrega se considera fallida si:</TypographyP>

      <TypographyOl>
        <li>
          El personal de entrega no fue recibido después del tiempo de espera
          estipulado.
        </li>
        <li>La dirección proporcionada es incorrecta o incompleta.</li>
        <li>
          <strong>Re-envío:</strong> Si la entrega falla por causas atribuibles
          al cliente, deberá asumir un nuevo costo de envío para reprogramar la
          entrega.
        </li>
      </TypographyOl>

      <TypographyH1>Políticas de Pedido y Pago al Crédito</TypographyH1>

      <TypographyH2>I. Elegibilidad y Requisito Principal</TypographyH2>

      <TypographyP>
        El acceso a pedidos al crédito (apartado con monto menor al 50% o
        crédito completo) está reservado exclusivamente para clientes con buen
        récord de compras.
      </TypographyP>

      <TypographyP>
        <strong>Buen Récord de Compras (Perfil de Crédito Aprobado):</strong> Se
        considera que un cliente tiene buen récord si cumple con los siguientes
        requisitos mínimos:
      </TypographyP>

      <TypographyOl>
        <li>
          <strong>Antigüedad:</strong> Ha realizado al menos 2 pedidos previos y
          los ha completado exitosamente.
        </li>
        <li>
          <strong>Cumplimiento:</strong> Ha realizado el pago total de dichos
          pedidos dentro del tiempo estipulado (sin retrasos) y sin
          cancelaciones no justificadas.
        </li>
      </TypographyOl>

      <TypographyH2>II. Opciones de Crédito Disponibles</TypographyH2>

      <TypographyP>
        Para los clientes que cumplan con el perfil de crédito aprobado, se
        aplicará la siguiente política de apartado/pago inicial:
      </TypographyP>

      <div className="my-6 overflow-x-auto">
        <table className="w-full border border-border text-sm">
          <thead className="bg-muted">
            <tr>
              <th className="border px-3 py-2 text-left">
                Condición del Cliente
              </th>
              <th className="border px-3 py-2 text-left">
                Pago Inicial Mínimo Requerido para Pedir
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border px-3 py-2 font-medium">Cliente Nuevo</td>
              <td className="border px-3 py-2">
                50% del valor total del pedido (pago por adelantado).
              </td>
            </tr>
            <tr>
              <td className="border px-3 py-2 font-medium">
                Cliente con Buen Récord
              </td>
              <td className="border px-3 py-2">
                Menos del 50% del valor total del pedido (el monto exacto se
                detallará en la cotización).
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <TypographyH2>
        III. Proceso y Compromiso del Pedido al Crédito
      </TypographyH2>

      <TypographyOl>
        <li>
          <strong>Solicitud:</strong> El cliente debe informar su intención de
          realizar un pedido bajo la modalidad de crédito/apartado.
        </li>
        <li>
          <strong>Verificación:</strong> Se verificará el récord de compras y se
          confirmará el perfil de crédito del cliente.
        </li>
        <li>
          <strong>Confirmación de Pago Inicial:</strong> Una vez aprobado el
          crédito, el cliente deberá realizar el pago inicial acordado (monto
          menor al 50% del total) antes de la fecha acordada de ingreso del
          pedido.
        </li>
        <li>
          <strong>Compromiso de Pago Final:</strong> El cliente se compromete a
          liquidar el monto restante al momento de recibir la notificación de
          que el pedido ha llegado y está listo para ser entregado.
        </li>
        <li>
          <strong>Plazo Límite de Liquidación:</strong> El saldo restante debe
          ser pagado en su totalidad a más tardar 7 días después de haber sido
          notificado de la llegada del pedido.
        </li>
      </TypographyOl>

      <TypographyH2>IV. Consecuencias por Incumplimiento</TypographyH2>

      <TypographyP>
        <strong>Retraso o No Pago:</strong> Si el cliente no liquida el saldo
        restante en el plazo límite estipulado, se aplicará lo siguiente:
      </TypographyP>

      <TypographyOl>
        <li>
          <strong>Pérdida del Apartado:</strong> El monto del pago inicial (el
          porcentaje menor al 50%) no será reembolsado y se retendrá como
          penalización por incumplimiento del compromiso.
        </li>
        <li>
          <strong>Disposición de la Mercancía:</strong> Los artículos serán
          puestos a la venta para el público general.
        </li>
        <li>
          <strong>Pérdida de Beneficio:</strong> El incumplimiento de pago
          resultará en la revocación inmediata del beneficio de crédito, y todos
          los futuros pedidos requerirán el pago del 50% por adelantado
          (modalidad de Cliente Nuevo).
        </li>
      </TypographyOl>
    </main>
  );
}
