'use client';

import { useState } from 'react';
import { Copy, Download, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from '@/components/ui/item';
import { toast } from 'sonner';
import { Spinner } from '@/components/ui/spinner';
import { ReceiptById } from '@/types/types';
import Link from 'next/link';
import { CardTitle } from '@/components/ui/card';
import { WhatsAppButton } from '../sale/options';

interface ReceiptOptions {
  receipt: ReceiptById;
}

export function ReceiptOptions({ receipt }: ReceiptOptions) {
  const [loading, setLoading] = useState<'copy' | 'download' | null>(null);

  const fetchImage = async () => {
    const res = await fetch(`/api/recibos/pedido?id_recibo=${receipt.id}`);
    if (!res.ok) throw new Error('Failed to fetch image.');
    return res.blob();
  };

  const handleCopy = async () => {
    setLoading('copy');
    try {
      const blob = await fetchImage();
      await navigator.clipboard.write([
        new ClipboardItem({ [blob.type]: blob }),
      ]);
      toast.success('Copiado');
    } catch (err) {
      console.error(err);
      toast.error('Hubo un error al copiar la imagen al portapapeles.');
    } finally {
      setLoading(null);
    }
  };

  const handleDownload = async () => {
    setLoading('download');
    try {
      const blob = await fetchImage();
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `Recibo ${receipt.id} - Pedido ${receipt.idPedido} - ${receipt.nombreCliente}.png`;
      link.click();
      URL.revokeObjectURL(link.href);
    } catch (err) {
      console.error(err);
      toast.error('Error al descargar el recibo.');
    } finally {
      setLoading(null);
    }
  };

  return (
    <>
      <Item variant="outline">
        <ItemContent>
          <ItemTitle>Ver</ItemTitle>
          <ItemDescription>Ver el recibo como imagen.</ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button variant="outline" size="icon" asChild>
            <Link
              href={`/api/recibos/pedido?id_recibo=${receipt.id}`}
              target="_blank"
            >
              <Eye />
            </Link>
          </Button>
        </ItemActions>
      </Item>

      <Item variant="outline">
        <ItemContent>
          <ItemTitle>Descargar</ItemTitle>
          <ItemDescription>Descarga el recibo como imagen.</ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button
            variant="outline"
            size="icon"
            onClick={handleDownload}
            disabled={loading !== null}
          >
            {loading === 'download' ? <Spinner /> : <Download />}
          </Button>
        </ItemActions>
      </Item>

      <CardTitle className="mt-8">¿Quieres enviar el recibo?</CardTitle>

      <Item variant="outline">
        <ItemContent>
          <ItemTitle>1. Copiar</ItemTitle>
          <ItemDescription>Copia el recibo al portapapeles.</ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button
            variant="outline"
            size="icon"
            onClick={handleCopy}
            disabled={loading !== null}
          >
            {loading === 'copy' ? <Spinner /> : <Copy />}
          </Button>
        </ItemActions>
      </Item>

      <WhatsAppButton
        message={`Hola ${receipt.nombreCliente}, aquí está tu recibo.`}
        phoneNumber={receipt.telefono}
      />
    </>
  );
}
