'use client';

import { useState, useEffect } from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import ReceiptPdf from '../ReceiptPdf';
import DownloadIcon from '@/app/ui/icons/download.svg';

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
        <ReceiptOption label="Descargar PDF">
          <DownloadIcon className="size-5 text-black" />
        </ReceiptOption>
      </PDFDownloadLink>
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
