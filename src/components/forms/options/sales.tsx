'use client';

import { useState, useEffect } from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import ReceiptPdf from '../receipt-pdf';
import { ChevronRightIcon, Download } from 'lucide-react';
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from '@/components/ui/item';
import { SaleById } from '@/types/types';

interface SaleOptions {
  sale: SaleById;
}

export function SaleOptions({ sale }: SaleOptions) {
  const [client, setClient] = useState(false);

  console.log(sale);

  useEffect(() => {
    setClient(true);
  }, []);

  const fileName = `Venta ${sale.id} - ${sale.nombreCliente} ${sale.apellidoCliente}`;

  return (
    <Item variant="outline" asChild>
      <PDFDownloadLink
        document={<ReceiptPdf register={sale} formName="venta" />}
        fileName={fileName}
      >
        <ItemMedia variant="icon">
          <Download />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Descargar recibo</ItemTitle>
          <ItemDescription>Descarga el recibo en PDF.</ItemDescription>
        </ItemContent>
        <ItemActions>
          <ChevronRightIcon className="size-4" />
        </ItemActions>
      </PDFDownloadLink>
    </Item>
  );
}
