'use client';

import { Copy } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '../ui/button';

export function OpcionesDePago() {
  return (
    <table className="w-full border border-border text-sm">
      <thead className="bg-muted">
        <tr>
          <th className="border px-3 py-2 text-left">Método</th>
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
  );
}
