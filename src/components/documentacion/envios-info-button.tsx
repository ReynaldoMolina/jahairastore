'use client';

import { toast } from 'sonner';
import { Button } from '../ui/button';
import { Copy } from 'lucide-react';

export function EnviosInfoButton() {
  return (
    <Button
      variant="outline"
      className="w-full"
      onClick={async () => {
        await navigator.clipboard.writeText(
          `*_OPCIONES DE ENVÍO_*\n\n` +
            `*Punto céntrico*\n` +
            `- Plaza de Sutiava, Parque central\n` +
            `- Gratis\n\n` +
            // `_Nota: favor no moverse del lugar hasta recibir el pedido._\n\n` +
            `*Entrega a domicilio*\n` +
            `- Costo adicional C$50 o según distancia \n` +
            `- Proporcionar la dirección exacta (barrio, número de casa).\n` +
            `- Incluir referencias visuales (color de la casa, frente a qué negocio).\n` +
            `- Si se autoriza a un familiar u otra persona favor notificar con antelación.`
        );
        toast.info('Se copió al portapapeles');
      }}
    >
      <Copy />
      Copiar información
    </Button>
  );
}
