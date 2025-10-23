'use client';

import { useState, useEffect } from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import ReceiptPdf from '../receipt-pdf';
import { Download, MessageCircle, ShieldAlertIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from '@/components/ui/item';
import { toast } from 'sonner';

export function ReceiptOptions({ register, formName }) {
  const [client, setClient] = useState(false);

  useEffect(() => {
    setClient(true);
  }, []);

  const fileNames = {
    pedidos: `Recibo ${register.Id} Pedido ${register.Id_pedido} ${register.Nombre} ${register.Apellido}`,
    ventas: `Venta ${register.Id} ${register.Nombre} ${register.Apellido}`,
  };

  return (
    <div className="flex flex-col w-full gap-3 mt-3">
      <Item variant="outline">
        <ItemMedia variant="icon">
          <Download />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Descargar recibo</ItemTitle>
          <ItemDescription>Descarga el recibo en PDF.</ItemDescription>
        </ItemContent>
        <ItemActions>
          <PDFDownloadLink
            document={<ReceiptPdf register={register} formName={formName} />}
            fileName={fileNames[formName]}
          >
            <Button size="sm" type="button" variant="outline">
              Descargar
            </Button>
          </PDFDownloadLink>
        </ItemActions>
      </Item>
      <Item variant="outline">
        <ItemMedia variant="icon">
          <MessageCircle />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Enviar recibo</ItemTitle>
          <ItemDescription>
            Envía el recibo por WhatsApp. (Función en fase de prueba)
          </ItemDescription>
        </ItemContent>
        <ItemActions>
          <SendInvoiceButton
            reciboId={register.Id}
            numero="50584271813"
            cliente="Reynaldo"
          />
        </ItemActions>
      </Item>
    </div>
  );
}

export default function SendInvoiceButton({
  reciboId,
  numero,
  cliente,
}: {
  reciboId: number;
  numero: string;
  cliente: string;
}) {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  const sendInvoice = async () => {
    try {
      setLoading(true);
      setStatus(null);

      const res = await fetch(`/api/whatsapp/pedido`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phoneNumber: numero,
          nombreCliente: cliente,
          reciboId,
        }),
      });

      const data = await res.json();

      if (data.success) {
        const description = 'Recibo enviado correctamente.';
        setStatus(description);
        toast.success('Enviado', { description });
      } else {
        console.error('Error:', data);
        const description = 'No se pudo enviar el recibo.';
        setStatus(description);
        toast.error('Error', { description });
      }
    } catch (err) {
      console.error(err);
      const description = 'Error de conexión.';
      setStatus(description);
      toast.error('Error', { description });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button onClick={sendInvoice} disabled={loading} variant="outline">
      {loading ? 'Enviando...' : 'Enviar'}
    </Button>
  );
}
