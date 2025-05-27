'use client';
import { useState, useEffect } from "react";

import { PDFDownloadLink } from "@react-pdf/renderer";
import ReceiptPdf from "@/app/ui/ReceiptPdf/index";
import DownloadIcon from "@/app/ui/forms/icons/download.svg";

export function ReceiptOptions({ receipt }) {
  const [client, setClient] = useState(false);

  useEffect(() => {
    setClient(true);
  }, []);

  return (
    <div className="flex w-full justify-around">
      <PDFDownloadLink
      document={<ReceiptPdf receipt={receipt}/>}
      fileName={`Recibo ${receipt.Id_venta} Pedido ${receipt.Id_pedido} ${receipt.Nombre} ${receipt.Apellido}`}>
        <FormOption label="Descargar PDF" >
          <DownloadIcon className="size-5 text-black" />
        </FormOption>
      </PDFDownloadLink>
    </div>
  );
}

export function FormOption({ label, children, action }) {
  return (
    <button
      type="button"
      className="flex justify-center items-center bg-sky-200 rounded-xl px-3 py-2 cursor-pointer shadow-xs gap-2"
      onClick={action}>
      {children}
      <label className="text-xs font-semibold text-black cursor-pointer">
        {label}
      </label>
    </button>
  )
}