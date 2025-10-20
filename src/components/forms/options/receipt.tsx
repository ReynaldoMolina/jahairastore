'use client';

import { useState, useEffect } from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import ReceiptPdf from '../receipt-pdf';
import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
    <div className="flex w-full justify-around">
      <PDFDownloadLink
        document={<ReceiptPdf register={register} formName={formName} />}
        fileName={fileNames[formName]}
      >
        <ReceiptOption label="Descargar PDF" action={() => null}>
          <Download className="size-5 text-black" />
        </ReceiptOption>
      </PDFDownloadLink>
      <SendInvoiceButton id={register.Id} numero="50584271813" />
    </div>
  );
}

function ReceiptOption({ label, children, action }) {
  return (
    <button
      type="button"
      className="flex justify-center items-center bg-sky-200 hover:bg-sky-300 rounded-xl py-3 px-4 cursor-pointer shadow-xs gap-2 h-full"
      onClick={action}
    >
      {children}
      <label className="text-xs font-bold text-black cursor-pointer">
        {label}
      </label>
    </button>
  );
}

export default function SendInvoiceButton({
  id,
  numero,
}: {
  id: number;
  numero: string;
}) {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  const sendInvoice = async () => {
    try {
      setLoading(true);
      setStatus(null);

      const res = await fetch(`/api/og/pedido?recibo=${id}&numero=${numero}`, {
        method: 'POST',
      });

      const data = await res.json();

      if (data.messages) {
        setStatus('✅ Enviado correctamente por WhatsApp');
      } else {
        console.error('Error:', data);
        setStatus('❌ No se pudo enviar el mensaje');
      }
    } catch (err) {
      console.error(err);
      setStatus('⚠️ Error de conexión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button onClick={sendInvoice} disabled={loading} variant="outline">
      {loading ? 'Enviando...' : 'Enviar por WhatsApp'}
      {status && <p className="mt-2 text-sm text-gray-600">{status}</p>}
    </Button>
  );
}
